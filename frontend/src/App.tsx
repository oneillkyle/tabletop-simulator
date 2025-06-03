import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import TacticalSidebar from './components/ui/TacticalSidebar';
import ScenarioPromptModal from './components/ui/ScenarioPromptModal';
import CampaignLogModal from './components/ui/CampaignLogModal';
import ThemeSelector from './components/ui/ThemeSelector';
import AchievementModal from './components/ui/AchievementModal';
import Toast from './components/ui/Toast';
import { generateNarrative, suggestMove, generateScenario } from './aiService';
import { GameState, Unit } from './engine/GameEngine';
import { saveBattleResult, calculateBattleScore, unlockAchievements } from './campaignLog';

const App = () => {
  const [suggestion, setSuggestion] = useState('');
  const [narrative, setNarrative] = useState('');
  const [showScenarioPrompt, setShowScenarioPrompt] = useState(false);
  const [showCampaignLog, setShowCampaignLog] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [toast, setToast] = useState('');

  const handleNarrative = async (gameState: GameState) => {
    const result = await generateNarrative(gameState);
    setNarrative(result);

    const stats = calculateBattleScore({ gameState, turnsTaken: gameState.turn });
    const achievementMessages = unlockAchievements(stats);

    achievementMessages.forEach(msg => {
      setToast(msg);
      setTimeout(() => setToast(''), 3000);
    });

    saveBattleResult({
      date: new Date().toLocaleString(),
      result: 'Victory (Simulated)',
      summary: result,
      ...stats
    });
  };

  const handleSuggestion = async (gameState: GameState, unit: Unit) => {
    const result = await suggestMove(gameState, unit);
    setSuggestion(result);
  };

  const handleScenario = async (prompt: string) => {
    const scenario = await generateScenario(prompt);
    try {
      const parsed = JSON.parse(scenario);
      (window as any).loadGeneratedGameState(parsed);
    } catch (e) {
      console.error('Invalid scenario format', e);
    }
    setShowScenarioPrompt(false);
  };

  return (
    <div className="app">
      <h1 style={{ color: '#00ffff' }}>
        Tactical Skirmish
        <ThemeSelector />
      </h1>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setShowScenarioPrompt(true)}>New Scenario</button>
        <button onClick={() => setShowCampaignLog(true)}>View Campaign Log</button>
        <button onClick={() => setShowAchievements(true)}>Achievements</button>
        <button onClick={() => handleNarrative((window as any).gameState)}>Summarize Battle</button>
        <button onClick={() => handleSuggestion((window as any).gameState, (window as any).selectedUnit)}>Tactical Advice</button>
      </div>
      <GameBoard />
      <TacticalSidebar suggestion={suggestion} narrative={narrative} />
      {showScenarioPrompt && <ScenarioPromptModal onSubmit={handleScenario} />}
      {showCampaignLog && <CampaignLogModal onClose={() => setShowCampaignLog(false)} />}
      {showAchievements && <AchievementModal onClose={() => setShowAchievements(false)} />}
      {toast && <Toast message={toast} />}
    </div>
  );
};

export default App;
