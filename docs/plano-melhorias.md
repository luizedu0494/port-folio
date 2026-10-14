# Plano de Melhorias em Camadas — Portfólio Luiz Eduardo Lopes (M-4)

> **Intervenção Atual (2026-10-14):** M10 — Adicionar efeito, mídia ou feature de referência (Showcase / Landing Page de Demonstração para Clientes: High-End Tech Studio & Agentes de IA).  
> **Aprovador:** Luiz Eduardo Lopes.  
> **Estratégia:** Criar página/rota dedicada com efeitos inspirados em *aino.agency* (ASCII canvas, física de caracteres, scramble e microinterações de alto impacto), mantendo a Home principal 100% íntegra e protegida.

---

## PLANO M10 EM 4 CAMADAS (Execução Passo a Passo)

### Camada 1: Arquitetura, Roteamento SPA Seguro & Ponto de Entrada
- **Objetivo:** Estabelecer o mecanismo de renderização da demonstração de forma isolada e adicionar ponto de acesso na Home.
- **Itens:**
  1. Suporte a rota/visualização de demonstração em `src/App.tsx` (detectando hash/path `#demo` ou query `?page=demo` e estado interno reativo sem inflar o bundle com roteadores pesados).
  2. Ponto de entrada elegante na Home: Badge/botão interativo no Navbar ("Demo: AI Studio") e botão de acesso direto no Hero ("Ver Landing Page Exemplo").
  3. Botão flutuante de navegação rápida ("← Voltar ao Portfólio") presente na demonstração para alternância instantânea.
- **Impacto:** Alto (acesso direto e intuitivo para o cliente, com isolamento de escopo).
- **Esforço:** Baixo.
- **Risco:** Baixo (a Home permanece intacta por padrão).
- **Como reverter:** `git checkout HEAD~1 -- src/App.tsx`
- **Arquivos afetados:** `src/App.tsx`, `src/index.css`.
- **Métrica de sucesso:** Navegação suave entre o Portfólio e a Demo sem recarregar a página e sem quebrar nenhum link existente.

---

### Camada 2: Estrutura, Conteúdo Comercial & Estética High-End Studio
- **Objetivo:** Construir a landing page comercial completa para o estúdio de tecnologia e agentes de IA.
- **Itens:**
  1. Criação do módulo `src/pages/DemoStudioLanding.tsx` com estrutura editorial de alto nível:
     - **Navbar do Estúdio:** Marca "NEXUS // AI TECH STUDIO", status "Q4 Available for Projects", links internos e botão de retorno.
     - **Hero Comercial:** Headline autoral e impactante ("Engenharia de Software de Precisão e Agentes Autônomos de IA para Operações de Alta Complexidade"), métricas tangíveis em tempo real (ex: "85% redução de latência operacional", "99.9% uptime de agentes", "2-4 semanas para MVP funcional").
     - **Soluções & Agentes em Ação:** 3 pilares tangíveis com chips de tecnologia:
       - *Agentes de Triagem & Decisão Autônoma* (análise preditiva de fluxos de trabalho)
       - *Plataformas Fullstack Sob Medida* (Next/React + Cloud resiliente)
       - *RAG Enterprise & Governança de LLMs* (segurança de dados corporativos)
     - **Metodologia de Entrega Ágil:** Fases transparentes (Discovery → Arquitetura → Agentes → Deploy).
     - **Seção de Conversão / Diagnóstico:** CTA comercial para WhatsApp e agendamento de diagnóstico técnico.
- **Impacto:** Máximo (mostra aos clientes exatamente o valor e a sofisticação da entrega).
- **Esforço:** Médio.
- **Risco:** Baixo.
- **Como reverter:** `git checkout HEAD~1 -- src/pages/DemoStudioLanding.tsx src/pages/DemoStudioLanding.css`
- **Arquivos afetados:** `src/pages/DemoStudioLanding.tsx`, `src/pages/DemoStudioLanding.css`.
- **Métrica de sucesso:** Conteúdo 100% específico sem clichês de IA (atende ao P-13); zero vazamento de CSS na Home.

---

### Camada 3: Efeitos Visuais de Referência (ASCII Canvas, Física de Texto & Scramble)
- **Objetivo:** Incorporar os efeitos interativos inspirados no estudo da *aino.agency* e microinterações de impacto.
- **Itens:**
  1. **ASCII Hero Banner:** Canvas interativo que renderiza a malha tipográfica da demo e reage com física elástica ao ponteiro do mouse, pausando em aba inativa.
  2. **Scramble Text Reveal:** Títulos e chamadas da demo com efeito de decodificação cibernética de alta performance ao entrar no viewport via `IntersectionObserver`.
  3. **Hover Static & Microinterações:** Efeito de estática sutil nos botões de CTA e chips de tecnologia da demo.
  4. **Alternador de Modo Visual:** Permite ao cliente alternar entre o modo estúdio tradicional e o modo ASCII interativo (demonstrando domínio técnico completo).
- **Impacto:** Muito Alto (o diferencial estético de nível internacional que encanta clientes).
- **Esforço:** Médio.
- **Risco:** Médio (controlado com limites de FPS, Canvas 2D nativo e suporte a `prefers-reduced-motion`).
- **Como reverter:** `git checkout HEAD~1 -- src/components/demo/ src/pages/DemoStudioLanding.tsx`
- **Arquivos afetados:** `src/pages/DemoStudioLanding.tsx`, `src/ascii/`, componentes de efeito da demo.
- **Métrica de sucesso:** 60 FPS estáveis; transições suaves; tempo de carregamento instantâneo.

---

### Camada 4: Responsividade Mobile, Acabamento Fino & Gate Anti-IA
- **Objetivo:** Garantir toque perfeito em smartphones, harmonia de contraste e aprovação final.
- **Itens:**
  1. Revisão e ajuste fino de layout em breakpoints móveis (375px a 768px).
  2. Garantir alinhamento milimétrico, áreas de clique confortáveis (>44px) e legibilidade.
  3. Validação estática de ponta a ponta (`npm run typecheck`, `npm run lint`, `npm run build`).
  4. Execução do Gate Anti-Cara-de-IA (`P-13`, Momento: Final da Intervenção M10).
- **Impacto:** Alto.
- **Esforço:** Baixo a Médio.
- **Risco:** Mínimo.
- **Métrica de sucesso:** `npm run build` passa com 0 erros; veredito do P-13: "PASSA".

---

## Camada 1: Qualidade Técnica, Correção de Hooks & Estabilidade
- **Foco:** Eliminar erros do React 19, destravar re-renders em cascata e garantir estabilidade da thread principal.
- **Itens:**
  1. Corrigir chamadas de `setState` síncronas dentro de `useEffect` em `src/components/AsciiTitle.tsx` e `src/components/TypewriterText.tsx`.
  2. Corrigir mutação indevida de ref durante render em `src/components/FlipCard.tsx` (`shownRef.current = shown`).
  3. Limpar variáveis não utilizadas e blocos vazios apontados pelo ESLint.
  4. Adicionar listener de visibilidade (`document.visibilityState`) no `NeuralNetworkBg.tsx` para pausar o loop do canvas quando a aba estiver inativa.
- **Impacto:** Alto (fluidez da digitação e intro, eliminação de warnings no console, economia de CPU/bateria).
- **Esforço:** Baixo.
- **Risco:** Mínimo.
- **Como reverter:** `git checkout HEAD~1 -- src/components/`
- **Arquivos afetados:** `src/components/AsciiTitle.tsx`, `src/components/TypewriterText.tsx`, `src/components/FlipCard.tsx`, `src/components/NeuralNetworkBg.tsx`, `src/App.tsx`.
- **Métrica de sucesso:** `npm run lint` com 0 erros; 60 FPS sem congelamentos na intro e typewriter.

---

## Camada 2: Acabamento Visual, Tokens & Microcopy (M-5)
- **Foco:** Consistência estética, rampa tipográfica e contraste.
- **Itens:**
  1. Padronizar tokens de cor em `src/index.css` (reconciliar nomes dos tokens platinados e remover resíduos históricos).
  2. Ajustar contraste de chips e metadados (`--text-muted`) para conformidade com WCAG AA.
  3. Ajustar a microcopy de apresentação do rodapé em `src/sections/Contact.tsx` para refletir o posicionamento de Engenharia de Software e Soluções com Agentes de IA.
  4. Poda de pesos tipográficos sem uso no `index.html`.
- **Impacto:** Médio.
- **Esforço:** Baixo.
- **Risco:** Baixo.
- **Como reverter:** `git checkout HEAD~1 -- src/index.css src/sections/Contact.tsx index.html`
- **Arquivos afetados:** `src/index.css`, `src/sections/Contact.tsx`, `index.html`.
- **Métrica de sucesso:** Contraste aprovado; sem classes com tipografia inline desajustada.

---

## Camada 3: Estrutura, Disposição & Nova Seção de Processo (M-6)
- **Foco:** Disposição dos itens, ritmo de navegação e quebra do padrão repetitivo de template (P-13).
- **Itens:**
  1. **Nova Seção: Processo de Trabalho (`src/sections/Process.tsx`):**
     - Estruturar em 4 etapas visuais com estética editorial e de IA:
       - *01. Diagnóstico & Arquitetura de Solução*
       - *02. Engenharia de Prompts, RAG & Agentes Autônomos*
       - *03. Desenvolvimento Fullstack & Integração Reativa*
       - *04. Observabilidade, Métricas & Deploy de Produção*
  2. **Redesenho da Seção de Habilidades (`src/sections/Skills.tsx`):**
     - Substituir o Flip Card 3D repetitivo por uma **Matriz Técnica de Especialidades** (cards modulares com badges limpos, indicadores visuais de proficiência e casos de aplicação direta), acabando com a fadiga de interação.
  3. **Unificação & Destaque dos Projetos (`src/sections/Projects.tsx`):**
     - Consolidar a seção de projetos dando máxima hierarquia visual ao **CronoLab 2.0** como case de destaque absoluto e integrando a grade com filtros limpos e responsivos.
  4. **Atualização do Menu de Navegação:**
     - Inserir link suave para `#processo` no Navbar e no auto-hide observador.
- **Impacto:** Máximo (atende diretamente aos 3 objetivos principais solicitados pelo usuário).
- **Esforço:** Médio.
- **Risco:** Médio (reorganização de layout e inclusão de novo componente).
- **Como reverter:** `git checkout HEAD~1 -- src/sections/ src/App.tsx`
- **Arquivos afetados:** `src/sections/Process.tsx` (novo), `src/sections/Skills.tsx`, `src/sections/Projects.tsx`, `src/App.tsx`, `src/index.css`.
- **Métrica de sucesso:** Gate anti-cara-de-IA (`P-13`) recebe veredito **"PASSA"**; nova seção perfeitamente integrada no desktop e mobile.

---

## Camada 4: Lapidação de Efeitos & Controles de Experiência
- **Foco:** Melhor uso dos efeitos visuais e acessibilidade.
- **Itens:**
  1. Adicionar toggle sutil de controle de efeitos no Navbar (permitindo alternar modo full efeitos / modo sóbrio/foco).
  2. Calibrar densidade de partículas e suavidade da rede neural em telas de alta resolução.
  3. Otimizar as transições do `CosmicCometCursor` para não sobrecarregar ponteiros rápidos.
- **Impacto:** Alto na percepção de produto refinado.
- **Esforço:** Baixo a Médio.
- **Risco:** Baixo.
- **Como reverter:** `git checkout HEAD~1 -- src/components/`
- **Arquivos afetados:** `src/components/NeuralNetworkBg.tsx`, `src/components/CosmicCometCursor.tsx`, `src/App.tsx`.
- **Métrica de sucesso:** Efeitos funcionando a 60 FPS fluidos com controle fácil pelo usuário.

---

## Itens Adiados / Recusados para Esta Fase
- **Adiado para backlog futuro:** Internacionalização completa para Inglês (i18n) — mantido no backlog conforme alinhado no briefing.
- **Recusado:** Instalação de TailwindCSS ou Three.js — recusado por violar a matriz de incompatibilidades (seção 8 do mapa) e comprometer o design system autoral.
