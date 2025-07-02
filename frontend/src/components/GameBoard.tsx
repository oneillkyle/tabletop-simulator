import React, { useState, useEffect, useMemo } from 'react';
import {
    Unit,
    isInRange,
    basicAttack,
    rangedAttack
} from '../game/combatSystem';
import { resolveAbility, Ability } from '../systems/unitAbilities';
import { findPath, findReachableAStar } from '../systems/pathfinding';
import { showToast } from '../utils/toast';
import ActionPalette from './ActionPalette';

const GRID_WIDTH = 8;
const GRID_HEIGHT = 6;
const MOVE_RANGE = 2;

export function GameBoard({ scenario }: { scenario: any }) {
    const [units, setUnits] = useState<Unit[]>([]);
    const [turn, setTurn] = useState<'player' | 'enemy'>('player');
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [highlightTiles, setHighlightTiles] = useState<[number, number][]>(
        []
    );
    const [currentAction, setCurrentAction] = useState<string | null>(null);

    // Build obstacle grid once per scenario
    const obstacleGrid = useMemo(() => {
        const grid = Array.from({ length: GRID_HEIGHT }, () =>
            Array(GRID_WIDTH).fill(0)
        );
        (scenario?.obstacles || []).forEach(([x, y]: [number, number]) => {
            if (y < GRID_HEIGHT && x < GRID_WIDTH) grid[y][x] = 1;
        });
        return grid;
    }, [scenario]);

    // Initialize units when scenario loads
    useEffect(() => {
        if (!scenario) return;
        const initUnits: Unit[] = [
            ...scenario.playerUnits.map((u: any, i: number) => ({
                id: `p${i}`,
                name: u.name,
                team: 'player' as const,
                hp: u.hp,
                maxHp: u.hp,
                position: [0, i] as [number, number],
                abilities: Array.isArray(u.abilities)
                    ? (u.abilities as Ability[])
                    : []
            })),
            ...scenario.enemyUnits.map((u: any, i: number) => ({
                id: `e${i}`,
                name: u.name,
                team: 'enemy' as const,
                hp: u.hp,
                maxHp: u.hp,
                position: [GRID_WIDTH - 1, i] as [number, number],
                abilities: []
            }))
        ];
        setUnits(initUnits);
        setTurn('player');
        setSelectedId(null);
        setHighlightTiles([]);
        setCurrentAction(null);
    }, [scenario]);

    const getUnitAt = (x: number, y: number) =>
        units.find(
            (u) => u.position[0] === x && u.position[1] === y && u.hp > 0
        );
    const selectedUnit = units.find((u) => u.id === selectedId) || null;

    // Clear selection/highlights/current action
    const clearSelection = () => {
        setSelectedId(null);
        setHighlightTiles([]);
        setCurrentAction(null);
    };

    // End turn (flip between player and enemy)
    const endTurn = () => {
        clearSelection();
        setTurn((t) => (t === 'player' ? 'enemy' : 'player'));
    };

    // Enemy AI: move or attack then return turn to player
    useEffect(() => {
        if (turn !== 'enemy') return;
        let newUnits = [...units];
        for (const u of units) {
            if (u.team !== 'enemy' || u.hp <= 0) continue;
            // find nearest player
            const players = newUnits.filter(
                (p) => p.team === 'player' && p.hp > 0
            );
            if (!players.length) break;
            let nearest = players[0];
            let bestDist =
                Math.abs(u.position[0] - nearest.position[0]) +
                Math.abs(u.position[1] - nearest.position[1]);
            for (const p of players) {
                const d =
                    Math.abs(u.position[0] - p.position[0]) +
                    Math.abs(u.position[1] - p.position[1]);
                if (d < bestDist) {
                    nearest = p;
                    bestDist = d;
                }
            }
            // attack if in range
            if (bestDist <= 1) {
                newUnits = newUnits.map((x) =>
                    x.id === nearest.id ? basicAttack(x) : x
                );
            } else {
                // move one step toward
                const path = findPath(
                    obstacleGrid,
                    u.position,
                    nearest.position
                );
                if (path.length > 1) u.position = path[1] as [number, number];
            }
        }
        setUnits(newUnits);
        // return to player
        setTurn('player');
        clearSelection();
    }, [turn]);

    // Player selects unit
    const handleSelect = (u: Unit) => {
        if (u.team !== turn || u.hp <= 0) return;
        setSelectedId(u.id);
        setCurrentAction(null);
        setHighlightTiles(
            findReachableAStar(obstacleGrid, u.position, MOVE_RANGE)
        );
    };

    // Handle tile click based on current action
    const handleTileClick = (x: number, y: number) => {
        if (!selectedUnit || !currentAction) return;
        const target = getUnitAt(x, y);
        let newUnits = units;

        switch (currentAction) {
            case 'Move':
                if (
                    !target &&
                    highlightTiles.some(([hx, hy]) => hx === x && hy === y)
                ) {
                    newUnits = units.map((u) =>
                        u.id === selectedUnit.id
                            ? { ...u, position: [x, y] }
                            : u
                    );
                }
                break;
            case 'Basic Attack':
                if (
                    target &&
                    target.team !== turn &&
                    isInRange(selectedUnit, target, 1)
                ) {
                    newUnits = units.map((u) =>
                        u.id === target.id ? basicAttack(u) : u
                    );
                }
                break;
            case 'Ranged Attack':
                if (
                    target &&
                    target.team !== turn &&
                    isInRange(selectedUnit, target, 3)
                ) {
                    newUnits = units.map((u) =>
                        u.id === target.id ? rangedAttack(u) : u
                    );
                }
                break;
            default:
                // special abilities
                if (
                    selectedUnit.abilities.includes(currentAction as Ability) &&
                    target
                ) {
                    showToast(
                        resolveAbility(
                            currentAction as Ability,
                            selectedUnit,
                            target,
                            {}
                        )
                    );
                }
        }

        if (newUnits !== units) {
            setUnits(newUnits);
            endTurn();
        }
    };

    // Render each grid tile
    const renderTile = (x: number, y: number) => {
        const isObstacle = obstacleGrid[y][x] === 1;
        const unit = getUnitAt(x, y);
        const isSel = unit?.id === selectedId;
        const isHl = highlightTiles.some(([hx, hy]) => hx === x && hy === y);
        const bg = isObstacle
            ? '#555'
            : isSel
            ? '#333'
            : isHl
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
                    cursor: unit || isHl ? 'pointer' : 'default',
                    color: unit?.team === 'player' ? '#0f0' : '#f44',
                    fontSize: '1.5rem'
                }}
                title={
                    unit
                        ? `${unit.name} (${unit.hp}/${unit.maxHp})`
                        : isObstacle
                        ? 'Obstacle'
                        : ''
                }>
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
                color: 'white'
            }}>
            <h2>🗺 Turn: {turn}</h2>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${GRID_WIDTH}, 60px)`,
                    gridTemplateRows: `repeat(${GRID_HEIGHT}, 60px)`,
                    gap: 2
                }}>
                {Array.from({ length: GRID_HEIGHT }).flatMap((_, y) =>
                    Array.from({ length: GRID_WIDTH }).map((_, x) =>
                        renderTile(x, y)
                    )
                )}
            </div>

            {selectedUnit && (
                <ActionPalette
                    actions={[
                        'Move',
                        'Basic Attack',
                        'Ranged Attack',
                        ...selectedUnit.abilities
                    ]}
                    current={currentAction}
                    onSelect={setCurrentAction}
                />
            )}
        </div>
    );
}
