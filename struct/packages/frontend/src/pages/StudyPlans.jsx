import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
};

const S = {
  container: { 
    background: `linear-gradient(135deg, ${THEME.bg} 0%, #1a2d4d 100%)`,
    minHeight: '100vh', 
    padding: '24px 20px'
  },
  innerContainer: { maxWidth: 1400, margin: '0 auto' },
  
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, gap: 12, flexWrap: 'wrap' },
  title: { fontSize: 32, fontWeight: 900, color: THEME.text, margin: 0, letterSpacing: '-0.5px' },
  subtitle: { fontSize: 14, color: THEME.textMuted, marginTop: 8, fontWeight: 500 },
  
  button: { 
    display: 'inline-flex', 
    alignItems: 'center', 
    gap: 8, 
    padding: '12px 24px', 
    background: THEME.success, 
    color: '#fff', 
    border: 'none', 
    borderRadius: 12, 
    fontWeight: 600, 
    cursor: 'pointer', 
    fontSize: 14, 
    fontFamily: 'inherit',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
  },
  
  card: { 
    background: THEME.card,
    borderRadius: 16, 
    border: `1px solid ${THEME.border}`,
    padding: '24px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    color: 'inherit'
  },
  
  emptyState: { 
    textAlign: 'center', 
    padding: '64px 32px',
    background: THEME.card,
    borderRadius: 16,
    border: `2px dashed ${THEME.border}`
  }
};

export default function StudyPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const res = await plannerAPI.getPlans();
      setPlans(res.data);
    } catch (err) {
      console.error('Error loading plans:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPlans = plans.filter(p => {
    if (filter === 'active') return p.is_active;
    if (filter === 'completed') return p.completed_percentage === 100;
    return true;
  });

  if (loading) return (
    <DashboardLayout>
      <div style={{ ...S.container, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, border: `4px solid ${THEME.border}`, borderTopColor: THEME.primary, borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 20px' }} />
          <p style={{ color: THEME.textMuted, fontSize: 14 }}>Loading your study plans...</p>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div style={S.container}>
        <div style={S.innerContainer}>
          {/* Header */}
          <div style={S.header}>
            <div>
              <h1 style={S.title}>📚 Your Study Plans</h1>
              <p style={S.subtitle}>Manage and track all your personalized exam preparation schedules</p>
            </div>
            <button onClick={() => navigate('/student/planner/create')} style={S.button}>
              ✨ Create New Plan
            </button>
          </div>

          {/* Filter Tabs */}
          {plans.length > 0 && (
            <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
              {['all', 'active', 'completed'].map(f => (
                <button key={f} onClick={() => setFilter(f)} type="button"
                  style={{ 
                    padding: '10px 20px', 
                    borderRadius: 12, 
                    border: `2px solid ${filter === f ? THEME.primary : THEME.border}`,
                    background: filter === f ? `rgba(59, 130, 246, 0.15)` : 'transparent',
                    color: filter === f ? THEME.primary : THEME.textMuted,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: 13,
                    fontFamily: 'inherit',
                    transition: 'all 0.3s',
                    textTransform: 'capitalize'
                  }}>
                  {f === 'all' ? '📋 All Plans' : f === 'active' ? '🔄 Active' : '✅ Completed'} ({filter === 'all' ? plans.length : filter === 'active' ? plans.filter(p => p.is_active).length : plans.filter(p => p.completed_percentage === 100).length})
                </button>
              ))}
            </div>
          )}

          {/* Plans Grid */}
          {filteredPlans.length === 0 ? (
            <div style={S.emptyState}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>📋</div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: THEME.text, margin: '0 0 12px' }}>No Study Plans Yet</h2>
              <p style={{ fontSize: 14, color: THEME.textMuted, margin: '0 0 24px' }}>Create your first AI-powered study plan to begin your exam preparation journey</p>
              <button onClick={() => navigate('/student/planner/create')} style={S.button}>
                ✨ Create Your First Plan
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
              {filteredPlans.map(plan => {
                const daysLeft = Math.max(0, Math.floor((new Date(plan.exam_date) - new Date()) / (1000 * 60 * 60 * 24)));
                const progress = plan.completed_percentage || 0;
                const streamColor = {
                  'Computer Science (CS)': '#3B82F6',
                  'Electronics (EC)': '#8B5CF6',
                  'Mechanical (ME)': '#EC4899',
                  'Electrical (EE)': '#F59E0B',
                }[plan.stream] || THEME.primary;
                
                return (
                  <Link key={plan.id} to={`/student/planner/${plan.id}`}
                    style={{ ...S.card }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>

                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: 16 }}>
                      <div>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: THEME.text, margin: 0, marginBottom: 4, letterSpacing: '-0.3px' }}>
                          {plan.current_level === 'Beginner' ? '🌱' : plan.current_level === 'Intermediate' ? '📈' : '🚀'} {plan.stream.split(' ')[0]}
                        </h3>
                        <p style={{ fontSize: 12, color: THEME.textMuted, margin: 0 }}>
                          Exam: {new Date(plan.exam_date).toLocaleDateString()}
                        </p>
                      </div>
                      {plan.is_active && (
                        <div style={{ background: `rgba(${streamColor.match(/\d+/g)?.join(',') || '59,130,246'}, 0.3)`, color: streamColor, padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700 }}>
                          ACTIVE
                        </div>
                      )}
                    </div>

                    {/* Stats */}
                    <div style={{ display: 'flex', gap: 8, marginBottom: 16, fontSize: 12 }}>
                      <div style={{ background: `rgba(255, 255, 255, 0.05)`, borderRadius: 8, padding: '8px 12px', flex: 1 }}>
                        <div style={{ color: THEME.textMuted, fontSize: 10, marginBottom: 2 }}>Days Left</div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: daysLeft > 30 ? THEME.success : daysLeft > 7 ? THEME.warning : THEME.danger }}>{daysLeft}</div>
                      </div>
                      <div style={{ background: `rgba(255, 255, 255, 0.05)`, borderRadius: 8, padding: '8px 12px', flex: 1 }}>
                        <div style={{ color: THEME.textMuted, fontSize: 10, marginBottom: 2 }}>Daily Hours</div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: THEME.text }}>{plan.daily_hours}h</div>
                      </div>
                      <div style={{ background: `rgba(255, 255, 255, 0.05)`, borderRadius: 8, padding: '8px 12px', flex: 1 }}>
                        <div style={{ color: THEME.textMuted, fontSize: 10, marginBottom: 2 }}>Topics</div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: THEME.text }}>{plan.topics_count || 0}</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: THEME.textMuted }}>Progress</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: THEME.text }}>{progress}%</span>
                      </div>
                      <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: `rgba(255, 255, 255, 0.05)`, border: `1px solid ${THEME.border}`, overflow: 'hidden' }}>
                        <div style={{ 
                          width: `${progress}%`, 
                          height: '100%', 
                          background: `linear-gradient(90deg, ${streamColor} 0%, ${streamColor === THEME.primary ? THEME.success : streamColor}80 100%)`,
                          transition: 'width 0.4s ease'
                        }} />
                      </div>
                    </div>

                    {/* Weak Topics Alert */}
                    {plan.weak_topics_count > 0 && (
                      <div style={{ background: `rgba(${THEME.danger.match(/\d+/g)?.join(',')}, 0.15)`, border: `1px solid ${THEME.danger}`, borderRadius: 10, padding: '10px 12px', fontSize: 12, color: '#FCA5A5' }}>
                        ⚠️ {plan.weak_topics_count} weak topic{plan.weak_topics_count > 1 ? 's' : ''} need focus
                      </div>
                    )}

                    {/* Footer */}
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${THEME.border}`, fontSize: 11, color: THEME.textMuted, display: 'flex', justifyContent: 'space-between' }}>
                      <span>{plan.current_level}</span>
                      <span>→ View Plan</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Statistics */}
          {plans.length > 0 && (
            <div style={{ marginTop: 40 }}>
              <h2 style={{ ...S.title, fontSize: 18, marginBottom: 16 }}>📊 Quick Stats</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                {[
                  { label: 'Total Plans', value: plans.length, icon: '📚' },
                  { label: 'Active Plans', value: plans.filter(p => p.is_active).length, icon: '🔄' },
                  { label: 'Total Topics', value: plans.reduce((sum, p) => sum + (p.topics_count || 0), 0), icon: '📖' },
                  { label: 'Weak Topics', value: plans.reduce((sum, p) => sum + (p.weak_topics_count || 0), 0), icon: '⚠️' }
                ].map((stat, i) => (
                  <div key={i} style={{ ...S.card, border: `1px solid ${THEME.border}`, padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: THEME.text, marginBottom: 4 }}>{stat.value}</div>
                    <div style={{ fontSize: 12, color: THEME.textMuted }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </DashboardLayout>
  );
}
