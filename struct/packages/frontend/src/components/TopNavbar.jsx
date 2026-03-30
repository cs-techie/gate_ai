import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function TopNavbar({ title, subtitle }) {
  const { user } = useAuth();
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <header className="topnav">
      {/* Left: Page title */}
      <div>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', lineHeight: 1.3 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 1 }}>{subtitle}</p>}
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Search */}
        <div style={{ position: 'relative' }} className="hidden md:block">
          <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#94A3B8' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search courses, topics..."
            style={{
              width: 220, paddingLeft: 36, paddingRight: 14, paddingTop: 8, paddingBottom: 8,
              background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: 10,
              fontSize: 13, color: '#334155', outline: 'none', fontFamily: 'inherit'
            }}
            onFocus={e => { e.target.style.borderColor = '#22C58B'; e.target.style.boxShadow = '0 0 0 3px rgba(34,197,139,0.1)'; }}
            onBlur={e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none'; }}
          />
        </div>

        {/* Quick AI Button */}
        <Link to="/ai/doubt" className="btn-ai" style={{ padding: '7px 14px', fontSize: 12 }}>
          <svg style={{ width: 13, height: 13 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Ask AI
        </Link>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: '#F8FAFC', border: '1.5px solid #E2E8F0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', position: 'relative'
            }}
          >
            <svg style={{ width: 16, height: 16, color: '#64748B' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span style={{
              position: 'absolute', top: 7, right: 7,
              width: 7, height: 7, borderRadius: '50%',
              background: '#22C58B', border: '1.5px solid #fff'
            }} />
          </button>

          {isNotifOpen && (
            <div style={{
              position: 'absolute', right: 0, top: 'calc(100% + 8px)',
              width: 300, background: '#fff', borderRadius: 14,
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)', border: '1px solid #F1F5F9', zIndex: 100
            }}>
              <div style={{ padding: '14px 16px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>Notifications</span>
                <span style={{ fontSize: 11, color: '#22C58B', fontWeight: 600, cursor: 'pointer' }}>Mark all read</span>
              </div>
              {[
                { icon: '📚', title: 'New test available', desc: 'GATE 2026 Mock Test #5 is live', time: '2h ago', dot: true },
                { icon: '🎯', title: 'AI Analysis ready', desc: 'Your weak topics report is ready', time: '1d ago', dot: false },
                { icon: '✅', title: 'Study streak!', desc: 'You studied 5 days in a row', time: '2d ago', dot: false },
              ].map((n, i) => (
                <div key={i} style={{ padding: '12px 16px', display: 'flex', gap: 10, cursor: 'pointer', borderBottom: i < 2 ? '1px solid #F8FAFC' : 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <span style={{ fontSize: 20 }}>{n.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <p style={{ fontWeight: 600, fontSize: 13, color: '#1e293b' }}>{n.title}</p>
                      {n.dot && <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C58B', flexShrink: 0, marginTop: 4 }} />}
                    </div>
                    <p style={{ fontSize: 12, color: '#64748B', marginTop: 1 }}>{n.desc}</p>
                    <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 3 }}>{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 28, background: '#E2E8F0' }} />

        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <div className="avatar" style={{ width: 34, height: 34, fontSize: 13 }}>
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div style={{ display: 'none' }} className="lg:block">
            <p style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', lineHeight: 1.3 }}>{user?.name || 'Student'}</p>
            <p style={{ fontSize: 11, color: '#94A3B8', lineHeight: 1 }}>{user?.role === 'admin' ? 'Admin' : 'Student'}</p>
          </div>
        </div>
      </div>
    </header>
  );
}