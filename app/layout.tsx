import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://galodev.com'),
  title: {
    default: 'GaloDev — Herramientas gratuitas que parecen de pago.',
    template: '%s — GaloDev',
  },
  description:
    'Una biblioteca creciente de herramientas web pequeñas, rápidas y bellamente diseñadas. Sin registro, sin rastreos, sin "actualiza para exportar".',
  keywords: ['herramientas web', 'developer tools', 'free tools', 'json formatter', 'password generator', 'color palette'],
  authors: [{ name: 'GaloDev' }],
  creator: 'GaloDev',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://galodev.com',
    siteName: 'GaloDev',
    title: 'GaloDev — Herramientas gratuitas que parecen de pago.',
    description: 'Una biblioteca creciente de herramientas web pequeñas, rápidas y bellamente diseñadas.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'GaloDev' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GaloDev — Herramientas gratuitas que parecen de pago.',
    description: 'Una biblioteca creciente de herramientas web pequeñas, rápidas y bellamente diseñadas.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  verification: {
    google: 'cV-08CzXlT0owhZiTDjX0f73VQjwlPgsQrme8gykJ3Y',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return (
    <html
      lang="es"
      className={`${GeistSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body style={{ fontFamily: 'var(--font-sans)' }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieConsent />

        {/* Google AdSense — Auto Ads (coloca anuncios automáticamente en todas las páginas) */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8417467581385725"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Google Analytics 4 */}
        {gaId && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
