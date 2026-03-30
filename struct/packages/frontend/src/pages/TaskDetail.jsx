import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { plannerAPI } from '../api';
import DashboardLayout from '../components/DashboardLayout';

const S = {
  container: { padding: '32px 28px', maxWidth: 700, margin: '0 auto' },
  card: { background: '#fff', borderRadius: 14, border: '1.5px solid #E2E8F0', padding: '24px', marginBottom: 20, boxShadow: '0 1px 8px rgba(0,0,0,0.04)' },
  title: { fontSize: 24, fontWeight: 800, color: '#0F172A', margin: 0, marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#64748B', margin: 0, marginBottom: 20 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 13, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 },
  label: { fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 6, display: 'block' },
  textarea: { width: '100%', padding: '11px 14px', border: '1.5px solid #E2E8F0', borderRadius: 10, fontSize: 14, color: '#1e293b', background: '#F8FAFC', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', minHeight: 100, marginBottom: 16, resize: 'vertical' },
  button: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 20px', background: '#3B82F6', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontSize: 14, fontFamily: 'inherit', marginRight: 8 },
};

export default function TaskDetail() {
  const { planId, taskId } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState({
    is_completed: false,
    actual_time_minutes: null,
    difficulty_feedback: null,
    user_notes: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadTask();
  }, [taskId]);

  const loadTask = async () => {
    try {
      const res = await plannerAPI.getTasks(planId, null);
      const t = res.data.find(x => x.id == taskId);
      setTask(t);
      setFeedback({
        is_completed: t?.is_completed || false,
        actual_time_minutes: t?.actual_time_minutes,
        difficulty_feedback: t?.difficulty_feedback,
        user_notes: t?.user_notes || ''
      });
    } catch (err) {
      console.error('Error loading task:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await plannerAPI.updateTask(taskId, feedback);
      loadTask();
      alert('✅ Task updated successfully!');
    } catch (err) {
      alert('Error saving task: ' + (err.response?.data?.detail || err.message));
    } finally {
      setSaving(false);
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

  if (!task) return (
    <DashboardLayout>
      <div style={{ ...S.container, textAlign: 'center', paddingTop: 100 }}>
        <p style={{ color: '#64748B' }}>Task not found</p>
        <button onClick={() => navigate(`/student/planner/${planId}`)} style={S.button}>
          Back to Plan
        </button>
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div style={S.container}>

        {/* Header */}
        <div style={S.card}>
          <h1 style={S.title}>{task.subject}</h1>
          <p style={S.subtitle}>{task.topic}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', marginBottom: 4 }}>Type</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{task.task_type}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', marginBottom: 4 }}>Difficulty</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{task.difficulty}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', marginBottom: 4 }}>Date</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{task.task_date}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B', marginBottom: 4 }}>Status</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: task.is_completed ? '#22C55E' : '#94A3B8' }}>
                {task.is_completed ? '✓ Done' : '◯ Pending'}
              </div>
            </div>
          </div>
        </div>

        {/* Task Details */}
        <div style={S.card}>
          <div style={S.section}>
            <div style={S.sectionTitle}>📋 Task Description</div>
            <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              {task.description}
            </p>
          </div>

          <div style={S.section}>
            <div style={S.sectionTitle}>📊 Quick Stats</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {task.mcq_count > 0 && (
                <div style={{ background: '#F0F9FF', padding: 12, borderRadius: 10 }}>
                  <div style={{ fontSize: 11, color: '#0C4A6E', fontWeight: 600 }}>MCQs</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#0C4A6E' }}>{task.mcq_count}</div>
                </div>
              )}
              {task.pyq_count > 0 && (
                <div style={{ background: '#FEF3C7', padding: 12, borderRadius: 10 }}>
                  <div style={{ fontSize: 11, color: '#92400E', fontWeight: 600 }}>PYQs</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#92400E' }}>{task.pyq_count}</div>
                </div>
              )}
              <div style={{ background: '#F0FDF4', padding: 12, borderRadius: 10 }}>
                <div style={{ fontSize: 11, color: '#166534', fontWeight: 600 }}>Time Allocated</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#166534' }}>{task.time_allocated_minutes}m</div>
              </div>
              {task.actual_time_minutes && (
                <div style={{ background: '#EFF6FF', padding: 12, borderRadius: 10 }}>
                  <div style={{ fontSize: 11, color: '#0C4A6E', fontWeight: 600 }}>Time Spent</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#0C4A6E' }}>{task.actual_time_minutes}m</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div style={S.card}>
          <div style={S.section}>
            <label style={S.label}>
              <input type="checkbox" checked={feedback.is_completed} onChange={(e) => setFeedback({ ...feedback, is_completed: e.target.checked })} style={{ marginRight: 8, cursor: 'pointer' }} />
              Mark as completed
            </label>
          </div>

          <div style={S.section}>
            <label style={S.label}>How much time did you actually spend? (minutes)</label>
            <input type="number" value={feedback.actual_time_minutes || ''} onChange={(e) => setFeedback({ ...feedback, actual_time_minutes: e.target.value ? parseInt(e.target.value) : null })} placeholder="e.g., 45" style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #E2E8F0', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', fontFamily: 'inherit', marginBottom: 16 }} />
          </div>

          <div style={S.section}>
            <label style={S.label}>How did you find this task? *</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
              {['Easy', 'Medium', 'Hard'].map(level => (
                <button key={level} type="button" onClick={() => setFeedback({ ...feedback, difficulty_feedback: level })}
                  style={{ padding: '10px', background: feedback.difficulty_feedback === level ? '#DBEAFE' : '#F8FAFC', color: feedback.difficulty_feedback === level ? '#1E40AF' : '#475569', border: feedback.difficulty_feedback === level ? '2px solid #3B82F6' : '1.5px solid #E2E8F0', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div style={S.section}>
            <label style={S.label}>Additional Notes</label>
            <textarea placeholder="What did you learn? Any challenges? Tips for next time?" value={feedback.user_notes} onChange={(e) => setFeedback({ ...feedback, user_notes: e.target.value })} style={S.textarea} />
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={handleSave} disabled={saving} style={{ ...S.button, background: saving ? '#94A3B8' : '#22C55E', cursor: saving ? 'not-allowed' : 'pointer' }}>
              {saving ? '💾 Saving...' : '✓ Save Progress'}
            </button>
            <button onClick={() => navigate(`/student/planner/${planId}`)} style={{ ...S.button, background: '#E2E8F0', color: '#475569' }}>
              ← Back to Plan
            </button>
          </div>
        </div>

        <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
      </div>
    </DashboardLayout>
  );
}
