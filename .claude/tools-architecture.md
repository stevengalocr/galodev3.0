# GaloDev — Tools Architecture Guide

> Reference for adding new tools. Everything you need to know in one file.

---

## Overview

Each tool is a self-contained React client component rendered inside the tool detail page. Tools run 100% in the browser — no data leaves the user's device. All 15 tools are currently live.

---

## File Map

```
lib/
  tools.ts          ← Tool registry (metadata + seoText for all 15 tools)
  toolsImpl.ts      ← Set of slugs that have a working implementation (all 15)

components/
  ToolCard.tsx      ← Grid card with SVG icon map + links to tool page
  ToolsFilter.tsx   ← Client-side category filter for /tools page
  AdBlock.tsx       ← AdSense unit renderer (real or placeholder)
  tools/
    ToolRenderer.tsx     ← Dynamic dispatcher: slug → component (ssr: false)
    Base64Tool.tsx       ← Base64 encode / decode
    JsonFormatter.tsx    ← JSON format, validate, minify
    PasswordGenerator.tsx ← Secure password with entropy meter
    RegexTester.tsx      ← Regex tester with cheatsheet
    JwtDecoder.tsx       ← JWT header/payload decoder & validator
    UuidGenerator.tsx    ← UUID v4/v7 bulk generator
    MarkdownPreviewer.tsx ← Live Markdown preview with GFM
    PomodoroTimer.tsx    ← Pomodoro timer with settings
    QuickNotes.tsx       ← Auto-save notes with localStorage
    FocusMode.tsx        ← Full-screen focus mode
    QrCodeMaker.tsx      ← QR encoder (Reed-Solomon, no deps)
    ImageCompressor.tsx  ← Client-side PNG/JPG/WebP compression
    UnitConverter.tsx    ← Length, weight, temp, storage, CSS units
    ColorConverter.tsx   ← HEX/RGB/HSL/OKLCH + Tailwind match
    UrlEncoder.tsx       ← encodeURIComponent / encodeURI

app/
  tools/
    page.tsx             ← /tools listing page (Server Component)
    [slug]/page.tsx      ← Tool detail page (Server Component, SSG)

public/
  ads.txt              ← google.com, pub-8417467581385725, DIRECT, ...
  sitemap.xml          ← auto-generated via app/sitemap.ts

.env.local
  NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD ← slot ID from AdSense dashboard
  NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR     ← slot ID from AdSense dashboard
  NEXT_PUBLIC_ADSENSE_SLOT_INLINE      ← slot ID from AdSense dashboard
  NEXT_PUBLIC_GA_MEASUREMENT_ID        ← GA4 measurement ID (optional)
```

---

## Adding a New Tool — Checklist

### 1. Register in `lib/tools.ts`

Add an entry to the `tools` array. Every field is required:

```ts
{
  slug: 'my-new-tool',         // kebab-case, URL-safe
  name: 'My New Tool',         // Display name (title case)
  category: 'Dev',             // Dev | Productividad | Utilidades
  desc: 'One-sentence …',      // Max ~120 chars. No trailing period.
  uses: '0 hoy',               // Placeholder — update to realistic number later
  icon: 'code',                // Must exist in the ToolCard icon map (see below)
  seoText: {                   // Required for SEO — shown below the tool
    what: 'What this tool does…',
    how: 'How to use it…',
    faqs: [
      { q: 'Question?', a: 'Answer.' },
      { q: 'Question?', a: 'Answer.' },
      { q: 'Question?', a: 'Answer.' },
      { q: 'Question?', a: 'Answer.' },
    ],
  },
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
- Primary action button: `className="btn btn-glow"`
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

### 6. Remove `comingSoon: true` from `lib/tools.ts` (if it was set)

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

## Currently Implemented Tools (all 15)

| Slug | Component | Category |
|------|-----------|----------|
| `json-formatter` | `JsonFormatter.tsx` | Dev |
| `base64` | `Base64Tool.tsx` | Dev |
| `password-generator` | `PasswordGenerator.tsx` | Dev |
| `regex-tester` | `RegexTester.tsx` | Dev |
| `jwt-decoder` | `JwtDecoder.tsx` | Dev |
| `uuid-generator` | `UuidGenerator.tsx` | Dev |
| `markdown-previewer` | `MarkdownPreviewer.tsx` | Dev |
| `pomodoro-timer` | `PomodoroTimer.tsx` | Productividad |
| `quick-notes` | `QuickNotes.tsx` | Productividad |
| `focus-mode` | `FocusMode.tsx` | Productividad |
| `qr-code-maker` | `QrCodeMaker.tsx` | Utilidades |
| `image-compressor` | `ImageCompressor.tsx` | Utilidades |
| `unit-converter` | `UnitConverter.tsx` | Utilidades |
| `color-converter` | `ColorConverter.tsx` | Utilidades |
| `url-encoder` | `UrlEncoder.tsx` | Utilidades |

All 15 slugs are present in `toolsImpl.ts` and `ToolRenderer.tsx`. No tools are "coming soon."

---

## AdSense Integration

Publisher ID: `ca-pub-8417467581385725` (hardcoded in `app/layout.tsx`)

The global `<script>` is loaded once in `app/layout.tsx` with `strategy="afterInteractive"`. Individual ad units are rendered by `<AdBlock>` in tool pages:

| Slot env var | Location | Format |
|------|----------|--------|
| `NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD` | Above tool area | 728×90 |
| `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR` | Sidebar right column | 300×250 |
| `NEXT_PUBLIC_ADSENSE_SLOT_INLINE` | Below tool card | 336×280 |

Create real slots in AdSense dashboard → copy the slot ID → add to `.env.local`. Until slots are configured, `<AdBlock>` renders a styled placeholder (no broken layout).

`public/ads.txt` is already present:
```
google.com, pub-8417467581385725, DIRECT, f08c47fec0942fa0
```

---

## AdSense Review Readiness

All tool pages meet these criteria:

- ✅ Real, useful tool visible without scrolling (all 15 live)
- ✅ `seoText` section with what/how/FAQs below each tool for crawler content
- ✅ No broken images or missing icons
- ✅ Privacy-respecting: no external requests except AdSense + Google Fonts
- ✅ All pages have unique `<title>` and `<meta description>` (via `generateMetadata`)
- ✅ Mobile-responsive (container max-width + clamp() font sizes)
- ✅ `/privacy` page discloses AdSense cookie usage
- ✅ `ads.txt` present at root

---

_Last updated: 2026-05-23_
