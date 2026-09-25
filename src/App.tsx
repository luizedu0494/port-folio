import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { DeveloperProfile, Project } from './types/portfolio';
import { initialProfile, initialProjects } from './data/initialData';
import { NeuralNetworkBg } from './components/NeuralNetworkBg';
import { AudioPlayer } from './components/AudioPlayer';
import { WelcomeModal } from './components/WelcomeModal';
import { ImageLightbox, LightboxMedia } from './components/ImageLightbox';
import { AudioProvider } from './context/AudioContext';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { Certifications } from './sections/Certifications';
import { Contact } from './sections/Contact';

const SECTION_IDS = ['inicio', 'sobre', 'projetos', 'habilidades', 'certificacoes', 'contato'];

export const AppContent: React.FC = () => {
  const [profile] = useState<DeveloperProfile>(initialProfile);
  const [projects] = useState<Project[]>(initialProjects);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [previewMedia, setPreviewMedia] = useState<LightboxMedia | null>(null);
  const [activeSection, setActiveSection] = useState<string>('inicio');

  useEffect(() => {
    // 1. Observer para revelação suave das seções no scroll
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.05 }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => revealObserver.observe(el));

    // 2. Observer para rastreamento da seção ativa na navbar
    const sectionObservers: (IntersectionObserver | null)[] = SECTION_IDS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });

    return () => {
      revealObserver.disconnect();
      sectionObservers.forEach((obs) => obs?.disconnect());
    };
  }, []);

  // Lazy loading das imagens do grid: atribui o src somente quando entram na viewport
  useEffect(() => {
    const lazyImages = document.querySelectorAll<HTMLImageElement>('img.lazy-gif');
    if (!lazyImages.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src && !img.src.startsWith('http')) {
              img.src = img.dataset.src;
            }
            obs.unobserve(img);
          }
        });
      },
      { rootMargin: '200px' }
    );

    lazyImages.forEach((img) => obs.observe(img));
    return () => obs.disconnect();
  }, []);

  const navLinks = [
    { id: 'sobre', label: 'Sobre' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'habilidades', label: 'Habilidades' },
    { id: 'certificacoes', label: 'Certificados' }
  ];

  return (
    <div className="portfolio-app">
      {/* Modal de Boas-Vindas & Autorização do Player de Áudio */}
      <WelcomeModal />

      {/* Background de Rede Neural Interativa em Movimento */}
      <NeuralNetworkBg />

      {/* Overlay escuro de fundo ao abrir drawer mobile */}
      {isMobileMenuOpen && <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)} />}

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
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`hamburger-bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
            </button>
          </div>

          <nav className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <div className="mobile-drawer-audio-container">
              <AudioPlayer variant="drawer" />
            </div>

            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`nav-link ${activeSection === link.id ? 'nav-link--active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}

            <a href="#contato" className="nav-cta-btn" onClick={() => setIsMobileMenuOpen(false)}>
              Contato
            </a>
          </nav>
        </div>
      </header>

      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Projects
          projects={projects}
          githubProfileUrl={profile.contacts.github}
          onPreview={setPreviewMedia}
        />
        <Skills profile={profile} />
        <Certifications profile={profile} />
        <Contact profile={profile} />
      </main>

      {/* Modal Lightbox de Expansão de Imagem / Vídeo */}
      {previewMedia && <ImageLightbox media={previewMedia} onClose={() => setPreviewMedia(null)} />}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} · Luiz Eduardo Lopes — Desenvolvedor de Software & IA · v1.0.0</p>
          <p className="footer-version">v1.0.0</p>
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
