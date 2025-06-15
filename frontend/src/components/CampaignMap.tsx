// src/components/CampaignMap.tsx

import React from 'react';
import { CampaignNode, canUnlock } from '../game/campaignNodes';

export default function CampaignMap({
  nodes,
  onSelect,
  completeNode
}: {
  nodes: CampaignNode[];
  onSelect: (node: CampaignNode) => void;
  completeNode: (id: string) => void;
}) {
  return (
    <div style={{ padding: '1rem', color: 'white' }}>
      <h3>🗺️ Campaign Map</h3>
      {nodes.map((n) => {
        const unlocked = n.unlocked || canUnlock(n, nodes);
        const labelColor = n.completed
          ? '#666'
          : unlocked
          ? '#0f0'
          : '#555';
        return (
          <div key={n.id} style={{ marginBottom: '0.5rem' }}>
            <span style={{ color: labelColor, marginRight: '0.5rem' }}>
              {n.title}
            </span>
            <button
              disabled={!unlocked || n.completed}
              onClick={() => onSelect(n)}
            >
              {n.completed ? '✔ Completed' : unlocked ? '▶ Play' : '🔒 Locked'}
            </button>
          </div>
        );
      })}
    </div>
  );
}
