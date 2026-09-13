import { DeveloperProfile, Project } from '../types/portfolio';

export const initialProfile: DeveloperProfile = {
  name: 'Luiz Eduardo Lopes',
  headline: 'Desenvolvedor de Software com foco em Engenharia de IA & Agentes Inteligentes',
  targetRole: 'Desenvolvedor de Agentes & Inteligência Artificial',
  location: 'Maceió, Alagoas',
  mainStack: ['React 19', 'TypeScript', 'Python', 'Supabase (PostgreSQL)', 'LangChain', 'Groq API', 'OpenAI'],
  contacts: {
    linkedin: 'https://www.linkedin.com/in/luiz-eduardo-052385291/',
    github: 'https://github.com/luizedu0494',
    email: 'mailto:luizeduardo@example.com',
    whatsapp: 'https://wa.me/5582999931035'
  },
  aboutMe: {
    summary: 'Desenvolvedor de Software especializado em Engenharia de IA, focado em simplificar processos e otimizar rotinas por meio de sistemas inteligentes centrados na experiência do usuário.',
    paragraphs: [
      'Trabalho no desenvolvimento de sistemas e agentes autônomos com foco em simplificar processos e otimizar a rotina de quem usa. Cursando Análise e Desenvolvimento de Sistemas (CESMAC EAD), acredito que a IA entrega valor real quando reduz fricções operacionais no dia a dia.',
      'Minha abordagem é guiada por feedback contínuo: métricas de uso, comportamento observado e retorno direto dos usuários orientam decisões de código e ajustes nos fluxos dos agentes — como no sistema CronoLab 2.0 de gestão e alocação de laboratórios, que apresento em destaque abaixo.',
      'Tecnicamente, atuo com React 19 / TypeScript no front-end, pipelines em Python, orquestração de LLMs (LangChain, Groq API, OpenAI) e bancos de dados como Supabase (PostgreSQL).'
    ],
    highlights: [
      'Graduação: Análise e Desenvolvimento de Sistemas (CESMAC EAD - Cursando)',
      'Foco em Agentes Autônomos & Redução de Fricções Operacionais',
      'Abordagem Guiada por Feedback Contínuo e Métricas de Uso',
      'Stack: React 19, TypeScript, Python, LLMs (LangChain) & Supabase'
    ]
  },
  skillCategories: [
    {
      title: 'Inteligência Artificial & Agentes',
      skills: [
        { name: 'LangChain & LangChain.js' },
        { name: 'LLM APIs (Groq, OpenAI)' },
        { name: 'Orquestração de Agentes' },
        { name: 'Prompt Engineering' }
      ]
    },
    {
      title: 'Desenvolvimento Frontend',
      skills: [
        { name: 'React 19 / Vite' },
        { name: 'TypeScript' },
        { name: 'JavaScript (ES6+)' },
        { name: 'HTML5 & CSS3 Avançado' },
        { name: 'Material-UI & Design Systems' }
      ]
    },
    {
      title: 'Backend & Banco de Dados',
      skills: [
        { name: 'Python 3' },
        { name: 'Supabase & PostgreSQL' },
        { name: 'FastAPI / REST APIs' },
        { name: 'Supabase Realtime' }
      ]
    },
    {
      title: 'Ferramentas & Metodologias',
      skills: [
        { name: 'Git & GitHub' },
        { name: 'Diagnóstico & Resolução de Problemas' },
        { name: 'Deploy (Vercel / Netlify)' },
        { name: 'Metodologias Ágeis' }
      ]
    }
  ],
  certifications: [
    {
      title: 'Análise e Desenvolvimento de Sistemas (Graduação Superior)',
      issuer: 'CESMAC EAD',
      issueDate: 'Em andamento (Cursando)',
      skills: ['Engenharia de Software', 'Análise de Sistemas', 'Desenvolvimento Web & IA']
    },
    {
      title: 'InsurMinds - Certificação da 1ª Fase',
      issuer: 'I2A2 - Institut d\'Intelligence Artificielle Appliquée',
      issueDate: 'Emitida em jul de 2026',
      skills: ['LLM', 'RAG', 'Generative AI']
    },
    {
      title: 'Intelligent Agents with Generative AI Networks',
      issuer: 'I2A2 - Institut d\'Intelligence Artificielle Appliquée',
      issueDate: 'Emitida em dez de 2025',
      skills: ['Generative AI', 'Python', 'Prompt Engineering', 'RAG', 'Large Language Models (LLMs)']
    },
    {
      title: 'Academy Accreditation - Generative AI Fundamentals',
      issuer: 'Databricks',
      issueDate: 'Emitida em mar de 2025 • Expira em mar de 2027',
      credentialId: '136963095',
      skills: ['Generative AI', 'LLMs']
    },
    {
      title: 'Introduction to Cybersecurity',
      issuer: 'Cisco',
      issueDate: 'Emitida em mar de 2025',
      skills: ['Cybersecurity', 'Network Security']
    },
    {
      title: 'ChatGPT for Everyone',
      issuer: 'Learn Prompting',
      issueDate: 'Emitida em mar de 2025 • Expirou em mar de 2026',
      credentialId: 'sxdf1omfhd',
      skills: ['Prompt Engineering', 'ChatGPT']
    }
  ]
};

export const initialProjects: Project[] = [
  {
    id: 'cronolab-2',
    name: 'CronoLab 2.0',
    repo: 'cronogramabd',
    language: 'TypeScript / React',
    featured: true,
    demoUrl: 'https://cronogramabd.vercel.app/',
    imageUrl: '/assets/gifs/visitante.gif',
    description: 'Sistema especialista voltado para a gestão de cronogramas e alocação dinâmica de laboratórios de ensino e pesquisa, contando com assistente de IA para suporte no diagnóstico de conflitos de horário, notificações em tempo real e modo visitante por perfil.',
    stack: ['React 19', 'TypeScript', 'Vite 7', 'Material-UI v7', 'Supabase PostgreSQL', 'LangChain.js', 'Groq API (llama-3.3-70b)'],
    highlights: [
      'Plataforma especialista voltada para otimização e alocação de laboratórios acadêmicos e técnicos',
      'Assistente de IA para suporte ao diagnóstico e mapeamento de conflitos em agendas de laboratórios',
      'Notificações de atualizações e reservas em tempo real via Supabase Realtime',
      'Painel mobile responsivo, com foco em usabilidade'
    ]
  },
  {
    id: 'decifrai',
    name: 'DecifrAI',
    repo: 'DecifrAI',
    language: 'TypeScript / React Native',
    featured: false,
    demoUrl: 'https://github.com/luizedu0494/DecifrAI',
    imageUrl: '/images/decifrai_preview.png',
    description: 'Jogo interativo mobile inspirado no conceito clássico do Akinator, porém reimaginado utilizando Inteligência Artificial e LLMs para conduzir as perguntas e adivinhar personalidades, jogadores e figuras públicas.',
    stack: ['React Native', 'TypeScript', 'Formik + Yup', 'IA Generativa', 'React Navigation'],
    highlights: [
      'Desenvolvimento mobile multiplataforma com React Native & TypeScript',
      'Gerenciamento e validação de formulários com Formik + Yup',
      'Navegação por telas com fluxo completo de autenticação e jogo',
      'Reinterpretação da mecânica do Akinator alimentada por IA'
    ]
  },
  {
    id: 'insurebot',
    name: 'InsureBot',
    repo: 'insurebot',
    language: 'Python',
    featured: false,
    demoUrl: 'https://github.com/luizedu0494/insurebot',
    imageUrl: '/images/insurebot_preview.png',
    description: 'Agente conversacional inteligente focado em suporte técnico, cotações e automação de fluxos de atendimento no setor de seguros.',
    stack: ['Python', 'LangChain', 'Agentes de IA', 'FastAPI'],
    highlights: [
      'Fluxo de atendimento automatizado com IA',
      'Integração com bases de dados de seguros'
    ]
  },
  {
    id: 'stech-chatbot-ana',
    name: 'Stech Chatbot Ana',
    repo: 'stech-chatbot-ana',
    language: 'TypeScript / Python',
    featured: false,
    demoUrl: 'https://github.com/luizedu0494/stech-chatbot-ana',
    imageUrl: '/images/stech_ana_preview.png',
    description: 'Assistente virtual inteligente (Ana) desenvolvida para atendimento técnico humanizado e automação de chamados de suporte da Stech.',
    stack: ['TypeScript', 'Python', 'LLM API', 'React'],
    highlights: [
      'Atendimento conversacional humanizado e rápido',
      'Respostas baseadas em conhecimento técnico'
    ]
  }
];
