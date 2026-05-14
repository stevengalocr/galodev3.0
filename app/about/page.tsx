import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About — GaloDev',
  description: 'GaloDev es una biblioteca de herramientas web gratuitas construida en público por un solo desarrollador. La historia, el manifiesto y cómo apoyar el proyecto.',
};

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section style={{ padding: '80px 0 64px', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <span className="kicker" style={{ marginBottom: 24, display: 'inline-flex' }}>El humano detrás de esto</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(56px, 9vw, 148px)', lineHeight: 0.88, letterSpacing: '-0.04em', marginBottom: 48 }}>
            Hola.<br />Soy <em style={{ color: 'var(--lime)' }}>Galo.</em>
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: 21, lineHeight: 1.5, color: 'var(--paper-dim)', marginBottom: 24 }}>
                Desarrollador indie desde Bogotá, Colombia. Construí GaloDev porque estaba cansado de que cada herramienta &quot;gratuita&quot; de internet requiriera mi email, mi cuenta, y 14 anuncios antes de dejarme hacer algo útil.
              </p>
              <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--paper-mute)', marginBottom: 32 }}>
                GaloDev es mi respuesta: herramientas que simplemente funcionan. Todo en el navegador, sin servidores, sin rastreos, sin bullshit.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="https://github.com" className="btn btn-dark" target="_blank" rel="noopener noreferrer">
                  GitHub →
                </a>
                <a href="https://twitter.com" className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                  Twitter / X →
                </a>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { n: '01', h: 'Bogotá, Colombia', p: 'UTC-5. Si no respondo de inmediato, probablemente sean las 3am.' },
                { n: '02', h: 'Stack principal', p: 'Next.js, TypeScript, Vercel, Supabase. El mismo stack de estas herramientas.' },
                { n: '03', h: 'Construido en público', p: 'Todo el proceso — los números, los errores, las decisiones — en el blog.' },
                { n: '04', h: 'Una sola persona', p: 'Sin equipo, sin inversores, sin oficina. Solo yo, un portátil, y un buen café.' },
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

      {/* MANIFIESTO */}
      <section>
        <div className="container">
          <div className="section-head">
            <h2 className="section-head-title">El <span className="text-italic">manifiesto.</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
            {[
              { title: 'Gratuito significa gratuito.', body: 'No free tier que se convierte en email-gate. No "export requires Pro". No "sign in with Google to continue". Gratuito es gratuito, para siempre.' },
              { title: 'Un anuncio. No doce.', body: 'El sitio se financia con un único slot de AdSense por página, claramente etiquetado. Sin autoplay. Sin intersticiales. Sin retargeting. La herramienta es el producto.' },
              { title: 'Privado por defecto.', body: 'Cada herramienta corre en tu navegador. Nada llega a nuestros servidores porque no tenemos servidores para esto. Verifica en DevTools → Network.' },
              { title: 'Open source donde importa.', body: 'El motor principal, los tokens de diseño, el framework de herramientas — todo MIT en GitHub. Fórkalo, cópialo, mejóralo.' },
            ].map((item) => (
              <div key={item.title} style={{ padding: 28, border: '1px solid var(--line)', borderRadius: 'var(--radius)', background: 'var(--ink-2)' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, letterSpacing: '-0.02em', marginBottom: 12 }}>{item.title}</h3>
                <p style={{ fontSize: 15, color: 'var(--paper-mute)', lineHeight: 1.6 }}>{item.body}</p>
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
            <h2 className="cta-title">¿Te ha ayudado<br /><span className="text-italic">GaloDev</span>?</h2>
            <p className="cta-sub">No es obligatorio. Pero un café cubre tres días de costes de servidor, y saber que alguien lo usa de verdad hace que siga mereciendo la pena construirlo.</p>
            <div className="cta-actions">
              <a href="https://buymeacoffee.com" className="btn btn-glow" target="_blank" rel="noopener noreferrer">
                ☕ Invítame a un café · $3
              </a>
              <Link href="/tools" className="btn btn-ghost">Ver las tools →</Link>
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
            Requests de herramientas, bugs, colaboraciones, o simplemente un &quot;hola&quot; — todo bienvenido. Respondo en 24-48h.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="mailto:hola@galodev.com" className="btn btn-glow">
              hola@galodev.com →
            </a>
            <a href="https://twitter.com" className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
              Twitter / X →
            </a>
            <a href="https://github.com" className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
              GitHub →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
