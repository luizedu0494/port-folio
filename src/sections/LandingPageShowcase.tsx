import React from 'react';
import {
  Globe,
  ExternalLink,
  ArrowRight,
  MessageSquare,
  Zap,
  Search,
  Smartphone,
  CheckCircle2
} from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { ScrambleText } from '../components/ScrambleText';

export const LandingPageShowcase: React.FC = () => {
  return (
    <section id="landing-page" className="reveal-on-scroll section-padded landing-showcase-section">
      <div className="container">
        <SectionHeader
          icon={<Globe color="var(--accent-soft)" size={28} />}
          title="Landing Page de Alta Conversão"
          triggerId="landing-page"
        />

        <p className="landing-showcase-intro">
          Desenvolvimento de páginas comerciais e institucionais projetadas para <strong>valorizar marcas</strong>,{' '}
          prender a atenção e transformar visitantes em <strong>agendamentos reais pelo WhatsApp</strong> — combinando
          design editorial elegante, carregamento instantâneo e SEO local.
        </p>

        {/* ── Card Principal de Destaque Comercial ── */}
        <div className="landing-feature-card">
          <div className="landing-feature-grid">

            {/* Coluna de Conteúdo & Métricas */}
            <div className="landing-feature-content">
              <div className="landing-feature-badge-row">
                <span className="landing-live-badge">
                  <span className="landing-live-dot" />
                  Case Comercial no Ar · Maceió, AL
                </span>
                <span className="landing-tag-category">Saúde &amp; Estética Avançada</span>
              </div>

              <h3 className="landing-feature-title font-subtitle">
                <ScrambleText text="Dra. Valéria Brandão" onView hover fast />
              </h3>

              <p className="landing-feature-tagline">
                Gerenciamento Dérmico &amp; Rejuvenescimento · Instituto V2
              </p>

              <p className="landing-feature-description">
                Página desenvolvida sob medida para a clínica de estética avançada no Instituto V2.
                Projetada com arquitetura de alta conversão para conduzir o público do Google e Instagram
                diretamente ao agendamento de consultas pelo WhatsApp, aliando sofisticação visual à máxima
                velocidade de navegação no celular.
              </p>

              {/* Pilares Comerciais do Projeto */}
              <div className="landing-pillars-grid">
                <div className="landing-pillar-item">
                  <div className="landing-pillar-icon-box">
                    <MessageSquare size={16} color="var(--accent-soft)" />
                  </div>
                  <div>
                    <h4 className="landing-pillar-title">Conversão no WhatsApp</h4>
                    <p className="landing-pillar-desc">
                      Copywriting persuasivo e chamadas estratégicas para agendamento rápido sem atrito.
                    </p>
                  </div>
                </div>

                <div className="landing-pillar-item">
                  <div className="landing-pillar-icon-box">
                    <Zap size={16} color="var(--accent-soft)" />
                  </div>
                  <div>
                    <h4 className="landing-pillar-title">Velocidade &amp; Performance</h4>
                    <p className="landing-pillar-desc">
                      Imagens leves em WebP e CSS otimizado para carregamento veloz em 4G/5G.
                    </p>
                  </div>
                </div>

                <div className="landing-pillar-item">
                  <div className="landing-pillar-icon-box">
                    <Search size={16} color="var(--accent-soft)" />
                  </div>
                  <div>
                    <h4 className="landing-pillar-title">SEO Local Estruturado</h4>
                    <p className="landing-pillar-desc">
                      Metadados semânticos Schema.org para ranqueamento de clínica em Maceió.
                    </p>
                  </div>
                </div>

                <div className="landing-pillar-item">
                  <div className="landing-pillar-icon-box">
                    <Smartphone size={16} color="var(--accent-soft)" />
                  </div>
                  <div>
                    <h4 className="landing-pillar-title">100% Mobile-First</h4>
                    <p className="landing-pillar-desc">
                      Experiência fluida em smartphones com menu overlay de resposta instantânea.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tags Técnicas da Landing Page */}
              <div className="landing-tech-tags">
                <span className="landing-tech-tag">HTML5 Semântico</span>
                <span className="landing-tech-tag">CSS3 Minificado</span>
                <span className="landing-tech-tag">JavaScript Puro</span>
                <span className="landing-tech-tag">Schema.org / SEO</span>
                <span className="landing-tech-tag">Design Responsivo</span>
                <span className="landing-tech-tag">Vercel Deploy</span>
              </div>

              {/* Botão de Ação Direta */}
              <div className="landing-action-row">
                <a
                  href="https://exemplo-landing-rouge.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="landing-primary-btn"
                  aria-label="Acessar landing page da Dra. Valéria Brandão no ar"
                >
                  <ExternalLink size={16} />
                  <span>Acessar Landing Page no Ar</span>
                  <ArrowRight size={16} className="btn-arrow" />
                </a>

                <span className="landing-url-hint">
                  exemplo-landing-rouge.vercel.app
                </span>
              </div>
            </div>

            {/* Coluna Visual: Mockup de Navegador com Imagem Real */}
            <div className="landing-feature-preview">
              <a
                href="https://exemplo-landing-rouge.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="landing-mockup-frame"
                title="Clique para abrir a landing page no ar"
              >
                {/* Topbar do Mockup de Browser */}
                <div className="landing-mockup-bar">
                  <div className="landing-mockup-dots">
                    <span className="mockup-dot red" />
                    <span className="mockup-dot yellow" />
                    <span className="mockup-dot green" />
                  </div>
                  <div className="landing-mockup-address">
                    <span className="mockup-lock">🔒</span>
                    dravaleriabrandao.com.br / instituto-v2
                  </div>
                </div>

                {/* Imagem Real da Landing Page */}
                <div className="landing-mockup-image-container">
                  <img
                    src="/images/valeria_brandao_preview.jpg"
                    alt="Preview da Landing Page Dra. Valéria Brandão"
                    className="landing-mockup-img"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="landing-mockup-overlay">
                    <span className="landing-mockup-hover-btn">
                      <ExternalLink size={16} />
                      <span>Ver Projeto Completo no Ar ↗</span>
                    </span>
                  </div>
                </div>

                {/* Rodapé do Frame com Indicador */}
                <div className="landing-mockup-footer">
                  <div className="mockup-footer-badge">
                    <CheckCircle2 size={13} color="#22c55e" />
                    <span>Design Editorial &amp; Tipografia Playfair / Montserrat</span>
                  </div>
                  <span className="mockup-footer-tag">Online</span>
                </div>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
