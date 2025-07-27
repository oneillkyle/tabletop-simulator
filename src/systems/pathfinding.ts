// A* pathfinding on a grid with obstacles (1 = blocked, 0 = free)

type Node = { x: number; y: number; g: number; f: number; parent?: Node };

function heuristic(a: [number, number], b: [number, number]) {
  // Manhattan distance
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

export function findPath(
  grid: number[][],
  start: [number, number],
  goal: [number, number]
): [number, number][] {
  const rows = grid.length,
        cols = grid[0].length;
  const open: Node[] = [{
    x: start[0],
    y: start[1],
    g: 0,
    f: heuristic(start, goal)
  }];
  const closed = new Set<string>();

  while (open.length) {
    // pick node with lowest f
    open.sort((a,b) => a.f - b.f);
    const current = open.shift()!;
    const key = `${current.x},${current.y}`;
    if (closed.has(key)) continue;
    closed.add(key);

    // reached goal
    if (current.x === goal[0] && current.y === goal[1]) {
      const path: [number, number][] = [];
      let n: Node|undefined = current;
      while (n) {
        path.unshift([n.x, n.y]);
        n = n.parent;
      }
      return path;
    }

    // neighbors
    for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]] as [number,number][]) {
      const nx = current.x + dx, ny = current.y + dy;
      if (
        nx < 0 || nx >= cols || ny < 0 || ny >= rows ||
        grid[ny][nx] === 1
      ) continue;
      const gScore = current.g + 1;
      const hScore = heuristic([nx,ny], goal);
      open.push({ x: nx, y: ny, g: gScore, f: gScore + hScore, parent: current });
    }
  }

  return []; // no path
}

// Compute all reachable tiles within range using A* ≤ range
export function findReachableAStar(
  grid: number[][],
  start: [number, number],
  range: number
): [number, number][] {
  const reachable = new Set<string>();
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const path = findPath(grid, start, [x,y]);
      if (path.length && path.length-1 <= range) {
        reachable.add(`${x},${y}`);
      }
    }
  }
  return Array.from(reachable).map(s => {
    const [x,y] = s.split(',').map(Number);
    return [x,y] as [number,number];
  });
}
