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
  topicCard: {
    background: `${THEME.danger}22`,
    border: `2px solid ${THEME.danger}`,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  topicHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  topicName: {
    fontSize: 16,
    fontWeight: 700,
    color: THEME.text,
  },
  confidenceBar: {
    height: 6,
    background: `${THEME.danger}33`,
    borderRadius: 3,
    marginBottom: 12,
    overflow: 'hidden',
  },
  suggestions: {
    marginTop: 16,
    paddingTop: 16,
    borderTop: `1px solid ${THEME.border}`,
  },
  suggestion: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 0',
    fontSize: 13,
    color: THEME.textMuted,
  },
  actionButton: {
    padding: '8px 16px',
    background: THEME.danger,
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: 600,
    transition: '0.3s ease',
  },
};

export default function WeakTopicRecommendations({ weakTopics, plannerData }) {
  const getSuggestions = (topic, confidence, errors) => {
    const suggestions = [];
    if (confidence <= 1) {
      suggestions.push('📚 Review basic concepts (start with 30-min session)');
      suggestions.push('📝 Solve 20 foundational problems');
    }
    if (errors >= 5) {
      suggestions.push(`🎯 Practice ${errors * 4} questions on this topic`);
      suggestions.push('🤔 Identify misconceptions and gaps');
    }
    if (confidence === 2) {
      suggestions.push('💪 Practice 15 intermediate problems');
      suggestions.push('📖 Review solved examples');
    }
    if (errors >= 8) {
      suggestions.push('🔥 Priority revision (high error rate)');
      suggestions.push('📊 Track progress daily');
    }
    return suggestions;
  };

  if (weakTopics.length === 0) {
    return (
      <div style={S.card}>
        <h2 style={S.title}>⚠️ Weak Topic Recommendations</h2>
        <div style={{ textAlign: 'center', padding: '40px 20px', color: THEME.success }}>
          <p style={{ fontSize: 16, fontWeight: 600 }}>🎉 Excellent! No weak topics detected</p>
          <p style={{ fontSize: 13, color: THEME.textMuted, marginTop: 8 }}>
            Keep up the consistent effort and maintain your confidence levels.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={S.card}>
      <h2 style={S.title}>⚠️ Weak Topics ({weakTopics.length})</h2>
      <p style={{ color: THEME.textMuted, fontSize: 13, marginBottom: 20 }}>
        These topics need special attention. Follow the personalized recommendations below.
      </p>

      <div>
        {weakTopics.map((topic, idx) => {
          const suggestions = getSuggestions(topic.topic, topic.confidence, topic.errors);
          return (
            <div key={topic.topic} style={S.topicCard}>
              <div style={S.topicHeader}>
                <span style={S.topicName}>{idx + 1}. {topic.topic}</span>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: THEME.textMuted }}>Confidence: {topic.confidence}/5</span>
                  <span style={{ fontSize: 12, color: THEME.danger, fontWeight: 600 }}>{topic.errors} errors</span>
                </div>
              </div>

              {/* Confidence Bar */}
              <div>
                <div style={S.confidenceBar}>
                  <div
                    style={{
                      height: '100%',
                      background: topic.confidence <= 1 ? THEME.danger : THEME.warning,
                      width: `${(topic.confidence / 5) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Suggestions */}
              <div style={S.suggestions}>
                <p style={{ fontSize: 12, fontWeight: 600, color: THEME.text, marginBottom: 8 }}>
                  Recommended Actions:
                </p>
                {suggestions.map((suggestion, sidx) => (
                  <div key={sidx} style={S.suggestion}>
                    {suggestion}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <button style={S.actionButton}>📝 Practice</button>
                <button style={{ ...S.actionButton, background: THEME.primary }}>📚 Study Material</button>
                <button style={{ ...S.actionButton, background: THEME.warning }}>⏰ Schedule</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div style={{
        marginTop: 24,
        padding: 16,
        background: `${THEME.danger}11`,
        border: `1px solid ${THEME.danger}33`,
        borderRadius: 8,
      }}>
        <p style={{ fontSize: 13, color: THEME.text }}>
          <strong>Total Weak Topics:</strong> {weakTopics.length} | 
          <strong style={{ marginLeft: 16 }}>Total Errors:</strong> {weakTopics.reduce((sum, t) => sum + t.errors, 0)} |
          <strong style={{ marginLeft: 16 }}>Avg Confidence:</strong> {(weakTopics.reduce((sum, t) => sum + t.confidence, 0) / weakTopics.length).toFixed(1)}/5
        </p>
      </div>
    </div>
  );
}
