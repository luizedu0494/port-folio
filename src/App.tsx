import React, { useState, useEffect } from 'react';
import { Sparkles, Moon } from 'lucide-react';
import { DeveloperProfile, Project } from './types/portfolio';
import { initialProfile, initialProjects } from './data/initialData';
import { NeuralNetworkBg } from './components/NeuralNetworkBg';
import { AudioPlayer } from './components/AudioPlayer';
import { AsciiIntro } from './components/AsciiIntro';
import { SvgAsciiWordmark } from './components/SvgAsciiWordmark';
import { TypewriterText } from './components/TypewriterText';
import { ScrambleText } from './components/ScrambleText';
import { ImageLightbox, LightboxMedia } from './components/ImageLightbox';
import { AudioProvider, useAudio } from './context/AudioContext';
import { initGridSystem } from './ascii/gridSystem';
import { CosmicCometCursor } from './components/CosmicCometCursor';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { Certifications } from './sections/Certifications';
import { Contact } from './sections/Contact';
import { DemoStudioLanding } from './pages/DemoStudioLanding';

const SECTION_IDS = ['sobre', 'projetos', 'habilidades', 'certificacoes', 'contato'];

export const AppContent: React.FC = () => {
  const { startExperienceWithAudio } = useAudio();
  // Controle de Rota SPA (Portfólio Principal vs. Landing Page de Demonstração Comercial)
  const isInitialDemo = typeof window !== 'undefined' && (window.location.hash === '#demo' || window.location.search.includes('demo'));
  const [entered, setEntered] = useState<boolean>(() => isInitialDemo);
  const [profile] = useState<DeveloperProfile>(initialProfile);
  const [projects] = useState<Project[]>(initialProjects);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [previewMedia, setPreviewMedia] = useState<LightboxMedia | null>(null);
  const [activeSection, setActiveSection] = useState<string>('sobre');
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true);

  const [currentView, setCurrentView] = useState<'portfolio' | 'demo'>(() => {
    return isInitialDemo ? 'demo' : 'portfolio';
  });

  const navigateTo = (view: 'portfolio' | 'demo') => {
    setCurrentView(view);
    if (view === 'demo') {
      setEntered(true);
      window.location.hash = 'demo';
    } else {
      if (window.location.hash === '#demo') {
        history.pushState('', document.title, window.location.pathname + window.location.search);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#demo') {
        setEntered(true);
        setCurrentView('demo');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (currentView === 'demo' && window.location.hash !== '#demo') {
        setCurrentView('portfolio');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [currentView]);

  // Toggle de Efeitos (Modo Imersivo / Modo Foco de Alta Leitura)
  const [effectsEnabled, setEffectsEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem('portfolio_effects') !== 'disabled';
  });

  const toggleEffects = () => {
    setEffectsEnabled((prev) => {
      const next = !prev;
      localStorage.setItem('portfolio_effects', next ? 'enabled' : 'disabled');
      return next;
    });
  };

  // Auto-hide da navbar no scroll down e reaparece no scroll up (60 FPS com requestAnimationFrame)
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const diff = currentScrollY - lastScrollY;

          if (currentScrollY < 50) {
            setIsNavVisible(true);
          } else if (diff > 8 && currentScrollY > 100) {
            setIsNavVisible(false);
          } else if (diff < -6) {
            setIsNavVisible(true);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const cleanGrid = initGridSystem();
    return () => {
      cleanGrid();
    };
  }, []);

  // Trava o scroll do body quando o menu mobile está aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      revealObserver.observe(el);
    });

    if (entered) {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('visible');
        el.classList.add('is-visible');
      });
    }

    const sectionObservers = SECTION_IDS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      return obs;
    });

    return () => {
      revealObserver.disconnect();
      sectionObservers.forEach((obs) => obs?.disconnect());
    };
  }, [entered]);

  // Lazy loading das imagens do grid
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
    { id: 'projetos', label: 'Projetos' },
    { id: 'habilidades', label: 'Habilidades' },
    { id: 'certificacoes', label: 'Certificados' }
  ];

  return (
    <div className={`portfolio-app ${entered ? 'ready' : ''} ${effectsEnabled ? 'effects-active' : 'effects-disabled'}`}>
      <a href="#sobre" className="skip-link">Pular para o conteúdo</a>

      {/* Intro Vortex Cosmic — Apenas no portfólio se ainda não entrou */}
      {!entered && currentView === 'portfolio' && (
        <AsciiIntro
          videoSrc="/assets/videos/tech-fear.mp4"
          onStart={(withAudio) => {
            if (withAudio) startExperienceWithAudio();
          }}
          onEnter={() => setEntered(true)}
        />
      )}

      {/* Background de Rede Neural Interativa em Movimento — Apenas no portfólio */}
      {effectsEnabled && currentView === 'portfolio' && <NeuralNetworkBg />}

      {/* Cursor Cometa Cósmico no Desktop — Apenas no portfólio */}
      {entered && effectsEnabled && currentView === 'portfolio' && <CosmicCometCursor />}

      {/* Overlay escuro de fundo ao abrir drawer mobile */}
      {isMobileMenuOpen && <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)} />}

      {/* Header / Navbar do Portfólio Principal */}
      {currentView === 'portfolio' && (
        <header
          className={`navbar ${!isNavVisible && !isMobileMenuOpen ? 'navbar--hidden' : ''}`}
          inert={!entered}
        >
        <div className="container nav-container">
          <a
            href="#sobre"
            className="brand-logo font-display"
            aria-label="Ir para Sobre Mim"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent('trigger-section-scramble', { detail: { id: 'sobre' } })
              );
            }}
          >
            <Sparkles size={20} color="var(--accent-soft)" />
            <span className="brand-wordmark-text">
              <ScrambleText text="luiz.edu" hover fast />
            </span>
          </a>

          {/* Ações Mobile e Player de Áudio no Header */}
          <div className="mobile-header-actions">
            <AudioPlayer variant="navbar" />

            <button
              className={`effects-toggle-btn mobile-effects-btn ${effectsEnabled ? 'effects-active' : 'effects-focus'}`}
              onClick={toggleEffects}
              title={effectsEnabled ? "Modo Imersivo ativo — Clique para Modo Foco (reduzir efeitos visuais)" : "Modo Foco ativo — Clique para reativar efeitos visuais"}
              aria-label={effectsEnabled ? "Ativar Modo Foco" : "Ativar Modo Imersivo"}
            >
              {effectsEnabled ? (
                <Sparkles size={15} color="#38bdf8" />
              ) : (
                <Moon size={15} color="var(--text-muted)" />
              )}
            </button>

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
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  // Dispara scramble simultâneo no título da seção + label do nav
                  window.dispatchEvent(
                    new CustomEvent('trigger-section-scramble', { detail: { id: link.id } })
                  );
                }}
              >
                {link.label}
              </a>
            ))}

            <button
              className={`effects-toggle-btn desktop-effects-btn ${effectsEnabled ? 'effects-active' : 'effects-focus'}`}
              onClick={toggleEffects}
              title={effectsEnabled ? "Modo Imersivo ativo — Clique para alternar para o Modo Foco" : "Modo Foco ativo — Clique para reativar os efeitos visuais"}
              aria-label={effectsEnabled ? "Ativar Modo Foco" : "Ativar Modo Imersivo"}
            >
              {effectsEnabled ? (
                <Sparkles size={16} color="#38bdf8" />
              ) : (
                <Moon size={16} color="var(--text-muted)" />
              )}
            </button>

            <a
              href="#contato"
              className="nav-cta-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.dispatchEvent(
                  new CustomEvent('trigger-section-scramble', { detail: { id: 'contato' } })
                );
              }}
            >
              Contato
            </a>
          </nav>
        </div>
      </header>
      )}

      {currentView === 'demo' ? (
        <DemoStudioLanding onBackToPortfolio={() => navigateTo('portfolio')} />
      ) : (
        <>
          <main id="conteudo-principal">
            <About profile={profile} />
            <Projects
              projects={projects}
              githubProfileUrl={profile.contacts.github}
              onPreview={(m) => setPreviewMedia(m)}
            />
            <Skills profile={profile} />
            <Certifications profile={profile} />
            <Contact profile={profile} />
          </main>

          {/* Rodapé Expandido — Wordmark + Apresentação */}
          <footer className="footer-ascii-section" aria-label="Rodapé do portfólio">
            <div className="container footer-container">
              <div className="footer-wordmark-wrapper footer-wordmark-wrapper--large">
                <SvgAsciiWordmark variant="footer" />
              </div>

              <div className="footer-headline-wrapper">
                <p className="footer-headline-text">
                  <span className="footer-headline-intro">Desenvolvedor de Software focado em</span>
                  <span className="footer-headline-dynamic">
                    <TypewriterText
                      words={[
                        'Landing Pages de Alta Conversão',
                        'Engenharia de IA & Agentes',
                        'Desenvolvimento Fullstack React & Python',
                        'Sistemas Inteligentes & Web Performance'
                      ]}
                    />
                  </span>
                </p>
              </div>

              <div className="footer-bottom-line">
                <p className="footer-copy">
                  © {new Date().getFullYear()} Luiz Eduardo. Todos os direitos reservados.
                </p>
                <p className="footer-tech-stack">
                  Arquitetado com React 19, TypeScript &amp; Neural Space Canvas
                </p>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* Modal de Lightbox para Pré-visualização Ampliada */}
      {previewMedia && <ImageLightbox media={previewMedia} onClose={() => setPreviewMedia(null)} />}
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

export default App;
