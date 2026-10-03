# Plano de Melhorias em Camadas — Portfólio Luiz Eduardo Lopes (M-4)

> Objetivo: Melhorar a disposição dos itens e seções, lapidar os efeitos visuais, incluir a seção de processo de trabalho e elevar o portfólio para a versão 2.0 completa e de alto impacto.

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
