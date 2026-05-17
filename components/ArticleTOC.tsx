'use client';

import { useEffect, useState } from 'react';
import type { TocItem } from '@/lib/articles';

type Props = { toc: TocItem[]; wordCount: number };

export default function ArticleTOC({ toc, wordCount }: Props) {
  const [activeId, setActiveId] = useState(toc[0]?.id ?? '');

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY + 200;
      let current = toc[0]?.id ?? '';
      for (const item of toc) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= y) current = item.id;
      }
      setActiveId(current);
    };
    document.addEventListener('scroll', handler);
    return () => document.removeEventListener('scroll', handler);
  }, [toc]);

  return (
    <aside style={{ position: 'sticky', top: 96, alignSelf: 'start' }}>
      <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)', marginBottom: 16, fontWeight: 500 }}>
        En este artículo
      </h4>
      <ol style={{ listStyle: 'none', counterReset: 'i', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {toc.map((item) => (
          <li key={item.id} style={{ counterIncrement: 'i' }}>
            <a
              href={`#${item.id}`}
              style={{
                display: 'grid', gridTemplateColumns: '32px 1fr', gap: 4,
                padding: '8px 0 8px 14px', fontSize: 13,
                color: activeId === item.id ? 'var(--lime)' : 'var(--paper-mute)',
                borderLeft: `1px solid ${activeId === item.id ? 'var(--lime)' : 'var(--line)'}`,
                transition: 'all 0.2s var(--ease)',
                boxShadow: activeId === item.id ? '-1px 0 0 var(--lime)' : 'none',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: activeId === item.id ? 'var(--lime)' : 'var(--paper-fade)' }}>
                0{toc.indexOf(item) + 1}
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>

      <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)', marginTop: 40, marginBottom: 16, fontWeight: 500 }}>
        Lectura
      </h4>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', letterSpacing: '0.06em', lineHeight: 1.8 }}>
        <div>{wordCount.toLocaleString('es')} palabras</div>
      </div>
    </aside>
  );
}
