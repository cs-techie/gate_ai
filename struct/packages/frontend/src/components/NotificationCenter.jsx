import React, { useState } from 'react';

const NotificationCenter = ({ notifications = [] }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const THEME = {
    surface: '#1E293B',
    text: '#E2E8F0',
    textMuted: '#94A3B8',
    primary: '#3B82F6',
    warning: '#F59E0B',
    success: '#10B981',
    danger: '#EF4444',
  };

  const S = {
    container: { position: 'relative' },
    bell: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      background: THEME.primary,
      border: 'none',
      cursor: 'pointer',
      color: 'white',
      fontSize: '24px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      zIndex: 999,
      transition: 'all 0.2s',
    },
    panel: {
      position: 'fixed',
      bottom: '90px',
      right: '20px',
      background: THEME.surface,
      borderRadius: '12px',
      border: `1px solid #334155`,
      width: '320px',
      maxHeight: '400px',
      overflowY: 'auto',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      zIndex: 999,
    },
    notifItem: {
      padding: '12px',
      borderBottom: '1px solid #334155',
      fontSize: '13px',
      color: THEME.text,
    },
  };

  const mockNotifications = [
    { type: 'warning', message: '⚠️ Missed today\'s study session!' },
    { type: 'reminder', message: '📅 Revision for Deadlocks due today' },
    { type: 'success', message: '✓ Great! You completed 10 MCQs' },
  ];

  const notifs = notifications.length > 0 ? notifications : mockNotifications;

  return (
    <div style={S.container}>
      <button
        style={S.bell}
        onClick={() => setShowNotifications(!showNotifications)}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        🔔
      </button>
      {showNotifications && (
        <div style={S.panel}>
          {notifs.map((notif, idx) => (
            <div key={idx} style={S.notifItem}>
              {notif.message || notif}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
