'use client';

import { useState, useCallback } from 'react';

type Mode = 'encode' | 'decode';

export default function Base64Tool() {
  const [mode, setMode] = useState<Mode>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const process = useCallback((text: string, currentMode: Mode) => {
    setError('');
    if (!text.trim()) { setOutput(''); return; }
    try {
      if (currentMode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(text))));
      } else {
        setOutput(decodeURIComponent(escape(atob(text.trim()))));
      }
    } catch {
      setError(currentMode === 'decode' ? 'Texto inválido — asegúrate de pegar Base64 válido.' : 'Error al codificar.');
      setOutput('');
    }
  }, []);

  const handleInput = (val: string) => {
    setInput(val);
    process(val, mode);
  };

  const handleMode = (newMode: Mode) => {
    setMode(newMode);
    process(input, newMode);
  };

  const swap = () => {
    const newMode: Mode = mode === 'encode' ? 'decode' : 'encode';
    const newInput = output;
    setMode(newMode);
    setInput(newInput);
    process(newInput, newMode);
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => { setInput(''); setOutput(''); setError(''); };

  return (
    <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Mode Toggle */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ display: 'flex', background: 'var(--ink-3)', border: '1px solid var(--line)', borderRadius: 999, padding: 4, gap: 4 }}>
          {(['encode', 'decode'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => handleMode(m)}
              style={{
                padding: '8px 20px', borderRadius: 999, fontSize: 13, fontFamily: 'var(--font-mono)',
                letterSpacing: '0.06em', textTransform: 'uppercase', border: 'none', cursor: 'pointer',
                background: mode === m ? 'var(--lime)' : 'transparent',
                color: mode === m ? 'var(--ink)' : 'var(--paper-mute)',
                fontWeight: mode === m ? 600 : 400,
                transition: 'all 0.2s',
              }}
            >
              {m === 'encode' ? '→ Codificar' : '← Decodificar'}
            </button>
          ))}
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', letterSpacing: '0.06em' }}>
          {mode === 'encode' ? 'Texto plano → Base64' : 'Base64 → Texto plano'}
        </span>
      </div>

      {/* Input / Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'start' }}>
        {/* Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>
            {mode === 'encode' ? 'Texto de entrada' : 'Base64 de entrada'}
          </label>
          <textarea
            value={input}
            onChange={(e) => handleInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Escribe o pega texto aquí...' : 'Pega tu cadena Base64 aquí...'}
            rows={10}
            style={{
              width: '100%', padding: '14px 16px', background: 'var(--ink-3)',
              border: '1px solid var(--line)', borderRadius: 12, color: 'var(--paper)',
              fontSize: 14, fontFamily: mode === 'decode' ? 'var(--font-mono)' : 'inherit',
              lineHeight: 1.6, resize: 'vertical', outline: 'none',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-fade)' }}>
              {input.length} chars
            </span>
            <button onClick={clear} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.06em' }}>
              Limpiar
            </button>
          </div>
        </div>

        {/* Swap button */}
        <div style={{ paddingTop: 32, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            onClick={swap}
            disabled={!output}
            style={{
              width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--line)',
              background: output ? 'var(--ink-3)' : 'var(--ink-2)', cursor: output ? 'pointer' : 'not-allowed',
              color: output ? 'var(--lime)' : 'var(--paper-fade)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 18, transition: 'all 0.2s',
            }}
            title="Usar resultado como entrada"
          >
            ⇄
          </button>
        </div>

        {/* Output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>
            {mode === 'encode' ? 'Base64 resultado' : 'Texto resultado'}
          </label>
          <textarea
            value={error || output}
            readOnly
            rows={10}
            placeholder="El resultado aparece aquí..."
            style={{
              width: '100%', padding: '14px 16px',
              background: error ? 'rgba(255,107,157,0.06)' : 'var(--ink-2)',
              border: `1px solid ${error ? 'rgba(255,107,157,0.3)' : 'var(--line)'}`,
              borderRadius: 12,
              color: error ? 'var(--rust)' : 'var(--paper)',
              fontSize: 14, fontFamily: mode === 'encode' ? 'var(--font-mono)' : 'inherit',
              lineHeight: 1.6, resize: 'vertical', outline: 'none',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-fade)' }}>
              {output.length} chars
              {output && input && mode === 'encode' && (
                <span style={{ marginLeft: 8, color: output.length > input.length ? 'var(--rust)' : 'var(--lime)' }}>
                  ({output.length > input.length ? '+' : ''}{Math.round(((output.length - input.length) / input.length) * 100)}%)
                </span>
              )}
            </span>
            <button
              onClick={copy}
              disabled={!output}
              className="btn btn-glow btn-sm"
              style={{ opacity: output ? 1 : 0.4 }}
            >
              {copied ? 'Copiado' : 'Copiar'}
            </button>
          </div>
        </div>
      </div>

      {/* Quick examples */}
      <div style={{ borderTop: '1px solid var(--line)', paddingTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--paper-mute)', letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: 4 }}>Ejemplos</span>
        {[
          { label: 'Hola mundo', value: 'Hola mundo', m: 'encode' as Mode },
          { label: '{"key":"val"}', value: '{"key":"value","active":true}', m: 'encode' as Mode },
          { label: 'Decodificar', value: 'SGVsbG8sIFdvcmxkIQ==', m: 'decode' as Mode },
        ].map((ex) => (
          <button
            key={ex.label}
            onClick={() => { setInput(ex.value); setMode(ex.m); process(ex.value, ex.m); }}
            style={{
              padding: '5px 12px', borderRadius: 999, fontSize: 12, fontFamily: 'var(--font-mono)',
              border: '1px solid var(--line)', background: 'var(--ink-3)', color: 'var(--paper-mute)',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            {ex.label}
          </button>
        ))}
      </div>
    </div>
  );
}
