'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Article } from '@/lib/articles';
import AdBlock from '@/components/AdBlock';

type Props = { articles: Article[] };

export default function BlogFilter({ articles }: Props) {
  const [active, setActive] = useState('Todos');
  const [sortDesc, setSortDesc] = useState(true);

  const categories = useMemo(() => {
    const counts: Record<string, number> = { Todos: articles.length };
    for (const a of articles) {
      counts[a.category] = (counts[a.category] ?? 0) + 1;
    }
    return Object.entries(counts).map(([label, count]) => ({ label, count }));
  }, [articles]);

  const listed = useMemo(() => {
    const filtered = active === 'Todos' ? articles : articles.filter(a => a.category === active);
    return sortDesc ? [...filtered].reverse() : [...filtered];
  }, [articles, active, sortDesc]);

  return (
    <>
      {/* FILTER STRIP */}
      <div className="container">
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 0', borderBottom: '1px solid var(--line)', flexWrap: 'wrap', gap: 12,
        }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {categories.map(({ label, count }) => (
              <button
                key={label}
                onClick={() => setActive(label)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', borderRadius: 999, cursor: 'pointer',
                  fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em',
                  border: '1px solid',
                  borderColor: active === label ? 'rgba(232,238,250,0.35)' : 'var(--line)',
                  background: active === label ? 'rgba(232,238,250,0.07)' : 'var(--ink-3)',
                  color: active === label ? 'var(--paper)' : 'var(--paper-mute)',
                  fontWeight: active === label ? 600 : 400,
                  transition: 'all 0.18s',
                }}
              >
                {label}
                <span style={{
                  padding: '1px 6px', borderRadius: 999, fontSize: 10,
                  background: active === label ? 'rgba(232,238,250,0.12)' : 'var(--ink-2)',
                  color: active === label ? 'var(--paper-dim)' : 'var(--paper-fade)',
                }}>{count}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setSortDesc(d => !d)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px',
              borderRadius: 8, transition: 'color 0.15s',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {sortDesc
                ? <path d="M3 4h13M3 8h9M3 12h5M17 20V4M17 20l-4-4M17 20l4-4" />
                : <path d="M3 20h13M3 16h9M3 12h5M17 4v16M17 4l-4 4M17 4l4 4" />}
            </svg>
            <span style={{ color: 'var(--paper)' }}>{sortDesc ? 'Más recientes' : 'Más antiguos'}</span>
          </button>
        </div>
      </div>

      {/* ARTICLE LIST + SIDEBAR */}
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 48, padding: '40px 0 64px' }} className="blog-body">
          <div>
            {listed.length === 0 && (
              <div style={{ padding: '64px 0', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--paper-mute)' }}>
                No hay artículos en esta categoría aún.
              </div>
            )}
            {listed.map((article, i) => (
              <div key={article.slug}>
                {i === 2 && (
                  <div style={{ margin: '24px 0' }}>
                    <AdBlock format="inline" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_INFEED} />
                  </div>
                )}
                <article style={{
                  display: 'grid', gridTemplateColumns: '320px 1fr', gap: 32,
                  padding: '32px 0', borderBottom: '1px solid var(--line)', alignItems: 'center',
                }} className="article-row">
                  <Link
                    href={`/blog/${article.slug}`}
                    style={{ aspectRatio: '4/3', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line)', position: 'relative', display: 'block' }}
                    className={`article-cover ${!article.image ? article.coverClass : ''}`}
                  >
                    {article.image
                      ? <img src={article.image} alt={article.headline} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      : <span className="cover-orn">{article.coverOrn}</span>
                    }
                    <span className="article-cover-tag">{article.category}</span>
                  </Link>
                  <div>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)',
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                    }}>
                      <span>№ {article.issue}</span><span className="dot" />
                      <span>{article.date}</span><span className="dot" />
                      <span>{article.readTime} lectura</span>
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 2.6vw, 36px)',
                      margin: '12px 0', lineHeight: 1.05, letterSpacing: '-0.02em',
                    }}>
                      <Link href={`/blog/${article.slug}`} style={{ color: 'var(--paper)', transition: 'color 0.2s var(--ease)' }}>
                        {article.headline}
                      </Link>
                    </h3>
                    <p style={{ fontSize: 15, color: 'var(--paper-mute)', lineHeight: 1.5, marginBottom: 16 }}>{article.excerpt}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Link href={`/blog/${article.slug}`} className="btn btn-ghost btn-sm">Leer artículo →</Link>
                      <span style={{
                        padding: '4px 10px', borderRadius: 999, fontSize: 10,
                        fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase',
                        background: 'var(--ink-3)', border: '1px solid var(--line)', color: 'var(--paper-fade)',
                      }}>{article.category}</span>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>

          {/* SIDEBAR */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 96, alignSelf: 'start' }}>
            <div className="newsletter-inline">
              <h3>Construido en <span className="italic">público.</span></h3>
              <p>Síguenos en GitHub o escríbenos por WhatsApp para sugerencias.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                <a href="https://github.com/stevengalocr" target="_blank" rel="noopener noreferrer" className="btn btn-glow btn-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.35.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a11 11 0 0 1 2.88-.39c.98 0 1.96.13 2.88.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.75.12 3.04.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56C20.22 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" /></svg>
                  GitHub
                </a>
                <a href="https://wa.me/50672874779" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">WhatsApp</a>
              </div>
            </div>

            <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius)', background: 'var(--ink-2)', overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Categorías</div>
              <div style={{ padding: 8 }}>
                {categories.filter(c => c.label !== 'Todos').map(({ label, count }) => (
                  <button key={label} onClick={() => setActive(label)} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    width: '100%', padding: '9px 12px', borderRadius: 8, fontSize: 13,
                    background: active === label ? 'rgba(232,238,250,0.07)' : 'none',
                    color: active === label ? 'var(--paper)' : 'var(--paper-dim)',
                    border: 'none', cursor: 'pointer', transition: 'background 0.15s', textAlign: 'left',
                  }}>
                    <span>{label}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)' }}>{count}</span>
                  </button>
                ))}
              </div>
            </div>

            <AdBlock format="sidebar" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR} />

            <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius)', background: 'var(--ink-2)', overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Más leídos</div>
              <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[...articles].reverse().slice(0, 6).map((article, i) => (
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
    </>
  );
}
