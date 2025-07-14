import React, { useState } from 'react';
import { loadLLMScenario } from '../game/scenarioLoader';
import { saveGameState, loadGameState } from '../utils/firebaseSave';
import { showToast } from '../utils/toast';

export default function ScenarioPanel({
    gameState,
    setGameState
}: {
    gameState: any;
    setGameState: (state: any) => void;
}) {
    const [prompt, setPrompt] = useState('');
    const [userId, setUserId] = useState('demo-user');
    const [loading, setLoading] = useState(false);

    const handleScenarioLoad = async () => {
        setLoading(true);
        const scenario = await loadLLMScenario(prompt);
        if (scenario.map || scenario.enemies) {
            setGameState({
                ...gameState,
                map: scenario.map || [],
                enemyUnits: scenario.enemies || []
            });
            showToast('LLM scenario loaded!');
        } else {
            showToast('Failed to load scenario');
        }
        setLoading(false);
    };

    const handleSave = async () => {
        await saveGameState(userId, gameState);
        showToast('Game state saved!');
    };

    const handleLoad = async () => {
        const state = await loadGameState(userId);
        if (state) {
            setGameState(state);
            showToast('Game state loaded!');
        } else {
            showToast('No saved game found.');
        }
    };

    return (
        <div className='bg-gray-600 text-gray-100 p-4 rounded-lg shadow space-y-3'>
            <h3 className='text-lg font-medium'>
                📜 Scenario Loader + Save/Load
            </h3>
            <div className='flex flex-col space-y-2'>
                <label className='text-sm'>User ID:</label>
                <input
                    className='w-full p-2 bg-gray-700 rounded text-gray-100 focus:outline-none'
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
            </div>
            <div className='flex flex-col space-y-2'>
                <textarea
                    rows={4}
                    className='w-full p-2 bg-gray-700 rounded text-gray-100 focus:outline-none resize-none'
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder='Enter prompt for LLM scenario generation'
                />
                <button
                    onClick={handleScenarioLoad}
                    disabled={loading}
                    className='w-full px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded'>
                    {loading ? 'Loading...' : 'Load LLM Scenario'}
                </button>
            </div>
            <div className='flex space-x-2 pt-2 border-t border-gray-500'>
                <button
                    onClick={handleSave}
                    className='flex-1 px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded'>
                    💾 Save
                </button>
                <button
                    onClick={handleLoad}
                    className='flex-1 px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded'>
                    📂 Load
                </button>
            </div>
        </div>
    );
}
