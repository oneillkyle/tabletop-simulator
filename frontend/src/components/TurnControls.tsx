import React from 'react';
import { GameState, endTurn } from '../game/gameLoop';

export default function TurnControls({ gameState, setGameState }: { gameState: GameState, setGameState: (gs: GameState) => void }) {
  const onEndTurn = () => {
    const updated = endTurn(gameState);
    setGameState(updated);
  };

  return (
    <div style={{ padding: '1rem', color: 'white' }}>
      <h3>Round: {gameState.round}</h3>
      <p>Turn: {gameState.turn.toUpperCase()}</p>
      <button onClick={onEndTurn}>End Turn</button>
    </div>
  );
}
