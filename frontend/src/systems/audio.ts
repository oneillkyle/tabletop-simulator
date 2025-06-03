export function playSound(src: string, volume = 1.0) {
  const audio = new Audio(src);
  audio.volume = volume;
  audio.play();
}

export function playAmbientLoop(src: string, volume = 0.5) {
  const audio = new Audio(src);
  audio.loop = true;
  audio.volume = volume;
  audio.play();
  return audio;
}
