'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { fetchFile } from '@ffmpeg/util';
import { useFFmpeg, ffmpegDataToBlob } from './useFFmpeg';

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

const FPS_OPTIONS = [5, 10, 15, 20, 24];
const SIZE_OPTIONS = [
  { label: '320px', value: 320 },
  { label: '480px', value: 480 },
  { label: '640px', value: 640 },
  { label: 'Original', value: -1 },
];

export default function GifMaker() {
  const { ffmpeg, load, loaded, loading, progress, setProgress } = useFFmpeg();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState('');
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [clipDuration, setClipDuration] = useState(3);
  const [fps, setFps] = useState(10);
  const [width, setWidth] = useState(480);
  const [processing, setProcessing] = useState(false);
  const [outputURL, setOutputURL] = useState('');
  const [outputSize, setOutputSize] = useState(0);
  const [error, setError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
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

  const handleMetadata = () => {
    if (!videoRef.current) return;
    const d = videoRef.current.duration;
    setDuration(d);
    setClipDuration(Math.min(5, d));
  };

  const makeGif = useCallback(async () => {
    if (!videoFile || !loaded) return;
    setProcessing(true); setProgress(0); setError(''); setOutputURL('');
    try {
      const ext = videoFile.name.split('.').pop() || 'mp4';
      const inputName = `input.${ext}`;
      const paletteName = 'palette.png';
      const outputName = 'output.gif';
      await ffmpeg.writeFile(inputName, await fetchFile(videoFile));

      const scaleFilter = width > 0 ? `scale=${width}:-1:flags=lanczos` : 'scale=trunc(iw/2)*2:-1:flags=lanczos';

      // 1: Generate palette for better quality
      await ffmpeg.exec([
        '-ss', String(startTime),
        '-t', String(clipDuration),
        '-i', inputName,
        '-vf', `fps=${fps},${scaleFilter},palettegen=stats_mode=diff`,
        '-y', paletteName,
      ]);

      setProgress(40);

      // 2: Generate GIF using palette
      await ffmpeg.exec([
        '-ss', String(startTime),
        '-t', String(clipDuration),
        '-i', inputName,
        '-i', paletteName,
        '-filter_complex', `fps=${fps},${scaleFilter}[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle`,
        '-y', outputName,
      ]);

      const raw = await ffmpeg.readFile(outputName);
      const blob = ffmpegDataToBlob(raw, 'image/gif');
      setOutputSize(blob.size);
      setOutputURL(URL.createObjectURL(blob));
      setProgress(100);
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(paletteName);
      await ffmpeg.deleteFile(outputName);
    } catch (err) {
      setError('Error al generar el GIF. Prueba con un clip más corto o menor FPS.');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  }, [videoFile, loaded, ffmpeg, startTime, clipDuration, fps, width, setProgress]);

  useEffect(() => () => { if (videoURL) URL.revokeObjectURL(videoURL); }, [videoURL]);

  return (
    <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {!videoFile ? (
        <div
          onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          style={{ border: '2px dashed var(--line-2)', borderRadius: 16, padding: '60px 40px', textAlign: 'center', cursor: 'pointer', background: 'var(--ink-3)' }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎞️</div>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 22, marginBottom: 8 }}>Arrastra tu video aquí</p>
          <p style={{ color: 'var(--paper-mute)', fontSize: 14 }}>MP4, WebM, MOV — recomendado clips cortos (&lt;30s)</p>
          <button className="btn btn-glow btn-sm" style={{ marginTop: 20 }}>Seleccionar archivo</button>
          <input ref={fileInputRef} type="file" accept="video/*" style={{ display: 'none' }} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
        </div>
      ) : (
        <>
          {/* Preview */}
          <div style={{ borderRadius: 12, overflow: 'hidden', background: '#000', border: '1px solid var(--line)' }}>
            <video ref={videoRef} src={videoURL} onLoadedMetadata={handleMetadata} controls style={{ width: '100%', maxHeight: 280, display: 'block' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--paper-mute)' }}>
              📁 {videoFile.name} · {formatTime(duration)} total
            </span>
            <button onClick={() => { setVideoFile(null); setOutputURL(''); }} style={{ fontSize: 12, color: 'var(--paper-mute)', background: 'none', border: 'none', cursor: 'pointer' }}>Cambiar ✕</button>
          </div>

          {/* GIF Settings */}
          <div style={{ background: 'var(--ink-3)', border: '1px solid var(--line)', borderRadius: 12, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Configuración del GIF</div>

            {/* Start time */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Inicio</label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--lime)' }}>{formatTime(startTime)}</span>
              </div>
              <input type="range" min={0} max={Math.max(0, duration - 0.5)} step={0.1} value={startTime}
                onChange={(e) => setStartTime(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            {/* Duration */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Duración</label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--lime)' }}>{clipDuration.toFixed(1)}s</span>
              </div>
              <input type="range" min={0.5} max={Math.min(15, duration - startTime)} step={0.5} value={clipDuration}
                onChange={(e) => setClipDuration(Number(e.target.value))} style={{ width: '100%' }} />
              {clipDuration > 8 && <p style={{ fontSize: 12, color: 'var(--rust)', marginTop: 4 }}>⚠ GIFs largos pueden ser muy pesados. Recomendado: &lt;8s</p>}
            </div>

            {/* FPS */}
            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>FPS (fotogramas por segundo)</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {FPS_OPTIONS.map((f) => (
                  <button key={f} onClick={() => setFps(f)} style={{
                    padding: '6px 14px', borderRadius: 999, fontSize: 13, fontFamily: 'var(--font-mono)',
                    border: `1px solid ${fps === f ? 'var(--lime)' : 'var(--line)'}`,
                    background: fps === f ? 'rgba(91,209,255,0.1)' : 'var(--ink-2)',
                    color: fps === f ? 'var(--lime)' : 'var(--paper-mute)', cursor: 'pointer',
                  }}>{f}</button>
                ))}
              </div>
            </div>

            {/* Width */}
            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>Ancho</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {SIZE_OPTIONS.map((s) => (
                  <button key={s.value} onClick={() => setWidth(s.value)} style={{
                    padding: '6px 14px', borderRadius: 999, fontSize: 13, fontFamily: 'var(--font-mono)',
                    border: `1px solid ${width === s.value ? 'var(--lime)' : 'var(--line)'}`,
                    background: width === s.value ? 'rgba(91,209,255,0.1)' : 'var(--ink-2)',
                    color: width === s.value ? 'var(--lime)' : 'var(--paper-mute)', cursor: 'pointer',
                  }}>{s.label}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Action */}
          {!loaded ? (
            <button onClick={load} disabled={loading} className="btn btn-glow" style={{ alignSelf: 'flex-start' }}>
              {loading ? '⚙️ Cargando FFmpeg…' : '⚙️ Cargar motor de video'}
            </button>
          ) : (
            <button onClick={makeGif} disabled={processing} className="btn btn-glow" style={{ alignSelf: 'flex-start' }}>
              {processing ? `🎞️ Generando GIF… ${progress}%` : '🎞️ Crear GIF'}
            </button>
          )}

          {processing && (
            <div>
              <div style={{ height: 4, background: 'var(--ink-3)', borderRadius: 999 }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'var(--lime)', borderRadius: 999, transition: 'width 0.5s' }} />
              </div>
            </div>
          )}

          {error && <p style={{ color: 'var(--rust)', fontSize: 14 }}>⚠ {error}</p>}

          {outputURL && (
            <div style={{ background: 'rgba(91,209,255,0.06)', border: '1px solid rgba(91,209,255,0.2)', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--lime)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                ✓ GIF listo — {(outputSize / 1024).toFixed(0)} KB
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={outputURL} alt="GIF result" style={{ maxWidth: '100%', borderRadius: 8, border: '1px solid var(--line)' }} />
              <a href={outputURL} download={`${videoFile.name.replace(/\.[^.]+$/, '')}.gif`} className="btn btn-glow" style={{ alignSelf: 'flex-start' }}>
                ⬇ Descargar GIF
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
}
