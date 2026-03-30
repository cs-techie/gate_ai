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
  recommendation: {
    background: `linear-gradient(135deg, ${THEME.surface}, ${THEME.border}22)`,
    border: `1px solid ${THEME.border}`,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    cursor: 'pointer',
    transition: '0.3s ease',
  },
};

export default function SmartRecommendations({ weakTopics, mockScore }) {
  const recommendations = [
    {
      emoji: '⚠️',
      title: 'Focus on Weak Topics',
      description: `${weakTopics.length} topics need attention`,
      color: THEME.danger,
      action: 'Start Revision',
      detail: weakTopics.slice(0, 2).map(t => t.topic).join(', '),
    },
    {
      emoji: '🎯',
      title: 'Mock Test Recommended',
      description: mockScore > 75 ? 'You\'re ready for a challenging mock' : 'Take a mock to assess progress',
      color: THEME.primary,
      action: 'Start Mock',
    },
    {
      emoji: '📚',
      title: 'Review Study Material',
      description: 'Revisit concepts from this week\'s sessions',
      color: THEME.warning,
      action: 'Access Resources',
    },
    {
      emoji: '💪',
      title: 'Confidence Building',
      description: 'Practice problems on strong topics for confidence',
      color: THEME.success,
      action: 'Practice Now',
    },
  ];

  return (
    <div style={S.card}>
      <h2 style={S.title}>🤖 AI Recommendations</h2>
      <p style={{ color: THEME.textMuted, fontSize: 13, marginBottom: 20 }}>
        Personalized study suggestions based on your progress
      </p>

      <div>
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            style={{
              ...S.recommendation,
              borderLeft: `4px solid ${rec.color}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(4px)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{rec.emoji}</div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: THEME.text, margin: 0, marginBottom: 4 }}>
                  {rec.title}
                </h3>
                <p style={{ fontSize: 12, color: THEME.textMuted, margin: 0, marginBottom: 8 }}>
                  {rec.description}
                </p>
                {rec.detail && (
                  <p style={{ fontSize: 11, color: rec.color, margin: 0, fontWeight: 500 }}>
                    {rec.detail}
                  </p>
                )}
              </div>
              <button
                style={{
                  padding: '6px 12px',
                  background: rec.color,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 11,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  marginLeft: 12,
                }}
              >
                {rec.action}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insight */}
      <div style={{
        marginTop: 20,
        padding: 16,
        background: `${THEME.primary}22`,
        border: `2px solid ${THEME.primary}`,
        borderRadius: 8,
        borderLeft: `4px solid ${THEME.primary}`,
      }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: THEME.text, margin: 0, marginBottom: 8 }}>
          🧠 AI Analysis:
        </p>
        <p style={{ fontSize: 12, color: THEME.textMuted, margin: 0, lineHeight: 1.6 }}>
          Based on your current performance (score: {mockScore}/100), you're on track for your target rank. 
          However, strengthen weak topics before the final mock. 
          Allocate extra time to {weakTopics[0]?.topic || 'fundamental concepts'} which has shown {weakTopics[0]?.errors || 'multiple'} errors.
        </p>
      </div>
    </div>
  );
}
