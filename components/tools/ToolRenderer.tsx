'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const TOOLS: Record<string, React.ComponentType> = {
  'base64': dynamic(() => import('./Base64Tool'), { ssr: false }),
  'video-trimmer': dynamic(() => import('./VideoTrimmer'), { ssr: false }),
  'video-compressor': dynamic(() => import('./VideoCompressor'), { ssr: false }),
  'gif-maker': dynamic(() => import('./GifMaker'), { ssr: false }),
  'password-generator': dynamic(() => import('./PasswordGenerator'), { ssr: false }),
  'json-formatter': dynamic(() => import('./JsonFormatter'), { ssr: false }),
  'color-palette': dynamic(() => import('./PaletteBuilder'), { ssr: false }),
  'qr-code-maker': dynamic(() => import('./QrCodeMaker'), { ssr: false }),
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

interface Props {
  slug: string;
}

export default function ToolRenderer({ slug }: Props) {
  const Tool = TOOLS[slug];
  if (!Tool) return null;

  return (
    <Suspense fallback={<LoadingState />}>
      <Tool />
    </Suspense>
  );
}

