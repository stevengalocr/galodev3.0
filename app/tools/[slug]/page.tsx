import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getToolBySlug, tools } from '@/lib/tools';
import AdBlock from '@/components/AdBlock';
import ToolCard from '@/components/ToolCard';

import ToolRenderer from '@/components/tools/ToolRenderer';
import { hasImplementation } from '@/lib/toolsImpl';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: `${tool.name} — GaloDev`,
    description: `${tool.desc} Gratis, sin registro, todo en tu navegador.`,
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const related = tools.filter((t) => t.slug !== slug).slice(0, 4);
  const implemented = hasImplementation(slug);

  return (
    <div className="container">
      {/* BREADCRUMB */}
      <div style={{
        padding: '24px 0 0', fontFamily: 'var(--font-mono)', fontSize: 11,
        letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--paper-mute)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <Link href="/tools" style={{ color: 'var(--paper-mute)', transition: 'color 0.2s' }}>Herramientas</Link>
        <span style={{ color: 'var(--paper-fade)' }}>/</span>
        <span style={{ color: 'var(--paper)' }}>{tool.name}</span>
      </div>

      {/* TOOL HEAD */}
      <header style={{ padding: '32px 0 48px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'end' }}>
        <div>
          <span className="kicker" style={{ display: 'inline-flex' }}>{tool.category} · corre en tu navegador</span>
          <h1 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(48px, 7vw, 96px)',
            lineHeight: 0.94, letterSpacing: '-0.03em', marginTop: 16,
          }}>
            {tool.name.split(' ').slice(0, -1).join(' ')}{tool.name.split(' ').length > 1 ? <br /> : ''}
            <em style={{ fontStyle: 'italic', color: 'var(--lime)' }}>{tool.name.split(' ').slice(-1)[0]}.</em>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--paper-dim)', maxWidth: 600, marginTop: 16 }}>{tool.desc}</p>
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'var(--lime)', textAlign: 'right',
        }}>
          Gratis · Sin registro
        </div>
      </header>

      {/* LEADERBOARD AD */}
      <AdBlock format="leaderboard" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD} style={{ marginBottom: 32 }} />

      {/* TOOL AREA */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32, paddingBottom: 64 }}>
        <div>
          {/* Tool surface */}
          <div style={{
            background: 'var(--ink-2)', border: '1px solid var(--line)',
            borderRadius: 24, overflow: 'hidden',
          }}>
            {/* Title bar */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 22px', borderBottom: '1px solid var(--line)', background: 'var(--ink-3)',
            }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                <span style={{ display: 'inline-flex', gap: 6 }}>
                  <i style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--rust)', display: 'inline-block' }} />
                  <i style={{ width: 10, height: 10, borderRadius: '50%', background: '#E8B82B', display: 'inline-block' }} />
                  <i style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--lime)', display: 'inline-block' }} />
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--paper-mute)', letterSpacing: '0.04em' }}>
                  /tools/{tool.slug}
                </span>
              </div>
              <span className={`pill ${implemented ? 'pill-lime' : 'pill-mute'}`}>
                {implemented ? '● Live' : '○ Próximamente'}
              </span>
            </div>

            {/* Tool content */}
            {implemented ? (
              <ToolRenderer slug={slug} />
            ) : (
              <div style={{
                padding: '60px 40px', textAlign: 'center', minHeight: 300,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', gap: 24,
              }}>
                <span className="kicker">Próximamente</span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-0.025em' }}>
                  <em style={{ color: 'var(--lime)' }}>{tool.name}</em> en construcción.
                </h2>
                <p style={{ color: 'var(--paper-mute)', maxWidth: 400 }}>
                  Esta herramienta está en desarrollo activo. Escríbenos si quieres que la prioricemos.
                </p>
                <div style={{ display: 'inline-flex', gap: 12 }}>
                  <a href="https://wa.me/50672874779" target="_blank" rel="noopener noreferrer" className="btn btn-glow">
                    WhatsApp
                  </a>
                  <a href="https://github.com/stevengalocr" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    GitHub
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* In-content ad */}
          <div style={{ marginTop: 24 }}>
            <AdBlock format="inline" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE} />
          </div>
        </div>

        {/* SIDEBAR */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <AdBlock format="rectangle" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR} />

          <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius)', background: 'var(--ink-2)', overflow: 'hidden' }}>
            <div style={{
              padding: '16px 20px', borderBottom: '1px solid var(--line)',
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--paper-mute)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span>Herramientas relacionadas</span>
              <Link href="/tools" style={{ color: 'var(--lime)' }}>→</Link>
            </div>
            <div style={{ padding: 8 }}>
              {related.slice(0, 4).map((t) => (
                <Link key={t.slug} href={`/tools/${t.slug}`} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: 12, borderRadius: 10, fontSize: 14, color: 'var(--paper-dim)',
                  transition: 'all 0.2s var(--ease)',
                }}>
                  <span>{t.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)' }}>{t.category}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* SEO TEXT SECTION */}
      {tool.seoText && (
        <section style={{ borderTop: '1px solid var(--line)', padding: '56px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }} className="why">
            <div>
              <span className="kicker" style={{ marginBottom: 16, display: 'inline-flex' }}>¿Qué es?</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 3vw, 42px)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: '16px 0 20px' }}>
                Todo sobre el <em style={{ color: 'var(--lime)' }}>{tool.name}.</em>
              </h2>
              <p style={{ fontSize: 16, color: 'var(--paper-dim)', lineHeight: 1.75 }}>{tool.seoText.what}</p>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, letterSpacing: '-0.01em', margin: '36px 0 12px', color: 'var(--paper)' }}>
                Cómo usarlo
              </h3>
              <p style={{ fontSize: 16, color: 'var(--paper-dim)', lineHeight: 1.75 }}>{tool.seoText.how}</p>
            </div>

            <div>
              <span className="kicker" style={{ marginBottom: 16, display: 'inline-flex' }}>Preguntas frecuentes</span>
              <div style={{ marginTop: 16 }}>
                {tool.seoText.faqs.map((faq, i) => (
                  <div key={i} style={{
                    borderBottom: '1px solid var(--line)', padding: '20px 0',
                  }}>
                    <h3 style={{
                      fontFamily: 'var(--font-serif)', fontSize: 18, letterSpacing: '-0.01em',
                      color: 'var(--paper)', marginBottom: 8, fontWeight: 400,
                    }}>{faq.q}</h3>
                    <p style={{ fontSize: 15, color: 'var(--paper-mute)', lineHeight: 1.65, margin: 0 }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* RELATED TOOLS STRIP */}
      <section style={{ borderTop: '1px solid var(--line)', padding: '56px 0' }}>
        <div className="section-head">
          <h2 className="section-head-title">También podrías <span className="text-italic">necesitar.</span></h2>
          <Link href="/tools" className="btn btn-ghost btn-sm">Todas las tools →</Link>
        </div>
        <div className="grid-tools">
          {related.map((t) => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </section>
    </div>
  );
}
