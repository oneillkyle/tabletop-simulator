import { askLLM } from './llmClient';

export async function generateOutcomeSummary(result: any): Promise<string> {
  const prompt = `
Create a short epilogue for this mission outcome:
- Outcome: ${result.outcome}
- Turns taken: ${result.turns}
- Units defeated: ${result.kills}
- Units lost: ${result.losses}
- Achievements: ${result.achievements.join(', ')}

Make it immersive and tone-matched to success or failure.
  `;
  return askLLM(prompt);
}
