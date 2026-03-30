import React, { useState } from 'react';

const PomodoroTimer = () => {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const THEME = {
    bg: '#0F172A',
    surface: '#1E293B',
    text: '#E2E8F0',
    primary: '#3B82F6',
    success: '#10B981',
    danger: '#EF4444',
  };

  const S = {
    container: { padding: '20px', textAlign: 'center' },
    card: { background: THEME.surface, padding: '30px', borderRadius: '12px', border: `1px solid #334155` },
    timer: { fontSize: '64px', fontWeight: 'bold', color: THEME.primary, margin: '20px 0', fontFamily: 'monospace' },
    buttons: { display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' },
    button: { padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '14px', transition: 'all 0.2s' },
    primaryBtn: { background: THEME.primary, color: 'white' },
    successBtn: { background: THEME.success, color: 'white' },
    dangerBtn: { background: THEME.danger, color: 'white' },
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  React.useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(t => t - 1);
      }, 1000);
    } else if (time === 0 && isRunning) {
      setIsRunning(false);
      setSessionsCompleted(s => s + 1);
      setTime(25 * 60);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  return (
    <div style={S.container}>
      <h3 style={{ color: THEME.text, marginBottom: '20px' }}>🍅 Pomodoro Timer</h3>
      <div style={S.card}>
        <div style={S.timer}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <div style={{ color: THEME.text, marginBottom: '20px' }}>Sessions Completed: <strong>{sessionsCompleted}</strong></div>
        <div style={S.buttons}>
          <button style={{ ...S.button, ...S.primaryBtn }} onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? '⏸️ Pause' : '▶️ Start'}
          </button>
          <button style={{ ...S.button, ...S.successBtn }} onClick={() => { setTime(25 * 60); setIsRunning(false); }}>
            🔄 Reset
          </button>
          <button style={{ ...S.button, ...S.dangerBtn }} onClick={() => { setTime(5 * 60); setIsRunning(false); }}>
            ☕ Break
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
