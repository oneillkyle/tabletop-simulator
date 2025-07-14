import React, { useState } from 'react';
import ThemeSelector from './ThemeSelector';
import AudioControl from './AudioControl';
import CampaignMap from './CampaignMap';
import ScenarioPanel from './ScenarioPanel';
import AISettingsPanel from './AISettingsPanel';

export default function GameDashboard({
    gameState,
    setGameState,
    setTheme,
    campaignNodes,
    onCampaignSelect,
    completeNode,
    aiDifficulty,
    setAiDifficulty,
    showReasoning,
    setShowReasoning
}: {
    gameState: any;
    setGameState: (state: any) => void;
    setTheme: (theme: any) => void;
    campaignNodes: any[];
    onCampaignSelect: (node: any) => void;
    completeNode: (id: string) => void;
    aiDifficulty: 'easy' | 'normal' | 'hard';
    setAiDifficulty: (d: 'easy' | 'normal' | 'hard') => void;
    showReasoning: boolean;
    setShowReasoning: (v: boolean) => void;
}) {
    const [visible, setVisible] = useState(true);

    return (
        <div className='h-full relative flex flex-col'>
            {/* Toggle Button */}
            <button
                onClick={() => setVisible(!visible)}
                className='absolute top-4 right-0 bg-gray-800 text-gray-200 p-2 rounded-l-lg z-10 focus:outline-none'>
                {visible ? '⏴' : '⏵'}
            </button>

            {/* Dashboard Content */}
            <div
                className={`flex-1 flex flex-col overflow-y-auto transition-transform duration-300 bg-gray-700 text-gray-100 p-4 space-y-4 rounded-xl shadow-lg ${
                    visible ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <h2 className='text-xl font-semibold'>🎛 Dashboard</h2>
                <ThemeSelector setTheme={setTheme} />
                <AudioControl />
                <CampaignMap
                    nodes={campaignNodes}
                    onSelect={onCampaignSelect}
                    completeNode={completeNode}
                />
                <ScenarioPanel
                    gameState={gameState}
                    setGameState={setGameState}
                />
                <AISettingsPanel
                    difficulty={aiDifficulty}
                    setDifficulty={setAiDifficulty}
                    showReasoning={showReasoning}
                    setShowReasoning={setShowReasoning}
                />
            </div>
        </div>
    );
}
