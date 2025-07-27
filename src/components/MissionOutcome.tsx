import React from 'react';

export default function MissionOutcome({
    outcome,
    onClose
}: {
    outcome: string;
    onClose: () => void;
}) {
    return (
        <div
            style={{
                position: 'absolute',
                top: '20%',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#111',
                color: '#0f0',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 0 20px #000'
            }}>
            <button
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    background: 'transparent',
                    border: 'none',
                    color: '#0f0',
                    fontSize: '1.2rem',
                    cursor: 'pointer'
                }}>
                ✖
            </button>
            <h2>📜 Mission Outcome</h2>
            <p style={{ whiteSpace: 'pre-wrap' }}>{outcome}</p>
        </div>
    );
}
