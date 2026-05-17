import Link from 'next/link';
import type { Tool } from '@/lib/tools';

const icons: Record<string, React.ReactNode> = {
  // Dev
  hash: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" /><line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" /></svg>,
  code: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  lock: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
  regex: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35M8 11h6M11 8v6" /></svg>,
  key: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="8" cy="15" r="5" /><path d="m21 3-8.56 8.56M13 10l2 2M19 5l2 2" /></svg>,
  fingerprint: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 12C2 6.48 6.48 2 12 2" /><path d="M12 22c1.5 0 2.93-.36 4.2-1" /><path d="M6 12a6 6 0 0 1 12 0c0 3.31-.89 6-2 8" /><path d="M12 6a6 6 0 0 1 6 6c0 1-.14 2-.38 2.93" /><path d="M12 10a2 2 0 0 1 2 2c0 2-.81 4-2 6" /></svg>,
  'file-text': <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="13" y2="17" /></svg>,
  timer: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2.5" /><path d="M9 2h6M12 2v3" /></svg>,
  edit: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" /></svg>,
  focus: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3" /><path d="M3 9V5a2 2 0 0 1 2-2h4M3 15v4a2 2 0 0 0 2 2h4M21 9V5a2 2 0 0 0-2-2h-4M21 15v4a2 2 0 0 1-2 2h-4" /></svg>,
  // Utilities
  qr: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="5" y="5" width="3" height="3" fill="currentColor" stroke="none" /><rect x="16" y="5" width="3" height="3" fill="currentColor" stroke="none" /><rect x="5" y="16" width="3" height="3" fill="currentColor" stroke="none" /><path d="M14 14h3v3M21 14v7h-7M21 21h.01" /></svg>,
  image: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>,
  arrows: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 16V4M7 4L3 8M7 4l4 4" /><path d="M17 8v12M17 20l4-4M17 20l-4-4" /></svg>,
  palette: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.55 0 1-.45 1-1v-1.5c0-.55-.45-1-1-1h-.5C9.52 18.5 8 17 8 15s1.52-3.5 3.5-3.5H13c2.76 0 5-2.24 5-5C18 4.24 15.31 2 12 2z" /><circle cx="6.5" cy="11.5" r="1.5" fill="currentColor" stroke="none" /><circle cx="9.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" /><circle cx="14.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" /><circle cx="17.5" cy="11.5" r="1.5" fill="currentColor" stroke="none" /></svg>,
  link: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>,
  // Legacy (kept for compatibility)
  scissors: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" /></svg>,
  compress: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" /><path d="M15 9H9v6h6V9z" /></svg>,
  file: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="13" y2="17" /></svg>,
  globe: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>,
};

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

type Props = { tool: Tool };

export default function ToolCard({ tool }: Props) {
  if (tool.comingSoon) {
    return (
      <div className="tool-card" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
        <div className="tool-icon">{icons[tool.icon]}</div>
        <div className="tool-cat">{tool.category}</div>
        <h3 className="tool-name">{tool.name}</h3>
        <p className="tool-desc">{tool.desc}</p>
        <div className="tool-foot">
          <span className="tool-uses" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Próximamente</span>
          <span className="tool-arrow"><ArrowIcon /></span>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/tools/${tool.slug}`} className="tool-card">
      <div className="tool-icon">{icons[tool.icon]}</div>
      <div className="tool-cat">{tool.category}</div>
      <h3 className="tool-name">{tool.name}</h3>
      <p className="tool-desc">{tool.desc}</p>
      <div className="tool-foot">
        <span className="tool-uses" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--lime)' }}>Gratis</span>
        <span className="tool-arrow"><ArrowIcon /></span>
      </div>
    </Link>
  );
}
