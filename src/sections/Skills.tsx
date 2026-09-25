import React from 'react';
import { Wrench } from 'lucide-react';
import { DeveloperProfile } from '../types/portfolio';
import { SectionHeader } from '../components/SectionHeader';

interface SkillsProps {
  profile: DeveloperProfile;
}

export const Skills: React.FC<SkillsProps> = ({ profile }) => (
  <section id="habilidades" className="reveal-on-scroll section-alt">
    <div className="container">
      <SectionHeader
        icon={<Wrench color="var(--accent-crimson)" size={28} />}
        title="Habilidades & Competências Técnicas"
      />

      <div className="grid-auto-260" style={{ gap: '24px' }}>
        {profile.skillCategories.map((category) => (
          <div key={category.title} className="skill-card">
            <h3
              className="font-subtitle"
              style={{ fontSize: '1.2rem', color: 'var(--accent-soft)', marginBottom: '18px' }}
            >
              {category.title}
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {category.skills.map((skill, sIdx) => (
                <li
                  key={sIdx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <span className="skill-dot"></span>
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);
