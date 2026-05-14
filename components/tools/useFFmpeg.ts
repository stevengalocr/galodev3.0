'use client';

import { useState, useRef, useCallback } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';

/** Convert FFmpeg readFile output (Uint8Array | string) to a Blob safely */
export function ffmpegDataToBlob(raw: unknown, type: string): Blob {
  if (typeof raw === 'string') {
    return new Blob([raw], { type });
  }
  const u8 = raw as Uint8Array;
  // Copy to a plain ArrayBuffer (avoids SharedArrayBuffer issues in strict TS)
  const copy = new ArrayBuffer(u8.byteLength);
  new Uint8Array(copy).set(u8);
  return new Blob([copy], { type });
}

// Single-threaded core — no SharedArrayBuffer needed
const CORE_BASE = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';

export function useFFmpeg() {
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const getFFmpeg = useCallback(() => {
    if (!ffmpegRef.current) {
      ffmpegRef.current = new FFmpeg();
    }
    return ffmpegRef.current;
  }, []);

  const load = useCallback(async () => {
    if (loaded || loading) return;
    setLoading(true);
    setLogs([]);
    try {
      const ffmpeg = getFFmpeg();
      ffmpeg.on('log', ({ message }) => {
        setLogs((prev) => [...prev.slice(-50), message]);
      });
      ffmpeg.on('progress', ({ progress: p }) => {
        setProgress(Math.min(99, Math.round(p * 100)));
      });
      await ffmpeg.load({
        coreURL: await toBlobURL(`${CORE_BASE}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${CORE_BASE}/ffmpeg-core.wasm`, 'application/wasm'),
      });
      setLoaded(true);
    } catch (err) {
      console.error('FFmpeg load error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loaded, loading, getFFmpeg]);

  return {
    ffmpeg: getFFmpeg(),
    load,
    loaded,
    loading,
    progress,
    logs,
    setProgress,
  };
}
