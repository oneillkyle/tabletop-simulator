export type TerrainType = 'plain' | 'forest' | 'hill' | 'water';

export function getTerrainEffect(terrain: TerrainType): { cover: number, moveCost: number } {
  switch (terrain) {
    case 'plain':
      return { cover: 0, moveCost: 1 };
    case 'forest':
      return { cover: 2, moveCost: 2 };
    case 'hill':
      return { cover: 1, moveCost: 2 };
    case 'water':
      return { cover: 0, moveCost: 3 };
    default:
      return { cover: 0, moveCost: 1 };
  }
}
