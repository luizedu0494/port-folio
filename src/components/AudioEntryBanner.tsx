import React, { useState } from 'react';
import { Volume2, Sparkles, X } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export const AudioEntryBanner: React.FC = () => {
  const { isPlaying, startExperienceWithAudio } = useAudio();
  const [isDismissed, setIsDismissed] = useState(false);

  // Se a música já estiver tocando ou se o usuário fechou o banner, não exibe
  if (isPlaying || isDismissed) {
    return null;
  }

  const handleStart = () => {
    startExperienceWithAudio();
    setIsDismissed(true);
  };

  return (
    <div className="audio-entry-banner">
      <div className="audio-entry-content">
        <div className="audio-entry-icon">
          <Volume2 size={20} color="#ff4d6d" />
        </div>
        <div className="audio-entry-text">
          <span className="audio-entry-title">Trilha Sonora Dev Focus (15%)</span>
          <span className="audio-entry-desc">Deseja navegar ouvindo a playlist de estudo/código?</span>
        </div>
        <button onClick={handleStart} className="btn-primary audio-entry-btn">
          <Sparkles size={16} /> Entrar com Som
        </button>
        <button onClick={() => setIsDismissed(true)} className="audio-entry-close" title="Continuar sem Som">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
