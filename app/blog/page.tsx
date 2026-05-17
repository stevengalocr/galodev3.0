import type { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import AdBlock from '@/components/AdBlock';
import NewsletterCTA from '@/components/NewsletterCTA';
import BlogFilter from '@/components/BlogFilter';

export const metadata: Metadata = {
  title: 'Blog — El notebook de GaloDev',
  description: 'Artículos sobre IA, Next.js, herramientas para developers, productividad y tendencias tech. Todo en español, todo gratis.',
};

export default function BlogPage() {
  const latest = [...articles].reverse()[0];

  return (
    <>
      {/* MASTHEAD */}
      <div className="container">
        <header style={{ padding: '64px 0 32px', borderBottom: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, flexWrap: 'wrap', marginBottom: 32 }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(72px, 14vw, 220px)', lineHeight: 0.86, letterSpacing: '-0.045em' }}>
              El<br /><em style={{ fontStyle: 'italic', color: 'var(--lime)' }}>notebook.</em>
            </h1>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--paper-mute)', textAlign: 'right', lineHeight: 1.7 }}>
              <div><strong style={{ color: 'var(--paper)' }}>{articles.length} artículos</strong> · desde 2025</div>
              <div>IA, herramientas, monetización y desarrollo web</div>
              <div style={{ marginTop: 12 }}><strong style={{ color: 'var(--paper)' }}>Issue {articles.length}</strong> · Mayo 2026</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--paper-mute)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            <span>← Artículos anteriores</span>
            <span>Todos los artículos · más recientes primero</span>
          </div>
        </header>
      </div>

      {/* LEADERBOARD AD */}
      <div className="container" style={{ paddingTop: 24, paddingBottom: 8 }}>
        <AdBlock format="leaderboard" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD} />
      </div>

      {/* FEATURED — latest article */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56, alignItems: 'center' }} className="feat-grid">
            <Link href={`/blog/${latest.slug}`} style={{ aspectRatio: '4/5', borderRadius: 18, overflow: 'hidden', border: '1px solid var(--line)', position: 'relative', display: 'block' }}
              className={!latest.image ? latest.coverClass : ''}>
              {latest.image
                ? <img src={latest.image} alt={latest.headline} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span className="cover-orn" style={{ fontSize: 220, color: 'rgba(232,238,250,0.06)' }}>{latest.coverOrn}</span>
              }
              <span style={{ position: 'absolute', top: 20, left: 20, padding: '6px 12px', background: 'rgba(11,11,10,0.78)', backdropFilter: 'blur(8px)', border: '1px solid var(--line-2)', borderRadius: 999, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Nuevo</span>
              <span style={{ position: 'absolute', bottom: 20, right: 20, fontFamily: 'var(--font-serif)', fontSize: 80, lineHeight: 1, fontStyle: 'italic', color: 'var(--lime)' }}>№{latest.issue}</span>
            </Link>
            <div>
              <span className="kicker" style={{ marginBottom: 24, display: 'inline-flex' }}>Último · {latest.category}</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 0.98, letterSpacing: '-0.03em', marginBottom: 24 }}>
                <Link href={`/blog/${latest.slug}`} style={{ transition: 'color 0.2s var(--ease)' }}>
                  {latest.headline}
                </Link>
              </h2>
              <p style={{ fontSize: 18, color: 'var(--paper-dim)', lineHeight: 1.55, marginBottom: 24 }}>{latest.lede}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                <span style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--ink-3)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--lime)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 22 }}>G</span>
                <div>
                  <div style={{ fontSize: 14, color: 'var(--paper)' }}>Steven Galo</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{latest.date} · {latest.readTime} lectura</div>
                </div>
              </div>
              <Link href={`/blog/${latest.slug}`} className="btn btn-glow">
                Leer el artículo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FILTERABLE LIST (client component) */}
      <BlogFilter articles={articles} />

      <NewsletterCTA variant="light" />
    </>
  );
}
