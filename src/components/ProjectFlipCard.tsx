import React from 'react';
import { ExternalLink, RotateCw } from 'lucide-react';
import { Project } from '../types/portfolio';
import { FlipCard } from './FlipCard';
import { GithubIcon } from './icons';

interface ProjectFlipCardProps {
  project: Project;
  githubProfileUrl: string;
  index?: number;
}

export const ProjectFlipCard: React.FC<ProjectFlipCardProps> = ({
  project,
  githubProfileUrl,
  index = 0
}) => {
  const repoUrl = `${githubProfileUrl}/${project.repo}`;

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const frontContent = (
    <div className="project-cover-front">
      {/* Background Image filling 100% */}
      {project.imageUrl && (
        <div className="project-cover-bg-container">
          <img
            src={project.imageUrl}
            alt={project.name}
            className="project-cover-bg-media"
            loading="lazy"
            decoding="async"
          />
          <div className="project-cover-overlay" />
        </div>
      )}

      {/* Center Title */}
      <div className="project-cover-center">
        <h3 className="project-cover-title font-subtitle">
          {project.name}
        </h3>
      </div>

      {/* Footer Hint */}
      <div className="project-cover-footer">
        <span className="project-cover-hint-btn">
          <RotateCw size={13} className="flip-hint-icon" />
          Toque para ver detalhes
        </span>
      </div>
    </div>
  );

  const backContent = (
    <div className="project-flip-back">
      <div className="project-flip-back-header">
        <div>
          <h3 className="font-subtitle" style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
            {project.name}
          </h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--accent-soft)', letterSpacing: '0.04em' }}>
            {project.language}
          </span>
        </div>
      </div>

      <div className="project-flip-back-body">
        <p className="project-description" style={{ marginBottom: '14px', fontSize: '0.88rem', lineHeight: '1.5' }}>
          {project.description}
        </p>

        <div className="tech-tags" style={{ marginBottom: '14px' }}>
          {project.stack.map((t, i) => (
            <span key={i} className="tech-tag">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="project-flip-back-footer">
        <div className="project-flip-actions">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            className="project-action-btn project-action-btn--primary"
            aria-label={`Ver repositório do ${project.name} no GitHub`}
          >
            <GithubIcon size={16} /> Ver no GitHub
          </a>

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="project-action-btn project-action-btn--secondary"
              aria-label={`Acessar aplicação ${project.name}`}
            >
              <ExternalLink size={15} /> Demo
            </a>
          )}
        </div>

        <span className="project-flip-hint-back">
          <RotateCw size={13} className="flip-hint-icon" />
          Toque para ver a imagem
        </span>
      </div>
    </div>
  );

  return (
    <div className={`project-flip-card-container skill-drift-${(index % 3) + 1}`}>
      <FlipCard
        front={frontContent}
        back={backContent}
        width="100%"
        height={490}
        radius={24}
        tilt={true}
        tiltMax={8}
        glare={true}
        glareOpacity={0.18}
        draggable={true}
        flipOnClick={true}
        hoverScale={1.02}
        perspective={1200}
        stiffness={180}
        damping={22}
        background="var(--bg-card)"
        color="var(--text-primary)"
        shadow={true}
        shadowColor="#000000"
        shadowOpacity={0.45}
        ariaLabel={`Card do projeto: ${project.name}`}
      />
    </div>
  );
};

export default ProjectFlipCard;
