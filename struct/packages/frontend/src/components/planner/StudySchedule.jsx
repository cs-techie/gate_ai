const THEME = {
  bg: '#0F172A',
  surface: '#1E293B',
  border: '#334155',
  text: '#E2E8F0',
  textMuted: '#94A3B8',
  primary: '#3B82F6',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
};

const S = {
  card: {
    background: THEME.surface,
    borderRadius: 16,
    border: `1px solid ${THEME.border}`,
    padding: 28,
    marginBottom: 24,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    color: THEME.text,
    margin: '0 0 24px 0',
  },
  dayCard: {
    background: `linear-gradient(135deg, ${THEME.surface}, ${THEME.border}22)`,
    border: `1px solid ${THEME.border}`,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    cursor: 'pointer',
    transition: '0.3s ease',
  },
  dayHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayName: {
    fontSize: 14,
    fontWeight: 700,
    color: THEME.text,
  },
  taskItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 0',
    borderBottom: `1px solid ${THEME.border}33`,
    fontSize: 13,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    border: `2px solid ${THEME.border}`,
    cursor: 'pointer',
  },
  weekGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: 12,
    marginBottom: 24,
  },
  weekDayBox: {
    textAlign: 'center',
    padding: 12,
    background: THEME.surface,
    border: `1px solid ${THEME.border}`,
    borderRadius: 8,
    cursor: 'pointer',
    transition: '0.3s ease',
  },
};

const MOCK_SCHEDULE = [
  {
    day: 'Monday',
    date: '2026-03-31',
    topics: ['Algorithms - Sorting', 'Dynamic Programming Basics'],
    hours: 5,
    priority: 'high',
    completed: false,
  },
  {
    day: 'Tuesday',
    date: '2026-04-01',
    topics: ['Operating Systems - Deadlocks', 'Process Synchronization'],
    hours: 5,
    priority: 'high',
    completed: false,
  },
  {
    day: 'Wednesday',
    date: '2026-04-02',
    topics: ['Network Protocols', 'TCP/IP Model'],
    hours: 5,
    priority: 'medium',
    completed: true,
  },
  {
    day: 'Thursday',
    date: '2026-04-03',
    topics: ['Database - Normalization', 'SQL Queries'],
    hours: 4,
    priority: 'medium',
    completed: false,
  },
  {
    day: 'Friday',
    date: '2026-04-04',
    topics: ['Revision - Data Structures', 'Problem Solving'],
    hours: 6,
    priority: 'medium',
    completed: false,
  },
  {
    day: 'Saturday',
    date: '2026-04-05',
    topics: ['Mock Test (Full Syllabus)', 'Performance Analysis'],
    hours: 4,
    priority: 'high',
    completed: false,
  },
  {
    day: 'Sunday',
    date: '2026-04-06',
    topics: ['Weekly Review', 'Weakness Analysis', 'Plan Next Week'],
    hours: 3,
    priority: 'low',
    completed: false,
  },
];

export default function StudySchedule({ plannerData, fullView = false }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return THEME.danger;
      case 'medium':
        return THEME.warning;
      default:
        return THEME.success;
    }
  };

  return (
    <div style={S.card}>
      <h2 style={S.title}>📅 Study Schedule - Weekly Plan</h2>

      {!fullView ? (
        // Compact view
        <div>
          {MOCK_SCHEDULE.slice(0, 3).map((dayPlan, idx) => (
            <div key={idx} style={S.dayCard}>
              <div style={S.dayHeader}>
                <span style={S.dayName}>{dayPlan.day}</span>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: THEME.textMuted }}>⏱ {dayPlan.hours}h</span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: getPriorityColor(dayPlan.priority),
                      textTransform: 'uppercase',
                    }}
                  >
                    {dayPlan.priority}
                  </span>
                </div>
              </div>
              <div>
                {dayPlan.topics.map((topic, tidx) => (
                  <div key={tidx} style={S.taskItem}>
                    <div style={{
                      ...S.checkbox,
                      background: dayPlan.completed ? THEME.success : 'transparent',
                      borderColor: dayPlan.completed ? THEME.success : THEME.border,
                    }} />
                    <span style={{ color: dayPlan.completed ? THEME.textMuted : THEME.text, textDecoration: dayPlan.completed ? 'line-through' : 'none' }}>
                      {topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <button style={{
              padding: '10px 24px',
              background: THEME.primary,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 600,
            }}>
              View Full Schedule →
            </button>
          </div>
        </div>
      ) : (
        // Full view with all days
        <div>
          {MOCK_SCHEDULE.map((dayPlan, idx) => (
            <div key={idx} style={S.dayCard}>
              <div style={S.dayHeader}>
                <div>
                  <span style={S.dayName}>{dayPlan.day}</span>
                  <p style={{ fontSize: 11, color: THEME.textMuted, marginTop: 4 }}>{dayPlan.date}</p>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: THEME.textMuted }}>⏱ {dayPlan.hours}h</span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: getPriorityColor(dayPlan.priority),
                      textTransform: 'uppercase',
                      background: `${getPriorityColor(dayPlan.priority)}22`,
                      padding: '4px 8px',
                      borderRadius: 4,
                    }}
                  >
                    {dayPlan.priority}
                  </span>
                </div>
              </div>
              <div>
                {dayPlan.topics.map((topic, tidx) => (
                  <div key={tidx} style={S.taskItem}>
                    <div style={{
                      ...S.checkbox,
                      background: dayPlan.completed ? THEME.success : 'transparent',
                      borderColor: dayPlan.completed ? THEME.success : THEME.border,
                    }} />
                    <span style={{ color: dayPlan.completed ? THEME.textMuted : THEME.text, textDecoration: dayPlan.completed ? 'line-through' : 'none' }}>
                      {topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Week Summary */}
          <div style={{
            marginTop: 24,
            padding: 16,
            background: `${THEME.primary}11`,
            border: `1px solid ${THEME.primary}33`,
            borderRadius: 8,
          }}>
            <p style={{ fontSize: 13, color: THEME.text }}>
              <strong>Total Hours This Week:</strong> {MOCK_SCHEDULE.reduce((sum, d) => sum + d.hours, 0)}h |
              <strong style={{ marginLeft: 16 }}>Completed:</strong> {MOCK_SCHEDULE.filter(d => d.completed).length}/{MOCK_SCHEDULE.length} days |
              <strong style={{ marginLeft: 16 }}>Progress:</strong> {Math.round((MOCK_SCHEDULE.filter(d => d.completed).length / MOCK_SCHEDULE.length) * 100)}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
