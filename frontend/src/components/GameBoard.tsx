import React, { useState, useEffect } from 'react';
import { Unit, isInRange, performAttack } from '../game/combatSystem';
import { findReachable } from '../systems/pathfinding';
import { Ability, resolveAbility } from '../systems/unitAbilities';
import { showToast } from '../utils/toast';

const GRID_WIDTH = 8;
const GRID_HEIGHT = 6;
const MOVE_RANGE = 2;

export function GameBoard({ scenario }: { scenario: any }) {
  const [units, setUnits] = useState<Unit[]>([]);
  const [turn, setTurn] = useState<'player' | 'enemy'>('player');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [highlightTiles, setHighlightTiles] = useState<[number, number][]>([]);

  // Build a simple obstacle grid (0 = free, 1 = blocked)
  const obstacleGrid = React.useMemo(() => {
    const grid = Array.from({ length: GRID_HEIGHT }, () =>
      Array(GRID_WIDTH).fill(0)
    );
    (scenario?.obstacles || []).forEach(([x, y]: [number, number]) => {
      if (y < GRID_HEIGHT && x < GRID_WIDTH) grid[y][x] = 1;
    });
    return grid;
  }, [scenario]);

  // Initialize units when a scenario loads
  useEffect(() => {
    if (!scenario) return;
    const starting: Unit[] = [
      ...scenario.playerUnits.map((u: any, i: number) => ({
        id: `p${i}`,
        name: u.name,
        team: 'player' as const,
        hp: u.hp,
        maxHp: u.hp,
        position: [0, i] as [number, number],
        abilities: u.abilities as Ability[],
      })),
      ...scenario.enemyUnits.map((u: any, i: number) => ({
        id: `e${i}`,
        name: u.name,
        team: 'enemy' as const,
        hp: u.hp,
        maxHp: u.hp,
        position: [GRID_WIDTH - 1, i] as [number, number],
        abilities: [], // add enemy abilities if needed
      })),
    ];
    setUnits(starting);
    setTurn('player');
    setSelectedId(null);
    setHighlightTiles([]);
  }, [scenario]);

  const getUnitAt = (x: number, y: number) =>
    units.find((u) => u.position[0] === x && u.position[1] === y && u.hp > 0);

  const selectedUnit = units.find((u) => u.id === selectedId) || null;

  // When you click a unit, highlight its reachable tiles
  const handleSelect = (u: Unit) => {
    if (u.team !== turn || u.hp <= 0) return;
    setSelectedId(u.id);
    setHighlightTiles(findReachable(obstacleGrid, u.position, MOVE_RANGE));
  };

  const clearSelection = () => {
    setSelectedId(null);
    setHighlightTiles([]);
  };

  // Move or attack on tile click
  const handleTileClick = (x: number, y: number) => {
    if (!selectedUnit) return;
    const target = getUnitAt(x, y);

    // Attack if enemy in range
    if (target && target.team !== turn && isInRange(selectedUnit, target)) {
      setUnits((us) =>
        us.map((u) =>
          u.id === target.id ? performAttack(selectedUnit, target) : u
        )
      );
      clearSelection();
      setTurn((t) => (t === 'player' ? 'enemy' : 'player'));
      return;
    }

    // Move if tile is highlighted and empty
    if (!target && highlightTiles.some(([hx, hy]) => hx === x && hy === y)) {
      setUnits((us) =>
        us.map((u) =>
          u.id === selectedUnit.id ? { ...u, position: [x, y] } : u
        )
      );
      clearSelection();
      setTurn((t) => (t === 'player' ? 'enemy' : 'player'));
    }
  };

  // Use a special ability on the first valid target
  const handleAbility = (ability: Ability) => {
    if (!selectedUnit) return;
    const pool = ability === 'heal'
      ? units.filter((u) => u.team === 'player')
      : units.filter((u) => u.team !== 'player');
    const target = pool.find((t) => isInRange(selectedUnit, t, MOVE_RANGE));
    if (target) {
      const msg = resolveAbility(ability, selectedUnit, target, {});
      showToast(msg);
    }
    clearSelection();
  };

  // Render one cell of the grid
  const renderTile = (x: number, y: number) => {
    const isObstacle = obstacleGrid[y]?.[x] === 1;
    const unit = getUnitAt(x, y);
    const isSel = unit?.id === selectedId;
    const isHL = highlightTiles.some(([hx, hy]) => hx === x && hy === y);
    const bg = isObstacle
      ? '#555'
      : isSel
      ? '#333'
      : isHL
      ? '#223'
      : '#111';
    const icon = unit
      ? unit.hp <= 0
        ? '💀'
        : unit.team === 'player'
        ? '🧍'
        : '🤖'
      : '';

    return (
      <div
        key={`${x},${y}`}
        onClick={() =>
          unit && unit.team === turn
            ? handleSelect(unit)
            : handleTileClick(x, y)
        }
        style={{
          width: 60,
          height: 60,
          backgroundColor: bg,
          border: '1px solid #444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: unit || isHL ? 'pointer' : 'default',
          fontSize: '1.5rem',
          color: unit?.team === 'player' ? '#0f0' : '#f44',
        }}
        title={
          unit
            ? `${unit.name} (${unit.hp}/${unit.maxHp})`
            : isObstacle
            ? 'Obstacle'
            : ''
        }
      >
        {icon}
      </div>
    );
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 320,
        right: 0,
        bottom: 0,
        backgroundColor: '#000',
        padding: '1rem',
        color: 'white',
      }}
    >
      <h2>🗺 Game Board — Turn: {turn}</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_WIDTH}, 60px)`,
          gridTemplateRows: `repeat(${GRID_HEIGHT}, 60px)`,
          gap: 2,
        }}
      >
        {Array.from({ length: GRID_HEIGHT }).flatMap((_, y) =>
          Array.from({ length: GRID_WIDTH }).map((_, x) =>
            renderTile(x, y)
          )
        )}
      </div>

      {selectedUnit?.abilities?.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Abilities:</h3>
          {selectedUnit.abilities.map((a) => (
            <button
              key={a}
              onClick={() => handleAbility(a as Ability)}
              style={{ marginRight: '0.5rem' }}
            >
              {a}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
