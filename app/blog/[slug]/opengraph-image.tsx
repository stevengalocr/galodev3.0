import { ImageResponse } from 'next/og';
import { getArticleBySlug } from '@/lib/articles';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type Props = { params: Promise<{ slug: string }> };

export default async function ArticleOGImage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  const title = article?.headline ?? 'GaloDev Blog';
  const category = article?.category ?? 'Blog';
  const readTime = article?.readTime ?? '';
  const issue = article?.issue ? `№${article.issue}` : '';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0E0E10',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: -100, right: -100,
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(91,209,255,0.14) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Top meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ color: '#5BD1FF', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            GaloDev · El Notebook
          </span>
          {issue && (
            <>
              <span style={{ color: '#3D3930', display: 'flex' }}>·</span>
              <span style={{ color: '#5BD1FF', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.08em' }}>{issue}</span>
            </>
          )}
          <span style={{ color: '#3D3930', display: 'flex' }}>·</span>
          <span style={{ color: '#9B9589', fontFamily: 'monospace', fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{category}</span>
          {readTime && (
            <>
              <span style={{ color: '#3D3930', display: 'flex' }}>·</span>
              <span style={{ color: '#9B9589', fontFamily: 'monospace', fontSize: 13 }}>{readTime}</span>
            </>
          )}
        </div>

        {/* Title */}
        <div style={{
          fontFamily: 'serif', fontSize: title.length > 60 ? 54 : 68,
          lineHeight: 1.0, letterSpacing: '-0.03em',
          color: '#F4F0E8', maxWidth: 960,
          display: 'flex', flexWrap: 'wrap',
        }}>
          {title}
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(91,209,255,0.12)', border: '1px solid rgba(91,209,255,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#5BD1FF', fontSize: 22, fontStyle: 'italic',
            }}>G</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ color: '#F4F0E8', fontSize: 15 }}>Steven Galo</span>
              <span style={{ color: '#9B9589', fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Fundador · Costa Rica</span>
            </div>
          </div>
          <span style={{ color: '#5BD1FF', fontFamily: 'monospace', fontSize: 14, letterSpacing: '0.08em' }}>galodev.com/blog</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
