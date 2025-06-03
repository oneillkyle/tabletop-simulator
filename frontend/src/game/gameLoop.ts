import { showToast } from '../utils/toast';

export type Turn = 'player' | 'enemy';

export interface GameState {
  turn: Turn;
  round: number;
  playerUnits: any[];
  enemyUnits: any[];
}

export function startNewGame(): GameState {
  return {
    turn: 'player',
    round: 1,
    playerUnits: [],
    enemyUnits: [],
  };
}

export function endTurn(state: GameState): GameState {
  const nextTurn = state.turn === 'player' ? 'enemy' : 'player';
  const nextRound = nextTurn === 'player' ? state.round + 1 : state.round;
  showToast(`${nextTurn.toUpperCase()} turn begins!`);
  return { ...state, turn: nextTurn, round: nextRound };
}
