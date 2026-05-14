import Link from 'next/link';
import type { Tool } from '@/lib/tools';

const icons: Record<string, React.ReactNode> = {
  lock: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
  code: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6M14.5 4l-5 16" /></svg>,
  palette: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="13.5" cy="6.5" r="2.5" /><circle cx="19" cy="13" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="10" cy="20" r="2.5" /></svg>,
  qr: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><path d="M14 14h3v3M21 14v7h-7M17 17h.01M21 21h.01" /></svg>,
  image: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>,
  file: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h4" /></svg>,
  globe: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>,
  hash: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16" /></svg>,
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
          <span className="tool-uses">Próximamente</span>
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
        <span className="tool-uses">{tool.uses}</span>
        <span className="tool-arrow"><ArrowIcon /></span>
      </div>
    </Link>
  );
}
