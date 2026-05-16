'use client';

import { useState, useCallback } from 'react';

type Mode = 'encode' | 'decode';
type Scope = 'component' | 'full';

const EXAMPLES = [
  { label: 'Query string', value: 'nombre=Galo Dev&ciudad=San José&activo=true', scope: 'component' as Scope },
  { label: 'URL completa', value: 'https://galodev.com/búsqueda?q=herramientas gratis&tipo=dev', scope: 'full' as Scope },
  { label: 'JSON en URL', value: '{"nombre":"GaloDev","versión":3}', scope: 'component' as Scope },
];

export default function UrlEncoder() {
  const [mode, setMode] = useState<Mode>('encode');
  const [scope, setScope] = useState<Scope>('component');
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const output = useCallback(() => {
    if (!input.trim()) return '';
    try {
      if (mode === 'encode') {
        return scope === 'component' ? encodeURIComponent(input) : encodeURI(input);
      } else {
        return scope === 'component' ? decodeURIComponent(input) : decodeURI(input);
      }
    } catch {
      return 'Error: entrada inválida para decodificar.';
    }
  }, [input, mode, scope]);

  const result = output();
  const isError = result.startsWith('Error:');

  const copy = async () => {
    if (!result || isError) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swap = () => {
    const current = result;
    if (!isError && current) {
      setInput(current);
      setMode(m => m === 'encode' ? 'decode' : 'encode');
    }
  };

  // Show which characters changed
  const diff = !isError && input && result ? (() => {
    const changed = new Set<string>();
    if (mode === 'encode') {
      for (const char of input) {
        const enc = scope === 'component' ? encodeURIComponent(char) : encodeURI(char);
        if (enc !== char) changed.add(char);
      }
    }
    return changed.size > 0 ? [...changed].slice(0, 12).join('  ') : null;
  })() : null;

  return (
    <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Mode */}
        <div style={{ display: 'flex', background: 'var(--ink-3)', border: '1px solid var(--line)', borderRadius: 999, padding: 4, gap: 4 }}>
          {([['encode', 'Codificar'], ['decode', 'Decodificar']] as [Mode, string][]).map(([m, label]) => (
            <button key={m} onClick={() => setMode(m)} style={{
              padding: '8px 18px', borderRadius: 999, fontSize: 12, fontFamily: 'var(--font-mono)',
              letterSpacing: '0.06em', border: 'none', cursor: 'pointer',
              background: mode === m ? 'var(--lime)' : 'transparent',
              color: mode === m ? 'var(--ink)' : 'var(--paper-mute)',
              fontWeight: mode === m ? 600 : 400, transition: 'all 0.2s',
            }}>{label}</button>
          ))}
        </div>

        {/* Scope */}
        <div style={{ display: 'flex', gap: 6 }}>
          {([['component', 'Componente'], ['full', 'URL completa']] as [Scope, string][]).map(([sc, label]) => (
            <button key={sc} onClick={() => setScope(sc)} style={{
              padding: '8px 16px', borderRadius: 999, fontSize: 12, fontFamily: 'var(--font-mono)',
              letterSpacing: '0.06em', border: '1px solid',
              borderColor: scope === sc ? 'var(--lime)' : 'var(--line)',
              background: scope === sc ? 'rgba(130,230,0,0.12)' : 'var(--ink-3)',
              color: scope === sc ? 'var(--lime)' : 'var(--paper-mute)', cursor: 'pointer', transition: 'all 0.2s',
            }}>{label}</button>
          ))}
        </div>

        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--paper-fade)', letterSpacing: '0.06em' }}>
          {scope === 'component' ? 'encodeURIComponent — para query params' : 'encodeURI — para URLs completas'}
        </span>
      </div>

      {/* Examples */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--paper-mute)', letterSpacing: '0.1em', textTransform: 'uppercase', alignSelf: 'center', marginRight: 4 }}>Ejemplos</span>
        {EXAMPLES.map(ex => (
          <button key={ex.label} onClick={() => { setInput(ex.value); setScope(ex.scope); setMode('encode'); }} style={{
            padding: '5px 12px', borderRadius: 999, fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em',
            border: '1px solid var(--line)', background: 'var(--ink-3)', color: 'var(--paper-mute)', cursor: 'pointer',
          }}>{ex.label}</button>
        ))}
      </div>

      {/* Input / Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>
              {mode === 'encode' ? 'Texto original' : 'Texto codificado'}
            </label>
            <button onClick={() => setInput('')} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', background: 'none', border: 'none', cursor: 'pointer' }}>Limpiar</button>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={9}
            spellCheck={false}
            placeholder={mode === 'encode' ? 'Pega texto o URL para codificar...' : 'Pega texto codificado para decodificar...'}
            style={{ width: '100%', padding: '14px 16px', background: 'var(--ink-3)', border: '1px solid var(--line)', borderRadius: 12, color: 'var(--paper)', fontSize: 13, fontFamily: 'var(--font-mono)', lineHeight: 1.65, resize: 'vertical', outline: 'none', wordBreak: 'break-all' }}
          />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-fade)' }}>{input.length} chars</span>
        </div>

        <button onClick={swap} disabled={isError || !result} title="Usar resultado como entrada" style={{
          width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--line)',
          background: result && !isError ? 'var(--ink-3)' : 'var(--ink-2)',
          color: result && !isError ? 'var(--lime)' : 'var(--paper-fade)',
          cursor: result && !isError ? 'pointer' : 'not-allowed', fontSize: 18, marginTop: 32, transition: 'all 0.2s',
        }}>⇄</button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>
              {mode === 'encode' ? 'URL codificada' : 'Texto decodificado'}
            </label>
            <button onClick={copy} disabled={!result || isError} className="btn btn-glow btn-sm" style={{ opacity: result && !isError ? 1 : 0.4 }}>
              {copied ? '✓ Copiado' : 'Copiar'}
            </button>
          </div>
          <textarea
            value={isError ? result : result}
            readOnly rows={9}
            style={{
              width: '100%', padding: '14px 16px',
              background: isError ? 'rgba(255,107,107,0.05)' : 'var(--ink-2)',
              border: `1px solid ${isError ? 'rgba(255,107,107,0.3)' : 'var(--line)'}`,
              borderRadius: 12, color: isError ? 'var(--rust)' : 'var(--paper)',
              fontSize: 13, fontFamily: 'var(--font-mono)', lineHeight: 1.65, resize: 'vertical', outline: 'none', wordBreak: 'break-all',
            }}
          />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-fade)' }}>{!isError ? result.length : 0} chars</span>
        </div>
      </div>

      {/* Diff info */}
      {diff && (
        <div style={{ padding: '10px 16px', background: 'rgba(130,230,0,0.06)', border: '1px solid rgba(130,230,0,0.15)', borderRadius: 10 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)' }}>Caracteres codificados: </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--lime)' }}>{diff}</span>
        </div>
      )}
    </div>
  );
}
