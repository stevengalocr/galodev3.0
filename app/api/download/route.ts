import { NextRequest, NextResponse } from 'next/server';

/* ── Types ──────────────────────────────────────────────────────── */

type DownloadOption = { label: string; url: string; type: 'video' | 'audio' };

type VideoResult = {
  platform: 'tiktok' | 'instagram';
  title: string | null;
  thumbnail: string | null;
  duration: number | null;
  author: string | null;
  authorHandle: string | null;
  authorAvatar: string | null;
  downloads: DownloadOption[];
};

/* ── Rate limiter (in-memory, per IP) ───────────────────────────── */

const RATE_WINDOW_MS = 60_000; // 1 minute
const RATE_MAX = 5;            // max requests per window

const ipLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (ipLog.get(ip) ?? []).filter(t => now - t < RATE_WINDOW_MS);
  hits.push(now);
  ipLog.set(ip, hits);
  return hits.length > RATE_MAX;
}

/* ── URL helpers ────────────────────────────────────────────────── */

function cleanUrl(raw: string): string {
  try {
    const u = new URL(raw);
    if (u.hostname.includes('instagram.com')) {
      return `https://www.instagram.com${u.pathname.replace(/\/$/, '')}/`;
    }
    if (u.hostname.includes('tiktok.com')) {
      return `https://www.tiktok.com${u.pathname}`;
    }
    return raw;
  } catch {
    return raw;
  }
}

function detectPlatform(url: string): 'tiktok' | 'instagram' {
  return url.includes('tiktok.com') || url.includes('vm.tiktok.com') ? 'tiktok' : 'instagram';
}

/* ── Instagram downloader ───────────────────────────────────────── */

async function fetchInstagram(url: string, apiKey: string): Promise<VideoResult | null> {
  const host = 'instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com';
  const res = await fetch(`https://${host}/convert?url=${encodeURIComponent(url)}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': host,
    },
    cache: 'no-store',
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) return null;
  const d = await res.json() as Record<string, unknown>;
  if (!Array.isArray(d.media)) return null;

  const items = d.media as Record<string, unknown>[];
  const downloads: DownloadOption[] = [];
  let thumbnail: string | null = null;
  let videoIndex = 0;

  for (const item of items) {
    const itemUrl = String(item.url ?? '');
    if (!itemUrl.startsWith('http')) continue;

    const type = String(item.type ?? '').toLowerCase();

    if (type === 'video') {
      videoIndex++;
      const quality = String(item.quality ?? 'HD');
      downloads.push({
        label: videoIndex === 1 ? quality : `${quality} ${videoIndex}`,
        url: itemUrl,
        type: 'video',
      });
      if (!thumbnail && typeof item.thumbnail === 'string') thumbnail = item.thumbnail;
    } else if (type === 'image' && !thumbnail) {
      thumbnail = itemUrl;
    }
  }

  // Carousel: offer images as downloads if no video found
  if (downloads.length === 0) {
    items.forEach((item, i) => {
      const itemUrl = String(item.url ?? '');
      if (itemUrl.startsWith('http')) {
        downloads.push({ label: `Imagen ${i + 1}`, url: itemUrl, type: 'video' });
      }
    });
  }

  if (downloads.length === 0) return null;

  return {
    platform: 'instagram',
    title: null, thumbnail,
    duration: null, author: null, authorHandle: null, authorAvatar: null,
    downloads,
  };
}

/* ── TikTok downloader ──────────────────────────────────────────── */

async function fetchTikTok(url: string, apiKey: string): Promise<VideoResult | null> {
  const host = 'tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com';
  const res = await fetch(`https://${host}/index?url=${encodeURIComponent(url)}&hd=1`, {
    headers: { 'x-rapidapi-key': apiKey, 'x-rapidapi-host': host },
    cache: 'no-store',
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) return null;
  const d = await res.json() as Record<string, unknown>;

  const downloads: DownloadOption[] = [];
  const videoArr = Array.isArray(d.video) ? d.video as string[] : [];
  const musicArr = Array.isArray(d.music) ? d.music as string[] : [];
  const coverArr = Array.isArray(d.cover) ? d.cover as string[] : [];

  if (videoArr[0]?.startsWith('http')) {
    downloads.push({ label: 'Sin marca de agua', url: videoArr[0], type: 'video' });
  }
  if (videoArr[1]?.startsWith('http')) {
    downloads.push({ label: 'HD', url: videoArr[1], type: 'video' });
  }
  if (musicArr[0]?.startsWith('http')) {
    downloads.push({ label: 'Solo audio (MP3)', url: musicArr[0], type: 'audio' });
  }

  if (downloads.length === 0) return null;

  return {
    platform: 'tiktok',
    title: typeof d.title === 'string' ? d.title : null,
    thumbnail: coverArr[0] ?? null,
    duration: typeof d.duration === 'number' ? d.duration : null,
    author: typeof d.author === 'string' ? d.author : null,
    authorHandle: null, authorAvatar: null,
    downloads,
  };
}

/* ── Route ──────────────────────────────────────────────────────── */

export async function POST(req: NextRequest) {
  // Rate limit by IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim()
    ?? req.headers.get('x-real-ip')
    ?? 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: 'Demasiadas solicitudes. Espera un momento e inténtalo de nuevo.' },
      { status: 429 }
    );
  }

  // Parse body
  let body: { url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Cuerpo inválido.' }, { status: 400 });
  }

  const rawUrl = body.url?.trim();
  if (!rawUrl) {
    return NextResponse.json({ success: false, error: 'Falta el enlace.' }, { status: 400 });
  }

  const apiKey = process.env.RAPIDAPI_KEY ?? '';
  const url = cleanUrl(rawUrl);
  const platform = detectPlatform(rawUrl);

  try {
    const result = platform === 'instagram'
      ? await fetchInstagram(url, apiKey)
      : await fetchTikTok(url, apiKey);

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'No se pudo obtener el video. Asegúrate de que el enlace es público y correcto.' },
        { status: 422 }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Error de conexión. Inténtalo de nuevo.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const rawUrl = req.nextUrl.searchParams.get('url');
  if (!rawUrl) {
    return NextResponse.json({ success: false, error: 'Falta el enlace.' }, { status: 400 });
  }
  return POST(new NextRequest(req.url, {
    method: 'POST',
    body: JSON.stringify({ url: rawUrl }),
    headers: { 'Content-Type': 'application/json' },
  }));
}
