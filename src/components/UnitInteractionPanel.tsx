import React from 'react';
import { resolveAbility, Ability } from '../systems/unitAbilities';
import { showToast } from '../utils/toast';

interface Props {
  selectedUnit: any;
  targetUnit: any;
  onUseAbility: (ability: Ability) => void;
}

export default function UnitInteractionPanel({ selectedUnit, targetUnit, onUseAbility }: Props) {
  const abilities: Ability[] = ['overwatch', 'heal', 'grenade'];

  return (
    <div style={{ padding: '1rem', background: '#111', color: 'white' }}>
      <h3>{selectedUnit.name}</h3>
      <p>HP: {selectedUnit.hp}</p>
      <div>
        {abilities.map((a) => (
          <button key={a} onClick={() => onUseAbility(a)} style={{ margin: '0.25rem' }}>
            Use {a}
          </button>
        ))}
      </div>
      {targetUnit && <p>Target: {targetUnit.name} (HP: {targetUnit.hp})</p>}
    </div>
  );
}
