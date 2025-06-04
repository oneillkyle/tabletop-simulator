
import React, { useState, useEffect } from 'react';
import { Unit, isInRange, performAttack } from '../game/combatSystem';

export function GameBoard({ scenario }: { scenario: any }) {
  const [units, setUnits] = useState<Unit[]>([]);
  const [turn, setTurn] = useState<'player' | 'enemy'>('player');
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (scenario) {
      const startingUnits: Unit[] = [
        ...scenario.playerUnits.map((u: any, i: number) => ({
          id: `p${i}`,
          name: u.name,
          team: 'player',
          hp: u.hp,
          maxHp: u.hp,
          position: [0, i],
        })),
        ...scenario.enemyUnits.map((u: any, i: number) => ({
          id: `e${i}`,
          name: u.name,
          team: 'enemy',
          hp: u.hp,
          maxHp: u.hp,
          position: [4, i],
        })),
      ];
      setUnits(startingUnits);
      setTurn('player');
    }
  }, [scenario]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 80px)', gap: '8px', margin: '1rem 0' }}>
      {units.map((unit) => (
        <div
          key={unit.id}
          style={{
            backgroundColor: unit.team === 'player' ? '#0af' : '#f33',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '4px',
            textAlign: 'center',
          }}
        >
          <strong>{unit.name}</strong>
          <div>{unit.hp} HP</div>
        </div>
      ))}
    </div>
  );
}
