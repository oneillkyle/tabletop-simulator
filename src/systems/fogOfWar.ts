export function applyFogOfWar(grid: number[][], visibility: boolean[][]): string[][] {
  return grid.map((row, y) =>
    row.map((cell, x) => (visibility[y][x] ? String(cell) : '?'))
  );
}
