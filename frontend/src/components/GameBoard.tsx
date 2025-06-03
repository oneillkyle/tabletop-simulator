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

  const handleClick = (unit: Unit) => {
    if (unit.team !== turn || unit.hp <= 0) return;
    setSelected(unit.id);
  };

  const handleAction = (target: Unit) => {
    const attacker = units.find(u => u.id === selected);
    if (attacker && isInRange(attacker, target)) {
      const updated = units.map(u =>
        u.id === target.id ? performAttack(attacker, target) : u
      );
      setUnits(updated);
      setSelected(null);
      setTurn(turn === 'player' ? 'enemy' : 'player');
    }
  };

  const handleMove = () => {
    const unit = units.find(u => u.id === selected);
    if (!unit) return;
    const newPos: [number, number] = [unit.position[0] + 1, unit.position[1]];
    const updated = units.map(u =>
      u.id === unit.id ? { ...u, position: newPos } : u
    );
    setUnits(updated);
    setSelected(null);
  };

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 320,
      right: 0,
      bottom: 0,
      backgroundColor: '#111',
      color: 'white',
      padding: '1rem'
    }}>
      <h2>🗺 Game Board</h2>
      <p>Turn: {turn}</p>
      <button onClick={handleMove} disabled={!selected}>Move ➡️</button>
      {units.map(unit => (
        <div
          key={unit.id}
          onClick={() =>
            selected && unit.team !== turn ? handleAction(unit) : handleClick(unit)
          }
          style={{
            cursor: 'pointer',
            color: unit.hp <= 0 ? '#555' : unit.team === 'player' ? '#0f0' : '#f00',
            fontWeight: selected === unit.id ? 'bold' : undefined
          }}
        >
          {unit.name} ({unit.hp}/{unit.maxHp}) [{unit.position.join(',')}]
        </div>
      ))}
    </div>
  );
}
