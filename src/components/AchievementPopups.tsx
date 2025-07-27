import React from 'react';

export default function AchievementPopups({ achievements }: { achievements: string[] }) {
  return (
    <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}>
      {achievements.map((ach, index) => (
        <div key={index} style={{
          backgroundColor: '#222',
          color: 'white',
          padding: '0.5rem 1rem',
          margin: '0.5rem',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)'
        }}>
          🎉 Achievement Unlocked: {ach}
        </div>
      ))}
    </div>
  );
}
