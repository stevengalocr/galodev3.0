import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 0' }}>
      <span className="kicker" style={{ marginBottom: 24, display: 'inline-flex' }}>Error 404</span>
      <h1 style={{
        fontFamily: 'var(--font-serif)', fontSize: 'clamp(64px, 10vw, 140px)',
        lineHeight: 0.9, letterSpacing: '-0.04em', marginBottom: 32,
      }}>
        Página no<br />
        <em style={{ color: 'var(--lime)', fontStyle: 'italic' }}>encontrada.</em>
      </h1>
      <p style={{ fontSize: 18, color: 'var(--paper-dim)', maxWidth: 480, marginBottom: 48, lineHeight: 1.6 }}>
        La URL que buscás no existe o fue movida. Quizás encontrás lo que necesitás en uno de estos lugares:
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link href="/" className="btn btn-glow">Inicio</Link>
        <Link href="/tools" className="btn btn-ghost">Herramientas</Link>
        <Link href="/blog" className="btn btn-ghost">Blog</Link>
      </div>

      <div style={{
        marginTop: 80, padding: '32px', border: '1px solid var(--line)',
        borderRadius: 'var(--radius)', background: 'var(--ink-2)',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24,
        maxWidth: 700,
      }}>
        {[
          { label: 'Base64 Tool', href: '/tools/base64', cat: 'Dev' },
          { label: 'Video Trimmer', href: '/tools/video-trimmer', cat: 'Video' },
          { label: 'Reels Downloader', href: '/tools/reels-downloader', cat: 'Social' },
          { label: 'TikTok Downloader', href: '/tools/tiktok-downloader', cat: 'Social' },
        ].map((t) => (
          <Link key={t.href} href={t.href} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 16px', borderRadius: 10, border: '1px solid var(--line)',
            fontSize: 14, color: 'var(--paper-dim)', transition: 'all 0.2s var(--ease)',
            background: 'var(--ink-3)',
          }}>
            <span>{t.label}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--paper-mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t.cat}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
