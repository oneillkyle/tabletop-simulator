export type Ability = 'overwatch' | 'heal' | 'grenade';

export function resolveAbility(ability: Ability, unit: any, target: any, gameState: any) {
  switch (ability) {
    case 'overwatch':
      return `${unit.name} is now on overwatch.`;
    case 'heal':
      target.hp = Math.min(target.maxHp, target.hp + 20);
      return `${unit.name} heals ${target.name}.`;
    case 'grenade':
      if (target.hp > 0) target.hp -= 30;
      return `${unit.name} throws a grenade at ${target.name}!`;
    default:
      return 'Unknown ability.';
  }
}
