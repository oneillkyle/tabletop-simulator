import { generateScenario } from '../aiService';

export async function loadLLMScenario(prompt: string): Promise<any> {
  const response = await generateScenario(prompt);
  try {
    return JSON.parse(response);
  } catch {
    return { map: [], enemies: [], message: response };
  }
}
