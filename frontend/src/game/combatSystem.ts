export type Unit = {
  id: string;
  name: string;
  team: 'player' | 'enemy';
  hp: number;
  maxHp: number;
  position: [number, number];
  moved?: boolean;
  acted?: boolean;
};

export function isInRange(a: Unit, b: Unit, range = 1) {
  const dx = Math.abs(a.position[0] - b.position[0]);
  const dy = Math.abs(a.position[1] - b.position[1]);
  return dx + dy <= range;
}

export function performAttack(attacker: Unit, target: Unit) {
  const damage = 20;
  return {
    ...target,
    hp: Math.max(0, target.hp - damage),
  };
}

// performs a move‐then‐attack combo:
// moves attacker along `path` (array of coords), then if an enemy is in range,
// executes performAttack on the nearest one
export function performCombo(
  units: Unit[],
  attackerId: string,
  path: [number, number][],
  range = 1
): Unit[] {
  const attacker = units.find(u => u.id === attackerId);
  if (!attacker) return units;

  // move attacker to end of path
  const finalPos = path[path.length - 1];
  let updated = units.map(u =>
    u.id === attackerId ? { ...u, position: finalPos } : u
  );

  // find enemies in range
  const enemies = updated.filter(
    u =>
      u.team !== attacker.team &&
      Math.abs(u.position[0] - finalPos[0]) + Math.abs(u.position[1] - finalPos[1]) <= range
  );
  if (enemies.length) {
    // pick weakest enemy
    enemies.sort((a,b) => a.hp - b.hp);
    const target = enemies[0];
    updated = updated.map(u =>
      u.id === target.id
        ? { ...u, hp: Math.max(0, u.hp - 25) } // combo attack damage
        : u
    );
  }

  return updated;
}
