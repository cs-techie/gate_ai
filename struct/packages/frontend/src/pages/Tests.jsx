import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { testsAPI } from '../api';
import DashboardLayout from '../components/DashboardLayout';
import { Play, Clock, Star, Search, Zap, ArrowRight, BookOpen } from 'lucide-react';

const CARD_ACCENTS = ['#22C58B', '#3B82F6', '#F59E0B', '#8B5CF6', '#EF4444', '#06B6D4'];
const AI_SUGGESTIONS = ['Signals & Systems', 'Engineering Maths', 'Digital Logic'];

export default function Tests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => { loadTests(); }, [filter]);

  const loadTests = async () => {
    try {
      const res = await testsAPI.getAll(filter || undefined);
      setTests(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const subjects = [...new Set(tests.map(t => t.subject).filter(Boolean))];
  const filtered = tests.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.subject?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <DashboardLayout title="My Courses">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <div style={{ width: 40, height: 40, border: '4px solid #d1fae5', borderTopColor: '#22C58B', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout title="My Courses" subtitle="All GATE preparation tests in one place">
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input className="form-input" style={{ paddingLeft: 36 }} placeholder="Search tests or subjects..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="form-input" style={{ width: 180 }} value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">All Subjects</option>
          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 14px', height: 44, borderRadius: 12, background: '#F0FDF4', border: '1px solid #a7f3d0', flexShrink: 0 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#065F46' }}>{filtered.length}</span>
          <span style={{ fontSize: 12, color: '#16A34A' }}>tests</span>
        </div>
      </div>

      <div style={{ marginBottom: 20, padding: '12px 18px', borderRadius: 12, background: 'rgba(34,197,139,0.06)', border: '1px solid rgba(34,197,139,0.18)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#22C58B,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Zap size={16} color="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#065F46' }}>AI Recommended for you</p>
          <p style={{ fontSize: 11, color: '#16A34A', marginTop: 1 }}>Based on your weak areas: {AI_SUGGESTIONS.join(', ')}</p>
        </div>
        <Link to="/ai/analysis" style={{ fontSize: 12, fontWeight: 600, color: '#22C58B', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          See Analysis <ArrowRight size={12} />
        </Link>
      </div>

      {filtered.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}><BookOpen size={40} color="#CBD5E1" /></div>
          <p style={{ fontWeight: 700, color: '#1e293b', fontSize: 16, marginBottom: 6 }}>No tests found</p>
          <p style={{ fontSize: 13, color: '#94A3B8' }}>Try a different search or filter</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {filtered.map((test, i) => (
            <div key={test.id} className="card-course">
              <div style={{ height: 4, background: CARD_ACCENTS[i % CARD_ACCENTS.length] }} />
              <div style={{ padding: '16px 18px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span className="badge" style={{ background: '#F0FDF4', color: '#16A34A', fontSize: 10 }}>{test.subject || 'GATE'}</span>
                  <span style={{ fontSize: 11, color: '#94A3B8' }}>{test.questions?.length || 10} Qs</span>
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1e293b', marginBottom: 10, lineHeight: 1.4, minHeight: 40 }}
                  className="line-clamp-2">{test.title}</h3>
                <div style={{ display: 'flex', gap: 16, fontSize: 11, color: '#64748B', marginBottom: 12 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={11} color="#22C58B" /> {test.duration_minutes} min
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Star size={11} color="#F59E0B" fill="#F59E0B" /> 4.8
                  </span>
                  <span style={{ color: '#22C58B', fontWeight: 600 }}>Easy</span>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>
                    <span>Progress</span><span>0%</span>
                  </div>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: '0%' }} /></div>
                </div>
                <Link to={`/test/${test.id}`} className="btn-primary" style={{ width: '100%', padding: '9px', fontSize: 13, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <Play size={13} /> Start Test
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered.length >= 6 && (
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button className="btn-secondary" style={{ fontSize: 13, padding: '10px 28px' }}>Load More</button>
        </div>
      )}
    </DashboardLayout>
  );
}
