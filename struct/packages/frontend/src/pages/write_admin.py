content = r"""import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { testsAPI, resultsAPI, materialsAPI, usersAPI } from '../api';
import DashboardLayout from '../components/DashboardLayout';
import { Layers, Users, FileText, BookOpen, Upload, Trash2, Plus, BarChart2, CheckCircle, Clock } from 'lucide-react';

const TYPE_COLORS = {
  PDF:   { bg: '#EFF6FF', color: '#2563EB', border: '#BFDBFE' },
  Notes: { bg: '#F0FDF4', color: '#16A34A', border: '#BBF7D0' },
  Code:  { bg: '#FDF4FF', color: '#9333EA', border: '#E9D5FF' },
  PYQ:   { bg: '#FFF7ED', color: '#EA580C', border: '#FED7AA' },
};

const StatCard = ({ icon: Icon, label, value, color, bg }) => (
  <div style={{ background: '#fff', borderRadius: 16, padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 18, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', flex: 1, minWidth: 180 }}>
    <div style={{ width: 52, height: 52, borderRadius: 14, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon size={24} color={color} strokeWidth={1.8} />
    </div>
    <div>
      <div style={{ fontSize: 26, fontWeight: 700, color: '#111827', lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 13, color: '#6B7280', marginTop: 3 }}>{label}</div>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [tests, setTests]         = useState([]);
  const [results, setResults]     = useState([]);
  const [materials, setMaterials] = useState([]);
  const [users, setUsers]         = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [delMat, setDelMat]       = useState(null);

  useEffect(() => {
    testsAPI.getAll().then(r => setTests(r.data)).catch(() => {});
    resultsAPI.getAll().then(r => setResults(r.data)).catch(() => {});
    materialsAPI.getAll().then(r => setMaterials(r.data)).catch(() => {});
    usersAPI.getAll().then(r => setUsers(r.data)).catch(() => {});
  }, []);

  const deleteMaterial = async (id) => {
    if (!window.confirm('Delete this resource permanently?')) return;
    setDelMat(id);
    try {
      await materialsAPI.delete(id);
      setMaterials(prev => prev.filter(m => m.id !== id));
    } catch { alert('Delete failed'); }
    finally { setDelMat(null); }
  };

  const deleteTest = async (id) => {
    if (!window.confirm('Delete this test?')) return;
    try {
      await testsAPI.delete(id);
      setTests(prev => prev.filter(t => t.id !== id));
    } catch { alert('Delete failed'); }
  };

  const students = users.filter(u => u.role !== 'admin');
  const tabs = [
    { id: 'overview',   label: 'Overview',   icon: BarChart2 },
    { id: 'resources',  label: 'Resources',  icon: BookOpen  },
    { id: 'tests',      label: 'Tests',      icon: FileText  },
    { id: 'students',   label: 'Students',   icon: Users     },
  ];

  return (
    <DashboardLayout>
      <div style={{ padding: '32px', fontFamily: "'Poppins', sans-serif", maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#111827', margin: 0 }}>Admin Dashboard</h1>
          <p style={{ color: '#6B7280', marginTop: 4, fontSize: 14 }}>Manage your GATE preparation platform</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
          <StatCard icon={FileText}    label="Total Tests"   value={tests.length}     color="#6366F1" bg="#EEF2FF" />
          <StatCard icon={CheckCircle} label="Submissions"   value={results.length}   color="#22C58B" bg="#F0FDF4" />
          <StatCard icon={BookOpen}    label="Resources"     value={materials.length} color="#F59E0B" bg="#FFFBEB" />
          <StatCard icon={Users}       label="Students"      value={students.length}  color="#3B82F6" bg="#EFF6FF" />
        </div>

        {/* Tab Bar */}
        <div style={{ display: 'flex', gap: 4, background: '#F3F4F6', borderRadius: 12, padding: 4, marginBottom: 28, width: 'fit-content' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 20px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, transition: 'all .2s',
                background: activeTab === t.id ? '#fff' : 'transparent',
                color:      activeTab === t.id ? '#111827' : '#6B7280',
                boxShadow:  activeTab === t.id ? '0 1px 6px rgba(0,0,0,0.1)' : 'none' }}>
              <t.icon size={15} />{t.label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Quick Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { to: '/admin/create-test',      icon: Plus,   label: 'Create New Test',    color: '#6366F1', bg: '#EEF2FF' },
                  { to: '/admin/upload-material',  icon: Upload, label: 'Upload Resource',    color: '#22C58B', bg: '#F0FDF4' },
                ].map(({ to, icon: Icon, label, color, bg }) => (
                  <Link key={to} to={to}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderRadius: 12, background: bg, textDecoration: 'none', color, fontWeight: 600, fontSize: 13, transition: 'transform .15s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}>
                    <Icon size={18} /> {label}
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Recent Submissions</h3>
              {results.length === 0
                ? <p style={{ color: '#9CA3AF', fontSize: 13 }}>No submissions yet.</p>
                : results.slice(0, 5).map(r => (
                    <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F3F4F6' }}>
                      <span style={{ fontSize: 13, color: '#374151' }}>Test #{r.test_id}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#22C58B' }}>{r.score}/{r.total}</span>
                        {r.time_taken && <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#9CA3AF' }}><Clock size={11} />{Math.round(r.time_taken / 60)}m</span>}
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        )}

        {/* ── RESOURCES ── */}
        {activeTab === 'resources' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#111827', margin: 0 }}>Study Resources ({materials.length})</h2>
              <Link to="/admin/upload-material"
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 10, background: 'linear-gradient(135deg,#22C58B,#4FD1A5)', color: '#fff', fontWeight: 600, fontSize: 13, textDecoration: 'none', boxShadow: '0 3px 10px rgba(34,197,139,0.3)' }}>
                <Upload size={15} /> Upload Resource
              </Link>
            </div>

            {materials.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                <BookOpen size={40} color="#D1D5DB" />
                <p style={{ color: '#9CA3AF', marginTop: 12 }}>No resources uploaded yet.</p>
                <Link to="/admin/upload-material" style={{ marginTop: 12, display: 'inline-block', padding: '10px 22px', borderRadius: 10, background: '#22C58B', color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 13 }}>Upload First Resource</Link>
              </div>
            ) : (
              <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#F9FAFB' }}>
                      {['Title', 'Subject', 'Type', 'Uploaded', 'Action'].map(h => (
                        <th key={h} style={{ padding: '13px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {materials.map(m => {
                      const tc = TYPE_COLORS[m.type] || TYPE_COLORS.PDF;
                      return (
                        <tr key={m.id}
                          onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                          onMouseLeave={e => e.currentTarget.style.background = ''}
                          style={{ borderTop: '1px solid #F3F4F6' }}>
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{m.title}</div>
                            {m.description && <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.description}</div>}
                          </td>
                          <td style={{ padding: '14px 16px', fontSize: 13, color: '#374151' }}>{m.subject || '—'}</td>
                          <td style={{ padding: '14px 16px' }}>
                            <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700, background: tc.bg, color: tc.color, border: `1px solid ${tc.border}` }}>{m.type}</span>
                          </td>
                          <td style={{ padding: '14px 16px', fontSize: 12, color: '#9CA3AF' }}>{new Date(m.uploaded_at).toLocaleDateString()}</td>
                          <td style={{ padding: '14px 16px' }}>
                            <button onClick={() => deleteMaterial(m.id)} disabled={delMat === m.id}
                              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', borderRadius: 8, border: '1px solid #FEE2E2', background: '#FFF5F5', color: '#EF4444', fontWeight: 600, fontSize: 12, cursor: 'pointer', opacity: delMat === m.id ? 0.5 : 1, transition: 'background .15s' }}
                              onMouseEnter={e => e.currentTarget.style.background = '#FEE2E2'}
                              onMouseLeave={e => e.currentTarget.style.background = '#FFF5F5'}>
                              <Trash2 size={13} />{delMat === m.id ? '...' : 'Delete'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── TESTS ── */}
        {activeTab === 'tests' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#111827', margin: 0 }}>Tests ({tests.length})</h2>
              <Link to="/admin/create-test"
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 10, background: 'linear-gradient(135deg,#6366F1,#818CF8)', color: '#fff', fontWeight: 600, fontSize: 13, textDecoration: 'none', boxShadow: '0 3px 10px rgba(99,102,241,0.3)' }}>
                <Plus size={15} /> Create Test
              </Link>
            </div>
            {tests.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: 16 }}>
                <FileText size={40} color="#D1D5DB" />
                <p style={{ color: '#9CA3AF', marginTop: 12 }}>No tests created yet.</p>
              </div>
            ) : (
              <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#F9FAFB' }}>
                      {['Title', 'Subject', 'Duration', 'Submissions', 'Actions'].map(h => (
                        <th key={h} style={{ padding: '13px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tests.map(t => {
                      const subs = results.filter(r => r.test_id === t.id).length;
                      return (
                        <tr key={t.id}
                          onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                          onMouseLeave={e => e.currentTarget.style.background = ''}
                          style={{ borderTop: '1px solid #F3F4F6' }}>
                          <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 600, color: '#111827' }}>{t.title}</td>
                          <td style={{ padding: '14px 16px', fontSize: 13, color: '#374151' }}>{t.subject || '—'}</td>
                          <td style={{ padding: '14px 16px', fontSize: 13, color: '#374151' }}>{t.duration_minutes}m</td>
                          <td style={{ padding: '14px 16px' }}>
                            <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700, background: '#F0FDF4', color: '#16A34A', border: '1px solid #BBF7D0' }}>{subs}</span>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ display: 'flex', gap: 8 }}>
                              <Link to={`/admin/add-questions/${t.id}`}
                                style={{ padding: '7px 12px', borderRadius: 8, border: '1px solid #E0E7FF', background: '#EEF2FF', color: '#6366F1', fontWeight: 600, fontSize: 12, textDecoration: 'none' }}>
                                + Questions
                              </Link>
                              <button onClick={() => deleteTest(t.id)}
                                style={{ padding: '7px 12px', borderRadius: 8, border: '1px solid #FEE2E2', background: '#FFF5F5', color: '#EF4444', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}
                                onMouseEnter={e => e.currentTarget.style.background = '#FEE2E2'}
                                onMouseLeave={e => e.currentTarget.style.background = '#FFF5F5'}>
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── STUDENTS ── */}
        {activeTab === 'students' && (
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: '#111827', marginBottom: 20 }}>Registered Students ({students.length})</h2>
            {students.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: 16 }}>
                <Users size={40} color="#D1D5DB" />
                <p style={{ color: '#9CA3AF', marginTop: 12 }}>No students registered yet.</p>
              </div>
            ) : (
              <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#F9FAFB' }}>
                      {['#', 'Name', 'Email', 'Joined', 'Tests Taken'].map(h => (
                        <th key={h} style={{ padding: '13px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((u, i) => {
                      const taken = results.filter(r => r.user_id === u.id).length;
                      return (
                        <tr key={u.id}
                          onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                          onMouseLeave={e => e.currentTarget.style.background = ''}
                          style={{ borderTop: '1px solid #F3F4F6' }}>
                          <td style={{ padding: '14px 16px', fontSize: 13, color: '#9CA3AF' }}>{i + 1}</td>
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#22C58B,#4FD1A5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>
                                {u.name?.charAt(0).toUpperCase()}
                              </div>
                              <span style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{u.name}</span>
                            </div>
                          </td>
                          <td style={{ padding: '14px 16px', fontSize: 13, color: '#374151' }}>{u.email}</td>
                          <td style={{ padding: '14px 16px', fontSize: 12, color: '#9CA3AF' }}>{new Date(u.created_at).toLocaleDateString()}</td>
                          <td style={{ padding: '14px 16px' }}>
                            <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700, background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE' }}>{taken}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
"""

with open("AdminDashboard.jsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Done")
