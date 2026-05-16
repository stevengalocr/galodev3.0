import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'GaloDev — Herramientas gratuitas que parecen de pago.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0E0E10',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: -120, left: -80,
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(91,209,255,0.18) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: 'rgba(91,209,255,0.15)', border: '1px solid rgba(91,209,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#5BD1FF', fontSize: 24, fontWeight: 700,
          }}>G</div>
          <span style={{ color: '#F4F0E8', fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>
            GaloDev
          </span>
        </div>

        {/* Main text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{
            fontFamily: 'serif', fontSize: 72, lineHeight: 0.95,
            letterSpacing: '-0.035em', color: '#F4F0E8',
          }}>
            Herramientas que
            <span style={{ color: '#5BD1FF', fontStyle: 'italic' }}> funcionan.</span>
          </div>
          <div style={{ fontSize: 22, color: '#9B9589', lineHeight: 1.5, maxWidth: 700 }}>
            Gratis, sin registro, todo en tu navegador. Video, social, dev y más.
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: '#5BD1FF', fontFamily: 'monospace', fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            galodev.com
          </span>
          <div style={{ display: 'flex', gap: 12 }}>
            {['Video', 'Social', 'Dev', 'Generadores'].map((cat) => (
              <div key={cat} style={{
                padding: '6px 16px', borderRadius: 100,
                border: '1px solid rgba(244,240,232,0.15)',
                color: '#9B9589', fontSize: 13, letterSpacing: '0.05em',
                display: 'flex',
              }}>{cat}</div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
