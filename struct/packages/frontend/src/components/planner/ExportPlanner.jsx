const THEME = {
  primary: '#3B82F6',
  text: '#E2E8F0',
  textMuted: '#94A3B8',
};

export default function ExportPlanner({ plannerData }) {
  const exportToPDF = () => {
    // Simple PDF export using browser print
    const content = `
GATE AI STUDY PLANNER
=====================

EXAM: ${plannerData.stream}
TARGET RANK: ${plannerData.targetRank}
EXAM DATE: June 15, 2026

PROGRESS SUMMARY
================
Syllabus Completion: ${plannerData.syllabusCompletion}%
Current Mock Score: ${plannerData.mockScore}/100
Accuracy: ${plannerData.accuracy}%

TOPICS & CONFIDENCE
===================
${Object.entries(plannerData.topics)
  .map(([topic, data]) => `${topic}: ${data.confidence}/5 (${data.completed}% complete)`)
  .join('\n')}

STUDY SCHEDULE
==============
Monday: Algorithms, Dynamic Programming (5 hours)
Tuesday: Operating Systems, Deadlocks (5 hours)
Wednesday: Networks, TCP/IP (5 hours)
Thursday: Database, Normalization (4 hours)
Friday: Revision, Problem Solving (6 hours)
Saturday: Mock Test (4 hours)
Sunday: Weekly Review (3 hours)

GOALS
=====
Weekly Target: ${plannerData.hoursPerDay * 7} hours
Monthly Target: ${plannerData.monthlyGoal || 150} hours
Daily Target: ${plannerData.hoursPerDay} hours

Generated: ${new Date().toLocaleDateString()}
    `;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `study-plan-${new Date().getTime()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <button
      onClick={exportToPDF}
      style={{
        padding: '10px 20px',
        background: THEME.primary,
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: 14,
        transition: '0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '0.9';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1';
      }}
    >
      📥 Export Plan
    </button>
  );
}
