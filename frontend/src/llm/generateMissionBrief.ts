import { askLLM } from './llmClient';

export async function generateMissionBrief(scenario: any): Promise<string> {
  const prompt = `
Generate a short tactical mission briefing based on the following:
- Player units: ${scenario.playerUnits.map((u: any) => u.name).join(', ')}
- Enemy units: ${scenario.enemyUnits.map((u: any) => u.name).join(', ')}
- Terrain: ${scenario.terrain.join(', ')}
- Objective: ${scenario.objective}

Keep it brief, immersive, and in military tone.
  `;
  return askLLM(prompt);
}
