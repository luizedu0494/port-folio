import React, { useMemo, useState } from 'react';
import { Brain, CheckCircle2, ExternalLink, Layers } from 'lucide-react';
import { Project } from '../types/portfolio';
import { SectionHeader } from '../components/SectionHeader';
import { ExpandableMedia } from '../components/ExpandableMedia';
import type { LightboxMedia } from '../components/ImageLightbox';
import { GithubIcon } from '../components/icons';

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

  const repoUrl = (repo: string) => `${githubProfileUrl}/${repo}`;

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
        <section id="projetos" className="featured-section reveal-on-scroll" style={{ paddingTop: '60px' }}>
          <div className="container">
            <SectionHeader
              icon={<Layers color="var(--accent-crimson)" size={28} />}
              title="Projeto Principal"
            />

            <div className="featured-card">
              <div className="featured-content">
                <div>
                  <h3 className="featured-title">{featuredProject.name}</h3>
                  <p className="featured-description">{featuredProject.description}</p>

                  <div style={{ marginBottom: '20px' }}>
                    <h4
                      className="font-subtitle"
                      style={{ fontSize: '0.95rem', color: 'var(--accent-soft)', marginBottom: '10px' }}
                    >
                      Destaques do Projeto:
                    </h4>
                    <ul className="highlights-list">
                      {featuredProject.highlights?.map((h, i) => (
                        <li key={i} className="highlight-item">
                          <CheckCircle2 size={16} className="highlight-icon" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="tech-tags">
                    {featuredProject.stack.map((tech, idx) => (
                      <span key={idx} className={`tech-tag ${idx < 3 ? 'highlight' : ''}`}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="hero-actions" style={{ marginTop: '24px' }}>
                    {featuredProject.demoUrl && (
                      <a
                        href={featuredProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        <ExternalLink size={18} /> Acessar Aplicação
                      </a>
                    )}
                    <a
                      href={repoUrl(featuredProject.repo)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                    >
                      <GithubIcon size={18} /> Ver Repositório no GitHub
                    </a>
                  </div>
                </div>

                {featuredProject.imageUrl && (
                  <ExpandableMedia
                    src={featuredProject.imageUrl}
                    videoSrc={featuredProject.videoUrl}
                    alt={featuredProject.name}
                    containerClass="featured-image-container"
                    mediaClass="featured-gif-preview"
                    hint="Clique para Expandir"
                    onExpand={onPreview}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Demais Projetos Grid (Exibido apenas se houver múltiplos projetos) */}
      {otherProjects.length > 0 && (
        <section className="projects-grid-section">
          <div className="container">
            <div className="section-header">
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
              {filteredProjects.map((project) => (
                <div key={project.id} className="project-card">
                  <div>
                    {project.imageUrl && (
                      <ExpandableMedia
                        src={project.imageUrl}
                        alt={project.name}
                        containerClass="project-card-image-wrapper"
                        mediaClass="project-card-image"
                        lazy
                        onExpand={onPreview}
                      />
                    )}

                    <div className="project-card-header">
                      <h3 className="project-name font-subtitle">{project.name}</h3>
                    </div>

                    <p className="project-description">{project.description}</p>

                    <div className="tech-tags" style={{ marginBottom: '16px' }}>
                      {project.stack.map((t, i) => (
                        <span key={i} className="tech-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="project-footer">
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-soft)' }}>
                      {project.language}
                    </span>

                    <div style={{ display: 'flex', gap: '12px' }}>
                      <a
                        href={repoUrl(project.repo)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.85rem'
                        }}
                      >
                        <GithubIcon size={16} /> GitHub
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
