import React, { useState } from 'react';
import { Wrench, Brain, Code2, Database, Terminal, CheckCircle2 } from 'lucide-react';
import { DeveloperProfile } from '../types/portfolio';
import { SectionHeader } from '../components/SectionHeader';

interface SkillsProps {
  profile: DeveloperProfile;
}

const CATEGORY_META: Record<string, { icon: React.ComponentType<{ size?: number; color?: string }>; focus: string; tag: string }> = {
  'Inteligência Artificial & Agentes': {
    icon: Brain,
    focus: 'Modelos de Linguagem, RAG, Chains & Autonomia',
    tag: 'Core Especialidade'
  },
  'Frontend & Landing Pages': {
    icon: Code2,
    focus: 'Interfaces Reativas, Micro-animações & Web Performance',
    tag: 'Interface de Alta Conversão'
  },
  'Backend & Banco de Dados': {
    icon: Database,
    focus: 'Modelagem Relacional, REST Endpoints & Realtime',
    tag: 'Arquitetura de Dados'
  },
  'Estratégia & Ferramentas': {
    icon: Terminal,
    focus: 'Versionamento, Deploy Contínuo & Otimização',
    tag: 'Pipeline & Entrega'
  }
};

export const Skills: React.FC<SkillsProps> = ({ profile }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section id="habilidades" className="reveal-on-scroll section-alt section-padded">
      <div className="container">
        <SectionHeader
          icon={<Wrench color="var(--accent-soft)" size={28} />}
          title="Matriz de Competências & Tecnologias"
          triggerId="habilidades"
        />

        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            maxWidth: '720px',
            marginBottom: '36px',
            lineHeight: 1.7
          }}
        >
          Um ecossistema técnico focado na convergência entre <strong>Inteligência Artificial aplicada</strong> e{' '}
          <strong>engenharia de software moderna</strong>. Tecnologias validadas em projetos reais de produção.
        </p>

        <div className="skills-matrix-grid">
          {profile.skillCategories.map((category) => {
            const meta = CATEGORY_META[category.title] || {
              icon: Wrench,
              focus: 'Engenharia de Software',
              tag: 'Especialidade'
            };
            const Icon = meta.icon;
            const isHovered = activeCategory === category.title;

            return (
              <div
                key={category.title}
                className={`skill-matrix-card ${isHovered ? 'skill-matrix-card--hover' : ''}`}
                onMouseEnter={() => setActiveCategory(category.title)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <div className="skill-matrix-card-header">
                  <div className="skill-matrix-icon-wrapper">
                    <Icon size={22} color="var(--accent-platinum)" />
                  </div>
                  <div className="skill-matrix-meta">
                    <span className="skill-matrix-tag font-mono">{meta.tag}</span>
                    <h3 className="skill-matrix-title font-subtitle">{category.title}</h3>
                  </div>
                </div>

                <p className="skill-matrix-focus font-mono">{meta.focus}</p>

                <div className="skill-matrix-pills">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="skill-pill-item">
                      <CheckCircle2 size={13} color="var(--accent-soft)" style={{ flexShrink: 0 }} />
                      <span className="skill-pill-name">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
