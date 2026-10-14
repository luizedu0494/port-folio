import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Bot,
  Terminal,
  ArrowRight,
  Database,
  Code2,
  MessagesSquare
} from 'lucide-react';
import { DemoAsciiCanvas } from '../components/demo/DemoAsciiCanvas';
import { ScrambleText } from '../components/ScrambleText';
import './DemoStudioLanding.css';

interface DemoStudioLandingProps {
  onBackToPortfolio: () => void;
}

export const DemoStudioLanding: React.FC<DemoStudioLandingProps> = ({ onBackToPortfolio }) => {
  const [isMatrixMode, setIsMatrixMode] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const originalTitle = document.title;
    document.title = 'NEXUS Studio | Exemplo Comercial — Software & Agentes de IA';
    return () => {
      document.title = originalTitle;
    };
  }, []);

  return (
    <div className={`demo-landing-root ${isMatrixMode ? 'demo-matrix-mode' : ''}`}>
      {/* Luzes sutis de fundo */}
      <div className="demo-bg-glow-top" />
      <div className="demo-bg-glow-mid" />

      {/* ── Top Bar Exclusiva do Estúdio ── */}
      <header className="demo-top-bar">
        <div className="demo-top-container">
          <div className="demo-brand">
            <span className="demo-brand-logo">
              <Bot size={21} color="#38bdf8" />
              NEXUS // STUDIO
            </span>
            <span className="demo-brand-tag">Exemplo Comercial</span>
          </div>

          <div className="demo-nav-actions">
            <nav className="demo-nav-links-desktop">
              <a href="#solucoes-demo" className="demo-nav-link">Soluções</a>
              <a href="#metodologia-demo" className="demo-nav-link">Metodologia</a>
              <a href="#contato-demo" className="demo-nav-link">Diagnóstico</a>
            </nav>

            <button
              type="button"
              onClick={() => setIsMatrixMode(!isMatrixMode)}
              className="demo-ascii-btn-toggle"
              title="Alternar entre Estética Estúdio Minimalista e Terminal Matrix"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.8rem' }}
            >
              <Terminal size={13} />
              <span>{isMatrixMode ? 'Tema: Matrix CRT' : 'Tema: Studio Dark'}</span>
            </button>

            <button
              onClick={onBackToPortfolio}
              className="demo-back-btn"
              title="Retornar à página principal do portfólio"
            >
              <ArrowLeft size={16} />
              <span>Voltar ao Portfólio</span>
            </button>

            <a
              href="https://wa.me/5582987178952?text=Ol%C3%A1%20Luiz,%20vi%20a%20landing%20page%20de%20exemplo%20do%20Nexus%20Studio%20e%20gostaria%20de%20um%20diagn%C3%B3stico%20para%20minha%20empresa."
              target="_blank"
              rel="noopener noreferrer"
              className="demo-cta-hire"
            >
              <span>Solicitar Orçamento</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </header>

      <div className="demo-content-wrap">
        {/* Banner de Contexto de Demonstração */}
        <div className="demo-context-alert">
          <div className="demo-context-left">
            <Sparkles size={17} color="#38bdf8" style={{ flexShrink: 0 }} />
            <span>
              <strong>Showcase Comercial:</strong> Esta landing page é uma demonstração de como concebemos ecossistemas de alta conversão para empresas e estúdios de IA.
            </span>
          </div>
          <button
            onClick={onBackToPortfolio}
            className="demo-context-btn-close"
          >
            ← Voltar ao Portfólio
          </button>
        </div>

        {/* ── Hero Section Comercial ── */}
        <section className="demo-hero-section">
          <div className="demo-hero-pill">
            <Terminal size={13} color="#38bdf8" />
            <span>ENGENHARIA DE SOFTWARE &amp; AGENTES AUTÔNOMOS</span>
          </div>

          <h1 className="demo-hero-title">
            Arquitetura Digital de Alta Precisão &amp;{' '}
            <span className="demo-hero-title-highlight">Agentes Autônomos de IA</span> para Operações Críticas.
          </h1>

          <p className="demo-hero-subtitle">
            Substituímos gargalos operacionais manuais e planilhas desconexas por ecossistemas digitais rápidos, inteligentes e orientados a dados. Da concepção arquitetural ao deploy contínuo em produção.
          </p>

          <div className="demo-hero-cta-group">
            <a
              href="https://wa.me/5582987178952?text=Ol%C3%A1%20Luiz,%20gostaria%20de%20agendar%20um%20diagn%C3%B3stico%20de%20IA%20e%20Software."
              target="_blank"
              rel="noopener noreferrer"
              className="demo-btn-primary"
            >
              <span>Agendar Diagnóstico Técnico</span>
              <ArrowRight size={17} />
            </a>

            <a
              href="#solucoes-demo"
              className="demo-btn-secondary"
            >
              <span>Conhecer Soluções</span>
            </a>
          </div>

          {/* Banner Interativo M10: ASCII Canvas com Física de Partículas e Scramble */}
          <DemoAsciiCanvas />
        </section>

        {/* ── Faixa de Métricas Operacionais ── */}
        <div className="demo-metrics-strip">
          <div className="demo-metric-item">
            <span className="demo-metric-val demo-metric-val-accent">85%</span>
            <span className="demo-metric-label">Redução média no tempo de triagem de processos</span>
          </div>
          <div className="demo-metric-item">
            <span className="demo-metric-val">&lt;400ms</span>
            <span className="demo-metric-label">Latência média de inferência em pipelines reativos</span>
          </div>
          <div className="demo-metric-item">
            <span className="demo-metric-val">2 a 4</span>
            <span className="demo-metric-label">Semanas para MVP funcional testado em produção</span>
          </div>
          <div className="demo-metric-item">
            <span className="demo-metric-val demo-metric-val-accent">100%</span>
            <span className="demo-metric-label">Propriedade do código-fonte (zero lock-in)</span>
          </div>
        </div>

        {/* ── Seção: Soluções & Agentes Autônomos ── */}
        <section id="solucoes-demo">
          <div className="demo-section-header">
            <span className="demo-section-tag">Capacidades Técnicas</span>
            <h2 className="demo-section-title">
              <ScrambleText text="Engenharia Sob Medida para Desafios Complexos" onView hover fast />
            </h2>
            <p className="demo-section-desc">
              Não aplicamos scripts genéricos. Projetamos agentes e aplicações web moldados especificamente às regras de negócio e integrações da sua operação.
            </p>
          </div>

          <div className="demo-solutions-grid">
            {/* Card 1: Agentes de Decisão & Triagem */}
            <div className="demo-solution-card">
              <div className="demo-solution-icon-wrap">
                <Bot size={26} color="#38bdf8" />
              </div>
              <h3 className="demo-solution-title">Agentes de Triagem &amp; Decisão Autônoma</h3>
              <p className="demo-solution-desc">
                Agentes cognitivos que leem documentos, qualificam leads em múltiplos canais, extraem dados complexos e acionam fluxos no CRM/ERP sem intervenção humana repetitiva.
              </p>
              <div className="demo-tech-chips">
                <span className="demo-tech-chip">LangChain / LlamaIndex</span>
                <span className="demo-tech-chip">Python FastApi</span>
                <span className="demo-tech-chip">Structured Outputs</span>
                <span className="demo-tech-chip">Webhooks</span>
              </div>
            </div>

            {/* Card 2: Aplicações Web de Alta Performance */}
            <div className="demo-solution-card">
              <div className="demo-solution-icon-wrap">
                <Code2 size={26} color="#cbd5e1" />
              </div>
              <h3 className="demo-solution-title">Plataformas Web Reativas de Alta Performance</h3>
              <p className="demo-solution-desc">
                Frontends modernos e velozes construídos com React 19, TypeScript e Vite. Interfaces fluidas a 60 FPS com microinterações refinadas e pontuação máxima em Core Web Vitals.
              </p>
              <div className="demo-tech-chips">
                <span className="demo-tech-chip">React 19</span>
                <span className="demo-tech-chip">TypeScript</span>
                <span className="demo-tech-chip">Vanilla CSS Tokens</span>
                <span className="demo-tech-chip">Vite / Cloud</span>
              </div>
            </div>

            {/* Card 3: RAG Corporativo & Governança */}
            <div className="demo-solution-card">
              <div className="demo-solution-icon-wrap">
                <Database size={26} color="#38bdf8" />
              </div>
              <h3 className="demo-solution-title">RAG Enterprise &amp; Governança de Dados</h3>
              <p className="demo-solution-desc">
                Bases de conhecimento conectadas a bancos vetoriais com controle estrito de permissões, criptografia em trânsito e em repouso, respeitando integralmente a LGPD.
              </p>
              <div className="demo-tech-chips">
                <span className="demo-tech-chip">PostgreSQL / pgvector</span>
                <span className="demo-tech-chip">Hybrid Search</span>
                <span className="demo-tech-chip">LGPD Compliance</span>
                <span className="demo-tech-chip">RBAC Security</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Seção: Metodologia de Entrega Ágil ── */}
        <section id="metodologia-demo">
          <div className="demo-section-header">
            <span className="demo-section-tag">Fluxo Transparente</span>
            <h2 className="demo-section-title">
              <ScrambleText text="Do Diagnóstico ao Deploy em 4 Semanas" onView hover fast />
            </h2>
            <p className="demo-section-desc">
              Processo enxuto sem reuniões intermináveis ou escopos inflados. Foco absoluto em métricas de negócio e código de produção.
            </p>
          </div>

          <div className="demo-process-grid">
            <div className="demo-process-card">
              <span className="demo-process-step-num">ETAPA 01</span>
              <h4 className="demo-process-card-title">Mapeamento de Gargalos</h4>
              <p className="demo-process-card-desc">
                Diagnóstico aprofundado dos processos operacionais mais custosos e definição das métricas de sucesso (ROI técnico).
              </p>
            </div>

            <div className="demo-process-card">
              <span className="demo-process-step-num">ETAPA 02</span>
              <h4 className="demo-process-card-title">Arquitetura &amp; Prompts</h4>
              <p className="demo-process-card-desc">
                Desenho da topologia de agentes, engenharia de contexto refinada e validação de latência com dados de exemplo.
              </p>
            </div>

            <div className="demo-process-card">
              <span className="demo-process-step-num">ETAPA 03</span>
              <h4 className="demo-process-card-title">Desenvolvimento Fullstack</h4>
              <p className="demo-process-card-desc">
                Construção com tipagem estrita, integração com APIs existentes, testes de segurança e validação contínua.
              </p>
            </div>

            <div className="demo-process-card">
              <span className="demo-process-step-num">ETAPA 04</span>
              <h4 className="demo-process-card-title">Deploy &amp; Observabilidade</h4>
              <p className="demo-process-card-desc">
                Publicação em infraestrutura escalável com monitoramento de consumo de tokens, fallbacks e treinamento de uso.
              </p>
            </div>
          </div>
        </section>

        {/* ── Seção de Conversão / Diagnóstico ── */}
        <section id="contato-demo" className="demo-cta-card">
          <span className="demo-section-tag" style={{ color: '#38bdf8' }}>Inicie seu Projeto</span>
          <h2 className="demo-cta-title">
            Pronto para transformar a eficiência operacional do seu negócio?
          </h2>
          <p className="demo-cta-desc">
            Agende uma sessão técnica de 30 minutos com Luiz Eduardo Lopes para mapear onde agentes autônomos ou uma aplicação web sob medida trarão maior retorno para sua empresa.
          </p>

          <div className="demo-cta-actions">
            <a
              href="https://wa.me/5582987178952?text=Ol%C3%A1%20Luiz,%20gostaria%20de%20agendar%20um%20diagn%C3%B3stico%20de%20IA%20e%20Software%20para%20minha%20empresa."
              target="_blank"
              rel="noopener noreferrer"
              className="demo-btn-primary"
              style={{ fontSize: '1.05rem', padding: '1rem 2.2rem' }}
            >
              <MessagesSquare size={19} />
              <span>Falar no WhatsApp Diretamente</span>
            </a>

            <button
              onClick={onBackToPortfolio}
              className="demo-btn-secondary"
              style={{ fontSize: '1rem', padding: '1rem 1.8rem' }}
            >
              <ArrowLeft size={17} />
              <span>Voltar ao Portfólio Principal</span>
            </button>
          </div>
        </section>

        {/* ── Rodapé da Demo ── */}
        <footer className="demo-footer">
          <div className="demo-footer-container">
            <p className="demo-footer-copy">
              © {new Date().getFullYear()} NEXUS // AI TECH STUDIO. Protótipo demonstrativo desenvolvido por{' '}
              <button
                onClick={onBackToPortfolio}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#38bdf8',
                  cursor: 'pointer',
                  padding: 0,
                  font: 'inherit',
                  textDecoration: 'underline'
                }}
              >
                Luiz Eduardo Lopes
              </button>.
            </p>

            <span className="demo-footer-stack">
              React 19 • TypeScript • Vite • Vanilla CSS Tokens
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};
