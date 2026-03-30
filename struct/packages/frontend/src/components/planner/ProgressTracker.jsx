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
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 12,
    marginBottom: 24,
  },
  metricBox: {
    background: `linear-gradient(135deg, ${THEME.surface}99, ${THEME.border}33)`,
    border: `1px solid ${THEME.border}`,
    borderRadius: 12,
    padding: 16,
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 900,
    color: THEME.primary,
    margin: '8px 0 4px 0',
  },
  metricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  progressBar: {
    height: 12,
    background: `${THEME.border}`,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
    border: `1px solid ${THEME.border}`,
  },
  topicRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: `1px solid ${THEME.border}33`,
  },
};

export default function ProgressTracker({ plannerData, fullView = false }) {
  const overallCompletion = Math.round(
    Object.values(plannerData.topics).reduce((sum, t) => sum + t.completed, 0) /
    Object.keys(plannerData.topics).length
  );

  const daysUntilExam = 78;
  const daysCompleted = Math.floor((70 - daysUntilExam) / 70 * 100);

  const topicsArray = Object.entries(plannerData.topics)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.completed - a.completed);

  return (
    <div style={S.card}>
      <h2 style={S.title}>📍 Progress Tracker</h2>

      {/* Key Metrics */}
      <div style={S.metricsGrid}>
        <div style={S.metricBox}>
          <div style={S.metricLabel}>Overall Progress</div>
          <div style={S.metricValue}>{overallCompletion}%</div>
          <div style={{ fontSize: 11, color: THEME.success }}>↑ On track</div>
        </div>
        <div style={S.metricBox}>
          <div style={S.metricLabel}>Confidence Avg</div>
          <div style={S.metricValue}>
            {(Object.values(plannerData.topics).reduce((sum, t) => sum + t.confidence, 0) /
              Object.keys(plannerData.topics).length).toFixed(1)}
          </div>
          <div style={{ fontSize: 11, color: THEME.warning }}>/ 5.0</div>
        </div>
        <div style={S.metricBox}>
          <div style={S.metricLabel}>Topics Mastered</div>
          <div style={S.metricValue}>
            {Object.values(plannerData.topics).filter(t => t.completed >= 80).length}
          </div>
          <div style={{ fontSize: 11, color: THEME.success }}>of 10</div>
        </div>
        <div style={S.metricBox}>
          <div style={S.metricLabel}>Days Remaining</div>
          <div style={S.metricValue}>{daysUntilExam}</div>
          <div style={{ fontSize: 11, color: THEME.warning }}>Until Exam</div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: THEME.text }}>Exam Preparation</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: THEME.primary }}>{overallCompletion}%</span>
        </div>
        <div style={S.progressBar}>
          <div
            style={{
              height: '100%',
              background: `linear-gradient(90deg, ${THEME.primary}, ${THEME.success})`,
              width: `${overallCompletion}%`,
              transition: '0.3s ease',
            }}
          />
        </div>
      </div>

      {/* Topic-wise Progress */}
      <div>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: THEME.text, marginBottom: 16 }}>
          📚 Topic-wise Progress
        </h3>
        <div>
          {(fullView ? topicsArray : topicsArray.slice(0, 5)).map((topic) => (
            <div key={topic.name} style={S.topicRow}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: THEME.text, marginBottom: 6 }}>
                  {topic.name}
                </div>
                <div style={S.progressBar}>
                  <div
                    style={{
                      height: '100%',
                      background: topic.completed >= 80
                        ? THEME.success
                        : topic.completed >= 50
                          ? THEME.warning
                          : THEME.danger,
                      width: `${topic.completed}%`,
                      transition: '0.3s ease',
                    }}
                  />
                </div>
              </div>
              <div style={{ marginLeft: 16, textAlign: 'right', minWidth: 80 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: THEME.primary }}>
                  {topic.completed}%
                </div>
                <div style={{ fontSize: 11, color: THEME.textMuted }}>
                  Conf: {topic.confidence}/5
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison */}
      {fullView && (
        <div style={{
          marginTop: 24,
          padding: 16,
          background: `${THEME.success}11`,
          border: `1px solid ${THEME.success}33`,
          borderRadius: 8,
        }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: THEME.text, marginBottom: 8 }}>
            📊 Week-over-Week Improvement
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <div>
              <p style={{ fontSize: 11, color: THEME.textMuted }}>Completion</p>
              <p style={{ fontSize: 14, fontWeight: 700, color: THEME.success }}>↑ +5%</p>
            </div>
            <div>
              <p style={{ fontSize: 11, color: THEME.textMuted }}>Confidence</p>
              <p style={{ fontSize: 14, fontWeight: 700, color: THEME.success }}>↑ +0.3</p>
            </div>
            <div>
              <p style={{ fontSize: 11, color: THEME.textMuted }}>Accuracy</p>
              <p style={{ fontSize: 14, fontWeight: 700, color: THEME.success }}>↑ +3%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
