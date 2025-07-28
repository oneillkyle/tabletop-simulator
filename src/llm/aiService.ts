import { OpenAI } from 'openai';

const API_PROVIDER = import.meta.env.VITE_LLM_PROVIDER || 'custom';
const BASE_URL = import.meta.env.VITE_API_HOST || '';

let openai: OpenAI | null = null;
// if (API_PROVIDER === 'openai' && OPENAI_API_KEY) {
//     openai = new OpenAI({
//         apiKey: OPENAI_API_KEY,
//         dangerouslyAllowBrowser: true // Only use this in trusted environments
//     });
// }

export async function callLLM(
    prompt: string,
    mode: string = 'free',
    session_id: string = 'default'
): Promise<string> {
    if (API_PROVIDER === 'custom' && BASE_URL) {
        const response = await fetch(BASE_URL + '/openai/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: prompt }],
                stream: false
            })
        });
        const data = await response.json();
        return data.choices[0].message.content || '';
    }

    if (openai) {
        // const chatCompletion = await openai.chat.completions.create({
        //     model: 'gpt-4o-mini',
        //     messages: [{ role: 'user', content: 'write a haiku about ai' }]
        // });

        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            // model: 'gpt-4.1',
            messages: [{ role: 'user', content: prompt }]
        });
        return chatCompletion.choices[0].message.content || '';
    }

    throw new Error('No valid LLM provider configured.');
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
