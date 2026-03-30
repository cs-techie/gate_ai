import React from 'react';

const ProgressTracker = ({ progress = {} }) => {
  const THEME = {
    bg: '#0F172A',
    surface: '#1E293B',
    text: '#E2E8F0',
    textMuted: '#94A3B8',
    primary: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',
  };

  const S = {
    container: { padding: '20px' },
    card: { background: THEME.surface, padding: '20px', borderRadius: '12px', border: `1px solid #334155`, marginBottom: '20px' },
    row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
    label: { fontSize: '14px', color: THEME.text, fontWeight: '600' },
    value: { fontSize: '24px', fontWeight: 'bold', color: THEME.primary },
    bar: { height: '10px', background: '#334155', borderRadius: '5px', overflow: 'hidden', marginTop: '5px', flex: 1, marginLeft: '10px' },
    barFill: { height: '100%', background: THEME.success, transition: 'width 0.3s' },
    milestone: { padding: '12px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', marginBottom: '10px', borderLeft: `3px solid ${THEME.success}` },
  };

  const overallProgress = 68;
  const topicProgress = { 'DSA': 85, 'OS': 60, 'DB': 75, 'Networks': 55 };
  const confidenceImprovement = 15;
  const milestones = ['✓ Week 1 Complete', '✓ 50% Syllabus', 'Next: 75% Syllabus'];

  return (
    <div style={S.container}>
      <div style={S.card}>
        <div style={S.row}>
          <div style={S.label}>Overall Progress</div>
          <div style={S.value}>{overallProgress}%</div>
        </div>
        <div style={S.bar}>
          <div style={{ ...S.barFill, width: `${overallProgress}%` }}></div>
        </div>
      </div>

      <div style={S.card}>
        <h4 style={{ color: THEME.text, marginBottom: '15px' }}>📚 Topic Progress</h4>
        {Object.entries(topicProgress).map(([topic, prog]) => (
          <div key={topic} style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ color: THEME.text, fontSize: '13px' }}>{topic}</span>
              <span style={{ color: THEME.primary, fontWeight: 'bold', fontSize: '13px' }}>{prog}%</span>
            </div>
            <div style={S.bar}>
              <div style={{ ...S.barFill, width: `${prog}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      <div style={S.card}>
        <div style={S.row}>
          <div style={S.label}>Confidence Improvement</div>
          <div style={{ ...S.value, color: THEME.success }}>+{confidenceImprovement}%</div>
        </div>
        <p style={{ color: THEME.textMuted, fontSize: '12px', margin: 0 }}>vs. last week</p>
      </div>

      <div style={S.card}>
        <h4 style={{ color: THEME.text, marginBottom: '15px' }}>🏆 Milestones</h4>
        {milestones.map((milestone, idx) => (
          <div key={idx} style={S.milestone}>{milestone}</div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
