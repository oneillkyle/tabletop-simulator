import React, { useState } from 'react';
import { askLLM } from '../llm/llmClient';

export default function CommanderChat() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const handleAsk = async () => {
        const prompt = `You are a tactical AI advisor in a turn-based strategy game.
      Provide concise advice for this situation: ${input}`;
        const res = await askLLM(prompt);
        setResponse(res);
    };

    return (
        <div
            style={{
                padding: '1rem',
                backgroundColor: '#111',
                color: 'white'
            }}>
            <h3>🗣️ Ask Commander</h3>
            <textarea
                rows={3}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ width: '100%' }}
            />
            <button onClick={handleAsk} style={{ marginTop: '0.5rem' }}>
                Ask
            </button>
            <p style={{ marginTop: '0.5rem', color: '#0f0' }}>{response}</p>
        </div>
    );
}
