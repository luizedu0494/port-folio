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

export const Projects: React.FC<ProjectsProps> = ({ projects, githubProfileUrl, onPreview: _onPreview }) => {
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
      if (activeFilter === 'landing')
        return (
          project.id.includes('landing') ||
          project.stack.some((s) => s.toLowerCase().includes('landing') || s.toLowerCase().includes('html')) ||
          project.language.toLowerCase().includes('html')
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
    { id: 'landing', label: 'Landing Pages' },
    { id: 'python', label: 'Python / Data' },
    { id: 'react', label: 'React 19' },
    { id: 'mobile', label: 'React Native' }
  ];

  return (
    <section id="projetos" className="reveal-on-scroll section-padded">
      <div className="container">
        <SectionHeader
          icon={<Layers color="var(--accent-soft)" size={28} />}
          title="Projetos & Engenharia de IA"
          triggerId="projetos"
        />

        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            maxWidth: '720px',
            marginBottom: '32px',
            lineHeight: 1.7
          }}
        >
          Sistemas e aplicações construídos para resolver problemas reais com <strong>agentes autônomos</strong>,{' '}
          automações empresariais e arquitetura web escalável.
        </p>

        {/* Hero Featured Project (CronoLab 2.0) */}
        {featuredProject && (
          <div className="featured-project-wrapper" style={{ marginBottom: '56px' }}>
            <FeaturedFlipCard
              project={featuredProject}
              githubProfileUrl={githubProfileUrl}
            />
          </div>
        )}

        {/* Demais Projetos com Filtros */}
        {otherProjects.length > 0 && (
          <div className="secondary-projects-area">
            <div className="section-header" style={{ marginBottom: '20px' }}>
              <h3 className="font-subtitle" style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>
                Ecossistema de Soluções &amp; Demonstrações
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
        )}
      </div>
    </section>
  );
};
