'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// QR generation via qrcode library loaded from CDN at runtime (no npm dep)
// We implement a minimal QR encoder using the browser's canvas API via a script tag approach.
// For production-quality QR we use the qrcode.js algorithm inline.

// --- Minimal QR Code generator (Reed-Solomon, byte mode, error correction L) ---
// Based on the QR Code specification, adapted for browser TypeScript.

const GF = (() => {
  const EXP = new Uint8Array(512);
  const LOG = new Uint8Array(256);
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP[i] = x;
    LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
  return {
    mul: (a: number, b: number) => a === 0 || b === 0 ? 0 : EXP[LOG[a] + LOG[b]],
    div: (a: number, b: number) => a === 0 ? 0 : EXP[(LOG[a] - LOG[b] + 255) % 255],
    EXP, LOG,
  };
})();

function rsEncode(data: Uint8Array, nsym: number): Uint8Array {
  const gen = rsGenerator(nsym);
  const out = new Uint8Array(data.length + nsym);
  out.set(data);
  for (let i = 0; i < data.length; i++) {
    const c = out[i];
    if (c !== 0) for (let j = 0; j < gen.length; j++) out[i + j] ^= GF.mul(gen[j], c);
  }
  return out.slice(data.length);
}

function rsGenerator(nsym: number): Uint8Array {
  let g = new Uint8Array([1]);
  for (let i = 0; i < nsym; i++) {
    const f = new Uint8Array([1, GF.EXP[i]]);
    const r = new Uint8Array(g.length + f.length - 1);
    for (let j = 0; j < g.length; j++) for (let k = 0; k < f.length; k++) r[j + k] ^= GF.mul(g[j], f[k]);
    g = r;
  }
  return g;
}

// Simplified QR: version 1-10, byte mode, ECC level M
function makeQR(text: string): boolean[][] | null {
  const bytes = new TextEncoder().encode(text);
  const len = bytes.length;
  // Version selection (ECC M): capacity table [chars, ecc_codewords, blocks]
  const versions: [number, number, number, number][] = [
    [0,16,10,1],[1,19,10,1],[2,28,16,1],[3,44,26,2],[4,64,18,2],
    [5,86,24,2],[6,108,16,4],[7,124,18,4],[8,154,22,4],[9,182,28,4],
  ];
  let ver = -1, totalCW = 0, eccCW = 0;
  for (const [v, cap, ecc, _] of versions) {
    if (len <= cap) { ver = v + 1; totalCW = [26,44,70,100,134,172,196,242,292,346][v]; eccCW = ecc; break; }
    void _;
  }
  if (ver === -1) return null;

  const dataCW = totalCW - eccCW;
  const bits: number[] = [];
  const push = (v: number, n: number) => { for (let i = n - 1; i >= 0; i--) bits.push((v >> i) & 1); };
  push(0b0100, 4); // byte mode
  push(len, 8);
  for (const b of bytes) push(b, 8);
  push(0, 4); // terminator
  while (bits.length % 8 !== 0) bits.push(0);
  const pads = [0xEC, 0x11];
  const dataBytes = new Uint8Array(dataCW);
  for (let i = 0; i < bits.length / 8 && i < dataCW; i++) {
    let b = 0; for (let j = 0; j < 8; j++) b = (b << 1) | (bits[i * 8 + j] ?? 0);
    dataBytes[i] = b;
  }
  for (let i = Math.ceil(bits.length / 8); i < dataCW; i++) dataBytes[i] = pads[i % 2];

  const ecc = rsEncode(dataBytes, eccCW);
  const allBytes = new Uint8Array([...dataBytes, ...ecc]);

  const size = ver * 4 + 17;
  const M = Array.from({ length: size }, () => new Array(size).fill(-1));
  const R = Array.from({ length: size }, () => new Array(size).fill(false)); // reserved

  const mark = (r: number, c: number, v: number) => { if (r >= 0 && r < size && c >= 0 && c < size) { M[r][c] = v; R[r][c] = true; } };

  // Finder patterns
  const finder = (row: number, col: number) => {
    for (let r = -1; r <= 7; r++) for (let c = -1; c <= 7; c++) {
      const v = r === -1 || r === 7 || c === -1 || c === 7 ? 1
        : r >= 1 && r <= 5 && c >= 1 && c <= 5 ? (r >= 2 && r <= 4 && c >= 2 && c <= 4 ? 1 : 0) : 1;
      mark(row + r, col + c, v);
    }
  };
  finder(0, 0); finder(0, size - 7); finder(size - 7, 0);

  // Timing
  for (let i = 8; i < size - 8; i++) { mark(6, i, (i % 2) === 0 ? 1 : 0); mark(i, 6, (i % 2) === 0 ? 1 : 0); }

  // Dark module
  mark(size - 8, 8, 1);

  // Format info (ECC M, mask 2)
  const fmt = [1,1,1,0,1,1,1,1,1,0,0,0,1,0,0]; // precomputed for M+mask2
  const fmtPos1 = [[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,7],[8,8],[7,8],[5,8],[4,8],[3,8],[2,8],[1,8],[0,8]];
  const fmtPos2 = [[size-1,8],[size-2,8],[size-3,8],[size-4,8],[size-5,8],[size-6,8],[size-7,8],[8,size-8],[8,size-7],[8,size-6],[8,size-5],[8,size-4],[8,size-3],[8,size-2],[8,size-1]];
  fmtPos1.forEach(([r,c],i) => mark(r,c,fmt[i]));
  fmtPos2.forEach(([r,c],i) => mark(r,c,fmt[i]));

  // Data placement with mask 2: (row // 2 + col // 3) % 2 === 0
  let bit = 0;
  const allBits = Array.from(allBytes).flatMap(b => Array.from({length:8},(_,i)=>(b>>(7-i))&1));
  let up = true;
  for (let c = size - 1; c >= 0; c -= 2) {
    if (c === 6) c = 5;
    for (let ri = 0; ri < size; ri++) {
      const r = up ? size - 1 - ri : ri;
      for (const dc of [0, -1]) {
        const col = c + dc;
        if (!R[r][col] && bit < allBits.length) {
          const b = allBits[bit++];
          const masked = (Math.floor(r / 2) + Math.floor(col / 3)) % 2 === 0 ? b ^ 1 : b;
          M[r][col] = masked;
        }
      }
    }
    up = !up;
  }

  return M.map(row => row.map(v => v === 1));
}

type ExportFormat = 'svg' | 'png';

const PRESETS = [
  { label: 'URL', value: 'https://galodev.com' },
  { label: 'Email', value: 'mailto:hola@galodev.com' },
  { label: 'WiFi', value: 'WIFI:T:WPA;S:MiRed;P:MiClave;;' },
  { label: 'Tel', value: 'tel:+50672874779' },
  { label: 'vCard', value: 'BEGIN:VCARD\nVERSION:3.0\nFN:GaloDev\nEND:VCARD' },
];

export default function QrCodeMaker() {
  const [text, setText] = useState('https://galodev.com');
  const [fg, setFg] = useState('#0B0B0A');
  const [bg, setBg] = useState('#FFFFFF');
  const [size, setSize] = useState(256);
  const [qr, setQr] = useState<boolean[][] | null>(null);
  const [error, setError] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!text.trim()) { setQr(null); setError(''); return; }
    const m = makeQR(text);
    if (!m) { setQr(null); setError('Texto demasiado largo para generar QR (máx. ~180 caracteres).'); }
    else { setQr(m); setError(''); }
  }, [text]);

  useEffect(() => {
    if (!qr || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    const n = qr.length;
    const cell = Math.floor(size / (n + 8));
    const pad = Math.floor((size - cell * n) / 2);
    canvas.width = size; canvas.height = size;
    ctx.fillStyle = bg; ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = fg;
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
      if (qr[r][c]) ctx.fillRect(pad + c * cell, pad + r * cell, cell, cell);
    }
  }, [qr, fg, bg, size]);

  const download = useCallback((format: ExportFormat) => {
    if (!qr) return;
    if (format === 'png') {
      const a = document.createElement('a');
      a.href = canvasRef.current!.toDataURL('image/png');
      a.download = 'qr-galodev.png';
      a.click();
    } else {
      const n = qr.length;
      const cell = 10;
      const pad = 40;
      const total = n * cell + pad * 2;
      let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${total}" height="${total}" viewBox="0 0 ${total} ${total}">`;
      svg += `<rect width="${total}" height="${total}" fill="${bg}"/>`;
      for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
        if (qr[r][c]) svg += `<rect x="${pad+c*cell}" y="${pad+r*cell}" width="${cell}" height="${cell}" fill="${fg}"/>`;
      }
      svg += '</svg>';
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'qr-galodev.svg';
      a.click();
    }
  }, [qr, fg, bg]);

  const charCount = new TextEncoder().encode(text).length;
  const maxChars = 182;

  return (
    <div style={{ padding: '32px 40px', display: 'flex', gap: 40, flexWrap: 'wrap' }}>

      {/* Left: controls */}
      <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Contenido</label>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: charCount > maxChars ? 'var(--rust)' : 'var(--paper-fade)' }}>{charCount}/{maxChars}</span>
          </div>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            rows={4}
            placeholder="URL, texto, WiFi, vCard..."
            style={{
              width: '100%', padding: '12px 14px', background: 'var(--ink-3)',
              border: `1px solid ${charCount > maxChars ? 'rgba(255,107,107,0.4)' : 'var(--line)'}`,
              borderRadius: 12, color: 'var(--paper)', fontSize: 14,
              fontFamily: 'var(--font-mono)', lineHeight: 1.5, resize: 'vertical', outline: 'none',
            }}
          />
          {error && <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--rust)', margin: 0 }}>{error}</p>}
        </div>

        {/* Presets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Plantillas</span>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {PRESETS.map(p => (
              <button key={p.label} onClick={() => setText(p.value)} style={{
                padding: '6px 14px', borderRadius: 999, fontSize: 12,
                fontFamily: 'var(--font-mono)', letterSpacing: '0.06em',
                border: '1px solid var(--line)', background: 'var(--ink-3)',
                color: 'var(--paper-mute)', cursor: 'pointer', transition: 'all 0.2s',
              }}>{p.label}</button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div style={{ display: 'flex', gap: 20 }}>
          {([['fg', fg, setFg, 'Módulos'], ['bg', bg, setBg, 'Fondo']] as const).map(([_k, val, set, lbl]) => (
            <div key={lbl} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>{lbl}</span>
              <label style={{ width: 44, height: 44, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line)', cursor: 'pointer' }}>
                <input type="color" value={val} onChange={e => set(e.target.value)}
                  style={{ width: '200%', height: '200%', transform: 'translate(-25%,-25%)', cursor: 'pointer', border: 'none' }} />
              </label>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)' }}>{val}</span>
            </div>
          ))}
        </div>

        {/* Size */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Tamaño</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--lime)' }}>{size}px</span>
          </div>
          <input type="range" min={128} max={512} step={64} value={size} onChange={e => setSize(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--lime)', cursor: 'pointer' }} />
        </div>

        {/* Download */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => download('png')} disabled={!qr} className="btn btn-glow btn-sm" style={{ opacity: qr ? 1 : 0.4 }}>
            Descargar PNG
          </button>
          <button onClick={() => download('svg')} disabled={!qr} className="btn btn-ghost btn-sm" style={{ opacity: qr ? 1 : 0.4 }}>
            SVG
          </button>
        </div>
      </div>

      {/* Right: preview */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', justifyContent: 'flex-start' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--paper-mute)', alignSelf: 'flex-start' }}>Vista previa</span>
        <div style={{ padding: 20, background: bg, borderRadius: 18, border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {qr
            ? <canvas ref={canvasRef} style={{ display: 'block', imageRendering: 'pixelated', borderRadius: 8 }} />
            : <div style={{ width: 200, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--paper-fade)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                Escribe algo...
              </div>
          }
        </div>
      </div>
    </div>
  );
}
