import React, { useState } from 'react';

const StudySchedule = ({ schedule = [] }) => {
  const THEME = {
    bg: '#0F172A',
    surface: '#1E293B',
    text: '#E2E8F0',
    textMuted: '#94A3B8',
    primary: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
  };

  const S = {
    container: { padding: '20px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' },
    dayCard: { background: THEME.surface, padding: '16px', borderRadius: '10px', border: `1px solid #334155` },
    dayHeader: { fontSize: '16px', fontWeight: 'bold', color: THEME.primary, marginBottom: '10px' },
    task: { padding: '8px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '6px', marginBottom: '8px', fontSize: '13px', color: THEME.text },
    hours: { fontSize: '12px', color: THEME.textMuted, marginTop: '8px' },
  };

  const mockSchedule = [
    { day: 'Monday', tasks: ['DSA - Arrays', 'Practice 10 Problems'], hours: '2.5h' },
    { day: 'Tuesday', tasks: ['OS - Deadlocks', 'Mock Quiz'], hours: '3h' },
    { day: 'Wednesday', tasks: ['Database - SQL', 'Practice Joins'], hours: '2h' },
    { day: 'Thursday', tasks: ['Revision - Week 1', 'Error Analysis'], hours: '2.5h' },
    { day: 'Friday', tasks: ['Networks - Routing', 'Case Studies'], hours: '3h' },
    { day: 'Saturday', tasks: ['Full Mock Test', 'Performance Review'], hours: '4h' },
    { day: 'Sunday', tasks: ['Weak Topics Review', 'Planning'], hours: '1.5h' },
  ];

  const scheduleData = schedule.length > 0 ? schedule : mockSchedule;

  return (
    <div style={S.container}>
      <h3 style={{ color: THEME.text, marginBottom: '20px' }}>📅 Weekly Study Schedule</h3>
      <div style={S.grid}>
        {scheduleData.map((day, idx) => (
          <div key={idx} style={S.dayCard}>
            <div style={S.dayHeader}>{day.day}</div>
            {day.tasks.map((task, i) => (
              <div key={i} style={S.task}>✓ {task}</div>
            ))}
            <div style={S.hours}>⏱️ {day.hours}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudySchedule;
