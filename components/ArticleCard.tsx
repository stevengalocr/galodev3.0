import Link from 'next/link';
import type { Article } from '@/lib/articles';

type Props = { article: Article };

export default function ArticleCard({ article }: Props) {
  return (
    <Link href={`/blog/${article.slug}`} className="article-card">
      <div className={`article-cover ${article.coverClass}`}>
        <span className="cover-orn">{article.coverOrn}</span>
        <span className="article-cover-tag">{article.category}</span>
      </div>
      <div className="article-meta">
        <span>{article.date}</span>
        <span className="dot" />
        <span>{article.readTime} lectura</span>
      </div>
      <h3 className="article-title">{article.headline}</h3>
      <p className="article-excerpt">{article.excerpt}</p>
    </Link>
  );
}
