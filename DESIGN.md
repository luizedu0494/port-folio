# Design System — Portfólio Luiz Eduardo Lopes

> Extraído do código em 2026-10-03; valores OBSERVADOS, não decisões.

---

## 1. Cores e Tokens Observados (`src/index.css`)

### Superfícies & Fundos
- `--bg-primary`: `#05060c` (Preto ônix profundo de fundo) [`src/index.css:L6`]
- `--bg-secondary`: `rgba(10, 12, 18, 0.45)` (Fundo translúcido para camadas de contraste) [`src/index.css:L7`]
- `--bg-card`: `rgba(14, 16, 26, 0.52)` (Fundo padrão de cartões com vidro/glassmorphism) [`src/index.css:L8`]
- `--bg-card-hover`: `rgba(22, 26, 40, 0.72)` (Destaque ao passar o mouse) [`src/index.css:L9`]
- `--bg-card-featured`: `linear-gradient(135deg, rgba(226, 232, 240, 0.08) 0%, rgba(14, 16, 26, 0.58) 100%)` [`src/index.css:L10`]

### Destaques & Acentos (Pearl Platinum)
- `--accent-platinum`: `#f1f5f9` (Tom platina luminoso principal) [`src/index.css:L13`]
- `--accent-crimson`: `#f1f5f9` (Mantido por compatibilidade legada) [`src/index.css:L14`]
- `--accent-glow`: `rgba(226, 232, 240, 0.22)` (Brilho perolizado suave) [`src/index.css:L15`]
- `--accent-soft`: `#cbd5e1` (Platina intermediário acetinado) [`src/index.css:L16`]
- `--accent-dark`: `#334155` (Borda escura de apoio) [`src/index.css:L17`]
- `--accent-magenta`: `#e2e8f0` [`src/index.css:L18`]

### Tipografia & Textos (WCAG AA)
- `--text-primary`: `#f8fafc` (Branco gelo perolizado de alto contraste) [`src/index.css:L21`]
- `--text-secondary`: `#cbd5e1` (Cinza claro para subtítulos e descrições) [`src/index.css:L22`]
- `--text-muted`: `#a7b8cc` (Cinza suave com contraste elevado > 4.6:1 WCAG AA) [`src/index.css:L23`]

### Bordas
- `--border-color`: `rgba(226, 232, 240, 0.12)` (Borda vítrea ultra fina) [`src/index.css:L26`]
- `--border-platinum`: `rgba(226, 232, 240, 0.3)` (Borda platina vítrea) [`src/index.css:L27`]
- `--border-crimson`: `rgba(226, 232, 240, 0.3)` (Mantida por compatibilidade) [`src/index.css:L28`]

---

## 2. Tipografia Observada

- **Títulos Tech / Display:** `'Orbitron', sans-serif` (pesos 600, 700, 800, 900) [`src/index.css:L25`, `index.html:L14`]
- **Subtítulos & Seções:** `'Space Grotesk', 'Outfit', sans-serif` (pesos 500, 600, 700) [`src/index.css:L26`]
- **Corpo & Parágrafos:** `'Plus Jakarta Sans', system-ui, sans-serif` (pesos 300 a 800) [`src/index.css:L27`]
- **Código & Terminal:** `'JetBrains Mono', monospace` [`index.html:L14`]
- **Display Editorial (Intro):** `'Anton', sans-serif` [`index.html:L14`]

---

## 3. Raios, Espaçamento & Transições

- **Raios de Borda:**
  - `--radius-sm`: `8px`
  - `--radius-md`: `14px`
  - `--radius-lg`: `24px`
  - `--radius-pill`: `9999px`
- **Transições:**
  - `--transition-fast`: `0.2s cubic-bezier(0.4, 0, 0.2, 1)`
  - `--transition-normal`: `0.35s cubic-bezier(0.4, 0, 0.2, 1)`
- **Breakpoints observados no CSS:**
  - Telas móveis compactas: `@media (max-width: 480px)`
  - Tablets e mobile: `@media (max-width: 768px)`
  - Desktops intermediários: `@media (max-width: 1024px)` e `1200px`

---

## 4. Componentes Recorrentes

1. **Flip Cards 3D:** Cards de projetos e habilidades com rotação no eixo Y ao interagir (`.flip-card-inner`, `.flip-card-front`, `.flip-card-back`), com bloqueio de flip ao clicar em links/ações.
2. **Navbar Flutuante Inteligente:** Barra vítrea com auto-hide no scroll down e reaparecimento no scroll up via `requestAnimationFrame`, contendo mini-player de áudio integrado.
3. **Player de Áudio Dev Focus:** Reprodução lofi/ambient via `AudioContext` com scrubber, controle de volume suave e persistência em `localStorage`.
4. **Lightbox Modal:** Visualizador em tela cheia para screenshots e mídias de projetos sem cortes (`object-fit: contain`).
5. **Botões com Movimento Fluido:** Botões com gradiente animado contínuo (`btnGradientFlow`) e efeito de respiração metálica perolizada.

---

## 5. Movimento & Efeitos Ativos

- **Canvas 2D Neural Network:** Fundo com partículas conectadas por linhas de proximidade, reagindo à posição do ponteiro do mouse com limite de FPS e respeito a `prefers-reduced-motion`.
- **Intro ASCII / Vetorial:** Animação de entrada com redemoinho de caracteres e morfologia visual.
- **Typewriter & Scramble:** Efeitos de digitação e revelação de texto com decodificação cibernética.
- **Cursor Cósmico:** Rastro sutil de cometa (`CosmicCometCursor`) seguindo o ponteiro em telas desktop.

---

## 6. Tom Visual Observado [inferido]
- **Estética:** *Cyber-Editorial Dark High-Tech* — mistura de minimalismo perolizado, estética de agentes autônomos de IA e acabamento refinado de estúdio de design moderno.

---

## 7. Inconsistências Observadas [inferido a partir do código]
1. **Nomenclatura residual de tokens:** Variáveis como `--accent-crimson` foram repintadas para tons platinados (`#f1f5f9`), mas mantiveram o nome histórico de "crimson" no CSS.
2. **Escala de títulos ad-hoc:** Existem múltiplos `font-size` dispersos nas classes com valores como `1.75rem`, `2rem`, `2.25rem`, `2.5rem`, `clamp(...)` sem uma rampa tipográfica fixa definida por tokens.
3. **Tamanho do arquivo CSS:** `src/index.css` acumula mais de 4500 linhas em arquivo único com estilos de todas as seções agrupados, o que dificulta manutenções pontuais.
