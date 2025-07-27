// simple step‐toward logic
export function moveEnemiesTowards(
  units: Unit[],
  obstacleGrid: number[][]
): Unit[] {
  return units.map((u) => {
    if (u.team !== 'enemy' || u.hp <= 0) return u;

    // find nearest alive player
    const players = units.filter((p) => p.team === 'player' && p.hp > 0);
    if (players.length === 0) return u;

    let nearest = players[0];
    let bestDist = Math.abs(u.position[0] - nearest.position[0]) + Math.abs(u.position[1] - nearest.position[1]);
    for (const p of players) {
      const d = Math.abs(u.position[0] - p.position[0]) + Math.abs(u.position[1] - p.position[1]);
      if (d < bestDist) {
        nearest = p;
        bestDist = d;
      }
    }

    // compute step delta
    const dx = nearest.position[0] - u.position[0];
    const dy = nearest.position[1] - u.position[1];
    const stepX = dx === 0 ? 0 : dx / Math.abs(dx);
    const stepY = dy === 0 ? 0 : dy / Math.abs(dy);

    // try horizontal first, then vertical
    const tryPos: [number, number][] = [
      [u.position[0] + stepX, u.position[1]],
      [u.position[0], u.position[1] + stepY],
    ];

    for (const [nx, ny] of tryPos) {
      if (
        ny >= 0 &&
        ny < obstacleGrid.length &&
        nx >= 0 &&
        nx < obstacleGrid[0].length &&
        obstacleGrid[ny][nx] === 0 &&
        !units.find((o) => o.position[0] === nx && o.position[1] === ny && o.hp > 0)
      ) {
        return { ...u, position: [nx, ny] as [number, number] };
      }
    }

    return u; // stuck
  });
}
