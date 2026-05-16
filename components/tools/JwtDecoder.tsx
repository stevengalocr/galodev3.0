'use client';

import { useState, useMemo } from 'react';

function base64urlDecode(str: string): string {
  const b64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const padded = b64 + '=='.slice(0, (4 - b64.length % 4) % 4);
  try {
    return decodeURIComponent(atob(padded).split('').map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0')).join(''));
  } catch {
    return atob(padded);
  }
}

function timeAgo(ts: number): { text: string; expired: boolean } {
  const diff = ts - Math.floor(Date.now() / 1000);
  if (diff < 0) {
    const abs = Math.abs(diff);
    if (abs < 60) return { text: `Expiró hace ${abs}s`, expired: true };
    if (abs < 3600) return { text: `Expiró hace ${Math.floor(abs / 60)}m`, expired: true };
    if (abs < 86400) return { text: `Expiró hace ${Math.floor(abs / 3600)}h`, expired: true };
    return { text: `Expiró hace ${Math.floor(abs / 86400)} días`, expired: true };
  }
  if (diff < 60) return { text: `Expira en ${diff}s`, expired: false };
  if (diff < 3600) return { text: `Expira en ${Math.floor(diff / 60)}m`, expired: false };
  if (diff < 86400) return { text: `Expira en ${Math.floor(diff / 3600)}h`, expired: false };
  return { text: `Expira en ${Math.floor(diff / 86400)} días`, expired: false };
}

const EXAMPLE_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c3VhcmlvXzEyMyIsIm5hbWUiOiJHYWxvRGV2IiwiaWF0IjoxNzQ3NDE2NjAwLCJleHAiOjE3Nzg5NTI2MDB9.ejemplo_firma_no_verificada';

export default function JwtDecoder() {
  const [raw, setRaw] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const decoded = useMemo(() => {
    const token = raw.trim();
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return { error: 'JWT inválido — debe tener 3 partes separadas por puntos.' };
    try {
      const header = JSON.parse(base64urlDecode(parts[0]));
      const payload = JSON.parse(base64urlDecode(parts[1]));
      return { header, payload, signature: parts[2], error: null };
    } catch {
      return { error: 'No se pudo decodificar — verifica que el token sea válido.' };
    }
  }, [raw]);

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const payload = decoded && !decoded.error ? decoded.payload as Record<string, unknown> : null;
  const expInfo = payload?.exp ? timeAgo(payload.exp as number) : null;
  const iatDate = payload?.iat ? new Date((payload.iat as number) * 1000).toLocaleString('es-CR') : null;
  const expDate = payload?.exp ? new Date((payload.exp as number) * 1000).toLocaleString('es-CR') : null;

  return (
    <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Input */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>JSON Web Token</label>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setRaw(EXAMPLE_JWT)} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', background: 'none', border: 'none', cursor: 'pointer' }}>Ejemplo</button>
            <button onClick={() => setRaw('')} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', background: 'none', border: 'none', cursor: 'pointer' }}>Limpiar</button>
          </div>
        </div>
        <textarea
          value={raw}
          onChange={e => setRaw(e.target.value)}
          placeholder="Pega tu JWT aquí... eyJhbGciOiJIUzI1NiJ9.eyJzdWIi..."
          rows={4}
          spellCheck={false}
          style={{
            width: '100%', padding: '14px 16px', background: 'var(--ink-3)',
            border: `1px solid ${decoded?.error ? 'rgba(255,107,107,0.4)' : 'var(--line)'}`,
            borderRadius: 12, color: 'var(--lime)', fontFamily: 'var(--font-mono)', fontSize: 13,
            lineHeight: 1.5, resize: 'vertical', outline: 'none', wordBreak: 'break-all',
          }}
        />
        {decoded?.error && <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--rust)', margin: 0 }}>{decoded.error}</p>}
      </div>

      {decoded && !decoded.error && (
        <>
          {/* Status bar */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '8px 16px', background: 'var(--ink-3)', borderRadius: 999, border: '1px solid var(--line)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)' }}>Algoritmo</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--lime)' }}>{(decoded.header as Record<string, unknown>)?.alg as string || '—'}</span>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '8px 16px', background: 'var(--ink-3)', borderRadius: 999, border: '1px solid var(--line)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)' }}>Tipo</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--lime)' }}>{(decoded.header as Record<string, unknown>)?.typ as string || '—'}</span>
            </div>
            {expInfo && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '8px 16px', background: expInfo.expired ? 'rgba(255,107,107,0.08)' : 'rgba(130,230,0,0.07)', borderRadius: 999, border: `1px solid ${expInfo.expired ? 'rgba(255,107,107,0.3)' : 'rgba(130,230,0,0.2)'}` }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: expInfo.expired ? 'var(--rust)' : 'var(--lime)' }}>
                  {expInfo.expired ? '✕' : '✓'} {expInfo.text}
                </span>
              </div>
            )}
          </div>

          {/* Parts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: 'Header', data: decoded.header, key: 'header' },
              { label: 'Payload', data: decoded.payload, key: 'payload' },
            ].map(({ label, data, key }) => (
              <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>{label}</label>
                  <button onClick={() => copy(JSON.stringify(data, null, 2), key)} className="btn btn-ghost btn-sm">
                    {copied === key ? '✓' : 'Copiar'}
                  </button>
                </div>
                <pre style={{ margin: 0, padding: '14px 16px', background: 'var(--ink-2)', border: '1px solid var(--line)', borderRadius: 12, fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--paper)', lineHeight: 1.65, overflowX: 'auto' }}>
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            ))}
          </div>

          {/* Time claims */}
          {(iatDate || expDate) && (
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', padding: '16px 20px', background: 'var(--ink-3)', borderRadius: 12, border: '1px solid var(--line)' }}>
              {iatDate && (
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--paper-mute)', marginBottom: 4 }}>Emitido (iat)</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--paper)' }}>{iatDate}</div>
                </div>
              )}
              {expDate && (
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--paper-mute)', marginBottom: 4 }}>Expira (exp)</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: expInfo?.expired ? 'var(--rust)' : 'var(--paper)' }}>{expDate}</div>
                </div>
              )}
            </div>
          )}

          {/* Signature note */}
          <div style={{ padding: '12px 16px', background: 'rgba(232,162,43,0.07)', border: '1px solid rgba(232,162,43,0.2)', borderRadius: 10 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(232,162,43,0.9)', margin: 0, lineHeight: 1.6 }}>
              Esta herramienta decodifica el JWT pero no puede verificar la firma sin la clave secreta. Nunca compartas tu secret key.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
