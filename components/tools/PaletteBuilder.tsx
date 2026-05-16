'use client';

import { useState, useCallback } from 'react';

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = d / (l > 0.5 ? 2 - max - min : max + min);
  const h = max === r ? ((g - b) / d + (g < b ? 6 : 0)) / 6
    : max === g ? ((b - r) / d + 2) / 6
    : ((r - g) / d + 4) / 6;
  return [h * 360, s, l];
}

function hslToHex(h: number, s: number, l: number): string {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function generatePalette(hex: string, mode: PaletteMode): Swatch[] {
  const [h, s, l] = hexToHsl(hex);
  switch (mode) {
    case 'analogous':
      return [-30, -15, 0, 15, 30].map(offset => ({
        hex: hslToHex((h + offset + 360) % 360, s, l),
        label: offset === 0 ? 'Base' : `${offset > 0 ? '+' : ''}${offset}°`,
      }));
    case 'complementary':
      return [0, 30, 60, 180, 210].map((offset, i) => ({
        hex: i < 3 ? hslToHex(h, s, Math.max(0.1, Math.min(0.9, l + (i - 1) * 0.15)))
          : hslToHex((h + 180 + (offset - 180)) % 360, s, l),
        label: i < 3 ? ['Sombra', 'Base', 'Claro'][i] : i === 3 ? 'Complemento' : 'Comp+',
      }));
    case 'triadic':
      return [0, 120, 240].flatMap((offset, i) => [
        { hex: hslToHex((h + offset) % 360, s, Math.max(0.1, l - 0.1)), label: `${['A', 'B', 'C'][i]}−` },
        { hex: hslToHex((h + offset) % 360, s, l), label: ['A', 'B', 'C'][i] },
      ]).slice(0, 5);
    case 'shades':
      return [0.1, 0.25, 0.45, l, 0.65, 0.8, 0.92].map((lightness, i) => ({
        hex: hslToHex(h, s, lightness),
        label: `${i * 100 + 100}`,
        active: Math.abs(lightness - l) < 0.01,
      }));
    default:
      return [];
  }
}

type PaletteMode = 'analogous' | 'complementary' | 'triadic' | 'shades';
interface Swatch { hex: string; label: string; active?: boolean }

const PRESETS = ['#82E600', '#5BD1FF', '#FF6B9D', '#E8A22B', '#A78BFA', '#FF6B6B'];

export default function PaletteBuilder() {
  const [color, setColor] = useState('#82E600');
  const [mode, setMode] = useState<PaletteMode>('analogous');
  const [copied, setCopied] = useState<string | null>(null);

  const palette = generatePalette(color, mode);

  const copy = useCallback(async (hex: string) => {
    await navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  const exportCSS = () => {
    const vars = palette.map((s, i) => `  --color-${i + 1}: ${s.hex};`).join('\n');
    const text = `:root {\n${vars}\n}`;
    navigator.clipboard.writeText(text);
    setCopied('css');
    setTimeout(() => setCopied(null), 2000);
  };

  const modes: { key: PaletteMode; label: string }[] = [
    { key: 'analogous', label: 'Análogos' },
    { key: 'complementary', label: 'Complementario' },
    { key: 'triadic', label: 'Triádico' },
    { key: 'shades', label: 'Tonos' },
  ];

  return (
    <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Controls row */}
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Color picker */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Color semilla</span>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <label style={{ width: 52, height: 52, borderRadius: 14, overflow: 'hidden', border: '2px solid var(--line)', cursor: 'pointer', flexShrink: 0, boxShadow: `0 0 0 4px ${color}22` }}>
              <input type="color" value={color} onChange={e => setColor(e.target.value)}
                style={{ width: '200%', height: '200%', transform: 'translate(-25%,-25%)', cursor: 'pointer', border: 'none', padding: 0 }} />
            </label>
            <input
              type="text" value={color}
              onChange={e => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setColor(e.target.value); }}
              style={{ width: 96, padding: '10px 12px', background: 'var(--ink-3)', border: '1px solid var(--line)', borderRadius: 10, color: 'var(--paper)', fontFamily: 'var(--font-mono)', fontSize: 14, outline: 'none', letterSpacing: '0.06em' }}
            />
          </div>
        </div>

        {/* Presets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Presets</span>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', paddingTop: 4 }}>
            {PRESETS.map(p => (
              <button key={p} onClick={() => setColor(p)} title={p} style={{
                width: 36, height: 36, borderRadius: 10, background: p, border: color === p ? '2px solid var(--paper)' : '2px solid transparent',
                cursor: 'pointer', transition: 'transform 0.15s', flexShrink: 0,
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Mode tabs */}
      <div style={{ display: 'flex', background: 'var(--ink-3)', border: '1px solid var(--line)', borderRadius: 999, padding: 4, gap: 4, alignSelf: 'flex-start', flexWrap: 'wrap' }}>
        {modes.map(({ key, label }) => (
          <button key={key} onClick={() => setMode(key)} style={{
            padding: '8px 18px', borderRadius: 999, fontSize: 12, fontFamily: 'var(--font-mono)',
            letterSpacing: '0.06em', border: 'none', cursor: 'pointer',
            background: mode === key ? 'var(--lime)' : 'transparent',
            color: mode === key ? 'var(--ink)' : 'var(--paper-mute)',
            fontWeight: mode === key ? 600 : 400, transition: 'all 0.2s',
          }}>{label}</button>
        ))}
      </div>

      {/* Swatches */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {palette.map((swatch) => (
          <div key={swatch.hex} style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
            <button
              onClick={() => copy(swatch.hex)}
              title={`Copiar ${swatch.hex}`}
              style={{
                width: 100, height: 100, borderRadius: 18, background: swatch.hex,
                border: swatch.active ? '3px solid var(--paper)' : '2px solid transparent',
                cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s',
                boxShadow: copied === swatch.hex ? `0 0 0 3px ${swatch.hex}88` : 'none',
              }}
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-dim)', letterSpacing: '0.06em' }}>{swatch.hex}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: copied === swatch.hex ? 'var(--lime)' : 'var(--paper-mute)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {copied === swatch.hex ? '✓ copiado' : swatch.label}
            </span>
          </div>
        ))}
      </div>

      {/* Export strip */}
      <div style={{ borderTop: '1px solid var(--line)', paddingTop: 20, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--paper-mute)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Exportar</span>
        <button onClick={exportCSS} className="btn btn-ghost btn-sm">
          {copied === 'css' ? '✓ CSS copiado' : 'Variables CSS'}
        </button>
        <button onClick={() => copy(palette.map(s => s.hex).join(', '))} className="btn btn-ghost btn-sm">
          {copied !== null && copied !== 'css' && palette.some(s => s.hex === copied) ? '✓' : 'Hex list'}
        </button>
      </div>
    </div>
  );
}
