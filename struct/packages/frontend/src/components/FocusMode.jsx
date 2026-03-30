import React from 'react';

const FocusMode = ({ currentTask = '', onExit = () => {} }) => {
  const THEME = {
    bg: '#0F172A',
    surface: '#1E293B',
    text: '#E2E8F0',
    primary: '#3B82F6',
    success: '#10B981',
  };

  const S = {
    container: { 
      background: `linear-gradient(135deg, ${THEME.bg} 0%, #1a2d4d 100%)`,
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'system-ui'
    },
    card: { 
      background: THEME.surface, 
      padding: '60px 40px', 
      borderRadius: '20px', 
      textAlign: 'center',
      border: `1px solid #334155`,
      maxWidth: '500px',
      width: '100%'
    },
    title: { fontSize: '48px', fontWeight: 'bold', color: THEME.text, margin: '0 0 20px 0' },
    task: { fontSize: '24px', color: THEME.primary, marginBottom: '40px', fontWeight: '600' },
    timer: { fontSize: '72px', fontWeight: 'bold', color: THEME.success, margin: '30px 0', fontFamily: 'monospace' },
    buttons: { display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '40px' },
    button: { padding: '15px 30px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: '600', transition: 'all 0.2s' },
    primaryBtn: { background: THEME.primary, color: 'white' },
    exitBtn: { background: 'rgba(255,255,255,0.1)', color: THEME.text },
  };

  return (
    <div style={S.container}>
      <div style={S.card}>
        <div style={S.title}>🎯 Focus Mode</div>
        <div style={S.task}>{currentTask || 'DSA - Arrays Practice'}</div>
        <div style={S.timer}>25:00</div>
        <p style={{ color: '#94A3B8', fontSize: '14px', margin: '20px 0' }}>
          No distractions. Pure focus on learning.
        </p>
        <div style={S.buttons}>
          <button style={{ ...S.button, ...S.primaryBtn }}>▶️ Start</button>
          <button onClick={onExit} style={{ ...S.button, ...S.exitBtn }}>✕ Exit Focus</button>
        </div>
      </div>
    </div>
  );
};

export default FocusMode;
