import axios from 'axios';

const API_PROVIDER = import.meta.env.VITE_LLM_PROVIDER || 'openai'; // 'openai' or 'local'
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const LOCAL_URL = import.meta.env.VITE_LOCAL_LLM_URL || 'http://localhost:11434/api/generate';

async function callLLM(prompt: string): Promise<string> {
  if (API_PROVIDER === 'openai') {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }]
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.choices[0].message.content;
  } else {
    const response = await axios.post(LOCAL_URL, {
      prompt,
      stream: false
    });
    return response.data.response || '';
  }
}

export async function generateScenario(prompt: string): Promise<string> {
  const fullPrompt = \`Generate a tactical battle scenario in JSON format based on the following input: \${prompt}\`;
  return await callLLM(fullPrompt);
}

export async function suggestMove(gameState: any, unit: any): Promise<string> {
  const input = JSON.stringify({ gameState, unit }, null, 2);
  const prompt = \`Suggest a tactical move for this unit in the game state:
\${input}\`;
  return await callLLM(prompt);
}

export async function generateNarrative(gameState: any): Promise<string> {
  const input = JSON.stringify(gameState, null, 2);
  const prompt = \`Write a mission summary narrative based on this final game state:
\${input}\`;
  return await callLLM(prompt);
}
