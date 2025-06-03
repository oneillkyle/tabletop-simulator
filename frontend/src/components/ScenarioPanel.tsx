import React, { useState } from 'react';
import { loadLLMScenario } from '../game/scenarioLoader';
import { saveGameState, loadGameState } from '../utils/firebaseSave';
import { showToast } from '../utils/toast';

export default function ScenarioPanel({ gameState, setGameState }: { gameState: any, setGameState: (state: any) => void }) {
  const [prompt, setPrompt] = useState('');
  const [userId, setUserId] = useState('demo-user');
  const [loading, setLoading] = useState(false);

  const handleScenarioLoad = async () => {
    setLoading(true);
    const scenario = await loadLLMScenario(prompt);
    if (scenario.map || scenario.enemies) {
      setGameState({
        ...gameState,
        map: scenario.map || [],
        enemyUnits: scenario.enemies || [],
      });
      showToast('LLM scenario loaded!');
    } else {
      showToast('Failed to load scenario');
    }
    setLoading(false);
  };

  const handleSave = async () => {
    await saveGameState(userId, gameState);
    showToast('Game state saved!');
  };

  const handleLoad = async () => {
    const state = await loadGameState(userId);
    if (state) {
      setGameState(state);
      showToast('Game state loaded!');
    } else {
      showToast('No saved game found.');
    }
  };

  return (
    <div style={{ padding: '1rem', backgroundColor: '#111', color: 'white' }}>
      <h3>📜 Scenario Loader + Save/Load</h3>
      <label>User ID: </label>
      <input value={userId} onChange={(e) => setUserId(e.target.value)} />
      <br /><br />
      <textarea
        rows={4}
        cols={50}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt for LLM scenario generation"
      />
      <br />
      <button onClick={handleScenarioLoad} disabled={loading}>
        {loading ? 'Loading...' : 'Load LLM Scenario'}
      </button>
      <hr />
      <button onClick={handleSave}>💾 Save Game</button>
      <button onClick={handleLoad}>📂 Load Game</button>
    </div>
  );
}
