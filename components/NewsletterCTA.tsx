export default function NewsletterCTA({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const isDark = variant === 'dark';

  return (
    <section>
      <div className="container">
        <div className={`cta${isDark ? ' cta-dark' : ''}`}>
          <div className="cta-eyebrow">— Síguenos</div>
          <h2 className="cta-title">
            Construido<br />
            en <span className="text-italic">público.</span>
          </h2>
          <p className="cta-sub">
            Cada tool, cada artículo y cada decisión técnica documentada. Síguenos en GitHub o escríbenos directamente si tienes una sugerencia o quieres apoyar el proyecto.
          </p>
          <div className="cta-actions">
            <a
              href="https://github.com/stevengalocr"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glow"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.35.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a11 11 0 0 1 2.88-.39c.98 0 1.96.13 2.88.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.75.12 3.04.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56C20.22 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
              </svg>
              Ver en GitHub
            </a>
            <a
              href="https://wa.me/50672874779"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
