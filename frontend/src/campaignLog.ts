
export function unlockAchievements({ playerLost, enemiesDefeated }) {
  const unlocked = JSON.parse(localStorage.getItem('achievements') || '[]');
  const newUnlocks = [];

  if (!unlocked.includes('first_win')) {
    unlocked.push('first_win');
    newUnlocks.push('Achievement Unlocked: First Victory');
  }

  if (playerLost === 0 && !unlocked.includes('flawless')) {
    unlocked.push('flawless');
    newUnlocks.push('Achievement Unlocked: Flawless Victory');
  }

  if (enemiesDefeated >= 10 && !unlocked.includes('killer')) {
    unlocked.push('killer');
    newUnlocks.push('Achievement Unlocked: Wipe Them Out');
  }

  localStorage.setItem('achievements', JSON.stringify(unlocked));
  return newUnlocks;
}
