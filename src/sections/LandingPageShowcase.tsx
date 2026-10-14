import React from 'react';
import {
  Globe,
  ExternalLink,
  MessageSquare,
  Zap,
  Search,
  Smartphone,
  CheckCircle2
} from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { BorderGlow } from '../components/BorderGlow';

export const LandingPageShowcase: React.FC = () => {
  return (
    <section id="landing-page" className="reveal-on-scroll section-padded landing-showcase-section">
      <div className="container">
        <SectionHeader
          icon={<Globe color="var(--accent-platinum)" size={28} />}
          title="Landing Page de Alta Conversão"
          triggerId="landing-page"
        />

        <p className="landing-showcase-intro">
          Desenvolvimento de páginas comerciais projetadas para <strong>valorizar marcas</strong>,{' '}
          prender a atenção e transformar visitantes em <strong>clientes reais pelo WhatsApp</strong> — com design
          editorial refinado, carregamento instantâneo e foco absoluto em conversão.
        </p>

        {/* ── Card Principal com Efeito de Borda Idêntico ao Card de Habilidades ── */}
        <BorderGlow
          className="landing-feature-card"
          edgeSensitivity={30}
          glowColor="40 80 80"
          backgroundColor="#0d0e15"
          borderRadius={20}
          glowRadius={40}
          glowIntensity={1.0}
          coneSpread={25}
          animated={false}
          colors={['#38bdf8', '#c084fc', '#f472b6']}
        >
          <div className="landing-feature-grid">

            {/* Coluna de Conteúdo & Benefícios para o Cliente */}
            <div className="landing-feature-content">
              <h3 className="landing-feature-title font-subtitle">
                Exemplo de Landing Page Profissional
              </h3>

              <p className="landing-feature-tagline">
                Design Sofisticado · Carregamento Instantâneo · Foco em Vendas &amp; Agendamentos
              </p>

              <p className="landing-feature-description">
                Uma demonstração prática de como uma página web de alto padrão posiciona sua marca com
                autoridade, atrai o público certo e transforma visitas em contatos reais. Estrutura
                pensada para prestadores de serviços, clínicas, escritórios e empresas que desejam captar
                clientes pelo Google e redes sociais sem perder oportunidades por lentidão ou layout amador.
              </p>

              {/* Pilares Comerciais de Impacto */}
              <div className="landing-pillars-grid">
                <div className="landing-pillar-item">
                  <div className="landing-pillar-icon-box">
                    <MessageSquare size={16} color="var(--accent-platinum)" />
                  </div>
                  <div>
                    <h4 className="landing-pillar-title">Conversão no WhatsApp</h4>
                    <p className="landing-pillar-desc">
                      Copywriting persuasivo e chamadas estratégicas para agendamento sem atrito.
                    </p>
                  </div>
                </div>

                <div className="landing-pillar-item">
                  <div className="landing-pillar-icon-box">
                    <Zap size={16} color="var(--accent-platinum)" />
                  </div>
                  <div>
                    <h4 className="landing-pillar-title">Velocidade &amp; Performance</h4>
                    <p className="landing-pillar-desc">
                      Carregamento instantâneo em 4G/5G para não perder clientes por lentidão.
                    </p>
                  </div>
                </div>

                <div className="landing-pillar-item">
                  <div className="landing-pillar-icon-box">
                    <Smartphone size={16} color="var(--accent-platinum)" />
                  </div>
                  <div>
                    <h4 className="landing-pillar-title">100% Mobile-First</h4>
                    <p className="landing-pillar-desc">
                      Navegação fluida e perfeita no celular, onde está mais de 80% do público.
                    </p>
                  </div>
                </div>

                <div className="landing-pillar-item">
                  <div className="landing-pillar-icon-box">
                    <Search size={16} color="var(--accent-platinum)" />
                  </div>
                  <div>
                    <h4 className="landing-pillar-title">SEO &amp; Presença no Google</h4>
                    <p className="landing-pillar-desc">
                      Estrutura otimizada para buscas locais e ranqueamento na sua região.
                    </p>
                  </div>
                </div>
              </div>

              {/* Botão de Ação Direta idêntico ao CronoLab */}
              <div className="landing-action-row">
                <a
                  href="https://exemplo-landing-rouge.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  aria-label="Acessar aplicação de demonstração da landing page"
                >
                  <ExternalLink size={17} /> Acessar Aplicação
                </a>

                <span className="landing-url-hint">
                  exemplo-landing-rouge.vercel.app
                </span>
              </div>
            </div>

            {/* Coluna Visual: Mockup de Navegador com Demonstração */}
            <div className="landing-feature-preview">
              <a
                href="https://exemplo-landing-rouge.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="landing-mockup-frame"
                title="Clique para abrir a demonstração no ar"
              >
                {/* Topbar do Mockup de Browser com dots monocromáticos */}
                <div className="landing-mockup-bar">
                  <div className="landing-mockup-dots">
                    <span className="mockup-dot dot-1" />
                    <span className="mockup-dot dot-2" />
                    <span className="mockup-dot dot-3" />
                  </div>
                  <div className="landing-mockup-address">
                    <span className="mockup-lock">🔒</span>
                    seunegocio.com.br / landing-page
                  </div>
                </div>

                {/* Imagem Real da Demonstração */}
                <div className="landing-mockup-image-container">
                  <img
                    src="/images/valeria_brandao_preview.jpg"
                    alt="Exemplo de Landing Page de Alta Conversão"
                    className="landing-mockup-img"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="landing-mockup-overlay">
                    <span className="landing-mockup-hover-btn">
                      <ExternalLink size={16} />
                      <span>Ver Demonstração Completa ↗</span>
                    </span>
                  </div>
                </div>

                {/* Rodapé do Frame Monocromático */}
                <div className="landing-mockup-footer">
                  <div className="mockup-footer-badge">
                    <CheckCircle2 size={13} color="var(--accent-platinum)" />
                    <span>Design Editorial &amp; Tipografia Refinada</span>
                  </div>
                  <span className="mockup-footer-tag">Demonstração</span>
                </div>
              </a>
            </div>

          </div>
        </BorderGlow>

      </div>
    </section>
  );
};
