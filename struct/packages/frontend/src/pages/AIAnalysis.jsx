import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const WEAK = ['Tree Traversals','Network Flow','NP-Completeness','Cache Coherence','Relational Algebra'];
const STRONG = ['Sorting Algorithms','Boolean Algebra','Process Scheduling','SQL Queries','IP Addressing'];

const ACCURACY = [
  { subject: 'Data Structures', pct: 82, color: '#22C58B' },
  { subject: 'Algorithms', pct: 61, color: '#F59E0B' },
  { subject: 'Operating Systems', pct: 74, color: '#3B82F6' },
  { subject: 'Computer Networks', pct: 55, color: '#EF4444' },
  { subject: 'Databases', pct: 88, color: '#22C58B' },
  { subject: 'Digital Logic', pct: 91, color: '#22C58B' },
  { subject: 'Engineering Maths', pct: 67, color: '#F59E0B' },
];

const TIME = [
  { subject: 'Data Structures', hours: 18 },
  { subject: 'Algorithms', hours: 14 },
  { subject: 'Operating Systems', hours: 12 },
  { subject: 'Computer Networks', hours: 9 },
  { subject: 'Databases', hours: 7 },
];

const RECOMMENDED = [
  { title: 'Graph Algorithms  Advanced', subject: 'Algorithms', icon: '' },
  { title: 'Network Layer Deep Dive', subject: 'CN', icon: '' },
  { title: 'GATE 2023 PYQs  OS', subject: 'OS', icon: '' },
];

export default function AIAnalysis() {
  return (
    <DashboardLayout title="AI Analysis" subtitle="Personalised insights based on your test performance">
      {/* Top stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { icon: '', label: 'Tests Taken', value: '24', color: '#D1FAE5' },
          { icon: '', label: 'Avg Accuracy', value: '73%', color: '#DBEAFE' },
          { icon: '', label: 'Total Study Time', value: '60h', color: '#FEF3C7' },
          { icon: '', label: 'Improvement', value: '+12%', color: '#F3E8FF' },
        ].map((s,i) => (
          <div key={i} className="stat-card" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{s.icon}</div>
            <div>
              <p style={{ fontSize: 22, fontWeight: 800, color: '#1e293b' }}>{s.value}</p>
              <p style={{ fontSize: 11, color: '#94A3B8' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Weak topics */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 22, boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: '#1e293b', marginBottom: 14 }}> Weak Topics  Need Attention</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {WEAK.map((t,i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#FEF2F2', borderRadius: 10, border: '1px solid #FECACA' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#991B1B' }}>{t}</span>
                <Link to="/ai/doubt" style={{ fontSize: 11, color: '#EF4444', fontWeight: 700, textDecoration: 'none', background: '#FEE2E2', padding: '3px 8px', borderRadius: 6 }}>Practice </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Strong topics */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 22, boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: '#1e293b', marginBottom: 14 }}> Strong Topics  Keep It Up</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {STRONG.map((t,i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#F0FDF4', borderRadius: 10, border: '1px solid #BBF7D0' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#065F46' }}>{t}</span>
                <span style={{ fontSize: 11, color: '#22C58B', fontWeight: 700 }}> Strong</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accuracy chart */}
      <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 16px rgba(0,0,0,0.05)', marginBottom: 20 }}>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: '#1e293b', marginBottom: 18 }}> Accuracy by Subject</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {ACCURACY.map((a,i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ width: 160, fontSize: 13, fontWeight: 600, color: '#475569', flexShrink: 0 }}>{a.subject}</span>
              <div style={{ flex: 1, height: 12, background: '#F1F5F9', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${a.pct}%`, background: a.color, borderRadius: 6, transition: 'width 0.5s' }}/>
              </div>
              <span style={{ width: 40, fontSize: 13, fontWeight: 800, color: '#1e293b', textAlign: 'right' }}>{a.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Time analysis */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: '#1e293b', marginBottom: 16 }}> Time Spent per Subject</h3>
          {TIME.map((t,i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ width: 130, fontSize: 12, fontWeight: 600, color: '#475569' }}>{t.subject}</span>
              <div style={{ flex: 1, height: 8, background: '#F1F5F9', borderRadius: 4 }}>
                <div style={{ height: '100%', width: `${(t.hours/18)*100}%`, background: 'linear-gradient(90deg,#22C58B,#4ade80)', borderRadius: 4 }}/>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#64748B', width: 28 }}>{t.hours}h</span>
            </div>
          ))}
        </div>

        {/* Recommended tests */}
        <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: '#1e293b', marginBottom: 16 }}> Recommended Next</h3>
          {RECOMMENDED.map((r,i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i<RECOMMENDED.length-1 ? '1px solid #F1F5F9' : 'none' }}>
              <span style={{ fontSize: 22 }}>{r.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>{r.title}</p>
                <p style={{ fontSize: 11, color: '#94A3B8' }}>{r.subject}</p>
              </div>
              <Link to="/tests" style={{ background: '#22C58B', color: '#fff', textDecoration: 'none', padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700 }}>Start</Link>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
