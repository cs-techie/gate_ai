import React from 'react';

const SmartRecommendations = ({ recommendations = [] }) => {
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
    recSection: { marginBottom: '20px' },
    title: { color: THEME.text, fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' },
    recCard: { background: THEME.surface, padding: '15px', borderRadius: '10px', border: `1px solid #334155`, marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    recText: { color: THEME.text, fontWeight: '600', fontSize: '14px' },
    badge: { padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' },
  };

  const mockRecs = [
    { category: '📚 Study Today', items: ['Deadlocks - Theory', 'Transactions - Examples'] },
    { category: '🔄 Revise Topics', items: ['SQL Joins', 'Normalization', 'ER Model'] },
    { category: '📝 Mock Practice', items: ['Full Mock Test (4h)', 'Subject Mock - OS'] },
  ];

  const recs = recommendations.length > 0 ? recommendations : mockRecs;

  return (
    <div style={S.container}>
      <h3 style={{ color: THEME.text, marginBottom: '20px' }}>🎯 AI Recommendations</h3>
      {recs.map((rec, idx) => (
        <div key={idx} style={S.recSection}>
          <div style={S.title}>{rec.category}</div>
          {rec.items.map((item, i) => (
            <div key={i} style={S.recCard}>
              <span style={S.recText}>✓ {item}</span>
              <button style={{ ...S.badge, background: THEME.primary, color: 'white' }}>
                Start
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SmartRecommendations;
