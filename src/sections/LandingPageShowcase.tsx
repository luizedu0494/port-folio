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

        {/* ── Card Principal com Efeito de Borda Luminosa e Flutuação ── */}
        <BorderGlow
          className="landing-feature-card"
          edgeSensitivity={30}
          glowColor="0 0 100"
          backgroundColor="#090a10"
          borderRadius={24}
          glowRadius={42}
          glowIntensity={1.0}
          coneSpread={25}
          animated={false}
          colors={['#ffffff', '#cbd5e1', '#94a3b8']}
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

              {/* Botão de Ação Direta em Branco/Preto de Alto Contraste */}
              <div className="landing-action-row">
                <a
                  href="https://exemplo-landing-rouge.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="landing-primary-btn"
                  aria-label="Ver demonstração da landing page no ar"
                >
                  <ExternalLink size={16} />
                  <span>Ver Demonstração no Ar</span>
                  <ArrowRight size={16} className="btn-arrow" />
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
