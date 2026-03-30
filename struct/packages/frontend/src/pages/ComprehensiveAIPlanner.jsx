import React, { useState } from 'react';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import WeakTopicRecommendations from '../components/WeakTopicRecommendations';
import StudySchedule from '../components/StudySchedule';
import ProgressTracker from '../components/ProgressTracker';
import MockTestDashboard from '../components/MockTestDashboard';
import PomodoroTimer from '../components/PomodoroTimer';
import ErrorTracker from '../components/ErrorTracker';
import SmartRecommendations from '../components/SmartRecommendations';
import GoalTracker from '../components/GoalTracker';
import FocusMode from '../components/FocusMode';
import NotificationCenter from '../components/NotificationCenter';
import ExportPlanner from '../components/ExportPlanner';

const ComprehensiveAIPlanner = () => {
  const [focusMode, setFocusMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const THEME = {
    bg: '#0F172A',
    surface: '#1E293B',
    text: '#E2E8F0',
    textMuted: '#94A3B8',
    border: '#334155',
    primary: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
  };

  const S = {
    container: {
      background: `linear-gradient(135deg, ${THEME.bg} 0%, #1a2d4d 100%)`,
      minHeight: '100vh',
      padding: '20px',
    },
    innerContainer: {
      maxWidth: 1400,
      margin: '0 auto',
    },
    header: {
      marginBottom: '30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '20px',
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: THEME.text,
      margin: 0,
    },
    subtitle: {
      fontSize: '14px',
      color: THEME.textMuted,
      marginTop: '5px',
    },
    buttonGroup: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
    },
    button: {
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '14px',
      transition: 'all 0.2s',
    },
    primaryBtn: {
      background: THEME.primary,
      color: 'white',
    },
    outlineBtn: {
      background: 'transparent',
      color: THEME.primary,
      border: `2px solid ${THEME.primary}`,
    },
    tabs: {
      display: 'flex',
      gap: '10px',
      marginBottom: '30px',
      borderBottom: `2px solid ${THEME.border}`,
      paddingBottom: '15px',
      overflowX: 'auto',
    },
    tab: {
      padding: '10px 20px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      color: THEME.textMuted,
      border: 'none',
      background: 'transparent',
      transition: 'all 0.2s',
      whiteSpace: 'nowrap',
    },
    tabActive: {
      color: THEME.primary,
      borderBottom: `3px solid ${THEME.primary}`,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '20px',
      marginBottom: '20px',
    },
    section: {
      background: THEME.surface,
      padding: '25px',
      borderRadius: '14px',
      border: `1px solid ${THEME.border}`,
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    },
  };

  if (focusMode) {
    return <FocusMode currentTask="DSA - Arrays Practice" />;
  }

  const tabs = [
    { id: 'dashboard', label: '🎓 Dashboard' },
    { id: 'overview', label: '📊 Overview' },
    { id: 'analytics', label: '📈 Analytics' },
    { id: 'schedule', label: '📅 Schedule' },
    { id: 'progress', label: '📈 Progress' },
    { id: 'goals', label: '🏆 Goals' },
    { id: 'mocks', label: '📝 Mocks' },
    { id: 'tools', label: '🛠️ Tools' },
    { id: 'recommendations', label: '🎯 Recommendations' },
    { id: 'all-features', label: '✨ All Features' },
  ];

  return (
    <div style={S.container}>
      <NotificationCenter />

      <div style={S.innerContainer}>
        {/* Header */}
        <div style={S.header}>
          <div>
            <h1 style={S.title}>🎓 AI Study Planner Pro</h1>
            <p style={S.subtitle}>Your personal AI-powered GATE exam preparation companion</p>
          </div>
          <div style={S.buttonGroup}>
            <button style={{ ...S.button, ...S.primaryBtn }} onClick={() => setFocusMode(true)}>
              🎯 Focus Mode
            </button>
            <button style={{ ...S.button, ...S.outlineBtn }}>
              ⚙️ Settings
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={S.tabs}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              style={{
                ...S.tab,
                ...(activeTab === tab.id ? S.tabActive : {}),
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab - Main Overview */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={S.grid}>
              <div style={S.section}>
                <ProgressTracker />
              </div>
              <div style={S.section}>
                <GoalTracker />
              </div>
            </div>
            <div style={S.grid}>
              <div style={S.section}>
                <WeakTopicRecommendations />
              </div>
              <div style={S.section}>
                <SmartRecommendations />
              </div>
            </div>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div style={S.grid}>
              <div style={S.section}>
                <ProgressTracker />
              </div>
              <div style={S.section}>
                <AnalyticsDashboard />
              </div>
            </div>
            <div style={S.grid}>
              <div style={S.section}>
                <WeakTopicRecommendations />
              </div>
              <div style={S.section}>
                <SmartRecommendations />
              </div>
            </div>
            <div style={S.section}>
              <ExportPlanner />
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div>
            <div style={S.grid}>
              <div style={S.section}>
                <AnalyticsDashboard />
              </div>
              <div style={S.section}>
                <ErrorTracker />
              </div>
            </div>
            <div style={S.section}>
              <MockTestDashboard />
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div>
            <div style={S.section}>
              <StudySchedule />
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div>
            <div style={S.grid}>
              <div style={S.section}>
                <ProgressTracker />
              </div>
              <div style={S.section}>
                <AnalyticsDashboard />
              </div>
            </div>
          </div>
        )}

        {/* Goals Tab */}
        {activeTab === 'goals' && (
          <div>
            <div style={S.grid}>
              <div style={S.section}>
                <GoalTracker />
              </div>
              <div style={S.section}>
                <ProgressTracker />
              </div>
            </div>
          </div>
        )}

        {/* Mocks Tab */}
        {activeTab === 'mocks' && (
          <div>
            <div style={S.grid}>
              <div style={S.section}>
                <MockTestDashboard />
              </div>
              <div style={S.section}>
                <AnalyticsDashboard />
              </div>
            </div>
          </div>
        )}

        {/* Tools Tab */}
        {activeTab === 'tools' && (
          <div>
            <div style={S.grid}>
              <div style={S.section}>
                <PomodoroTimer />
              </div>
              <div style={S.section}>
                <ErrorTracker />
              </div>
            </div>
          </div>
        )}

        {/* Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <div>
            <div style={S.grid}>
              <div style={S.section}>
                <SmartRecommendations />
              </div>
              <div style={S.section}>
                <WeakTopicRecommendations />
              </div>
            </div>
          </div>
        )}

        {/* All Features Tab - Complete Dashboard */}
        {activeTab === 'all-features' && (
          <div>
            <h2 style={{ color: THEME.text, marginBottom: '20px' }}>✨ All 13 Features</h2>
            
            {/* Row 1 */}
            <div style={S.grid}>
              <div style={S.section}>
                <h3 style={{ color: THEME.text, marginTop: 0 }}>1️⃣ Analytics Dashboard</h3>
                <AnalyticsDashboard />
              </div>
              <div style={S.section}>
                <h3 style={{ color: THEME.text, marginTop: 0 }}>2️⃣ Progress Tracker</h3>
                <ProgressTracker />
              </div>
              <div style={S.section}>
                <h3 style={{ color: THEME.text, marginTop: 0 }}>3️⃣ Goal Tracker</h3>
                <GoalTracker />
              </div>
            </div>

            {/* Row 2 */}
            <div style={S.grid}>
              <div style={S.section}>
                <h3 style={{ color: THEME.text, marginTop: 0 }}>4️⃣ Weak Topics</h3>
                <WeakTopicRecommendations />
              </div>
              <div style={S.section}>
                <h3 style={{ color: THEME.text, marginTop: 0 }}>5️⃣ Smart Recommendations</h3>
                <SmartRecommendations />
              </div>
              <div style={S.section}>
                <h3 style={{ color: THEME.text, marginTop: 0 }}>6️⃣ Mock Tests</h3>
                <MockTestDashboard />
              </div>
            </div>

            {/* Row 3 */}
            <div style={S.grid}>
              <div style={S.section}>
                <h3 style={{ color: THEME.text, marginTop: 0 }}>7️⃣ Error Tracker</h3>
                <ErrorTracker />
              </div>
              <div style={S.section}>
                <h3 style={{ color: THEME.text, marginTop: 0 }}>8️⃣ Study Schedule</h3>
                <StudySchedule />
              </div>
              <div style={S.section}>
                <h3 style={{ color: THEME.text, marginTop: 0 }}>9️⃣ Pomodoro Timer</h3>
                <PomodoroTimer />
              </div>
            </div>

            {/* Row 4 */}
            <div style={S.grid}>
              <div style={S.section}>
                <h3 style={{ color: THEME.text, marginTop: 0 }}>🔟 Export & Share</h3>
                <ExportPlanner />
              </div>
              <div style={S.section}>
                <h3 style={{ color: THEME.text, marginTop: 0 }}>1️⃣1️⃣ Focus Mode</h3>
                <div style={{ padding: '20px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px' }}>
                  <button style={{ ...S.button, ...S.primaryBtn, width: '100%' }} onClick={() => setFocusMode(true)}>
                    🎯 Enter Focus Mode
                  </button>
                  <p style={{ color: THEME.textMuted, fontSize: '12px', marginTop: '10px' }}>
                    Distraction-free studying environment
                  </p>
                </div>
              </div>
              <div style={S.section}>
                <h3 style={{ color: THEME.text, marginTop: 0 }}>1️⃣2️⃣ Notifications</h3>
                <div style={{ padding: '20px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '14px', color: THEME.text }}>
                    🔔 Toast notifications enabled<br/>
                    ⏰ Reminders & alerts active<br/>
                    ✅ Success messages configured
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Summary */}
            <div style={S.section}>
              <h3 style={{ color: THEME.primary, marginTop: 0 }}>📋 Complete Feature List</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <div>✅ 1. Analytics Dashboard - Study metrics & heatmap</div>
                <div>✅ 2. Weak Topics - AI detection & suggestions</div>
                <div>✅ 3. Study Schedule - 7-day planning</div>
                <div>✅ 4. Progress Tracker - Completion & tracking</div>
                <div>✅ 5. Mock Tests - History & analysis</div>
                <div>✅ 6. Pomodoro Timer - Focus sessions</div>
                <div>✅ 7. Error Tracker - Mistake logging</div>
                <div>✅ 8. Recommendations - AI suggestions</div>
                <div>✅ 9. Goals - Weekly & monthly</div>
                <div>✅ 10. Export/Share - Download & share plans</div>
                <div>✅ 11. Focus Mode - Distraction-free UI</div>
                <div>✅ 12. Notifications - Toast & alerts</div>
                <div>✅ 13. Master Dashboard - Complete hub</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComprehensiveAIPlanner;
