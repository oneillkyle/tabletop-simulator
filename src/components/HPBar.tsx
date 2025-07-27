import React from 'react';

export default function HPBar({ hp, maxHp }: { hp: number, maxHp: number }) {
  const percent = Math.max(0, (hp / maxHp) * 100);
  return (
    <div style={{ width: '100%', backgroundColor: '#400', height: '6px', borderRadius: '2px' }}>
      <div style={{
        width: percent + '%',
        height: '100%',
        backgroundColor: '#0f0',
        borderRadius: '2px'
      }} />
    </div>
  );
}
