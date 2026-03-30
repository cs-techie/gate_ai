import React from 'react';

const AnalyticsDashboard = ({ studyData = {} }) => {
  const THEME = {
    bg: '#0F172A',
    surface: '#1E293B',
    text: '#E2E8F0',
    textMuted: '#94A3B8',
    primary: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
  };

  const S = {
    container: { padding: '20px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' },
    card: { background: THEME.surface, padding: '20px', borderRadius: '12px', border: `1px solid #334155` },
    title: { fontSize: '14px', color: THEME.textMuted, marginBottom: '10px' },
    value: { fontSize: '32px', fontWeight: 'bold', color: THEME.primary },
    bar: { height: '8px', background: '#334155', borderRadius: '4px', marginTop: '10px', overflow: 'hidden' },
    barFill: { height: '100%', background: THEME.success, transition: 'width 0.3s' },
    heatmap: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginTop: '15px' },
    heatmapCell: { 
      padding: '12px', 
      borderRadius: '8px', 
      textAlign: 'center', 
      fontSize: '12px', 
      cursor: 'pointer',
      transition: 'transform 0.2s'
    },
  };

  const weeklyHours = [5, 6, 4, 7, 8, 5, 6];
  const subjectProgress = { 'DSA': 75, 'OS': 60, 'DB': 85, 'Networks': 50 };
  const accuracy = 72;
  const streak = 12;

  return (
    <div style={S.container}>
      <div style={S.grid}>
        <div style={S.card}>
          <div style={S.title}>📊 Daily Study Hours</div>
          <div style={S.value}>{weeklyHours.reduce((a, b) => a + b, 0)}h</div>
          <div style={S.heatmap}>
            {weeklyHours.map((hours, i) => (
              <div key={i} style={{ ...S.heatmapCell, background: `rgba(59, 130, 246, ${hours / 8})` }}>
                {hours}h
              </div>
            ))}
          </div>
        </div>

        <div style={S.card}>
          <div style={S.title}>🎯 Overall Accuracy</div>
          <div style={S.value}>{accuracy}%</div>
          <div style={S.bar}><div style={{ ...S.barFill, width: `${accuracy}%` }}></div></div>
        </div>

        <div style={S.card}>
          <div style={S.title}>🔥 Streak Days</div>
          <div style={S.value}>{streak}</div>
          <div style={{ color: THEME.success, fontSize: '12px', marginTop: '10px' }}>Keep it up! 💪</div>
        </div>
      </div>

      <div style={S.card}>
        <div style={S.title}>📈 Subject Progress</div>
        {Object.entries(subjectProgress).map(([subject, progress]) => (
          <div key={subject} style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ color: THEME.text, fontSize: '14px' }}>{subject}</span>
              <span style={{ color: THEME.primary, fontWeight: 'bold' }}>{progress}%</span>
            </div>
            <div style={S.bar}>
              <div style={{ ...S.barFill, width: `${progress}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
