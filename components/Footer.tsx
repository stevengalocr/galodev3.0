import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="display-mark">
              <span className="italic">Galo</span>Dev
            </div>
            <p>Herramientas gratuitas que parecen de pago. Construido en público por un desarrollador con demasiadas pestañas abiertas.</p>
            <div style={{ display: 'inline-flex', gap: 10, marginTop: 24 }}>
              <a href="https://github.com" className="btn btn-icon btn-dark" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.35.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a11 11 0 0 1 2.88-.39c.98 0 1.96.13 2.88.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.75.12 3.04.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56C20.22 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
                </svg>
              </a>
              <a href="https://twitter.com" className="btn btn-icon btn-dark" aria-label="Twitter / X" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Herramientas</h4>
            <ul>
              <li><Link href="/tools?cat=generators">Generadores</Link></li>
              <li><Link href="/tools?cat=converters">Conversores</Link></li>
              <li><Link href="/tools?cat=text">Texto</Link></li>
              <li><Link href="/tools?cat=image">Imagen</Link></li>
              <li><Link href="/tools?cat=color">Color</Link></li>
              <li><Link href="/tools">Todas →</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Leer</h4>
            <ul>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/blog/desplegar-con-vercel">Deploy con Vercel</Link></li>
              <li><Link href="/blog/claude-vs-chatgpt">Claude vs ChatGPT</Link></li>
              <li><Link href="/blog/grok-vs-gemini">Grok vs Gemini</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Proyecto</h4>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><Link href="/about">Solicitar tool</Link></li>
              <li><Link href="/about">Apoya el proyecto</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><Link href="/privacy">Privacidad</Link></li>
              <li><Link href="/privacy#terms">Términos</Link></li>
              <li><Link href="/privacy#cookies">Cookies</Link></li>
              <li><Link href="/about#contact">Contacto</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-status">Todos los sistemas operativos</span>
          <span>© {year} GaloDev · MIT · Hecho en 🇨🇴</span>
        </div>
      </div>
    </footer>
  );
}
