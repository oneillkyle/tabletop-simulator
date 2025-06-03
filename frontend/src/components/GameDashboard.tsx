import React, { useState } from 'react';
import ThemeSelector from './ThemeSelector';
import AudioControl from './AudioControl';
import CampaignMap from './CampaignMap';
import ScenarioPanel from './ScenarioPanel';

export default function GameDashboard({
  gameState,
  setGameState,
  setTheme,
  campaignNodes,
  onCampaignSelect,
  completeNode
}: {
  gameState: any;
  setGameState: (state: any) => void;
  setTheme: (theme: any) => void;
  campaignNodes: any[];
  onCampaignSelect: (node: any) => void;
  completeNode: (id: string) => void;
}) {
  const [visible, setVisible] = useState(true);

  return (
    <div style={{
      position: 'absolute',
      left: visible ? 0 : -320,
      top: 0,
      width: 320,
      height: '100%',
      backgroundColor: '#000',
      color: 'white',
      overflowY: 'auto',
      transition: 'left 0.3s ease-in-out',
      padding: '1rem',
      boxShadow: visible ? '2px 0 8px rgba(0,0,0,0.5)' : 'none'
    }}>
      <button onClick={() => setVisible(!visible)} style={{
        position: 'absolute',
        right: -40,
        top: 20,
        transform: 'rotate(90deg)',
        background: '#111',
        color: 'white',
        border: 'none',
        padding: '0.5rem'
      }}>
        {visible ? '⏴' : '⏵'}
      </button>

      <h2>🎛 Dashboard</h2>
      <ThemeSelector setTheme={setTheme} />
      <AudioControl />
      <CampaignMap nodes={campaignNodes} onSelect={onCampaignSelect} completeNode={completeNode} />
      <ScenarioPanel gameState={gameState} setGameState={setGameState} />
    </div>
  );
}
