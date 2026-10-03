import React from 'react';
import { Cpu, Search, Bot, Code2, Rocket, ArrowRight } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import BorderGlow from '../components/BorderGlow';

interface ProcessStep {
  step: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  icon: React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Diagnóstico & Arquitetura',
    tagline: 'Mapeamento de regras e viabilidade técnica',
    description: 'Análise profunda do problema e definição da pilha tecnológica ideal. Planejamento de esquemas de banco, segurança de dados e dimensionamento de infraestrutura para evitar gargalos operacionais.',
    deliverables: ['Blueprint de Arquitetura', 'Seleção de Modelos / LLMs', 'Modelagem de Dados Supabase/PostgreSQL'],
    icon: Search
  },
  {
    step: '02',
    title: 'Engenharia de Prompts & Agentes',
    tagline: 'Orquestração autônoma e RAG inteligente',
    description: 'Desenvolvimento de agentes autônomos com raciocínio encadeado, memória contextual e integração vetorial. Calibração de prompts para eliminar alucinações e garantir respostas determinísticas.',
    deliverables: ['Chains LangChain & LangGraph', 'Recuperação Semântica (RAG)', 'Tool Calling & APIs de LLM'],
    icon: Bot
  },
  {
    step: '03',
    title: 'Engenharia Fullstack & UI Reativa',
    tagline: 'Interfaces de alto impacto e APIs robustas',
    description: 'Construção da camada de aplicação com React 19, TypeScript e Vite. Foco em interfaces ultra-responsivas, tipografia editorial, micro-interações fluidas e comunicação em tempo real.',
    deliverables: ['Frontend Reativo com Motion', 'Endpoints REST / FastAPI', 'Design System Acessível (WCAG AA)'],
    icon: Code2
  },
  {
    step: '04',
    title: 'Observabilidade & Deploy Contínuo',
    tagline: 'Segurança, monitoramento e performance global',
    description: 'Implementação de telemetria para controle de latência, taxa de acerto de prompts e consumo de tokens. Deploy em infraestrutura de borda global com auditoria contínua de performance.',
    deliverables: ['Deploy Automatizado na Vercel', 'Monitoramento com Vercel Analytics', 'Otimização Core Web Vitals'],
    icon: Rocket
  }
];

export const Process: React.FC = () => {
  return (
    <section id="processo" className="reveal-on-scroll section-padded">
      <div className="container">
        <SectionHeader
          icon={<Cpu color="var(--accent-soft)" size={28} />}
          title="Processo de Engenharia & IA"
          triggerId="processo"
        />

        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            maxWidth: '720px',
            marginBottom: '40px',
            lineHeight: 1.7
          }}
        >
          Um método estruturado em 4 etapas para transformar necessidades complexas em agentes inteligentes,
          interfaces velozes e sistemas de software escaláveis em produção.
        </p>

        <div className="process-grid">
          {PROCESS_STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <BorderGlow
                key={item.step}
                className="process-card"
                edgeSensitivity={30}
                glowColor="40 80 80"
                backgroundColor="#0d0e15"
                borderRadius={20}
                glowRadius={40}
                glowIntensity={1.0}
                coneSpread={25}
                animated={false}
                colors={['#c084fc', '#38bdf8', '#f472b6']}
              >
                <div className="process-card-content">
                  <div className="process-card-header">
                    <div className="process-step-badge">
                      <span className="process-step-number font-display">{item.step}</span>
                      <Icon size={20} color="var(--accent-soft)" />
                    </div>
                    <span className="process-step-tagline">{item.tagline}</span>
                  </div>

                  <h3 className="process-step-title font-subtitle">{item.title}</h3>
                  <p className="process-step-desc">{item.description}</p>

                  <div className="process-deliverables">
                    <span className="process-deliverables-label">Entregas-chave:</span>
                    <ul className="process-deliverables-list">
                      {item.deliverables.map((deliv, dIdx) => (
                        <li key={dIdx} className="process-deliverable-item">
                          <ArrowRight size={13} color="var(--accent-soft)" style={{ flexShrink: 0 }} />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </BorderGlow>
            );
          })}
        </div>
      </div>
    </section>
  );
};
