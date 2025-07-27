import { callLLM } from "../llm/aiService";

export async function getEnemyAction(
    enemyUnit: any,
    gameState: any,
    difficulty: 'easy' | 'normal' | 'hard' = 'normal'
): Promise<{ action: string; reasoning: string }> {
    const personality = {
        easy: 'play defensively and retreat often',
        normal: 'balance defense and offense',
        hard: 'be aggressive and use flanking tactics'
    };

    const prompt = `
You are an AI enemy commander in a turn-based skirmish game.

Unit:
- Name: ${enemyUnit.name}
- HP: ${enemyUnit.hp}
- Position: ${enemyUnit.position.x},${enemyUnit.position.y}

Game state includes terrain and visible enemy positions.
Playstyle: ${personality[difficulty]}

Decide one action: [attack|overwatch|move|retreat]. Justify briefly and end with the action on a new line.
`;

    const response = await callLLM(prompt);
    const lower = response.toLowerCase();

    const action = lower.includes('retreat')
        ? 'retreat'
        : lower.includes('overwatch')
        ? 'overwatch'
        : lower.includes('move')
        ? 'move'
        : 'attack';

    return { action, reasoning: response };
}
