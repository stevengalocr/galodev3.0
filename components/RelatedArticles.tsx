import Link from 'next/link';
import { articles } from '@/lib/articles';

type Props = {
  currentSlug: string;
  category: string;
  relatedSlugs?: string[];
};

export default function RelatedArticles({ currentSlug, category, relatedSlugs }: Props) {
  let picks = relatedSlugs
    ? articles.filter((a) => relatedSlugs.includes(a.slug))
    : articles.filter((a) => a.slug !== currentSlug && a.category === category).slice(0, 3);

  if (picks.length === 0) {
    picks = articles.filter((a) => a.slug !== currentSlug).slice(-3).reverse();
  }

  if (picks.length === 0) return null;

  return (
    <div style={{
      border: '1px solid var(--line)', borderRadius: 'var(--radius)',
      overflow: 'hidden', marginTop: 48, background: 'var(--ink-2)',
    }}>
      <div style={{
        padding: '14px 20px', borderBottom: '1px solid var(--line)',
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: 'var(--paper-mute)',
      }}>
        También en el blog
      </div>
      <div style={{ padding: 8 }}>
        {picks.map((a) => (
          <Link
            key={a.slug}
            href={`/blog/${a.slug}`}
            style={{
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              padding: '14px 12px', borderRadius: 10, gap: 16,
              color: 'var(--paper-dim)', transition: 'all 0.2s var(--ease)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
              <span style={{ fontSize: 14, lineHeight: 1.35 }}>{a.title}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)' }}>
                {a.readTime}
              </span>
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--lime)',
              letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap', paddingTop: 2,
            }}>
              {a.category}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
