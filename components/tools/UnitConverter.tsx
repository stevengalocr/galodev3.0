'use client';

import { useState, useMemo } from 'react';

type Category = 'longitud' | 'peso' | 'temperatura' | 'almacenamiento' | 'pantalla';

interface Unit { key: string; label: string; toBase: (v: number) => number; fromBase: (v: number) => number }

const UNITS: Record<Category, Unit[]> = {
  longitud: [
    { key: 'mm', label: 'Milímetros (mm)', toBase: v => v / 1000, fromBase: v => v * 1000 },
    { key: 'cm', label: 'Centímetros (cm)', toBase: v => v / 100, fromBase: v => v * 100 },
    { key: 'm', label: 'Metros (m)', toBase: v => v, fromBase: v => v },
    { key: 'km', label: 'Kilómetros (km)', toBase: v => v * 1000, fromBase: v => v / 1000 },
    { key: 'in', label: 'Pulgadas (in)', toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
    { key: 'ft', label: 'Pies (ft)', toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
    { key: 'yd', label: 'Yardas (yd)', toBase: v => v * 0.9144, fromBase: v => v / 0.9144 },
    { key: 'mi', label: 'Millas (mi)', toBase: v => v * 1609.344, fromBase: v => v / 1609.344 },
  ],
  peso: [
    { key: 'mg', label: 'Miligramos (mg)', toBase: v => v / 1e6, fromBase: v => v * 1e6 },
    { key: 'g', label: 'Gramos (g)', toBase: v => v / 1000, fromBase: v => v * 1000 },
    { key: 'kg', label: 'Kilogramos (kg)', toBase: v => v, fromBase: v => v },
    { key: 't', label: 'Toneladas (t)', toBase: v => v * 1000, fromBase: v => v / 1000 },
    { key: 'oz', label: 'Onzas (oz)', toBase: v => v * 0.0283495, fromBase: v => v / 0.0283495 },
    { key: 'lb', label: 'Libras (lb)', toBase: v => v * 0.453592, fromBase: v => v / 0.453592 },
    { key: 'st', label: 'Stones (st)', toBase: v => v * 6.35029, fromBase: v => v / 6.35029 },
  ],
  temperatura: [
    { key: 'c', label: 'Celsius (°C)', toBase: v => v, fromBase: v => v },
    { key: 'f', label: 'Fahrenheit (°F)', toBase: v => (v - 32) * 5 / 9, fromBase: v => v * 9 / 5 + 32 },
    { key: 'k', label: 'Kelvin (K)', toBase: v => v - 273.15, fromBase: v => v + 273.15 },
  ],
  almacenamiento: [
    { key: 'b', label: 'Bytes (B)', toBase: v => v, fromBase: v => v },
    { key: 'kb', label: 'Kilobytes (KB)', toBase: v => v * 1024, fromBase: v => v / 1024 },
    { key: 'mb', label: 'Megabytes (MB)', toBase: v => v * 1024 ** 2, fromBase: v => v / 1024 ** 2 },
    { key: 'gb', label: 'Gigabytes (GB)', toBase: v => v * 1024 ** 3, fromBase: v => v / 1024 ** 3 },
    { key: 'tb', label: 'Terabytes (TB)', toBase: v => v * 1024 ** 4, fromBase: v => v / 1024 ** 4 },
    { key: 'kbit', label: 'Kilobits (Kbit)', toBase: v => v * 125, fromBase: v => v / 125 },
    { key: 'mbit', label: 'Megabits (Mbit)', toBase: v => v * 125000, fromBase: v => v / 125000 },
  ],
  pantalla: [
    { key: 'px', label: 'Píxeles (px)', toBase: v => v, fromBase: v => v },
    { key: 'rem', label: 'rem (base 16px)', toBase: v => v * 16, fromBase: v => v / 16 },
    { key: 'em', label: 'em (base 16px)', toBase: v => v * 16, fromBase: v => v / 16 },
    { key: 'pt', label: 'Puntos (pt)', toBase: v => v * (96 / 72), fromBase: v => v * (72 / 96) },
    { key: 'vw', label: 'vw (base 1440px)', toBase: v => v * 14.4, fromBase: v => v / 14.4 },
    { key: 'vh', label: 'vh (base 900px)', toBase: v => v * 9, fromBase: v => v / 9 },
  ],
};

const CATEGORY_LABELS: Record<Category, string> = {
  longitud: 'Longitud',
  peso: 'Peso',
  temperatura: 'Temperatura',
  almacenamiento: 'Almacenamiento',
  pantalla: 'Pantalla / CSS',
};

function fmt(n: number): string {
  if (!isFinite(n)) return '—';
  if (Math.abs(n) < 0.000001 && n !== 0) return n.toExponential(4);
  if (Math.abs(n) >= 1e9) return n.toExponential(4);
  const decimals = Math.abs(n) >= 1 ? 6 : 10;
  const s = parseFloat(n.toPrecision(decimals)).toString();
  return s;
}

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>('longitud');
  const [value, setValue] = useState('1');
  const [from, setFrom] = useState('m');
  const [to, setTo] = useState('ft');
  const units = UNITS[category];

  const result = useMemo(() => {
    const v = parseFloat(value);
    if (isNaN(v)) return '';
    const fromUnit = units.find(u => u.key === from);
    const toUnit = units.find(u => u.key === to);
    if (!fromUnit || !toUnit) return '';
    return fmt(toUnit.fromBase(fromUnit.toBase(v)));
  }, [value, from, to, units]);

  const swap = () => { setFrom(to); setTo(from); };

  const allResults = useMemo(() => {
    const v = parseFloat(value);
    if (isNaN(v)) return [];
    const fromUnit = units.find(u => u.key === from);
    if (!fromUnit) return [];
    return units.map(u => ({ ...u, result: fmt(u.fromBase(fromUnit.toBase(v))) }));
  }, [value, from, units]);

  const handleCategoryChange = (c: Category) => {
    setCategory(c);
    const us = UNITS[c];
    setFrom(us[0].key);
    setTo(us[Math.min(3, us.length - 1)].key);
  };

  return (
    <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {(Object.keys(CATEGORY_LABELS) as Category[]).map(c => (
          <button key={c} onClick={() => handleCategoryChange(c)} style={{
            padding: '8px 18px', borderRadius: 999, fontSize: 12, fontFamily: 'var(--font-mono)',
            letterSpacing: '0.06em', border: '1px solid',
            borderColor: category === c ? 'var(--lime)' : 'var(--line)',
            background: category === c ? 'rgba(130,230,0,0.12)' : 'var(--ink-3)',
            color: category === c ? 'var(--lime)' : 'var(--paper-mute)',
            cursor: 'pointer', transition: 'all 0.2s',
          }}>{CATEGORY_LABELS[c]}</button>
        ))}
      </div>

      {/* Main converter */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Valor</label>
          <input
            type="number" value={value} onChange={e => setValue(e.target.value)}
            style={{ padding: '14px 16px', background: 'var(--ink-3)', border: '1px solid var(--line)', borderRadius: 12, color: 'var(--paper)', fontSize: 18, fontFamily: 'var(--font-mono)', outline: 'none', width: '100%' }}
          />
          <select value={from} onChange={e => setFrom(e.target.value)} style={{ padding: '10px 14px', background: 'var(--ink-3)', border: '1px solid var(--line)', borderRadius: 10, color: 'var(--paper)', fontSize: 13, fontFamily: 'var(--font-mono)', outline: 'none', cursor: 'pointer' }}>
            {units.map(u => <option key={u.key} value={u.key}>{u.label}</option>)}
          </select>
        </div>

        <button onClick={swap} style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--line)', background: 'var(--ink-3)', color: 'var(--lime)', cursor: 'pointer', fontSize: 18, marginBottom: 44, transition: 'all 0.2s' }}>⇄</button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Resultado</label>
          <div style={{ padding: '14px 16px', background: 'var(--ink-2)', border: '1px solid var(--line)', borderRadius: 12, color: 'var(--lime)', fontSize: 18, fontFamily: 'var(--font-mono)', letterSpacing: '0.02em' }}>
            {result || '—'}
          </div>
          <select value={to} onChange={e => setTo(e.target.value)} style={{ padding: '10px 14px', background: 'var(--ink-3)', border: '1px solid var(--line)', borderRadius: 10, color: 'var(--paper)', fontSize: 13, fontFamily: 'var(--font-mono)', outline: 'none', cursor: 'pointer' }}>
            {units.map(u => <option key={u.key} value={u.key}>{u.label}</option>)}
          </select>
        </div>
      </div>

      {/* All units table */}
      {allResults.length > 0 && (
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: 20 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--paper-mute)', display: 'block', marginBottom: 12 }}>Todas las conversiones</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8 }}>
            {allResults.map(u => (
              <div key={u.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: u.key === from ? 'rgba(130,230,0,0.07)' : 'var(--ink-3)', borderRadius: 10, border: `1px solid ${u.key === from ? 'rgba(130,230,0,0.2)' : 'var(--line)'}` }}>
                <span style={{ fontSize: 13, color: 'var(--paper-dim)' }}>{u.label.split('(')[1]?.replace(')', '') || u.key}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: u.key === from ? 'var(--lime)' : 'var(--paper)' }}>{u.result}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
