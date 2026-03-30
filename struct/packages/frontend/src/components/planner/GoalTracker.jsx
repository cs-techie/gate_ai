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
  goalCard: {
    background: `linear-gradient(135deg, ${THEME.surface}, ${THEME.border}22)`,
    border: `1px solid ${THEME.border}`,
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
  },
};

export default function GoalTracker({ weeklyGoal, monthlyGoal, weeklyProgress }) {
  const monthlyProgress = 58; // % of monthly goal achieved

  const milestoneDates = [
    { date: 'March 31', progress: 30, status: 'completed' },
    { date: 'April 7', progress: 50, status: 'in-progress' },
    { date: 'April 15', progress: 75, status: 'upcoming' },
    { date: 'April 30', progress: 100, status: 'upcoming' },
  ];

  return (
    <div style={S.card}>
      <h2 style={S.title}>🎯 Goal Tracker</h2>

      {/* Weekly Goal */}
      <div style={S.goalCard}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: THEME.text, margin: 0, marginBottom: 4 }}>
              📅 Weekly Goal
            </h3>
            <p style={{ fontSize: 13, color: THEME.textMuted, margin: 0 }}>
              {Math.round(weeklyProgress)} / {weeklyGoal} hours
            </p>
          </div>
          <div style={{
            fontSize: 32,
            fontWeight: 900,
            color: weeklyProgress >= 100 ? THEME.success : THEME.primary,
          }}>
            {Math.round((weeklyProgress / weeklyGoal) * 100)}%
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{
          height: 12,
          background: `${THEME.border}`,
          borderRadius: 6,
          overflow: 'hidden',
          marginBottom: 12,
          border: `1px solid ${THEME.border}`,
        }}>
          <div
            style={{
              height: '100%',
              background: `linear-gradient(90deg, ${THEME.primary}, ${THEME.success})`,
              width: `${Math.min(weeklyProgress / weeklyGoal * 100, 100)}%`,
              transition: '0.3s ease',
            }}
          />
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <div style={{
            background: `${THEME.primary}22`,
            border: `1px solid ${THEME.primary}33`,
            borderRadius: 8,
            padding: 12,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 11, color: THEME.textMuted }}>Target Daily</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: THEME.primary, marginTop: 4 }}>
              {Math.round(weeklyGoal / 7)}h
            </div>
          </div>
          <div style={{
            background: `${THEME.success}22`,
            border: `1px solid ${THEME.success}33`,
            borderRadius: 8,
            padding: 12,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 11, color: THEME.textMuted }}>Days Left</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: THEME.success, marginTop: 4 }}>
              3
            </div>
          </div>
          <div style={{
            background: `${THEME.warning}22`,
            border: `1px solid ${THEME.warning}33`,
            borderRadius: 8,
            padding: 12,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 11, color: THEME.textMuted }}>On Track</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: THEME.success, marginTop: 4 }}>
              ✓
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Goal */}
      <div style={S.goalCard}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: THEME.text, margin: 0, marginBottom: 4 }}>
              📊 Monthly Goal
            </h3>
            <p style={{ fontSize: 13, color: THEME.textMuted, margin: 0 }}>
              {Math.round(monthlyProgress / 100 * monthlyGoal)} / {monthlyGoal} hours
            </p>
          </div>
          <div style={{
            fontSize: 32,
            fontWeight: 900,
            color: monthlyProgress >= 100 ? THEME.success : THEME.primary,
          }}>
            {monthlyProgress}%
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{
          height: 12,
          background: `${THEME.border}`,
          borderRadius: 6,
          overflow: 'hidden',
          marginBottom: 12,
          border: `1px solid ${THEME.border}`,
        }}>
          <div
            style={{
              height: '100%',
              background: `linear-gradient(90deg, ${THEME.warning}, ${THEME.success})`,
              width: `${monthlyProgress}%`,
              transition: '0.3s ease',
            }}
          />
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <div style={{
            background: `${THEME.warning}22`,
            border: `1px solid ${THEME.warning}33`,
            borderRadius: 8,
            padding: 12,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 11, color: THEME.textMuted }}>Target Daily</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: THEME.warning, marginTop: 4 }}>
              {Math.round(monthlyGoal / 30)}h
            </div>
          </div>
          <div style={{
            background: `${THEME.primary}22`,
            border: `1px solid ${THEME.primary}33`,
            borderRadius: 8,
            padding: 12,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 11, color: THEME.textMuted }}>Days Left</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: THEME.primary, marginTop: 4 }}>
              8
            </div>
          </div>
          <div style={{
            background: `${THEME.danger}22`,
            border: `1px solid ${THEME.danger}33`,
            borderRadius: 8,
            padding: 12,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 11, color: THEME.textMuted }}>Pace</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: THEME.danger, marginTop: 4 }}>
              ⚠️ Slow
            </div>
          </div>
        </div>
      </div>

      {/* Milestone Timeline */}
      <div>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: THEME.text, marginBottom: 16 }}>
          🏁 Exam Preparation Milestones
        </h3>
        <div>
          {milestoneDates.map((milestone, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '12px 0',
                borderBottom: idx < milestoneDates.length - 1 ? `1px solid ${THEME.border}33` : 'none',
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: milestone.status === 'completed' ? THEME.success : milestone.status === 'in-progress' ? THEME.primary : THEME.border,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  color: '#fff',
                  fontSize: 14,
                }}
              >
                {milestone.status === 'completed' ? '✓' : milestone.status === 'in-progress' ? '●' : idx + 1}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: THEME.text, margin: 0 }}>
                  {milestone.progress}% Completion
                </p>
                <p style={{ fontSize: 12, color: THEME.textMuted, margin: '4px 0 0 0' }}>
                  {milestone.date}
                </p>
              </div>
              <span
                style={{
                  padding: '4px 12px',
                  background: milestone.status === 'completed' ? THEME.success : milestone.status === 'in-progress' ? THEME.primary : THEME.border,
                  color: milestone.status === 'upcoming' ? THEME.textMuted : '#fff',
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'capitalize',
                }}
              >
                {milestone.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Target Rank */}
      <div style={{
        marginTop: 24,
        padding: 16,
        background: `${THEME.primary}11`,
        border: `2px solid ${THEME.primary}`,
        borderRadius: 8,
      }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: THEME.text, margin: 0, marginBottom: 8 }}>
          🎓 Target Rank: <span style={{ color: THEME.primary }}>AIR 1000</span>
        </p>
        <p style={{ fontSize: 12, color: THEME.textMuted, margin: 0 }}>
          Current pace: On track. Expected rank: AIR 950-1100 (Based on mock averages)
        </p>
      </div>
    </div>
  );
}
