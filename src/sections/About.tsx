import React from 'react';
import { CheckCircle2, Zap, ExternalLink } from 'lucide-react';
import { DeveloperProfile } from '../types/portfolio';
import { ScrambleText } from '../components/ScrambleText';
import { SceneryMedia } from '../components/SceneryMedia';
import { AudioPlayer } from '../components/AudioPlayer';

interface AboutProps {
  profile: DeveloperProfile;
  onOpenDemo?: () => void;
}

export const About: React.FC<AboutProps> = ({ profile, onOpenDemo }) => (
  <section id="sobre" className="about-intro-section reveal-on-scroll">
    <div className="container about-editorial-layout">

      {/* ── Coluna Esquerda: Vídeo Original + Player ── */}
      <aside className="about-left-col">
        <SceneryMedia
          videoSrc="/assets/videos/tech-fear.mp4"
          posterSrc="/assets/videos/tech-fear-poster.webp"
          wrapperClass="about-left-video-wrapper"
          mediaClass="sobre-scenery-video"
        />
        <div className="about-left-player">
          <AudioPlayer variant="expanded" />
        </div>
      </aside>

      {/* ── Coluna Direita: Texto Editorial (75%) ── */}
      <div className="about-right-col">

        {/* Saudação em destaque */}
        {profile.aboutMe.summary && (
          <div className="about-greeting-block">
            {profile.aboutMe.summary.split('\n').map((line, idx) => (
              <p key={idx} className={idx === 0 ? 'about-greeting-main' : 'about-greeting-sub'}>
                {line}
              </p>
            ))}
          </div>
        )}

        {/* Divisor sutil */}
        <div className="about-divider" />

        {/* Parágrafos principais */}
        <div className="about-body-text">
          {profile.aboutMe.paragraphs.map((paragraph, index) => (
            <p key={index} className="about-paragraph">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Pontos-Chave em linha */}
        <div className="about-highlights-row">
          <span className="about-highlights-label">
            <ScrambleText text="Trajetória:" onView hover fast />
          </span>
          <div className="about-highlights-chips">
            {profile.aboutMe.highlights.map((highlight, idx) => (
              <div key={idx} className="highlight-chip highlight-chip--inline">
                <CheckCircle2 size={15} color="var(--accent-soft)" style={{ flexShrink: 0 }} />
                <span className="highlight-chip-text">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech tags */}
        {profile.currentlyLearning && (
          <div className="about-tech-row">
            <span className="currently-learning-label">
              <Zap size={14} color="var(--accent-soft)" /> Explorando:
            </span>
            <div className="tech-tags">
              {profile.currentlyLearning.map((item, i) => (
                <span key={i} className="tech-tag">{item}</span>
              ))}
            </div>
          </div>
        )}

        {/* Banner de Destaque — Landing Page Comercial de Exemplo */}
        <div className="about-showcase-banner">
          <div className="about-showcase-info">
            <span className="about-showcase-badge">Landing Page Comercial</span>
            <p className="about-showcase-text">
              Conheça a <strong>ArquiVisão</strong> — landing page moderna desenvolvida para escritórios de arquitetura e interiores.
            </p>
          </div>
          <a
            href="https://exemplo-landing.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-showcase-demo"
          >
            <ExternalLink size={14} />
            <span>Ver Exemplo Online ↗</span>
          </a>
        </div>

      </div>
    </div>
  </section>
);
