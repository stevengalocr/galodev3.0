# GaloDev — Tools Architecture Guide

> Reference for adding new tools. Everything you need to know in one file.

---

## Overview

Each tool is a self-contained React client component rendered inside the tool detail page. Tools run 100% in the browser — no data leaves the user's device (except social downloaders which proxy through a Next.js API route to bypass CORS).

---

## File Map

```
lib/
  tools.ts          ← Tool registry (metadata for all tools, including coming-soon)
  toolsImpl.ts      ← Set of slugs that have a working implementation

components/
  ToolCard.tsx      ← Grid card with SVG icon map + links to tool page
  tools/
    ToolRenderer.tsx     ← Dynamic dispatcher: slug → component
    useFFmpeg.ts         ← Shared hook for FFmpeg.wasm initialization
    Base64Tool.tsx       ← Base64 encode / decode
    VideoTrimmer.tsx     ← FFmpeg stream-copy trim
    VideoCompressor.tsx  ← FFmpeg libx264 compress with CRF presets
    GifMaker.tsx         ← FFmpeg 2-pass palette GIF
    SocialDownloader.tsx ← Shared UI for Reels + TikTok (RapidAPI proxy)
    ReelsDownloader.tsx  ← Thin wrapper → <SocialDownloader platform="reels" />
    TikTokDownloader.tsx ← Thin wrapper → <SocialDownloader platform="tiktok" />

app/
  tools/[slug]/page.tsx  ← Tool detail page (Server Component)
  api/download/route.ts  ← RapidAPI proxy for social media downloads

.env.local
  RAPIDAPI_KEY          ← Secret — never NEXT_PUBLIC_
  RAPIDAPI_HOST         ← social-media-video-downloader.p.rapidapi.com
  NEXT_PUBLIC_ADSENSE_ID ← ca-pub-8417467581385725
```

---

## Adding a New Tool — Checklist

### 1. Register in `lib/tools.ts`

Add an entry to the `tools` array. Every field is required:

```ts
{
  slug: 'my-new-tool',         // kebab-case, URL-safe
  name: 'My New Tool',         // Display name (title case)
  category: 'Dev',             // Video | Social | Dev | Image | Generator | Text | Converter
  desc: 'One-sentence …',      // Max ~120 chars. No trailing period.
  uses: '0 hoy',               // Placeholder — update to realistic number later
  icon: 'code',                // Must exist in the ToolCard icon map (see below)
  comingSoon: true,            // Set true until the component is ready
},
```

Place new tools near the top of the array so they appear first in grids.

### 2. Add an icon to `components/ToolCard.tsx`

The `icons` map uses inline SVG with these shared props:

```tsx
width="22" height="22" viewBox="0 0 24 24" fill="none"
stroke="currentColor" strokeWidth="1.8"
```

Use Lucide icon shapes as reference (https://lucide.dev). Add your key **and** document it with a comment indicating the category group.

### 3. Build the component

Create `components/tools/MyNewTool.tsx`:

```tsx
'use client';

// All tool components must be client components.
// No 'use server', no server actions, no next/headers.

export default function MyNewTool() {
  return (
    <div style={{ padding: '32px 40px' }}>
      {/* Tool UI */}
    </div>
  );
}
```

**Design conventions:**
- Outer padding: `32px 40px`
- Section labels: `fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--paper-mute)'`
- Primary action button: `className="btn btn-lime"`
- Secondary action button: `className="btn btn-ghost"`
- Drop zone / surface: `background: 'var(--ink-3)', border: '1px solid var(--line)', borderRadius: 12`
- Success/output area: `background: 'var(--ink-2)', border: '1px solid var(--line)', borderRadius: 8`
- Status text: `color: 'var(--lime)'` for success, `color: 'var(--rust)'` for errors

### 4. Register in `components/tools/ToolRenderer.tsx`

```ts
const TOOLS: Record<string, React.ComponentType> = {
  // …existing entries…
  'my-new-tool': dynamic(() => import('./MyNewTool'), { ssr: false }),
};
```

`ssr: false` is mandatory — all tool components use browser APIs.

### 5. Mark as implemented in `lib/toolsImpl.ts`

```ts
const IMPLEMENTED_SLUGS = new Set([
  // …existing slugs…
  'my-new-tool',
]);
```

This controls the `● Live` / `○ Próximamente` pill on the tool page.

### 6. Remove `comingSoon: true` from `lib/tools.ts`

---

## CSS Design Tokens

```css
/* Colors */
--lime         /* #AEFB5A — primary accent, CTAs, active states */
--rust         /* Warm red — errors, destructive */
--ink          /* Page background (darkest) */
--ink-2        /* Card/surface background */
--ink-3        /* Title bar / input background */
--line         /* Border color */
--line-2       /* Subtle border */
--paper        /* Primary text */
--paper-dim    /* Secondary text */
--paper-mute   /* Tertiary / labels */
--paper-fade   /* Disabled / separators */

/* Fonts */
--font-serif   /* Instrument Serif — headings, tool names */
--font-mono    /* JetBrains Mono — labels, code, kickers */
--font-sans    /* Geist Sans — body text */

/* Layout */
--radius       /* Default border radius (12px) */
--ease         /* cubic-bezier(0.16, 1, 0.3, 1) */
```

---

## FFmpeg Tools Pattern

For video/audio processing tools, use the shared `useFFmpeg` hook:

```ts
import { useFFmpeg, ffmpegDataToBlob } from './useFFmpeg';

const { ffmpeg, loaded, loading, progress, load } = useFFmpeg();
```

**Key behaviors:**
- FFmpeg core is loaded from CDN (`unpkg.com/@ffmpeg/core@0.12.6`) on first use — don't block UI on this
- `ffmpegDataToBlob(raw, mimeType)` safely converts FFmpeg output (handles both `string` and `Uint8Array<ArrayBufferLike>`)
- Always write input files with unique names per run to avoid stale data
- Always call `ffmpeg.deleteFile()` after reading output to free WASM memory
- `progress` is 0–1; show a progress bar for operations > ~1 second

**Typical command pattern:**
```ts
await ffmpeg.writeFile('input.mp4', await fetchFile(file));
await ffmpeg.exec(['-i', 'input.mp4', /* …args… */, 'output.mp4']);
const raw = await ffmpeg.readFile('output.mp4');
const blob = ffmpegDataToBlob(raw, 'video/mp4');
await ffmpeg.deleteFile('input.mp4');
await ffmpeg.deleteFile('output.mp4');
```

---

## Social Downloader Pattern

Social tools (Reels, TikTok) use `/app/api/download/route.ts` as a server-side proxy:

```
Browser → GET /api/download?url=<encoded_url> → RapidAPI → video URL
```

The proxy reads `RAPIDAPI_KEY` and `RAPIDAPI_HOST` from server env (never exposed to the client). The response JSON contains a `url` field with the direct video link.

To add a new social platform, add a case to the `SocialDownloader` component or create a new thin wrapper component pointing at it.

---

## AdSense Integration

Publisher ID: `ca-pub-8417467581385725` (set in `.env.local` as `NEXT_PUBLIC_ADSENSE_ID`)

The global `<script>` is loaded once in `app/layout.tsx`. Individual ad units are rendered by `<AdBlock>` in tool pages:

| Slot | Location | Format |
|------|----------|--------|
| `LEADERBOARD` | Above tool area | 728×90 |
| `SIDEBAR` | Sidebar top | 300×250 |
| `INLINE` | Below tool card | 336×280 |

Create real slots in AdSense dashboard → copy the slot ID → add to `.env.local`:
```
NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD=1234567890
NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=0987654321
NEXT_PUBLIC_ADSENSE_SLOT_INLINE=1122334455
```

Until slots are configured, `<AdBlock>` renders a styled placeholder (no broken layout).

---

## AdSense Review Readiness

All tool pages must meet these criteria before requesting review:

- ✅ Real, useful content visible without scrolling
- ✅ Tool either works (`● Live`) or shows a proper "coming soon" with subscribe form
- ✅ No broken images or missing icons
- ✅ Privacy-respecting: no external requests except AdSense + Google Fonts
- ✅ All pages have unique `<title>` and `<meta description>` (via `generateMetadata`)
- ✅ Mobile-responsive (container max-width + clamp() font sizes)

---

## Currently Implemented Tools

| Slug | Component | Type |
|------|-----------|------|
| `base64` | `Base64Tool.tsx` | Pure client (crypto) |
| `video-trimmer` | `VideoTrimmer.tsx` | FFmpeg.wasm |
| `video-compressor` | `VideoCompressor.tsx` | FFmpeg.wasm |
| `gif-maker` | `GifMaker.tsx` | FFmpeg.wasm |
| `reels-downloader` | `ReelsDownloader.tsx` | RapidAPI proxy |
| `tiktok-downloader` | `TikTokDownloader.tsx` | RapidAPI proxy |

---

_Last updated: 2026-05-14_
