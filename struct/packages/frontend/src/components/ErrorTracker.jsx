import React from 'react';

const ErrorTracker = ({ errors = [] }) => {
  const THEME = {
    bg: '#0F172A',
    surface: '#1E293B',
    text: '#E2E8F0',
    textMuted: '#94A3B8',
    warning: '#F59E0B',
    danger: '#EF4444',
  };

  const S = {
    container: { padding: '20px' },
    card: { background: THEME.surface, padding: '20px', borderRadius: '12px', border: `1px solid #334155`, marginBottom: '20px' },
    errorItem: { padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', marginBottom: '10px', borderLeft: `3px solid ${THEME.danger}` },
    errorTitle: { color: THEME.text, fontWeight: '600', fontSize: '14px' },
    errorType: { fontSize: '12px', color: THEME.warning, marginTop: '4px' },
  };

  const mockErrors = [
    { topic: 'Deadlocks', type: 'conceptual', count: 4 },
    { topic: 'Transactions', type: 'calculation', count: 3 },
    { topic: 'SQL Joins', type: 'syntax', count: 2 },
  ];

  const errorList = errors.length > 0 ? errors : mockErrors;
  const totalErrors = errorList.reduce((a, b) => a + (b.count || 1), 0);

  return (
    <div style={S.container}>
      <h3 style={{ color: THEME.text, marginBottom: '20px' }}>📍 Error Tracking</h3>
      
      <div style={S.card}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: THEME.danger, marginBottom: '10px' }}>
          {totalErrors} Errors Logged
        </div>
        <p style={{ color: THEME.textMuted, fontSize: '12px', margin: 0 }}>Review and revise weak areas</p>
      </div>

      <div style={S.card}>
        <h4 style={{ color: THEME.text, marginBottom: '12px' }}>Frequent Mistakes</h4>
        {errorList.map((error, idx) => (
          <div key={idx} style={S.errorItem}>
            <div style={S.errorTitle}>❌ {error.topic}</div>
            <div style={S.errorType}>Type: {error.type} | Count: {error.count || 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ErrorTracker;
