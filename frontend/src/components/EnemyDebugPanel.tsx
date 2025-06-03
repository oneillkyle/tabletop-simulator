import React from 'react';

export default function EnemyDebugPanel({ reasoning }: { reasoning: string }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      backgroundColor: '#111',
      color: '#0f0',
      padding: '0.5rem',
      fontSize: '0.9rem',
      fontFamily: 'monospace'
    }}>
      <strong>🧠 Enemy AI:</strong> {reasoning}
    </div>
  );
}
