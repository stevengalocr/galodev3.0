'use client';

import { useState } from 'react';

type Platform = 'reels' | 'tiktok';

interface VideoOption {
  label: string;
  url: string;
  quality?: string;
}

interface DownloadResult {
  title?: string;
  thumbnail?: string;
  videos: VideoOption[];
  author?: string;
}

function parseResult(data: unknown): DownloadResult | null {
  if (!data || typeof data !== 'object') return null;
  const d = data as Record<string, unknown>;

  // Handle social-media-video-downloader API format
  // { error: null, contents: [{ videos: [{ label, url }], title?, thumbnail? }] }
  if (d.error === null || d.error === undefined) {
    const contents = Array.isArray(d.contents) ? d.contents : [];
    const first = contents[0] as Record<string, unknown> | undefined;
    if (first) {
      const rawVideos = Array.isArray(first.videos) ? first.videos : [];
      const videos: VideoOption[] = rawVideos
        .map((v: unknown) => {
          const vObj = v as Record<string, unknown>;
          return { label: String(vObj.label || 'Descargar'), url: String(vObj.url || '') };
        })
        .filter((v) => v.url && v.url.startsWith('http'));

      if (videos.length > 0) {
        return {
          title: typeof first.title === 'string' ? first.title : undefined,
          thumbnail: typeof first.thumbnail === 'string' ? first.thumbnail : undefined,
          author: typeof first.author === 'string' ? first.author : undefined,
          videos,
        };
      }
    }
  }

  // Handle flat format: { url, urls: [...], title, thumbnail }
  if (d.url && typeof d.url === 'string') {
    const urls = Array.isArray(d.urls) ? d.urls : [{ label: 'HD', url: d.url }];
    const videos: VideoOption[] = urls
      .map((u: unknown) => {
        if (typeof u === 'string') return { label: 'Descargar', url: u };
        const uObj = u as Record<string, unknown>;
        return { label: String(uObj.label || 'Descargar'), url: String(uObj.url || uObj.src || '') };
      })
      .filter((v) => v.url.startsWith('http'));
    if (videos.length > 0) {
      return {
        title: typeof d.title === 'string' ? d.title : undefined,
        thumbnail: typeof d.thumbnail === 'string' ? d.thumbnail : undefined,
        videos,
      };
    }
  }

  return null;
}

const PLACEHOLDERS: Record<Platform, string> = {
  reels: 'https://www.instagram.com/reel/XXXXXXXXX/',
  tiktok: 'https://www.tiktok.com/@usuario/video/XXXXXXXXX',
};

const PLATFORM_META: Record<Platform, { name: string; color: string; icon: string; hint: string }> = {
  reels: {
    name: 'Instagram Reels',
    color: '#E1306C',
    icon: '📸',
    hint: 'Abre el Reel en Instagram → ··· → Copiar enlace',
  },
  tiktok: {
    name: 'TikTok',
    color: '#010101',
    icon: '🎵',
    hint: 'Abre el video en TikTok → Compartir → Copiar enlace',
  },
};

interface Props {
  platform: Platform;
}

export default function SocialDownloader({ platform }: Props) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [error, setError] = useState('');
  const meta = PLATFORM_META[platform];

  const fetchVideo = async () => {
    const trimmed = url.trim();
    if (!trimmed) { setError('Introduce un enlace válido.'); return; }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`/api/download?url=${encodeURIComponent(trimmed)}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || `Error ${res.status}`);
        return;
      }

      const parsed = parseResult(data);
      if (parsed && parsed.videos.length > 0) {
        setResult(parsed);
      } else {
        setError('No se encontraron videos descargables. Asegúrate de que el enlace es público y correcto.');
      }
    } catch {
      setError('Error de conexión. Comprueba tu internet e inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') fetchVideo();
  };

  const qualityLabel = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('2160') || l.includes('4k')) return { text: '4K', tier: 4 };
    if (l.includes('1440')) return { text: '2K', tier: 3 };
    if (l.includes('1080') || l.includes('fhd')) return { text: 'FHD', tier: 3 };
    if (l.includes('720') || l.includes('hd')) return { text: 'HD', tier: 2 };
    if (l.includes('480') || l.includes('sd')) return { text: 'SD', tier: 1 };
    if (l.includes('audio') || l.includes('mp3') || l.includes('m4a')) return { text: '🎵', tier: 0 };
    return { text: label, tier: 2 };
  };

  return (
    <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Platform badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 28 }}>{meta.icon}</span>
        <div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, letterSpacing: '-0.015em' }}>{meta.name}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', marginTop: 2 }}>{meta.hint}</div>
        </div>
      </div>

      {/* URL Input */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>
          Enlace del video
        </label>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKey}
            placeholder={PLACEHOLDERS[platform]}
            style={{
              flex: 1, padding: '14px 18px', background: 'var(--ink-3)',
              border: '1px solid var(--line)', borderRadius: 12, color: 'var(--paper)',
              fontSize: 14, outline: 'none',
            }}
          />
          <button
            onClick={fetchVideo}
            disabled={loading || !url.trim()}
            className="btn btn-glow"
            style={{ minWidth: 120, opacity: url.trim() ? 1 : 0.5 }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 14, height: 14, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                Buscando…
              </span>
            ) : 'Obtener video'}
          </button>
        </div>

        {/* Paste button */}
        <button
          onClick={async () => {
            try {
              const text = await navigator.clipboard.readText();
              setUrl(text);
            } catch { /* no clipboard permission */ }
          }}
          style={{ alignSelf: 'flex-start', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.06em' }}
        >
          📋 Pegar desde portapapeles
        </button>
      </div>

      {error && (
        <div style={{ padding: '14px 18px', background: 'rgba(255,107,157,0.08)', border: '1px solid rgba(255,107,157,0.25)', borderRadius: 10, color: 'var(--rust)', fontSize: 14 }}>
          ⚠ {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Video info */}
          <div style={{ display: 'flex', gap: 16, padding: 16, background: 'var(--ink-3)', border: '1px solid var(--line)', borderRadius: 12, alignItems: 'center' }}>
            {result.thumbnail && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={result.thumbnail}
                alt="thumbnail"
                style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
              />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              {result.title && (
                <div style={{ fontSize: 15, color: 'var(--paper)', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {result.title}
                </div>
              )}
              {result.author && (
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--paper-mute)' }}>@{result.author}</div>
              )}
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--lime)', marginTop: 6, letterSpacing: '0.06em' }}>
                ✓ {result.videos.length} opcion{result.videos.length > 1 ? 'es' : ''} disponible{result.videos.length > 1 ? 's' : ''}
              </div>
            </div>
          </div>

          {/* Download options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)', marginBottom: 4 }}>
              Opciones de descarga
            </div>
            {result.videos.map((video, i) => {
              const ql = qualityLabel(video.label);
              return (
                <a
                  key={i}
                  href={`/api/download/proxy?url=${encodeURIComponent(video.url)}`}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 18px', background: 'var(--ink-3)',
                    border: '1px solid var(--line)', borderRadius: 10,
                    textDecoration: 'none', transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{
                      padding: '3px 8px', borderRadius: 6, fontSize: 11, fontFamily: 'var(--font-mono)',
                      background: ql.tier >= 3 ? 'rgba(91,209,255,0.15)' : 'var(--ink-4)',
                      color: ql.tier >= 3 ? 'var(--lime)' : 'var(--paper-mute)',
                      letterSpacing: '0.06em',
                    }}>{ql.text}</span>
                    <span style={{ fontSize: 14, color: 'var(--paper)' }}>{video.label}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--lime)' }}>⬇ Descargar</span>
                </a>
              );
            })}
          </div>

          {/* Legal note */}
          <p style={{ fontSize: 12, color: 'var(--paper-fade)', fontFamily: 'var(--font-mono)', lineHeight: 1.5 }}>
            ⚠ Solo descarga contenido del que tengas permisos. Respeta los derechos de autor y los ToS de {meta.name}.
          </p>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
