const bgm = new Audio('/audio/ambient.mp3');
bgm.loop = true;

export function playMusic() {
  const muted = localStorage.getItem('muted') === 'true';
  if (!muted) bgm.play().catch(() => {});
}

export function stopMusic() {
  bgm.pause();
}

export function toggleMute() {
  const muted = localStorage.getItem('muted') === 'true';
  localStorage.setItem('muted', (!muted).toString());
  if (muted) {
    bgm.play().catch(() => {});
  } else {
    bgm.pause();
  }
}
