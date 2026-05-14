'use client';

import { useEffect } from 'react';

type AdFormat = 'leaderboard' | 'rectangle' | 'sidebar' | 'inline' | 'skyscraper';

type Props = {
  format?: AdFormat;
  slot?: string;
  className?: string;
  style?: React.CSSProperties;
};

const formatConfig: Record<AdFormat, { label: string; minHeight: number }> = {
  leaderboard: { label: '728×90 · Leaderboard', minHeight: 90 },
  rectangle: { label: '300×250 · Rectángulo', minHeight: 250 },
  sidebar: { label: '300×600 · Sidebar', minHeight: 600 },
  inline: { label: '336×280 · In-content', minHeight: 280 },
  skyscraper: { label: '160×600 · Skyscraper', minHeight: 600 },
};

const publisherId = process.env.NEXT_PUBLIC_ADSENSE_ID;

export default function AdBlock({ format = 'rectangle', slot, className = '', style }: Props) {
  const config = formatConfig[format];

  useEffect(() => {
    if (!publisherId || !slot) return;
    try {
      // @ts-expect-error adsbygoogle is injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // silently ignore duplicate push errors
    }
  }, [slot]);

  // Show real AdSense unit when publisher ID is configured
  if (publisherId && slot) {
    return (
      <div className={`adsense-unit ${className}`} style={style}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={publisherId}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Placeholder shown until AdSense is configured
  return (
    <div
      className={`ad-block${format === 'leaderboard' ? ' ad-block-leaderboard' : ''}${format === 'inline' ? ' ad-block-inline' : ''} ${className}`}
      style={style}
    >
      <span className="ad-block-label">Publicidad · AdSense</span>
      <div className="ad-block-inner" style={{ minHeight: config.minHeight }}>
        {config.label}
      </div>
    </div>
  );
}
