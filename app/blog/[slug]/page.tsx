import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllSlugs, articles } from '@/lib/articles';
import AdBlock from '@/components/AdBlock';
import ArticleCard from '@/components/ArticleCard';
import ArticleTOC from '@/components/ArticleTOC';


type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.lede,
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.lede,
      publishedTime: article.dateISO,
      authors: ['GaloDev'],
      locale: 'es_ES',
    },
    alternates: { canonical: `https://galodev.com/blog/${slug}` },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.lede,
    datePublished: article.dateISO,
    author: { '@type': 'Person', name: 'Galo', url: 'https://galodev.com/about' },
    publisher: { '@type': 'Organization', name: 'GaloDev', url: 'https://galodev.com' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* READING PROGRESS + HERO */}
      <ReadingProgress />

      <header style={{ padding: '56px 0 32px', borderBottom: '1px solid var(--line)', position: 'relative' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--paper-mute)', marginBottom: 32 }}>
            <Link href="/blog" style={{ color: 'var(--paper-mute)', transition: 'color 0.2s' }}>← El notebook</Link>
            <span className="dot" style={{ width: 3, height: 3, background: 'var(--paper-fade)', borderRadius: '50%', display: 'inline-block' }} />
            <span style={{ color: 'var(--lime)' }}>Issue №{article.issue}</span>
            <span className="dot" style={{ width: 3, height: 3, background: 'var(--paper-fade)', borderRadius: '50%', display: 'inline-block' }} />
            <span>{article.category}</span>
            <span className="dot" style={{ width: 3, height: 3, background: 'var(--paper-fade)', borderRadius: '50%', display: 'inline-block' }} />
            <span>{article.readTime} lectura</span>
            <span className="dot" style={{ width: 3, height: 3, background: 'var(--paper-fade)', borderRadius: '50%', display: 'inline-block' }} />
            <span>{article.date}</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(48px, 7vw, 104px)', lineHeight: 0.94, letterSpacing: '-0.035em', maxWidth: 1000, marginBottom: 32 }}
            dangerouslySetInnerHTML={{ __html: article.headline.replace(/\.$/, '') + '.' }} />

          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(20px, 2vw, 28px)', lineHeight: 1.4, letterSpacing: '-0.005em', color: 'var(--paper-dim)', maxWidth: 760, marginBottom: 40 }}>
            {article.lede}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', paddingTop: 32, borderTop: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--ink-3)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--lime)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 26 }}>G</span>
              <div>
                <div style={{ fontSize: 15, color: 'var(--paper)' }}>Galo</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Fundador · Costa Rica</div>
              </div>
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-dark btn-sm">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" /></svg>
                Compartir
              </button>
            </div>
          </div>

          {/* Cover image */}
          <div style={{ aspectRatio: '21/9', borderRadius: 18, overflow: 'hidden', border: '1px solid var(--line)', position: 'relative', marginTop: 32 }}
            className={article.coverClass}>
            <span className="cover-orn" style={{ fontSize: 240 }}>{article.coverOrn}</span>
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 280px', gap: 56, padding: '64px 0' }} className="a-body">

          {/* TOC */}
          <ArticleTOC toc={article.toc} />

          {/* ARTICLE CONTENT */}
          <article style={{ maxWidth: 720, fontSize: 18, lineHeight: 1.7, color: 'var(--paper-dim)' }} className="a-content"
            dangerouslySetInnerHTML={{ __html: article.content }} />

          {/* SIDE RAIL */}
          <aside style={{ position: 'sticky', top: 96, alignSelf: 'start', display: 'flex', flexDirection: 'column', gap: 24 }}>
            <AdBlock format="rectangle" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR} />

            {/* Tip card */}
            <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: 22, background: 'linear-gradient(135deg, rgba(91,209,255,0.08), transparent 70%), var(--ink-2)' }}>
              <span className="kicker" style={{ marginBottom: 12, display: 'inline-flex' }}>¿Te gustó?</span>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 22, lineHeight: 1.15, letterSpacing: '-0.015em', margin: '12px 0 16px' }}>
                Un café cubre <em style={{ color: 'var(--lime)' }}>tres días</em> de costes de servidor.
              </p>
              <Link href="/about#apoya" className="btn btn-glow btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                Apoya el proyecto · $3
              </Link>
            </div>

            <AdBlock format="skyscraper" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_SKYSCRAPER} />
          </aside>
        </div>
      </div>

      {/* NEXT / PREV */}
      {(article.prev || article.next) && (
        <section style={{ padding: '56px 0', borderTop: '1px solid var(--line)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid var(--line)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
              {article.prev ? (
                <Link href={`/blog/${article.prev.slug}`} style={{ padding: 32, transition: 'background 0.2s var(--ease)', display: 'block' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--paper-mute)', marginBottom: 12 }}>← Anterior</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px, 2.4vw, 30px)', lineHeight: 1.1, letterSpacing: '-0.02em', transition: 'color 0.2s' }}>{article.prev.title}</h3>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', marginTop: 12, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{article.prev.category} · {article.prev.readTime}</div>
                </Link>
              ) : <div />}
              {article.next && (
                <Link href={`/blog/${article.next.slug}`} style={{ padding: 32, borderLeft: '1px solid var(--line)', transition: 'background 0.2s var(--ease)', display: 'block', textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--paper-mute)', marginBottom: 12 }}>Siguiente →</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px, 2.4vw, 30px)', lineHeight: 1.1, letterSpacing: '-0.02em', transition: 'color 0.2s' }}>{article.next.title}</h3>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', marginTop: 12, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{article.next.category} · {article.next.readTime}</div>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* RELATED */}
      <section style={{ borderTop: '1px solid var(--line)', paddingTop: 72 }}>
        <div className="container">
          <div className="section-head">
            <h2 className="section-head-title">Sigue <span className="text-italic">leyendo.</span></h2>
            <Link href="/blog" className="btn btn-ghost btn-sm">Todos los artículos →</Link>
          </div>
          <div className="grid-articles">
            {related.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container">
          <div className="cta cta-dark">
            <div className="cta-eyebrow">— Construido en público</div>
            <h2 className="cta-title">¿Tienes una<br /><span className="text-italic">sugerencia?</span></h2>
            <p className="cta-sub">Seguimos construyendo. Si tienes una idea para una herramienta o un tema para el blog, escríbenos directamente o abre un issue en GitHub.</p>
            <div className="cta-actions">
              <a href="https://wa.me/50672874779" target="_blank" rel="noopener noreferrer" className="btn btn-glow">
                WhatsApp
              </a>
              <a href="https://github.com/stevengalocr" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ReadingProgress() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, background: 'rgba(91,209,255,0.1)', zIndex: 200 }}>
      <div id="reading-progress" style={{ height: '100%', background: 'var(--lime)', width: '0%', boxShadow: '0 0 10px var(--lime)', transition: 'width 0.05s linear' }} />
      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          var bar=document.getElementById('reading-progress');
          if(!bar) return;
          function upd(){var h=document.documentElement,max=h.scrollHeight-h.clientHeight,pct=max>0?(h.scrollTop/max)*100:0;bar.style.width=pct+'%';}
          document.addEventListener('scroll',upd);upd();
        })();
      ` }} />
    </div>
  );
}
