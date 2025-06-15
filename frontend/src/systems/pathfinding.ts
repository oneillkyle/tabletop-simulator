// simple BFS to find all reachable tiles within a given move range,
// avoiding obstacles (grid cells with value 1)

export function findReachable(
  grid: number[][],
  start: [number, number],
  range: number
): [number, number][] {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Set<string>();
  const result: [number, number][] = [];
  const queue: Array<[number, number, number]> = [
    [start[0], start[1], 0],
  ];

  while (queue.length) {
    const [x, y, dist] = queue.shift()!;
    const key = `${x},${y}`;
    if (visited.has(key) || dist > range) continue;
    visited.add(key);
    if (dist > 0) result.push([x, y]);

    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ] as [number, number][]) {
      const nx = x + dx;
      const ny = y + dy;
      if (
        nx >= 0 &&
        nx < cols &&
        ny >= 0 &&
        ny < rows &&
        grid[ny][nx] === 0
      ) {
        queue.push([nx, ny, dist + 1]);
      }
    }
  }
  return result;
}
