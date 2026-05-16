'use client';

import { useState, useMemo } from 'react';

interface Match { value: string; index: number; groups: string[] }

const CHEATSHEET = [
  { pattern: '.', desc: 'Cualquier carácter' },
  { pattern: '\\d', desc: 'Dígito [0-9]' },
  { pattern: '\\w', desc: 'Palabra [a-zA-Z0-9_]' },
  { pattern: '\\s', desc: 'Espacio en blanco' },
  { pattern: '^', desc: 'Inicio de línea' },
  { pattern: '$', desc: 'Fin de línea' },
  { pattern: '+', desc: 'Uno o más' },
  { pattern: '*', desc: 'Cero o más' },
  { pattern: '?', desc: 'Cero o uno' },
  { pattern: '{n,m}', desc: 'Entre n y m veces' },
  { pattern: '(abc)', desc: 'Grupo de captura' },
  { pattern: '(?:abc)', desc: 'Grupo sin captura' },
  { pattern: 'a|b', desc: 'a ó b' },
  { pattern: '[abc]', desc: 'Clase de caracteres' },
  { pattern: '[^abc]', desc: 'Clase negada' },
];

const EXAMPLES = [
  { label: 'Email', pattern: '[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}', text: 'Escríbeme a hola@galodev.com o soporte@ejemplo.org' },
  { label: 'URL', pattern: 'https?:\\/\\/[\\w\\-.]+(:\\d+)?(\\/[\\w\\-./?%&=]*)?', text: 'Visita https://galodev.com o http://ejemplo.com/path?q=1' },
  { label: 'Fecha', pattern: '\\d{2}[/-]\\d{2}[/-]\\d{4}', text: 'Reunión el 16/05/2026 y entrega el 30-06-2026' },
  { label: 'IPv4', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', text: 'Servidor en 192.168.1.1 y backup en 10.0.0.254' },
];

export default function RegexTester() {
  const [pattern, setPattern] = useState('\\b\\w+@\\w+\\.\\w+\\b');
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false });
  const [text, setText] = useState('Escríbeme a hola@galodev.com o soporte@ejemplo.org para más info.');
  const [showCheat, setShowCheat] = useState(false);

  const flagStr = Object.entries(flags).filter(([, v]) => v).map(([k]) => k).join('');

  const { matches, error, highlighted } = useMemo(() => {
    if (!pattern) return { matches: [], error: '', highlighted: text };
    try {
      const re = new RegExp(pattern, flagStr || 'g');
      const found: Match[] = [];
      let m: RegExpExecArray | null;
      const gRe = new RegExp(pattern, flagStr.includes('g') ? flagStr : flagStr + 'g');
      while ((m = gRe.exec(text)) !== null) {
        found.push({ value: m[0], index: m.index, groups: m.slice(1) });
        if (!flagStr.includes('g')) break;
      }
      // Build highlighted HTML
      let result = '';
      let last = 0;
      const colors = ['rgba(130,230,0,0.25)', 'rgba(91,209,255,0.25)', 'rgba(167,139,250,0.25)'];
      const hRe = new RegExp(pattern, flagStr.includes('g') ? flagStr : flagStr + 'g');
      let idx = 0;
      let hm: RegExpExecArray | null;
      while ((hm = hRe.exec(text)) !== null) {
        result += text.slice(last, hm.index).replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const bg = colors[idx % colors.length];
        result += `<mark style="background:${bg};border-radius:3px;padding:0 2px">${hm[0].replace(/</g, '&lt;').replace(/>/g, '&gt;')}</mark>`;
        last = hm.index + hm[0].length;
        idx++;
        if (!flagStr.includes('g')) break;
      }
      result += text.slice(last).replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return { matches: found, error: '', highlighted: result };
    } catch (e) {
      return { matches: [], error: (e as Error).message, highlighted: text.replace(/</g, '&lt;') };
    }
  }, [pattern, flagStr, text]);

  const toggleFlag = (f: keyof typeof flags) => setFlags(fl => ({ ...fl, [f]: !fl[f] }));

  return (
    <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Pattern input */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Patrón RegEx</label>
          {error && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--rust)' }}>{error}</span>}
          {!error && matches.length > 0 && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--lime)' }}>{matches.length} coincidencia{matches.length !== 1 ? 's' : ''}</span>}
          {!error && pattern && matches.length === 0 && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)' }}>Sin coincidencias</span>}
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--ink-3)', border: `1px solid ${error ? 'rgba(255,107,107,0.4)' : 'var(--line)'}`, borderRadius: 12, overflow: 'hidden', transition: 'border-color 0.2s' }}>
            <span style={{ padding: '0 12px', fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--paper-fade)' }}>/</span>
            <input
              value={pattern}
              onChange={e => setPattern(e.target.value)}
              placeholder="Escribe tu expresión regular..."
              spellCheck={false}
              style={{ flex: 1, padding: '12px 0', background: 'none', border: 'none', color: 'var(--lime)', fontFamily: 'var(--font-mono)', fontSize: 15, outline: 'none' }}
            />
            <span style={{ padding: '0 12px', fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--paper-fade)' }}>/{flagStr}</span>
          </div>
          {/* Flags */}
          <div style={{ display: 'flex', gap: 6 }}>
            {(['g', 'i', 'm', 's'] as const).map(f => (
              <button key={f} onClick={() => toggleFlag(f)} style={{
                width: 36, height: 36, borderRadius: 8, border: '1px solid', fontFamily: 'var(--font-mono)', fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
                borderColor: flags[f] ? 'var(--lime)' : 'var(--line)',
                background: flags[f] ? 'rgba(130,230,0,0.12)' : 'var(--ink-3)',
                color: flags[f] ? 'var(--lime)' : 'var(--paper-mute)',
              }} title={{ g: 'Global', i: 'Ignorar mayúsculas', m: 'Multilínea', s: 'Dotall' }[f]}>{f}</button>
            ))}
          </div>
        </div>
        {/* Examples */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {EXAMPLES.map(ex => (
            <button key={ex.label} onClick={() => { setPattern(ex.pattern); setText(ex.text); }} style={{
              padding: '5px 12px', borderRadius: 999, fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.06em',
              border: '1px solid var(--line)', background: 'var(--ink-3)', color: 'var(--paper-mute)', cursor: 'pointer',
            }}>{ex.label}</button>
          ))}
        </div>
      </div>

      {/* Test text */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Texto de prueba</label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={5}
          spellCheck={false}
          style={{ width: '100%', padding: '14px 16px', background: 'var(--ink-3)', border: '1px solid var(--line)', borderRadius: 12, color: 'var(--paper)', fontSize: 14, lineHeight: 1.65, resize: 'vertical', outline: 'none', fontFamily: 'inherit' }}
        />
      </div>

      {/* Highlighted result */}
      {text && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Resultado</label>
          <div
            dangerouslySetInnerHTML={{ __html: highlighted }}
            style={{ padding: '14px 16px', background: 'var(--ink-2)', border: '1px solid var(--line)', borderRadius: 12, fontSize: 14, lineHeight: 1.65, color: 'var(--paper-dim)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
          />
        </div>
      )}

      {/* Match list */}
      {matches.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Coincidencias ({matches.length})</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 200, overflowY: 'auto' }}>
            {matches.map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 14px', background: 'var(--ink-3)', borderRadius: 8, border: '1px solid var(--line)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-fade)', minWidth: 28 }}>#{i + 1}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--lime)', flex: 1 }}>{m.value}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-fade)' }}>pos {m.index}</span>
                {m.groups.length > 0 && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)' }}>grupos: [{m.groups.join(', ')}]</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cheatsheet */}
      <div style={{ borderTop: '1px solid var(--line)', paddingTop: 20 }}>
        <button onClick={() => setShowCheat(s => !s)} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--paper-mute)', background: 'none', border: 'none', cursor: 'pointer' }}>
          {showCheat ? '▲' : '▼'} Cheatsheet RegEx
        </button>
        {showCheat && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8, marginTop: 16 }}>
            {CHEATSHEET.map(({ pattern: p, desc }) => (
              <button key={p} onClick={() => setPattern(prev => prev + p)} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: 'var(--ink-3)',
                border: '1px solid var(--line)', borderRadius: 8, cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.2s',
              }}>
                <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--lime)', minWidth: 60 }}>{p}</code>
                <span style={{ fontSize: 12, color: 'var(--paper-mute)' }}>{desc}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
