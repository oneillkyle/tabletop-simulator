import React from 'react';

export default function MissionBrief({ title, text }: { title: string, text: string }) {
  return (
    <div style={{
      position: 'absolute',
      top: 80,
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
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}
