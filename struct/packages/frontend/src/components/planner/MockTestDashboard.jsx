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
  mockCard: {
    background: `linear-gradient(135deg, ${THEME.surface}, ${THEME.border}22)`,
    border: `1px solid ${THEME.border}`,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  mockHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreDisplay: {
    fontSize: 28,
    fontWeight: 900,
    color: THEME.primary,
    textAlign: 'center',
  },
};

export default function MockTestDashboard({ plannerData }) {
  const mocks = plannerData.mockTests;
  const avgScore = Math.round(mocks.reduce((sum, m) => sum + m.score, 0) / mocks.length);
  const avgAccuracy = Math.round(mocks.reduce((sum, m) => sum + m.accuracy, 0) / mocks.length);
  const scoreImprovement = mocks[0].score - mocks[mocks.length - 1].score;

  const getScoreColor = (score) => {
    if (score >= 75) return THEME.success;
    if (score >= 60) return THEME.warning;
    return THEME.danger;
  };

  return (
    <div style={S.card}>
      <h2 style={S.title}>🧪 Mock Test Dashboard</h2>

      {/* Summary Metrics */}
      <div style={S.metricsGrid}>
        <div style={S.metricBox}>
          <div style={S.metricLabel}>Average Score</div>
          <div style={{ ...S.metricValue, color: getScoreColor(avgScore) }}>{avgScore}</div>
          <div style={{ fontSize: 11, color: THEME.textMuted }}>out of 100</div>
        </div>
        <div style={S.metricBox}>
          <div style={S.metricLabel}>Avg Accuracy</div>
          <div style={S.metricValue}>{avgAccuracy}%</div>
          <div style={{ fontSize: 11, color: THEME.success }}>↑ +2% trend</div>
        </div>
        <div style={S.metricBox}>
          <div style={S.metricLabel}>Total Mocks</div>
          <div style={S.metricValue}>{mocks.length}</div>
          <div style={{ fontSize: 11, color: THEME.textMuted }}>completed</div>
        </div>
        <div style={S.metricBox}>
          <div style={S.metricLabel}>Score Trend</div>
          <div style={{
            ...S.metricValue,
            color: scoreImprovement >= 0 ? THEME.success : THEME.danger,
          }}>
            {scoreImprovement >= 0 ? '↑' : '↓'} {Math.abs(scoreImprovement)}
          </div>
          <div style={{ fontSize: 11, color: THEME.textMuted }}>from first mock</div>
        </div>
      </div>

      {/* Score Trend Chart (Simple) */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: THEME.text, marginBottom: 16 }}>
          Score Trend
        </h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', height: 150, gap: 4, justifyContent: 'space-around' }}>
          {mocks.map((mock, idx) => (
            <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: '100%',
                  height: `${(mock.score / 100) * 120}px`,
                  background: `linear-gradient(180deg, ${getScoreColor(mock.score)}, ${getScoreColor(mock.score)}66)`,
                  borderRadius: '8px 8px 0 0',
                  marginBottom: 8,
                }}
                title={`Mock ${idx + 1}: ${mock.score}`}
              />
              <div style={{ fontSize: 11, color: THEME.textMuted }}>{mock.score}</div>
              <div style={{ fontSize: 10, color: THEME.textMuted, marginTop: 2 }}>{mock.date.split('-')[2]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mock History */}
      <div>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: THEME.text, marginBottom: 16 }}>
          📋 Mock History
        </h3>
        {mocks.map((mock, idx) => (
          <div key={idx} style={S.mockCard}>
            <div style={S.mockHeader}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: THEME.text }}>
                  Mock Test #{idx + 1}
                </div>
                <div style={{ fontSize: 12, color: THEME.textMuted, marginTop: 4 }}>
                  {mock.date} • {mock.time} minutes
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ ...S.scoreDisplay, color: getScoreColor(mock.score) }}>
                  {mock.score}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              <div style={{
                background: `${THEME.primary}22`,
                border: `1px solid ${THEME.primary}33`,
                borderRadius: 8,
                padding: 12,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 11, color: THEME.textMuted }}>Accuracy</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: THEME.primary, marginTop: 4 }}>
                  {mock.accuracy}%
                </div>
              </div>
              <div style={{
                background: `${THEME.success}22`,
                border: `1px solid ${THEME.success}33`,
                borderRadius: 8,
                padding: 12,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 11, color: THEME.textMuted }}>Time Spent</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: THEME.success, marginTop: 4 }}>
                  {mock.time} min
                </div>
              </div>
              <div style={{
                background: `${THEME.warning}22`,
                border: `1px solid ${THEME.warning}33`,
                borderRadius: 8,
                padding: 12,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 11, color: THEME.textMuted }}>Performance</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: THEME.warning, marginTop: 4 }}>
                  {mock.score >= 75 ? 'Good' : mock.score >= 60 ? 'Fair' : 'Needs Work'}
                </div>
              </div>
            </div>

            <button style={{
              marginTop: 12,
              width: '100%',
              padding: '8px 16px',
              background: THEME.primary,
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
            }}>
              View Analysis
            </button>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div style={{
        marginTop: 24,
        padding: 16,
        background: `${THEME.warning}11`,
        border: `1px solid ${THEME.warning}33`,
        borderRadius: 8,
      }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: THEME.text, marginBottom: 8 }}>
          💡 Recommendations:
        </p>
        <ul style={{ fontSize: 12, color: THEME.textMuted, paddingLeft: 20, margin: 0 }}>
          <li>Improve time management (currently averaging {mocks[0].time} min)</li>
          <li>Focus on weak areas showing {Math.min(...mocks.map(m => m.accuracy))}% min accuracy</li>
          <li>Schedule next mock on {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}</li>
        </ul>
      </div>
    </div>
  );
}
