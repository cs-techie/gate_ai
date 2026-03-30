import React from 'react';

const ExportPlanner = ({ planData = {} }) => {
  const THEME = {
    surface: '#1E293B',
    text: '#E2E8F0',
    primary: '#3B82F6',
    success: '#10B981',
  };

  const S = {
    container: { padding: '20px' },
    card: { background: THEME.surface, padding: '20px', borderRadius: '12px', border: `1px solid #334155` },
    title: { color: THEME.text, fontWeight: 'bold', marginBottom: '15px' },
    buttons: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
    button: {
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '14px',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    primaryBtn: { background: THEME.primary, color: 'white' },
    successBtn: { background: THEME.success, color: 'white' },
  };

  const handleDownloadPDF = () => {
    const content = `
GATE AI Study Planner - Study Plan
====================================

Exam Details:
- Stream: Computer Science
- Target Date: June 2026
- Daily Hours: 4 hours

Weekly Schedule:
Monday: DSA - Arrays (2.5h)
Tuesday: OS - Deadlocks (3h)
Wednesday: Database - SQL (2h)
...

Goals:
- Overall Progress: 68%
- Average Score: 72%
- Target Rank: 50

Weak Topics:
1. Deadlocks - Practice 20 MCQs
2. Transactions - Watch videos
3. Normalization - Solve examples

Generated on: ${new Date().toLocaleDateString()}
    `;
    
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'study-plan.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSharePlan = () => {
    alert('Plan share link copied! 📋\n\nShare with friends: https://gatexpress.com/plan/abc123');
  };

  return (
    <div style={S.container}>
      <div style={S.card}>
        <div style={S.title}>📥 Export & Share</div>
        <div style={S.buttons}>
          <button style={{ ...S.button, ...S.primaryBtn }} onClick={handleDownloadPDF}>
            📥 Download Plan
          </button>
          <button style={{ ...S.button, ...S.successBtn }} onClick={handleSharePlan}>
            🔗 Share Plan
          </button>
          <button style={{ ...S.button, ...S.primaryBtn }}>
            🖨️ Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportPlanner;
