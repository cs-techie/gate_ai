import { useState } from 'react';

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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    background: `linear-gradient(135deg, ${THEME.surface}99, ${THEME.border}33)`,
    border: `1px solid ${THEME.border}`,
    borderRadius: 12,
    padding: 20,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 900,
    color: THEME.primary,
    margin: '8px 0 4px 0',
  },
  statLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  chart: {
    height: 300,
    marginBottom: 24,
    position: 'relative',
  },
  heatmapContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: 12,
    marginBottom: 24,
  },
  heatmapItem: {
    padding: 16,
    borderRadius: 8,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 600,
    fontSize: 12,
  },
};

// Simple chart renderer
function SimpleLineChart({ data, title }) {
  const max = Math.max(...data);
  const width = 100 / data.length;
  const height = 200;

  return (
    <div style={S.chart}>
      <h3 style={{ fontSize: 14, color: THEME.text, marginBottom: 16 }}>{title}</h3>
      <div style={{ display: 'flex', alignItems: 'flex-end', height, gap: 4 }}>
        {data.map((value, idx) => (
          <div
            key={idx}
            style={{
              flex: 1,
              background: `linear-gradient(180deg, ${THEME.primary}, ${THEME.primary}66)`,
              height: `${(value / max) * 100}%`,
              borderRadius: '8px 8px 0 0',
              minHeight: 4,
              position: 'relative',
              tooltip: `${value}h`,
            }}
            title={`${value}h`}
          />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 11, color: THEME.textMuted }}>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </div>
  );
}

// Subject completion bars
function SubjectCompletion({ topics }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h3 style={{ fontSize: 14, color: THEME.text, marginBottom: 16 }}>Subject-wise Completion</h3>
      <div style={{ display: 'grid', gap: 12 }}>
        {Object.entries(topics).slice(0, 8).map(([subject, data]) => (
          <div key={subject}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: THEME.text }}>{subject}</span>
              <span style={{ fontSize: 13, color: THEME.primary, fontWeight: 600 }}>{data.completed}%</span>
            </div>
            <div style={{
              background: `${THEME.border}33`,
              borderRadius: 8,
              height: 8,
              overflow: 'hidden',
              border: `1px solid ${THEME.border}`,
            }}>
              <div
                style={{
                  height: '100%',
                  background: `linear-gradient(90deg, ${THEME.primary}, ${THEME.success})`,
                  width: `${data.completed}%`,
                  borderRadius: 8,
                  transition: '0.3s ease',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Heatmap for weak topics
function WeakTopicsHeatmap({ topics }) {
  const sortedTopics = Object.entries(topics)
    .map(([subject, data]) => ({ subject, ...data }))
    .sort((a, b) => b.errors - a.errors)
    .slice(0, 10);

  const colors = {
    high: '#EF4444',
    medium: '#F59E0B',
    low: '#10B981',
  };

  return (
    <div>
      <h3 style={{ fontSize: 14, color: THEME.text, marginBottom: 16 }}>Topic Intensity Heatmap</h3>
      <div style={S.heatmapContainer}>
        {sortedTopics.map((item) => {
          const intensity = item.errors;
          let color = colors.low;
          if (intensity >= 7) color = colors.high;
          else if (intensity >= 4) color = colors.medium;

          return (
            <div
              key={item.subject}
              style={{
                ...S.heatmapItem,
                background: color,
                opacity: 0.8 + (intensity / 10) * 0.2,
              }}
              title={`${item.subject}: ${intensity} errors`}
            >
              <div style={{ fontSize: 20 }}>
                {intensity >= 7 ? '▓▓▓' : intensity >= 4 ? '▓▓░' : '▓░░'}
              </div>
              <div style={{ fontSize: 10, marginTop: 4 }}>{item.subject.split(' ')[0]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AnalyticsDashboard({ plannerData }) {
  return (
    <div style={S.card}>
      <h2 style={S.title}>📊 Analytics Dashboard</h2>

      {/* Key Metrics */}
      <div style={S.grid}>
        <div style={S.statCard}>
          <div style={S.statLabel}>Accuracy</div>
          <div style={S.statValue}>{plannerData.accuracy}%</div>
          <div style={{ fontSize: 11, color: THEME.success }}>↑ +3% from last week</div>
        </div>
        <div style={S.statCard}>
          <div style={S.statLabel}>Mock Score</div>
          <div style={S.statValue}>{plannerData.mockScore}</div>
          <div style={{ fontSize: 11, color: THEME.warning }}>↑ +2 points</div>
        </div>
        <div style={S.statCard}>
          <div style={S.statLabel}>Avg Hours/Day</div>
          <div style={S.statValue}>5.2</div>
          <div style={{ fontSize: 11, color: THEME.success }}>↑ Goal: 5h</div>
        </div>
        <div style={S.statCard}>
          <div style={S.statLabel}>Weak Topics</div>
          <div style={{ ...S.statValue, color: THEME.danger }}>4</div>
          <div style={{ fontSize: 11, color: THEME.danger }}>Need attention</div>
        </div>
      </div>

      {/* Charts */}
      <SimpleLineChart
        data={plannerData.studyHours}
        title="Daily Study Hours (This Week)"
      />

      {/* Subject Completion */}
      <SubjectCompletion topics={plannerData.topics} />

      {/* Heatmap */}
      <WeakTopicsHeatmap topics={plannerData.topics} />
    </div>
  );
}
