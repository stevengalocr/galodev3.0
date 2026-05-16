'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const TOOLS: Record<string, React.ComponentType> = {
  // Developer tools
  'json-formatter':     dynamic(() => import('./JsonFormatter'),     { ssr: false }),
  'base64':             dynamic(() => import('./Base64Tool'),         { ssr: false }),
  'password-generator': dynamic(() => import('./PasswordGenerator'), { ssr: false }),
  'regex-tester':       dynamic(() => import('./RegexTester'),       { ssr: false }),
  'jwt-decoder':        dynamic(() => import('./JwtDecoder'),        { ssr: false }),
  'uuid-generator':     dynamic(() => import('./UuidGenerator'),     { ssr: false }),
  'markdown-previewer': dynamic(() => import('./MarkdownPreviewer'), { ssr: false }),
  // Productivity
  'pomodoro-timer':     dynamic(() => import('./PomodoroTimer'),     { ssr: false }),
  'quick-notes':        dynamic(() => import('./QuickNotes'),        { ssr: false }),
  'focus-mode':         dynamic(() => import('./FocusMode'),         { ssr: false }),
  // Utilities
  'qr-code-maker':      dynamic(() => import('./QrCodeMaker'),      { ssr: false }),
  'image-compressor':   dynamic(() => import('./ImageCompressor'),  { ssr: false }),
  'unit-converter':     dynamic(() => import('./UnitConverter'),     { ssr: false }),
  'color-converter':    dynamic(() => import('./ColorConverter'),    { ssr: false }),
  'url-encoder':        dynamic(() => import('./UrlEncoder'),        { ssr: false }),
};

function LoadingState() {
  return (
    <div style={{ padding: '60px 40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{
        width: 40, height: 40, border: '3px solid var(--line-2)',
        borderTopColor: 'var(--lime)', borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--paper-mute)', letterSpacing: '0.08em' }}>
        Cargando herramienta…
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

interface Props { slug: string }

export default function ToolRenderer({ slug }: Props) {
  const Tool = TOOLS[slug];
  if (!Tool) return null;
  return (
    <Suspense fallback={<LoadingState />}>
      <Tool />
    </Suspense>
  );
}
