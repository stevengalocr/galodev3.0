'use client';

import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

/* ── Types ──────────────────────────────────────────────────────── */

type Platform = 'reels' | 'tiktok';

type DownloadOption = { label: string; url: string; type: 'video' | 'audio' };

type VideoResult = {
  platform: 'tiktok' | 'instagram';
  title: string | null;
  thumbnail: string | null;
  author: string | null;
  authorHandle: string | null;
  downloads: DownloadOption[];
};

/* ── Platform config ────────────────────────────────────────────── */

const PLACEHOLDERS: Record<Platform, string> = {
  reels: 'https://www.instagram.com/reel/XXXXXXXXX/',
  tiktok: 'https://www.tiktok.com/@usuario/video/XXXXXXXXX',
};

const PLATFORM_META: Record<Platform, { name: string; icon: ReactNode; hint: string }> = {
  reels: {
    name: 'Instagram Reels',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="var(--lime)" stroke="none" />
      </svg>
    ),
    hint: 'Abre el Reel en Instagram → ··· → Copiar enlace',
  },
  tiktok: {
    name: 'TikTok',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
    hint: 'Abre el video en TikTok → Compartir → Copiar enlace',
  },
};

/* ── Props ──────────────────────────────────────────────────────── */

interface Props { platform: Platform }

/* ── Component ──────────────────────────────────────────────────── */

export default function SocialDownloader({ platform }: Props) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VideoResult | null>(null);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState<string | null>(null);
  const [justDownloaded, setJustDownloaded] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const meta = PLATFORM_META[platform];

  /* ── Cooldown timer ───────────────────────────────────────────── */

  useEffect(() => {
    return () => { if (cooldownRef.current) clearInterval(cooldownRef.current); };
  }, []);

  const startCooldown = (seconds: number) => {
    setCooldown(seconds);
    cooldownRef.current = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) { clearInterval(cooldownRef.current!); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  /* ── Analyze ──────────────────────────────────────────────────── */

  const fetchVideo = async () => {
    const trimmed = url.trim();
    if (!trimmed) { setError('Introduce un enlace válido.'); return; }
    if (cooldown > 0) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmed }),
      });
      const json = await res.json();

      if (res.status === 429) {
        startCooldown(60);
        setError(json.error || 'Demasiadas solicitudes. Espera un momento.');
      } else if (!res.ok || !json.success) {
        setError(json.error || 'No se pudo procesar el video.');
      } else {
        setResult(json.data as VideoResult);
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

  /* ── Download (blob approach — same logic as the working impl) ── */

  const handleDownload = async (opt: DownloadOption) => {
    setDownloading(opt.label);
    try {
      const resp = await fetch(opt.url);
      if (!resp.ok) throw new Error('fetch failed');
      const blob = await resp.blob();
      const ext = opt.type === 'audio' ? 'mp3' : 'mp4';
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `galodev_${result?.platform ?? 'video'}_${Date.now()}.${ext}`;
      a.click();
      URL.revokeObjectURL(a.href);
      setJustDownloaded(opt.label);
      setTimeout(() => setJustDownloaded(null), 3000);
    } catch {
      // Fallback: open in new tab
      window.open(opt.url, '_blank');
    } finally {
      setDownloading(null);
    }
  };

  /* ── Paste ────────────────────────────────────────────────────── */

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch { /* no clipboard permission */ }
  };

  /* ── Render ───────────────────────────────────────────────────── */

  return (
    <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Platform badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ display: 'flex', alignItems: 'center' }}>{meta.icon}</span>
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
            onChange={(e) => { setUrl(e.target.value); if (result) setResult(null); if (error) setError(''); }}
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
            disabled={loading || !url.trim() || cooldown > 0}
            className="btn btn-glow"
            style={{ minWidth: 120, opacity: (url.trim() && cooldown === 0) ? 1 : 0.5 }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 14, height: 14, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                Buscando…
              </span>
            ) : cooldown > 0 ? `Espera ${cooldown}s` : 'Obtener video'}
          </button>
        </div>

        {/* Paste button */}
        <button
          onClick={handlePaste}
          style={{ alignSelf: 'flex-start', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.06em' }}
        >
          Pegar desde portapapeles
        </button>
      </div>

      {/* Error */}
      {error && (
        <div style={{ padding: '14px 18px', background: 'rgba(255,107,157,0.08)', border: '1px solid rgba(255,107,157,0.25)', borderRadius: 10, color: 'var(--rust)', fontSize: 14 }}>
          {error}
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
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--paper-mute)' }}>
                  @{result.authorHandle ?? result.author}
                </div>
              )}
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--lime)', marginTop: 6, letterSpacing: '0.06em' }}>
                {result.downloads.length} opcion{result.downloads.length > 1 ? 'es' : ''} disponible{result.downloads.length > 1 ? 's' : ''}
              </div>
            </div>
          </div>

          {/* Download options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)', marginBottom: 4 }}>
              Opciones de descarga
            </div>

            {result.downloads.map((opt) => {
              const isDone = justDownloaded === opt.label;
              const isBusy = downloading === opt.label;
              const isVideo = opt.type === 'video';

              return (
                <button
                  key={opt.label}
                  onClick={() => handleDownload(opt)}
                  disabled={!!downloading}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 18px',
                    background: isDone ? 'rgba(91,209,255,0.08)' : 'var(--ink-3)',
                    border: `1px solid ${isDone ? 'var(--lime)' : 'var(--line)'}`,
                    borderRadius: 10, cursor: downloading ? 'not-allowed' : 'pointer',
                    opacity: downloading && !isBusy ? 0.5 : 1,
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{
                      padding: '3px 8px', borderRadius: 6, fontSize: 11, fontFamily: 'var(--font-mono)',
                      background: isVideo ? 'rgba(91,209,255,0.15)' : 'var(--ink-4)',
                      color: isVideo ? 'var(--lime)' : 'var(--paper-mute)',
                      letterSpacing: '0.06em',
                    }}>
                      {isVideo ? 'Video' : 'Audio'}
                    </span>
                    <span style={{ fontSize: 14, color: 'var(--paper)' }}>{opt.label}</span>
                  </div>

                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: isDone ? 'var(--lime)' : 'var(--paper-mute)' }}>
                    {isBusy ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 12, height: 12, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                        Descargando…
                      </span>
                    ) : isDone ? 'Listo' : 'Descargar'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Legal note */}
          <p style={{ fontSize: 12, color: 'var(--paper-fade)', fontFamily: 'var(--font-mono)', lineHeight: 1.5 }}>
            Solo descarga contenido del que tengas permisos. Respeta los derechos de autor y los términos de uso de {meta.name}.
          </p>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
