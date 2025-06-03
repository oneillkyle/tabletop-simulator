import React, { useState, useEffect } from 'react';
import achievementsData from '../../data/achievements.json';

const AchievementModal = ({ onClose }) => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('achievements');
    const base = achievementsData.achievements;
    const unlocked = stored ? JSON.parse(stored) : [];
    const merged = base.map((ach) => ({
      ...ach,
      unlocked: unlocked.includes(ach.id)
    }));
    setAchievements(merged);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '10%',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#222',
      padding: '1rem',
      border: '2px solid #0ff',
      width: '400px',
      zIndex: 1000
    }}>
      <h3>Achievements</h3>
      <ul>
        {achievements.map((ach) => (
          <li key={ach.id} style={{ marginBottom: '0.5rem' }}>
            <strong style={{ color: ach.unlocked ? '#0f0' : '#666' }}>{ach.title}</strong><br />
            <span>{ach.description}</span>
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AchievementModal;
