export interface UnitTemplate {
  name: string;
  maxHp: number;
  abilities: string[];
}

export function createUnit(template: UnitTemplate, position = { x: 0, y: 0 }) {
  return {
    ...template,
    hp: template.maxHp,
    position
  };
}

export const predefinedUnits: UnitTemplate[] = [
  { name: 'Ranger', maxHp: 80, abilities: ['overwatch'] },
  { name: 'Medic', maxHp: 100, abilities: ['heal'] },
  { name: 'Grenadier', maxHp: 90, abilities: ['grenade'] },
];
