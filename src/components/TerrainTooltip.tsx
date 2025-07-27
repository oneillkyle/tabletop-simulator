import React from 'react';
import { TerrainType, getTerrainEffect } from '../systems/terrain';

export default function TerrainTooltip({ terrain }: { terrain: TerrainType }) {
  const effect = getTerrainEffect(terrain);
  return (
    <div style={{
      backgroundColor: '#222',
      color: 'white',
      padding: '0.5rem',
      border: '1px solid #444',
      borderRadius: '4px',
      fontSize: '0.85rem'
    }}>
      <strong>{terrain.toUpperCase()}</strong><br />
      Cover: {effect.cover}<br />
      Move Cost: {effect.moveCost}
    </div>
  );
}
