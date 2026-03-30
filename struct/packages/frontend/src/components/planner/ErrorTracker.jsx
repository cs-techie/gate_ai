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
  errorCard: {
    background: `${THEME.danger}22`,
    border: `1px solid ${THEME.danger}33`,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  chart: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 12,
    marginBottom: 24,
  },
  typeBox: {
    background: THEME.surface,
    border: `1px solid ${THEME.border}`,
    borderRadius: 8,
    padding: 16,
    textAlign: 'center',
  },
};

export default function ErrorTracker({ errors }) {
  // Group errors by category
  const errorsByType = {
    conceptual: errors.filter(e => e.type === 'conceptual').reduce((sum, e) => sum + e.frequency, 0),
    computational: errors.filter(e => e.type === 'computational').reduce((sum, e) => sum + e.frequency, 0),
    practical: errors.filter(e => e.type === 'practical').reduce((sum, e) => sum + e.frequency, 0),
  };

  const totalErrors = Object.values(errorsByType).reduce((a, b) => a + b, 0);

  const getTypeEmoji = (type) => {
    switch (type) {
      case 'conceptual':
        return '💭';
      case 'computational':
        return '🧮';
      case 'practical':
        return '🔧';
      default:
        return '❓';
    }
  };

  return (
    <div style={S.card}>
      <h2 style={S.title}>📊 Error Analysis & Tracking</h2>

      {/* Error Type Breakdown */}
      <div style={S.chart}>
        {Object.entries(errorsByType).map(([type, count]) => (
          <div key={type} style={S.typeBox}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>
              {getTypeEmoji(type)}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: THEME.text, textTransform: 'capitalize' }}>
              {type}
            </div>
            <div style={{ fontSize: 20, fontWeight: 900, color: THEME.danger, marginTop: 8 }}>
              {count}
            </div>
            <div style={{ fontSize: 11, color: THEME.textMuted, marginTop: 4 }}>
              {Math.round((count / totalErrors) * 100)}% of errors
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Error List */}
      <div>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: THEME.text, marginBottom: 12 }}>
          Top Error-Prone Topics
        </h3>
        {errors
          .sort((a, b) => b.frequency - a.frequency)
          .map((error, idx) => (
            <div key={idx} style={S.errorCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: THEME.text }}>
                    {idx + 1}. {error.topic}
                  </div>
                  <div style={{ fontSize: 12, color: THEME.textMuted, marginTop: 4 }}>
                    {getTypeEmoji(error.type)} {error.type.charAt(0).toUpperCase() + error.type.slice(1)} Error
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: THEME.danger }}>
                    {error.frequency}
                  </div>
                  <div style={{ fontSize: 11, color: THEME.textMuted }}>occurrences</div>
                </div>
              </div>

              {/* Error Progress Bar */}
              <div style={{
                height: 6,
                background: `${THEME.danger}33`,
                borderRadius: 3,
                overflow: 'hidden',
                marginTop: 8,
              }}>
                <div
                  style={{
                    height: '100%',
                    background: THEME.danger,
                    width: `${(error.frequency / Math.max(...errors.map(e => e.frequency))) * 100}%`,
                  }}
                />
              </div>

              {/* Action */}
              <button style={{
                marginTop: 12,
                padding: '6px 12px',
                background: THEME.danger,
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 11,
                fontWeight: 600,
              }}>
                📝 Review & Practice
              </button>
            </div>
          ))}
      </div>

      {/* Recommendations */}
      <div style={{
        marginTop: 24,
        padding: 16,
        background: `${THEME.warning}11`,
        border: `1px solid ${THEME.warning}33`,
        borderRadius: 8,
      }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: THEME.text, marginBottom: 8 }}>
          💡 Smart Recommendations:
        </p>
        <ul style={{ fontSize: 12, color: THEME.textMuted, paddingLeft: 20, margin: 0 }}>
          <li>
            <strong>Most Common:</strong> {errors[0]?.topic} ({errors[0]?.type})
            <span style={{ color: THEME.danger, marginLeft: 8 }}>Priority: High</span>
          </li>
          <li style={{ marginTop: 6 }}>
            Create a focused study plan for {errors.filter(e => e.type === 'conceptual').length} conceptual topics
          </li>
          <li style={{ marginTop: 6 }}>
            Practice {Math.round(errors.reduce((sum, e) => sum + e.frequency, 0) * 2)} problems to overcome mistakes
          </li>
        </ul>
      </div>
    </div>
  );
}
