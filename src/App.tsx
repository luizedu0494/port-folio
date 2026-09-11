import React, { useState, useEffect } from 'react';
import { 
  Sparkles, ExternalLink, Mail, MessageSquare, 
  Brain, Code2, Layers, CheckCircle2, User, Wrench, Send, Medal
} from 'lucide-react';
import { DeveloperProfile, Project } from './types/portfolio';
import { initialProfile, initialProjects } from './data/initialData';
import { TypewriterText } from './components/TypewriterText';
import { MatrixDataStreamCard } from './components/MatrixDataStreamCard';
import { NeuralNetworkBg } from './components/NeuralNetworkBg';
import { AudioPlayer } from './components/AudioPlayer';
import { AudioEntryBanner } from './components/AudioEntryBanner';
import { AudioProvider } from './context/AudioContext';

const GithubIcon = ({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const AppContent: React.FC = () => {
  const [profile] = useState<DeveloperProfile>(initialProfile);
  const [projects] = useState<Project[]>(initialProjects);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const featuredProject = projects.find(p => p.featured) || projects[0];

  const otherProjects = projects.filter(p => !p.featured);

  const filteredProjects = otherProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.stack.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (!matchesSearch) return false;

    if (activeFilter === 'all') return true;
    if (activeFilter === 'ai') return project.stack.some(s => s.toLowerCase().includes('langchain') || s.toLowerCase().includes('groq') || s.toLowerCase().includes('openai') || project.name.toLowerCase().includes('agent') || project.name.toLowerCase().includes('decifra') || project.name.toLowerCase().includes('bot'));
    if (activeFilter === 'react') return project.stack.some(s => s.toLowerCase().includes('react'));
    if (activeFilter === 'python') return project.language.toLowerCase().includes('python') || project.stack.some(s => s.toLowerCase().includes('python'));
    return true;
  });

  return (
    <div className="portfolio-app">
      {/* Background de Rede Neural Interativa em Movimento */}
      <NeuralNetworkBg />

      {/* Banner Topo Fixo para Ativação da Trilha Sonora */}
      <AudioEntryBanner />

      {/* Glassmorphism Header com Navegação Limpa & Menu Hambúrguer Mobile */}
      <header className="navbar">
        <div className="container nav-container">
          <a href="#inicio" className="brand-logo font-display">
            <Sparkles size={20} color="var(--accent-crimson)" />
            LUIZ EDUARDO
          </a>

          {/* Player de Áudio & Menu Toggle visíveis no Header no Mobile */}
          <div className="mobile-header-actions">
            <AudioPlayer variant="navbar" />
            
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Alternar Menu"
            >
              <span className={`hamburger-bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
            </button>
          </div>

          <nav className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <a href="#sobre" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              <User size={15} /> Sobre
            </a>
            <a href="#habilidades" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              <Wrench size={15} /> Habilidades
            </a>
            <a href="#certificacoes" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              <Medal size={15} /> Certificados
            </a>
            <a href="#projetos" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              <Layers size={15} /> Projetos
            </a>
            
            <a href="#contato" className="btn-primary nav-contact-btn" onClick={() => setIsMobileMenuOpen(false)}>
              <Send size={14} /> Contato
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section (#inicio) */}
      <section id="inicio" className="hero-section reveal-on-scroll">
        <div className="container hero-container-grid">
          <div>
            <div className="hero-badge-tag">
              <Brain size={16} color="var(--accent-soft)" /> {profile.targetRole}
            </div>
            <h1 className="hero-title font-display">
              {profile.name}
            </h1>
            <p className="hero-headline font-subtitle">
              Desenvolvedor de Software focado em{' '}
              <TypewriterText 
                words={[
                  'Engenharia de IA & Agentes',
                  'Desenvolvimento Fullstack React/Python',
                  'Sistemas Inteligentes & LLMs'
                ]} 
              />
            </p>
            <p className="hero-bio">
              {profile.aboutMe.summary}
            </p>

            <div className="hero-actions">
              <a href={profile.contacts.github} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <GithubIcon size={18} /> Ver Perfil no GitHub
              </a>
              <a href={profile.contacts.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <LinkedinIcon size={18} color="var(--accent-soft)" /> Conectar no LinkedIn
              </a>
            </div>

            {/* Quick Contact Pills */}
            <div className="contact-pills">
              <a href={profile.contacts.linkedin} target="_blank" rel="noopener noreferrer" className="contact-pill">
                <LinkedinIcon size={14} color="var(--accent-soft)" /> LinkedIn
              </a>
              <a href={profile.contacts.whatsapp} target="_blank" rel="noopener noreferrer" className="contact-pill">
                <MessageSquare size={14} color="var(--accent-soft)" /> WhatsApp
              </a>
              <a href={profile.contacts.email} className="contact-pill">
                <Mail size={14} color="var(--accent-soft)" /> E-mail
              </a>
              <span className="contact-pill">
                📍 {profile.location}
              </span>
            </div>
          </div>

          {/* Elemento de Cenário Visual ao Lado do Hero */}
          <div className="hero-scenery-wrapper">
            <img 
              src="/assets/gifs/tech-fear.gif" 
              alt="Cenário de Alta Tecnologia & IA" 
              className="hero-scenery-gif"
            />
          </div>
        </div>
      </section>

      {/* Sobre Mim Section (#sobre) */}
      <section id="sobre" className="reveal-on-scroll" style={{ padding: '80px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <h2 className="section-title font-subtitle">
              <User color="var(--accent-crimson)" size={28} /> Sobre Mim & Foco Profissional
            </h2>
          </div>

          <div className="sobre-grid">
            {/* Cenário Visual AGP / Earth Space GIF (Posicionado à esquerda para dinamismo) */}
            <div className="sobre-scenery-wrapper">
              <img 
                src="/assets/gifs/earth-space.gif" 
                alt="Planeta Espacial & Agente IA" 
                className="sobre-scenery-gif"
              />
            </div>

            <div className="sobre-card-content">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
                {profile.aboutMe.paragraphs.map((paragraph, index) => (
                  <p key={index} style={{ lineHeight: '1.7' }}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
                <h4 className="font-subtitle" style={{ fontSize: '1.05rem', color: 'var(--accent-soft)', marginBottom: '16px' }}>
                  Pontos Chave da Minha Trajetória:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                  {profile.aboutMe.highlights.map((highlight, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(5, 5, 16, 0.5)', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <CheckCircle2 size={18} color="var(--accent-crimson)" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '0.9rem', color: '#fff' }}>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Player de Música em Bloco Dedicado Elegante abaixo de Sobre Mim */}
          <div style={{ marginTop: '48px', maxWidth: '800px', margin: '48px auto 0 auto' }}>
            <AudioPlayer variant="expanded" />
          </div>
        </div>
      </section>

      {/* Habilidades Section (#habilidades) */}
      <section id="habilidades" className="reveal-on-scroll" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <h2 className="section-title font-subtitle">
              <Wrench color="var(--accent-crimson)" size={28} /> Habilidades & Competências Técnicas
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {profile.skillCategories.map((category, idx) => (
              <div key={idx} style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <h3 className="font-subtitle" style={{ fontSize: '1.2rem', color: 'var(--accent-soft)', marginBottom: '18px' }}>
                  {category.title}
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {category.skills.map((skill, sIdx) => (
                    <li key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-crimson)' }}></span>
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cursos & Certificações (#certificacoes) */}
      <section id="certificacoes" className="reveal-on-scroll" style={{ padding: '80px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <h2 className="section-title font-subtitle">
              <Medal color="var(--accent-crimson)" size={28} /> Cursos & Certificações
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {profile.certifications.map((cert, idx) => (
              <div key={idx} style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-soft)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', fontWeight: 600 }}>
                    {cert.issuer}
                  </div>
                  <h3 className="font-subtitle" style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '8px', lineHeight: '1.4' }}>
                    {cert.title}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    {cert.issueDate} {cert.credentialId ? `• Credencial: ${cert.credentialId}` : ''}
                  </div>
                </div>

                {cert.skills && (
                  <div className="tech-tags" style={{ marginTop: 'auto' }}>
                    {cert.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="tech-tag" style={{ fontSize: '0.75rem' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Featured Project (CronoLab 2.0) (#projetos) */}
      {featuredProject && (
        <section id="projetos" className="featured-section reveal-on-scroll" style={{ paddingTop: '40px' }}>
          <div className="container">
            <div className="section-header">
              <h2 className="section-title font-subtitle">
                <Layers color="var(--accent-crimson)" size={28} /> Projeto Principal em Destaque
              </h2>
            </div>

            <div className="featured-card">
              <div className="featured-content">
                <div>
                  <h3 className="featured-title">{featuredProject.name}</h3>
                  <p className="featured-description">{featuredProject.description}</p>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <h4 className="font-subtitle" style={{ fontSize: '0.95rem', color: 'var(--accent-soft)', marginBottom: '10px' }}>
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
                      href={`https://github.com/luizedu0494/${featuredProject.repo}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-secondary"
                    >
                      <GithubIcon size={18} /> Ver Repositório no GitHub
                    </a>
                  </div>
                </div>

                {featuredProject.imageUrl && (
                  <div className="featured-image-container">
                    <img src={featuredProject.imageUrl} alt={featuredProject.name} className="featured-gif-preview" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Demais Projetos Grid (Exibido apenas se houverem múltiplos projetos) */}
      {otherProjects.length > 0 && (
        <section className="projects-grid-section">
          <div className="container">
            <div className="section-header">
              <h3 className="font-subtitle" style={{ fontSize: '1.4rem', color: 'var(--text-secondary)' }}>
                Outros projetos desenvolvidos
              </h3>
            </div>

            {/* Filters */}
            <div className="filter-bar">
              <button 
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                Todos ({otherProjects.length})
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'ai' ? 'active' : ''}`}
                onClick={() => setActiveFilter('ai')}
              >
                <Brain size={14} style={{ display: 'inline', marginRight: 4 }} /> IA & Agentes
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'react' ? 'active' : ''}`}
                onClick={() => setActiveFilter('react')}
              >
                React 19
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'python' ? 'active' : ''}`}
                onClick={() => setActiveFilter('python')}
              >
                Python
              </button>
            </div>

            {/* Grid */}
            <div className="projects-grid">
              {filteredProjects.map(project => (
                <div key={project.id} className="project-card">
                  <div>
                    {project.imageUrl && (
                      <div className="project-card-image-wrapper">
                        <img src={project.imageUrl} alt={project.name} className="project-card-image" />
                      </div>
                    )}

                    <div className="project-card-header">
                      <h3 className="project-name font-subtitle">{project.name}</h3>
                    </div>

                    <p className="project-description">{project.description}</p>

                    <div className="tech-tags" style={{ marginBottom: '16px' }}>
                      {project.stack.map((t, i) => (
                        <span key={i} className="tech-tag">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="project-footer">
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-soft)' }}>{project.language}</span>

                    <div style={{ display: 'flex', gap: '12px' }}>
                      <a 
                        href={`https://github.com/luizedu0494/${project.repo}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
                        title="Ver GitHub"
                      >
                        <GithubIcon size={16} /> Repositório
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Seção de Contato (#contato) */}
      <section id="contato" className="reveal-on-scroll" style={{ padding: '80px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
          <div className="hero-badge-tag" style={{ margin: '0 auto 16px auto' }}>
            <Send size={14} /> Vamos Conversar
          </div>
          <h2 className="section-title font-subtitle" style={{ justifyContent: 'center', fontSize: '2.2rem', marginBottom: '16px' }}>
            Entre em Contato
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '32px' }}>
            Estou aberto a oportunidades profissionais, colaborações em projetos de IA & Software e conexões na área de tecnologia.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a href={profile.contacts.linkedin} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <LinkedinIcon size={18} /> Acessar Perfil no LinkedIn
            </a>
            <a href={profile.contacts.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <GithubIcon size={18} /> Explorar GitHub
            </a>
            <a href={profile.contacts.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <MessageSquare size={18} color="var(--accent-soft)" /> Chamar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Luiz Eduardo Lopes — Desenvolvedor de Software & IA</p>
        </div>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  );
};
