'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchModal from './SearchModal';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/tools', label: 'Tools' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ];

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 22, letterSpacing: '-0.03em', fontStyle: 'italic' }}>GaloDev</span>
          </Link>

          {/* Desktop links */}
          <div className="nav-links">
            {navLinks.slice(1).map(({ href, label }) => (
              <Link key={href} href={href} className={`nav-link${isActive(href) ? ' active' : ''}`}>
                {label}
              </Link>
            ))}
          </div>

          <div className="nav-spacer" />

          {/* Desktop search */}
          <button className="nav-search" onClick={() => setSearchOpen(true)} aria-label="Buscar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
            </svg>
            <span>Buscar tools y artículos…</span>
            <kbd>⌘K</kbd>
          </button>

          <a href="https://ko-fi.com/galodev" target="_blank" rel="noopener noreferrer" className="btn btn-glow btn-sm nav-cta">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
            </svg>
            Apoya
          </a>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <span className={`ham-bar${menuOpen ? ' open' : ''}`} />
            <span className={`ham-bar${menuOpen ? ' open' : ''}`} />
            <span className={`ham-bar${menuOpen ? ' open' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
          <div className="mobile-menu-inner" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-head">
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 20, letterSpacing: '-0.03em', fontStyle: 'italic', color: 'var(--lime)' }}>GaloDev</span>
              <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Cerrar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '24px 0' }}>
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`mobile-nav-link${isActive(href) ? ' active' : ''}`}
                >
                  {label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </nav>

            <div style={{ borderTop: '1px solid var(--line)', paddingTop: 24 }}>
              <button
                className="btn btn-ghost"
                style={{ width: '100%', justifyContent: 'flex-start', gap: 12, marginBottom: 12 }}
                onClick={() => { setMenuOpen(false); setSearchOpen(true); }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
                </svg>
                Buscar…
              </button>
              <a href="https://ko-fi.com/galodev" target="_blank" rel="noopener noreferrer" className="btn btn-glow" style={{ width: '100%', justifyContent: 'center' }}>
                Apoya el proyecto
              </a>
            </div>
          </div>
        </div>
      )}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
