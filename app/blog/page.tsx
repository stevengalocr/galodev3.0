import type { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import AdBlock from '@/components/AdBlock';
import NewsletterCTA from '@/components/NewsletterCTA';
import SubscribeForm from '@/components/SubscribeForm';

export const metadata: Metadata = {
  title: 'Blog — El notebook de GaloDev',
  description: 'Construyendo en público. Notas sobre herramientas, ingresos, diseño, IA y el largo camino de 0 a los primeros usuarios.',
};

export default function BlogPage() {
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
              <div style={{ marginTop: 12 }}><strong style={{ color: 'var(--paper)' }}>Issue {articles.length}</strong> · Mayo 2025</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--paper-mute)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            <span>← Artículos anteriores</span>
            <span>Todos los artículos · más recientes primero</span>
            <a href="/rss.xml" style={{ color: 'var(--lime)' }}>RSS feed →</a>
          </div>
        </header>
      </div>

      {/* FEATURED */}
      <section style={{ padding: '64px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56, alignItems: 'center' }} className="feat-grid">
            <div style={{ aspectRatio: '4/5', borderRadius: 18, overflow: 'hidden', border: '1px solid var(--line)', position: 'relative' }}
              className={articles[0].coverClass}>
              <span className="cover-orn" style={{ fontSize: 220, color: 'rgba(232,238,250,0.06)' }}>{articles[0].coverOrn}</span>
              <span style={{ position: 'absolute', top: 20, left: 20, padding: '6px 12px', background: 'rgba(11,11,10,0.78)', backdropFilter: 'blur(8px)', border: '1px solid var(--line-2)', borderRadius: 999, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>▲ Destacado</span>
              <span style={{ position: 'absolute', bottom: 20, right: 20, fontFamily: 'var(--font-serif)', fontSize: 80, lineHeight: 1, fontStyle: 'italic', color: 'var(--lime)' }}>№{articles[0].issue}</span>
            </div>
            <div>
              <span className="kicker" style={{ marginBottom: 24, display: 'inline-flex' }}>Último · lectura larga</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 0.98, letterSpacing: '-0.03em', marginBottom: 24 }}>
                <Link href={`/blog/${articles[0].slug}`} style={{ transition: 'color 0.2s var(--ease)' }}>
                  {articles[0].headline}
                </Link>
              </h2>
              <p style={{ fontSize: 18, color: 'var(--paper-dim)', lineHeight: 1.55, marginBottom: 24 }}>{articles[0].lede}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                <span style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--ink-3)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--lime)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 22 }}>G</span>
                <div>
                  <div style={{ fontSize: 14, color: 'var(--paper)' }}>Galo</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{articles[0].date} · {articles[0].readTime} lectura</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <Link href={`/blog/${articles[0].slug}`} className="btn btn-glow">
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
            {[{ label: 'Todos', count: articles.length }, { label: 'Tutorial', count: 2 }, { label: 'Comparativa', count: 2 }].map((cat, i) => (
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
            {articles.map((article, i) => (
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
            <div className="newsletter-inline">
              <h4>Recibe el próximo <span className="italic">drop.</span></h4>
              <p>Un email cuando sale una tool o un artículo. Sin fluff de marketing.</p>
              <SubscribeForm variant="stack" />
            </div>

            <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius)', background: 'var(--ink-2)', overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Temas</div>
              <div style={{ padding: 10 }}>
                {[{ label: 'Tutorial', count: 2 }, { label: 'Comparativa', count: 2 }, { label: 'IA', count: 2 }, { label: 'Deploy', count: 1 }, { label: 'Base de datos', count: 1 }].map((topic) => (
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
                {articles.map((article, i) => (
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
