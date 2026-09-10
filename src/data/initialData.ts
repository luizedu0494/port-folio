import { DeveloperProfile, Project } from '../types/portfolio';

export const initialProfile: DeveloperProfile = {
  name: 'Luiz Eduardo',
  headline: 'Auxiliar Técnico em transição para Desenvolvedor de Software e Engenharia de IA',
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
    summary: 'Profissional com sólida bagagem como Auxiliar Técnico, em transição ativa de carreira para o desenvolvimento de software com foco em Engenharia de IA e Agentes Inteligentes.',
    paragraphs: [
      'Minha trajetória no suporte e auxílio técnico me deu uma visão prática aguçada sobre resolução de problemas reais, diagnóstico de falhas e usabilidade de sistemas. Essa experiência fundamenta minha atuação no desenvolvimento de software.',
      'Hoje dedico minha evolução à criação de soluções com Inteligência Artificial Generativa, integração de LLMs (LangChain, Groq API, OpenAI), arquiteturas Web modernas com React 19 / TypeScript e bancos de dados orientados a evento como Supabase (PostgreSQL).'
    ],
    highlights: [
      'Transição focada em Engenharia de IA & Desenvolvimento Fullstack',
      'Experiência prática em resolução de problemas e suporte técnico',
      'Construção de ecossistemas com LLMs (LangChain, Groq API, OpenAI)',
      'Aplicações Web com React 19, TypeScript e Supabase'
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
    imageUrl: '', // Cole a URL ou caminho da sua imagem aqui
    description: 'Sistema completo de gestão de cronogramas acadêmicos com suporte de IA inteligente para identificação e resolução de conflitos de horário, notificações em tempo real e modo visitante dinâmico.',
    stack: ['React 19', 'TypeScript', 'Vite 7', 'Material-UI v7', 'Supabase PostgreSQL', 'LangChain.js', 'Groq API (llama-3.3-70b)'],
    highlights: [
      'Notificações de atualizações em tempo real via Supabase Realtime',
      'Modo visitante com controle de acesso dinâmico por perfil',
      'Assistente de IA para diagnóstico e sugestão de ajustes em conflitos de agenda',
      'Painel mobile totalmente responsivo com alta usabilidade'
    ]
  },
  {
    id: 'decifrai',
    name: 'DecifrAI',
    repo: 'DecifrAI',
    language: 'TypeScript / Python',
    featured: false,
    demoUrl: 'https://github.com/luizedu0494/DecifrAI',
    imageUrl: '', // Cole a URL ou caminho da sua imagem aqui
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
    imageUrl: '', // Cole a URL ou caminho da sua imagem aqui
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
    imageUrl: '', // Cole a URL ou caminho da sua imagem aqui
    description: 'Assistente virtual inteligente (Ana) desenvolvida para atendimento técnico humanizado e automação de chamados de suporte da Stech.',
    stack: ['TypeScript', 'Python', 'LLM API', 'React'],
    highlights: [
      'Atendimento conversacional humanizado e rápido',
      'Respostas baseadas em conhecimento técnico'
    ]
  }
];
