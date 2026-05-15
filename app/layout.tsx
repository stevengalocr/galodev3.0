import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

// Note: Instrument Serif + JetBrains Mono are loaded via CSS @import in globals.css
// to avoid build-time network dependency. CSS variables --font-serif and --font-mono
// are defined in :root in globals.css.

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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={GeistSans.variable}
    >
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8417467581385725"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body style={{ fontFamily: 'var(--font-sans)' }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
