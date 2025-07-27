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
import HPBar from './HPBar';

const terrainTextures: Record<number, string> = {
    0: '/textures/grass.png',
    1: '/textures/rock.png'
};
const unitSprites: Record<string, string> = {
    Ranger: '/sprites/ranger.png',
    Sniper: '/sprites/sniper.png',
    Drone: '/sprites/drone.png',
    Brute: '/sprites/brute.png'
};

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

    const obstacleGrid = useMemo(() => {
        const grid = Array.from({ length: GRID_HEIGHT }, () =>
            Array(GRID_WIDTH).fill(0)
        );
        (scenario?.obstacles || []).forEach(([x, y]: [number, number]) => {
            if (y < GRID_HEIGHT && x < GRID_WIDTH) grid[y][x] = 1;
        });
        return grid;
    }, [scenario]);

    useEffect(() => {
        if (!scenario) return;
        const initUnits: Unit[] = [
            ...scenario.playerUnits.map((u: any, i: number) => ({
                id: `p${i}`,
                name: u.name,
                type: u.type,
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
                type: u.type,
                team: 'enemy' as const,
                hp: u.hp,
                maxHp: u.hp,
                position: [GRID_WIDTH - 1, i] as [number, number],
                abilities: []
            }))
        ];
        setUnits(initUnits);
        setTurn('player');
        clearSelection();
    }, [scenario]);

    const getUnitAt = (x: number, y: number) =>
        units.find(
            (u) => u.position[0] === x && u.position[1] === y && u.hp > 0
        );
    const selectedUnit = units.find((u) => u.id === selectedId) || null;

    const clearSelection = () => {
        setSelectedId(null);
        setHighlightTiles([]);
        setCurrentAction(null);
    };

    const endTurn = () => {
        clearSelection();
        setTurn((t) => (t === 'player' ? 'enemy' : 'player'));
    };

    useEffect(() => {
        if (turn !== 'enemy') return;
        let newUnits = [...units];
        for (const u of newUnits) {
            if (u.team !== 'enemy' || u.hp <= 0) continue;
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
            if (bestDist <= 1) {
                newUnits = newUnits.map((x) =>
                    x.id === nearest.id ? basicAttack(x) : x
                );
            } else {
                const path = findPath(
                    obstacleGrid,
                    u.position,
                    nearest.position
                );
                if (path.length > 1) u.position = path[1] as [number, number];
            }
        }
        setUnits(newUnits);
        setTurn('player');
    }, [turn]);

    const handleSelect = (u: Unit) => {
        if (u.team !== turn || u.hp <= 0) return;
        setSelectedId(u.id);
        setCurrentAction(null);
        setHighlightTiles(
            findReachableAStar(obstacleGrid, u.position, MOVE_RANGE)
        );
    };

    const handleTileClick = (x: number, y: number) => {
        if (!selectedUnit || !currentAction) return;
        const target = getUnitAt(x, y);
        let newUnits: Unit[] = units;
        switch (currentAction) {
            case 'Move':
                if (
                    !target &&
                    highlightTiles.some(([hx, hy]) => hx === x && hy === y)
                ) {
                    newUnits = newUnits.map((u) =>
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
                    newUnits = newUnits.map((u) =>
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
                    newUnits = newUnits.map((u) =>
                        u.id === target.id ? rangedAttack(u) : u
                    );
                }
                break;
            default:
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
                    return;
                }
        }
        if (newUnits !== units) {
            setUnits(newUnits);
            endTurn();
        }
    };

    const renderTile = (x: number, y: number) => {
        const isObs = obstacleGrid[y][x] === 1;
        const unit = getUnitAt(x, y);
        const isSel = unit?.id === selectedId;
        const isHl = highlightTiles.some(([hx, hy]) => hx === x && hy === y);
        const texture = terrainTextures[isObs ? 1 : 0];
        const bgStyle = {
            backgroundImage: `url(${texture})`,
            backgroundSize: 'cover'
        };
        return (
            <div
                key={`${x},${y}`}
                onClick={() =>
                    unit && unit.team === turn
                        ? handleSelect(unit)
                        : handleTileClick(x, y)
                }
                style={{
                    position: 'relative',
                    width: 64,
                    height: 64,
                    ...bgStyle,
                    border: isSel ? '2px solid #0f0' : '1px solid #444',
                    boxShadow: isHl ? '0 0 8px #0f0' : 'none',
                    cursor: unit || isHl ? 'pointer' : 'default'
                }}>
                {unit && (
                    <>
                        <img
                            src={unitSprites[unit.type] || ''}
                            alt={unit.name}
                            style={{ width: '80%', height: '80%' }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 2,
                                width: '100%'
                            }}>
                            <HPBar hp={unit.hp} maxHp={unit.maxHp} />
                        </div>
                    </>
                )}
            </div>
        );
    };

    return (
        <div className='relative flex-1 flex justify-center items-center bg-black p-4'>
            <div className=''>
                <h2 className='text-white text-lg mb-2 text-center'>
                    Turn: {turn}
                </h2>
                <div className='grid grid-cols-8 grid-rows-6 gap-1 mx-auto'>
                    {Array.from({ length: GRID_HEIGHT }).flatMap((_, y) =>
                        Array.from({ length: GRID_WIDTH }).map((_, x) =>
                            renderTile(x, y)
                        )
                    )}
                </div>
            </div>
            {selectedUnit && (
                <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 p-2 rounded-lg'>
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
                </div>
            )}
        </div>
    );
}
