import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { testsAPI } from '../api';
import DashboardLayout from '../components/DashboardLayout';

const GATE_SUBJECTS = [
  'Computer Science (CS)',
  'Electronics & Communication (EC)',
  'Electrical Engineering (EE)',
  'Mechanical Engineering (ME)',
  'Civil Engineering (CE)',
  'Chemical Engineering (CH)',
  'Instrumentation (IN)',
  'General Aptitude (GA)',
];

const GATE_PRESETS = [
  { label: 'Full GATE Mock', duration: 180, icon: '🏆', desc: '65Q · 100 marks · 3 hrs' },
  { label: 'Section Mock',   duration: 60,  icon: '📚', desc: '30Q · 50 marks · 1 hr'  },
  { label: 'Topic Test',     duration: 30,  icon: '⚡', desc: '15Q · 25 marks · 30 min'},
  { label: 'Custom',         duration: null, icon: '⚙️', desc: 'Set your own duration'  },
];

const S = {
  card:   { background:'#fff', borderRadius:16, border:'1.5px solid #E2E8F0', padding:'24px 28px', boxShadow:'0 2px 16px rgba(0,0,0,0.04)' },
  label:  { fontSize:13, fontWeight:600, color:'#475569', marginBottom:6, display:'block' },
  input:  { width:'100%', padding:'11px 14px', border:'1.5px solid #E2E8F0', borderRadius:10, fontSize:14, color:'#1e293b', background:'#F8FAFC', outline:'none', boxSizing:'border-box', fontFamily:'inherit' },
  select: { width:'100%', padding:'11px 14px', border:'1.5px solid #E2E8F0', borderRadius:10, fontSize:14, color:'#1e293b', background:'#F8FAFC', outline:'none', cursor:'pointer', boxSizing:'border-box', fontFamily:'inherit' },
};

export default function CreateTest() {
  const [title, setTitle]               = useState('');
  const [subject, setSubject]           = useState('');
  const [duration, setDuration]         = useState(180);
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [error, setError]               = useState('');
  const [loading, setLoading]           = useState(false);
  const navigate = useNavigate();

  const applyPreset = (idx) => {
    setSelectedPreset(idx);
    if (GATE_PRESETS[idx].duration !== null) setDuration(GATE_PRESETS[idx].duration);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!title.trim()) { setError('Test title is required.'); return; }
    if (duration < 1 || duration > 300) { setError('Duration must be between 1 and 300 minutes.'); return; }
    setLoading(true);
    try {
      const res = await testsAPI.create({ title: title.trim(), subject: subject || null, duration_minutes: parseInt(duration) });
      navigate(`/admin/add-questions/${res.data.id}`);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create test. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div style={{ padding: '32px 28px', maxWidth: 700, margin: '0 auto' }}>

        {/* Page header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:6 }}>
            <button onClick={() => navigate('/admin')}
              style={{ background:'none', border:'none', cursor:'pointer', color:'#64748B', fontSize:13, fontFamily:'inherit', padding:0 }}>
              ← Back to Dashboard
            </button>
          </div>
          <h1 style={{ fontSize:26, fontWeight:800, color:'#0F172A', margin:0 }}>Create New Test</h1>
          <p style={{ fontSize:14, color:'#64748B', marginTop:4 }}>Configure a GATE-style mock test for students</p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Error */}
          {error && (
            <div style={{ background:'#FEF2F2', border:'1.5px solid #FECACA', borderRadius:10, padding:'12px 16px', marginBottom:20, color:'#DC2626', fontSize:13, display:'flex', gap:8, alignItems:'center' }}>
              ⚠️ {error}
            </div>
          )}

          {/* GATE Presets */}
          <div style={{ ...S.card, marginBottom:20 }}>
            <div style={{ fontSize:13, fontWeight:700, color:'#0F172A', marginBottom:14 }}>⚡ Quick Presets</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10 }}>
              {GATE_PRESETS.map((p, i) => (
                <button key={i} type="button" onClick={() => applyPreset(i)}
                  style={{ padding:'12px 8px', borderRadius:10, border: selectedPreset === i ? '2px solid #22C55E' : '1.5px solid #E2E8F0',
                    background: selectedPreset === i ? '#F0FDF4' : '#F8FAFC',
                    cursor:'pointer', textAlign:'center', transition:'all 0.15s', fontFamily:'inherit' }}>
                  <div style={{ fontSize:20, marginBottom:4 }}>{p.icon}</div>
                  <div style={{ fontSize:12, fontWeight:700, color: selectedPreset === i ? '#16a34a' : '#1e293b' }}>{p.label}</div>
                  <div style={{ fontSize:10, color:'#94A3B8', marginTop:2 }}>{p.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Test Details */}
          <div style={{ ...S.card, marginBottom:20 }}>
            <div style={{ fontSize:13, fontWeight:700, color:'#0F172A', marginBottom:18 }}>📋 Test Details</div>

            {/* Title */}
            <div style={{ marginBottom:16 }}>
              <label style={S.label}>Test Title <span style={{ color:'#EF4444' }}>*</span></label>
              <input style={S.input} type="text" value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g., GATE CS 2026 Full Mock Test 1"
                required />
            </div>

            {/* Subject */}
            <div style={{ marginBottom:16 }}>
              <label style={S.label}>Subject / Stream</label>
              <select style={S.select} value={subject} onChange={e => setSubject(e.target.value)}>
                <option value="">-- All Subjects / General --</option>
                {GATE_SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Duration */}
            <div>
              <label style={S.label}>Duration (minutes) <span style={{ color:'#EF4444' }}>*</span></label>
              <input style={S.input} type="number" value={duration}
                onChange={e => setDuration(e.target.value)}
                min="1" max="300" required />
              <p style={{ fontSize:11, color:'#94A3B8', marginTop:5 }}>Full GATE exam = 180 min · GA only = 30 min · Subject section = 120 min</p>
            </div>
          </div>

          {/* GATE Info */}
          <div style={{ background:'#F0FDF4', border:'1.5px solid #BBF7D0', borderRadius:12, padding:'14px 18px', marginBottom:22 }}>
            <div style={{ fontSize:12, fontWeight:700, color:'#166534', marginBottom:8 }}>ℹ️ GATE 2026 Marking Scheme</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6, fontSize:11, color:'#166534' }}>
              <span>• 65 Questions / 100 Marks</span>
              <span>• GA: 15 marks (5×1M + 5×2M)</span>
              <span>• MCQ: −1/3 or −2/3 negative</span>
              <span>• MSQ / NAT: No negative marking</span>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display:'flex', gap:12 }}>
            <button type="submit" disabled={loading}
              style={{ flex:1, padding:'13px', background: loading ? '#94A3B8' : 'linear-gradient(135deg,#22C55E,#16a34a)',
                color:'#fff', border:'none', borderRadius:12, fontWeight:700, fontSize:15, cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily:'inherit', display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                boxShadow: loading ? 'none' : '0 4px 14px rgba(34,197,94,0.35)' }}>
              {loading
                ? <><div style={{ width:16, height:16, border:'2px solid rgba(255,255,255,0.4)', borderTopColor:'#fff', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} /> Creating...</>
                : '✓ Create Test & Add Questions'
              }
            </button>
            <button type="button" onClick={() => navigate('/admin')}
              style={{ padding:'13px 24px', background:'#F1F5F9', color:'#475569', border:'none', borderRadius:12, fontWeight:600, cursor:'pointer', fontSize:14, fontFamily:'inherit' }}>
              Cancel
            </button>
          </div>

        </form>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </DashboardLayout>
  );
}
