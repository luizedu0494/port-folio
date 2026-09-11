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
    summary: 'Desenvolvedor de Software especializado em Engenharia de IA, com foco na otimização de processos e tarefas cotidianas através de sistemas inteligentes centrados na experiência do usuário.',
    paragraphs: [
      'Minha principal motivação na engenharia de software é conceber sistemas e agentes autônomos que simplifiquem, potenciem e elevem a rotina diária dos usuários. Acredito que a inteligência artificial só atinge seu propósito máximo quando alivia fricções operacionais e otimiza fluxos de trabalho no mundo concreto.',
      'Adoto uma filosofia de desenvolvimento fundamentada no aprendizado contínuo através do feedback direto das pessoas. Para mim, cada interação observada, métrica de uso ou sugestão construtiva é um insumo fundamental para lapidar o código, otimizar fluxos de agentes e entregar valor constante.',
      'Tecnicamente, aplico essa visão combinando arquiteturas Web modernas em React 19 / TypeScript, pipelines em Python, orquestração de LLMs (LangChain, Groq API, OpenAI) e bancos de dados de alta performance como Supabase (PostgreSQL).'
    ],
    highlights: [
      'Propósito: Agentes e Softwares para Impactar e Facilitar o Dia a Dia',
      'Evolução Contínua Baseada na Escuta e Feedback Ativo do Usuário',
      'Engenharia de IA & Orquestração de Agentes Autônomos (LangChain/LLMs)',
      'Construção de Aplicações Fullstack Modernas (React 19, Python & Supabase)'
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
    language: 'TypeScript / Python',
    featured: false,
    demoUrl: 'https://github.com/luizedu0494/DecifrAI',
    imageUrl: '',
    description: 'Aplicação de Inteligência Artificial voltada para decifrar, traduzir e explicar conteúdos técnicos complexos e documentos de forma simples e intuitiva.',
    stack: ['IA Generativa', 'Python', 'TypeScript', 'LLMs'],
    highlights: [
      'Análise inteligente e simplificação de texto com IA',
      'Interface moderna para exploração de termos e conceitos'
    ]
  },
  {
    id: 'insurebot',
    name: 'InsureBot',
    repo: 'insurebot',
    language: 'Python',
    featured: false,
    demoUrl: 'https://github.com/luizedu0494/insurebot',
    imageUrl: '',
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
    imageUrl: '',
    description: 'Assistente virtual inteligente (Ana) desenvolvida para atendimento técnico humanizado e automação de chamados de suporte da Stech.',
    stack: ['TypeScript', 'Python', 'LLM API', 'React'],
    highlights: [
      'Atendimento conversacional humanizado e rápido',
      'Respostas baseadas em conhecimento técnico'
    ]
  }
];
