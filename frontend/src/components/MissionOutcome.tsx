import React from 'react';

export default function MissionOutcome({ outcome, onClose }: { outcome: string, onClose: () => void }) {
  return (
    <div style={{
      position: 'absolute',
      top: 100,
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#111',
      color: '#0f0',
      padding: '1rem',
      border: '1px solid #0f0',
      width: '80%',
      maxWidth: 600,
      fontFamily: 'monospace'
    }}>
      <h2>📜 Mission Outcome</h2>
      <p>{outcome}</p>
      <button onClick={onClose} style={{ marginTop: '1rem' }}>Continue</button>
    </div>
  );
}
