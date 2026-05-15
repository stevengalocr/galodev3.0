import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import ToolCard from '@/components/ToolCard';
import FAQ from '@/components/FAQ';
import NewsletterCTA from '@/components/NewsletterCTA';
import AdBlock from '@/components/AdBlock';
import { articles } from '@/lib/articles';
import { tools } from '@/lib/tools';

export const metadata: Metadata = {
  title: 'GaloDev — Herramientas gratuitas que parecen de pago.',
  description: 'Una biblioteca creciente de herramientas web pequeñas, rápidas y bellamente diseñadas. Sin registro. Sin rastreos. Sin "actualiza para exportar".',
};

const faqItems = [
  { q: '¿Es realmente gratis? ¿Dónde está la trampa?', a: 'Sin trampa. Cada herramienta, cada función, para siempre. El sitio se financia con un único slot de publicidad por página (claramente etiquetado) y propinas voluntarias ocasionales. Sin tier premium, sin upsell, sin "exportar requiere registro."' },
  { q: '¿Guardas mis archivos o datos?', a: 'No. Literalmente no podemos. Cada herramienta corre completamente en tu navegador usando WebAssembly o JavaScript nativo. Los archivos se procesan localmente y nunca se suben. Verifica abriendo DevTools → pestaña Network mientras usas cualquier herramienta.' },
  { q: '¿Puedo solicitar una herramienta?', a: 'Sí — así es como se construyó la mitad de las herramientas actuales. Abre un issue en GitHub o escríbenos. Si es ampliamente útil y factible en el lado del cliente, espera que esté lista en 5-10 días.' },
  { q: '¿Por qué no hay cuentas de usuario?', a: 'Porque las herramientas no las necesitan. Los ajustes persisten en localStorage, el trabajo es solo tuyo, y no hay nada que sincronizar. Las cuentas implicarían una base de datos, lo que implicaría costes, lo que implicaría un tier de pago. Nos saltamos todo eso.' },
  { q: '¿Puedo usar las herramientas comercialmente?', a: 'Sí. Genera logos para clientes, construye paletas para producción, formatea JSON en tu trabajo. El output es tuyo.' },
  { q: '¿Cómo puedo apoyar el proyecto?', a: 'No bloquees el único anuncio, comparte una herramienta con un amigo, dale una estrella al repo, o envía una propina si realmente quieres. Nada de esto es obligatorio.' },
];

const marqueeItems = [
  'Recortar Video', 'Comprimir Video', 'Crear GIF', 'Descargar Reels',
  'Descargar TikTok', 'Codificar Base64', 'Generador de Contraseñas', 'Formato JSON',
  'Paleta de Colores', 'Código QR', 'Comprimir Imagen', 'Editor Markdown',
];

export default function HomePage() {
  const featuredTools = tools.slice(0, 8);
  const featuredArticles = articles.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="hero" style={{ padding: '56px 0 32px', position: 'relative' }}>
        <div style={{
          position: 'absolute', width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(91, 209, 255,0.22), transparent 60%)',
          top: -180, right: -200, filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0,
        }} />
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <span className="kicker">v1.0 · 13 herramientas · sin registro, nunca</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(64px, 11vw, 188px)',
            lineHeight: 0.88, letterSpacing: '-0.04em', position: 'relative', zIndex: 1,
          }}>
            Herramientas<br />
            que parecen <em style={{ fontStyle: 'italic', color: 'var(--lime)' }}>de pago.</em>
          </h1>

          <div style={{
            display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48,
            alignItems: 'end', marginTop: 56, position: 'relative', zIndex: 1,
          }} className="hero-row">
            <div>
              <p style={{ fontSize: 21, lineHeight: 1.4, color: 'var(--paper-dim)', maxWidth: 480, letterSpacing: '-0.005em' }}>
                Una biblioteca creciente de herramientas web pequeñas, rápidas y bellamente diseñadas.{' '}
                <strong style={{ color: 'var(--paper)', fontWeight: 500 }}>Sin registro. Sin rastreos. Sin &quot;actualiza para exportar&quot;.</strong>{' '}
                Construido por un desarrollador cansado de sitios de conversión llenos de anuncios.
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
                <Link href="/tools" className="btn btn-glow btn-lg">
                  Ver todas las tools
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </Link>
                <Link href="/blog" className="btn btn-ghost btn-lg">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /></svg>
                  Leer el blog
                </Link>
              </div>
            </div>

            <aside style={{
              display: 'flex', flexDirection: 'column', gap: 18, padding: 24,
              border: '1px solid var(--line)', borderRadius: 'var(--radius)', background: 'var(--ink-2)',
            }}>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--lime)', boxShadow: '0 0 8px var(--lime)', display: 'inline-block' }} />
                Trending ahora
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  { name: 'TikTok Downloader', cat: 'Social', slug: 'tiktok-downloader' },
                  { name: 'Reels Downloader', cat: 'Social', slug: 'reels-downloader' },
                  { name: 'Video Trimmer', cat: 'Video', slug: 'video-trimmer' },
                  { name: 'Video Compressor', cat: 'Video', slug: 'video-compressor' },
                  { name: 'GIF Maker', cat: 'Video', slug: 'gif-maker' },
                ].map((item) => (
                  <Link key={item.name} href={`/tools/${item.slug}`} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '8px 0', borderBottom: '1px solid var(--line)', fontSize: 14,
                    transition: 'color 0.2s var(--ease)',
                  }}
                    className="hero-side-item"
                  >
                    <span>{item.name}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--lime)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{item.cat}</span>
                  </Link>
                ))}
              </div>
            </aside>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', marginTop: 72,
            padding: '32px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
            position: 'relative', zIndex: 1,
          }}>
            {[
              { num: '13', suf: '', label: 'Herramientas disponibles' },
              { num: '0', suf: '$', label: 'Para siempre, para todo' },
              { num: '0', suf: '', label: 'Datos enviados a servidores' },
              { num: '100', suf: '%', label: 'Client-side, privado' },
            ].map((stat) => (
              <div key={stat.label} style={{ padding: '0 24px', borderRight: '1px solid var(--line)' }}
                className="hero-stat">
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1, letterSpacing: '-0.025em' }}>
                  {stat.num}<em style={{ fontStyle: 'italic', color: 'var(--lime)' }}>{stat.suf}</em>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--paper-mute)', marginTop: 8 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          {[0, 1].map((rep) => (
            <span key={rep} className="marquee-item">
              {marqueeItems.map((item, i) => (
                <span key={i}>
                  <span className="star">/</span> {item}{i < marqueeItems.length - 1 && <span className="italic"> · </span>}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* TOOLS */}
      <section>
        <div className="container">
          <div className="section-head">
            <h2 className="section-head-title">Herramientas <span className="text-italic">disponibles.</span></h2>
            <Link href="/tools" className="btn btn-glow btn-sm">
              Ver todas las herramientas
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </Link>
          </div>


          <div className="grid-tools">
            {featuredTools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
          </div>
        </div>
      </section>

      {/* IN-CONTENT AD */}
      <div className="container" style={{ marginBottom: 0 }}>
        <AdBlock format="leaderboard" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD} />
      </div>

      {/* QUOTE */}
      <div style={{ padding: '88px 0', textAlign: 'center' }}>
        <div className="container">
          <p style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 4vw, 52px)',
            lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: 900, margin: '0 auto 24px',
          }}>
            <span style={{ color: 'var(--paper-fade)' }}>&ldquo;</span>Construí GaloDev porque cada "convertidor de PDF gratuito" quería mi
            <em style={{ color: 'var(--lime)', fontStyle: 'italic' }}> email, mi alma</em>, y 14 anuncios antes de dejarme hacer clic.<span style={{ color: 'var(--paper-fade)' }}>&rdquo;</span>
          </p>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>
            — Galo, fundador · 1 persona, 13 herramientas, 0 rastreadores
          </span>
        </div>
      </div>

      {/* WHY */}
      <section style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'start' }} className="why">
            <div style={{ position: 'sticky', top: 96 }}>
              <span className="kicker" style={{ marginBottom: 24, display: 'inline-flex' }}>El manifiesto</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 0.96, letterSpacing: '-0.03em', marginBottom: 24, marginTop: 16 }}>
                Construido como<br />un <em style={{ color: 'var(--lime)' }}>producto,</em><br />no un funnel.
              </h2>
              <p style={{ color: 'var(--paper-dim)', fontSize: 17, maxWidth: 440 }}>
                Sin &quot;free tier vs pro tier&quot;. Sin popups. Sin &quot;espera 5s para descargar&quot;. Así deberían haber sido los sitios de herramientas en 2014, y así deberían sentirse ahora.
              </p>
            </div>
            <div>
              {[
                { n: '01', h: 'Todo corre en tu navegador.', p: 'Tus archivos nunca tocan un servidor. Cierra la pestaña, los datos desaparecen. La mayoría de los "conversores online" no pueden prometer eso. GaloDev sí — abre la pestaña de red y compruébalo.' },
                { n: '02', h: 'Un anuncio por página, máximo.', p: 'Sí, este sitio tiene anuncios — así es como se mantiene gratis. Pero verás uno, claramente etiquetado, nunca video con reproducción automática, nunca intersticiales. La herramienta es el producto.' },
                { n: '03', h: 'Diseñado una vez, publicado cada día.', p: 'Cada herramienta usa el mismo sistema de diseño, así que una vez que aprendes una, las conoces todas. Nueva herramienta aproximadamente cada 5 días.' },
                { n: '04', h: 'Open source donde importa.', p: 'El motor principal, el framework de herramientas, los tokens de diseño — todo con licencia MIT en GitHub. Fórkalo, cópialo, aprende de él.' },
              ].map((item) => (
                <div key={item.n} style={{ padding: '28px 0', borderTop: '1px solid var(--line)', display: 'grid', gridTemplateColumns: '60px 1fr', gap: 24, alignItems: 'start' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', letterSpacing: '0.06em', paddingTop: 4 }}>{item.n}</span>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 2.6vw, 34px)', letterSpacing: '-0.02em', marginBottom: 8, lineHeight: 1.1 }}>{item.h}</h3>
                    <p style={{ color: 'var(--paper-dim)', fontSize: 15, lineHeight: 1.55 }}>{item.p}</p>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--line)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* FROM THE BLOG */}
      <section style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="section-head">
            <h2 className="section-head-title">Del <span className="text-italic">blog.</span></h2>
            <Link href="/blog" className="btn btn-ghost btn-sm">Todos los artículos →</Link>
          </div>
          <div className="grid-articles">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* SIDEBAR AD (inline here) */}
      <div className="container" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <AdBlock format="inline" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE} />
      </div>

      {/* FAQ */}
      <section style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="section-head">
            <span className="kicker">FAQ</span>
            <h2 className="section-head-title">Preguntas que la gente<br /><span className="text-italic">realmente hace.</span></h2>
          </div>
          <FAQ items={faqItems} defaultOpen={0} />
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <NewsletterCTA variant="light" />
    </>
  );
}
