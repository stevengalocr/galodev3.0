'use client';

import { useState } from 'react';

type Props = { variant?: 'light' | 'dark' };

export default function NewsletterCTA({ variant = 'light' }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) { setStatus('error'); return; }
    setStatus('ok');
    setEmail('');
  }

  const isDark = variant === 'dark';

  return (
    <section>
      <div className="container">
        <div className={`cta${isDark ? ' cta-dark' : ''}`}>
          <div className="cta-eyebrow">— Recibe el drop</div>
          <h2 className="cta-title">
            Nueva tool<br />
            cada <span className="text-italic">viernes.</span>
          </h2>
          <p className="cta-sub">
            Un email cuando sale una nueva tool o un artículo. Sin marketing, sin &quot;digest semanal&quot;, sin 47 links al pie. Solo: &quot;esto está live, esto es lo que hace.&quot;
          </p>

          {status === 'ok' ? (
            <div className="cta-actions">
              <span className="pill pill-lime" style={{ fontSize: 14, padding: '10px 20px' }}>
                Apuntado — te avisamos el próximo viernes
              </span>
            </div>
          ) : (
            <div className="cta-actions">
              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'inline-flex', gap: 8, alignItems: 'center',
                  background: isDark ? 'var(--ink-3)' : 'rgba(11,11,10,0.06)',
                  border: `1px solid ${isDark ? 'var(--line)' : 'rgba(11,11,10,0.1)'}`,
                  borderRadius: 999, padding: '6px 6px 6px 18px',
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  style={{ fontSize: 14, minWidth: 220, color: isDark ? 'var(--paper)' : 'var(--ink)' }}
                  required
                />
                <button type="submit" className="btn btn-glow btn-sm">
                  Suscribirse
                </button>
              </form>
              {status === 'error' && (
                <span style={{ fontSize: 12, color: 'var(--rust)', marginTop: 8, display: 'block' }}>
                  Introduce un email válido
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
