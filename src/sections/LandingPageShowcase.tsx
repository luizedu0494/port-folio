import React from 'react';
import {
  Globe,
  ExternalLink,
  MessageSquare,
  Zap,
  Search,
  Smartphone,
  CheckCircle2,
  Database,
  Sparkles,
  Calendar
} from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { BorderGlow } from '../components/BorderGlow';
import { WhatsappIcon } from '../components/icons';

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

              {/* ── Evolução para Sistema / Agendamento com Banco de Dados ── */}
              <div className="landing-system-upgrade-card">
                <div className="system-upgrade-header">
                  <div className="system-upgrade-badge">
                    <Database size={13} color="var(--accent-platinum)" />
                    <span>Evolução Sob Medida</span>
                  </div>
                  <span className="system-upgrade-pill">Sistema &amp; Banco de Dados</span>
                </div>
                <h4 className="system-upgrade-title">
                  Quer evoluir para um sistema completo?
                </h4>
                <p className="system-upgrade-desc">
                  Caso seu negócio precise de mais do que uma landing page institucional, o projeto pode expandir para um <strong>sistema web sob medida</strong> — incluindo <strong>agendamento dinâmico</strong> integrado a <strong>banco de dados</strong>, painel administrativo e autenticação.
                </p>
                <div className="system-upgrade-action-row">
                  <a
                    href="https://wa.me/5582999931035?text=Ol%C3%A1%20Luiz!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20uma%20landing%20page%20ou%20sistema%20sob%20medida."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary system-budget-btn"
                    aria-label="Solicitar orçamento para sistema ou agendamento no WhatsApp"
                  >
                    <WhatsappIcon size={16} /> Solicitar Orçamento
                  </a>
                  <span className="system-upgrade-hint">Atendimento direto pelo WhatsApp</span>
                </div>
              </div>
            </div>

            {/* Coluna Visual: Mockup de Navegador com Interface Renderizada */}
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

                {/* Interface Digital Renderizada em Código (Sem foto de cliente antiga) */}
                <div className="landing-mockup-screen">
                  <div className="mockup-screen-hero">
                    <div className="mockup-screen-nav">
                      <span className="mockup-screen-logo">✦ SEU NEGÓCIO</span>
                      <div className="mockup-screen-nav-links">
                        <span>Serviços</span>
                        <span>Agendamentos</span>
                        <span>Contato</span>
                      </div>
                    </div>

                    <div className="mockup-screen-headline">
                      <span className="mockup-screen-eyebrow">Design Editorial &amp; Alta Conversão</span>
                      <h5 className="mockup-screen-title">Página Comercial de Alto Padrão</h5>
                      <p className="mockup-screen-subtitle">
                        Estrutura pensada para atrair clientes qualificados e gerar agendamentos imediatos no WhatsApp.
                      </p>
                    </div>

                    <div className="mockup-screen-interactive-row">
                      <div className="screen-widget-calendar">
                        <div className="widget-cal-header">
                          <Calendar size={12} color="var(--accent-platinum)" />
                          <span>Agendamento Online</span>
                        </div>
                        <span className="widget-cal-status">● Horários Integrados ao Banco de Dados</span>
                      </div>
                    </div>

                    <div className="mockup-screen-features">
                      <div className="screen-feat-chip">
                        <span className="feat-chip-dot" />
                        <span>Carregamento Ultra Rápido</span>
                      </div>
                      <div className="screen-feat-chip">
                        <span className="feat-chip-dot" />
                        <span>100% Mobile</span>
                      </div>
                      <div className="screen-feat-chip">
                        <span className="feat-chip-dot" />
                        <span>Banco de Dados</span>
                      </div>
                    </div>
                  </div>

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
