import React, { useEffect } from 'react';
import { ArrowLeft, Sparkles, ExternalLink, Bot, Cpu, ShieldCheck, Terminal } from 'lucide-react';
import './DemoStudioLanding.css';

interface DemoStudioLandingProps {
  onBackToPortfolio: () => void;
}

export const DemoStudioLanding: React.FC<DemoStudioLandingProps> = ({ onBackToPortfolio }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'NEXUS Studio | Landing Page de Exemplo — Agentes de IA & Software';
    return () => {
      document.title = 'Luiz Eduardo Lopes | Portfólio & Engenharia de IA';
    };
  }, []);

  return (
    <div className="demo-landing-root">
      {/* Barra de Navegação Exclusiva da Landing Page */}
      <header className="demo-top-bar">
        <div className="demo-top-container">
          <div className="demo-brand">
            <span className="demo-brand-logo">
              <Bot size={20} color="#38bdf8" />
              NEXUS // STUDIO
            </span>
            <span className="demo-brand-tag">Exemplo para Clientes</span>
          </div>

          <div className="demo-nav-actions">
            <button
              onClick={onBackToPortfolio}
              className="demo-back-btn"
              title="Retornar à página principal do portfólio"
            >
              <ArrowLeft size={16} />
              <span>Voltar ao Portfólio</span>
            </button>

            <a
              href="https://wa.me/5582987178952?text=Ol%C3%A1%20Luiz,%20vi%20a%20landing%20page%20de%20exemplo%20e%20gostaria%20de%20um%20diagn%C3%B3stico%20para%20meu%20projeto."
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

      {/* Conteúdo Inicial da Camada 1 */}
      <main className="demo-main-container" style={{ maxWidth: '1200px', margin: '3rem auto 0', padding: '0 1.5rem' }}>
        <div style={{
          padding: '1.25rem 1.5rem',
          borderRadius: '12px',
          background: 'rgba(56, 189, 248, 0.08)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          marginBottom: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Sparkles size={18} color="#38bdf8" />
            <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
              <strong>Modo Demonstração Ativo:</strong> Esta página é um modelo comercial criado para exemplificar como apresentamos estúdios de tecnologia e agentes autônomos.
            </span>
          </div>
          <button
            onClick={onBackToPortfolio}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#38bdf8',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            ← Fechar Demonstração
          </button>
        </div>

        {/* Hero Preview */}
        <section style={{ textAlign: 'center', padding: '3rem 0 4rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.9rem',
            borderRadius: '9999px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(226, 232, 240, 0.18)',
            marginBottom: '1.5rem',
            fontSize: '0.8rem',
            fontFamily: 'JetBrains Mono, monospace',
            color: '#cbd5e1'
          }}>
            <Terminal size={13} color="#38bdf8" />
            <span>ENGENHARIA DE SOFTWARE & AGENTES AUTÔNOMOS</span>
          </div>

          <h1 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            margin: '0 auto 1.5rem',
            maxWidth: '960px',
            color: '#f8fafc'
          }}>
            Arquitetura Digital de Alta Precisão para Negócios Orientados por IA.
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            lineHeight: 1.6,
            color: '#94a3b8',
            maxWidth: '720px',
            margin: '0 auto 2.5rem'
          }}>
            Construímos plataformas web reativas, automações de fluxos complexos e agentes inteligentes que reduzem gargalos operacionais e elevam a conversão do seu produto.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/5582987178952?text=Ol%C3%A1%20Luiz,%20gostaria%20de%20um%20diagn%C3%B3stico%20de%20software%20e%20IA."
              target="_blank"
              rel="noopener noreferrer"
              className="demo-cta-hire"
              style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}
            >
              <span>Agendar Diagnóstico Técnico</span>
              <ExternalLink size={16} />
            </a>

            <button
              onClick={onBackToPortfolio}
              className="demo-back-btn"
              style={{ padding: '0.85rem 1.6rem', fontSize: '0.95rem' }}
            >
              <ArrowLeft size={16} />
              <span>Explorar Portfólio Principal</span>
            </button>
          </div>
        </section>

        {/* Grade de Pilares (Preview da Camada 2) */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          margin: '2rem 0'
        }}>
          <div style={{
            padding: '2rem',
            borderRadius: '16px',
            background: 'rgba(14, 16, 26, 0.65)',
            border: '1px solid rgba(226, 232, 240, 0.12)'
          }}>
            <Bot size={32} color="#38bdf8" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.25rem', marginBottom: '0.75rem', color: '#f8fafc' }}>
              Agentes Cognitivos & Workflows
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Automações inteligentes com tomada de decisão, triagem de leads qualificados e orquestração de APIs em tempo real.
            </p>
          </div>

          <div style={{
            padding: '2rem',
            borderRadius: '16px',
            background: 'rgba(14, 16, 26, 0.65)',
            border: '1px solid rgba(226, 232, 240, 0.12)'
          }}>
            <Cpu size={32} color="#cbd5e1" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.25rem', marginBottom: '0.75rem', color: '#f8fafc' }}>
              Sistemas Web de Alta Performance
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Aplicações construídas com React, TypeScript e Vite garantindo Core Web Vitals perfeitos e experiência fluida a 60 FPS.
            </p>
          </div>

          <div style={{
            padding: '2rem',
            borderRadius: '16px',
            background: 'rgba(14, 16, 26, 0.65)',
            border: '1px solid rgba(226, 232, 240, 0.12)'
          }}>
            <ShieldCheck size={32} color="#94a3b8" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.25rem', marginBottom: '0.75rem', color: '#f8fafc' }}>
              RAG Corporativo & Segurança
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Bases de conhecimento estruturadas com proteção de dados, controle estrito de permissões e governança de LLMs.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};
