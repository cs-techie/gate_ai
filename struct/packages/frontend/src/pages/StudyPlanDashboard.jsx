import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { plannerAPI } from '../api';
import DashboardLayout from '../components/DashboardLayout';

// Modern Dark Theme
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
    padding: '24px 20px'
  },
  innerContainer: { maxWidth: 1400, margin: '0 auto' },
  
  // Header
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, gap: 12, flexWrap: 'wrap' },
  title: { fontSize: 32, fontWeight: 900, color: THEME.text, margin: 0, letterSpacing: '-0.5px' },
  subtitle: { fontSize: 14, color: THEME.textMuted, marginTop: 6, fontWeight: 500 },
  
  // Cards
  card: { 
    background: THEME.card,
    borderRadius: 16, 
    border: `1px solid ${THEME.border}`,
    padding: '24px',
    marginBottom: 24,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)'
  },
  
  // Grid
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20, marginBottom: 24 },
  gridWide: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 },
  
  // Stats
  stat: { 
    background: `linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)`,
    borderRadius: 16,
    border: `1px solid ${THEME.border}`,
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
  },
  statValue: { fontSize: 36, fontWeight: 900, color: THEME.text, margin: '8px 0 6px' },
  statLabel: { fontSize: 12, color: THEME.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' },
  
  // Buttons
  button: { 
    display: 'inline-flex', 
    alignItems: 'center', 
    gap: 8, 
    padding: '12px 24px', 
    background: THEME.primary, 
    color: '#fff', 
    border: 'none', 
    borderRadius: 12, 
    fontWeight: 600, 
    cursor: 'pointer', 
    fontSize: 14, 
    fontFamily: 'inherit',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
  },
  
  // Section Headers
  sectionHeader: { fontSize: 18, fontWeight: 700, color: THEME.text, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }
};


// Calendar Component
function StudyCalendar({ tasks, plan }) {
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
  const today = new Date().getDate();

  const getTaskColor = (date) => {
    const taskCount = tasks.filter(t => t.date === date).length;
    if (taskCount === 0) return THEME.border;
    if (taskCount === 1) return THEME.medium;
    if (taskCount === 2) return THEME.primary;
    return THEME.success;
  };

  return (
    <div style={S.card}>
      <div style={S.sectionHeader}>📅 Study Calendar</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 10 }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, color: THEME.textMuted, padding: '8px 0' }}>
            {day}
          </div>
        ))}
        
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const date = i + 1;
          const isToday = date === today;
          return (
            <div key={date} style={{
              padding: '8px',
              borderRadius: 10,
              background: isToday ? THEME.primary : `rgba(${getTaskColor(date).match(/\d+/g)?.join(',') || '255,255,255'}, 0.15)`,
              border: `2px solid ${getTaskColor(date)}`,
              textAlign: 'center',
              fontSize: 12,
              fontWeight: 600,
              color: isToday ? '#fff' : THEME.text,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}>
              {date}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Heatmap Component for Weak Topics
function WeakTopicHeatmap({ topics }) {
  return (
    <div style={S.card}>
      <div style={S.sectionHeader}>🔥 Weak Topics Intensity Map</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 8 }}>
        {topics.map((topic, i) => {
          const intensity = topic.confidence || 3;
          const color = intensity <= 2 ? THEME.weak : intensity <= 3 ? THEME.medium : THEME.strong;
          return (
            <div key={i} style={{
              padding: '12px',
              borderRadius: 10,
              background: `rgba(${color.match(/\d+/g)?.join(',') || '255,255,255'}, 0.15)`,
              border: `2px solid ${color}`,
              textAlign: 'center',
              fontSize: 11,
              fontWeight: 600,
              color: color
            }}>
              {topic.name}
              <div style={{ fontSize: 18, marginTop: 4 }}>{'▓'.repeat(intensity)}{'░'.repeat(5 - intensity)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Consistency Streak Component
function ConsistencyStreak({ completionTrend }) {
  const streak = completionTrend?.consecutive_days_completed || 0;
  return (
    <div style={{ ...S.stat, background: `linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(34, 197, 94, 0.15) 100%)` }}>
      <div style={S.statLabel}>🔥 Consistency Streak</div>
      <div style={{ fontSize: 42, fontWeight: 900, color: THEME.success, margin: '8px 0' }}>{streak}</div>
      <div style={{ fontSize: 12, color: THEME.textMuted }}>Days in a row</div>
    </div>
  );
}

export default function StudyPlanDashboard() {
  const { planId } = useParams();
  const [plan, setPlan] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [todayTasks, setTodayTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    loadPlan();
  }, [planId]);

  const loadPlan = async () => {
    try {
      const [planRes, analyticsRes, tasksRes] = await Promise.all([
        plannerAPI.getPlan(planId),
        plannerAPI.getAnalytics(planId),
        plannerAPI.getDayPlan(planId, new Date().toISOString().split('T')[0])
      ]);
      setPlan(planRes.data);
      setAnalytics(analyticsRes.data);
      setTodayTasks(tasksRes.data);
    } catch (err) {
      console.error('Error loading plan:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <DashboardLayout>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ width: 48, height: 48, border: '4px solid #E2E8F0', borderTopColor: '#3B82F6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
    </DashboardLayout>
  );

  if (!plan || !analytics) return (
    <DashboardLayout>
      <div style={{ padding: '32px 28px', textAlign: 'center', color: '#64748B' }}>Plan not found</div>
    </DashboardLayout>
  );

  const daysLeft = analytics.days_remaining;
  const completionRate = analytics.completion_rate;

  return (
    <DashboardLayout>
      <div style={S.container}>
        <div style={S.innerContainer}>
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, border: `4px solid ${THEME.border}`, borderTopColor: THEME.primary, borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 20px' }} />
                <p style={{ color: THEME.textMuted, fontSize: 14 }}>Loading your study dashboard...</p>
              </div>
            </div>
          ) : !plan || !analytics ? (
            <div style={{ ...S.card, textAlign: 'center', color: THEME.textMuted }}>❌ Plan not found</div>
          ) : (
            <>
              {/* Header */}
              <div style={S.header}>
                <div>
                  <h1 style={S.title}>📚 Your Study Dashboard</h1>
                  <p style={S.subtitle}>{analytics.days_remaining} days to exam • {analytics.completion_rate.toFixed(1)}% complete</p>
                </div>
                <button onClick={() => navigate(`/student/planner/${planId}/tasks`)} style={S.button}>
                  📋 All Tasks
                </button>
              </div>

              {/* Tab Navigation */}
              <div style={{ ...S.card, marginBottom: 24, padding: '12px', background: 'transparent', border: 'none', boxShadow: 'none', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['overview', 'analytics', 'calendar'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} type="button"
                    style={{ padding: '10px 20px', borderRadius: 12, border: `2px solid ${activeTab === tab ? THEME.primary : THEME.border}`, background: activeTab === tab ? `rgba(59, 130, 246, 0.15)` : 'transparent', color: activeTab === tab ? THEME.primary : THEME.textMuted, fontWeight: 600, cursor: 'pointer', fontSize: 13, fontFamily: 'inherit', transition: 'all 0.3s' }}>
                    {tab === 'overview' ? '📊 Overview' : tab === 'analytics' ? '📈 Analytics' : '📅 Calendar'}
                  </button>
                ))}
              </div>

              {/* ===== OVERVIEW TAB ===== */}
              {activeTab === 'overview' && (
                <>
                  {/* Key Metrics */}
                  <div style={S.grid}>
                    <div style={S.stat}>
                      <div style={S.statLabel}>Days Remaining</div>
                      <div style={S.statValue}>{analytics.days_remaining}</div>
                      <div style={{ fontSize: 11, color: THEME.textMuted }}>Exam: {plan.exam_date}</div>
                    </div>

                    <div style={S.stat}>
                      <div style={S.statLabel}>Overall Progress</div>
                      <div style={S.statValue}>{analytics.completion_rate.toFixed(1)}%</div>
                      <div style={{ fontSize: 11, color: THEME.textMuted }}>{analytics.completed_tasks}/{analytics.total_tasks} tasks done</div>
                    </div>

                    <div style={S.stat}>
                      <div style={S.statLabel}>Hours Invested</div>
                      <div style={S.statValue}>{analytics.total_hours_spent.toFixed(1)}</div>
                      <div style={{ fontSize: 11, color: THEME.textMuted }}>of {analytics.total_hours_allocated.toFixed(1)}h planned</div>
                    </div>

                    <ConsistencyStreak completionTrend={analytics.task_completion_trend} />
                  </div>

                  {/* Progress Bar */}
                  <div style={S.card}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: THEME.text, marginBottom: 12 }}>Overall Progress</div>
                    <div style={{ width: '100%', height: '24px', borderRadius: 12, background: `rgba(255, 255, 255, 0.05)`, border: `1px solid ${THEME.border}`, overflow: 'hidden' }}>
                      <div style={{ width: `${analytics.completion_rate}%`, height: '100%', background: `linear-gradient(90deg, ${THEME.primary} 0%, ${THEME.success} 100%)`, transition: 'width 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700 }}>
                        {analytics.completion_rate > 10 && `${analytics.completion_rate.toFixed(0)}%`}
                      </div>
                    </div>
                  </div>

                  {/* Weak Areas */}
                  {analytics.weak_areas && analytics.weak_areas.length > 0 && (
                    <div style={S.card}>
                      <div style={S.sectionHeader}>⚠️ Topics Needing Attention</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
                        {analytics.weak_areas.map((area, i) => (
                          <div key={i} style={{ background: `rgba(${THEME.weak.match(/\d+/g).join(',')}, 0.1)`, border: `2px solid ${THEME.weak}`, borderRadius: 12, padding: '14px', transition: 'all 0.3s' }}
                            onMouseEnter={e => e.currentTarget.style.background = `rgba(${THEME.weak.match(/\d+/g).join(',')}, 0.15)`}
                            onMouseLeave={e => e.currentTarget.style.background = `rgba(${THEME.weak.match(/\d+/g).join(',')}, 0.1)`}>
                            <div style={{ fontWeight: 700, color: THEME.weak, fontSize: 14, marginBottom: 6 }}>🔴 {area.topic}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: THEME.textMuted }}>
                              <span>Confidence: {area.confidence}/5</span>
                              <span>Revised {area.revision_count}x</span>
                            </div>
                            <div style={{ marginTop: 8, fontSize: 11, color: THEME.textMuted }}>Extra practice recommended</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Today's Tasks */}
                  <div style={S.card}>
                    <div style={S.sectionHeader}>📅 Today's Tasks ({todayTasks.length})</div>
                    
                    {todayTasks.length === 0 ? (
                      <div style={{ padding: '20px', textAlign: 'center', background: `rgba(16, 185, 129, 0.1)`, borderRadius: 12, color: THEME.success }}>
                        🎉 No tasks today. Great job staying ahead!
                      </div>
                    ) : (
                      <div style={{ display: 'grid', gap: 10 }}>
                        {todayTasks.map(task => (
                          <Link key={task.id} to={`/student/planner/${planId}/task/${task.id}`}
                            style={{ background: task.is_completed ? `rgba(16, 185, 129, 0.15)` : `rgba(255, 255, 255, 0.04)`, border: `2px solid ${task.is_completed ? THEME.success : THEME.border}`, borderRadius: 12, padding: '14px 16px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'all 0.3s' }}>
                            
                            <div style={{ width: 28, height: 28, borderRadius: '50%', border: `2px solid ${task.is_completed ? THEME.success : THEME.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: task.is_completed ? THEME.success : THEME.text, fontWeight: 700, fontSize: 16, background: task.is_completed ? `rgba(16, 185, 129, 0.2)` : 'transparent' }}>
                              {task.is_completed ? '✓' : task.task_type.charAt(0)}
                            </div>

                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 700, color: task.is_completed ? THEME.success : THEME.text, fontSize: 14 }}>
                                {task.subject} • {task.topic}
                              </div>
                              <div style={{ fontSize: 12, color: THEME.textMuted, marginTop: 2 }}>
                                {task.task_type} • {task.time_allocated_minutes} min • {task.difficulty}
                              </div>
                            </div>

                            <div style={{ fontSize: 11, fontWeight: 700, color: THEME.textMuted, background: `rgba(255, 255, 255, 0.08)`, padding: '6px 12px', borderRadius: 8 }}>
                              {task.is_completed ? 'DONE' : 'PENDING'}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Next 7 Days Preview */}
                  <div style={S.card}>
                    <div style={S.sectionHeader}>⏰ Week Overview</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 10 }}>
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} style={{ background: `rgba(59, 130, 246, 0.1)`, border: `1px solid ${THEME.border}`, borderRadius: 10, padding: '12px', textAlign: 'center' }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: THEME.textMuted, marginBottom: 6 }}>Day {i + 1}</div>
                          <div style={{ fontSize: 18, fontWeight: 900, color: THEME.primary }}>{Math.floor(Math.random() * 4) + 1}</div>
                          <div style={{ fontSize: 10, color: THEME.textMuted, marginTop: 4 }}>tasks</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* ===== ANALYTICS TAB ===== */}
              {activeTab === 'analytics' && (
                <>
                  {/* Study Hours Chart Placeholder */}
                  <div style={S.card}>
                    <div style={S.sectionHeader}>📊 Weekly Study Hours</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 12, height: '220px', alignItems: 'flex-end' }}>
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                        const height = Math.floor(Math.random() * 80) + 20;
                        return (
                          <div key={day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                            <div style={{ width: '100%', height: `${height}%`, background: `linear-gradient(180deg, ${THEME.primary} 0%, ${THEME.success} 100%)`, borderRadius: '8px 8px 0 0', transition: 'all 0.3s' }} />
                            <div style={{ fontSize: 11, fontWeight: 700, color: THEME.textMuted, marginTop: 8 }}>{day}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Weak Topic Heatmap */}
                  <WeakTopicHeatmap topics={analytics.weak_areas || []} />

                  {/* Performance Metrics */}
                  <div style={S.grid}>
                    <div style={{ ...S.stat, background: `linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)` }}>
                      <div style={S.statLabel}>Tasks Completed</div>
                      <div style={{ ...S.statValue, color: THEME.success }}>{analytics.completed_tasks}</div>
                      <div style={{ fontSize: 11, color: THEME.textMuted }}>this month</div>
                    </div>

                    <div style={{ ...S.stat, background: `linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(234, 179, 8, 0.1) 100%)` }}>
                      <div style={S.statLabel}>Accuracy Rate</div>
                      <div style={{ ...S.statValue, color: THEME.medium }}>
                        {((analytics.completed_tasks / analytics.total_tasks) * 100).toFixed(0)}%
                      </div>
                      <div style={{ fontSize: 11, color: THEME.textMuted }}>on target</div>
                    </div>

                    <div style={{ ...S.stat, background: `linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)` }}>
                      <div style={S.statLabel}>Revision Cycles</div>
                      <div style={{ ...S.statValue, color: '#A855F7' }}>{Math.floor(analytics.completed_tasks / 10)}</div>
                      <div style={{ fontSize: 11, color: THEME.textMuted }}>completed</div>
                    </div>
                  </div>
                </>
              )}

              {/* ===== CALENDAR TAB ===== */}
              {activeTab === 'calendar' && (
                <>
                  <StudyCalendar tasks={todayTasks} plan={plan} />
                  
                  <div style={S.card}>
                    <div style={S.sectionHeader}>🎯 Drag-and-Drop Rescheduling (Coming Soon)</div>
                    <div style={{ padding: '24px', background: `rgba(59, 130, 246, 0.1)`, borderRadius: 12, border: `2px dashed ${THEME.primary}`, textAlign: 'center', color: THEME.primary }}>
                      📌 Interactive calendar with drag-and-drop task rescheduling will be available soon
                    </div>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
                <button onClick={() => location.reload()} style={S.button}>
                  🔄 Refresh
                </button>
                <button onClick={() => plannerAPI.rescheduleMissed(planId).then(() => location.reload())} style={{ ...S.button, background: THEME.warning, boxShadow: `0 4px 12px rgba(245, 158, 11, 0.3)` }}>
                  🔀 Reschedule Missed
                </button>
                <button onClick={() => navigate(`/student/planner/${planId}/subjects`)} style={{ ...S.button, background: '#8B5CF6', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)' }}>
                  📚 View Subjects
                </button>
                <button onClick={() => navigate('/student/planner')} style={{ ...S.button, background: `rgba(255, 255, 255, 0.1)`, border: `2px solid ${THEME.border}`, boxShadow: 'none' }}>
                  ← Back to Plans
                </button>
              </div>

              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
