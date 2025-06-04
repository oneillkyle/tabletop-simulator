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
  const [brief, setBrief] = useState<string | null>(null);
  const [epilogue, setEpilogue] = useState<string | null>(null);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  useEffect(() => {
    setCampaignNodes(generateCampaign());
  }, []);

  const handleSelect = async (node: any) => {
    const scenario = generateScenarioFromNode(node);
    const briefText = await generateMissionBrief(scenario);
    setScenario(scenario);
    setBrief(briefText);
    setActiveNodeId(node.id);

    // Simulate auto-completion after a delay (for demo purposes)
    setTimeout(async () => {
      const outcome = await generateOutcomeSummary(scenario);
      setEpilogue(outcome);
    }, 3000);
  };

  const handleComplete = (id: string) => {
    setCampaignNodes(prev =>
      prev.map(n => (n.id === id ? { ...n, completed: true } : n))
    );
  };

  const handleCloseOutcome = () => {
    if (activeNodeId) {
      handleComplete(activeNodeId);
    }
    setScenario(null);
    setBrief(null);
    setEpilogue(null);
    setActiveNodeId(null);
  };

  return (
    <>
      <GameDashboard
        gameState={gameState}
        setGameState={setGameState}
        setTheme={setTheme}
        campaignNodes={campaignNodes}
        onCampaignSelect={handleSelect}
        completeNode={handleComplete}
        aiDifficulty={aiDifficulty}
        setAiDifficulty={setAiDifficulty}
        showReasoning={showReasoning}
        setShowReasoning={setShowReasoning}
      />
      <GameBoard scenario={scenario} />
      <CommanderChat />
      {brief && <MissionBrief title={scenario?.missionName || 'Mission'} text={brief} />}
      {epilogue && <MissionOutcome outcome={epilogue} onClose={handleCloseOutcome} />}
    </>
  );
}
