'use client';

import { useState, useCallback } from 'react';

function hexToRgb(hex: string): [number, number, number] | null {
  const clean = hex.replace('#', '');
  if (clean.length !== 6 && clean.length !== 3) return null;
  const full = clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = d / (l > 0.5 ? 2 - max - min : max + min);
  const h = max === r ? ((g - b) / d + (g < b ? 6 : 0)) / 6
    : max === g ? ((b - r) / d + 2) / 6 : ((r - g) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return Math.round(255 * (l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)));
  };
  return [f(0), f(8), f(4)];
}

function rgbToOklch(r: number, g: number, b: number): string {
  // Approximate OKLCH for display purposes
  const [h, s, l] = rgbToHsl(r, g, b);
  const lOk = (l / 100 * 0.9 + 0.05).toFixed(2);
  const c = (s / 100 * 0.25).toFixed(3);
  return `oklch(${lOk} ${c} ${h})`;
}

const TAILWIND: Record<string, string> = {
  'slate-50':'#f8fafc','slate-100':'#f1f5f9','slate-200':'#e2e8f0','slate-300':'#cbd5e1','slate-400':'#94a3b8','slate-500':'#64748b','slate-600':'#475569','slate-700':'#334155','slate-800':'#1e293b','slate-900':'#0f172a',
  'gray-50':'#f9fafb','gray-100':'#f3f4f6','gray-200':'#e5e7eb','gray-300':'#d1d5db','gray-400':'#9ca3af','gray-500':'#6b7280','gray-600':'#4b5563','gray-700':'#374151','gray-800':'#1f2937','gray-900':'#111827',
  'red-50':'#fef2f2','red-100':'#fee2e2','red-200':'#fecaca','red-300':'#fca5a5','red-400':'#f87171','red-500':'#ef4444','red-600':'#dc2626','red-700':'#b91c1c','red-800':'#991b1b','red-900':'#7f1d1d',
  'orange-400':'#fb923c','orange-500':'#f97316','orange-600':'#ea580c',
  'yellow-400':'#facc15','yellow-500':'#eab308','yellow-600':'#ca8a04',
  'lime-400':'#a3e635','lime-500':'#84cc16','lime-600':'#65a30d',
  'green-400':'#4ade80','green-500':'#22c55e','green-600':'#16a34a','green-700':'#15803d',
  'teal-400':'#2dd4bf','teal-500':'#14b8a6','teal-600':'#0d9488',
  'cyan-400':'#22d3ee','cyan-500':'#06b6d4','cyan-600':'#0891b2',
  'sky-400':'#38bdf8','sky-500':'#0ea5e9','sky-600':'#0284c7',
  'blue-400':'#60a5fa','blue-500':'#3b82f6','blue-600':'#2563eb','blue-700':'#1d4ed8',
  'indigo-400':'#818cf8','indigo-500':'#6366f1','indigo-600':'#4f46e5',
  'violet-400':'#a78bfa','violet-500':'#8b5cf6','violet-600':'#7c3aed',
  'purple-400':'#c084fc','purple-500':'#a855f7','purple-600':'#9333ea',
  'pink-400':'#f472b6','pink-500':'#ec4899','pink-600':'#db2777',
  'rose-400':'#fb7185','rose-500':'#f43f5e','rose-600':'#e11d48',
  'white':'#ffffff','black':'#000000',
};

function closestTailwind(r: number, g: number, b: number): { name: string; hex: string; dist: number } {
  let best = { name: '', hex: '', dist: Infinity };
  for (const [name, hex] of Object.entries(TAILWIND)) {
    const rgb = hexToRgb(hex);
    if (!rgb) continue;
    const d = Math.sqrt((r - rgb[0]) ** 2 + (g - rgb[1]) ** 2 + (b - rgb[2]) ** 2);
    if (d < best.dist) best = { name, hex, dist: d };
  }
  return best;
}

export default function ColorConverter() {
  const [hex, setHex] = useState('#82E600');
  const [r, setR] = useState(130);
  const [g, setG] = useState(230);
  const [b, setB] = useState(0);
  const [h, setH] = useState(0);
  const [s, setS] = useState(0);
  const [l, setL] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);

  const fromHex = useCallback((val: string) => {
    setHex(val);
    const rgb = hexToRgb(val);
    if (!rgb) return;
    setR(rgb[0]); setG(rgb[1]); setB(rgb[2]);
    const [nh, ns, nl] = rgbToHsl(...rgb);
    setH(nh); setS(ns); setL(nl);
  }, []);

  const fromRgb = useCallback((nr: number, ng: number, nb: number) => {
    setR(nr); setG(ng); setB(nb);
    setHex(rgbToHex(nr, ng, nb));
    const [nh, ns, nl] = rgbToHsl(nr, ng, nb);
    setH(nh); setS(ns); setL(nl);
  }, []);

  const fromHsl = useCallback((nh: number, ns: number, nl: number) => {
    setH(nh); setS(ns); setL(nl);
    const [nr, ng, nb] = hslToRgb(nh, ns, nl);
    setR(nr); setG(ng); setB(nb);
    setHex(rgbToHex(nr, ng, nb));
  }, []);

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const validHex = hexToRgb(hex) !== null;
  const oklch = validHex ? rgbToOklch(r, g, b) : '';
  const tailwind = validHex ? closestTailwind(r, g, b) : null;

  const PRESETS = ['#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6','#ec4899','#000000','#ffffff'];

  return (
    <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Color preview + picker */}
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <label style={{ width: 80, height: 80, borderRadius: 20, border: '1px solid var(--line)', cursor: 'pointer', overflow: 'hidden', flexShrink: 0, boxShadow: validHex ? `0 0 0 4px ${hex}33` : 'none', transition: 'box-shadow 0.3s' }}>
          <input type="color" value={validHex ? hex : '#000000'} onChange={e => fromHex(e.target.value)}
            style={{ width: '200%', height: '200%', transform: 'translate(-25%,-25%)', border: 'none', cursor: 'pointer' }} />
        </label>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Presets */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {PRESETS.map(p => (
              <button key={p} onClick={() => fromHex(p)} style={{ width: 28, height: 28, borderRadius: 8, background: p, border: hex.toLowerCase() === p ? '2px solid var(--paper)' : '1px solid var(--line)', cursor: 'pointer', transition: 'transform 0.15s' }} title={p} />
            ))}
          </div>
          {/* Tailwind match */}
          {tailwind && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 12px', background: 'var(--ink-3)', borderRadius: 10, border: '1px solid var(--line)' }}>
              <div style={{ width: 20, height: 20, borderRadius: 6, background: tailwind.hex, border: '1px solid var(--line)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)' }}>Tailwind más cercano:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--lime)' }}>{tailwind.name}</span>
              <button onClick={() => copy(tailwind.name, 'tw')} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: copied === 'tw' ? 'var(--lime)' : 'var(--paper-fade)', background: 'none', border: 'none', cursor: 'pointer', marginLeft: 'auto' }}>
                {copied === 'tw' ? '✓' : 'Copiar'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Formats */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* HEX */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '12px 16px', background: 'var(--ink-3)', borderRadius: 12, border: `1px solid ${validHex ? 'var(--line)' : 'rgba(255,107,107,0.3)'}` }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)', minWidth: 40 }}>HEX</span>
          <input value={hex} onChange={e => fromHex(e.target.value)} spellCheck={false}
            style={{ flex: 1, background: 'none', border: 'none', color: 'var(--lime)', fontFamily: 'var(--font-mono)', fontSize: 15, outline: 'none', letterSpacing: '0.06em' }} />
          <button onClick={() => copy(hex, 'hex')} className="btn btn-ghost btn-sm">{copied === 'hex' ? '✓' : 'Copiar'}</button>
        </div>

        {/* RGB */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '12px 16px', background: 'var(--ink-3)', borderRadius: 12, border: '1px solid var(--line)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)', minWidth: 40 }}>RGB</span>
          <div style={{ flex: 1, display: 'flex', gap: 8 }}>
            {[['R', r, (v: number) => fromRgb(v, g, b), '#ef4444'], ['G', g, (v: number) => fromRgb(r, v, b), '#22c55e'], ['B', b, (v: number) => fromRgb(r, g, v), '#3b82f6']].map(([label, val, set, color]) => (
              <div key={label as string} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: color as string }}>{label as string}</span>
                <input type="number" min={0} max={255} value={val as number} onChange={e => (set as (v: number) => void)(Number(e.target.value))}
                  style={{ width: 64, padding: '4px 6px', background: 'var(--ink-2)', border: '1px solid var(--line)', borderRadius: 6, color: 'var(--paper)', fontFamily: 'var(--font-mono)', fontSize: 13, outline: 'none', textAlign: 'center' }} />
              </div>
            ))}
          </div>
          <button onClick={() => copy(`rgb(${r}, ${g}, ${b})`, 'rgb')} className="btn btn-ghost btn-sm">{copied === 'rgb' ? '✓' : 'Copiar'}</button>
        </div>

        {/* HSL */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '12px 16px', background: 'var(--ink-3)', borderRadius: 12, border: '1px solid var(--line)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)', minWidth: 40 }}>HSL</span>
          <div style={{ flex: 1, display: 'flex', gap: 8 }}>
            {[['H', h, 0, 360, (v: number) => fromHsl(v, s, l)], ['S', s, 0, 100, (v: number) => fromHsl(h, v, l)], ['L', l, 0, 100, (v: number) => fromHsl(h, s, v)]].map(([label, val, min, max, set]) => (
              <div key={label as string} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)' }}>{label as string}</span>
                <input type="number" min={min as number} max={max as number} value={val as number} onChange={e => (set as (v: number) => void)(Number(e.target.value))}
                  style={{ width: 52, padding: '4px 8px', background: 'var(--ink-2)', border: '1px solid var(--line)', borderRadius: 6, color: 'var(--paper)', fontFamily: 'var(--font-mono)', fontSize: 13, outline: 'none', textAlign: 'center' }} />
              </div>
            ))}
          </div>
          <button onClick={() => copy(`hsl(${h}, ${s}%, ${l}%)`, 'hsl')} className="btn btn-ghost btn-sm">{copied === 'hsl' ? '✓' : 'Copiar'}</button>
        </div>

        {/* OKLCH */}
        {oklch && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '12px 16px', background: 'var(--ink-3)', borderRadius: 12, border: '1px solid var(--line)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)', minWidth: 40 }}>OKLCH</span>
            <span style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--paper-dim)' }}>{oklch}</span>
            <button onClick={() => copy(oklch, 'oklch')} className="btn btn-ghost btn-sm">{copied === 'oklch' ? '✓' : 'Copiar'}</button>
          </div>
        )}
      </div>
    </div>
  );
}
