import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad — GaloDev',
  description: 'Política de privacidad de GaloDev. Información sobre cookies, datos personales, publicidad de Google AdSense y tus derechos como usuario.',
};

export default function PrivacyPage() {
  return (
    <section>
      <div className="container" style={{ maxWidth: 760 }}>
        <div style={{ marginBottom: 48 }}>
          <span className="kicker" style={{ marginBottom: 16, display: 'inline-flex' }}>Legal</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(48px, 6vw, 80px)', lineHeight: 0.94, letterSpacing: '-0.03em', marginTop: 16 }}>
            Política de <em style={{ color: 'var(--lime)' }}>Privacidad.</em>
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--paper-mute)', marginTop: 16 }}>Última actualización: Mayo 2025</p>
        </div>

        <div style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--paper-dim)' }} className="a-content">
          <h2 id="intro" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 3vw, 40px)', color: 'var(--paper)', letterSpacing: '-0.02em', margin: '48px 0 16px' }}>1. Información general</h2>
          <p>GaloDev (&quot;nosotros&quot;, &quot;nuestro&quot;, &quot;el sitio&quot;) se compromete a proteger tu privacidad. Esta política de privacidad explica cómo recopilamos, usamos y protegemos tu información cuando visitas <strong>galodev.com</strong>.</p>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 3vw, 40px)', color: 'var(--paper)', letterSpacing: '-0.02em', margin: '48px 0 16px' }} id="datos">2. Datos que recopilamos</h2>
          <p><strong>Herramientas web:</strong> Las herramientas de GaloDev procesan todos los datos directamente en tu navegador. Ningún archivo, texto o dato personal que introduzcas en las herramientas llega a nuestros servidores.</p>
          <p><strong>Datos de uso anónimos:</strong> Podemos recopilar datos analíticos anónimos sobre el uso del sitio (páginas visitadas, tiempo de permanencia) mediante herramientas de analítica respetuosas con la privacidad.</p>
          <p><strong>Formularios de suscripción:</strong> Si decides suscribirte a nuestra newsletter, recopilaremos tu dirección de email. No la compartiremos con terceros ni la usaremos para fines distintos al envío de la newsletter.</p>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 3vw, 40px)', color: 'var(--paper)', letterSpacing: '-0.02em', margin: '48px 0 16px' }} id="adsense">3. Publicidad — Google AdSense</h2>
          <p>GaloDev usa <strong>Google AdSense</strong> para mostrar publicidad. Google AdSense puede usar cookies para personalizar los anuncios que ves en función de tus visitas anteriores a este sitio y otros sitios web.</p>
          <p>Puedes optar por no recibir publicidad personalizada visitando la <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--lime)' }}>Configuración de anuncios de Google</a>.</p>
          <p>Google, como proveedor de terceros, usa cookies para mostrar anuncios basados en las visitas anteriores de un usuario a tu sitio web u otros sitios web. El uso de cookies de publicidad por parte de Google permite a Google y a sus socios mostrar anuncios a los usuarios en función de su visita a sitios web en Internet.</p>
          <p>Para obtener más información sobre cómo Google usa tus datos, visita la <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--lime)' }}>Política de Privacidad de Google</a>.</p>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 3vw, 40px)', color: 'var(--paper)', letterSpacing: '-0.02em', margin: '48px 0 16px' }} id="cookies">4. Cookies</h2>
          <p>GaloDev usa los siguientes tipos de cookies:</p>
          <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
            <li style={{ paddingLeft: 32, marginBottom: 12, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--lime)', fontFamily: 'var(--font-mono)' }}>→</span>
              <strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del sitio. No requieren consentimiento.
            </li>
            <li style={{ paddingLeft: 32, marginBottom: 12, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--lime)', fontFamily: 'var(--font-mono)' }}>→</span>
              <strong>Cookies de preferencias:</strong> Guardan tus ajustes de herramientas en localStorage (solo en tu dispositivo, no se envían a ningún servidor).
            </li>
            <li style={{ paddingLeft: 32, marginBottom: 12, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--lime)', fontFamily: 'var(--font-mono)' }}>→</span>
              <strong>Cookies de publicidad:</strong> Usadas por Google AdSense para mostrar anuncios relevantes. Puedes desactivarlas en la configuración de tu navegador.
            </li>
          </ul>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 3vw, 40px)', color: 'var(--paper)', letterSpacing: '-0.02em', margin: '48px 0 16px' }} id="derechos">5. Tus derechos</h2>
          <p>Tienes derecho a:</p>
          <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
            {['Acceder a los datos personales que tenemos sobre ti.', 'Solicitar la corrección de datos incorrectos.', 'Solicitar la eliminación de tus datos.', 'Oponerte al procesamiento de tus datos.', 'Solicitar la portabilidad de tus datos.'].map((right, i) => (
              <li key={i} style={{ paddingLeft: 32, marginBottom: 12, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--lime)', fontFamily: 'var(--font-mono)' }}>→</span>
                {right}
              </li>
            ))}
          </ul>
          <p>Para ejercer cualquiera de estos derechos, contáctanos en <a href="mailto:hola@galodev.com" style={{ color: 'var(--lime)' }}>hola@galodev.com</a>.</p>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 3vw, 40px)', color: 'var(--paper)', letterSpacing: '-0.02em', margin: '48px 0 16px' }} id="terms">6. Términos de uso</h2>
          <p>El uso de GaloDev está sujeto a las siguientes condiciones:</p>
          <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
            <li style={{ paddingLeft: 32, marginBottom: 12, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--lime)', fontFamily: 'var(--font-mono)' }}>→</span>
              Las herramientas se proporcionan &quot;tal cual&quot;, sin garantías de ningún tipo.
            </li>
            <li style={{ paddingLeft: 32, marginBottom: 12, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--lime)', fontFamily: 'var(--font-mono)' }}>→</span>
              No nos responsabilizamos de los daños causados por el uso de las herramientas.
            </li>
            <li style={{ paddingLeft: 32, marginBottom: 12, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--lime)', fontFamily: 'var(--font-mono)' }}>→</span>
              El output generado por las herramientas pertenece al usuario.
            </li>
            <li style={{ paddingLeft: 32, marginBottom: 12, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--lime)', fontFamily: 'var(--font-mono)' }}>→</span>
              Queda prohibido el uso de scraping automatizado o abuso de las herramientas.
            </li>
          </ul>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 3vw, 40px)', color: 'var(--paper)', letterSpacing: '-0.02em', margin: '48px 0 16px' }} id="contacto">7. Contacto</h2>
          <p>Para cualquier pregunta sobre esta política de privacidad, contáctanos en:</p>
          <p><strong>Email:</strong> <a href="mailto:hola@galodev.com" style={{ color: 'var(--lime)' }}>hola@galodev.com</a></p>
          <p><strong>Sitio web:</strong> <a href="https://galodev.com" style={{ color: 'var(--lime)' }}>galodev.com</a></p>
        </div>
      </div>
    </section>
  );
}
