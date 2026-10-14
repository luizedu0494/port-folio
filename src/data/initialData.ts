import { DeveloperProfile, Project } from '../types/portfolio';

export const initialProfile: DeveloperProfile = {
  name: 'Luiz Eduardo Lopes',
  headline: 'Desenvolvedor de Software · Agentes de IA · React 19 · TypeScript',
  targetRole: 'Desenvolvedor de Agentes & Inteligência Artificial',
  location: 'Maceió, Alagoas',
  mainStack: [
    'React 19',
    'TypeScript',
    'React Native',
    'Supabase (PostgreSQL)',
    'LangChain.js',
    'Groq API',
    'OpenAI'
  ],
  contacts: {
    linkedin: 'https://www.linkedin.com/in/luiz-eduardo-052385291/',
    github: 'https://github.com/luizedu0494',
    email: 'mailto:luizcurriculoct@gmail.com',
    institutionalEmail: 'mailto:luis.lopes@cesmac.edu.br',
    whatsapp: 'https://wa.me/5582999931035'
  },
  aboutMe: {
    summary:
      'Oi, sou o Luiz Eduardo (conhecido como luiz.edu).\nDesenvolvo landing pages de alta conversão e sistemas de IA — unindo design marcante, performance e foco total na experiência de quem usa.',
    paragraphs: [
      'Graduando em Análise e Desenvolvimento de Sistemas no CESMAC, acredito que a tecnologia mais sofisticada é a que desaparece para quem usa. O CronoLab 2.0 nasceu exatamente nessa lógica — de uma dor real do cotidiano acadêmico que virou produto funcional, sem nenhuma tela desnecessária no caminho.',
      'Cada decisão de código começa no comportamento real: métricas de uso, padrões de interação e feedbacks diretos guiam desde a arquitetura até o mínimo detalhe de UX. Lançar, observar e refinar — não especular.',
      'Também atuo com foco na criação de landing pages e páginas institucionais de alta conversão — combinando copywriting persuasivo, SEO técnico, micro-animações fluidas e design visual refinado para valorizar marcas, prender a atenção e maximizar resultados de vendas e captação.'
    ],
    highlights: [
      'Graduação em ADS — CESMAC EAD (Em andamento)',
      'Landing Pages de Alta Conversão, SEO Técnico & Copywriting',
      'Agentes Autônomos & Eliminação de Gargalos Operacionais',
      'Stack: React 19, TypeScript, Micro-animações, LLMs & Supabase'
    ]
  },
  skillCategories: [
    {
      title: 'Frontend & Landing Pages',
      skills: [
        { name: 'Landing Pages de Alta Conversão' },
        { name: 'React 19 / Vite' },
        { name: 'TypeScript & JavaScript' },
        { name: 'Micro-animações & CSS Avançado' },
        { name: 'SEO Técnico & Web Performance' },
        { name: 'UI/UX & Design Systems' }
      ]
    },
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
      title: 'Backend & Banco de Dados',
      skills: [
        { name: 'Python 3' },
        { name: 'Supabase & PostgreSQL' },
        { name: 'FastAPI / REST APIs' },
        { name: 'Supabase Realtime' }
      ]
    },
    {
      title: 'Estratégia & Ferramentas',
      skills: [
        { name: 'Copywriting Estratégico' },
        { name: 'Otimização de Conversão (CRO)' },
        { name: 'Git & GitHub' },
        { name: 'Deploy (Vercel / Netlify)' }
      ]
    }
  ],
  certifications: [
    {
      title: 'Análise e Desenvolvimento de Sistemas (Graduação Superior)',
      issuer: 'CESMAC EAD',
      issueDate: 'Em andamento',
      skills: ['Software Engineering', 'Systems Analysis', 'Web Development', 'AI']
    },
    {
      title: 'InsurMinds · Certificação da 1ª Fase',
      issuer: "I2A2 - Institut d'Intelligence Artificielle Appliquée",
      issueDate: 'Emitida em jul de 2026',
      credentialUrl: '/certificates/i2a2-insurminds-fase1.pdf',
      skills: ['LLM', 'RAG', 'Generative AI']
    },
    {
      title: 'Intelligent Agents with Generative AI Networks',
      issuer: "I2A2 - Institut d'Intelligence Artificielle Appliquée",
      issueDate: 'Emitida em dez de 2025',
      credentialUrl: '/certificates/i2a2-agentes-inteligentes.pdf',
      skills: ['Generative AI', 'Python', 'Prompt Engineering', 'RAG', 'Large Language Models (LLMs)']
    },
    {
      title: 'Academy Accreditation · Generative AI Fundamentals',
      issuer: 'Databricks',
      issueDate: 'Emitida em mar de 2025',
      credentialId: '136963095',
      credentialUrl: 'https://credentials.databricks.com/136963095',
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
      issueDate: 'Emitida em mar de 2025',
      credentialId: 'sxdf1omfhd',
      credentialUrl: 'https://learnprompting.org/certificates/sxdf1omfhd',
      skills: ['Prompt Engineering', 'ChatGPT']
    }
  ],
  currentlyLearning: [
    'Micro-animações Web & Interatividade Avançada',
    'Otimização de Conversão (CRO) & SEO Estratégico',
    'Arquiteturas Multi-Agentes (LangGraph / CrewAI)',
    'FastAPI para endpoints de IA em produção'
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
    imageUrl: '/assets/videos/visitante-poster.webp',
    videoUrl: '/assets/videos/visitante.mp4',
    posterUrl: '/assets/videos/visitante-poster.webp',
    description:
      'Plataforma web para gestão e alocação de laboratórios acadêmicos — com detecção automática de conflitos de horário, notificações em tempo real via Supabase Realtime e controle de acesso por perfil (visitante / administrador). Construído para substituir planilhas e e-mails no fluxo de reservas do CESMAC.',
    stack: ['React 19', 'TypeScript', 'Vite 7', 'Material-UI v7', 'Supabase PostgreSQL'],
    highlights: [
      'Plataforma especialista voltada para otimização e alocação de laboratórios acadêmicos e técnicos',
      'Suporte ao diagnóstico e mapeamento automático de conflitos em agendas de laboratórios',
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
    imageUrl: '/images/decifrai_preview.webp',
    description:
      'Jogo mobile em React Native onde uma IA conduz perguntas em português e tenta adivinhar a personalidade que você está pensando — jogadores de futebol, figuras públicas, personagens. Uma reimaginação do Akinator com LLMs como motor de raciocínio.',
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
    language: 'TypeScript / React',
    featured: false,
    demoUrl: 'https://github.com/luizedu0494/insurebot',
    imageUrl: '/images/insurebot_preview.webp',
    description:
      'Agente conversacional para o setor de seguros — automatiza triagem de clientes, consulta de apólices e geração de cotações sem intervenção humana. Integrado com LangChain.js e LLM API para respostas contextuais em linguagem natural.',
    stack: ['TypeScript', 'React', 'LangChain.js', 'IA Generativa', 'LLM API'],
    highlights: [
      'Fluxo de atendimento automatizado com IA',
      'Integração com bases de dados e apólices de seguros'
    ]
  },
  {
    id: 'stech-chatbot-ana',
    name: 'Stech Chatbot Ana',
    repo: 'stech-chatbot-ana',
    language: 'TypeScript / React',
    featured: false,
    demoUrl: 'https://github.com/luizedu0494/stech-chatbot-ana',
    imageUrl: '/images/stech_ana_preview.webp',
    description:
      'Ana é a assistente virtual da Stech: responde chamados de suporte técnico em linguagem natural, redireciona para o setor correto e reduz o tempo de espera do atendimento. Interface conversacional construída em React com base em LLM API.',
    stack: ['TypeScript', 'React', 'LLM API', 'Tailwind / CSS'],
    highlights: [
      'Atendimento conversacional humanizado e rápido para a Stech',
      'Respostas inteligentes baseadas em conhecimento técnico'
    ]
  }
];
