import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import ProgressTracker from '../components/ProgressTracker';
import GoalTracker from '../components/GoalTracker';
import MockTestDashboard from '../components/MockTestDashboard';
import PomodoroTimer from '../components/PomodoroTimer';
import ErrorTracker from '../components/ErrorTracker';
import SmartRecommendations from '../components/SmartRecommendations';
import WeakTopicRecommendations from '../components/WeakTopicRecommendations';
import ExportPlanner from '../components/ExportPlanner';
import FocusMode from '../components/FocusMode';
import NotificationCenter from '../components/NotificationCenter';

const SUBJECTS = ['Engineering Mathematics','Digital Logic','Computer Organization','Programming & DS','Algorithms','Theory of Computation','Compiler Design','Operating Systems','Databases','Computer Networks'];

export default function AIPlanner() {
  const [examDate, setExamDate] = useState('');
  const [hours, setHours] = useState(4);
  const [selected, setSelected] = useState([]);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    analytics: true,
    schedule: true,
    progress: false,
    mocks: false,
    tools: false,
    recommendations: false,
  });

  const toggle = (s) => setSelected(p => p.includes(s) ? p.filter(x=>x!==s) : [...p,s]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      setPlan({
        daily: [
          { day: 'Monday', topic: 'Engineering Mathematics  Linear Algebra', duration: `${hours}h`, icon: '📐', revision: 'Linear Systems' },
          { day: 'Tuesday', topic: 'Digital Logic  Boolean Algebra & Gates', duration: `${hours}h`, icon: '🔌', revision: 'K-Maps' },
          { day: 'Wednesday', topic: 'Data Structures  Trees & Graphs', duration: `${hours}h`, icon: '🌳', revision: 'Traversals' },
          { day: 'Thursday', topic: 'Algorithms  Sorting & Searching', duration: `${hours}h`, icon: '⚙️', revision: 'Complexity Analysis' },
          { day: 'Friday', topic: 'Operating Systems  Process Management', duration: `${hours}h`, icon: '🖥️', revision: 'Scheduling' },
          { day: 'Saturday', topic: 'Computer Networks  TCP/IP Stack', duration: `${hours}h`, icon: '🌐', revision: 'Protocol Layers' },
          { day: 'Sunday', topic: 'Revision + Mock Test', duration: '2h', icon: '📋', revision: 'Full Syllabus' },
        ],
        weeks: 12,
        totalHours: hours * 6 * 12,
      });
      setLoading(false);
    }, 1200);
  };

  if (focusMode) {
    return <FocusMode currentTask="GATE Exam Preparation" onExit={() => setFocusMode(false)} />;
  }

  const SectionCard = ({ title, icon, expanded, onToggle, children }) => (
    <div style={{ background: '#fff', borderRadius: 16, marginBottom: 20, boxShadow: '0 2px 16px rgba(0,0,0,0.05)', border: '1px solid #F0F9F4', overflow: 'hidden' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: expanded ? '#F8FAFC' : '#fff',
          border: 'none',
          cursor: 'pointer',
          fontSize: 15,
          fontWeight: 800,
          color: '#1e293b',
          transition: 'background 0.2s',
        }}
      >
        <span>{icon} {title}</span>
        <span style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
      </button>
      {expanded && (
        <div style={{ padding: 24, borderTop: '1px solid #F0F9F4' }}>
          {children}
        </div>
      )}
    </div>
  );

  return (
    <DashboardLayout title="AI Study Planner" subtitle="Generate a personalised GATE prep schedule">
      <NotificationCenter />
      
      <div style={{ display: 'grid', gridTemplateColumns: plan ? 'minmax(360px, 380px) 1fr' : '1fr', gap: 24, marginBottom: 24 }}>
        {/* Sidebar - Configuration */}
        <div style={{ height: 'fit-content', position: 'sticky', top: 20 }}>
          {/* Goal Tracker Summary */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 20, boxShadow: '0 2px 16px rgba(0,0,0,0.05)', border: '1px solid #F0F9F4', marginBottom: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 800, color: '#1e293b', marginBottom: 16, marginTop: 0 }}>🎯 Goal Tracker</h3>
            <GoalTracker />
          </div>

          {/* Form */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: '0 2px 16px rgba(0,0,0,0.05)', border: '1px solid #F0F9F4' }}>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: '#1e293b', marginBottom: 20 }}>⚙️ Configure Your Plan</h2>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 6 }}>TARGET EXAM DATE</label>
              <input type="date" value={examDate} onChange={e=>setExamDate(e.target.value)} className="form-input" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 14 }}/>
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 6 }}>STUDY HOURS PER DAY: <span style={{ color: '#22C58B' }}>{hours}h</span></label>
              <input type="range" min={1} max={12} value={hours} onChange={e=>setHours(+e.target.value)} style={{ width: '100%', accentColor: '#22C58B' }}/>
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 8 }}>SUBJECTS TO COVER</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {SUBJECTS.map(s => (
                  <button key={s} onClick={()=>toggle(s)} style={{ padding: '5px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: 'pointer', border: 'none', background: selected.includes(s) ? '#22C58B' : '#F1F5F9', color: selected.includes(s) ? '#fff' : '#64748B', fontFamily: 'inherit', transition: 'all 0.2s' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={generate} disabled={loading || !examDate} className="btn-ai" style={{ width: '100%', padding: '12px', fontSize: 14, opacity: !examDate ? 0.5 : 1, background: '#22C58B', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: !examDate ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}>
                {loading ? '⏳ Generating...' : '✨ Generate AI Plan'}
              </button>
              {plan && (
                <>
                  <button onClick={() => setFocusMode(true)} style={{ width: '100%', padding: '12px', fontSize: 14, background: '#3B82F6', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>
                    🎯 Focus Mode
                  </button>
                  <div style={{ background: '#FEF3C7', padding: 12, borderRadius: 8, fontSize: 12, color: '#92400E' }}>
                    💡 <strong>Tip:</strong> Focus Mode removes all distractions for deep study sessions
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main Content - Plan Output & Features */}
        {plan && (
          <div>
            {/* Top Stats Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 24 }}>
              {[
                { icon: '📅', label: 'Study Weeks', value: plan.weeks },
                { icon: '⏱️', label: 'Total Hours', value: `${plan.totalHours}h` },
                { icon: '📚', label: 'Subjects', value: selected.length || SUBJECTS.length },
              ].map((s,i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 20, textAlign: 'center', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', border: '1px solid #F0F9F4' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                  <p style={{ fontSize: 24, fontWeight: 800, color: '#1e293b', margin: 0 }}>{s.value}</p>
                  <p style={{ fontSize: 12, color: '#94A3B8', margin: '8px 0 0 0' }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* 🤖 AI Recommendations Section */}
            <SectionCard
              title="AI Smart Recommendations"
              icon="🤖"
              expanded={expandedSections.recommendations}
              onToggle={() => toggleSection('recommendations')}
            >
              <SmartRecommendations />
            </SectionCard>

            {/* 📊 Analytics Dashboard Section */}
            <SectionCard
              title="Analytics Dashboard"
              icon="📊"
              expanded={expandedSections.analytics}
              onToggle={() => toggleSection('analytics')}
            >
              <AnalyticsDashboard />
            </SectionCard>

            {/* 📅 Weekly Schedule + Calendar Section */}
            <SectionCard
              title="Study Schedule + Calendar"
              icon="📅"
              expanded={expandedSections.schedule}
              onToggle={() => toggleSection('schedule')}
            >
              <div>
                <h4 style={{ color: '#1e293b', marginTop: 0 }}>📋 Daily Study Plan with Revision Tasks</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {plan.daily.map((d, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px', borderRadius: 12, background: '#F8FAFC', border: '1px solid #F0F9F4', transition: 'all 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.background = '#F0F9F4'} onMouseLeave={(e) => e.currentTarget.style.background = '#F8FAFC'}>
                      <span style={{ fontSize: 22, width: 32 }}>{d.icon}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 700, color: '#1e293b', fontSize: 14, margin: 0 }}>{d.day}</p>
                        <p style={{ fontSize: 12, color: '#64748B', margin: '4px 0 0 0' }}>{d.topic}</p>
                        <div style={{ display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
                          <span style={{ background: '#D1FAE5', color: '#065F46', padding: '4px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700 }}>⏱️ {d.duration}</span>
                          <span style={{ background: '#DBEAFE', color: '#1E40AF', padding: '4px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700 }}>🔄 Revise: {d.revision}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

            {/* 📈 Progress Tracker Section */}
            <SectionCard
              title="Progress Tracker"
              icon="📈"
              expanded={expandedSections.progress}
              onToggle={() => toggleSection('progress')}
            >
              <ProgressTracker />
            </SectionCard>

            {/* 🧪 Mock Test Dashboard Section */}
            <SectionCard
              title="Mock Test Dashboard"
              icon="🧪"
              expanded={expandedSections.mocks}
              onToggle={() => toggleSection('mocks')}
            >
              <MockTestDashboard />
            </SectionCard>

            {/* 🛠️ Tools Section - Pomodoro + Error Tracker */}
            <SectionCard
              title="Study Tools"
              icon="🛠️"
              expanded={expandedSections.tools}
              onToggle={() => toggleSection('tools')}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                <div>
                  <h4 style={{ color: '#1e293b', marginTop: 0 }}>⏱️ Pomodoro Timer</h4>
                  <PomodoroTimer />
                </div>
                <div>
                  <h4 style={{ color: '#1e293b', marginTop: 0 }}>❗ Error Tracker</h4>
                  <ErrorTracker />
                </div>
              </div>
            </SectionCard>

            {/* 📥 Export & Share Section */}
            <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 16px rgba(0,0,0,0.05)', border: '1px solid #F0F9F4' }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1e293b', marginBottom: 16, marginTop: 0 }}>📥 Export & Share</h3>
              <ExportPlanner />
            </div>

            {/* 🔍 Weak Topics Recommendations */}
            <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 16px rgba(0,0,0,0.05)', border: '1px solid #F0F9F4', marginTop: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1e293b', marginBottom: 16, marginTop: 0 }}>🔍 Weak Topics & Focus Areas</h3>
              <WeakTopicRecommendations />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
