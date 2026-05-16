import type { Metadata } from 'next';
import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import AdBlock from '@/components/AdBlock';

import { tools, toolCategories } from '@/lib/tools';

export const metadata: Metadata = {
  title: 'Herramientas web gratuitas — GaloDev',
  description: 'Herramientas web gratuitas: video, social, generadores y más. Sin registro, sin rastreos, todo en tu navegador.',
};

export default function ToolsPage() {
  return (
    <>
      {/* HEAD */}
      <section style={{ padding: '56px 0 32px', borderBottom: '1px solid var(--line)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,209,255,0.15), transparent 60%)', top: -200, left: -100, filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div className="container">
          <span className="kicker" style={{ marginBottom: 24, display: 'inline-flex' }}>13 herramientas · todas gratis · sin registro</span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'end' }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: 0.94, letterSpacing: '-0.03em', marginTop: 16 }}>
                Tools que <em style={{ fontStyle: 'italic', color: 'var(--lime)' }}>funcionan.</em>
              </h1>
              <p style={{ fontSize: 18, color: 'var(--paper-dim)', maxWidth: 600, marginTop: 16 }}>
                Todo corre en tu navegador. Cero uploads a servidores. Cero rastreos. Abre DevTools y compruébalo.
              </p>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--lime)', textAlign: 'right' }}>
              Gratis · Sin registro · Sin rastreo
            </div>
          </div>
        </div>
      </section>

      {/* LEADERBOARD AD */}
      <div className="container" style={{ paddingTop: 32 }}>
        <AdBlock format="leaderboard" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD} />
      </div>

      {/* TOOLS GRID */}
      <section>
        <div className="container">
          <div className="section-head" style={{ marginBottom: 32 }}>
            <h2 className="section-head-title">Todas las <span className="text-italic">herramientas.</span></h2>
          </div>

          <div className="grid-tools">
            {tools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
          </div>

          {/* IN-CONTENT AD */}
          <div style={{ marginTop: 40 }}>
            <AdBlock format="inline" slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE} />
          </div>

          {/* COMING SOON NOTICE */}
          <div style={{ marginTop: 64, padding: '40px', border: '1px dashed var(--line-2)', borderRadius: 'var(--radius)', textAlign: 'center', background: 'var(--ink-2)' }}>
            <span className="kicker" style={{ justifyContent: 'center', marginBottom: 16, display: 'flex' }}>En construcción</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-0.025em', marginBottom: 16 }}>
              Más herramientas <em style={{ color: 'var(--lime)' }}>en camino.</em>
            </h2>
            <p style={{ color: 'var(--paper-mute)', maxWidth: 480, margin: '0 auto 24px' }}>
              ¿Tienes una sugerencia? Escríbenos directamente o abre un issue en GitHub.
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
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ borderTop: '1px solid var(--line)', background: 'var(--ink-2)' }}>
        <div className="container">
          <div className="why">
            <div>
              <span className="kicker" style={{ marginBottom: 24, display: 'inline-flex' }}>Cómo funciona</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 4.5vw, 60px)', lineHeight: 0.96, letterSpacing: '-0.025em', marginBottom: 24, marginTop: 16 }}>
                Privado por <em style={{ color: 'var(--lime)' }}>diseño.</em>
              </h2>
              <p style={{ color: 'var(--paper-dim)', marginBottom: 16, fontSize: 16 }}>Cada herramienta usa <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--ink-3)', padding: '2px 8px', borderRadius: 4, color: 'var(--lime)', fontSize: '0.88em' }}>crypto.getRandomValues()</code> u otros primitivos criptográficos del navegador.</p>
              <p style={{ color: 'var(--paper-dim)', fontSize: 16 }}>Nada se envía a un servidor. La generación, el cálculo de entropía, incluso la estimación de tiempo de crackeo — todo corre en tu navegador.</p>
            </div>
            <ol style={{ listStyle: 'none', counterReset: 'step' }}>
              {[
                { h: 'Selecciona una herramienta', p: 'Cada herramienta está optimizada para ser operable en menos de 3 segundos. Sin splash screens, sin "haz clic para empezar".' },
                { h: 'Ajusta los parámetros', p: 'Controles intuitivos con feedback inmediato. El resultado se actualiza en tiempo real mientras ajustas.' },
                { h: 'Copia o descarga', p: 'Un clic para copiar al portapapeles o descargar. Sin esperas, sin límites, sin "debes registrarte".' },
                { h: 'Vuelve cuando quieras', p: 'Sin cuentas, sin cookies de sesión. La herramienta está aquí cada vez que la necesites.' },
              ].map((step, i) => (
                <li key={i} style={{ counterIncrement: 'step', padding: '20px 0 20px 56px', borderBottom: '1px solid var(--line)', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: 24, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--lime)', letterSpacing: '0.06em' }}>0{i + 1}</span>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, letterSpacing: '-0.01em', marginBottom: 6, fontWeight: 400 }}>{step.h}</h4>
                  <p style={{ fontSize: 14, color: 'var(--paper-mute)' }}>{step.p}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* LINK TO BLOG */}
      <section style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="cta">
            <div className="cta-eyebrow">— Del creador</div>
            <h2 className="cta-title">Lee cómo se<br /><span className="text-italic">construyó esto.</span></h2>
            <p className="cta-sub">El proceso de construir herramientas reales, las decisiones técnicas y lo que aprendimos en el camino.</p>
            <div className="cta-actions">
              <Link href="/blog" className="btn btn-glow">
                Leer el blog →
              </Link>
              <Link href="/about" className="btn btn-ghost">Sobre nosotros →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
