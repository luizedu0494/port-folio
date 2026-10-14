# Projeto: Portfólio Profissional — Luiz Eduardo (IA & Software)

## Contexto
- **O que é o projeto [inferido]:** Portfólio web de engenharia de software e agentes de IA de Luiz Eduardo Lopes, focado em demonstrar competências técnicas, casos reais (CronoLab 2.0, chatbots, automações) e experiência visual diferenciada com foco em recrutadores e clientes técnicos [README.md:L1-L4].
- **Stack:** React 19.3.0, TypeScript 6.0.3, Vite 6.2.0, Vanilla CSS modular com tokens em `:root`, Framer Motion (`motion` 13.4.6), Lucide React (1.44.0), Vercel Analytics (`@vercel/analytics` 2.0.1) [package.json:L23-L45].
- **Estado:** Em produção na Vercel ([https://luizedu0494.vercel.app](https://luizedu0494.vercel.app/)), com Showcase Comercial / Landing Page de Exemplo (`DemoStudioLanding.tsx`, `#demo`) na branch `melhoria/m10-demo-showcase-landing-page`.
- **Comandos:**
  - Rodar: `npm run dev` (porta 5173)
  - Buildar: `npm run build` (`tsc && vite build`)
  - Testar / Lint: `npm run lint` e `npm run typecheck`
  - Formatar: `npm run format`
  - Preview: `npm run preview`

## O que NÃO pode mudar [confirmar com Luiz Eduardo]
1. **Conceito do Background Animado:** A malha de rede neural interativa em Canvas 2D deve permanecer (permitido otimizar renderização e performance, proibido remover) [confirmar].
2. **Conceito da Introdução (Intro):** A intro editorial/ASCII tecnológica deve ser preservada em sua essência conceitual (permitido aprimorar visual e performance) [confirmar].
3. **Identidade Visual Nuclear:** Paleta *Pearl Platinum & Onyx Dark* (`#05060c`, `#0a0c12`, `#f1f5f9`, `#cbd5e1`, `#94a3b8`) [confirmar].
4. **URLs & SEO:** URL canônica `https://luizedu0494.vercel.app/`, metadados Open Graph e seções âncora [confirmar].
5. **Dados de Contato & Credenciais:** Links para GitHub (`luizedu0494`), LinkedIn, e-mails e projetos reais [confirmar].

## Convenções observadas
- **Nomenclatura & Pastas:** `src/components/` para blocos reutilizáveis, `src/components/demo/` para componentes de física de partículas da vitrine, `src/pages/` para páginas SPA isoladas (ex: `DemoStudioLanding.tsx`), `src/sections/` para seções da Home, `src/data/` para dados estáticos tipados, `src/context/` para gerenciamento de áudio global via React Context.
- **Estilo de Código:** TypeScript estrito com tipagem explícita em `src/types/`, ESLint e Prettier com padrão sem ponto-e-vírgula forçado / aspas simples.
- **Estilização:** Vanilla CSS puro com tokens globais em `:root` em `src/index.css` e CSS modular isolado por página (ex: `src/pages/DemoStudioLanding.css`). Não usar Tailwind nem bibliotecas utilitárias externas; as convenções em CSS do projeto vencem qualquer skill nova.

## Precedência
1. Restrições do cliente e o que **não pode mudar**
2. Pedido atual e objetivo da melhoria
3. `DESIGN.md` e convenções existentes do projeto (Vanilla CSS + tokens)
4. Skill mestre de curadoria
5. Skills de revisão (Jakub, Impeccable)
6. Qualidade (a11y, performance, SEO, segurança) **vencem a estética**
7. Economia

## Regras Obrigatórias
- **Nada de publicar sem aprovação explícita:** Não realizar deploy para produção na branch `main` sem ok final.
- **Uma camada por vez, com aprovação:** Commits pequenos e reversíveis na branch `melhoria/m10-demo-showcase-landing-page`.
- **Gate anti-cara-de-IA obrigatório (`P-13`):** Rodar no diagnóstico, após cada camada que toque em visual/conteúdo e na verificação final. Veredito "não passa" bloqueia entrega.
- **Referências em vídeo (`P-14`):** Sempre que houver referência visual/interativa, apresentar a opção de usar vídeo via skill `watch` (`claude-video`).
- **Ajustes visuais na rota (`P-15`):** Pedidos visuais devem ser classificados, agrupados em lote, registrados em `docs/ajustes.md` sem sair da camada atual.
- **Escolhas exatas antes de mexer (`P-16`):** Tipografia, disposição e componentes seguem estritamente `docs/escolhas.md`.
- **Segurança de segredos:** Nenhum token, chave de API ou credencial deve ser versionado no Git.
