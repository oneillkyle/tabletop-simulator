export function performEnemyTurn(gameState: any): any {
  const newState = { ...gameState };
  newState.enemyUnits = newState.enemyUnits.map(enemy => {
    const player = newState.playerUnits[0];
    if (!player) return enemy;

    const dx = player.position.x - enemy.position.x;
    const dy = player.position.y - enemy.position.y;
    const dist = Math.abs(dx) + Math.abs(dy);

    if (dist > 1) {
      return {
        ...enemy,
        position: {
          x: enemy.position.x + Math.sign(dx),
          y: enemy.position.y + Math.sign(dy),
        }
      };
    } else {
      player.hp -= 20;
    }

    return enemy;
  });
  return newState;
}
