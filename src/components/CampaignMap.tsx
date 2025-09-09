import React, { useState } from 'react';
import { CampaignNode, canUnlock } from '../game/campaignNodes';

export default function CampaignMap({
    nodes,
    onSelect,
    completeNode
}: {
    nodes: CampaignNode[];
    onSelect: (node: CampaignNode) => Promise<void>;
    completeNode: (id: string) => void;
}) {
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const handleClick = async (node: CampaignNode) => {
        const unlocked = node.unlocked || canUnlock(node, nodes);
        if (loadingId || !unlocked || node.completed) return;
        setLoadingId(node.id);
        try {
            await onSelect(node);
            completeNode(node.id);
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <ul className='space-y-2'>
            {nodes.map((n) => {
                const unlocked = n.unlocked || canUnlock(n, nodes);
                const isLoading = loadingId === n.id;

                let statusText = 'Locked';
                let statusClasses =
                    'inline-flex items-center gap-1 rounded-full border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-xs text-zinc-400';
                if (n.completed) {
                    statusText = 'Completed';
                    statusClasses =
                        'inline-flex items-center gap-1 rounded-full border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-xs text-zinc-300';
                } else if (unlocked) {
                    statusText = 'Unlocked';
                    statusClasses =
                        'inline-flex items-center gap-1 rounded-full border border-lime-500/30 bg-lime-500/10 px-2 py-0.5 text-xs text-lime-300';
                }

                const titleClasses = n.completed
                    ? 'text-zinc-400 line-through'
                    : unlocked
                    ? 'text-zinc-100'
                    : 'text-zinc-500';

                const btnBase =
                    'inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2';
                const btnDisabled =
                    'cursor-not-allowed border border-zinc-700 bg-zinc-800 text-zinc-500 focus-visible:ring-zinc-700';
                const btnPlay =
                    'bg-lime-400 text-zinc-900 hover:bg-lime-300 focus-visible:ring-lime-400';
                const btnDone =
                    'border border-zinc-700 bg-zinc-900 text-zinc-400 focus-visible:ring-zinc-700';

                return (
                    <li
                        key={n.id}
                        className='grid grid-cols-1 items-center gap-3 rounded-md border border-zinc-900 bg-zinc-950/30 p-3 sm:grid-cols-[1fr_auto]'>
                        <div className='min-w-0'>
                            <div className='flex items-center gap-2'>
                                <span className={`truncate ${titleClasses}`}>
                                    {n.title}
                                </span>
                                <span
                                    className={statusClasses}
                                    aria-label={`Status: ${statusText}`}>
                                    {n.completed ? '✔' : unlocked ? '●' : '🔒'}{' '}
                                    {statusText}
                                </span>
                            </div>
                            {n.subtitle ? (
                                <p className='mt-0.5 truncate text-xs text-zinc-500'>
                                    {n.subtitle}
                                </p>
                            ) : null}
                        </div>

                        <div className='sm:justify-self-end'>
                            <button
                                onClick={() => handleClick(n)}
                                disabled={
                                    !unlocked ||
                                    n.completed ||
                                    loadingId !== null
                                }
                                className={[
                                    btnBase,
                                    !unlocked || loadingId !== null
                                        ? btnDisabled
                                        : n.completed
                                        ? btnDone
                                        : btnPlay,
                                    isLoading ? 'opacity-60 cursor-wait' : ''
                                ].join(' ')}
                                aria-label={
                                    isLoading
                                        ? 'Loading mission'
                                        : n.completed
                                        ? 'Mission completed'
                                        : unlocked
                                        ? 'Play mission'
                                        : 'Mission locked'
                                }
                                title={
                                    isLoading
                                        ? 'Loading…'
                                        : n.completed
                                        ? 'Completed'
                                        : unlocked
                                        ? 'Play'
                                        : 'Locked'
                                }>
                                {isLoading
                                    ? 'Loading…'
                                    : n.completed
                                    ? '✔ Completed'
                                    : unlocked
                                    ? '▶ Play'
                                    : '🔒 Locked'}
                            </button>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
