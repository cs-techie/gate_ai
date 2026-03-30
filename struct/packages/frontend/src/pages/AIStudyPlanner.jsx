import { useState, useEffect } from 'react';
import AnalyticsDashboard from '../components/planner/AnalyticsDashboard';
import WeakTopicRecommendations from '../components/planner/WeakTopicRecommendations';
import StudySchedule from '../components/planner/StudySchedule';
import ProgressTracker from '../components/planner/ProgressTracker';
import MockTestDashboard from '../components/planner/MockTestDashboard';
import PomodoroTimer from '../components/planner/PomodoroTimer';
import RevisionSystem from '../components/planner/RevisionSystem';
import ErrorTracker from '../components/planner/ErrorTracker';
import SmartRecommendations from '../components/planner/SmartRecommendations';
import GoalTracker from '../components/planner/GoalTracker';
import FocusMode from '../components/planner/FocusMode';
import NotificationCenter from '../components/planner/NotificationCenter';
import ExportPlanner from '../components/planner/ExportPlanner';

// Theme
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
  container: {
    background: `linear-gradient(135deg, ${THEME.bg} 0%, #1a2d4d 100%)`,
    minHeight: '100vh',
    padding: '24px 20px',
  },
  innerContainer: {
    maxWidth: 1400,
    margin: '0 auto',
  },
  header: {
    marginBottom: 40,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 900,
    color: THEME.text,
    margin: 0,
    letterSpacing: '-0.5px',
  },
  tabContainer: {
    display: 'flex',
    gap: 8,
    marginBottom: 30,
    borderBottom: `1px solid ${THEME.border}`,
    overflowX: 'auto',
    paddingBottom: 12,
  },
  tab: {
    padding: '10px 16px',
    borderRadius: '8px',
    border: 'none',
    background: 'transparent',
    color: THEME.textMuted,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    transition: '0.3s ease',
    borderBottom: '2px solid transparent',
  },
  tabActive: {
    color: THEME.primary,
    borderBottomColor: THEME.primary,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: 20,
    marginBottom: 30,
  },
  gridWide: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 20,
    marginBottom: 30,
  },
};

export default function AIStudyPlanner() {
  const [activeTab, setActiveTab] = useState('overview');
  const [focusModeActive, setFocusModeActive] = useState(false);
  
  // Core planner state
  const [plannerData, setPlannerData] = useState({
    stream: 'Computer Science (CS)',
    examDate: new Date(2026, 5, 15), // June 15, 2026
    targetRank: 1000,
    hoursPerDay: 5,
    currentLevel: 'Intermediate',
    
    // Progress
    syllabusCompletion: 65,
    mockScore: 72,
    accuracy: 78,
    
    // Topics & Confidence
    topics: {
      'Programming & Data Structures': { confidence: 4, completed: 60, errors: 2 },
      'Algorithms': { confidence: 3, completed: 45, errors: 5 },
      'Operating Systems': { confidence: 2, completed: 30, errors: 8 },
      'Database Management': { confidence: 3, completed: 50, errors: 3 },
      'Networks': { confidence: 2, completed: 25, errors: 7 },
      'Discrete Mathematics': { confidence: 4, completed: 70, errors: 1 },
      'Digital Logic': { confidence: 3, completed: 55, errors: 4 },
      'Theory of Computation': { confidence: 2, completed: 35, errors: 6 },
      'Compiler Design': { confidence: 1, completed: 20, errors: 9 },
      'Computer Architecture': { confidence: 3, completed: 50, errors: 4 },
    },
    
    // Mock tests
    mockTests: [
      { id: 1, date: '2026-03-28', score: 68, accuracy: 75, time: 120 },
      { id: 2, date: '2026-03-21', score: 65, accuracy: 72, time: 130 },
      { id: 3, date: '2026-03-14', score: 62, accuracy: 68, time: 135 },
      { id: 4, date: '2026-03-07', score: 58, accuracy: 65, time: 140 },
    ],
    
    // Study history
    studyHours: [5.2, 4.8, 6.1, 5.5, 4.2, 6.0, 5.8],
    
    // Goals
    weeklyGoal: 35,
    monthlyGoal: 150,
    
    // Errors
    errors: [
      { topic: 'Operating Systems', type: 'conceptual', frequency: 8 },
      { topic: 'Networks', type: 'computational', frequency: 7 },
      { topic: 'Theory of Computation', type: 'conceptual', frequency: 6 },
      { topic: 'Compiler Design', type: 'practical', frequency: 9 },
    ],
  });

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'warning', message: 'Complete revision of Operating Systems', time: '2 hours ago' },
    { id: 2, type: 'info', message: 'Mock test scheduled for tomorrow', time: '1 hour ago' },
    { id: 3, type: 'success', message: 'Great performance on Discrete Mathematics!', time: '30 mins ago' },
  ]);

  const [studyStreak, setStudyStreak] = useState(12); // days
  const [totalStudyTime, setTotalStudyTime] = useState(245); // hours

  // Calculate weak topics
  const weakTopics = Object.entries(plannerData.topics)
    .filter(([_, data]) => data.confidence <= 2)
    .map(([topic, data]) => ({ topic, ...data }))
    .sort((a, b) => b.errors - a.errors);

  const tabs = [
    { id: 'overview', label: '📊 Overview', icon: '📊' },
    { id: 'analytics', label: '📈 Analytics', icon: '📈' },
    { id: 'schedule', label: '📅 Schedule', icon: '📅' },
    { id: 'progress', label: '📍 Progress', icon: '📍' },
    { id: 'mocks', label: '🧪 Mock Tests', icon: '🧪' },
    { id: 'revision', label: '🔄 Revision', icon: '🔄' },
    { id: 'goals', label: '🎯 Goals', icon: '🎯' },
    { id: 'weak', label: '⚠️ Weak Topics', icon: '⚠️' },
  ];

  if (focusModeActive) {
    return <FocusMode onExit={() => setFocusModeActive(false)} plannerData={plannerData} />;
  }

  return (
    <div style={S.container}>
      <div style={S.innerContainer}>
        {/* Header */}
        <div style={S.header}>
          <div>
            <h1 style={S.title}>🎓 AI Study Planner</h1>
            <p style={{ color: THEME.textMuted, margin: '8px 0 0 0', fontSize: 14 }}>
              Exam: {plannerData.stream} | Target Rank: {plannerData.targetRank.toLocaleString()} | Days: 78
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => setFocusModeActive(true)}
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
            >
              🎯 Focus Mode
            </button>
            <ExportPlanner plannerData={plannerData} />
          </div>
        </div>

        {/* Notification Center */}
        <NotificationCenter notifications={notifications} />

        {/* Tab Navigation */}
        <div style={S.tabContainer}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...S.tab,
                ...(activeTab === tab.id ? S.tabActive : {}),
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div>
            <div style={S.grid}>
              <ProgressTracker plannerData={plannerData} />
              <PomodoroTimer onSessionComplete={() => console.log('Session complete')} />
            </div>
            <div style={S.gridWide}>
              <StudySchedule plannerData={plannerData} />
              <SmartRecommendations weakTopics={weakTopics} mockScore={plannerData.mockScore} />
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div style={S.grid}>
            <div style={{ gridColumn: '1 / -1' }}>
              <AnalyticsDashboard plannerData={plannerData} />
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div>
            <StudySchedule plannerData={plannerData} fullView />
          </div>
        )}

        {activeTab === 'progress' && (
          <div style={S.grid}>
            <div style={{ gridColumn: '1 / -1' }}>
              <ProgressTracker plannerData={plannerData} fullView />
            </div>
          </div>
        )}

        {activeTab === 'mocks' && (
          <div style={S.grid}>
            <div style={{ gridColumn: '1 / -1' }}>
              <MockTestDashboard plannerData={plannerData} />
            </div>
          </div>
        )}

        {activeTab === 'revision' && (
          <div style={S.grid}>
            <div style={{ gridColumn: '1 / -1' }}>
              <RevisionSystem plannerData={plannerData} />
            </div>
          </div>
        )}

        {activeTab === 'goals' && (
          <div style={S.grid}>
            <div style={{ gridColumn: '1 / -1' }}>
              <GoalTracker
                weeklyGoal={plannerData.weeklyGoal}
                monthlyGoal={plannerData.monthlyGoal}
                weeklyProgress={Math.round((totalStudyTime / plannerData.weeklyGoal) * 100)}
              />
            </div>
          </div>
        )}

        {activeTab === 'weak' && (
          <div style={S.grid}>
            <div style={{ gridColumn: '1 / -1' }}>
              <WeakTopicRecommendations weakTopics={weakTopics} plannerData={plannerData} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <ErrorTracker errors={plannerData.errors} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
