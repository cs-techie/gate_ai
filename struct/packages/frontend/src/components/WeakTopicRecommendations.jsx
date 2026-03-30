import React from 'react';

const WeakTopicRecommendations = ({ weakTopics = [] }) => {
  const THEME = {
    bg: '#0F172A',
    surface: '#1E293B',
    text: '#E2E8F0',
    textMuted: '#94A3B8',
    danger: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981',
  };

  const S = {
    container: { padding: '20px' },
    card: { background: THEME.surface, padding: '20px', borderRadius: '12px', border: `1px solid ${THEME.danger}`, marginBottom: '15px' },
    title: { fontSize: '16px', fontWeight: 'bold', color: THEME.text, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' },
    suggestion: { background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: '8px', marginBottom: '10px', borderLeft: `3px solid ${THEME.danger}` },
    suggestionText: { color: THEME.text, fontSize: '14px', fontWeight: '600' },
    action: { color: THEME.warning, fontSize: '13px', marginTop: '5px' },
  };

  const mockWeakTopics = [
    { topic: 'Deadlocks', confidence: 2, suggestion: 'Practice 20 MCQs on Deadlocks' },
    { topic: 'Transactions', confidence: 1, suggestion: 'Watch theory video + solve examples' },
    { topic: 'Normalization', confidence: 2, suggestion: 'Revise and practice normalization' },
  ];

  const topicsToShow = weakTopics.length > 0 ? weakTopics : mockWeakTopics;

  return (
    <div style={S.container}>
      <div style={S.title}>⚠️ Weak Topics - Action Required</div>
      {topicsToShow.map((item, idx) => (
        <div key={idx} style={S.suggestion}>
          <div style={S.suggestionText}>📌 {item.topic}</div>
          <div style={S.action}>💡 {item.suggestion}</div>
          <div style={{ ...S.action, marginTop: '8px' }}>Priority: High ⬆️</div>
        </div>
      ))}
    </div>
  );
};

export default WeakTopicRecommendations;
