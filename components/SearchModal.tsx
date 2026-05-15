'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { articles } from '@/lib/articles';
import { tools } from '@/lib/tools';

type Props = { open: boolean; onClose: () => void };

export default function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      document.body.style.overflow = '';
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        open ? onClose() : undefined;
      }
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const q = query.toLowerCase().trim();

  const filteredTools = tools.filter(
    (t) => !q || t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
  ).slice(0, 4);

  const filteredArticles = articles.filter(
    (a) => !q || a.headline.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)
  ).slice(0, 3);

  if (!open) return null;

  return (
    <div className="search-modal open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="search-modal-inner">
        <div className="search-input-wrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--paper-mute)' }}>
            <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar tools y artículos…"
          />
          <button className="btn btn-dark btn-sm" style={{ padding: '4px 10px' }} onClick={onClose}>Esc</button>
        </div>

        <div className="search-results">
          {filteredTools.length > 0 && (
            <>
              <div className="search-group-label">Herramientas</div>
              {filteredTools.map((tool) => (
                <Link key={tool.slug} href={`/tools/${tool.slug}`} className="search-item" onClick={onClose}>
                  <div className="search-item-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                  </div>
                  <div className="search-item-content">
                    <div className="search-item-title">{tool.name}</div>
                    <div className="search-item-meta">{tool.category}</div>
                  </div>
                  <span className="search-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                  </span>
                </Link>
              ))}
            </>
          )}

          {filteredArticles.length > 0 && (
            <>
              <div className="search-group-label" style={{ marginTop: 8 }}>Del blog</div>
              {filteredArticles.map((article) => (
                <Link key={article.slug} href={`/blog/${article.slug}`} className="search-item" onClick={onClose}>
                  <div className="search-item-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h4" />
                    </svg>
                  </div>
                  <div className="search-item-content">
                    <div className="search-item-title">{article.headline.replace(/\.$/, '')}</div>
                    <div className="search-item-meta">{article.category} · {article.readTime} · {article.date}</div>
                  </div>
                  <span className="search-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                  </span>
                </Link>
              ))}
            </>
          )}
        </div>

        <div className="search-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> navegar <kbd>↵</kbd> seleccionar <kbd>esc</kbd> cerrar</span>
          <Link href="/blog" style={{ color: 'var(--lime)' }} onClick={onClose}>Ver todo →</Link>
        </div>
      </div>
    </div>
  );
}
