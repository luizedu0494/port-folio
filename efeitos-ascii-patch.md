# Patch dos efeitos ASCII / Scramble — o que foi feito

Base: `efeito-scramble-aino-agency.md` (relatório técnico do aino.agency) aplicado ao portfólio `luizedu0494/port-folio-v2`.

> **Como aplicar:** extraia o zip na **raiz do repositório** (onde ficam `package.json` e `src/`) e aceite substituir os arquivos. Depois rode `npm run typecheck` e `npm run dev`.

---

## 1. Resumo

| Área | Antes | Depois (relatório) |
|---|---|---|
| Redemoinho | Partículas em espiral polar | Grade de caracteres com faixa ativa por linha (senoides 3 s/4 s/8 s), fase seguindo o mouse, barra de `=` no topo, rótulo no cursor |
| Zoom / transição | Escala 1 → 3,4, sem vídeo | Escala 0,7 → **20** (curva t⁵), logo relido a cada frame, vídeo misturado nas letras |
| Áudio | Iniciava só no fim da animação | Inicia **no clique** (gesto do usuário) |
| Site durante a intro | Interativo por baixo | `inert` até a intro terminar |
| Navbar | Re-scramble "decrypt" no hover | Reveal com scramble ao aparecer + **estática** no hover |
| Hero | Efeito do rodapé | Reveal rápido com scramble, sem estática (título grande) |
| Rodapé | Chars aleatórios + aberração cromática | Logo em ASCII + **estática** (raio 2×1, 2 s) |
| Links/botões | Sem efeito | Estática global (seção 5.1) |
| Títulos de seção | Sem efeito | Reveal com scramble ao entrar na viewport (seção 5.2) |
| `TextScramble` | Usava `innerHTML` (`<`, `>`, `&` do alfabeto quebravam o HTML) | Monta nós de DOM, sem `innerHTML` |

---

## 2. Arquivos do zip

| Arquivo | Situação | Função |
|---|---|---|
| `src/ascii/logo.ts` | **novo** | Carrega o wordmark SVG; se falhar, desenha o texto "LUIZ EDUARDO" no canvas |
| `src/ascii/hoverStatic.ts` | **novo** | Estática global em `a`, `button`, `.hoverchar` |
| `src/ascii/TextScramble.ts` | substitui | Scramble sem `innerHTML`, opções `from/spread/length`, marca `data-scrambling` |
| `src/components/AsciiIntro.tsx` | substitui | Intro completa (onda → clique → morph → zoom → saída) |
| `src/components/HoverAsciiTitle.tsx` | substitui | Logo do rodapé em ASCII + estática |
| `src/components/ScrambleText.tsx` | substitui | Props novas: `onView`, `enabled`, `fast` |
| `src/components/SectionHeader.tsx` | substitui | Título com `<ScrambleText onView />` |
| `src/sections/Hero.tsx` | substitui | Recebe `ready`; título com reveal |
| `src/App.tsx` | substitui | Liga `initHoverStatic`, `onStart`, `inert`, classe `ready` |
| `docs/efeitos-ascii-patch.md` | novo | Este documento |

Não usados mais (podem ser apagados): `src/ascii/rasterize.ts`. Os arquivos `engine.ts` e `palette.ts` **continuam sendo usados e não foram alterados**.

---

## 3. Como cada efeito funciona

### 3.1 Intro (`AsciiIntro.tsx`)

Linha do tempo (ms desde o clique):

```
0        clique → partículas explodem e caem (gravidade)
200      logo rasterizado (alpha .25, escala .7); partículas migram até ele
1400     zoom: escala 0,7 → 20 em 2000 ms, curva t⁵; vídeo entra nas letras
3600     saída: tudo cai; +300 ms fade do overlay; +1500 ms onEnter()
```

**Onda (antes do clique)** — para cada linha `y` da grade:

```ts
const diamond = 1 - Math.pow(Math.abs(v), 1.4);           // formato de losango
const pulse = 0.55 + 0.45 * (
  0.4  * Math.sin(TAU * t / 3 + y * 0.33) +
  0.35 * Math.sin(TAU * t / 4 + y * 0.21) +
  0.25 * Math.sin(TAU * t / 8 + y * 0.13));               // 3 s, 4 s, 8 s + defasagem por linha
const half = cols * 0.42 * R * diamond * pulse;            // R = (t/3)² → nasce fechada e abre
// dentro da faixa:
const ph = mousePhase + y * 0.35 + (x - mid) * 0.22 - t * 0.9;   // fase ancorada no mouse
const d = (0.5 + 0.5 * Math.cos(ph)) * Math.min(1, edge * 2.2);  // densidade → caractere da paleta
```

`mousePhase` é suavizado com lerp (`+= (alvo - atual) * 0.05`).

**Logo → ASCII:** o logo é desenhado num canvas oculto (1 célula = 2×2 px) e a luminância média de cada célula vira um caractere de `DENSITY_PALETTE`. A escala não-uniforme `SS/cellW × SS/cellH` compensa a célula 0,6:1, então o logo não sai achatado.

**Atalhos:** `Esc` pula · `Enter`/`Espaço` entra · `#nointro` na URL e `prefers-reduced-motion` desligam a intro · segundo clique durante o morph vai direto para a saída.

**Props:**

```tsx
<AsciiIntro
  videoSrc="/assets/videos/tech-fear.mp4"   // opcional: vídeo misturado no zoom
  onStart={(withAudio) => { if (withAudio) startExperienceWithAudio(); }}  // NO clique
  onEnter={() => setEntered(true)}                                         // no fim
/>
```

**Constantes ajustáveis** (topo do arquivo): `LOGO_AT`, `ZOOM_START`, `ZOOM_MS`, `MAX_PARTICLES`, e `cellH` dentro de `layout()` (14 no mobile, 18 no desktop).

### 3.2 Estática de links e botões (`hoverStatic.ts`, seção 5.1)

Um único `mousemove` delegado no `document`:

1. acha `a`, `button` ou `.hoverchar` sob o cursor;
2. descobre o caractere sob o cursor com `caretPositionFromPoint` (fallback `caretRangeFromPoint`);
3. o caractere e os vizinhos (`data-dx`, padrão 1) percorrem uma paleta (maiúscula → maiúscula, minúscula → minúscula) e voltam à letra original, com `easeOutQuint`, vai-e-volta triangular e atraso por distância;
4. a largura do elemento é travada em px durante o efeito;
5. ignora `.big`, `.mega`, `.hover-ascii-title` e textos ainda em reveal (`[data-scrambling]`).

Ajuste por elemento:

```html
<a class="hoverchar" data-dx="2" data-duration="2000">Texto</a>
```

Ligação (em `App.tsx`):

```tsx
useEffect(() => initHoverStatic(), []);
```

### 3.3 Reveal com scramble (`ScrambleText.tsx`, seção 5.2)

```tsx
<ScrambleText text="Título" onView />                       // ao entrar na viewport (threshold 0.2, uma vez)
<ScrambleText text="Título" onView fast />                  // variante rápida (títulos da home)
<ScrambleText text="Título" onView enabled={entered} />     // só depois da intro
<ScrambleText text="Título" hover />                        // "decrypt" ao passar o mouse (opcional)
```

Com `onView` o texto fica `visibility: hidden` (o layout não colapsa) até entrar na tela e então é construído do vazio, letra a letra.

### 3.4 Logo do rodapé (`HoverAsciiTitle.tsx`, seção 5.5)

- Título limpo por padrão; no hover o nome inteiro vira ASCII pela densidade.
- Células dentro de `radiusX × radiusY` (padrão 2×1) do cursor disparam a estática (`duration` padrão 2000 ms).
- O alinhamento usa a **baseline real** do DOM (um `inline-block` de altura 0) e o `Range` do texto, então o ASCII cai exatamente sobre as letras.

```tsx
<HoverAsciiTitle text="LUIZ EDUARDO" className="footer-wordmark-title"
                 radiusX={2} radiusY={1} duration={2000} />
```

### 3.5 `TextScramble.ts`

```ts
fx.setText('NOVO TEXTO');                               // de o que está no elemento
fx.setText('NOVO TEXTO', { from: '' });                 // constrói do zero
fx.setText('NOVO TEXTO', { spread: 8, length: 10 });    // rápido
```

Correção importante: a versão antiga escrevia `escapeHtml` + `innerHTML`, e o alfabeto de ruído contém `<` e `>`. Agora o elemento é montado com `createTextNode`/`createElement`, então nenhum caractere quebra o HTML.

---

## 4. Como testar

1. `npm run dev` e abra o site: a onda deve aparecer, com o rótulo **Clique** seguindo o mouse.
2. Clique: caracteres caem, o logo se forma, faz zoom, o vídeo aparece nas letras e o site é liberado.
3. Passe o mouse nos links da navbar e nos botões: a estática deve rodar nas letras próximas.
4. Role a página: os títulos de seção fazem scramble ao entrar.
5. Passe o mouse no nome do rodapé: vira ASCII e a estática segue o cursor.
6. Teste `http://localhost:3000/#nointro` (deve pular a intro).

---

## 5. Problemas comuns

| Sintoma | Causa provável | Solução |
|---|---|---|
| Logo com fonte diferente na intro | `public/assets/wordmark.svg` não existe (usa o fallback de texto) | `node scripts/generate-wordmark.cjs` |
| Vídeo não aparece no zoom | Caminho errado ou autoplay bloqueado | Confira `videoSrc` no `App.tsx`; sem vídeo o efeito segue funcionando |
| Rodapé não mostra ASCII no hover | O CSS de `.hover-ascii-title--hover` não deixa o texto transparente | Adicione `.hover-ascii-title--hover { color: transparent; }` |
| ASCII do rodapé desalinhado | Fonte web carregou depois | Já é refeito no `mouseenter` e em `document.fonts.ready`; confira `font-family` do elemento |
| Nenhum efeito com movimento reduzido | Comportamento esperado (`prefers-reduced-motion`) | Desative a opção no sistema para testar |
| Hover de estática não roda | Elemento dentro de `.big`, `.mega` ou `.hover-ascii-title` | Remova a classe ou use `.hoverchar` em outro elemento |

## 6. CSS opcional

```css
/* cursor de bloco estilo terminal nos campos (5.4) */
input, textarea { caret-shape: block; }

/* entrada suave do menu depois da intro (classe .ready vem do App) */
.portfolio-app:not(.ready) .navbar { opacity: 0; }
.portfolio-app .navbar { transition: opacity .6s ease; }
.portfolio-app.ready .navbar { opacity: 1; }
```

## 7. Fora do escopo deste patch

Modos de imagem `text`/`pixel` (5.6), modal lateral de contato (5.3) e navegação sem recarregar não foram implementados.

## 8. Verificações feitas

- `tsc --strict` passa em todos os arquivos, com o `App.tsx` e o `Hero.tsx` incluídos.
- Teste em jsdom: `TextScramble` termina no texto exato (com `<`, `>` e `&`) e `hoverStatic` restaura o texto e destrava a largura.
- **Não foi testado em navegador real.** Se algo ficar visualmente estranho, anote o efeito e o que aparece.
