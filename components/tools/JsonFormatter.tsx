'use client';

import { useState, useCallback } from 'react';

type Mode = 'format' | 'minify' | 'validate';

function processJson(input: string, mode: Mode): { output: string; error: string } {
  if (!input.trim()) return { output: '', error: '' };
  try {
    const parsed = JSON.parse(input);
    if (mode === 'minify') return { output: JSON.stringify(parsed), error: '' };
    return { output: JSON.stringify(parsed, null, 2), error: '' };
  } catch (e) {
    const msg = (e as Error).message;
    if (mode === 'validate') return { output: '', error: msg };
    return { output: '', error: msg };
  }
}

function countStats(json: string) {
  try {
    const parsed = JSON.parse(json);
    const str = JSON.stringify(parsed);
    const keys = str.match(/"[^"]+"\s*:/g)?.length ?? 0;
    const depth = (str.match(/\[|\{/g) || []).length;
    return { keys, depth };
  } catch { return null; }
}

export default function JsonFormatter() {
  const [mode, setMode] = useState<Mode>('format');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const run = useCallback((text: string, m: Mode) => {
    const { output: o, error: e } = processJson(text, m);
    setOutput(o);
    setError(e);
  }, []);

  const handleInput = (val: string) => { setInput(val); run(val, mode); };
  const handleMode = (m: Mode) => { setMode(m); run(input, m); };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = countStats(input);
  const isValid = !!input.trim() && !error;

  const EXAMPLE = `{
  "nombre": "GaloDev",
  "version": 3,
  "herramientas": ["base64", "json", "qr"],
  "gratis": true,
  "meta": { "pais": "Costa Rica", "año": 2025 }
}`;

  const modes: { key: Mode; label: string }[] = [
    { key: 'format', label: 'Formatear' },
    { key: 'minify', label: 'Minificar' },
    { key: 'validate', label: 'Validar' },
  ];

  return (
    <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Mode + status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', background: 'var(--ink-3)', border: '1px solid var(--line)', borderRadius: 999, padding: 4, gap: 4 }}>
          {modes.map(({ key, label }) => (
            <button key={key} onClick={() => handleMode(key)} style={{
              padding: '8px 18px', borderRadius: 999, fontSize: 12, fontFamily: 'var(--font-mono)',
              letterSpacing: '0.06em', textTransform: 'uppercase', border: 'none', cursor: 'pointer',
              background: mode === key ? 'var(--lime)' : 'transparent',
              color: mode === key ? 'var(--ink)' : 'var(--paper-mute)',
              fontWeight: mode === key ? 600 : 400, transition: 'all 0.2s',
            }}>{label}</button>
          ))}
        </div>
        {input.trim() && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em' }}>
            {error
              ? <span style={{ color: 'var(--rust)' }}>✕ JSON inválido</span>
              : <span style={{ color: 'var(--lime)' }}>✓ JSON válido{stats ? ` · ${stats.keys} claves · ${stats.depth} niveles` : ''}</span>
            }
          </span>
        )}
      </div>

      {/* Validate mode — show error inline */}
      {mode === 'validate' && error && (
        <div style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.25)', borderRadius: 12, padding: '16px 20px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--rust)', margin: 0, lineHeight: 1.6 }}>{error}</p>
        </div>
      )}
      {mode === 'validate' && isValid && (
        <div style={{ background: 'rgba(130,230,0,0.07)', border: '1px solid rgba(130,230,0,0.2)', borderRadius: 12, padding: '16px 20px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--lime)', margin: 0 }}>JSON válido y bien formado.</p>
        </div>
      )}

      {/* Editor grid */}
      <div style={{ display: 'grid', gridTemplateColumns: mode === 'validate' ? '1fr' : '1fr 1fr', gap: 20 }}>
        {/* Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Entrada</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => { setInput(EXAMPLE); run(EXAMPLE, mode); }} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', background: 'none', border: 'none', cursor: 'pointer' }}>Ejemplo</button>
              <button onClick={() => { setInput(''); setOutput(''); setError(''); }} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', background: 'none', border: 'none', cursor: 'pointer' }}>Limpiar</button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={e => handleInput(e.target.value)}
            placeholder={'Pega tu JSON aquí...'}
            rows={16}
            spellCheck={false}
            style={{
              width: '100%', padding: '14px 16px',
              background: error ? 'rgba(255,107,107,0.05)' : 'var(--ink-3)',
              border: `1px solid ${error ? 'rgba(255,107,107,0.3)' : 'var(--line)'}`,
              borderRadius: 12, color: 'var(--paper)', fontSize: 13,
              fontFamily: 'var(--font-mono)', lineHeight: 1.65, resize: 'vertical', outline: 'none',
              transition: 'border-color 0.2s',
            }}
          />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-fade)' }}>{input.length.toLocaleString()} chars</span>
        </div>

        {/* Output — only in format/minify mode */}
        {mode !== 'validate' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Resultado</label>
              <button onClick={copy} disabled={!output} className="btn btn-glow btn-sm" style={{ opacity: output ? 1 : 0.4 }}>
                {copied ? '✓ Copiado' : 'Copiar'}
              </button>
            </div>
            <textarea
              value={output}
              readOnly
              rows={16}
              placeholder="El resultado aparece aquí..."
              spellCheck={false}
              style={{
                width: '100%', padding: '14px 16px', background: 'var(--ink-2)',
                border: '1px solid var(--line)', borderRadius: 12, color: 'var(--paper)',
                fontSize: 13, fontFamily: 'var(--font-mono)', lineHeight: 1.65,
                resize: 'vertical', outline: 'none',
              }}
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-fade)' }}>
              {output.length.toLocaleString()} chars
              {output && input && mode === 'minify' && (
                <span style={{ marginLeft: 8, color: 'var(--lime)' }}>
                  {Math.round((1 - output.length / input.length) * 100)}% más pequeño
                </span>
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
