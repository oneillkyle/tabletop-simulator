import React, { useEffect, useState } from 'react';
import { generateCampaign } from '../game/generateCampaign';
import { generateScenarioFromNode } from '../game/generateScenario';
import { generateMissionBrief } from '../llm/generateMissionBrief';
import { generateOutcomeSummary } from '../llm/generateOutcomeSummary';
import { GameBoard } from '../components/GameBoard';
import GameDashboard from '../components/GameDashboard';
import MissionBrief from '../components/MissionBrief';
import MissionOutcome from '../components/MissionOutcome';

export default function TabletopSimulatorPage() {
    const [gameState, setGameState] = useState({});
    const [theme, setTheme] = useState('default');
    const [aiDifficulty, setAiDifficulty] = useState<
        'easy' | 'normal' | 'hard'
    >('normal');
    const [showReasoning, setShowReasoning] = useState(false);
    const [campaignNodes, setCampaignNodes] = useState<any[]>([]);
    const [scenario, setScenario] = useState<any>(null);
    const [brief, setBrief] = useState<string | null>(null);
    const [epilogue, setEpilogue] = useState<string | null>(null);
    const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

    useEffect(() => {
        setCampaignNodes(generateCampaign());
    }, []);

    const handleSelect = async (node: any) => {
        const sc = generateScenarioFromNode(node);
        const briefText = await generateMissionBrief(sc);
        setScenario(sc);
        setBrief(briefText);
        setActiveNodeId(node.id);
    };

    const handleFinishMission = async () => {
        if (!scenario) return;
        const outcomeText = await generateOutcomeSummary(scenario);
        setEpilogue(outcomeText);
    };

    const handleCloseOutcome = () => {
        if (activeNodeId) {
            setCampaignNodes((prev) =>
                prev.map((n) =>
                    n.id === activeNodeId
                        ? { ...n, completed: true, unlocked: true }
                        : n
                )
            );
        }
        setScenario(null);
        setBrief(null);
        setEpilogue(null);
        setActiveNodeId(null);
    };

    return (
        <div className='space-y-4'>
            <h1 className='text-3xl font-bold text-indigo-300'>
                AI Tabletop Simulator
            </h1>
            <div
                id='game-container'
                className='flex bg-gray-800 border border-gray-700 rounded-2xl p-6 h-[600px] shadow-inner overflow-hidden'>
                {/* Sidebar */}
                <aside className="order-2 w-full min-w-0 overflow-y-auto p-0 md:order-1 md:h-full md:w-80">
                    <GameDashboard
                        gameState={gameState}
                        setGameState={setGameState}
                        setTheme={setTheme}
                        campaignNodes={campaignNodes}
                        onCampaignSelect={handleSelect}
                        completeNode={(id) =>
                            setCampaignNodes((prev) =>
                                prev.map((n) =>
                                    n.id === id ? { ...n, completed: true } : n
                                )
                            )
                        }
                        aiDifficulty={aiDifficulty}
                        setAiDifficulty={setAiDifficulty}
                        showReasoning={showReasoning}
                        setShowReasoning={setShowReasoning}
                    />
                </aside>
                {/* Main Content */}
                <section className='flex-1 bg-gray-900 rounded-xl p-4 relative overflow-auto min-w-0'>
                    {scenario ? (
                        <>
                            <GameBoard scenario={scenario} />
                            {!epilogue && (
                                <button
                                    onClick={handleFinishMission}
                                    className='absolute bottom-4 right-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg'>
                                    🏁 End Mission
                                </button>
                            )}
                            {brief && (
                                <MissionBrief
                                    title={scenario?.missionName || 'Mission'}
                                    text={brief}
                                    onClose={() => setBrief(null)}
                                />
                            )}
                            {epilogue && (
                                <MissionOutcome
                                    outcome={epilogue}
                                    onClose={handleCloseOutcome}
                                />
                            )}
                        </>
                    ) : (
                        <p className='text-gray-400'>
                            Select a mission from the sidebar.
                        </p>
                    )}
                </section>
            </div>
        </div>
    );
}
