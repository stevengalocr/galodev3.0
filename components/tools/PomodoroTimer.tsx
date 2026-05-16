'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

type Phase = 'work' | 'break' | 'longbreak';

const DEFAULT = { work: 25, break: 5, longbreak: 15 };

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function PomodoroTimer() {
  const [phase, setPhase] = useState<Phase>('work');
  const [minutes, setMinutes] = useState(DEFAULT);
  const [timeLeft, setTimeLeft] = useState(DEFAULT.work * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = minutes[phase] * 60;
  const progress = ((total - timeLeft) / total) * 100;

  const reset = useCallback((p: Phase = phase, mins = minutes) => {
    setRunning(false);
    setTimeLeft(mins[p] * 60);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [phase, minutes]);

  const switchPhase = useCallback((p: Phase) => {
    setPhase(p);
    setRunning(false);
    setTimeLeft(minutes[p] * 60);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [minutes]);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(intervalRef.current!);
          setRunning(false);
          if (phase === 'work') {
            setSessions(s => {
              const next = s + 1;
              const nextPhase = next % 4 === 0 ? 'longbreak' : 'break';
              setPhase(nextPhase);
              setTimeLeft(minutes[nextPhase] * 60);
              return next;
            });
          } else {
            setPhase('work');
            setTimeLeft(minutes.work * 60);
          }
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('GaloDev Pomodoro', {
              body: phase === 'work' ? 'Tiempo de descanso!' : 'A trabajar!',
            });
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, phase, minutes]);

  const requestNotif = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  const phaseColors: Record<Phase, string> = {
    work: 'var(--lime)',
    break: '#5BD1FF',
    longbreak: '#A78BFA',
  };
  const color = phaseColors[phase];

  const circumference = 2 * Math.PI * 80;
  const dash = circumference * (1 - progress / 100);

  return (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>

      {/* Phase tabs */}
      <div style={{ display: 'flex', background: 'var(--ink-3)', border: '1px solid var(--line)', borderRadius: 999, padding: 4, gap: 4 }}>
        {([['work', 'Trabajo'], ['break', 'Descanso'], ['longbreak', 'Descanso largo']] as [Phase, string][]).map(([p, label]) => (
          <button key={p} onClick={() => switchPhase(p)} style={{
            padding: '8px 18px', borderRadius: 999, fontSize: 12, fontFamily: 'var(--font-mono)',
            letterSpacing: '0.06em', border: 'none', cursor: 'pointer',
            background: phase === p ? color : 'transparent',
            color: phase === p ? 'var(--ink)' : 'var(--paper-mute)',
            fontWeight: phase === p ? 600 : 400, transition: 'all 0.2s',
          }}>{label}</button>
        ))}
      </div>

      {/* Circle timer */}
      <div style={{ position: 'relative', width: 200, height: 200 }}>
        <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="100" cy="100" r="80" fill="none" stroke="var(--ink-3)" strokeWidth="8" />
          <circle cx="100" cy="100" r="80" fill="none" stroke={color} strokeWidth="8"
            strokeDasharray={circumference} strokeDashoffset={dash}
            style={{ transition: 'stroke-dashoffset 0.5s, stroke 0.3s' }} strokeLinecap="round" />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 42, fontWeight: 600, color: 'var(--paper)', letterSpacing: '-0.02em' }}>{formatTime(timeLeft)}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {{ work: 'Trabajando', break: 'Descansando', longbreak: 'Descansando' }[phase]}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button onClick={() => reset()} style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--line)', background: 'var(--ink-3)', color: 'var(--paper-mute)', cursor: 'pointer', fontSize: 16, transition: 'all 0.2s' }}>
          ↺
        </button>
        <button
          onClick={() => { setRunning(r => !r); requestNotif(); }}
          style={{
            width: 64, height: 64, borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: color, color: 'var(--ink)', fontSize: 24, fontWeight: 700,
            transition: 'all 0.2s', boxShadow: `0 0 20px ${color}44`,
          }}
        >
          {running ? '⏸' : '▶'}
        </button>
        <button onClick={() => setShowSettings(s => !s)} style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--line)', background: 'var(--ink-3)', color: 'var(--paper-mute)', cursor: 'pointer', fontSize: 16, transition: 'all 0.2s' }}>
          ⚙
        </button>
      </div>

      {/* Sessions */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: i < (sessions % 4) ? 'var(--lime)' : 'var(--ink-3)', border: '1px solid var(--line)', transition: 'background 0.3s' }} />
        ))}
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper-mute)', marginLeft: 8 }}>
          {sessions} sesión{sessions !== 1 ? 'es' : ''} completada{sessions !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Settings */}
      {showSettings && (
        <div style={{ width: '100%', maxWidth: 360, padding: '20px 24px', background: 'var(--ink-3)', borderRadius: 16, border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--paper-mute)' }}>Ajustar tiempos (min)</span>
          {([['work', 'Trabajo', 1, 90], ['break', 'Descanso', 1, 30], ['longbreak', 'Descanso largo', 1, 60]] as [Phase, string, number, number][]).map(([p, label, min, max]) => (
            <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--paper-mute)', minWidth: 100 }}>{label}</span>
              <input type="range" min={min} max={max} value={minutes[p]} onChange={e => {
                const v = Number(e.target.value);
                const next = { ...minutes, [p]: v };
                setMinutes(next);
                if (p === phase) setTimeLeft(v * 60);
              }} style={{ flex: 1, accentColor: phaseColors[p] }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: phaseColors[p], minWidth: 28, textAlign: 'right' }}>{minutes[p]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
