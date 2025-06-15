import React, { useState, useEffect } from 'react';
import GameDashboard from './components/GameDashboard';
import CommanderChat from './components/CommanderChat';
import { GameBoard } from './components/GameBoard';
import MissionBrief from './components/MissionBrief';
import MissionOutcome from './components/MissionOutcome';
import { generateCampaign } from './game/generateCampaign';
import { generateScenarioFromNode } from './game/generateScenario';
import { generateMissionBrief } from './llm/generateMissionBrief';
import { generateOutcomeSummary } from './llm/generateOutcomeSummary';

export default function App() {
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

    // load nodes once on mount
    useEffect(() => {
        setCampaignNodes(generateCampaign());
    }, []);

    // when player selects a node, load scenario and show briefing
    const handleSelect = async (node: any) => {
        const sc = generateScenarioFromNode(node);
        const briefText = await generateMissionBrief(sc);
        setScenario(sc);
        setBrief(briefText);
        setActiveNodeId(node.id);
        // do not auto-complete; wait for user
    };

    // end mission on user click, generate epilogue
    const handleFinishMission = async () => {
        if (!scenario) return;
        const outcomeText = await generateOutcomeSummary(scenario);
        setEpilogue(outcomeText);
    };

    // close epilogue, mark node complete, reset
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
        <>
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

            {/* Board and controls only after scenario is set */}
            {scenario && (
                <>
                    <GameBoard scenario={scenario} />

                    {
                        /* Show briefing modal */
                        brief && (
                            <MissionBrief
                                title={scenario?.missionName || 'Mission'}
                                text={brief}
                                onClose={() => setBrief(null)}
                            />
                        )
                    }

                    {
                        /* End Mission button inside board */
                        scenario && !epilogue && (
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: -50,
                                    left: 340
                                }}>
                                <button onClick={handleFinishMission}>
                                    🏁 End Mission
                                </button>
                            </div>
                        )
                    }

                    {
                        /* Show outcome modal */
                        epilogue && (
                            <MissionOutcome
                                outcome={epilogue}
                                onClose={handleCloseOutcome}
                            />
                        )
                    }
                </>
            )}

            <CommanderChat />
        </>
    );
}
