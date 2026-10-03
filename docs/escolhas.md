# Ficha Atual de Escolhas — Portfólio Luiz Eduardo Lopes

> Extraído do código em 2026-10-03 pelo prompt M-A (adoção do playbook).  
> Cada item reflete o estado **observado**. Você decide nas próximas etapas se cada item será **mantido**, **ajustado** ou **trocado** (P-16).

---

## 1. Tipografia Observada

| Item | Valor Observado | Origem | Status |
|---|---|---|---|
| **Família Display / Títulos Tech** | `'Orbitron', sans-serif` | Google Fonts | [observado] |
| **Família Subtítulos & Seções** | `'Space Grotesk', 'Outfit', sans-serif` | Google Fonts | [observado] |
| **Família Corpo & Parágrafos** | `'Plus Jakarta Sans', system-ui, sans-serif` | Google Fonts | [observado] |
| **Família Código / Terminal** | `'JetBrains Mono', monospace` | Google Fonts | [observado] |
| **Família Editorial Intro** | `'Anton', sans-serif` | Google Fonts | [observado] |
| **Pesos Carregados** | 300, 400, 500, 600, 700, 800, 900 | `index.html` | [observado] |
| **Escala Tipográfica** | Múltiplos tamanhos em rem e clamp | `src/index.css` | [observado] |
| **Comprimento de Linha de Texto** | Máximo em torno de 65 a 80 caracteres em parágrafos de bio | `src/index.css` | [observado] |

---

## 2. Disposição & Layout Observado

| Item | Valor Observado | Detalhe | Status |
|---|---|---|---|
| **Largura Máxima do Container** | `1200px` a `1280px` (`.container`, `.section-container`) | Centralizado com auto-margin | [observado] |
| **Grid de Projetos** | Destaque principal full-width + grid de 2 a 3 colunas | `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))` | [observado] |
| **Grid de Habilidades** | 4 categorias em cards modulares com flip 3D | IA, Frontend, Backend/DB, Ferramentas | [observado] |
| **Alinhamento Padrão** | Seções centralizadas com títulos alinhados à esquerda/centro | Título com badge de numeração e subtítulo | [observado] |
| **Densidade & Ritmo Vertical** | Espaçamento de seções com `padding: 100px 0` | Respiro amplo estilo editorial | [observado] |
| **Comportamento Mobile** | Coluna única, menu gaveta/fullscreen, cards empilhados | Breakpoint em 768px | [observado] |

---

## 3. Tipos de Itens & Componentes de Interface

| Item | Implementação Observada | Efeito / Interação | Status |
|---|---|---|---|
| **Cards de Projeto** | Flip Card 3D (`.flip-card-inner`) | Foco no card principal (CronoLab 2.0) + miniaturas interativas com Lightbox | [observado] |
| **Cards de Habilidades** | Flip Card 3D agrupado por especialidade | Exibição de tecnologias e nível/descrição no verso | [observado] |
| **Botões de Ação** | Botão primário (`.btn-primary`) e secundário | Gradiente fluido em movimento contínuo (`btnGradientFlow`) | [observado] |
| **Navegação** | Navbar flutuante com blur glassmorphism | Auto-hide ao rolar para baixo, reaparece ao subir | [observado] |
| **Player de Áudio** | Mini-pill no navbar + Player expandido no About | AudioContext com sincronia em tempo real | [observado] |
| **Efeitos de Texto** | Typewriter (hero) + Scramble (sobre mim / títulos) | Decodificação dinâmica cibernética | [observado] |
| **Cursor** | Rastro de cometa com partículas | Ativo apenas em apontadores finos (desktop) | [observado] |

---

## 4. Referências de Bibliotecas

| Biblioteca | Versão | Uso | Status |
|---|---|---|---|
| **Motion** | `13.4.6` | Transições de elementos, modais e revelação | [observado] |
| **Lucide React** | `1.44.0` | Ícones de interface e redes sociais | [observado] |
| **Opentype.js** | `2.0.0` | Parser vetorial para renderização de caracteres | [observado] |
| **Vercel Analytics** | `2.0.1` | Métricas anônimas de uso | [observado] |
