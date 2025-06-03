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
      {nodes.map((n) => (
        <div key={n.id} style={{ marginBottom: '0.5rem' }}>
          <button
            onClick={() => onSelect(n)}
            disabled={!n.unlocked && !canUnlock(n, nodes)}
          >
            {n.name} {n.completed ? '✔' : n.unlocked ? '🔓' : '🔒'}
          </button>
          {n.unlocked && !n.completed && (
            <button onClick={() => completeNode(n.id)}>✔ Complete</button>
          )}
        </div>
      ))}
    </div>
  );
}
