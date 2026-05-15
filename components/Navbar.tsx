'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchModal from './SearchModal';
import { useState } from 'react';


export default function Navbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 22, letterSpacing: '-0.03em', fontStyle: 'italic' }}>GaloDev</span>
          </Link>

          <div className="nav-links">
            <Link href="/tools" className={`nav-link${isActive('/tools') ? ' active' : ''}`}>
              Tools
            </Link>
            <Link href="/blog" className={`nav-link${isActive('/blog') ? ' active' : ''}`}>
              Blog
            </Link>
            <Link href="/about" className={`nav-link${isActive('/about') ? ' active' : ''}`}>
              About
            </Link>
          </div>

          <div className="nav-spacer" />

          <button
            className="nav-search"
            onClick={() => setSearchOpen(true)}
            aria-label="Buscar"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
            </svg>
            <span>Buscar tools y artículos…</span>
            <kbd>⌘K</kbd>
          </button>

          <a href="https://ko-fi.com/galodev" target="_blank" rel="noopener noreferrer" className="btn btn-glow btn-sm">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
            </svg>
            Apoya el proyecto
          </a>
        </div>
      </nav>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
