import { useState, useEffect } from 'react';

const THEME = {
  bg: '#0F172A',
  surface: '#1E293B',
  border: '#334155',
  text: '#E2E8F0',
  textMuted: '#94A3B8',
  primary: '#3B82F6',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
};

const S = {
  card: {
    background: THEME.surface,
    borderRadius: 16,
    border: `1px solid ${THEME.border}`,
    padding: 28,
    marginBottom: 24,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    color: THEME.text,
    margin: '0 0 24px 0',
  },
  timerDisplay: {
    fontSize: 64,
    fontWeight: 900,
    color: THEME.primary,
    fontFamily: 'monospace',
    margin: '24px 0',
  },
  mode: {
    fontSize: 14,
    color: THEME.textMuted,
    fontWeight: 600,
    marginBottom: 16,
  },
  button: {
    padding: '12px 24px',
    margin: '8px',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 14,
    transition: '0.3s ease',
  },
  stats: {
    marginTop: 24,
    padding: 16,
    background: `${THEME.primary}11`,
    border: `1px solid ${THEME.primary}33`,
    borderRadius: 8,
    textAlign: 'left',
  },
};

export default function PomodoroTimer({ onSessionComplete }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work'); // 'work' or 'break'
  const [sessionsCompleted, setSessionsCompleted] = useState(3);
  const [todayHours, setTodayHours] = useState(2.5);

  const workDuration = 25 * 60;
  const breakDuration = 5 * 60;

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Session complete
          if (mode === 'work') {
            setMode('break');
            return breakDuration;
          } else {
            setMode('work');
            setSessionsCompleted(prev => prev + 1);
            setTodayHours(prev => prev + 25 / 60);
            onSessionComplete?.();
            return workDuration;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, mode]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const toggleTimer = () => setIsRunning(!isRunning);
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'work' ? workDuration : breakDuration);
  };
  const switchMode = () => {
    setIsRunning(false);
    setMode(mode === 'work' ? 'break' : 'work');
    setTimeLeft(mode === 'work' ? breakDuration : workDuration);
  };

  return (
    <div style={S.card}>
      <h2 style={S.title}>⏱️ Pomodoro Timer</h2>

      <div style={S.mode}>
        {mode === 'work' ? '🎯 Focus Time' : '☕ Break Time'}
      </div>

      <div style={S.timerDisplay}>{display}</div>

      <div style={{ marginBottom: 16 }}>
        <button
          onClick={toggleTimer}
          style={{
            ...S.button,
            background: isRunning ? THEME.danger : THEME.success,
            color: '#fff',
          }}
        >
          {isRunning ? '⏸ Pause' : '▶ Start'}
        </button>
        <button
          onClick={reset}
          style={{
            ...S.button,
            background: THEME.primary,
            color: '#fff',
          }}
        >
          ↻ Reset
        </button>
        <button
          onClick={switchMode}
          style={{
            ...S.button,
            background: THEME.warning,
            color: '#fff',
          }}
        >
          🔄 Switch
        </button>
      </div>

      {/* Stats */}
      <div style={S.stats}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <p style={{ fontSize: 11, color: THEME.textMuted, margin: 0 }}>Sessions Today</p>
            <p style={{ fontSize: 20, fontWeight: 900, color: THEME.primary, margin: '4px 0 0 0' }}>
              {sessionsCompleted}
            </p>
          </div>
          <div>
            <p style={{ fontSize: 11, color: THEME.textMuted, margin: 0 }}>Hours Studied</p>
            <p style={{ fontSize: 20, fontWeight: 900, color: THEME.success, margin: '4px 0 0 0' }}>
              {todayHours.toFixed(1)}h
            </p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div style={{
        marginTop: 16,
        padding: 12,
        background: `${THEME.warning}11`,
        border: `1px solid ${THEME.warning}33`,
        borderRadius: 8,
        fontSize: 11,
        color: THEME.textMuted,
      }}>
        💡 Focus on one topic per session for best results
      </div>
    </div>
  );
}
