import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Music, Disc } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export const WelcomeModal: React.FC = () => {
  const { startExperienceWithAudio } = useAudio();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  if (!isVisible) return null;

  const handleEnterWithAudio = () => {
    setIsClosing(true);
    startExperienceWithAudio();
    setTimeout(() => {
      setIsVisible(false);
    }, 450); // Aguarda animação de fade-out
  };

  const handleEnterSilent = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 450);
  };

  return (
    <div className={`welcome-overlay ${isClosing ? 'fade-out' : 'fade-in'}`}>
      <div className="welcome-backdrop-blur"></div>

      <div className="welcome-card">
        {/* Glow ambient background element */}
        <div className="welcome-card-glow"></div>

        <div className="welcome-badge font-display">
          <Sparkles size={16} color="var(--accent-crimson)" />
          <span>EXPERIÊNCIA INTERATIVA DEV</span>
        </div>

        <h1 className="welcome-title font-display">LUIZ EDUARDO</h1>

        <p className="welcome-subtitle">Full Stack & AI Developer Portfolio</p>

        <div className="welcome-audio-box">
          <div className="welcome-audio-icon-wrap">
            <Disc className="disc-spin" size={24} color="var(--accent-soft)" />
          </div>
          <div className="welcome-audio-info">
            <span className="welcome-audio-label">Trilha Sonora Recomendada</span>
            <span className="welcome-audio-track">Dev Focus & Ambient Beats (15% Vol)</span>
          </div>
          <div className="welcome-eq-preview">
            <span className="eq-bar bar1"></span>
            <span className="eq-bar bar2"></span>
            <span className="eq-bar bar3"></span>
            <span className="eq-bar bar4"></span>
          </div>
        </div>

        <p className="welcome-desc">
          Para proporcionar uma imersão completa enquanto explora meus projetos e habilidades, preparei uma
          playlist especial de músicas para foco e programação.
        </p>

        <div className="welcome-actions">
          <button onClick={handleEnterWithAudio} className="welcome-btn-primary">
            <Volume2 size={18} />
            <span>Entrar com Trilha Sonora</span>
          </button>

          <button onClick={handleEnterSilent} className="welcome-btn-secondary">
            <VolumeX size={16} />
            <span>Entrar em Silêncio</span>
          </button>
        </div>

        <div className="welcome-footer-hint">
          <Music size={13} color="var(--text-muted)" />
          <span>Você poderá pausar ou trocar as faixas a qualquer momento pelo topo da tela.</span>
        </div>
      </div>
    </div>
  );
};
