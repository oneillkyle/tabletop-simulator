import React, { useId, useState } from 'react';
import ThemeSelector from './ThemeSelector';
import AudioControl from './AudioControl';
import CampaignMap from './CampaignMap';
import ScenarioPanel from './ScenarioPanel';
import AISettingsPanel from './AISettingsPanel';

type Difficulty = 'easy' | 'normal' | 'hard';

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
    aiDifficulty: Difficulty;
    setAiDifficulty: (d: Difficulty) => void;
    showReasoning: boolean;
    setShowReasoning: (v: boolean) => void;
}) {
    const [visible, setVisible] = useState(true);
    const panelId = useId();

    const card = 'rounded-lg border border-zinc-800 bg-zinc-950/40 p-4';
    const heading = 'text-sm font-semibold tracking-wide text-zinc-200';

    const completed = campaignNodes.filter((n) => n.completed).length;
    const total = campaignNodes.length;

    return (
        <div className='relative flex h-full flex-col'>
            {/* Collapse toggle */}
            <button
                type='button'
                onClick={() => setVisible((v) => !v)}
                aria-expanded={visible}
                aria-controls={panelId}
                title={visible ? 'Collapse dashboard' : 'Expand dashboard'}
                className='absolute right-0 top-3 z-10 inline-flex items-center justify-center rounded-l-md border border-zinc-800 bg-zinc-900 px-2 py-1 text-zinc-200 shadow hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400'>
                {visible ? '⏴' : '⏵'}
            </button>

            {/* Sliding panel */}
            <div
                id={panelId}
                className={[
                    'flex-1 transform-gpu overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 shadow-sm transition-transform duration-300',
                    visible ? 'translate-x-0' : '-translate-x-full'
                ].join(' ')}>
                {/* Title */}
                <h2 className='mb-4 text-base font-semibold text-zinc-100'>
                    🎛 Dashboard
                </h2>

                {/* Appearance */}
                <section className={`${card} mb-4`}>
                    <h3 className={heading}>Appearance</h3>
                    <div className='mt-3'>
                        <ThemeSelector setTheme={setTheme} />
                    </div>
                </section>

                {/* Audio */}
                <section className={`${card} mb-4`}>
                    <h3 className={heading}>Audio</h3>
                    <div className='mt-3'>
                        <AudioControl />
                    </div>
                </section>

                {/* Campaign map */}
                <section className={`${card} mb-4`}>
                    <div className='mb-3 flex items-baseline justify-between'>
                        <h3 className={heading}>Campaign Map</h3>
                        <span className='text-xs text-zinc-400'>
                            {completed}/{total} complete
                        </span>
                    </div>
                    {/* NOTE: CampaignMap no longer renders its own frame/header */}
                    <CampaignMap
                        nodes={campaignNodes}
                        onSelect={onCampaignSelect}
                        completeNode={completeNode}
                    />
                </section>

                {/* Scenario */}
                <section className={`${card} mb-4`}>
                    <h3 className={heading}>Scenario</h3>
                    <div className='mt-3'>
                        <ScenarioPanel
                            gameState={gameState}
                            setGameState={setGameState}
                        />
                    </div>
                </section>

                {/* AI settings */}
                <section className={card}>
                    <h3 className={heading}>AI Settings</h3>
                    <div className='mt-3'>
                        <AISettingsPanel
                            difficulty={aiDifficulty}
                            setDifficulty={setAiDifficulty}
                            showReasoning={showReasoning}
                            setShowReasoning={setShowReasoning}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}
