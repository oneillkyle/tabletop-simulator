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
        <div className='bg-gray-700 text-gray-100 p-4 rounded-lg'>
            <h3 className='text-lg font-semibold mb-3'>🗺️ Campaign Map</h3>
            <div className='space-y-2'>
                {nodes.map((n) => {
                    const unlocked = n.unlocked || canUnlock(n, nodes);
                    const labelClass = n.completed
                        ? 'text-gray-500'
                        : unlocked
                        ? 'text-green-400'
                        : 'text-gray-600';
                    const isLoading = loadingId === n.id;
                    return (
                        <div
                            key={n.id}
                            className='flex justify-between items-center'>
                            <span className={`${labelClass} flex-1`}>
                                {n.title}
                            </span>
                            <button
                                onClick={() => handleClick(n)}
                                disabled={
                                    !unlocked ||
                                    n.completed ||
                                    loadingId !== null
                                }
                                className={`ml-2 px-3 py-1 rounded font-medium transition-colors duration-200
                  ${
                      n.completed
                          ? 'bg-gray-600 text-gray-400'
                          : unlocked
                          ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                          : 'bg-gray-600 text-gray-500 cursor-not-allowed'
                  }
                  ${isLoading ? 'opacity-50 cursor-wait' : ''}`}>
                                {isLoading
                                    ? 'Loading...'
                                    : n.completed
                                    ? '✔ Completed'
                                    : unlocked
                                    ? '▶ Play'
                                    : '🔒 Locked'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
