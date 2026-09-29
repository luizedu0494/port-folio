import React from 'react';
import { Wrench } from 'lucide-react';
import { DeveloperProfile } from '../types/portfolio';
import { SectionHeader } from '../components/SectionHeader';

import { SkillFlipCard } from '../components/SkillFlipCard';

interface SkillsProps {
  profile: DeveloperProfile;
}

export const Skills: React.FC<SkillsProps> = ({ profile }) => (
  <section id="habilidades" className="reveal-on-scroll section-alt">
    <div className="container">
      <SectionHeader
        icon={<Wrench color="var(--accent-soft)" size={28} />}
        title="Habilidades & Competências Técnicas"
        triggerId="habilidades"
      />

      <div className="flip-cards-grid">
        {profile.skillCategories.map((category, index) => (
          <SkillFlipCard
            key={category.title}
            category={category}
            index={index}
          />
        ))}
      </div>
    </div>
  </section>
);
