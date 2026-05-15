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
              <a href="https://github.com/stevengalocr" className="btn btn-icon btn-dark" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.35.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a11 11 0 0 1 2.88-.39c.98 0 1.96.13 2.88.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.75.12 3.04.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56C20.22 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
                </svg>
              </a>
              <a href="https://wa.me/50672874779" className="btn btn-icon btn-dark" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.553 4.103 1.522 5.827L.057 23.082a.75.75 0 0 0 .92.908l5.4-1.43A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.686-.524-5.205-1.432l-.362-.216-3.853 1.02 1.05-3.745-.235-.376A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
              </a>
              <a href="https://instagram.com/galodevcr" className="btn btn-icon btn-dark" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Herramientas</h4>
            <ul>
              <li><Link href="/tools/video-trimmer">Recortar Video</Link></li>
              <li><Link href="/tools/video-compressor">Comprimir Video</Link></li>
              <li><Link href="/tools/gif-maker">Crear GIF</Link></li>
              <li><Link href="/tools/reels-downloader">Descargar Reels</Link></li>
              <li><Link href="/tools/tiktok-downloader">Descargar TikTok</Link></li>
              <li><Link href="/tools/base64">Base64</Link></li>
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
              <li><Link href="/about">Sobre nosotros</Link></li>
              <li><a href="https://github.com/stevengalocr" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><Link href="/about#contact">Solicitar herramienta</Link></li>
              <li><Link href="/about#apoya">Apoya el proyecto</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contacto</h4>
            <ul>
              <li><a href="mailto:GaloDevcr@gmail.com">GaloDevcr@gmail.com</a></li>
              <li><a href="tel:+50672874779">+506 7287-4779</a></li>
              <li><Link href="/privacy">Privacidad</Link></li>
              <li><Link href="/privacy#terms">Términos</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-status">Todas las herramientas operativas</span>
          <span>© {year} GaloDev · Hecho en Costa Rica</span>
        </div>
      </div>
    </footer>
  );
}
