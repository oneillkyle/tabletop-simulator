import React from 'react';

export default function MissionSummary({ summary, onClose }: { summary: any, onClose: () => void }) {
  return (
    <div style={{
      position: 'absolute',
      top: '20%',
      left: '25%',
      width: '50%',
      backgroundColor: '#111',
      color: 'white',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 0 20px #000'
    }}>
      <h2>Mission Complete</h2>
      <p>Outcome: {summary.outcome}</p>
      <p>Turns Taken: {summary.turns}</p>
      <p>Enemies Defeated: {summary.kills}</p>
      <p>Rank: {summary.rank}</p>
      <p>Achievements: {summary.achievements.join(', ')}</p>
      <button onClick={onClose}>Continue</button>
    </div>
  );
}
