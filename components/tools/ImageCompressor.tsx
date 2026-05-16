'use client';

import { useState, useCallback, useRef } from 'react';

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

interface Result {
  blob: Blob;
  url: string;
  size: number;
  width: number;
  height: number;
}

export default function ImageCompressor() {
  const [original, setOriginal] = useState<{ file: File; url: string; size: number; width: number; height: number } | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [outputType, setOutputType] = useState<'image/jpeg' | 'image/webp'>('image/jpeg');
  const [processing, setProcessing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const compress = useCallback(async (file: File, q: number, mw: number, type: string) => {
    setProcessing(true);
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;
    await new Promise(res => { img.onload = res; });
    const scale = Math.min(1, mw / img.naturalWidth);
    const w = Math.round(img.naturalWidth * scale);
    const h = Math.round(img.naturalHeight * scale);
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0, w, h);
    URL.revokeObjectURL(url);
    const blob = await new Promise<Blob>(res => canvas.toBlob(b => res(b!), type, q));
    const resultUrl = URL.createObjectURL(blob);
    setResult({ blob, url: resultUrl, size: blob.size, width: w, height: h });
    setProcessing(false);
  }, []);

  const loadFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;
    await new Promise(res => { img.onload = res; });
    setOriginal({ file, url, size: file.size, width: img.naturalWidth, height: img.naturalHeight });
    setResult(null);
    compress(file, quality, maxWidth, outputType);
  }, [quality, maxWidth, outputType, compress]);

  const recompress = useCallback(() => {
    if (original) compress(original.file, quality, maxWidth, outputType);
  }, [original, quality, maxWidth, outputType, compress]);

  const download = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.url;
    const ext = outputType === 'image/jpeg' ? 'jpg' : 'webp';
    a.download = `compressed-${Date.now()}.${ext}`;
    a.click();
  };

  const reduction = original && result ? Math.round((1 - result.size / original.size) * 100) : 0;

  return (
    <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Drop zone */}
      {!original && (
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) loadFile(f); }}
          onClick={() => inputRef.current?.click()}
          style={{
            border: `2px dashed ${dragging ? 'var(--lime)' : 'var(--line)'}`,
            borderRadius: 20, padding: '60px 40px', textAlign: 'center', cursor: 'pointer',
            background: dragging ? 'rgba(130,230,0,0.04)' : 'var(--ink-3)', transition: 'all 0.2s',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
          }}
        >
          <span style={{ fontSize: 40 }}>🖼</span>
          <div>
            <p style={{ color: 'var(--paper)', fontFamily: 'var(--font-serif)', fontSize: 20, margin: '0 0 8px', letterSpacing: '-0.01em' }}>Arrastra tu imagen aquí</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--paper-mute)', margin: 0 }}>JPG, PNG, WebP, GIF · Todo en tu dispositivo</p>
          </div>
          <button className="btn btn-ghost btn-sm">Seleccionar archivo</button>
          <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) loadFile(f); }} />
        </div>
      )}

      {original && (
        <>
          {/* Stats comparison */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: 'Original', size: original.size, w: original.width, h: original.height, color: 'var(--paper-mute)' },
              { label: 'Comprimida', size: result?.size ?? 0, w: result?.width ?? 0, h: result?.height ?? 0, color: 'var(--lime)' },
            ].map(({ label, size, w, h, color }) => (
              <div key={label} style={{ padding: '16px 20px', background: 'var(--ink-3)', borderRadius: 14, border: '1px solid var(--line)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--paper-mute)', marginBottom: 8 }}>{label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color, fontWeight: 600 }}>{size ? formatBytes(size) : '—'}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-fade)', marginTop: 4 }}>{w && h ? `${w} × ${h}px` : '—'}</div>
              </div>
            ))}
          </div>

          {/* Reduction badge */}
          {result && (
            <div style={{ padding: '12px 20px', background: reduction > 0 ? 'rgba(130,230,0,0.08)' : 'rgba(255,107,107,0.08)', border: `1px solid ${reduction > 0 ? 'rgba(130,230,0,0.2)' : 'rgba(255,107,107,0.2)'}`, borderRadius: 12, textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: reduction > 0 ? 'var(--lime)' : 'var(--rust)' }}>
                {reduction > 0 ? `Reducido un ${reduction}%` : `Aumentó un ${Math.abs(reduction)}% (ajusta la calidad)`}
              </span>
            </div>
          )}

          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '20px 24px', background: 'var(--ink-3)', borderRadius: 16, border: '1px solid var(--line)' }}>
            {/* Quality */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Calidad</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--lime)' }}>{Math.round(quality * 100)}%</span>
              </div>
              <input type="range" min={0.1} max={1} step={0.05} value={quality}
                onChange={e => setQuality(Number(e.target.value))}
                style={{ accentColor: 'var(--lime)', cursor: 'pointer' }} />
            </div>

            {/* Max width */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Ancho máximo</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--lime)' }}>{maxWidth}px</span>
              </div>
              <input type="range" min={320} max={3840} step={80} value={maxWidth}
                onChange={e => setMaxWidth(Number(e.target.value))}
                style={{ accentColor: 'var(--lime)', cursor: 'pointer' }} />
            </div>

            {/* Format */}
            <div style={{ display: 'flex', gap: 8 }}>
              {(['image/jpeg', 'image/webp'] as const).map(t => (
                <button key={t} onClick={() => setOutputType(t)} style={{
                  padding: '8px 16px', borderRadius: 999, fontSize: 12, fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.06em', border: '1px solid',
                  borderColor: outputType === t ? 'var(--lime)' : 'var(--line)',
                  background: outputType === t ? 'rgba(130,230,0,0.12)' : 'var(--ink-2)',
                  color: outputType === t ? 'var(--lime)' : 'var(--paper-mute)', cursor: 'pointer',
                }}>{t === 'image/jpeg' ? 'JPEG' : 'WebP'}</button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={recompress} disabled={processing} className="btn btn-ghost btn-sm" style={{ opacity: processing ? 0.6 : 1 }}>
                {processing ? 'Procesando...' : 'Aplicar'}
              </button>
              <button onClick={download} disabled={!result || processing} className="btn btn-glow btn-sm" style={{ opacity: result && !processing ? 1 : 0.4 }}>
                Descargar
              </button>
              <button onClick={() => { setOriginal(null); setResult(null); }} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', background: 'none', border: 'none', cursor: 'pointer', marginLeft: 'auto' }}>
                Nueva imagen
              </button>
            </div>
          </div>

          {/* Preview */}
          {result && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[{ label: 'Original', src: original.url }, { label: 'Comprimida', src: result.url }].map(({ label, src }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>{label}</span>
                  <div style={{ aspectRatio: '4/3', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--ink-3)' }}>
                    <img src={src} alt={label} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
