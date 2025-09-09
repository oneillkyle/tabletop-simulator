import React, { useId, useState } from 'react';
import ThemeSelector from './ThemeSelector';
import AudioControl from './AudioControl';
import CampaignMap from './CampaignMap';
import ScenarioPanel from './ScenarioPanel';
import AISettingsPanel from './AISettingsPanel';

type Difficulty = 'easy' | 'normal' | 'hard';
type Side = 'left' | 'right';

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
    setShowReasoning,
    side = 'left', // NEW: which side the panel sits on
    onVisibilityChange,
    openSignal
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
    side?: Side;
    onVisibilityChange?: (v: boolean) => void;
    openSignal?: number;
}) {
    const [visible, setVisible] = useState(true);
    const panelId = useId();

    React.useEffect(() => {
        onVisibilityChange?.(visible);
    }, [visible, onVisibilityChange]);

    React.useEffect(() => {
        if (openSignal !== undefined) setVisible(true);
    }, [openSignal]);

    const toggle = () => setVisible((v) => !v);

    const card = 'rounded-lg border border-zinc-800 bg-zinc-950/40 p-4';
    const heading = 'text-sm font-semibold tracking-wide text-zinc-200';

    const completed = campaignNodes.filter((n) => n.completed).length;
    const total = campaignNodes.length;

    // Position the toggle button against the *inner* edge
    const togglePos =
        side === 'right'
            ? 'left-0 rounded-r-md border-l-0'
            : 'right-0 rounded-l-md border-r-0';

    // Slide outwards: left panels slide -translate-x-full; right panels slide +translate-x-full
    const slideClass = visible
        ? 'translate-x-0'
        : side === 'right'
        ? 'translate-x-full'
        : '-translate-x-full';

    return (
        <div className='relative flex h-full flex-col'>
            <button
                type='button'
                onClick={toggle}
                aria-expanded={visible}
                aria-controls={panelId}
                title={visible ? 'Collapse dashboard' : 'Expand dashboard'}
                className={`absolute top-3 z-10 inline-flex items-center justify-center border border-zinc-800 bg-zinc-900 px-2 py-1 text-zinc-200 shadow hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 ${togglePos}`}>
                {side === 'right' ? (visible ? '⏵' : '⏴') : visible ? '⏴' : '⏵'}
            </button>

            <div
                id={panelId}
                className={`flex-1 transform-gpu overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 shadow-sm transition-transform duration-300 ${slideClass}`}>
                <h2 className='mb-4 text-base font-semibold text-zinc-100'>
                    🎛 Dashboard
                </h2>

                <section className={`${card} mb-4`}>
                    <h3 className={heading}>Appearance</h3>
                    <div className='mt-3'>
                        <ThemeSelector setTheme={setTheme} />
                    </div>
                </section>

                <section className={`${card} mb-4`}>
                    <h3 className={heading}>Audio</h3>
                    <div className='mt-3'>
                        <AudioControl />
                    </div>
                </section>

                <section className={`${card} mb-4`}>
                    <div className='mb-3 flex items-baseline justify-between'>
                        <h3 className={heading}>Campaign Map</h3>
                        <span className='text-xs text-zinc-400'>
                            {completed}/{total} complete
                        </span>
                    </div>
                    <CampaignMap
                        nodes={campaignNodes}
                        onSelect={onCampaignSelect}
                        completeNode={completeNode}
                    />
                </section>

                <section className={`${card} mb-4`}>
                    <h3 className={heading}>Scenario</h3>
                    <div className='mt-3'>
                        <ScenarioPanel
                            gameState={gameState}
                            setGameState={setGameState}
                        />
                    </div>
                </section>

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
