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
    const [gameState, setGameState] = useState<Record<string, unknown>>({});
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
    const [sidebarOpen, setSidebarOpen] = useState(true); // NEW
    const [openSignal, setOpenSignal] = useState(0);

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

    const btnPrimary =
        'inline-flex items-center gap-2 rounded-md bg-lime-400 px-3 py-2 text-sm font-medium text-zinc-900 shadow transition hover:bg-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400';

    return (
        <section className='mx-auto w-full max-w-6xl px-6 py-10'>
            <header className='mb-6'>
                <h1 className='text-3xl font-bold text-zinc-100'>
                    AI Tabletop Simulator
                </h1>
                <p className='mt-2 text-zinc-300'>
                    Warhammer-inspired skirmishes with AI-driven battles. Choose
                    a mission, play the scenario, and view the AI-generated
                    debrief.
                </p>
            </header>

            {/* Two-column layout: main + sticky dashboard (no outer card) */}
            <div
                id='game-container'
                className={`grid gap-6 md:items-start transition-[grid-template-columns] duration-300 ${
                    sidebarOpen ? 'md:grid-cols-[1fr_320px]' : 'md:grid-cols-1'
                }`}>
                {/* Main play surface */}
                <section className='relative min-h-[68vh] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-4'>
                    {!sidebarOpen && (
                        <button
                            type='button'
                            onClick={() => {
                                setSidebarOpen(true); // show the aside column again
                                setOpenSignal((n) => n + 1); // tell GameDashboard to open its slide
                            }}
                            className='inline-flex absolute right-3 top-3 items-center gap-2 rounded-md bg-lime-400 px-3 py-2 text-sm font-medium text-zinc-900 shadow hover:bg-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400'
                            aria-label='Open dashboard'
                            title='Open dashboard'>
                            📊 Open Dashboard
                        </button>
                    )}
                    {scenario ? (
                        <>
                            <div className='rounded-lg border border-zinc-800 bg-zinc-950/30 p-2'>
                                <GameBoard scenario={scenario} />
                            </div>

                            {!epilogue && (
                                <div className='pointer-events-none sticky bottom-0 mt-4 flex justify-end'>
                                    <button
                                        onClick={handleFinishMission}
                                        className={`${btnPrimary} pointer-events-auto`}
                                        title='Finish mission and generate outcome'>
                                        🏁 End Mission
                                    </button>
                                </div>
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
                        <div className='flex h-full items-center justify-center'>
                            <p className='text-zinc-400'>
                                Select a mission from the sidebar to begin.
                            </p>
                        </div>
                    )}
                </section>

                {/* Sidebar: hide column entirely on desktop when closed */}
                <aside
                    className={`${
                        sidebarOpen ? 'md:block' : 'md:hidden'
                    } md:sticky md:top-20 md:self-start`}>
                    <div className='md:h-[calc(100vh-6rem)]'>
                        <GameDashboard
                            side='right'
                            onVisibilityChange={setSidebarOpen}
                            openSignal={openSignal} // NEW: passes the signal down
                            gameState={gameState}
                            setGameState={setGameState}
                            setTheme={setTheme}
                            campaignNodes={campaignNodes}
                            onCampaignSelect={handleSelect}
                            completeNode={(id) =>
                                setCampaignNodes((prev) =>
                                    prev.map((n) =>
                                        n.id === id
                                            ? { ...n, completed: true }
                                            : n
                                    )
                                )
                            }
                            aiDifficulty={aiDifficulty}
                            setAiDifficulty={setAiDifficulty}
                            showReasoning={showReasoning}
                            setShowReasoning={setShowReasoning}
                        />
                    </div>
                </aside>
            </div>
        </section>
    );
}
