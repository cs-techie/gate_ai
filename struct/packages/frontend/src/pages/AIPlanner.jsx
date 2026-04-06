import React, { useState, useCallback } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import NotificationCenter from '../components/NotificationCenter';
import GoalTracker from '../components/GoalTracker';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import ProgressTracker from '../components/ProgressTracker';
import PomodoroTimer from '../components/PomodoroTimer';
import ErrorTracker from '../components/ErrorTracker';
import ExportPlanner from '../components/ExportPlanner';
import WeakTopicRecommendations from '../components/WeakTopicRecommendations';
import MockTestDashboard from '../components/MockTestDashboard';

const SUBJECTS = ['Engineering Mathematics','Digital Logic','Computer Organization','Programming & DS','Algorithms','Theory of Computation','Compiler Design','Operating Systems','Databases','Computer Networks'];

const TOPICS_BY_SUBJECT = {
  'Engineering Mathematics': ['Linear Algebra', 'Calculus', 'Probability'],
  'Digital Logic': ['Boolean Algebra', 'K-Maps', 'Logic Gates'],
  'Computer Organization': ['CPU Design', 'Memory Hierarchy', 'I/O Systems'],
  'Programming & DS': ['Arrays', 'Linked Lists', 'Trees', 'Graphs'],
  'Algorithms': ['Sorting', 'Searching', 'Dynamic Programming'],
  'Theory of Computation': ['Automata', 'CFG', 'Turing Machines'],
  'Compiler Design': ['Lexical Analysis', 'Parsing', 'Code Generation'],
  'Operating Systems': ['Process Management', 'Memory Management', 'Deadlocks'],
  'Databases': ['Normalization', 'Transactions', 'Indexing'],
  'Computer Networks': ['TCP/IP', 'Protocols', 'Routing']
};

export default function AIPlanner() {
  const [examDate, setExamDate] = useState('');
  const [hours, setHours] = useState(4);
  const [selected, setSelected] = useState([]);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    schedule: true,
    dailyPlan: false,
    weakTopics: false,
    revisions: false,
    adaptive: false,
    progress: false,
    mocks: false,
    tools: false,
  });
  const [performanceData, setPerformanceData] = useState({
    accuracy: {},
    mockScores: [],
    weakTopics: [],
    strongTopics: [],
  });

  const toggle = (s) => setSelected(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);
  const toggleSection = (section) => setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));

  const calculateTopicPriority = useCallback((topic, subject, weakTopics = []) => {
    const confidence = 3;
    const accuracy = performanceData.accuracy[topic];
    const completion = accuracy ? (accuracy.correct / accuracy.total) : 0;
    const isWeak = weakTopics.includes(topic);
    const priority = (5 - confidence) + (1 - completion) + (isWeak ? 2 : 0);
    return { topic, subject, priority, confidence, completion: Math.round(completion * 100), isWeak };
  }, [performanceData.accuracy]);

  const getRankedTopics = useCallback((subjects) => {
    const allTopics = [];
    subjects.forEach(subject => {
      const topics = TOPICS_BY_SUBJECT[subject] || [];
      topics.forEach(topic => {
        allTopics.push(calculateTopicPriority(topic, subject, performanceData.weakTopics));
      });
    });
    return allTopics.sort((a, b) => b.priority - a.priority);
  }, [calculateTopicPriority, performanceData.weakTopics]);

  const generateRevisionSchedule = useCallback((rankedTopics, startDate) => {
    const schedule = [];
    const baseDate = new Date(startDate);
    rankedTopics.forEach(topicData => {
      const revisionDays = topicData.isWeak ? [3, 5, 7, 10, 15] : [3, 7, 15];
      revisionDays.forEach(dayOffset => {
        const revisionDate = new Date(baseDate);
        revisionDate.setDate(revisionDate.getDate() + dayOffset);
        schedule.push({
          topic: topicData.topic,
          subject: topicData.subject,
          scheduledDate: revisionDate.toISOString().split('T')[0],
          dayOffset,
          isWeak: topicData.isWeak,
          priority: topicData.priority,
        });
      });
    });
    return schedule.sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate));
  }, []);

  const generateSmartDailyPlan = useCallback((rankedTopics, revisionSchedule, startDate, dailyHours) => {
    const dailyPlan = [];
    const baseDate = new Date(startDate);
    const daysUntilExam = Math.ceil((baseDate - new Date()) / (1000 * 60 * 60 * 24));
    let topicIndex = 0;

    for (let day = 0; day < daysUntilExam; day++) {
      const currentDate = new Date(baseDate);
      currentDate.setDate(currentDate.getDate() - daysUntilExam + day);
      const dateStr = currentDate.toISOString().split('T')[0];
      const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][currentDate.getDay()];

      const dayPlan = { day: dayName, date: dateStr, dayNum: day + 1, schedule: [], totalHours: 0 };
      let remainingHours = dailyHours;

      if (topicIndex < rankedTopics.length && remainingHours > 0) {
        const topicData = rankedTopics[topicIndex];
        const duration = Math.min(remainingHours, topicData.isWeak ? 3 : 2);
        dayPlan.schedule.push({
          type: 'study',
          topic: topicData.topic,
          subject: topicData.subject,
          duration,
          icon: '📚',
          practice: Math.round(duration * 10),
        });
        remainingHours -= duration;
        if (day % 3 === 2) topicIndex = (topicIndex + 1) % rankedTopics.length;
      }

      const dayRevisions = revisionSchedule.filter(rev => rev.scheduledDate === dateStr);
      dayRevisions.slice(0, 2).forEach(revision => {
        if (remainingHours > 0.5) {
          dayPlan.schedule.push({ type: 'revision', topic: revision.topic, subject: revision.subject, duration: 0.5, icon: '🔄', isWeak: revision.isWeak });
          remainingHours -= 0.5;
        }
      });

      if (remainingHours > 0) {
        dayPlan.schedule.push({ type: 'break', topic: 'Rest & Refresh', duration: remainingHours, icon: '☕' });
      }

      dayPlan.totalHours = dailyHours - remainingHours;
      dailyPlan.push(dayPlan);
    }

    return dailyPlan;
  }, []);

  const getOverallAccuracy = useCallback(() => {
    let totalCorrect = 0, totalQuestions = 0;
    Object.values(performanceData.accuracy).forEach(acc => {
      totalCorrect += acc.correct;
      totalQuestions += acc.total;
    });
    return totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  }, [performanceData.accuracy]);

  const generate = useCallback(() => {
    if (!examDate) { alert('Please select an exam date'); return; }
    setLoading(true);
    setTimeout(() => {
      const subjectsToStudy = selected.length > 0 ? selected : SUBJECTS;
      const rankedTopics = getRankedTopics(subjectsToStudy);
      const revisionSchedule = generateRevisionSchedule(rankedTopics, examDate);
      const smartDailyPlan = generateSmartDailyPlan(rankedTopics, revisionSchedule, examDate, hours);
      
      const displayDaily = smartDailyPlan.slice(0, 7).map(day => ({
        day: day.day,
        date: day.date,
        topic: day.schedule.length > 0 ? day.schedule[0].topic : 'Revision',
        duration: `${day.totalHours}h`,
        icon: day.schedule[0]?.icon || '📚',
        revision: day.schedule.find(s => s.type === 'revision')?.topic || 'Mixed Topics',
        fullSchedule: day.schedule,
      }));
      
      const totalWeeks = Math.ceil(smartDailyPlan.length / 7);
      
      setPlan({
        daily: displayDaily,
        fullDailyPlan: smartDailyPlan,
        rankedTopics,
        revisionSchedule,
        weeks: totalWeeks,
        totalHours: smartDailyPlan.reduce((sum, day) => sum + day.totalHours, 0),
        performanceMetrics: {
          overallAccuracy: getOverallAccuracy(),
          weakTopics: performanceData.weakTopics,
          totalTopics: rankedTopics.length,
          topPriorityTopics: rankedTopics.slice(0, 5),
        },
      });
      setLoading(false);
    }, 1200);
  }, [examDate, selected, hours, getRankedTopics, generateRevisionSchedule, generateSmartDailyPlan, getOverallAccuracy, performanceData.weakTopics]);

  return (
    <DashboardLayout title='AI Study Planner' subtitle='Generate a personalised GATE prep schedule'>
      <NotificationCenter />
      <div style={{ display: 'grid', gridTemplateColumns: plan ? 'minmax(360px, 380px) 1fr' : '1fr', gap: 24, marginBottom: 24 }}>
        <div style={{ height: 'fit-content', position: 'sticky', top: 20 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 20, boxShadow: '0 2px 16px rgba(0,0,0,0.05)', border: '1px solid #F0F9F4', marginBottom: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 800, color: '#1e293b', marginBottom: 16, marginTop: 0 }}>🎯 Goal Tracker</h3>
            <GoalTracker />
          </div>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: '0 2px 16px rgba(0,0,0,0.05)', border: '1px solid #F0F9F4' }}>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: '#1e293b', marginBottom: 20 }}>⚙️ Configure Your Plan</h2>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 6 }}>TARGET EXAM DATE</label>
              <input type='date' value={examDate} onChange={e => setExamDate(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 14 }}/>
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 6 }}>STUDY HOURS PER DAY: <span style={{ color: '#22C58B' }}>{hours}h</span></label>
              <input type='range' min={1} max={12} value={hours} onChange={e => setHours(+e.target.value)} style={{ width: '100%', accentColor: '#22C58B' }}/>
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 8 }}>SUBJECTS TO COVER</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {SUBJECTS.map(s => <button key={s} onClick={() => toggle(s)} style={{ padding: '5px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: 'pointer', border: 'none', background: selected.includes(s) ? '#22C58B' : '#F1F5F9', color: selected.includes(s) ? '#fff' : '#64748B', fontFamily: 'inherit', transition: 'all 0.2s' }}>{s}</button>)}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={generate} disabled={loading || !examDate} style={{ width: '100%', padding: '12px', fontSize: 14, opacity: !examDate ? 0.5 : 1, background: '#22C58B', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: !examDate ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}>
                {loading ? '⏳ Generating...' : '✨ Generate AI Plan'}
              </button>
              {plan && <button onClick={() => setFocusMode(true)} style={{ width: '100%', padding: '12px', fontSize: 14, background: '#3B82F6', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>🎯 Focus Mode</button>}
            </div>
          </div>
        </div>
        {plan && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 24 }}>
              {[
                { icon: '📅', label: 'Study Weeks', value: plan.weeks },
                { icon: '⏱️', label: 'Total Hours', value: `${plan.totalHours}h` },
                { icon: '📚', label: 'Subjects', value: selected.length || SUBJECTS.length },
              ].map((s, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 20, textAlign: 'center', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', border: '1px solid #F0F9F4' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                  <p style={{ fontSize: 24, fontWeight: 800, color: '#1e293b', margin: 0 }}>{s.value}</p>
                  <p style={{ fontSize: 12, color: '#94A3B8', margin: '8px 0 0 0' }}>{s.label}</p>
                </div>
              ))}
            </div>
            <div style={{ background: '#fff', borderRadius: 16, marginBottom: 20, boxShadow: '0 2px 16px rgba(0,0,0,0.05)', border: '1px solid #F0F9F4', padding: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1e293b', marginBottom: 16, marginTop: 0 }}>📊 Analytics Dashboard</h3>
              <AnalyticsDashboard />
            </div>
            <div style={{ background: '#fff', borderRadius: 16, marginBottom: 20, boxShadow: '0 2px 16px rgba(0,0,0,0.05)', border: '1px solid #F0F9F4', padding: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1e293b', marginBottom: 16, marginTop: 0 }}>📅 Daily Study Plan</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {plan.daily.map((d, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px', borderRadius: 12, background: '#F8FAFC', border: '1px solid #F0F9F4' }}>
                    <span style={{ fontSize: 22, width: 32 }}>{d.icon}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 700, color: '#1e293b', fontSize: 14, margin: 0 }}>{d.day}</p>
                      <p style={{ fontSize: 12, color: '#64748B', margin: '4px 0 0 0' }}>{d.topic}</p>
                      <div style={{ display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
                        <span style={{ background: '#D1FAE5', color: '#065F46', padding: '4px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700 }}>⏱️ {d.duration}</span>
                        <span style={{ background: '#DBEAFE', color: '#1E40AF', padding: '4px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700 }}>🔄 {d.revision}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 16px rgba(0,0,0,0.05)', border: '1px solid #F0F9F4', marginTop: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1e293b', marginBottom: 16, marginTop: 0 }}>📈 Progress Tracker</h3>
              <ProgressTracker />
            </div>
            <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 16px rgba(0,0,0,0.05)', border: '1px solid #F0F9F4', marginTop: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1e293b', marginBottom: 16, marginTop: 0 }}>🧪 Mock Test Dashboard</h3>
              <MockTestDashboard />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
