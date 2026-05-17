'use client';

import { useState, useMemo } from 'react';
import type { Tool } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';

type Props = { tools: Tool[] };

export default function ToolsFilter({ tools }: Props) {
  const [active, setActive] = useState('Todos');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const categories = useMemo(() => {
    const counts: Record<string, number> = { Todos: tools.length };
    for (const t of tools) {
      counts[t.category] = (counts[t.category] ?? 0) + 1;
    }
    return Object.entries(counts).map(([label, count]) => ({ label, count }));
  }, [tools]);

  const listed = useMemo(
    () => active === 'Todos' ? tools : tools.filter(t => t.category === active),
    [tools, active],
  );

  const pillBase: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '7px 14px', borderRadius: 999, cursor: 'pointer',
    fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em',
    border: '1px solid', transition: 'all 0.18s',
  };

  return (
    <>
      {/* ── FILTER STRIP ── */}
      <div className="container">
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 0', borderBottom: '1px solid var(--line)', flexWrap: 'wrap', gap: 12,
        }}>
          {/* Category pills */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {categories.map(({ label, count }) => {
              const isActive = active === label;
              return (
                <button
                  key={label}
                  onClick={() => setActive(label)}
                  style={{
                    ...pillBase,
                    borderColor: isActive ? 'rgba(232,238,250,0.35)' : 'var(--line)',
                    background: isActive ? 'rgba(232,238,250,0.07)' : 'var(--ink-3)',
                    color: isActive ? 'var(--paper)' : 'var(--paper-mute)',
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {label}
                  <span style={{
                    padding: '1px 6px', borderRadius: 999, fontSize: 10,
                    background: isActive ? 'rgba(232,238,250,0.12)' : 'var(--ink-2)',
                    color: isActive ? 'var(--paper-dim)' : 'var(--paper-fade)',
                  }}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* View toggle */}
          <div style={{ display: 'inline-flex', gap: 4, padding: 4, background: 'var(--ink-3)', borderRadius: 10, border: '1px solid var(--line)' }}>
            <button
              onClick={() => setView('grid')}
              title="Vista cuadrícula"
              style={{
                padding: '5px 8px', borderRadius: 7, border: 'none', cursor: 'pointer',
                background: view === 'grid' ? 'rgba(232,238,250,0.09)' : 'none',
                color: view === 'grid' ? 'var(--paper)' : 'var(--paper-fade)',
                transition: 'all 0.15s', display: 'flex', alignItems: 'center',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            </button>
            <button
              onClick={() => setView('list')}
              title="Vista lista"
              style={{
                padding: '5px 8px', borderRadius: 7, border: 'none', cursor: 'pointer',
                background: view === 'list' ? 'rgba(232,238,250,0.09)' : 'none',
                color: view === 'list' ? 'var(--paper)' : 'var(--paper-fade)',
                transition: 'all 0.15s', display: 'flex', alignItems: 'center',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── TOOLS ── */}
      <div className="container" style={{ padding: '32px 0 64px' }}>
        {listed.length === 0 && (
          <div style={{ padding: '64px 0', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--paper-mute)' }}>
            No hay herramientas en esta categoría aún.
          </div>
        )}

        {view === 'grid' ? (
          <div className="grid-tools">
            {listed.map(tool => <ToolCard key={tool.slug} tool={tool} />)}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {listed.map(tool => (
              <a
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '44px 1fr auto',
                  alignItems: 'center',
                  gap: 20,
                  padding: '18px 0',
                  borderBottom: '1px solid var(--line)',
                  color: 'inherit',
                  textDecoration: 'none',
                  transition: 'background 0.15s',
                }}
              >
                <span style={{
                  width: 44, height: 44, borderRadius: 12, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  background: 'var(--ink-3)', border: '1px solid var(--line)',
                  color: 'var(--lime)', flexShrink: 0,
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                  </svg>
                </span>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, letterSpacing: '-0.01em', color: 'var(--paper)', marginBottom: 3 }}>
                    {tool.name}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--paper-mute)', lineHeight: 1.4 }}>{tool.desc}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: 'var(--paper-fade)',
                    padding: '3px 8px', borderRadius: 999, border: '1px solid var(--line)',
                  }}>{tool.category}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--paper-fade)' }}>
                    <path d="M5 12h14M13 5l7 7-7 7"/>
                  </svg>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
