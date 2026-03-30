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
  revisionCard: {
    background: `linear-gradient(135deg, ${THEME.surface}, ${THEME.border}22)`,
    border: `1px solid ${THEME.border}`,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  dayBadge: {
    display: 'inline-block',
    padding: '4px 12px',
    background: THEME.primary,
    color: '#fff',
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 600,
  },
};

const REVISION_SCHEDULE = [
  {
    day: 0,
    label: 'TODAY',
    color: THEME.danger,
    topics: ['Programming & Data Structures', 'Algorithms'],
  },
  {
    day: 3,
    label: 'DAY 3 (April 3)',
    color: THEME.warning,
    topics: ['Programming & Data Structures', 'Discrete Math'],
  },
  {
    day: 7,
    label: 'DAY 7 (April 7)',
    color: THEME.primary,
    topics: ['All covered topics', 'Weak areas'],
  },
  {
    day: 15,
    label: 'DAY 15 (April 15)',
    color: THEME.success,
    topics: ['Full mock test', 'Performance review'],
  },
  {
    day: 30,
    label: 'DAY 30 (April 30)',
    color: THEME.primary,
    topics: ['Final comprehensive revision', 'Confidence building'],
  },
];

export default function RevisionSystem({ plannerData }) {
  const weakTopics = Object.entries(plannerData.topics)
    .filter(([_, data]) => data.confidence <= 2)
    .map(([name]) => name);

  return (
    <div style={S.card}>
      <h2 style={S.title}>🔄 Revision System</h2>
      <p style={{ color: THEME.textMuted, fontSize: 13, marginBottom: 20 }}>
        Scientifically-spaced revision schedule to maximize retention. Weak topics appear more frequently.
      </p>

      <div>
        {REVISION_SCHEDULE.map((schedule, idx) => (
          <div key={idx} style={S.revisionCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{
                ...S.dayBadge,
                background: schedule.color,
              }}>
                {schedule.label}
              </span>
              <span style={{ fontSize: 12, color: THEME.textMuted }}>
                {schedule.day === 0 ? '🔥 High Priority' : schedule.day === 3 ? '⚠️ Important' : '📅 Regular'}
              </span>
            </div>

            <div style={{ marginTop: 12 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: THEME.text, marginBottom: 8 }}>
                Topics to Revise:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {schedule.topics.map((topic, tidx) => {
                  const isWeak = weakTopics.includes(topic);
                  return (
                    <span
                      key={tidx}
                      style={{
                        padding: '4px 12px',
                        background: isWeak ? `${THEME.danger}22` : `${THEME.success}22`,
                        border: `1px solid ${isWeak ? THEME.danger : THEME.success}33`,
                        borderRadius: 6,
                        fontSize: 11,
                        color: THEME.text,
                        fontWeight: 500,
                      }}
                    >
                      {isWeak ? '⚠️' : '✓'} {topic}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Time allocation */}
            <div style={{
              marginTop: 12,
              paddingTop: 12,
              borderTop: `1px solid ${THEME.border}33`,
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 12,
            }}>
              <span style={{ color: THEME.textMuted }}>
                ⏱ Time: {schedule.day === 0 ? '2-3 hours' : schedule.day === 3 ? '2 hours' : '3-4 hours'}
              </span>
              <button style={{
                padding: '4px 12px',
                background: schedule.color,
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 11,
                fontWeight: 600,
              }}>
                Start Revision
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div style={{
        marginTop: 24,
        padding: 16,
        background: `${THEME.primary}11`,
        border: `1px solid ${THEME.primary}33`,
        borderRadius: 8,
      }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: THEME.text, marginBottom: 8 }}>
          📊 Revision Strategy:
        </p>
        <ul style={{ fontSize: 12, color: THEME.textMuted, paddingLeft: 20, margin: 0 }}>
          <li>Day 0: Same-day revision (memory consolidation)</li>
          <li>Day 3: First recall (spacing effect)</li>
          <li>Day 7: Weekly comprehensive review</li>
          <li>Day 15: Deep understanding check</li>
          <li>Day 30: Final confidence boost before exam</li>
          <li style={{ color: THEME.danger, fontWeight: 600 }}>⚠️ Weak topics (conf ≤ 2) appear in ALL revisions</li>
        </ul>
      </div>
    </div>
  );
}
