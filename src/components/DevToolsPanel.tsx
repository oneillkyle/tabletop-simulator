import React, { useState } from 'react';
import { generateScenario, suggestMove, generateNarrative } from '../aiService';

const DevToolsPanel = () => {
  const [mode, setMode] = useState('scenario');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const runPrompt = async () => {
    let result = '';
    if (mode === 'scenario') {
      result = await generateScenario(prompt);
    } else if (mode === 'suggestion') {
      const dummyGameState = { turn: 1, playerUnits: [], enemyUnits: [] };
      const dummyUnit = { name: 'Test Unit', position: { x: 0, y: 0 } };
      result = await suggestMove(dummyGameState, dummyUnit);
    } else if (mode === 'narrative') {
      const dummyGameState = { outcome: 'Victory', turns: 4 };
      result = await generateNarrative(dummyGameState);
    }
    setResponse(result);
  };

  return (
    <div style={{ padding: '1rem', backgroundColor: '#111', color: '#0ff' }}>
      <h3>🛠 Developer Tools</h3>
      <label>
        Mode:&nbsp;
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="scenario">Generate Scenario</option>
          <option value="suggestion">Suggest Move</option>
          <option value="narrative">Generate Narrative</option>
        </select>
      </label>
      <br /><br />
      <textarea
        rows={5}
        cols={60}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your test prompt here..."
      />
      <br />
      <button onClick={runPrompt}>Send to LLM</button>
      <br /><br />
      <div style={{ backgroundColor: '#222', padding: '1rem', height: '200px', overflow: 'auto' }}>
        <strong>Response:</strong>
        <pre>{response}</pre>
      </div>
    </div>
  );
};

export default DevToolsPanel;
