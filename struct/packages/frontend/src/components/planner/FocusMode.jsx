import { useState } from 'react';

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
  container: {
    background: THEME.bg,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
};

export default function FocusMode({ onExit, plannerData }) {
  const [currentTask, setCurrentTask] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  const tasks = [
    'Algorithms - Sorting',
    'Dynamic Programming Basics',
    'Operating Systems - Deadlocks',
    'Process Synchronization',
  ];

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div style={S.container}>
      {/* Minimal UI */}
      <div style={{ textAlign: 'center', maxWidth: 500 }}>
        {/* Timer */}
        <div style={{
          fontSize: 120,
          fontWeight: 900,
          color: THEME.primary,
          fontFamily: 'monospace',
          marginBottom: 32,
          letterSpacing: 4,
        }}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        {/* Current Task */}
        <div style={{
          fontSize: 32,
          fontWeight: 700,
          color: THEME.text,
          marginBottom: 8,
        }}>
          {tasks[currentTask]}
        </div>

        <div style={{
          fontSize: 14,
          color: THEME.textMuted,
          marginBottom: 32,
        }}>
          Task {currentTask + 1} of {tasks.length}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 32 }}>
          <button
            onClick={() => setIsRunning(!isRunning)}
            style={{
              padding: '16px 32px',
              fontSize: 16,
              fontWeight: 600,
              background: isRunning ? THEME.danger : THEME.success,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            {isRunning ? '⏸ Pause' : '▶ Start'}
          </button>
          <button
            onClick={() => {
              if (currentTask < tasks.length - 1) {
                setCurrentTask(currentTask + 1);
                setTimeLeft(25 * 60);
              }
            }}
            style={{
              padding: '16px 32px',
              fontSize: 16,
              fontWeight: 600,
              background: THEME.primary,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            → Next Task
          </button>
        </div>

        {/* Exit */}
        <button
          onClick={onExit}
          style={{
            padding: '12px 24px',
            fontSize: 14,
            fontWeight: 600,
            background: 'transparent',
            color: THEME.textMuted,
            border: `1px solid ${THEME.border}`,
            borderRadius: 8,
            cursor: 'pointer',
          }}
        >
          ✕ Exit Focus Mode
        </button>

        {/* Bottom Info */}
        <div style={{
          marginTop: 64,
          fontSize: 12,
          color: THEME.textMuted,
        }}>
          <p>🎯 Focus Mode Active</p>
          <p style={{ marginTop: 8 }}>Minimize distractions • Stay focused • Achieve goals</p>
        </div>
      </div>
    </div>
  );
}
