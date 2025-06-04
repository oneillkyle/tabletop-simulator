import { callLLM } from './aiService';

// export async function generateOutcomeSummary(
//     scenario: any,
//     result: 'victory' | 'defeat'
// ) {
//     const prompt = `
// You are an AI narrator summarizing a battle from a turn-based sci-fi tactics game.

// Mission: ${scenario.missionName}
// Objective: ${scenario.objective}
// Result: ${result}

// Generate a short, gritty narrative epilogue based on the result.
// `;

//     return askLLM(prompt);
// }

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
    return callLLM(prompt);
}
