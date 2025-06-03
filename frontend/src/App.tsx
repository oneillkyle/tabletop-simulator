import React, { useState } from 'react';
import GameDashboard from './components/GameDashboard';
import CommanderChat from './components/CommanderChat';
import GameBoard from './components/GameBoard';

export default function App() {
    const [gameState, setGameState] = useState({});
    const [theme, setTheme] = useState('default');
    const [aiDifficulty, setAiDifficulty] = useState<
        'easy' | 'normal' | 'hard'
    >('normal');
    const [showReasoning, setShowReasoning] = useState(false);
    const campaignNodes: any[] = [];

    const handleSelect = (node: any) => {};
    const handleComplete = (id: string) => {};

    return (
        <>
            <GameDashboard
                gameState={gameState}
                setGameState={setGameState}
                setTheme={setTheme}
                campaignNodes={campaignNodes}
                onCampaignSelect={handleSelect}
                completeNode={handleComplete}
                aiDifficulty={aiDifficulty}
                setAiDifficulty={setAiDifficulty}
                showReasoning={showReasoning}
                setShowReasoning={setShowReasoning}
            />
            <GameBoard />
            <CommanderChat />
        </>
    );
}
