'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'galodev_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // localStorage blocked (private mode, etc.) — skip
    }
  }, []);

  const accept = () => {
    try { localStorage.setItem(STORAGE_KEY, 'all'); } catch { /* */ }
    setVisible(false);
  };

  const essential = () => {
    try { localStorage.setItem(STORAGE_KEY, 'essential'); } catch { /* */ }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentimiento de cookies"
      style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        width: 'min(560px, calc(100vw - 32px))',
        background: 'var(--ink-2)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius)',
        padding: '18px 22px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        flexWrap: 'wrap',
      }}
    >
      <p style={{ flex: 1, fontSize: 13, color: 'var(--paper-mute)', lineHeight: 1.5, margin: 0, minWidth: 200 }}>
        Usamos cookies para publicidad (Google AdSense) y analítica anónima.{' '}
        <Link href="/privacy#cookies" style={{ color: 'var(--lime)', textDecoration: 'underline' }}>
          Política de privacidad
        </Link>
      </p>
      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        <button
          onClick={essential}
          style={{
            padding: '7px 14px', borderRadius: 8, border: '1px solid var(--line)',
            background: 'none', color: 'var(--paper-mute)', fontSize: 12,
            fontFamily: 'var(--font-mono)', cursor: 'pointer', letterSpacing: '0.04em',
          }}
        >
          Solo esenciales
        </button>
        <button
          onClick={accept}
          style={{
            padding: '7px 16px', borderRadius: 8, border: '1px solid var(--lime)',
            background: 'rgba(130,230,0,0.12)', color: 'var(--lime)', fontSize: 12,
            fontFamily: 'var(--font-mono)', cursor: 'pointer', letterSpacing: '0.04em',
            fontWeight: 600,
          }}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
