import React, { useState } from 'react';
import { moveUnit, selectTarget } from '../game/unitActions';
import { resolveAbility } from '../systems/unitAbilities';
import { showToast } from '../utils/toast';
import UnitInteractionPanel from './UnitInteractionPanel';

export default function GameBoard() {
  const [playerUnits, setPlayerUnits] = useState([{ name: 'Alpha', hp: 100, maxHp: 100, position: { x: 1, y: 1 } }]);
  const [enemyUnits, setEnemyUnits] = useState([{ name: 'Drone', hp: 80, maxHp: 80, position: { x: 3, y: 3 } }]);
  const [selectedUnit, setSelectedUnit] = useState<any | null>(null);
  const [targetUnit, setTargetUnit] = useState<any | null>(null);

  const handleCellClick = (x: number, y: number) => {
    if (selectedUnit) {
      const newUnit = moveUnit(selectedUnit, x, y);
      setPlayerUnits(units =>
        units.map(u => (u.name === selectedUnit.name ? newUnit : u))
      );
      showToast(`${selectedUnit.name} moved to (${x}, ${y})`);
      setSelectedUnit(null);
      setTargetUnit(null);
    } else {
      const clicked = selectTarget(playerUnits, x, y);
      if (clicked) {
        setSelectedUnit(clicked);
        showToast(`Selected ${clicked.name}`);
      }
    }
  };

  const onUseAbility = (ability: any) => {
    if (selectedUnit && targetUnit) {
      const msg = resolveAbility(ability, selectedUnit, targetUnit, {});
      showToast(msg);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 50px)', gap: '2px', background: '#222', padding: '10px' }}>
      {[...Array(5)].map((_, y) =>
        [...Array(5)].map((_, x) => {
          const player = playerUnits.find(u => u.position.x === x && u.position.y === y);
          const enemy = enemyUnits.find(u => u.position.x === x && u.position.y === y);
          return (
            <div
              key={x + '-' + y}
              onClick={() => handleCellClick(x, y)}
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: player ? '#0f0' : enemy ? '#f00' : '#444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {player?.name?.charAt(0) || enemy?.name?.charAt(0) || ''}
            </div>
          );
        })
      )}
      {selectedUnit && (
        <UnitInteractionPanel
          selectedUnit={selectedUnit}
          targetUnit={targetUnit}
          onUseAbility={onUseAbility}
        />
      )}
    </div>
  );
}
