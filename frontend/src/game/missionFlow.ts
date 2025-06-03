import { generateMissionBrief } from '../llm/generateMissionBrief';
import { generateOutcomeSummary } from '../llm/generateOutcomeSummary';

export async function createMissionIntro(scenario: any): Promise<string> {
  return await generateMissionBrief(scenario);
}

export async function createMissionEpilogue(result: any): Promise<string> {
  return await generateOutcomeSummary(result);
}
