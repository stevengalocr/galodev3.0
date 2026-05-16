'use client';

import { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'galodev-quick-notes';

export default function QuickNotes() {
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setText(stored);
  }, []);

  const handleChange = (val: string) => {
    setText(val);
    setSaved(false);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, val);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    }, 800);
  };

  const clear = () => {
    setText('');
    localStorage.removeItem(STORAGE_KEY);
    setShowClearConfirm(false);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(text);
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lineCount = text ? text.split('\n').length : 0;
  const charCount = text.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderBottom: '1px solid var(--line)', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Quick Notes</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: saved ? 'var(--lime)' : 'var(--paper-fade)' }}>
            {saved ? '✓ Guardado' : 'guardado en tu dispositivo'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-fade)' }}>
            {wordCount}p · {lineCount}l · {charCount}c
          </span>
          <button onClick={copyAll} disabled={!text} className="btn btn-ghost btn-sm" style={{ opacity: text ? 1 : 0.4 }}>
            Copiar todo
          </button>
          {!showClearConfirm
            ? <button onClick={() => setShowClearConfirm(true)} disabled={!text} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', background: 'none', border: 'none', cursor: text ? 'pointer' : 'not-allowed', opacity: text ? 1 : 0.4 }}>Limpiar</button>
            : (
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--rust)' }}>¿Seguro?</span>
                <button onClick={clear} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--rust)', background: 'none', border: '1px solid rgba(255,107,107,0.3)', borderRadius: 6, padding: '3px 8px', cursor: 'pointer' }}>Sí</button>
                <button onClick={() => setShowClearConfirm(false)} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', background: 'none', border: 'none', cursor: 'pointer' }}>No</button>
              </div>
            )
          }
        </div>
      </div>

      {/* Editor */}
      <textarea
        value={text}
        onChange={e => handleChange(e.target.value)}
        placeholder="Escribe aquí... tus notas se guardan automáticamente en este dispositivo."
        spellCheck={false}
        style={{
          flex: 1, padding: '24px 28px', background: 'var(--ink-2)', border: 'none',
          color: 'var(--paper)', fontSize: 15, fontFamily: 'inherit', lineHeight: 1.75,
          resize: 'none', outline: 'none', minHeight: 400,
        }}
      />

      {/* Footer note */}
      <div style={{ padding: '10px 24px', borderTop: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--paper-fade)', textTransform: 'uppercase' }}>
        Las notas se guardan en localStorage · Solo visibles en este navegador · No se envían a ningún servidor
      </div>
    </div>
  );
}
