import React, { useMemo, useState } from 'react';
import { Brain, Layers } from 'lucide-react';
import { Project } from '../types/portfolio';
import { SectionHeader } from '../components/SectionHeader';
import type { LightboxMedia } from '../components/ImageLightbox';
import { ProjectFlipCard } from '../components/ProjectFlipCard';
import { FeaturedFlipCard } from '../components/FeaturedFlipCard';

interface ProjectsProps {
  projects: Project[];
  githubProfileUrl: string;
  onPreview: (media: LightboxMedia) => void;
}

const AI_STACK_KEYWORDS = [
  'langchain',
  'groq',
  'openai',
  'ia generativa',
  'llm api',
  'langchain.js',
  'streamlit',
  'pandas'
];
const AI_PROJECT_IDS = ['decifrai', 'insurebot', 'stech-chatbot-ana'];
const PYTHON_STACK_KEYWORDS = ['python', 'streamlit', 'pandas', 'fastapi'];

export const Projects: React.FC<ProjectsProps> = ({ projects, githubProfileUrl, onPreview }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const featuredProject = useMemo(() => projects.find((p) => p.featured) || projects[0], [projects]);
  const otherProjects = useMemo(() => projects.filter((p) => !p.featured), [projects]);

  const filteredProjects = useMemo(() => {
    return otherProjects.filter((project) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.stack.some((s) => s.toLowerCase().includes(query));

      if (!matchesSearch) return false;

      if (activeFilter === 'all') return true;
      if (activeFilter === 'ai')
        return (
          project.stack.some((s) => AI_STACK_KEYWORDS.includes(s.toLowerCase())) ||
          AI_PROJECT_IDS.includes(project.id)
        );
      if (activeFilter === 'python')
        return (
          project.language.toLowerCase().includes('python') ||
          project.stack.some((s) => PYTHON_STACK_KEYWORDS.includes(s.toLowerCase()))
        );
      if (activeFilter === 'react') return project.stack.some((s) => s.toLowerCase().includes('react'));
      if (activeFilter === 'mobile')
        return (
          project.language.toLowerCase().includes('native') ||
          project.stack.some((s) => s.toLowerCase().includes('native') || s.toLowerCase().includes('mobile'))
        );
      return true;
    });
  }, [otherProjects, activeFilter, searchQuery]);

  const filters: { id: string; label: React.ReactNode }[] = [
    { id: 'all', label: <>Todos ({otherProjects.length})</> },
    {
      id: 'ai',
      label: (
        <>
          <Brain size={14} style={{ display: 'inline', marginRight: 4 }} /> IA & Agentes
        </>
      )
    },
    { id: 'python', label: 'Python / Data' },
    { id: 'react', label: 'React 19' },
    { id: 'mobile', label: 'React Native' }
  ];

  return (
    <>
      {/* Hero Featured Project (CronoLab 2.0) (#projetos) */}
      {featuredProject && (
        <section id="projetos" className="featured-section reveal-on-scroll">
          <div className="container">
            <SectionHeader
              icon={<Layers color="var(--accent-soft)" size={28} />}
              title="Projeto Principal"
              triggerId="projetos"
            />

            <FeaturedFlipCard
              project={featuredProject}
              githubProfileUrl={githubProfileUrl}
            />
          </div>
        </section>
      )}

      {/* Demais Projetos Grid */}
      {otherProjects.length > 0 && (
        <section className="projects-grid-section">
          <div className="container">
            <div className="section-header" style={{ marginBottom: '24px' }}>
              <h3 className="font-subtitle" style={{ fontSize: '1.4rem', color: 'var(--text-secondary)' }}>
                Outros Projetos Desenvolvidos
              </h3>
            </div>

            {/* Filters */}
            <div className="filter-bar" role="group" aria-label="Filtrar projetos por tecnologia">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                  aria-pressed={activeFilter === filter.id}
                  onClick={() => {
                    setActiveFilter(filter.id);
                    setSearchQuery('');
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Empty Search Feedback */}
            {filteredProjects.length === 0 && (
              <div className="empty-search">
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '8px' }}>
                  Nenhum projeto encontrado para "<strong>{searchQuery}</strong>"
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilter('all');
                  }}
                  className="empty-search-clear"
                >
                  Limpar busca e exibir todos os projetos
                </button>
              </div>
            )}

            {/* Grid */}
            <div className="projects-grid">
              {filteredProjects.map((project, index) => (
                <ProjectFlipCard
                  key={project.id}
                  project={project}
                  githubProfileUrl={githubProfileUrl}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
