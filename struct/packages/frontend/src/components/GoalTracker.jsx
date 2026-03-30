import React from 'react';

const GoalTracker = ({ goals = {} }) => {
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
    goal: { marginBottom: '20px' },
    goalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
    goalTitle: { color: THEME.text, fontWeight: '600', fontSize: '14px' },
    goalProgress: { color: THEME.primary, fontWeight: 'bold', fontSize: '16px' },
    progressBar: { height: '10px', background: '#334155', borderRadius: '5px', overflow: 'hidden' },
    progressFill: { height: '100%', background: THEME.success, transition: 'width 0.3s' },
    targetRank: { marginTop: '20px', padding: '15px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '10px', textAlign: 'center' },
    targetText: { color: THEME.text, fontSize: '14px', marginBottom: '8px' },
    rankValue: { fontSize: '32px', fontWeight: 'bold', color: THEME.primary },
  };

  const mockGoals = {
    weekly: [
      { name: 'Study 15 hours', progress: 12, target: 15 },
      { name: 'Complete 30 MCQs', progress: 28, target: 30 },
      { name: 'Revise 2 subjects', progress: 1, target: 2 },
    ],
    monthly: [
      { name: 'Syllabus coverage', progress: 65, target: 100 },
      { name: 'Mock tests', progress: 3, target: 4 },
    ],
  };

  return (
    <div style={S.container}>
      <h3 style={{ color: THEME.text, marginBottom: '20px' }}>🏆 Goal Tracker</h3>

      <div style={S.card}>
        <h4 style={{ color: THEME.text, marginBottom: '15px' }}>📅 Weekly Goals</h4>
        {mockGoals.weekly.map((goal, idx) => (
          <div key={idx} style={S.goal}>
            <div style={S.goalHeader}>
              <span style={S.goalTitle}>{goal.name}</span>
              <span style={S.goalProgress}>{goal.progress}/{goal.target}</span>
            </div>
            <div style={S.progressBar}>
              <div style={{ ...S.progressFill, width: `${(goal.progress / goal.target) * 100}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      <div style={S.card}>
        <h4 style={{ color: THEME.text, marginBottom: '15px' }}>📊 Monthly Goals</h4>
        {mockGoals.monthly.map((goal, idx) => (
          <div key={idx} style={S.goal}>
            <div style={S.goalHeader}>
              <span style={S.goalTitle}>{goal.name}</span>
              <span style={S.goalProgress}>{goal.progress}%</span>
            </div>
            <div style={S.progressBar}>
              <div style={{ ...S.progressFill, width: `${goal.progress}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      <div style={S.card}>
        <div style={S.targetRank}>
          <div style={S.targetText}>Target Rank</div>
          <div style={S.rankValue}>🎯 Rank 50</div>
          <div style={{ color: THEME.textMuted, fontSize: '12px', marginTop: '10px' }}>Stay consistent to achieve your goal!</div>
        </div>
      </div>
    </div>
  );
};

export default GoalTracker;
