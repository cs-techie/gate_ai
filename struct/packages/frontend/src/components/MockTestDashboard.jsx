import React from 'react';

const MockTestDashboard = ({ mockTests = [] }) => {
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
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' },
    stat: { background: THEME.surface, padding: '15px', borderRadius: '10px', textAlign: 'center', border: `1px solid #334155` },
    statLabel: { fontSize: '12px', color: THEME.textMuted, marginBottom: '8px' },
    statValue: { fontSize: '28px', fontWeight: 'bold', color: THEME.primary },
    mockList: { marginTop: '20px' },
    mockItem: { background: THEME.surface, padding: '15px', borderRadius: '10px', border: `1px solid #334155`, marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    mockTitle: { color: THEME.text, fontWeight: '600', fontSize: '14px' },
    mockScore: { color: THEME.success, fontWeight: 'bold', fontSize: '16px' },
  };

  const mockData = [
    { name: 'Mock Test 1', score: '72%', time: '180 min' },
    { name: 'Mock Test 2', score: '75%', time: '180 min' },
    { name: 'Mock Test 3', score: '68%', time: '180 min' },
  ];

  const tests = mockTests.length > 0 ? mockTests : mockData;
  const avgScore = Math.round(tests.reduce((a, b) => a + parseInt(b.score), 0) / tests.length);

  return (
    <div style={S.container}>
      <h3 style={{ color: THEME.text, marginBottom: '20px' }}>📝 Mock Test Management</h3>
      
      <div style={S.grid}>
        <div style={S.stat}>
          <div style={S.statLabel}>Total Mocks</div>
          <div style={S.statValue}>{tests.length}</div>
        </div>
        <div style={S.stat}>
          <div style={S.statLabel}>Average Score</div>
          <div style={S.statValue}>{avgScore}%</div>
        </div>
        <div style={S.stat}>
          <div style={S.statLabel}>Best Score</div>
          <div style={S.statValue}>75%</div>
        </div>
      </div>

      <div style={S.mockList}>
        <h4 style={{ color: THEME.text, marginBottom: '12px' }}>Recent Tests</h4>
        {tests.map((test, idx) => (
          <div key={idx} style={S.mockItem}>
            <div>
              <div style={S.mockTitle}>{test.name}</div>
              <div style={{ fontSize: '12px', color: THEME.textMuted, marginTop: '4px' }}>⏱️ {test.time}</div>
            </div>
            <div style={S.mockScore}>{test.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MockTestDashboard;
