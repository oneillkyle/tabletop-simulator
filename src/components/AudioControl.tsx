import React, { useEffect, useState } from 'react';
import { playAmbientLoop } from '../systems/audio';

export default function AudioControl() {
  const [playing, setPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (playing && audioRef) {
      audioRef.pause();
      setPlaying(false);
    } else {
      const audio = playAmbientLoop('/ambient.mp3', 0.3);
      setAudioRef(audio);
      setPlaying(true);
    }
  };

  return (
    <div style={{ padding: '1rem', color: 'white' }}>
      <h3>🔊 Ambient Audio</h3>
      <button onClick={toggleAudio}>
        {playing ? 'Pause Ambient' : 'Play Ambient'}
      </button>
    </div>
  );
}
