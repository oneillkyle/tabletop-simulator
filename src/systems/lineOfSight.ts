export function computeLineOfSight(grid: number[][], origin: { x: number, y: number }, radius: number): boolean[][] {
  const rows = grid.length;
  const cols = grid[0].length;
  const visible = Array.from({ length: rows }, () => Array(cols).fill(false));

  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const x = origin.x + dx;
      const y = origin.y + dy;
      if (x >= 0 && y >= 0 && y < rows && x < cols && Math.sqrt(dx * dx + dy * dy) <= radius) {
        visible[y][x] = true;
      }
    }
  }

  return visible;
}
