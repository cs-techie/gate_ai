import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { resultsAPI } from '../api';
import DashboardLayout from '../components/DashboardLayout';

export default function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadResults(); }, []);

  const loadResults = async () => {
    try {
      const res = await resultsAPI.getMine();
      setResults(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const avgScore = results.length > 0
    ? Math.round(results.reduce((s, r) => s + (r.score / r.total * 100), 0) / results.length) : 0;
  const bestScore = results.length > 0
    ? Math.round(Math.max(...results.map(r => r.score / r.total * 100))) : 0;
  const passedCount = results.filter(r => r.score / r.total >= 0.25).length;
  const passRate = results.length > 0 ? Math.round(passedCount / results.length * 100) : 0;
  const totalMinutes = Math.floor(results.reduce((s, r) => s + (r.time_taken || 0), 0) / 60);

  if (loading) return (
    <DashboardLayout title="My Progress">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, border: '4px solid #d1fae5', borderTopColor: '#22C58B', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
          <p style={{ color: '#94A3B8', fontSize: 14 }}>Loading results...</p>
        </div>
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout title="My Progress" subtitle="Track your GATE preparation performance">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { icon: '📋', label: 'Tests Done', value: results.length, bg: 'linear-gradient(135deg,#d1fae5,#a7f3d0)' },
          { icon: '📊', label: 'Average Score', value: `${avgScore}%`, bg: 'linear-gradient(135deg,#dbeafe,#bfdbfe)' },
          { icon: '🏆', label: 'Best Score', value: `${bestScore}%`, bg: 'linear-gradient(135deg,#fef3c7,#fde68a)' },
          { icon: '⏱', label: 'Study Time', value: `${totalMinutes}m`, bg: 'linear-gradient(135deg,#f3e8ff,#e9d5ff)' },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{s.icon}</div>
            <div>
              <p style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>{s.value}</p>
              <p style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 300px', gap: 18, marginBottom: 24 }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Pass Rate</p>
          <div style={{ position: 'relative', width: 120, height: 120 }}>
            <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="60" cy="60" r="50" fill="none" stroke="#F1F5F9" strokeWidth="10" />
              <circle cx="60" cy="60" r="50" fill="none" stroke="url(#g1)" strokeWidth="10"
                strokeDasharray={`${passRate * 3.14} 314`} strokeLinecap="round" />
              <defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22C58B" /><stop offset="100%" stopColor="#4ade80" />
              </linearGradient></defs>
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>{passRate}%</p>
            </div>
          </div>
          <p style={{ fontSize: 12, color: '#64748B' }}>{passedCount} of {results.length} passed</p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Average Score</p>
          <div style={{ position: 'relative', width: 120, height: 120 }}>
            <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="60" cy="60" r="50" fill="none" stroke="#F1F5F9" strokeWidth="10" />
              <circle cx="60" cy="60" r="50" fill="none" stroke="url(#g2)" strokeWidth="10"
                strokeDasharray={`${avgScore * 3.14} 314`} strokeLinecap="round" />
              <defs><linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" /><stop offset="100%" stopColor="#6366F1" />
              </linearGradient></defs>
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>{avgScore}%</p>
            </div>
          </div>
          <p style={{ fontSize: 12, color: '#64748B' }}>Across {results.length} tests</p>
        </div>

        <div style={{ borderRadius: 16, padding: '18px', background: 'linear-gradient(160deg,#0a1a12,#1a3d28)', color: '#fff', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>📈</span>
            <p style={{ fontWeight: 700, fontSize: 14, color: '#4ade80' }}>GATE Stats</p>
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Avg Negative Marks</p>
            <p style={{ fontSize: 22, fontWeight: 800, color: '#f87171' }}>
              -{results.length > 0 ? (results.reduce((s,r) => s + (r.negative_marks || 0), 0) / results.length).toFixed(2) : '0.00'}
            </p>
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Avg Accuracy</p>
            <p style={{ fontSize: 22, fontWeight: 800, color: '#4ade80' }}>
              {results.length > 0 && results.some(r => (r.correct_count + r.wrong_count) > 0)
                ? Math.round(results.reduce((s,r) => s + (r.correct_count + r.wrong_count > 0 ? r.correct_count / (r.correct_count + r.wrong_count) * 100 : 0), 0) / results.length)
                : 0}%
            </p>
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Total Questions Attempted</p>
            <p style={{ fontSize: 22, fontWeight: 800, color: '#93c5fd' }}>
              {results.reduce((s,r) => s + (r.correct_count || 0) + (r.wrong_count || 0), 0)}
            </p>
          </div>
          <Link to="/tests" style={{ fontSize: 12, padding: '9px', marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'rgba(34,197,139,0.2)', borderRadius: 10, color: '#4ade80', fontWeight: 700, textDecoration: 'none', border: '1px solid rgba(34,197,139,0.3)' }}>
            Take More Tests &#8594;
          </Link>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 12px rgba(0,0,0,0.05)', border: '1px solid #F0F9F4' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F8FAFC' }}>
          <p style={{ fontWeight: 700, fontSize: 15, color: '#0f172a' }}>Test History</p>
          <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 1 }}>Complete record of all your tests</p>
        </div>
        {results.length === 0 ? (
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>📊</div>
            <p style={{ fontWeight: 600, color: '#1e293b', marginBottom: 6 }}>No results yet</p>
            <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 16 }}>Take a test to see your results here</p>
            <Link to="/tests" style={{ fontSize: 13, padding: '9px 20px', display: 'inline-flex', alignItems: 'center', gap: 6, background: '#22C58B', color: '#fff', borderRadius: 10, fontWeight: 700, textDecoration: 'none' }}>
              Browse Tests &#8594;
            </Link>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Test</th>
                <th>Date</th>
                <th>Score</th>
                <th>Sections (GA / Maths / Subject)</th>
                <th>C / W / S</th>
                <th>Neg.</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map(result => {
                const pct = result.total > 0 ? ((result.score / result.total) * 100).toFixed(1) : '0.0';
                const passed = parseFloat(pct) >= 25;
                const timeTakenMin = Math.floor((result.time_taken || 0) / 60);
                const timeTakenSec = (result.time_taken || 0) % 60;
                return (
                  <tr key={result.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 9, background: passed ? '#D1FAE5' : '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                          {passed ? '✅' : '❌'}
                        </div>
                        <div>
                          <span style={{ fontWeight: 600, color: '#1e293b', fontSize: 13 }}>Test #{result.test_id}</span>
                          <p style={{ fontSize: 11, color: '#94A3B8' }}>⏱ {timeTakenMin}m {timeTakenSec}s</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: 12 }}>{new Date(result.taken_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}</td>
                    <td>
                      <span style={{ fontWeight: 800, color: '#1e293b', fontSize: 15 }}>{result.score}</span>
                      <span style={{ color: '#94A3B8', fontSize: 12 }}>/{result.total}</span>
                      <p style={{ fontSize: 11, color: passed ? '#15803D' : '#DC2626', fontWeight: 700 }}>{pct}%</p>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6, fontSize: 11, fontWeight: 700 }}>
                        <span style={{ background: '#FDF4FF', color: '#7C3AED', padding: '2px 8px', borderRadius: 6 }}>{result.ga_score || 0}/15</span>
                        <span style={{ background: '#EFF6FF', color: '#1D4ED8', padding: '2px 8px', borderRadius: 6 }}>{result.math_score || 0}/13</span>
                        <span style={{ background: '#F0FDF4', color: '#15803D', padding: '2px 8px', borderRadius: 6 }}>{result.subject_score || 0}/72</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ color: '#065F46', fontWeight: 700 }}>{result.correct_count || 0}</span>
                      <span style={{ color: '#94A3B8' }}> / </span>
                      <span style={{ color: '#991B1B', fontWeight: 700 }}>{result.wrong_count || 0}</span>
                      <span style={{ color: '#94A3B8' }}> / </span>
                      <span style={{ color: '#94A3B8', fontWeight: 700 }}>{result.unattempted_count || 0}</span>
                    </td>
                    <td>
                      {(result.negative_marks || 0) > 0
                        ? <span style={{ color: '#EF4444', fontWeight: 700, fontSize: 12 }}>-{result.negative_marks}</span>
                        : <span style={{ color: '#94A3B8', fontSize: 12 }}>0</span>
                      }
                    </td>
                    <td>
                      <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: passed ? '#D1FAE5' : '#FEE2E2', color: passed ? '#065F46' : '#991B1B' }}>
                        {passed ? 'Qualified' : 'Not Qualified'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}
