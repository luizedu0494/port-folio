import React from 'react';
import { SkillCategory } from '../types/portfolio';
import { FlipCard } from './FlipCard';

interface SkillFlipCardProps {
  category: SkillCategory;
  index?: number;
}

export const SkillFlipCard: React.FC<SkillFlipCardProps> = ({ category, index = 0 }) => {
  const frontContent = (
    <div className="flip-card-content flip-card-content--front">
      <div className="flip-front-center">
        <h3 className="font-subtitle flip-card-title">
          {category.title}
        </h3>
      </div>
      <span className="flip-card-hint">
        Toque ou arraste para ver habilidades
      </span>
    </div>
  );

  const backContent = (
    <div className="flip-card-content flip-card-content--back">
      <div className="flip-back-header">
        <h3 className="font-subtitle flip-card-title flip-card-title--back">
          {category.title}
        </h3>
      </div>
      <div className="flip-back-content">
        <ul className="flip-skills-list">
          {category.skills.map((skill, sIdx) => (
            <li key={sIdx} className="flip-skill-item">
              <span className="skill-dot" />
              <span className="flip-skill-name">{skill.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <span className="flip-card-hint">
        Toque ou arraste para virar
      </span>
    </div>
  );

  return (
    <div className={`skill-flip-wrapper skill-drift-${(index % 3) + 1}`}>
      <FlipCard
        front={frontContent}
        back={backContent}
        width="100%"
        height={360}
        radius={24}
        tilt={true}
        tiltMax={10}
        glare={true}
        glareOpacity={0.22}
        draggable={true}
        flipOnClick={true}
        hoverScale={1.02}
        perspective={1100}
        stiffness={180}
        damping={22}
        background="var(--bg-card)"
        color="var(--text-primary)"
        shadow={true}
        shadowColor="#000000"
        shadowOpacity={0.5}
        ariaLabel={`Card de habilidades: ${category.title}`}
      />
    </div>
  );
};

