'use client';

import { useState, useCallback, useEffect } from 'react';

const CHARSETS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  digits: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{}|;:,.<>?',
  ambiguous: 'Il1O0',
};

function generatePassword(length: number, opts: Options): string {
  let pool = '';
  if (opts.upper) pool += CHARSETS.upper;
  if (opts.lower) pool += CHARSETS.lower;
  if (opts.digits) pool += CHARSETS.digits;
  if (opts.symbols) pool += CHARSETS.symbols;
  if (opts.excludeAmbiguous) {
    pool = pool.split('').filter(c => !CHARSETS.ambiguous.includes(c)).join('');
  }
  if (!pool) return '';
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(n => pool[n % pool.length]).join('');
}

function entropy(password: string, opts: Options): number {
  let poolSize = 0;
  if (opts.upper) poolSize += 26;
  if (opts.lower) poolSize += 26;
  if (opts.digits) poolSize += 10;
  if (opts.symbols) poolSize += CHARSETS.symbols.length;
  if (poolSize === 0) return 0;
  return Math.log2(Math.pow(poolSize, password.length));
}

function strengthLabel(bits: number): { label: string; color: string } {
  if (bits < 40) return { label: 'Muy débil', color: 'var(--rust)' };
  if (bits < 60) return { label: 'Débil', color: '#E8A22B' };
  if (bits < 80) return { label: 'Buena', color: '#5BD1FF' };
  if (bits < 100) return { label: 'Fuerte', color: 'var(--lime)' };
  return { label: 'Muy fuerte', color: 'var(--lime)' };
}

interface Options {
  upper: boolean;
  lower: boolean;
  digits: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(20);
  const [opts, setOpts] = useState<Options>({ upper: true, lower: true, digits: true, symbols: true, excludeAmbiguous: false });
  const [password, setPassword] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const p = generatePassword(length, opts);
    setPassword(p);
    setHistory(h => [p, ...h].slice(0, 5));
  }, [length, opts]);

  useEffect(() => { generate(); }, [generate]);

  const copy = async (p = password) => {
    if (!p) return;
    await navigator.clipboard.writeText(p);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggle = (key: keyof Options) => {
    setOpts(o => {
      const next = { ...o, [key]: !o[key] };
      const anyChar = next.upper || next.lower || next.digits || next.symbols;
      if (!anyChar) return o;
      return next;
    });
  };

  const bits = entropy(password, opts);
  const strength = strengthLabel(bits);

  const optLabels: { key: keyof Options; label: string }[] = [
    { key: 'upper', label: 'A–Z' },
    { key: 'lower', label: 'a–z' },
    { key: 'digits', label: '0–9' },
    { key: 'symbols', label: '!@#' },
    { key: 'excludeAmbiguous', label: 'Sin ambiguos' },
  ];

  return (
    <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Password display */}
      <div style={{ background: 'var(--ink-3)', border: '1px solid var(--line)', borderRadius: 16, padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 20, letterSpacing: '0.05em', color: 'var(--paper)', wordBreak: 'break-all', flex: 1 }}>
          {password || '—'}
        </span>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <button onClick={generate} title="Nueva contraseña" style={{ width: 40, height: 40, borderRadius: 10, border: '1px solid var(--line)', background: 'var(--ink-2)', color: 'var(--paper-mute)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', fontSize: 16 }}>
            ↺
          </button>
          <button onClick={() => copy()} className="btn btn-glow btn-sm" style={{ height: 40 }}>
            {copied ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>
      </div>

      {/* Strength bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Fortaleza</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: strength.color }}>{strength.label} · {Math.round(bits)} bits</span>
        </div>
        <div style={{ height: 4, background: 'var(--ink-3)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: '100%', borderRadius: 999, background: strength.color, width: `${Math.min(100, (bits / 128) * 100)}%`, transition: 'width 0.3s, background 0.3s' }} />
        </div>
      </div>

      {/* Length slider */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Longitud</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--lime)', fontWeight: 600 }}>{length}</span>
        </div>
        <input
          type="range" min={8} max={64} value={length}
          onChange={e => setLength(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--lime)', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--paper-fade)' }}>8</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--paper-fade)' }}>64</span>
        </div>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Caracteres</span>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {optLabels.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => toggle(key)}
              style={{
                padding: '8px 16px', borderRadius: 999, fontSize: 12,
                fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', border: '1px solid',
                borderColor: opts[key] ? 'var(--lime)' : 'var(--line)',
                background: opts[key] ? 'rgba(130,230,0,0.12)' : 'var(--ink-3)',
                color: opts[key] ? 'var(--lime)' : 'var(--paper-mute)',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* History */}
      {history.length > 1 && (
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Historial · sesión</span>
          {history.slice(1).map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '10px 14px', background: 'var(--ink-3)', borderRadius: 10, border: '1px solid var(--line)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--paper-dim)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p}</span>
              <button onClick={() => copy(p)} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}>Copiar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
