import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const videoUrl = req.nextUrl.searchParams.get('url');

  if (!videoUrl) {
    return NextResponse.json({ error: 'Missing url' }, { status: 400 });
  }

  // Only proxy URLs from trusted sources
  let parsed: URL;
  try {
    parsed = new URL(videoUrl);
  } catch {
    return NextResponse.json({ error: 'Invalid url' }, { status: 400 });
  }

  const allowed = [
    'cobalt.tools',
    'api.cobalt.tools',
    'instagram.com',
    'cdninstagram.com',
    'tiktok.com',
    'tiktokcdn.com',
    'tiktokv.com',
    'byteimg.com',
    'akamaized.net',
  ];

  const isAllowed = allowed.some((host) => parsed.hostname.endsWith(host));
  if (!isAllowed) {
    return NextResponse.json({ error: 'URL not allowed' }, { status: 403 });
  }

  try {
    const upstream = await fetch(videoUrl, {
      headers: {
        // Mimic a browser so CDNs don't block us
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Referer: 'https://www.instagram.com/',
      },
      cache: 'no-store',
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: `Upstream error: ${upstream.status}` },
        { status: upstream.status }
      );
    }

    const contentType = upstream.headers.get('content-type') || 'video/mp4';
    const contentLength = upstream.headers.get('content-length');

    // Derive a sane filename from the URL path
    const pathParts = parsed.pathname.split('/').filter(Boolean);
    const rawName = pathParts[pathParts.length - 1] || 'video';
    const ext = rawName.includes('.') ? '' : '.mp4';
    const filename = `${rawName}${ext}`.replace(/[^a-zA-Z0-9._-]/g, '_');

    const headers = new Headers({
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    });
    if (contentLength) headers.set('Content-Length', contentLength);

    // Stream the body directly — no buffering
    return new NextResponse(upstream.body, { status: 200, headers });
  } catch (err) {
    console.error('Proxy error:', err);
    return NextResponse.json({ error: 'Error al descargar el archivo.' }, { status: 500 });
  }
}
