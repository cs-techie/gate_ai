import { NavLink } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const NavIcon = ({ d }) => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={d} />
  </svg>
);

const ICONS = {
  dashboard: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
  courses: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  materials: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  results: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  planner: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  doubt: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
  roadmap: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
  analysis: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  admin: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
  logout: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
  spark: 'M13 10V3L4 14h7v7l9-11h-7z',
};

function SideItem({ to, iconKey, label, badge }) {
  return (
    <NavLink to={to} className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}>
      <span className="sidebar-icon-wrap">
        <NavIcon d={ICONS[iconKey]} />
      </span>
      <span style={{ flex: 1 }}>{label}</span>
      {badge && (
        <span style={{
          fontSize: '9px', fontWeight: 700, padding: '2px 6px',
          borderRadius: '20px', background: 'rgba(34,197,139,0.2)', color: '#22C58B',
          letterSpacing: '0.04em'
        }}>{badge}</span>
      )}
    </NavLink>
  );
}

// Keep Icons object for backward compatibility
const Icons = {
  Logout: () => <NavIcon d={ICONS.logout} />,
};

export default function Sidebar() {
  const { user, logout, isAdmin } = useAuth();

  return (
    <aside className="sidebar">
      {/* ── Logo ── */}
      <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(34,197,139,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src="/images/logo.png"
          alt="GATExpress AI Logo"
          style={{ height: '38px', width: 'auto', objectFit: 'contain' }}
        />
      </div>

      {/* ── Main Nav ── */}
      <div style={{ padding: '10px 0 6px' }}>
        <p className="sidebar-section-label">Main</p>
        <SideItem to="/dashboard" iconKey="dashboard" label="Dashboard" />
        <SideItem to="/tests" iconKey="courses" label="My Courses" />
        <SideItem to="/materials" iconKey="materials" label="Resources" />
        <SideItem to="/results" iconKey="results" label="My Progress" />
      </div>

      {/* ── AI Tools ── */}
      <div style={{ padding: '6px 0 6px', borderTop: '1px solid rgba(34,197,139,0.08)' }}>
        <p className="sidebar-section-label" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 14, height: 14, borderRadius: 3,
            background: 'linear-gradient(135deg,#22C58B,#059669)'
          }}>
            <svg style={{ width: 8, height: 8, color: '#fff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={ICONS.spark} />
            </svg>
          </span>
          AI Tools
        </p>
        <SideItem to="/ai/planner" iconKey="planner" label="AI Planner" badge="AI" />
        <SideItem to="/ai/doubt" iconKey="doubt" label="Doubt Solver" badge="AI" />
        <SideItem to="/ai/roadmap" iconKey="roadmap" label="Roadmap" badge="AI" />
        <SideItem to="/ai/analysis" iconKey="analysis" label="AI Analysis" badge="AI" />
      </div>

      {/* ── Admin ── */}
      {isAdmin && (
        <div style={{ padding: '6px 0 6px', borderTop: '1px solid rgba(34,197,139,0.08)' }}>
          <p className="sidebar-section-label">Admin</p>
          <SideItem to="/admin" iconKey="admin" label="Admin Panel" />
        </div>
      )}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* ── User profile ── */}
      <div style={{ padding: '10px 10px', borderTop: '1px solid rgba(34,197,139,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 10px', marginBottom: 2 }}>
          <div className="avatar" style={{
            width: 32, height: 32, fontSize: 12, flexShrink: 0,
            background: 'linear-gradient(135deg,#22C58B,#059669)',
            boxShadow: '0 2px 8px rgba(34,197,139,0.3)',
          }}>
            {(user?.name || user?.full_name || user?.username || 'S').charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 12.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.name || user?.full_name || user?.username || 'Student'}
            </p>
            <p style={{ color: '#4B5563', fontSize: 11, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.email || ''}
            </p>
          </div>
        </div>
        <button onClick={logout} className="sidebar-item" style={{ color: '#f87171' }}>
          <span className="sidebar-icon-wrap">
            <NavIcon d={ICONS.logout} />
          </span>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
