import React from 'react';
import { CheckCircle2, ExternalLink, RotateCw } from 'lucide-react';
import { Project } from '../types/portfolio';
import { FlipCard } from './FlipCard';
import { ScrambleText } from './ScrambleText';
import { GithubIcon } from './icons';

interface FeaturedFlipCardProps {
  project: Project;
  githubProfileUrl: string;
}

export const FeaturedFlipCard: React.FC<FeaturedFlipCardProps> = ({
  project,
  githubProfileUrl
}) => {
  const repoUrl = `${githubProfileUrl}/${project.repo}`;

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const frontContent = (
    <div className="project-cover-front">
      {/* Background Media (GIF or Image) filling 100% */}
      <div className="project-cover-bg-container">
        {project.videoUrl ? (
          <video
            src={project.videoUrl}
            poster={project.imageUrl}
            className="project-cover-bg-media"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        ) : (
          <img
            src={project.imageUrl}
            alt={project.name}
            className="project-cover-bg-media"
            loading="lazy"
            decoding="async"
          />
        )}
        <div className="project-cover-overlay" />
      </div>

      {/* Center Title */}
      <div className="project-cover-center">
        <h3 className="featured-cover-title font-subtitle">
          <ScrambleText text={project.name} onView hover fast />
        </h3>
      </div>

      {/* Footer Hint */}
      <div className="project-cover-footer">
        <span className="featured-cover-hint-btn">
          <RotateCw size={14} className="flip-hint-icon" />
          Toque para ver detalhes
        </span>
      </div>
    </div>
  );

  const backContent = (
    <div className="featured-flip-back">
      <div className="featured-flip-back-header">
        <div>
          <h3 className="font-subtitle" style={{ fontSize: '1.6rem', color: 'var(--text-primary)', margin: 0 }}>
            {project.name}
          </h3>
          <span style={{ fontSize: '0.82rem', color: 'var(--accent-soft)', letterSpacing: '0.04em' }}>
            Arquitetura & Engenharia do Sistema
          </span>
        </div>
      </div>

      <div className="featured-flip-back-content">
        <p className="featured-description" style={{ marginBottom: '14px', fontSize: '0.94rem', lineHeight: '1.55' }}>
          {project.description}
        </p>

        {project.highlights && project.highlights.length > 0 && (
          <div className="featured-highlights-block" style={{ marginBottom: '14px' }}>
            <h4
              className="font-subtitle"
              style={{ fontSize: '0.88rem', color: 'var(--accent-soft)', marginBottom: '6px' }}
            >
              Destaques do Projeto:
            </h4>
            <ul className="highlights-list">
              {project.highlights.map((h, i) => (
                <li key={i} className="highlight-item" style={{ fontSize: '0.86rem', padding: '3px 0' }}>
                  <CheckCircle2 size={15} className="highlight-icon" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="tech-tags" style={{ marginBottom: '14px' }}>
          {project.stack.map((tech, idx) => (
            <span key={idx} className={`tech-tag ${idx < 3 ? 'highlight' : ''}`}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="featured-flip-back-footer">
        <div className="hero-actions" style={{ marginTop: '0', gap: '12px' }}>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="btn-primary"
            >
              <ExternalLink size={17} /> Acessar Aplicação
            </a>
          )}
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            className="btn-secondary"
          >
            <GithubIcon size={17} /> Ver Repositório no GitHub
          </a>
        </div>

        <span className="featured-flip-hint-back">
          <RotateCw size={13} className="flip-hint-icon" />
          Toque para ver a demo
        </span>
      </div>
    </div>
  );

  return (
    <div className="featured-flip-card-wrapper">
      <FlipCard
        front={frontContent}
        back={backContent}
        width="100%"
        height={540}
        radius={28}
        tilt={true}
        tiltMax={5}
        glare={true}
        glareOpacity={0.16}
        draggable={true}
        flipOnClick={true}
        hoverScale={1.01}
        perspective={1400}
        stiffness={160}
        damping={24}
        background="var(--bg-card)"
        color="var(--text-primary)"
        shadow={true}
        shadowColor="#000000"
        shadowOpacity={0.55}
        ariaLabel={`Projeto Principal: ${project.name}`}
      />
    </div>
  );
};

export default FeaturedFlipCard;
