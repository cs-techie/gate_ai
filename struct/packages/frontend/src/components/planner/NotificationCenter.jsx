import { useState } from 'react';

const THEME = {
  bg: '#0F172A',
  surface: '#1E293B',
  border: '#334155',
  text: '#E2E8F0',
  textMuted: '#94A3B8',
  primary: '#3B82F6',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
};

export default function NotificationCenter({ notifications }) {
  const [showAll, setShowAll] = useState(false);

  const getTypeColor = (type) => {
    switch (type) {
      case 'warning':
        return THEME.warning;
      case 'success':
        return THEME.success;
      case 'danger':
        return THEME.danger;
      default:
        return THEME.primary;
    }
  };

  const notificationsToShow = showAll ? notifications : notifications.slice(0, 2);

  return (
    <div style={{
      marginBottom: 24,
      maxWidth: '100%',
    }}>
      {notificationsToShow.length > 0 && (
        <div>
          {notificationsToShow.map((notif) => (
            <div
              key={notif.id}
              style={{
                background: `${getTypeColor(notif.type)}22`,
                border: `1px solid ${getTypeColor(notif.type)}33`,
                borderLeft: `4px solid ${getTypeColor(notif.type)}`,
                borderRadius: 8,
                padding: '12px 16px',
                marginBottom: 8,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <p style={{ fontSize: 13, color: THEME.text, fontWeight: 500, margin: 0 }}>
                  {notif.message}
                </p>
                <p style={{ fontSize: 11, color: THEME.textMuted, margin: '4px 0 0 0' }}>
                  {notif.time}
                </p>
              </div>
              <button
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: THEME.textMuted,
                  cursor: 'pointer',
                  fontSize: 16,
                }}
              >
                ✕
              </button>
            </div>
          ))}
          {notifications.length > 2 && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'transparent',
                color: THEME.primary,
                border: `1px solid ${THEME.border}`,
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 600,
                marginTop: 8,
              }}
            >
              View all notifications ({notifications.length})
            </button>
          )}
        </div>
      )}
    </div>
  );
}
