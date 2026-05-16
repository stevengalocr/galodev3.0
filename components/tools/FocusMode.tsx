'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

const PRESETS = [15, 25, 45, 60, 90];

export default function FocusMode() {
  const [task, setTask] = useState('');
  const [minutes, setMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = minutes * 60;
  const progress = ((total - timeLeft) / total) * 100;

  const reset = useCallback(() => {
    setRunning(false);
    setDone(false);
    setTimeLeft(minutes * 60);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [minutes]);

  useEffect(() => { reset(); }, [minutes]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(intervalRef.current!);
          setRunning(false);
          setDone(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  const toggleFullscreen = async () => {
    if (!fullscreen) {
      try { await containerRef.current?.requestFullscreen(); setFullscreen(true); } catch { setFullscreen(true); }
    } else {
      try { await document.exitFullscreen(); } catch { /* ignore */ }
      setFullscreen(false);
    }
  };

  useEffect(() => {
    const handler = () => { if (!document.fullscreenElement) setFullscreen(false); };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const circumference = 2 * Math.PI * 72;
  const dashOffset = circumference * (1 - progress / 100);

  return (
    <div ref={containerRef} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: fullscreen ? '100vh' : 520, padding: 40, gap: 32,
      background: fullscreen ? 'var(--ink)' : 'transparent', position: 'relative',
    }}>

      {/* Task input */}
      {!running && !done && (
        <div style={{ width: '100%', maxWidth: 440, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)', textAlign: 'center' }}>
            ¿En qué vas a trabajar?
          </label>
          <input
            value={task}
            onChange={e => setTask(e.target.value)}
            placeholder="Describe tu tarea..."
            style={{
              width: '100%', padding: '14px 20px', background: 'var(--ink-3)', border: '1px solid var(--line)',
              borderRadius: 14, color: 'var(--paper)', fontSize: 16, fontFamily: 'inherit',
              outline: 'none', textAlign: 'center', letterSpacing: '-0.01em',
            }}
          />
        </div>
      )}

      {/* Task display while running */}
      {(running || done) && task && (
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(18px, 2.5vw, 28px)', color: 'var(--paper-dim)', letterSpacing: '-0.01em', textAlign: 'center', maxWidth: 500, lineHeight: 1.2, fontStyle: 'italic' }}>
          {task}
        </div>
      )}

      {/* Duration presets */}
      {!running && !done && (
        <div style={{ display: 'flex', gap: 8 }}>
          {PRESETS.map(p => (
            <button key={p} onClick={() => setMinutes(p)} style={{
              width: 52, height: 52, borderRadius: '50%', border: '1px solid',
              borderColor: minutes === p ? 'var(--lime)' : 'var(--line)',
              background: minutes === p ? 'rgba(130,230,0,0.12)' : 'var(--ink-3)',
              color: minutes === p ? 'var(--lime)' : 'var(--paper-mute)',
              fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'pointer', transition: 'all 0.2s',
            }}>{p}m</button>
          ))}
        </div>
      )}

      {/* Circle */}
      <div style={{ position: 'relative', width: 180, height: 180 }}>
        <svg width="180" height="180" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="90" cy="90" r="72" fill="none" stroke="var(--ink-3)" strokeWidth="6" />
          <circle cx="90" cy="90" r="72" fill="none" stroke={done ? '#5BD1FF' : 'var(--lime)'} strokeWidth="6"
            strokeDasharray={circumference} strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 0.6s, stroke 0.3s' }} strokeLinecap="round" />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          {done
            ? <span style={{ fontFamily: 'var(--font-serif)', fontSize: 32, color: '#5BD1FF', fontStyle: 'italic' }}>Listo.</span>
            : <>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 36, color: 'var(--paper)', letterSpacing: '-0.02em', fontWeight: 600 }}>{formatTime(timeLeft)}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--paper-fade)', letterSpacing: '0.1em' }}>{minutes}:00</span>
            </>
          }
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {done ? (
          <button onClick={reset} className="btn btn-glow">Nueva sesión</button>
        ) : (
          <>
            <button onClick={reset} style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--line)', background: 'var(--ink-3)', color: 'var(--paper-mute)', cursor: 'pointer', fontSize: 16 }}>↺</button>
            <button
              onClick={() => setRunning(r => !r)}
              style={{
                width: 60, height: 60, borderRadius: '50%', border: 'none', cursor: 'pointer',
                background: 'var(--lime)', color: 'var(--ink)', fontSize: 22, fontWeight: 700,
                boxShadow: '0 0 24px rgba(130,230,0,0.35)', transition: 'all 0.2s',
              }}
            >{running ? '⏸' : '▶'}</button>
            <button onClick={toggleFullscreen} style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--line)', background: 'var(--ink-3)', color: 'var(--paper-mute)', cursor: 'pointer', fontSize: 14 }}>
              {fullscreen ? '⊡' : '⊞'}
            </button>
          </>
        )}
      </div>

      {running && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-fade)', letterSpacing: '0.08em', textAlign: 'center' }}>
          Sin distracciones. Solo el trabajo.
        </p>
      )}
    </div>
  );
}
