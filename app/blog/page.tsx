import type { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import AdBlock from '@/components/AdBlock';
import NewsletterCTA from '@/components/NewsletterCTA';

export const metadata: Metadata = {
  title: 'Blog — El notebook de GaloDev',
  description: 'Construyendo en público. Notas sobre herramientas, ingresos, diseño, IA y el largo camino de 0 a los primeros usuarios.',
};

const categoryCounts = [
  { label: 'Todos', count: 14 },
  { label: 'Tutorial', count: 6 },
  { label: 'Guía', count: 4 },
  { label: 'Comparativa', count: 3 },
  { label: 'Recursos', count: 1 },
];

const topicCounts = [
  { label: 'Tutorial', count: 6 },
  { label: 'Guía', count: 4 },
  { label: 'Comparativa', count: 3 },
  { label: 'IA', count: 3 },
  { label: 'Deploy', count: 2 },
];

export default function BlogPage() {
  const latest = articles[articles.length - 1];
  const listed = [...articles].reverse();

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
            <div style={{ aspectRatio: '4/5', borderRadius: 18, overflow: 'hidden', border: '1px solid var(--line)', position: 'relative' }}
              className={latest.coverClass}>
              <span className="cover-orn" style={{ fontSize: 220, color: 'rgba(232,238,250,0.06)' }}>{latest.coverOrn}</span>
              <span style={{ position: 'absolute', top: 20, left: 20, padding: '6px 12px', background: 'rgba(11,11,10,0.78)', backdropFilter: 'blur(8px)', border: '1px solid var(--line-2)', borderRadius: 999, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Nuevo</span>
              <span style={{ position: 'absolute', bottom: 20, right: 20, fontFamily: 'var(--font-serif)', fontSize: 80, lineHeight: 1, fontStyle: 'italic', color: 'var(--lime)' }}>№{latest.issue}</span>
            </div>
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
                  <div style={{ fontSize: 14, color: 'var(--paper)' }}>Galo</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{latest.date} · {latest.readTime} lectura</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <Link href={`/blog/${latest.slug}`} className="btn btn-glow">
                  Leer el artículo
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER STRIP */}
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', borderBottom: '1px solid var(--line)', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {categoryCounts.map((cat, i) => (
              <span key={cat.label} className={`cat${i === 0 ? ' active' : ''}`}>
                {cat.label} <span className="ct">{cat.count}</span>
              </span>
            ))}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Ordenar: <span style={{ color: 'var(--paper)' }}>Más recientes</span>
          </div>
        </div>
      </div>

      {/* ARTICLE LIST + SIDEBAR */}
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 48, padding: '48px 0 64px' }} className="blog-body">
          <div>
            {listed.map((article, i) => (
              <div key={article.slug}>
                {i === 2 && (
                  <div style={{ margin: '24px 0' }}>
                    <AdBlock format="inline" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_INFEED} />
                  </div>
                )}
                <article style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 32, padding: '32px 0', borderBottom: '1px solid var(--line)', alignItems: 'center' }} className="article-row">
                  <Link href={`/blog/${article.slug}`} style={{ aspectRatio: '4/3', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line)', position: 'relative', display: 'block' }}
                    className={`article-cover ${article.coverClass}`}>
                    <span className="cover-orn">{article.coverOrn}</span>
                    <span className="article-cover-tag">{article.category}</span>
                  </Link>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      <span>№ {article.issue}</span><span className="dot" />
                      <span>{article.date}</span><span className="dot" />
                      <span>{article.readTime} lectura</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 2.8vw, 38px)', margin: '12px 0', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                      <Link href={`/blog/${article.slug}`} style={{ color: 'var(--paper)', transition: 'color 0.2s var(--ease)' }}>
                        {article.headline}
                      </Link>
                    </h3>
                    <p style={{ fontSize: 15, color: 'var(--paper-mute)', lineHeight: 1.5, marginBottom: 16 }}>{article.excerpt}</p>
                    <Link href={`/blog/${article.slug}`} className="btn btn-ghost btn-sm">
                      Leer artículo →
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>

          {/* SIDEBAR */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 96, alignSelf: 'start' }}>

            {/* Follow box */}
            <div className="newsletter-inline">
              <h4>Construido en <span className="italic">público.</span></h4>
              <p>Síguenos en GitHub o escríbenos por WhatsApp para sugerencias.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                <a href="https://github.com/stevengalocr" target="_blank" rel="noopener noreferrer" className="btn btn-glow btn-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.35.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a11 11 0 0 1 2.88-.39c.98 0 1.96.13 2.88.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.75.12 3.04.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56C20.22 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" /></svg>
                  GitHub
                </a>
                <a href="https://wa.me/50672874779" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                  WhatsApp
                </a>
              </div>
            </div>

            <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius)', background: 'var(--ink-2)', overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Temas</div>
              <div style={{ padding: 10 }}>
                {topicCounts.map((topic) => (
                  <div key={topic.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: 8, fontSize: 14, transition: 'background 0.2s var(--ease)' }}>
                    <span>{topic.label}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)' }}>{topic.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <AdBlock format="sidebar" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR} />

            <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius)', background: 'var(--ink-2)', overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Más leídos · siempre</div>
              <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {listed.slice(0, 6).map((article, i) => (
                  <div key={article.slug} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: 10, alignItems: 'start' }}>
                    <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 24, color: i === 0 ? 'var(--lime)' : 'var(--paper-mute)', lineHeight: 1 }}>№{i + 1}</span>
                    <Link href={`/blog/${article.slug}`} style={{ fontSize: 14, color: 'var(--paper-dim)', lineHeight: 1.35 }}>{article.headline.replace(/\.$/, '')}</Link>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <NewsletterCTA variant="light" />
    </>
  );
}
