import axios from 'axios';

const API_PROVIDER = import.meta.env.VITE_LLM_PROVIDER || 'openai';
const BASE_URL = import.meta.env.VITE_LLM_BASE_URL || '';

async function callLLM(prompt: string, mode: string = 'free', session_id: string = 'default'): Promise<string> {
  if (API_PROVIDER === 'custom' && BASE_URL) {
    const response = await axios.post(BASE_URL + '/generate', {
      prompt, mode, session_id
    });
    return response.data.response;
  }

  const openaiRes = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }]
  }, {
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });
  return openaiRes.data.choices[0].message.content;
}

export async function generateScenario(prompt: string) {
  return await callLLM(prompt, 'scenario');
}

export async function suggestMove(gameState: any, unit: any) {
  const input = JSON.stringify({ gameState, unit }, null, 2);
  return await callLLM(input, 'suggestion');
}

export async function generateNarrative(gameState: any) {
  const input = JSON.stringify(gameState, null, 2);
  return await callLLM(input, 'narrative');
}
