
import React, { useState, useEffect } from 'react';
import GameDashboard from './components/GameDashboard';
import CommanderChat from './components/CommanderChat';
import { GameBoard } from './components/GameBoard';
import MissionBrief from './components/MissionBrief';
import MissionOutcome from './components/MissionOutcome';
import { generateCampaign } from './game/generateCampaign';
import { generateScenarioFromNode } from './game/generateScenario';
import { generateMissionBrief } from './llm/generateMissionBrief';
import { generateOutcomeSummary } from './llm/generateOutcomeSummary';

export default function App() {
  const [gameState, setGameState] = useState({});
  const [theme, setTheme] = useState('default');
  const [aiDifficulty, setAiDifficulty] = useState<'easy' | 'normal' | 'hard'>('normal');
  const [showReasoning, setShowReasoning] = useState(false);
  const [campaignNodes, setCampaignNodes] = useState<any[]>([]);
  const [scenario, setScenario] = useState<any>(null);

  useEffect(() => {
    const campaign = generateCampaign();
    setCampaignNodes(campaign);
  }, []);

  useEffect(() => {
    if (campaignNodes.length > 0 && !scenario) {
      const node = campaignNodes[0]; // Select the first node for now
      const newScenario = generateScenarioFromNode(node);
      setScenario(newScenario);
    }
  }, [campaignNodes, scenario]);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Tabletop Skirmish Simulator</h1>
      {scenario ? (
        <>
          <MissionBrief title={scenario.missionName} text={scenario.objective} />
          <GameBoard scenario={scenario} />
          <CommanderChat scenario={scenario} />
        </>
      ) : (
        <p>Loading scenario...</p>
      )}
    </div>
  );
}
