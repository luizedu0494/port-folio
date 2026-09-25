import React from 'react';
import { CheckCircle2, User, Zap } from 'lucide-react';
import { DeveloperProfile } from '../types/portfolio';
import { SectionHeader } from '../components/SectionHeader';
import { SceneryMedia } from '../components/SceneryMedia';
import { AudioPlayer } from '../components/AudioPlayer';

interface AboutProps {
  profile: DeveloperProfile;
}

export const About: React.FC<AboutProps> = ({ profile }) => (
  <section id="sobre" className="reveal-on-scroll section-alt">
    <div className="container">
      <SectionHeader
        icon={<User color="var(--accent-crimson)" size={28} />}
        title="Sobre Mim & Foco Profissional"
      />

      <div className="sobre-grid">
        {/* Cenário Visual Earth Space (vídeo otimizado, ex-GIF pesado) */}
        <SceneryMedia
          videoSrc="/assets/videos/earth-space.mp4"
          posterSrc="/assets/videos/earth-space-poster.webp"
          wrapperClass="sobre-scenery-wrapper"
          mediaClass="sobre-scenery-video"
        />

        <div className="sobre-card-content">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              fontSize: '1.05rem',
              color: 'var(--text-secondary)'
            }}
          >
            {profile.aboutMe.paragraphs.map((paragraph, index) => (
              <p key={index} style={{ lineHeight: '1.7' }}>
                {paragraph}
              </p>
            ))}
          </div>

          <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
            <h4
              className="font-subtitle"
              style={{ fontSize: '1.05rem', color: 'var(--accent-soft)', marginBottom: '16px' }}
            >
              Pontos-Chave da Minha Trajetória:
            </h4>
            <div className="grid-auto-260">
              {profile.aboutMe.highlights.map((highlight, idx) => (
                <div key={idx} className="highlight-chip">
                  <CheckCircle2 size={18} color="var(--accent-crimson)" style={{ flexShrink: 0 }} />
                  <span className="highlight-chip-text">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {profile.currentlyLearning && (
            <div style={{ marginTop: '20px' }}>
              <span className="currently-learning-label">
                <Zap size={15} color="var(--accent-crimson)" /> Explorando atualmente:
              </span>
              <div className="tech-tags">
                {profile.currentlyLearning.map((item, i) => (
                  <span key={i} className="tech-tag" style={{ opacity: 0.85 }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Player de Música em Bloco Dedicado Elegante abaixo de Sobre Mim */}
      <div className="audio-player-block">
        <AudioPlayer variant="expanded" />
      </div>
    </div>
  </section>
);
