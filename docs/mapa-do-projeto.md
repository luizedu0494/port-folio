# Mapa do Projeto — Portfólio Luiz Eduardo Lopes (M-1)

> Gerado em 2026-10-03 pelo prompt M-1 (Mapeamento Completo).

---

## 1. Árvore de Páginas & URLs

O projeto é estruturado como uma **Single-Page Application (SPA)** de alto desempenho no Vite:

- **URL Canônica:** `https://luizedu0494.vercel.app/` [`index.html:L32`]
- **Seções / Rotas Internas (Hash Navigation):**
  1. `#inicio` / Topo — Hero, apresentação, terminal/ASCII intro, redes e call to action [`src/App.tsx:L170-L245`]
  2. `#sobre` — Trajetória profissional, pilares de IA/Software, player de música Dev Focus [`src/sections/About.tsx`]
  3. `#projetos` — Vitrine de projetos com destaque para o **CronoLab 2.0** e grade de soluções secundárias [`src/sections/Projects.tsx`]
  4. `#habilidades` — Cards 3D com competências em IA & Agentes, Frontend, Backend e Ferramentas [`src/sections/Skills.tsx`]
  5. `#certificacoes` — Certificados e especializações técnicas com verificação de credenciais [`src/sections/Certifications.tsx`]
  6. `#contato` — Rodapé de contato direto via WhatsApp, LinkedIn, GitHub e E-mails [`src/sections/Contact.tsx`]

---

## 2. Stack & Dependências

- **Runtime & Build:** React 19.3.0, TypeScript 6.0.3, Vite 6.2.0 [`package.json:L23-L45`]
- **UI & Animação:** Framer Motion (`motion` 13.4.6), Lucide React (1.44.0), `opentype.js` (2.0.0)
- **Analytics:** `@vercel/analytics` (2.0.1)
- **Dependências sem uso aparente:** Nenhuma detectada. Todas as 5 dependências de produção e as ferramentas de build/lint têm uso direto no código.

---

## 3. Componentes, Estilos & Tokens

- **Onde estão os tokens:** Em `src/index.css:L3-L36` sob o bloco `:root`.
- **Arquitetura de Estilos:** Arquivo mestre `src/index.css` (4589 linhas) contendo resets, animações `@keyframes` (ex: `btnGradientFlow`, `borderPulse`), utilitários de grid e regras específicas por seção.
- **Componentes Centrais (`src/components/`):**
  - `NeuralNetworkBg.tsx`: Canvas 2D interativo com nós e vetores
  - `AsciiIntro.tsx` & `SvgAsciiWordmark.tsx`: Introdução conceitual com renderização ASCII/vetorial
  - `AudioPlayer.tsx`: Player com estado compartilhado via React Context (`src/context/AudioContext.tsx`)
  - `ImageLightbox.tsx`: Modal em tela cheia para screenshots
  - `TypewriterText.tsx` & `ScrambleText.tsx`: Efeitos de revelação e digitação
  - `CosmicCometCursor.tsx`: Rastro cósmico de partículas para mouse em desktop

---

## 4. Formulários & Destinos

- **Formulários de envio:** Não há formulários HTML (`<form>`) com envio para backend ou banco de dados.
- **Mecanismo de Contato:** Contato direto por links acionáveis com protocolos nativos (`https://wa.me/5582987178952`, `mailto:`, links do LinkedIn e GitHub).

---

## 5. Integrações Externas

- **WhatsApp API / Link direto:** `https://wa.me/5582987178952` com mensagem contextual de contato [`src/data/initialData.ts:L31`]
- **LinkedIn:** `https://www.linkedin.com/in/luiz-eduardo-052385291/`
- **GitHub:** `https://github.com/luizedu0494`
- **E-mails:** Gmail pessoal e Outlook institucional Cesmac
- **Hospedagem & CDN:** Vercel com roteamento em `vercel.json`

---

## 6. Rastreamento & Metadados

- **Analytics:** Vercel Analytics inicializado em `src/main.tsx` (`<Analytics />`)
- **SEO & Metadados:**
  - Open Graph e Twitter Card configurados em `index.html:L20-L32`
  - Metadados estruturados Schema.org (`Person` / `ProfilePage`) em `index.html:L35-L53`
  - Arquivo `public/robots.txt` apontando para `https://luizedu0494.vercel.app/sitemap.xml`
  - Arquivo `public/sitemap.xml` atualizado com prioridade 1.0

---

## 7. Edição de Conteúdo

- **Como é editado:** Diretamente no código fonte através do arquivo de dados tipado `src/data/initialData.ts` (contém perfil, lista de projetos, certificações e habilidades) e imagens em `public/`.
- **Por quem:** Exclusivamente por Luiz Eduardo.

---

## 8. Mídia & Assets Existentes

- **Áudios (`public/assets/audio/`):** 8 faixas MP3 de alta fidelidade (total ~12 MB, carregadas sob demanda apenas se o usuário ativar o player).
- **Imagens & Previews (`public/images/` & `public/assets/`):** Screenshots de projetos em WebP/PNG e `og-preview.png` (~250 KB).
- **Vetor / SVG:** Favicon e wordmark vetorial ultra leve (~1-7 KB).

---

## 9. Pontos Frágeis Observados

1. **Volume único de CSS (`src/index.css`):** O arquivo de estilo possui 4589 linhas com declarações duplicadas e regras aninhadas complexas, o que aumenta o risco de regressões em edições visuais rápidas.
2. **Dependência de requestAnimationFrame no Canvas:** O canvas da rede neural roda continuamente em telas grandes. Embora possua limite de FPS e `prefers-reduced-motion`, pode exigir CPU em dispositivos menos potentes.
3. **Ausência de Fallback para Links Quebrados de Demos:** Os links externos dos projetos apontam para repositórios e deploys da Vercel; caso algum deploy esteja temporariamente fora, não há indicação dinâmica de status.
