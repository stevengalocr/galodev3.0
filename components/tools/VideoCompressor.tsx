'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { fetchFile } from '@ffmpeg/util';
import { useFFmpeg, ffmpegDataToBlob } from './useFFmpeg';

const PRESETS = [
  { label: 'Alta calidad', crf: 23, desc: '~50% menos, calidad casi idéntica', icon: '⭐' },
  { label: 'Balanceado', crf: 28, desc: '~70% menos, ligera pérdida', icon: '⚖️' },
  { label: 'Máxima compresión', crf: 35, desc: '~85% menos, web/mensajería', icon: '🗜️' },
];

export default function VideoCompressor() {
  const { ffmpeg, load, loaded, loading, progress, setProgress } = useFFmpeg();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState('');
  const [preset, setPreset] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [outputURL, setOutputURL] = useState('');
  const [outputSize, setOutputSize] = useState(0);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('video/')) { setError('Solo archivos de video.'); return; }
    setError(''); setOutputURL('');
    setVideoFile(file);
    setVideoURL(URL.createObjectURL(file));
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const compress = useCallback(async () => {
    if (!videoFile || !loaded) return;
    setProcessing(true); setProgress(0); setError(''); setOutputURL('');
    try {
      const ext = videoFile.name.split('.').pop() || 'mp4';
      const inputName = `input.${ext}`;
      const outputName = 'compressed.mp4';
      await ffmpeg.writeFile(inputName, await fetchFile(videoFile));
      await ffmpeg.exec([
        '-i', inputName,
        '-c:v', 'libx264',
        '-crf', String(PRESETS[preset].crf),
        '-preset', 'fast',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-movflags', '+faststart',
        outputName,
      ]);
      const raw = await ffmpeg.readFile(outputName);
      const blob = ffmpegDataToBlob(raw, 'video/mp4');
      setOutputSize(blob.size);
      setOutputURL(URL.createObjectURL(blob));
      setProgress(100);
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);
    } catch (err) {
      setError('Error al comprimir. Intenta con un preset diferente.');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  }, [videoFile, loaded, ffmpeg, preset, setProgress]);

  useEffect(() => () => { if (videoURL) URL.revokeObjectURL(videoURL); }, [videoURL]);

  const savedPct = videoFile && outputSize ? Math.round((1 - outputSize / videoFile.size) * 100) : 0;

  return (
    <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {!videoFile ? (
        <div
          onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          style={{ border: '2px dashed var(--line-2)', borderRadius: 16, padding: '60px 40px', textAlign: 'center', cursor: 'pointer', background: 'var(--ink-3)' }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>🗜️</div>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 22, marginBottom: 8 }}>Arrastra tu video aquí</p>
          <p style={{ color: 'var(--paper-mute)', fontSize: 14 }}>MP4, WebM, MOV — hasta 2GB</p>
          <button className="btn btn-glow btn-sm" style={{ marginTop: 20 }}>Seleccionar archivo</button>
          <input ref={fileInputRef} type="file" accept="video/*" style={{ display: 'none' }} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
        </div>
      ) : (
        <>
          {/* File info */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '14px 18px', background: 'var(--ink-3)', border: '1px solid var(--line)', borderRadius: 10 }}>
            <span style={{ fontSize: 24 }}>🎬</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: 'var(--paper)' }}>{videoFile.name}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--paper-mute)', marginTop: 2 }}>
                Tamaño original: <strong style={{ color: 'var(--paper)' }}>{(videoFile.size / 1024 / 1024).toFixed(2)} MB</strong>
              </div>
            </div>
            <button onClick={() => { setVideoFile(null); setVideoURL(''); setOutputURL(''); }} style={{ color: 'var(--paper-mute)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}>✕</button>
          </div>

          {/* Preset selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Calidad de compresión</label>
            <div style={{ display: 'flex', gap: 12 }}>
              {PRESETS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setPreset(i)}
                  style={{
                    flex: 1, padding: '16px 12px', borderRadius: 12, border: `1px solid ${preset === i ? 'var(--lime)' : 'var(--line)'}`,
                    background: preset === i ? 'rgba(91,209,255,0.08)' : 'var(--ink-3)',
                    cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                  }}
                >
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{p.icon}</div>
                  <div style={{ fontSize: 14, color: preset === i ? 'var(--lime)' : 'var(--paper)', fontWeight: preset === i ? 600 : 400, marginBottom: 4 }}>{p.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--paper-mute)' }}>{p.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Action */}
          {!loaded ? (
            <button onClick={load} disabled={loading} className="btn btn-glow" style={{ alignSelf: 'flex-start' }}>
              {loading ? '⚙️ Cargando FFmpeg…' : '⚙️ Cargar motor de video'}
            </button>
          ) : (
            <button onClick={compress} disabled={processing} className="btn btn-glow" style={{ alignSelf: 'flex-start' }}>
              {processing ? `🗜️ Comprimiendo… ${progress}%` : '🗜️ Comprimir video'}
            </button>
          )}

          {processing && (
            <div>
              <div style={{ height: 4, background: 'var(--ink-3)', borderRadius: 999 }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'var(--lime)', borderRadius: 999, transition: 'width 0.3s' }} />
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', marginTop: 8 }}>
                Esto puede tardar unos minutos dependiendo del tamaño del video…
              </p>
            </div>
          )}

          {error && <p style={{ color: 'var(--rust)', fontSize: 14 }}>⚠ {error}</p>}

          {/* Result */}
          {outputURL && (
            <div style={{ background: 'rgba(91,209,255,0.06)', border: '1px solid rgba(91,209,255,0.2)', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--lime)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>✓ Compresión completada</span>
              </div>
              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {[
                  { label: 'Original', value: `${(videoFile.size / 1024 / 1024).toFixed(2)} MB`, color: 'var(--paper)' },
                  { label: 'Comprimido', value: `${(outputSize / 1024 / 1024).toFixed(2)} MB`, color: 'var(--lime)' },
                  { label: 'Ahorro', value: `${savedPct}%`, color: savedPct > 50 ? 'var(--lime)' : 'var(--paper-dim)' },
                ].map((s) => (
                  <div key={s.label} style={{ padding: '12px 16px', background: 'var(--ink-3)', borderRadius: 8, textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: s.color }}>{s.value}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--paper-mute)', marginTop: 4, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <video src={outputURL} controls style={{ width: '100%', maxHeight: 240, borderRadius: 8, background: '#000' }} />
              <a href={outputURL} download={`compressed_${videoFile.name.replace(/\.[^.]+$/, '')}.mp4`} className="btn btn-glow" style={{ alignSelf: 'flex-start' }}>
                ⬇ Descargar video comprimido
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
}
