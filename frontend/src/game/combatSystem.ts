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
