# GaloDev — Tools Architecture Guide

> Reference for adding new tools. Everything you need to know in one file.

---

## Overview

Each tool is a self-contained React client component rendered inside the tool detail page. Tools run 100% in the browser — no data leaves the user's device.

---

## File Map

```
lib/
  tools.ts          ← Tool registry (metadata + seoText for all 15 tools)
  toolsImpl.ts      ← Set of slugs that have a working implementation

components/
  ToolCard.tsx      ← Grid card with SVG icon map + links to tool page
  tools/
    ToolRenderer.tsx       ← Dynamic dispatcher: slug → component
    Base64Tool.tsx         ← Base64 encode / decode
    JsonFormatter.tsx      ← JSON format / minify / validate
    PasswordGenerator.tsx  ← Crypto-secure password generator
    RegexTester.tsx        ← Real-time regex with cheatsheet
    JwtDecoder.tsx         ← JWT header/payload decoder
    UuidGenerator.tsx      ← UUID v4 generator (bulk + formats)
    MarkdownPreviewer.tsx  ← Split-pane Markdown editor
    PomodoroTimer.tsx      ← Pomodoro with notifications
    QuickNotes.tsx         ← Auto-save notepad (localStorage)
    FocusMode.tsx          ← Fullscreen focus timer
    QrCodeMaker.tsx        ← QR encoder (Reed-Solomon, no deps)
    ImageCompressor.tsx    ← Canvas API image compression
    UnitConverter.tsx      ← 5 categories: length, weight, temp, storage, CSS
    ColorConverter.tsx     ← HEX/RGB/HSL/OKLCH + Tailwind match
    UrlEncoder.tsx         ← encodeURIComponent / encodeURI

app/
  tools/[slug]/page.tsx  ← Tool detail page (Server Component)

.env.local
  NEXT_PUBLIC_ADSENSE_ID            ← ca-pub-8417467581385725
  NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD
  NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR
  NEXT_PUBLIC_ADSENSE_SLOT_INLINE
```

---

## Currently Implemented Tools (15/15)

| Slug | Component | Category | Type |
|------|-----------|----------|------|
| `json-formatter` | `JsonFormatter.tsx` | Dev | Pure client |
| `base64` | `Base64Tool.tsx` | Dev | Pure client |
| `password-generator` | `PasswordGenerator.tsx` | Dev | crypto.getRandomValues |
| `regex-tester` | `RegexTester.tsx` | Dev | Pure client |
| `jwt-decoder` | `JwtDecoder.tsx` | Dev | Pure client |
| `uuid-generator` | `UuidGenerator.tsx` | Dev | crypto.randomUUID |
| `markdown-previewer` | `MarkdownPreviewer.tsx` | Dev | Pure client |
| `pomodoro-timer` | `PomodoroTimer.tsx` | Productividad | Notifications API |
| `quick-notes` | `QuickNotes.tsx` | Productividad | localStorage |
| `focus-mode` | `FocusMode.tsx` | Productividad | Fullscreen API |
| `qr-code-maker` | `QrCodeMaker.tsx` | Utilidades | Canvas + Reed-Solomon |
| `image-compressor` | `ImageCompressor.tsx` | Utilidades | Canvas API |
| `unit-converter` | `UnitConverter.tsx` | Utilidades | Pure client |
| `color-converter` | `ColorConverter.tsx` | Utilidades | Pure client |
| `url-encoder` | `UrlEncoder.tsx` | Utilidades | Pure client |

---

## Adding a New Tool — Checklist

### 1. Register in `lib/tools.ts`

Add an entry to the `tools` array. Required fields:

```ts
{
  slug: 'my-new-tool',         // kebab-case, URL-safe
  name: 'My New Tool',         // Display name (title case)
  category: 'Dev',             // Dev | Productividad | Utilidades
  desc: 'One-sentence …',      // Max ~120 chars
  icon: 'code',                // Must exist in the ToolCard icon map
  seoText: {
    what: '...',               // 2-3 sentences explaining the tool
    how: '...',                // 2-3 sentences explaining how to use it
    faqs: [
      { q: '...', a: '...' }, // 4 FAQs minimum
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

Use Lucide icon shapes as reference (https://lucide.dev).

### 3. Build the component

Create `components/tools/MyNewTool.tsx`:

```tsx
'use client';

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
- Primary action button: `className="btn btn-glow btn-sm"` or `className="btn btn-lime"`
- Secondary action button: `className="btn btn-ghost btn-sm"`
- Drop zone / surface: `background: 'var(--ink-3)', border: '1px solid var(--line)', borderRadius: 12`
- Output area: `background: 'var(--ink-2)', border: '1px solid var(--line)', borderRadius: 8`
- Success text: `color: 'var(--lime)'` / Error text: `color: 'var(--rust)'`

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
--font-serif   /* Instrument Serif — headings */
--font-mono    /* JetBrains Mono — labels, code */
--font-sans    /* Geist Sans — body text */

/* Layout */
--radius       /* Default border radius (12px) */
--ease         /* cubic-bezier(0.16, 1, 0.3, 1) */
```

---

## AdSense Integration

Publisher ID: `ca-pub-8417467581385725`

The global `<script>` is loaded once in `app/layout.tsx`. Individual ad units are rendered by `<AdBlock>` component.

| Slot env var | Location | Format |
|---|---|---|
| `NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD` | Above tool area | 728×90 |
| `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR` | Sidebar | 300×250 |
| `NEXT_PUBLIC_ADSENSE_SLOT_INLINE` | Below tool card | 336×280 |

Until slots are configured, `<AdBlock>` renders a styled placeholder (no broken layout).

---

_Last updated: 2026-05-23_
