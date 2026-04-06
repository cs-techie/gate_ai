import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { testsAPI, resultsAPI } from '../api';
import DashboardLayout from '../components/DashboardLayout';

const STAT_CARDS = (tests, results, questions) => [
  { label:'Total Tests',    value: tests,     icon:'📋', color:'#3B82F6', bg:'#EFF6FF' },
  { label:'Submissions',    value: results,   icon:'✅', color:'#10B981', bg:'#ECFDF5' },
  { label:'Questions',      value: questions, icon:'❓', color:'#8B5CF6', bg:'#F5F3FF' },
  { label:'Avg Score',      value: '–',       icon:'📊', color:'#F59E0B', bg:'#FFFBEB' },
];

export default function AdminDashboard() {
  const [tests,   setTests]   = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const [tRes, rRes] = await Promise.all([testsAPI.getAll(), resultsAPI.getAll()]);
      setTests(tRes.data || []);
      setResults(rRes.data || []);
    } catch (err) {
      console.error('Dashboard load error:', err);
      // Show dashboard even if API fails
      setTests([]);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this test and all its questions?')) return;
    setDeleting(id);
    try {
      await testsAPI.delete(id);
      setTests(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      alert('Failed to delete test.');
    } finally {
      setDeleting(null);
    }
  };

  const totalQuestions = tests.reduce((s, t) => s + (t.questions?.length || 0), 0);

  if (loading) return (
    <DashboardLayout>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'60vh', flexDirection:'column', gap:16 }}>
        <div style={{ width:48, height:48, border:'4px solid #E2E8F0', borderTopColor:'#3B82F6', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
        <p style={{ color:'#64748B', fontSize:14 }}>Loading dashboard…</p>
        <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
      </div>
    </DashboardLayout>
  );

  const stats = STAT_CARDS(tests.length, results.length, totalQuestions);

  return (
    <DashboardLayout>
      <div style={{ padding:'32px 28px' }}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:28, flexWrap:'wrap', gap:12 }}>
          <div>
            <h1 style={{ fontSize:26, fontWeight:800, color:'#0F172A', margin:0 }}>Admin Dashboard</h1>
            <p style={{ fontSize:14, color:'#64748B', marginTop:4 }}>Manage tests, questions, and track submissions</p>
          </div>
          <Link to="/admin/create-test"
            style={{ display:'inline-flex', alignItems:'center', gap:8, background:'linear-gradient(135deg,#22C55E,#16a34a)',
              color:'#fff', padding:'11px 20px', borderRadius:12, fontWeight:700, fontSize:14, textDecoration:'none',
              boxShadow:'0 4px 12px rgba(34,197,94,0.35)', whiteSpace:'nowrap' }}>
            + Create New Test
          </Link>
        </div>

        {/* Stats Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:16, marginBottom:32 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background:'#fff', borderRadius:14, border:'1.5px solid #E2E8F0', padding:'20px 22px', display:'flex', alignItems:'center', gap:16, boxShadow:'0 1px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ width:46, height:46, borderRadius:12, background:s.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>
                {s.icon}
              </div>
              <div>
                <p style={{ fontSize:12, color:'#64748B', margin:0, fontWeight:500 }}>{s.label}</p>
                <p style={{ fontSize:28, fontWeight:800, color:s.color, margin:0, lineHeight:1.2 }}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tests Table */}
        <div style={{ background:'#fff', borderRadius:16, border:'1.5px solid #E2E8F0', overflow:'hidden', boxShadow:'0 1px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ padding:'18px 24px', borderBottom:'1px solid #F1F5F9', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <h2 style={{ fontSize:16, fontWeight:700, color:'#0F172A', margin:0 }}>All Tests ({tests.length})</h2>
          </div>

          {tests.length === 0 ? (
            <div style={{ padding:'48px 24px', textAlign:'center', color:'#94A3B8' }}>
              <div style={{ fontSize:40, marginBottom:12 }}>📋</div>
              <p style={{ fontSize:15, fontWeight:600, margin:0 }}>No tests yet</p>
              <p style={{ fontSize:13, margin:'6px 0 20px' }}>Create your first GATE mock test to get started</p>
              <Link to="/admin/create-test"
                style={{ display:'inline-flex', alignItems:'center', gap:6, background:'#22C55E', color:'#fff',
                  padding:'10px 20px', borderRadius:10, fontWeight:600, fontSize:13, textDecoration:'none' }}>
                + Create Test
              </Link>
            </div>
          ) : (
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                <thead>
                  <tr style={{ background:'#F8FAFC' }}>
                    {['#','Test Title','Subject','Duration','Questions','Actions'].map(h => (
                      <th key={h} style={{ padding:'11px 16px', textAlign:'left', fontWeight:600, color:'#475569', borderBottom:'1px solid #F1F5F9', whiteSpace:'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tests.map((test, idx) => (
                    <tr key={test.id} style={{ borderBottom:'1px solid #F8FAFC' }}
                      onMouseEnter={e => e.currentTarget.style.background='#FAFBFC'}
                      onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                      <td style={{ padding:'12px 16px', color:'#94A3B8', fontWeight:500 }}>{idx + 1}</td>
                      <td style={{ padding:'12px 16px', fontWeight:600, color:'#0F172A', maxWidth:220 }}>
                        <div style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{test.title}</div>
                      </td>
                      <td style={{ padding:'12px 16px', color:'#64748B' }}>
                        {test.subject
                          ? <span style={{ background:'#EFF6FF', color:'#3B82F6', padding:'3px 10px', borderRadius:20, fontSize:11, fontWeight:600 }}>{test.subject}</span>
                          : <span style={{ color:'#CBD5E1' }}>—</span>}
                      </td>
                      <td style={{ padding:'12px 16px', color:'#64748B' }}>
                        <span style={{ background:'#F1F5F9', padding:'3px 10px', borderRadius:20, fontSize:11, fontWeight:600 }}>
                          {test.duration_minutes} min
                        </span>
                      </td>
                      <td style={{ padding:'12px 16px', color:'#64748B', fontWeight:600 }}>
                        {test.questions?.length || 0}
                      </td>
                      <td style={{ padding:'12px 16px' }}>
                        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                          <Link to={`/admin/add-questions/${test.id}`}
                            style={{ padding:'6px 14px', background:'#EFF6FF', color:'#3B82F6', borderRadius:8, fontWeight:600, textDecoration:'none', fontSize:12, whiteSpace:'nowrap' }}>
                            + Questions
                          </Link>
                          <button
                            onClick={() => handleDelete(test.id)}
                            disabled={deleting === test.id}
                            style={{ padding:'6px 14px', background:'#FEF2F2', color:'#EF4444', border:'none', borderRadius:8, fontWeight:600, cursor:'pointer', fontSize:12, fontFamily:'inherit', whiteSpace:'nowrap', opacity: deleting === test.id ? 0.6 : 1 }}>
                            {deleting === test.id ? '…' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
    </DashboardLayout>
  );
}
