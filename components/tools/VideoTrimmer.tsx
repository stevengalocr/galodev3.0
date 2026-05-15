'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { fetchFile } from '@ffmpeg/util';
import { useFFmpeg, ffmpegDataToBlob } from './useFFmpeg';

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  const ms = Math.round((s % 1) * 10);
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}.${ms}`;
}

export default function VideoTrimmer() {
  const { ffmpeg, load, loaded, loading, progress, setProgress } = useFFmpeg();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState('');
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [outputURL, setOutputURL] = useState('');
  const [outputSize, setOutputSize] = useState(0);
  const [error, setError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('video/')) { setError('Solo se aceptan archivos de video.'); return; }
    setError('');
    setOutputURL('');
    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoURL(url);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleMetadata = () => {
    const vid = videoRef.current;
    if (!vid) return;
    setDuration(vid.duration);
    setEndTime(vid.duration);
  };

  const seek = (t: number) => {
    if (videoRef.current) videoRef.current.currentTime = t;
  };

  const trim = useCallback(async () => {
    if (!videoFile || !loaded) return;
    setProcessing(true);
    setProgress(0);
    setError('');
    setOutputURL('');
    try {
      const ext = videoFile.name.split('.').pop() || 'mp4';
      const inputName = `input.${ext}`;
      const outputName = `trimmed.${ext}`;
      await ffmpeg.writeFile(inputName, await fetchFile(videoFile));
      const duration_s = endTime - startTime;
      await ffmpeg.exec([
        '-ss', String(startTime.toFixed(3)),
        '-i', inputName,
        '-t', String(duration_s.toFixed(3)),
        '-c', 'copy',
        '-avoid_negative_ts', 'make_zero',
        outputName,
      ]);
      const raw = await ffmpeg.readFile(outputName);
      const blob = ffmpegDataToBlob(raw, videoFile.type);
      setOutputSize(blob.size);
      setOutputURL(URL.createObjectURL(blob));
      setProgress(100);
      await ffmpeg.deleteFile(inputName);
      await ffmpeg.deleteFile(outputName);
    } catch (err) {
      setError('Error al recortar el video. Intenta con otro archivo.');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  }, [videoFile, loaded, ffmpeg, startTime, endTime, setProgress]);

  useEffect(() => {
    return () => { if (videoURL) URL.revokeObjectURL(videoURL); };
  }, [videoURL]);

  const pct = duration > 0 ? { s: (startTime / duration) * 100, e: (endTime / duration) * 100 } : { s: 0, e: 100 };

  return (
    <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Upload zone */}
      {!videoFile ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: '2px dashed var(--line-2)', borderRadius: 16, padding: '60px 40px',
            textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s',
            background: 'var(--ink-3)',
          }}
        >
          <div style={{ color: 'var(--lime)', marginBottom: 16 }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12"/></svg>
          </div>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 22, marginBottom: 8 }}>Arrastra tu video aquí</p>
          <p style={{ color: 'var(--paper-mute)', fontSize: 14 }}>MP4, WebM, MOV, AVI — hasta 2GB</p>
          <button className="btn btn-glow btn-sm" style={{ marginTop: 20 }} onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
            Seleccionar archivo
          </button>
          <input ref={fileInputRef} type="file" accept="video/*" style={{ display: 'none' }} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
        </div>
      ) : (
        <>
          {/* Video preview */}
          <div style={{ borderRadius: 12, overflow: 'hidden', background: '#000', border: '1px solid var(--line)' }}>
            <video
              ref={videoRef}
              src={videoURL}
              onLoadedMetadata={handleMetadata}
              controls
              style={{ width: '100%', maxHeight: 320, display: 'block' }}
            />
          </div>

          {/* Info */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--paper-mute)' }}>
              {videoFile.name} · {(videoFile.size / 1024 / 1024).toFixed(1)} MB · {formatTime(duration)}
            </div>
            <button onClick={() => { setVideoFile(null); setVideoURL(''); setOutputURL(''); }} style={{ fontSize: 12, color: 'var(--paper-mute)', background: 'none', border: 'none', cursor: 'pointer' }}>
              Cambiar video
            </button>
          </div>

          {/* Timeline slider */}
          <div style={{ background: 'var(--ink-3)', border: '1px solid var(--line)', borderRadius: 12, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>
              Seleccionar rango
            </div>

            {/* Visual timeline */}
            <div style={{ position: 'relative', height: 8, background: 'var(--ink-4)', borderRadius: 999 }}>
              <div style={{ position: 'absolute', left: `${pct.s}%`, right: `${100 - pct.e}%`, top: 0, bottom: 0, background: 'var(--lime)', borderRadius: 999 }} />
              <div
                style={{ position: 'absolute', left: `${pct.s}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', background: 'var(--lime)', border: '2px solid var(--ink)', cursor: 'ew-resize' }}
                title="Inicio"
              />
              <div
                style={{ position: 'absolute', left: `${pct.e}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', background: 'var(--lime)', border: '2px solid var(--ink)', cursor: 'ew-resize' }}
                title="Fin"
              />
            </div>

            {/* Start / End inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--paper-mute)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Inicio</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input
                    type="range" min={0} max={endTime - 0.1} step={0.1} value={startTime}
                    onChange={(e) => { setStartTime(Number(e.target.value)); seek(Number(e.target.value)); }}
                    style={{ flex: 1 }}
                  />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--lime)', minWidth: 64, textAlign: 'right' }}>{formatTime(startTime)}</span>
                </div>
              </div>
              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--paper-mute)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Fin</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input
                    type="range" min={startTime + 0.1} max={duration} step={0.1} value={endTime}
                    onChange={(e) => { setEndTime(Number(e.target.value)); seek(Number(e.target.value)); }}
                    style={{ flex: 1 }}
                  />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--lime)', minWidth: 64, textAlign: 'right' }}>{formatTime(endTime)}</span>
                </div>
              </div>
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--paper-mute)', textAlign: 'center' }}>
              Duración del clip: <span style={{ color: 'var(--paper)' }}>{formatTime(endTime - startTime)}</span>
            </div>
          </div>

          {/* Action */}
          {!loaded ? (
            <button onClick={load} disabled={loading} className="btn btn-glow" style={{ alignSelf: 'flex-start' }}>
              {loading ? 'Cargando motor de video…' : 'Cargar motor de video'}
            </button>
          ) : (
            <button onClick={trim} disabled={processing} className="btn btn-glow" style={{ alignSelf: 'flex-start' }}>
              {processing ? `Recortando… ${progress}%` : 'Recortar video'}
            </button>
          )}

          {/* Progress bar */}
          {processing && (
            <div style={{ height: 4, background: 'var(--ink-3)', borderRadius: 999 }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'var(--lime)', borderRadius: 999, transition: 'width 0.3s' }} />
            </div>
          )}

          {error && <p style={{ color: 'var(--rust)', fontSize: 14, fontFamily: 'var(--font-mono)' }}>{error}</p>}

          {/* Result */}
          {outputURL && (
            <div style={{ background: 'rgba(91,209,255,0.06)', border: '1px solid rgba(91,209,255,0.2)', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--lime)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Clip listo — {(outputSize / 1024 / 1024).toFixed(2)} MB
              </div>
              <video src={outputURL} controls style={{ width: '100%', maxHeight: 240, borderRadius: 8, background: '#000' }} />
              <a
                href={outputURL}
                download={`trimmed_${videoFile.name}`}
                className="btn btn-glow"
                style={{ alignSelf: 'flex-start' }}
              >
                Descargar clip
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
}
