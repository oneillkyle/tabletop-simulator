import React from 'react';

type Props = {
    actions: string[];
    current: string | null;
    onSelect: (action: string) => void;
};

export default function ActionPalette({ actions, current, onSelect }: Props) {
    return (
        <div
            style={{
                display: 'flex',
                gap: '0.5rem',
                marginTop: '1rem',
                backgroundColor: '#222',
                padding: '0.5rem',
                borderRadius: '4px'
            }}>
            {actions.map((a) => (
                <button
                    key={a}
                    onClick={() => onSelect(a)}
                    style={{
                        backgroundColor: current === a ? '#0f0' : '#444',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}>
                    {a}
                </button>
            ))}
        </div>
    );
}
