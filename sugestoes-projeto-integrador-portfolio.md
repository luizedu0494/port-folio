# Programa de Sugestões — Plataforma de Gerenciamento de Portfólio
### Projeto Integrador | Baseado no Cenário 4 (Crimson Night)

> Aplicação web responsiva para gerenciar, exibir, monitorar e compartilhar portfólios profissionais de desenvolvedores — desenhada aqui com dados reais do perfil GitHub de **Luiz Eduardo (luizedu0494)**.

---

## 1. Perfil do Desenvolvedor (dado real usado como base)

| Campo | Valor extraído do GitHub |
|---|---|
| Nome | Luiz Eduardo |
| Headline | Auxiliar Técnico em transição para Desenvolvedor de Software e Engenharia de IA |
| Cargo-alvo | Desenvolvedor de Agentes & Inteligência Artificial |
| Localização | Maceió, Alagoas |
| Stack principal | React 19, JavaScript/TypeScript, Python, Supabase (PostgreSQL), LangChain, Groq API, OpenAI, Material-UI, Vite |
| Repositórios públicos | 15 |
| Contato | LinkedIn `in/luiz-eduardo-052385291`, e-mail, WhatsApp |

Esse é exatamente o tipo de perfil que a plataforma precisa suportar bem: alguém **em transição de carreira**, com um projeto forte carregando o portfólio e vários outros em estágios diferentes de maturidade. O design (fundo escuro + vermelho vivo do Cenário 4) reforça a ideia de "impacto e energia" — adequado a esse storytelling de virada de carreira.

---

## 2. Projetos reais mapeados para o portfólio

Estes são os repositórios reais encontrados no perfil, organizados como entrariam nos **cards de projeto** da plataforma:

| Projeto | Linguagem | Status sugerido | Destaque |
|---|---|---|---|
| **CronoLab 2.0** (`cronograma-lab-frontend`) | JavaScript / React 19 | ⭐ Projeto principal (featured) | Sistema de gestão de cronogramas acadêmicos com IA (LangChain.js + Groq `llama-3.3-70b-versatile`), notificações em tempo real via Supabase Realtime, modo visitante, painel mobile responsivo |
| **meu-app-final** | Python | Em portfólio | Aplicação Python — espaço para descrição detalhada do problema resolvido |
| **cronograma-lab-final** | JavaScript | Versão anterior / histórico | Pode ser arquivado ou linkado como "evolução do CronoLab" |
| **cesmac-lab-manager** | Python | Em portfólio | Ligado ao domínio de gestão de laboratório (CESMAC) |
| **appagent** | Python | Em portfólio | Sugere foco em agentes de IA — alinhado ao objetivo de carreira |
| **trab** | Python | Revisar antes de publicar | Nome genérico — recomenda-se renomear/descrever antes de exibir publicamente |

**Observação de produto:** como o "CronoLab 2.0" tem demo ao vivo (`cronogramabd.vercel.app`) e documentação completa, ele deve ser o **projeto em destaque (hero project)** da página inicial do portfólio — com card maior, ícone dourado/vermelho de "case de sucesso" e métricas reais (ex: instituição atendida, funcionalidades entregues).

---

## 3. Aplicação do Cenário 4 — Crimson Night

| Elemento | Valor | Uso na plataforma |
|---|---|---|
| Fundo principal | `#050510` | Base de toda a interface (dark mode nativo) |
| Superfícies (cards) | `#1a1a2e` | Cards de projeto, navbar, modais |
| Cor primária (acento) | `#dc143c` | CTAs, links ativos, ícone de "projeto em destaque" |
| Cor de destaque suave | `#ff4d6d` | Hover states, badges secundárias |
| Texto principal | `#ffffff` | Corpo geral |
| Tipografia display | Panic (hero) / Retroica (subtítulos) | Nome do dev, título do case CronoLab |
| Tipografia corpo | Nexa | Descrições, tags, metadados |

Esse cenário foi escolhido no documento original para **"perfis criativos, devs de games, front-end com portfólio visual forte"** — mas também funciona muito bem para comunicar a narrativa de "virada de carreira com impacto", já que vermelho vivo sobre preto transmite energia e urgência positiva (movimento, ambição).

**Regra de uso de cor (herdada do guia):** no máximo 3 cores por composição — aqui: preto (`#050510`), vermelho (`#dc143c`) e branco (`#ffffff`), com `#ff4d6d` reservado só para hover/microinterações.

---

## 4. Funcionalidades da plataforma (requisitos sugeridos)

### 4.1 Gerenciamento de portfólio
- Cadastro/edição de projetos com: título, descrição, stack tecnológica (tags), status (`em desenvolvimento`, `concluído`, `case de sucesso`), link do repositório, link de demo ao vivo, imagem/banner
- Campo de **"projeto em destaque"** (featured), como o CronoLab 2.0
- Importação automática de metadados via URL do GitHub (linguagem, estrelas, última atualização) — reduz trabalho manual de cadastro

### 4.2 Exibição pública
- Página de perfil pública (`/luizedu0494` como no exemplo) com hero section: nome, headline, localização, stack principal
- Grade de projetos com filtro por tecnologia/tag (ex: filtrar só "Python" ou só "IA")
- Página individual de cada projeto com descrição longa, prints/GIFs, stack detalhada, links

### 4.3 Monitoramento
- Contador de visualizações por projeto e por perfil
- Dashboard privado com: projeto mais visitado, cliques em "ver repositório" vs "demo ao vivo", origem do tráfego (link direto, redes sociais, busca)
- Gráfico de evolução de visitas ao longo do tempo

### 4.4 Compartilhamento
- Link público único e customizável (ex: `portfolio.app/luizeduardo`)
- Botão de exportar portfólio como PDF/one-pager
- Cartão de compartilhamento para LinkedIn/WhatsApp com preview automático (Open Graph), reaproveitando os badges de contato que o dev já usa (LinkedIn, e-mail, WhatsApp)

### 4.5 Responsividade (herdado do guia original)
- Mobile: fonte display reduzida 30–40%, cards em coluna única
- Tablet: grade de projetos em 2 colunas
- Desktop: 3–4 colunas + sidebar de navegação fixa

---

## 5. Estrutura de dados sugerida (exemplo com dados reais)

```json
{
  "developer": {
    "name": "Luiz Eduardo",
    "headline": "Desenvolvedor de Agentes & Inteligência Artificial",
    "location": "Maceió, Alagoas",
    "stack": ["React 19", "Python", "Supabase", "LangChain", "Groq API"],
    "contacts": {
      "linkedin": "in/luiz-eduardo-052385291",
      "whatsapp": "5582999931035"
    }
  },
  "projects": [
    {
      "name": "CronoLab 2.0",
      "repo": "cronograma-lab-frontend",
      "language": "JavaScript",
      "featured": true,
      "demoUrl": "https://cronogramabd.vercel.app/",
      "stack": ["React 19", "Vite 7", "Material-UI v7", "Supabase PostgreSQL", "LangChain.js", "Groq API"],
      "highlights": [
        "Notificações em tempo real via Supabase Realtime",
        "Modo visitante com controle de acesso",
        "Assistente de IA para diagnóstico de conflitos de agenda"
      ]
    },
    {
      "name": "meu-app-final",
      "language": "Python",
      "featured": false
    },
    {
      "name": "cesmac-lab-manager",
      "language": "Python",
      "featured": false
    },
    {
      "name": "appagent",
      "language": "Python",
      "featured": false
    }
  ]
}
```

Essa estrutura pode alimentar diretamente os componentes de card e o dashboard de monitoramento propostos na seção 4.

---

## 6. Componentes visuais (mapeados ao Cenário 4)

| Componente | Especificação |
|---|---|
| Card do CronoLab 2.0 (featured) | Card maior, borda `#dc143c`, badge "Case de Sucesso" em Retroica |
| Cards de projetos Python (meu-app-final, appagent, etc.) | Card padrão, borda sutil `#1a1a2e`, tag de linguagem em pill |
| Navbar | Fundo `#050510` semitransparente com blur, nome em fonte display (Panic, uso pontual) |
| Botão "Ver repositório" | Secundário — borda `#dc143c`, fundo transparente |
| Botão "Ver demo ao vivo" | Primário — fundo `#dc143c` sólido, texto branco |
| Badge de contato (LinkedIn/E-mail/WhatsApp) | Pill pequena, ícone + texto Nexa, cor de fundo tintada |

---

## 7. Metas a alcançar

1. Definir schema final do banco de dados (Supabase, já dominado pelo dev, é uma escolha natural para o back-end da própria plataforma)
2. Prototipar a home pública usando o card featured do CronoLab 2.0 como referência de hierarquia visual
3. Implementar importação automática via GitHub API para reduzir cadastro manual de projetos como `trab` (que precisa de descrição antes de ir ao ar)
4. Validar dashboard de monitoramento com dados simulados antes de conectar analytics real
5. Publicar o repositório da plataforma no GitHub como novo projeto do portfólio (ex: `portfolio-manager`), com README completo — passando a integrar a própria lista de projetos exibidos na aplicação

---

*Documento gerado para o Projeto Integrador — Plataforma de Gerenciamento de Portfólio, com base no Cenário 4 (Crimson Night) do guia de design e em dados públicos do perfil GitHub github.com/luizedu0494.*
