import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { plannerAPI } from '../api';

const GATE_STREAMS = [
  { name: 'Computer Science (CS)', color: '#3B82F6', subjects: {
    'Programming & Data Structures': ['Arrays', 'Linked Lists', 'Stacks & Queues', 'Trees', 'Graphs', 'Hash Tables'],
    'Algorithms': ['Sorting', 'Searching', 'Dynamic Programming', 'Greedy', 'Graph Algorithms', 'NP Completeness'],
    'Operating Systems': ['Process Management', 'Deadlocks', 'Memory Management', 'File Systems', 'Synchronization'],
    'Database Management': ['ER Model', 'Relational Model', 'SQL', 'Normalization', 'Transactions', 'Indexing'],
    'Networks': ['OSI Model', 'TCP/IP', 'Routing', 'Application Layer', 'Network Security'],
    'Discrete Mathematics': ['Sets & Relations', 'Logic', 'Graph Theory', 'Combinatorics', 'Number Theory'],
    'Digital Logic': ['Boolean Algebra', 'Combinational Circuits', 'Sequential Circuits', 'Memory'],
    'Theory of Computation': ['Finite Automata', 'Context Free Grammar', 'Turing Machine', 'Computability'],
    'Compiler Design': ['Lexical Analysis', 'Parsing', 'Semantic Analysis', 'Code Generation'],
    'Computer Architecture': ['CPU Design', 'Memory Hierarchy', 'I/O Systems', 'Pipelining']
  }},
  { name: 'Electronics (EC)', color: '#8B5CF6', subjects: {
    'Analog Circuits': ['Diodes', 'Transistors', 'Amplifiers', 'Feedback', 'Oscillators'],
    'Digital Circuits': ['Number Systems', 'Logic Gates', 'Combinational', 'Sequential'],
    'Electromagnetics': ['Vector Calculus', 'Electrostatics', 'Magnetostatics', 'Wave Propagation'],
    'Signal Processing': ['Signals', 'Systems', 'Fourier Analysis', 'Filters', 'DSP'],
    'Control Systems': ['Transfer Functions', 'Stability', 'Root Locus', 'Bode Plot', 'State Space'],
    'Microprocessors': ['8085/8086', 'Assembly', 'Interrupts', 'Memory'],
    'Communications': ['Analog', 'Digital', 'Modulation', 'Information Theory']
  }},
  { name: 'Mechanical (ME)', color: '#EC4899', subjects: {
    'Thermodynamics': ['First Law', 'Second Law', 'Cycles', 'Entropy'],
    'Fluid Mechanics': ['Properties', 'Statics', 'Kinematics', 'Dynamics', 'Turbines'],
    'Strength of Materials': ['Stress & Strain', 'Bending', 'Torsion', 'Deflection'],
    'Theory of Machines': ['Kinematics', 'Dynamics', 'Mechanisms', 'Vibration'],
    'Manufacturing': ['Casting', 'Welding', 'Machining', 'Forming', 'Assembly'],
    'Heat Transfer': ['Conduction', 'Convection', 'Radiation', 'Heat Exchangers'],
    'Dynamics': ['Kinematics', 'Forces', 'Work-Energy', 'Momentum']
  }},
  { name: 'Electrical (EE)', color: '#F59E0B', subjects: {
    'Power Systems': ['Generation', 'Transmission', 'Distribution', 'Protection'],
    'Machines': ['DC Machines', 'AC Machines', 'Transformers'],
    'Control Systems': ['Transfer Functions', 'Feedback', 'Stability', 'State Space'],
    'Electromagnetics': ['Electrostatics', 'Magnetostatics', 'Maxwell Equations'],
    'Circuit Theory': ['Network Analysis', 'Laplace', 'Fourier', 'Two Port Networks'],
    'Signals & Systems': ['Continuous', 'Discrete', 'Convolution', 'Transforms']
  }},
];

// Modern SaaS Theme Colors
const THEME = {
  bg: '#0F172A',
  surface: '#1E293B',
  card: '#1E293B',
  border: '#334155',
  text: '#E2E8F0',
  textMuted: '#94A3B8',
  primary: '#3B82F6',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  weak: '#EF4444',
  medium: '#F59E0B',
  strong: '#10B981',
};

const S = {
  // Layout
  container: { 
    background: `linear-gradient(135deg, ${THEME.bg} 0%, #1a2d4d 100%)`,
    minHeight: '100vh', 
    padding: '24px 20px',
  },
  innerContainer: { maxWidth: 1200, margin: '0 auto' },
  
  // Header
  header: { marginBottom: 40 },
  title: { fontSize: 32, fontWeight: 900, color: THEME.text, margin: 0, letterSpacing: '-0.5px' },
  subtitle: { fontSize: 15, color: THEME.textMuted, marginTop: 8, fontWeight: 500 },
  
  // Grid Layouts
  twoCol: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 24 },
  threeCol: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 },
  
  // Cards
  card: { 
    background: THEME.card,
    borderRadius: 16, 
    border: `1px solid ${THEME.border}`,
    padding: '28px',
    marginBottom: 24,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)'
  },
  cardCompact: {
    background: THEME.card,
    borderRadius: 12,
    border: `1px solid ${THEME.border}`,
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  },
  
  // Sections
  sectionHeader: { fontSize: 18, fontWeight: 700, color: THEME.text, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 },
  
  // Forms
  label: { fontSize: 13, fontWeight: 600, color: THEME.textMuted, marginBottom: 8, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' },
  input: { 
    width: '100%', 
    padding: '12px 16px', 
    border: `1.5px solid ${THEME.border}`,
    borderRadius: 12, 
    fontSize: 14, 
    color: THEME.text, 
    background: `rgba(255, 255, 255, 0.05)`,
    outline: 'none', 
    boxSizing: 'border-box', 
    fontFamily: 'inherit',
    transition: 'all 0.3s ease',
    marginBottom: 16
  },
  
  // Buttons
  button: { 
    padding: '12px 24px', 
    background: THEME.primary, 
    color: '#fff', 
    border: 'none', 
    borderRadius: 12, 
    fontWeight: 600, 
    cursor: 'pointer', 
    fontSize: 14, 
    fontFamily: 'inherit',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
  },
  buttonSmall: {
    padding: '8px 16px',
    background: `rgba(59, 130, 246, 0.1)`,
    color: THEME.primary,
    border: `1px solid ${THEME.primary}`,
    borderRadius: 10,
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: 12,
    fontFamily: 'inherit',
    transition: 'all 0.3s ease'
  },
  
  // Toggle & Checkbox
  toggle: { display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', userSelect: 'none' },
  checkbox: { cursor: 'pointer' },
  
  // Alerts
  error: { 
    background: `rgba(239, 68, 68, 0.1)`,
    border: `1.5px solid ${THEME.danger}`,
    borderRadius: 12, 
    padding: '14px 18px', 
    color: '#FCA5A5', 
    fontSize: 13, 
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    gap: 10
  },
  success: {
    background: `rgba(16, 185, 129, 0.1)`,
    border: `1.5px solid ${THEME.success}`,
    borderRadius: 12,
    padding: '14px 18px',
    color: '#A7F3D0',
    fontSize: 13,
    marginBottom: 20
  },
  
  // Tags & Badges
  badge: (color) => ({ 
    fontSize: 11, 
    background: `rgba(${color}, 0.2)`, 
    color: color,
    padding: '4px 12px', 
    borderRadius: 20, 
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  }),
  
  // Collapsible
  collapsible: { marginBottom: 12 },
  collapsibleHeader: {
    background: `rgba(255, 255, 255, 0.04)`,
    border: `1px solid ${THEME.border}`,
    borderRadius: 12,
    padding: '14px 16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.3s ease',
    fontWeight: 600,
    color: THEME.text
  },
  collapsibleContent: {
    background: `rgba(255, 255, 255, 0.02)`,
    border: `1px solid ${THEME.border}`,
    borderTop: 'none',
    borderRadius: '0 0 12px 12px',
    padding: '16px',
  },
};

// Subject Configuration Component
function SubjectTopicSelector({ stream, selectedTopics, setSelectedTopics }) {
  const [expandedSubjects, setExpandedSubjects] = useState({});
  const streamObj = GATE_STREAMS.find(s => s.name === stream);
  
  if (!streamObj) return null;

  const toggleSubject = (subject) => {
    setExpandedSubjects(prev => ({ ...prev, [subject]: !prev[subject] }));
  };

  const toggleTopic = (subject, topic) => {
    const key = `${subject}|${topic}`;
    setSelectedTopics(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const selectAllTopics = (subject, select) => {
    const topics = streamObj.subjects[subject] || [];
    setSelectedTopics(prev => {
      const updated = { ...prev };
      topics.forEach(topic => {
        const key = `${subject}|${topic}`;
        updated[key] = select;
      });
      return updated;
    });
  };

  return (
    <div>
      {Object.entries(streamObj.subjects).map(([subject, topics]) => {
        const topicCount = topics.filter(t => selectedTopics[`${subject}|${t}`]).length;
        return (
          <div key={subject} style={S.collapsible}>
            <div style={{ ...S.collapsibleHeader, background: expandedSubjects[subject] ? `rgba(${streamObj.color.match(/\d+/g).join(',')}, 0.15)` : S.collapsibleHeader.background }} onClick={() => toggleSubject(subject)}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: THEME.text }}>{subject}</div>
                <div style={{ fontSize: 12, color: THEME.textMuted, marginTop: 2 }}>{topicCount} of {topics.length} topics selected</div>
              </div>
              <span style={{ fontSize: 18, transition: 'transform 0.3s' }}>{expandedSubjects[subject] ? '▼' : '▶'}</span>
            </div>
            {expandedSubjects[subject] && (
              <div style={S.collapsibleContent}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${THEME.border}` }}>
                  <button type="button" onClick={() => selectAllTopics(subject, true)} style={{ ...S.buttonSmall }}>✓ Select All</button>
                  <button type="button" onClick={() => selectAllTopics(subject, false)} style={{ ...S.buttonSmall, background: `rgba(239, 68, 68, 0.1)`, color: THEME.danger, borderColor: THEME.danger }}>✕ Clear</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 10 }}>
                  {topics.map(topic => {
                    const isSelected = selectedTopics[`${subject}|${topic}`];
                    return (
                      <label key={topic} style={{ ...S.toggle, padding: '10px', background: isSelected ? `rgba(59, 130, 246, 0.15)` : `rgba(255, 255, 255, 0.03)`, borderRadius: 10, border: `1px solid ${isSelected ? THEME.primary : THEME.border}`, transition: 'all 0.3s' }}>
                        <input type="checkbox" checked={isSelected || false} onChange={() => toggleTopic(subject, topic)} style={S.checkbox} />
                        <span style={{ fontSize: 12, fontWeight: 500, flex: 1 }}>{topic}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Confidence Slider Component
function ConfidenceSlider({ value, onChange, label }) {
  const getColor = (v) => {
    if (v <= 2) return THEME.weak;
    if (v <= 3) return THEME.medium;
    return THEME.strong;
  };

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <label style={S.label}>{label}</label>
        <span style={{ fontSize: 18, fontWeight: 700, color: getColor(value) }}>{['', '😢', '😐', '😊', '😄', '🌟'][value]}</span>
      </div>
      <input type="range" min="1" max="5" value={value} onChange={(e) => onChange(parseInt(e.target.value))} style={{ 
        width: '100%', 
        height: '6px', 
        borderRadius: '3px', 
        background: `linear-gradient(to right, ${THEME.weak} 0%, ${THEME.medium} 50%, ${THEME.strong} 100%)`,
        outline: 'none',
        cursor: 'pointer'
      }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: THEME.textMuted, marginTop: 4 }}>
        <span>Weak</span><span>Medium</span><span>Strong</span>
      </div>
    </div>
  );
}

// AI Features Panel Component
function AIFeaturesPanel({ onGenerate }) {
  const [aiQuery, setAiQuery] = useState('');

  return (
    <div style={S.card}>
      <div style={S.sectionHeader}>🤖 AI Study Assistant</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, marginBottom: 16 }}>
        <input type="text" placeholder="Ask AI: doubts, MCQs, strategy..." value={aiQuery} onChange={(e) => setAiQuery(e.target.value)} style={S.input} />
        <button type="button" onClick={() => { if (aiQuery) onGenerate(aiQuery); }} style={{ ...S.button, width: 'auto', padding: '12px 24px' }}>Send</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {['📚 Explain Topic', '🎯 Generate MCQs', '📈 Study Strategy'].map(btn => (
          <button key={btn} type="button" onClick={() => onGenerate(btn.split(' ').slice(1).join(' '))} style={{ ...S.buttonSmall, padding: '10px', fontSize: 12, fontWeight: 600, textAlign: 'center' }}>{btn}</button>
        ))}
      </div>
    </div>
  );
}

export default function CreateStudyPlan() {
  const [stream, setStream] = useState('');
  const [examDate, setExamDate] = useState('');
  const [dailyHours, setDailyHours] = useState(4);
  const [targetRank, setTargetRank] = useState('');
  const [attemptType, setAttemptType] = useState('First Attempt');
  const [currentLevel, setCurrentLevel] = useState('Intermediate');
  const [preferredTime, setPreferredTime] = useState('Flexible');
  const [completedPercentage, setCompletedPercentage] = useState(0);
  const [previousScore, setPreviousScore] = useState('');
  const [accuracy, setAccuracy] = useState('');
  const [selectedTopics, setSelectedTopics] = useState({});
  const [topicConfidence, setTopicConfidence] = useState({});
  const [weakTopics, setWeakTopics] = useState({});
  const [completedYesterday, setCompletedYesterday] = useState('yes');
  const [yesterdayDifficulty, setYesterdayDifficulty] = useState('Medium');
  const [studyMode, setStudyMode] = useState('Balanced');
  const [autoReschedule, setAutoReschedule] = useState(true);
  const [burnoutPrevention, setBurnoutPrevention] = useState(true);
  const [aiRecommendations, setAiRecommendations] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(true);
  const [mockAlerts, setMockAlerts] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleTopicConfidence = (topic, level) => {
    setTopicConfidence(prev => ({ ...prev, [topic]: level }));
  };

  const toggleWeakTopic = (topic, isWeak) => {
    setWeakTopics(prev => ({ ...prev, [topic]: isWeak }));
  };

  const handleAIQuery = (query) => {
    setSuccess(`📌 Feature incoming! AI Query: "${query}"`);
    setTimeout(() => setSuccess(''), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!stream) { setError('⚠️ Please select a GATE stream'); return; }
    if (!examDate) { setError('⚠️ Please set your exam date'); return; }
    if (Object.values(selectedTopics).filter(Boolean).length === 0) { setError('⚠️ Select at least 5 topics'); return; }
    if (dailyHours < 2 || dailyHours > 10) { setError('⚠️ Daily hours should be 2-10'); return; }

    setLoading(true);

    try {
      // Transform selected topics to subjects format
      const subjects = {};
      Object.entries(selectedTopics).forEach(([key, isSelected]) => {
        if (isSelected) {
          const [subject, topic] = key.split('|');
          if (!subjects[subject]) {
            subjects[subject] = [];
          }
          subjects[subject].push({
            name: topic,
            confidence_level: topicConfidence[key] || 3,
            is_weak: weakTopics[key] || false
          });
        }
      });

      const planData = {
        exam_date: examDate,
        daily_hours: parseInt(dailyHours),
        target_rank: targetRank ? parseInt(targetRank) : null,
        current_level: currentLevel,
        attempt_type: attemptType,
        preferred_time: preferredTime,
        completed_percentage: parseInt(completedPercentage),
        previous_score: previousScore ? parseInt(previousScore) : null,
        accuracy_percentage: accuracy ? parseInt(accuracy) : null,
        subjects: Object.entries(subjects).map(([subjectName, topics]) => ({
          subject_name: subjectName,
          confidence_level: topics.reduce((sum, t) => sum + t.confidence_level, 0) / topics.length,
          is_weak: topics.some(t => t.is_weak),
          topics: topics,
          auto_reschedule: autoReschedule,
          burnout_prevention: burnoutPrevention,
          ai_recommendations: aiRecommendations,
          daily_reminders: dailyReminders,
          mock_alerts: mockAlerts,
          study_mode: studyMode
        }))
      };

      const res = await plannerAPI.createPlan(planData);
      setSuccess('✓ Study plan created successfully! Generating your personalized schedule...');
      setTimeout(() => navigate(`/student/planner/${res.data.id}`), 1500);
    } catch (err) {
      setError('❌ ' + (err.response?.data?.detail || 'Failed to create plan'));
    } finally {
      setLoading(false);
    }
  };

  const daysUntilExam = examDate ? Math.floor((new Date(examDate) - new Date()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div style={S.container}>
      <div style={S.innerContainer}>
        {/* Header */}
        <div style={S.header}>
          <h1 style={S.title}>🚀 Create Your AI Study Plan</h1>
          <p style={S.subtitle}>Generate a personalized, adaptive study schedule for GATE 2026 with intelligent pacing and weakness-focused learning</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div style={S.error}>❌ {error}</div>}
          {success && <div style={S.success}>✅ {success}</div>}

          {/* ===== STEP 1: BASIC EXAM INFO ===== */}
          <div style={S.card}>
            <div style={S.sectionHeader}>📋 Exam Details & Goals</div>
            
            <div style={S.twoCol}>
              <div>
                <label style={S.label}>GATE Stream *</label>
                <select value={stream} onChange={(e) => setStream(e.target.value)} style={S.input}>
                  <option value="">Choose your engineering stream</option>
                  {GATE_STREAMS.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                </select>
              </div>

              <div>
                <label style={S.label}>Exam Date *</label>
                <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} style={S.input} />
                {daysUntilExam > 0 && <p style={{ fontSize: 12, color: THEME.primary, marginTop: '-12px', marginBottom: 16 }}>⏱️ {daysUntilExam} days remaining</p>}
              </div>
            </div>

            <div style={S.twoCol}>
              <div>
                <label style={S.label}>Daily Study Hours *</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 16 }}>
                  {[2, 4, 6, 8, 10].map(h => (
                    <button key={h} type="button" onClick={() => setDailyHours(h)} 
                      style={{ ...S.button, background: dailyHours === h ? THEME.primary : `rgba(255, 255, 255, 0.1)`, padding: '12px 0', fontSize: 12, boxShadow: 'none' }}>
                      {h}h
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={S.label}>Target Rank (Optional)</label>
                <input type="number" value={targetRank} onChange={(e) => setTargetRank(e.target.value)} placeholder="e.g., 500 or 1000" style={S.input} />
              </div>
            </div>
          </div>

          {/* ===== STEP 2: ONBOARDING PANEL ===== */}
          <div style={S.card}>
            <div style={S.sectionHeader}>👤 Your Background</div>
            
            <div style={S.twoCol}>
              <div>
                <label style={S.label}>Current Level *</label>
                <div style={S.threeCol}>
                  {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                    <button key={level} type="button" onClick={() => setCurrentLevel(level)}
                      style={{ ...S.button, background: currentLevel === level ? THEME.primary : `rgba(255, 255, 255, 0.08)`, color: THEME.text, border: `2px solid ${currentLevel === level ? THEME.primary : 'transparent'}`, fontSize: 12, padding: '10px', boxShadow: 'none' }}>
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={S.label}>Attempt Type *</label>
                <div style={S.threeCol}>
                  {['First Attempt', 'Repeater'].map(type => (
                    <button key={type} type="button" onClick={() => setAttemptType(type)}
                      style={{ ...S.button, background: attemptType === type ? THEME.primary : `rgba(255, 255, 255, 0.08)`, color: THEME.text, border: `2px solid ${attemptType === type ? THEME.primary : 'transparent'}`, fontSize: 12, padding: '10px', boxShadow: 'none' }}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={S.label}>Preferred Study Time</label>
                <div style={S.threeCol}>
                  {['Morning', 'Evening', 'Flexible'].map(time => (
                    <button key={time} type="button" onClick={() => setPreferredTime(time)}
                      style={{ ...S.button, background: preferredTime === time ? THEME.primary : `rgba(255, 255, 255, 0.08)`, color: THEME.text, border: `2px solid ${preferredTime === time ? THEME.primary : 'transparent'}`, fontSize: 12, padding: '10px', boxShadow: 'none' }}>
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ===== STEP 3: STUDY PROGRESS INPUT ===== */}
          <div style={S.card}>
            <div style={S.sectionHeader}>📊 Current Progress & Performance</div>
            
            <div style={S.twoCol}>
              <div>
                <label style={S.label}>Syllabus Completed (%)</label>
                <input type="range" min="0" max="100" value={completedPercentage} onChange={(e) => setCompletedPercentage(e.target.value)} style={{ width: '100%', marginBottom: 8, cursor: 'pointer' }} />
                <div style={{ fontSize: 14, fontWeight: 700, color: THEME.primary, marginBottom: 16 }}>{completedPercentage}%</div>
              </div>

              <div>
                <label style={S.label}>Previous Mock Test Score (Optional)</label>
                <input type="number" value={previousScore} onChange={(e) => setPreviousScore(e.target.value)} placeholder="Out of 100" style={S.input} />
              </div>

              <div>
                <label style={S.label}>Accuracy Percentage (Optional)</label>
                <input type="number" value={accuracy} onChange={(e) => setAccuracy(e.target.value)} min="0" max="100" placeholder="0-100%" style={S.input} />
              </div>
            </div>
          </div>

          {/* ===== STEP 4: DAILY FEEDBACK ===== */}
          <div style={S.card}>
            <div style={S.sectionHeader}>📝 Yesterday's Progress</div>
            
            <div style={S.twoCol}>
              <div>
                <label style={S.label}>Did you complete yesterday's plan?</label>
                <div style={S.threeCol}>
                  {['yes', 'partially', 'no'].map(opt => (
                    <button key={opt} type="button" onClick={() => setCompletedYesterday(opt)}
                      style={{ ...S.button, background: completedYesterday === opt ? THEME.primary : `rgba(255, 255, 255, 0.08)`, color: THEME.text, border: `2px solid ${completedYesterday === opt ? THEME.primary : 'transparent'}`, fontSize: 12, padding: '10px', boxShadow: 'none', textTransform: 'capitalize' }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={S.label}>Difficulty Level Faced</label>
                <div style={S.threeCol}>
                  {['Easy', 'Medium', 'Hard'].map(diff => (
                    <button key={diff} type="button" onClick={() => setYesterdayDifficulty(diff)}
                      style={{ ...S.button, background: yesterdayDifficulty === diff ? THEME.primary : `rgba(255, 255, 255, 0.08)`, color: THEME.text, border: `2px solid ${yesterdayDifficulty === diff ? THEME.primary : 'transparent'}`, fontSize: 12, padding: '10px', boxShadow: 'none' }}>
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ===== STEP 5: STUDY MODE ===== */}
          <div style={S.card}>
            <div style={S.sectionHeader}>🎯 Preferred Study Mode</div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {['Concept Mode', 'Practice Mode', 'Revision Mode', 'Mock Mode', 'Balanced', 'Intensive'].map(mode => (
                <button key={mode} type="button" onClick={() => setStudyMode(mode)}
                  style={{ ...S.button, background: studyMode === mode.split(' ')[0] ? THEME.primary : `rgba(255, 255, 255, 0.08)`, color: THEME.text, border: `2px solid ${studyMode === mode.split(' ')[0] ? THEME.primary : 'transparent'}`, padding: '12px', boxShadow: 'none' }}>
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* ===== STEP 6: SUBJECT & TOPIC CONFIGURATION ===== */}
          {stream && (
            <div style={S.card}>
              <div style={S.sectionHeader}>📚 Topics & Confidence Levels</div>
              <p style={{ fontSize: 13, color: THEME.textMuted, marginBottom: 20 }}>Select topics you want to focus on and rate your confidence (1 = Weak, 5 = Strong)</p>
              
              <SubjectTopicSelector stream={stream} selectedTopics={selectedTopics} setSelectedTopics={setSelectedTopics} />

              {/* Topic Confidence & Weakness Input */}
              {Object.entries(selectedTopics).filter(([_, selected]) => selected).length > 0 && (
                <div style={{ marginTop: 24, paddingTop: 24, borderTop: `1px solid ${THEME.border}` }}>
                  <h3 style={{ ...S.sectionHeader, fontSize: 16 }}>💪 Confidence & Weakness Configuration</h3>
                  <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: 12 }}>
                    {Object.entries(selectedTopics).filter(([_, selected]) => selected).map(([topic]) => (
                      <div key={topic} style={{ marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid ${THEME.border}` }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: THEME.text, marginBottom: 12 }}>{topic}</div>
                        
                        <ConfidenceSlider value={topicConfidence[topic] || 3} onChange={(v) => handleTopicConfidence(topic, v)} label="Confidence Level" />
                        
                        <label style={{ ...S.toggle, padding: '12px', background: `rgba(255, 255, 255, 0.04)`, borderRadius: 10, border: `1px solid ${THEME.border}` }}>
                          <input type="checkbox" checked={weakTopics[topic] || false} onChange={(e) => toggleWeakTopic(topic, e.target.checked)} style={S.checkbox} />
                          <span style={{ fontWeight: 600, flex: 1 }}>⚠️ Mark as weak topic (needs extra focus)</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===== STEP 7: AI FEATURES PANEL ===== */}
          <AIFeaturesPanel onGenerate={handleAIQuery} />

          {/* ===== STEP 8: SMART FEATURES & SETTINGS ===== */}
          <div style={S.card}>
            <div style={S.sectionHeader}>⚙️ Smart Features & Preferences</div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { state: autoReschedule, setState: setAutoReschedule, label: 'Auto-reschedule Missed Tasks', icon: '🔄' },
                { state: burnoutPrevention, setState: setBurnoutPrevention, label: 'Burnout Prevention', icon: '🛡️' },
                { state: aiRecommendations, setState: setAiRecommendations, label: 'AI Recommendations', icon: '🤖' },
                { state: dailyReminders, setState: setDailyReminders, label: 'Daily Reminders', icon: '🔔' },
                { state: mockAlerts, setState: setMockAlerts, label: 'Mock Test Alerts', icon: '📢' },
              ].map(({ state, setState, label, icon }) => (
                <label key={label} style={{ ...S.toggle, padding: '14px', background: `rgba(255, 255, 255, 0.04)`, borderRadius: 10, border: `1px solid ${THEME.border}` }}>
                  <input type="checkbox" checked={state} onChange={(e) => setState(e.target.checked)} style={S.checkbox} />
                  <span style={{ fontWeight: 600, flex: 1 }}>{icon} {label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* ===== EXPORT & SUBMIT ===== */}
          <div style={S.card}>
            <div style={S.sectionHeader}>🎁 Final Steps</div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 20 }}>
              {['📥 Download PDF', '📤 Share Plan'].map(btn => (
                <button key={btn} type="button" onClick={() => setSuccess(`✨ ${btn} feature coming soon!`)}
                  style={{ ...S.buttonSmall, padding: '12px', border: `2px solid ${THEME.primary}`, background: `rgba(59, 130, 246, 0.1)` }}>
                  {btn}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button type="submit" disabled={loading} 
                style={{ ...S.button, flex: 1, background: loading ? THEME.textMuted : THEME.success, cursor: loading ? 'not-allowed' : 'pointer', padding: '14px 24px' }}>
                {loading ? '⏳ Generating Your Plan...' : '✨ Create & Generate Study Plan'}
              </button>
              <button type="button" onClick={() => navigate(-1)} 
                style={{ ...S.button, background: `rgba(255, 255, 255, 0.1)`, border: `2px solid ${THEME.border}`, boxShadow: 'none', padding: '14px 24px' }}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
