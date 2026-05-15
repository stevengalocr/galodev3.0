import type { Metadata } from 'next';
import Link from 'next/link';
import AdBlock from '@/components/AdBlock';

export const metadata: Metadata = {
  title: 'Sobre Steven — GaloDev',
  description: 'GaloDev es una colección de herramientas web gratuitas construida por Steven Galo, ingeniero en sistemas desde Costa Rica. Sin registros, sin paywalls, sin complicaciones.',
};

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section style={{ padding: '80px 0 64px', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <span className="kicker" style={{ marginBottom: 24, display: 'inline-flex' }}>El humano detrás de esto</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(56px, 9vw, 148px)', lineHeight: 0.88, letterSpacing: '-0.04em', marginBottom: 48 }}>
            Hola.<br />Soy <em style={{ color: 'var(--lime)' }}>Steven Galo.</em>
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: 21, lineHeight: 1.6, color: 'var(--paper-dim)', marginBottom: 20 }}>
                Ingeniero en Sistemas desde Costa Rica.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--paper-dim)', marginBottom: 20 }}>
                Paso gran parte de mi tiempo construyendo herramientas web, automatizaciones y productos pequeños que solucionan problemas reales.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--paper-mute)', marginBottom: 20 }}>
                Creé GaloDev después de frustrarme con internet: demasiadas herramientas &quot;gratis&quot; que terminan pidiendo registro, llenando la pantalla de anuncios o bloqueando funciones básicas detrás de un paywall.
              </p>
              <p style={{ fontSize: 20, lineHeight: 1.7, color: 'var(--paper-dim)', marginBottom: 32, fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>
                Así que decidí construir las mías.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--paper-mute)', marginBottom: 32 }}>
                Herramientas rápidas, simples y privadas. Sin cuentas. Sin spam. Sin complicaciones.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="https://github.com/stevengalocr" className="btn btn-dark" target="_blank" rel="noopener noreferrer">
                  GitHub →
                </a>
                <a href="https://instagram.com/galodevcr" className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                  Instagram →
                </a>
                <a href="https://wa.me/50672874779" className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                  WhatsApp →
                </a>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { n: '01', h: 'Costa Rica', p: 'UTC-6. Si no respondo de inmediato, probablemente sean las 3am.' },
                { n: '02', h: 'Stack principal', p: 'Next.js, TypeScript, Vercel, Supabase. El mismo stack de estas herramientas.' },
                { n: '03', h: 'Construido en público', p: 'Todo el proceso — las decisiones, los errores, los números — en el blog.' },
                { n: '04', h: 'Una sola persona', p: 'Sin equipo, sin inversores, sin oficina. Solo yo, un portátil, café… y muchas horas frente al monitor.' },
              ].map((item) => (
                <div key={item.n} style={{ padding: '24px 0', borderTop: '1px solid var(--line)', display: 'grid', gridTemplateColumns: '48px 1fr', gap: 20 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--paper-mute)', paddingTop: 4 }}>{item.n}</span>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, letterSpacing: '-0.015em', marginBottom: 6 }}>{item.h}</h3>
                    <p style={{ fontSize: 14, color: 'var(--paper-mute)' }}>{item.p}</p>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--line)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* QUÉ ENCONTRARÁS */}
      <section style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div className="section-head">
            <h2 className="section-head-title">Qué encontrarás <span className="text-italic">aquí.</span></h2>
            <Link href="/tools" className="btn btn-glow btn-sm">
              Ver herramientas
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { cat: 'Video', items: ['Recortar clips', 'Comprimir video', 'Crear GIFs animados'], icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m10 9 5 3-5 3V9Z"/></svg> },
              { cat: 'Redes sociales', items: ['Descargar Reels de Instagram', 'Descargar videos de TikTok'], icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg> },
              { cat: 'Developers', items: ['Base64 encode / decode', 'Formato JSON', 'Generador de contraseñas'], icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
              { cat: 'Imagen', items: ['Comprimir PNG / JPG / WebP', 'Generador de códigos QR'], icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg> },
              { cat: 'Color & Diseño', items: ['Constructor de paletas', 'Exportar a Tailwind / CSS'], icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="19" cy="13" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="10" cy="20" r="2.5"/></svg> },
              { cat: 'Texto & Más', items: ['Editor Markdown', 'Conversor de unidades'], icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/></svg> },
            ].map((block) => (
              <div key={block.cat} style={{ padding: 24, border: '1px solid var(--line)', borderRadius: 'var(--radius)', background: 'var(--ink-2)' }}>
                <div style={{ color: 'var(--lime)', marginBottom: 12 }}>{block.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, letterSpacing: '-0.015em', marginBottom: 12 }}>{block.cat}</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {block.items.map((item) => (
                    <li key={item} style={{ fontSize: 13, color: 'var(--paper-mute)', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: 'var(--lime)', fontFamily: 'var(--font-mono)', fontSize: 10 }}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 24, fontSize: 14, color: 'var(--paper-mute)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
            Todo rápido. Todo en el navegador. Más herramientas llegando cada semana.
          </p>
        </div>
      </section>

      {/* AD */}
      <div className="container" style={{ paddingTop: 32, paddingBottom: 0 }}>
        <AdBlock format="leaderboard" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD} />
      </div>

      {/* MANIFIESTO */}
      <section>
        <div className="container">
          <div className="section-head">
            <h2 className="section-head-title">El <span className="text-italic">manifiesto.</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {[
              {
                title: 'Gratuito significa gratuito.',
                body: 'Sin registros obligatorios. Sin funciones bloqueadas detrás de un plan Pro. Sin pedirte una cuenta para exportar un archivo.\n\nSi una herramienta dice "gratis", debería ser realmente gratis.',
              },
              {
                title: 'Un anuncio. No doce.',
                body: 'GaloDev se mantiene con un único bloque de AdSense por página, claramente etiquetado.\n\nSin popups. Sin autoplay. Sin intersticiales.\n\nLa herramienta es el producto.',
              },
              {
                title: 'Privado por diseño.',
                body: 'La mayoría de herramientas corren directamente en tu navegador. Tus datos no se almacenan ni se rastrean.\n\nPuedes verificarlo abriendo DevTools → Network mientras usas cualquier herramienta.',
              },
              {
                title: 'Open source donde importa.',
                body: 'El motor principal, los tokens de diseño, el framework de herramientas — todo en GitHub. Fórkalo, cópialo, mejóralo.',
              },
            ].map((item) => (
              <div key={item.title} style={{ padding: 28, border: '1px solid var(--line)', borderRadius: 'var(--radius)', background: 'var(--ink-2)' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, letterSpacing: '-0.02em', marginBottom: 14 }}>{item.title}</h3>
                {item.body.split('\n\n').map((paragraph, i) => (
                  <p key={i} style={{ fontSize: 15, color: 'var(--paper-mute)', lineHeight: 1.7, marginBottom: i < item.body.split('\n\n').length - 1 ? 12 : 0 }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APOYA EL PROYECTO */}
      <section id="apoya" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="cta cta-dark">
            <div className="cta-eyebrow">— Apoya el proyecto</div>
            <h2 className="cta-title">¿Te ahorró tiempo<br /><span className="text-italic">alguna herramienta</span>?</h2>
            <p className="cta-sub">
              Si alguna herramienta te ayudó en algo, puedes apoyar el proyecto con un café.<br />
              Cada aporte ayuda a seguir construyendo nuevas herramientas y mantener GaloDev online.
            </p>
            <div className="cta-actions">
              <a href="https://ko-fi.com/galodev" className="btn btn-glow" target="_blank" rel="noopener noreferrer">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8, verticalAlign: 'middle' }}>
                  <path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/>
                </svg>
                Invítame a un café · $3
              </a>
              <Link href="/tools" className="btn btn-ghost">Ver las herramientas →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contact" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <span className="kicker" style={{ marginBottom: 24, display: 'inline-flex' }}>Contacto</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 4.5vw, 64px)', letterSpacing: '-0.025em', lineHeight: 0.95, marginBottom: 24 }}>
            ¿Tienes una <em style={{ color: 'var(--lime)' }}>idea</em>?
          </h2>
          <p style={{ fontSize: 17, color: 'var(--paper-dim)', marginBottom: 32 }}>
            Solicitudes de herramientas, bugs, colaboraciones, o simplemente un &quot;hola&quot; — todo es bienvenido. Respondo en 24–48h.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="mailto:GaloDevcr@gmail.com" className="btn btn-glow">
              galodevcr@gmail.com →
            </a>
            <a href="tel:+50672874779" className="btn btn-ghost">
              +506 7287-4779
            </a>
            <a href="https://github.com/stevengalocr" className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
              GitHub →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
