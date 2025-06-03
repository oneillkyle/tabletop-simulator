import React from 'react';

export default function AISettingsPanel({
  difficulty,
  showReasoning,
  setDifficulty,
  setShowReasoning
}: {
  difficulty: 'easy' | 'normal' | 'hard',
  showReasoning: boolean,
  setDifficulty: (d: 'easy' | 'normal' | 'hard') => void,
  setShowReasoning: (s: boolean) => void
}) {
  return (
    <div style={{ padding: '1rem' }}>
      <h3>🧠 AI Settings</h3>
      <label>Difficulty:</label><br />
      {['easy', 'normal', 'hard'].map((level) => (
        <label key={level} style={{ marginRight: '1rem' }}>
          <input
            type="radio"
            name="difficulty"
            checked={difficulty === level}
            onChange={() => setDifficulty(level as 'easy' | 'normal' | 'hard')}
          /> {level}
        </label>
      ))}

      <div style={{ marginTop: '1rem' }}>
        <label>
          <input
            type="checkbox"
            checked={showReasoning}
            onChange={() => setShowReasoning(!showReasoning)}
          /> Show AI Reasoning
        </label>
      </div>
    </div>
  );
}
