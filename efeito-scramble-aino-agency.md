# Relatório de Análise Técnica — aino.agency

**Site analisado:** https://aino.agency/
**Foco da análise:** identificar e documentar a técnica por trás do efeito visual de "grid"/animação de texto usado no site, para fins de estudo e replicação de conceito em portfólio pessoal.

---

## 1. Visão geral do site

O aino.agency é o site institucional de uma agência de design e tecnologia escandinava (Gotemburgo/Oslo), especializada em e-commerce de moda. O front-end é construído com:

- **Vite** como bundler (arquivos JS com hash tipo `wvFVdJ3W.js`, `Do-0cfow.js`)
- **CSS custom properties (variáveis)** para um sistema de grid tipográfico responsivo
- Um **motor próprio de renderização em ASCII/canvas**, sem dependências externas de animação (nada de GSAP, Framer Motion, Three.js etc.)

Não há SVG animado envolvido no efeito principal da home — a suspeita inicial (replicar um SVG animado) foi descartada após inspeção do código-fonte real. Os arquivos `aino.svg` e `aino-agency.svg` existem, mas são logos **estáticas**: o `aino.svg` serve como matéria-prima (é lido e convertido em caracteres pelo motor de ASCII na intro) e o `aino-agency.svg` é a imagem do rodapé.

---

## 2. O sistema de grid tipográfico (base de tudo)

No `<head>`, um script inline roda antes de qualquer renderização e calcula, a partir da largura da janela (`innerWidth`), um conjunto de métricas:

- `ch` — largura de um "caractere" de referência (a unidade base de todo o layout)
- `cols` — número de colunas que cabem na tela
- `rows` — número de linhas
- `font-size`, `line-height`, `letter-spacing` — derivados matematicamente de `ch`

Esses valores são injetados como **CSS custom properties** direto no elemento `<html>` (ex: `--ch`, `--cols`, `--line`), e recalculados a cada `resize`/`orientationchange`. Todo o layout do site (larguras de coluna `--s1` a `--s8`, espaçamentos `--char`, `--line`) é montado em cima dessas variáveis — é essencialmente um **grid de terminal/monoespaçado que se adapta a qualquer resolução**, mantendo o alinhamento de caractere perfeito.

Há também suporte a três "modos" visuais persistidos em `localStorage`:
- `image` (padrão, imagens normais)
- `text` (converte imagens/vídeos em ASCII art)
- `pixel` (efeito de pixelização/paleta retrô)

---

## 3. O motor de "ASCII canvas" (o efeito principal)

Este é o núcleo técnico do site. Em vez de SVG ou animações CSS tradicionais, o site usa um sistema próprio (função interna, referida no código como `xe`) que trata **texto como um sistema de partículas físicas**. Resumo do funcionamento:

### 3.1 Partículas de caractere
Cada caractere renderizado na tela de abertura (o "Aino", os itens de menu "Work / Services / About / Play") é um objeto com:
- posição `x, y` (normalizada de 0 a 1)
- um valor (o caractere a exibir)
- propriedades físicas: `vx`, `vy` (velocidade), `gravity`, `damping` (amortecimento), `spring` (elasticidade), `friction`

### 3.2 Simulação física
A cada frame (via `requestAnimationFrame`), o sistema:
1. Aplica gravidade e velocidade às partículas
2. Detecta colisões simples entre partículas
3. Interpola (`morph`) o caractere de uma partícula para outro caractere-alvo, usando um **alfabeto ordenado** como tabela de interpolação (ex: percorrer de "A" até "@" trocando caracteres intermediários conforme o progresso da animação)

### 3.3 Conversão de imagem/logo para ASCII
Para transformar a logo (imagem) em texto:
1. A imagem é desenhada em um `<canvas>` oculto
2. Os pixels são lidos via `getImageData()`
3. Para cada pixel, calcula-se a **luminância** (fórmula padrão: `0.21*R + 0.72*G + 0.07*B`)
4. A luminância é mapeada para um caractere de uma paleta ordenada por "peso visual" (ex: espaço → `.` → `:` → `-` → `=` → `+` → `*` → `#` → `%` → `@`), técnica clássica de **ASCII shading**
5. Cada "pixel-caractere" vira uma partícula na mesma grade de posições usada para o texto

### 3.4 Morph (transição entre estados)
Quando o usuário clica na tela inicial, o sistema faz um "morph": as partículas que formavam o texto do menu migram fisicamente (com aceleração/amortecimento) até as posições que formam a logo em ASCII, trocando gradualmente o caractere de cada uma pelo caractere mais próximo disponível no destino. O resultado visual é uma transição orgânica de texto para "imagem" (ainda em texto).

### 3.5 Fundo ondulado
As ondas horizontais visíveis por trás do texto usam funções trigonométricas (seno/cosseno) somadas com deslocamento de fase por linha e por tempo, escolhendo a cada frame o caractere mais adequado da paleta de densidade — criando a sensação de "onda" se movendo em ASCII puro, sem nenhuma imagem ou vídeo por trás.

### 3.6 Vídeo em ASCII (bônus)
O mesmo motor também sabe converter frames de vídeo (`<video>`) em tempo real para ASCII, lendo frame a frame do elemento `<video>` do mesmo jeito que faz com imagens estáticas — usado no efeito de transição para a home real do site.

---

## 4. Sequência de introdução da home

A intro é executada por uma função da rota `/` (home) e só roda na **primeira visita da sessão**. Não há comentários nem nomes como "espiral" ou "nome grande" no código; as descrições abaixo são a leitura do que o código faz.

### 4.1 Fase 1 — Onda de entrada (o efeito "espiral")

Ao entrar no site, uma barra de progresso de `=` cresce no topo e uma forma feita de caracteres começa a pulsar no centro da tela. O efeito percebido como espiral é resultado de três elementos combinados:

1. **Largura variável por linha:** para cada linha do grid, a largura da faixa de caracteres ativa é calculada com ondas senoidais em fases diferentes (períodos de 3 s, 4 s e 8 s, com defasagem por linha). Isso gera uma forma pulsante, tipo "losango", em vez de um retângulo fixo.
2. **Fase ancorada no mouse:** dentro de cada linha, a posição horizontal passa por um cosseno cuja fase depende da posição X do cursor, suavizada por um *lerp* lento. É isso que "puxa" a onda na direção do mouse e dá a sensação de redemoinho.
3. **Crescimento radial:** um fator `R` cresce de 0 a 1 ao longo de ~3 s (curva quadrática), então a forma nasce fechada e se abre gradualmente.

Não é uma espiral polar clássica (não há ângulo crescente multiplicado por raio); é uma onda com amplitude pulsante e fase controlada pelo cursor, cujo resultado visual lembra uma espiral.

A paleta usada nessa fase é uma string ordenada por densidade visual (`NO0A869452I3?!<>=+/:-· `), do caractere mais "cheio" ao mais leve.

Sobre a onda, o site também mostra o rótulo **"Click"** seguindo o cursor (no mobile vira "Tap to continue"), criado pelo mesmo motor de texto.

### 4.2 Fase 2 — Clique e o nome grande

Ao clicar (`mousedown`), ocorre a seguinte sequência:

1. **Desmontagem:** a geração da onda é interrompida e as partículas recebem gravidade e uma "explosão" (`gravitate` + `explode`), espalhando e derrubando os caracteres.
2. **Logo em canvas oculto:** depois de ~200 ms, o arquivo `/aino.svg` é desenhado num canvas invisível, com opacidade e escala inicial reduzidas (alpha 0,25; escala 0,7).
3. **Conversão para ASCII:** o canvas é lido pixel a pixel (luminância → caractere) e vira um novo conjunto de partículas.
4. **Morph:** as partículas que caíam migram até as posições que formam "Aino" em texto, com interpolação de posição e troca gradual de caractere.
5. **Zoom do nome:** cerca de 1,4 s após o clique, a escala do logo vai de 0,7 até 20 em ~2 s, com aceleração em `t⁵` (começa lento e dispara no final). Durante os primeiros 4 s, o logo é redesenhado e reconvertido em ASCII a cada frame, o que dá a impressão de o nome crescer até ocupar a tela.
6. **Vídeo misturado às letras:** em paralelo, o vídeo `/assets/sm4.mp4` começa a tocar. Seus frames são convertidos em caracteres e misturados progressivamente ao logo (`blend`), de modo que a imagem do vídeo aparece "dentro" das letras.
7. **Saída:** quando o vídeo termina, ou se o usuário clicar de novo, o conjunto explode e cai. Após ~2 s, a classe `ready` é aplicada ao `body`, a home real é liberada (o conteúdo ficava `inert` durante a intro), o menu aparece e as imagens entram com fade em ASCII.

### 4.3 Atalhos e comportamentos

- **Esc** pula a intro.
- **`#nointro`** na URL pula a intro.
- **`prefers-reduced-motion: reduce`** também pula a intro.
- Depois da primeira execução, uma flag em memória (`homeReady`) evita repetir a intro ao navegar dentro do site.
- Se o visitante já passou por outra página antes (`_visited`), a animação de entrada é abreviada.

---

## 5. Interações de botões, links e textos (pós-intro)

Depois que a home fica pronta, o site aplica efeitos de caracteres nos elementos clicáveis e nos textos. Eles usam o mesmo princípio da intro (troca de caracteres numa paleta ordenada), mas em escala local. Como nas seções anteriores, o código não tem comentários nem nomes descritivos; o que segue é a leitura do comportamento.

### 5.1 Hover com "estática" em links e botões

O site percorre todos os `a`, `button` e elementos com a classe `hoverchar` e adiciona um listener de `mousemove` (em telas touch, `touchmove`). Ao passar o cursor:

1. **Descoberta do caractere:** o caractere sob o cursor é identificado com `caretPositionFromPoint` (ou `caretRangeFromPoint`, como fallback). Os vizinhos ao redor entram numa janela configurável por `data-dx` e `data-dy` (padrão: 1 caractere para os lados).
2. **Partículas temporárias:** cada caractere afetado percorre a paleta (`$MBNQØW@&R8GD6S9…`) até um extremo e volta à letra original. Há paletas separadas para maiúsculas e minúsculas, de modo que uma letra minúscula continua minúscula durante o efeito.
3. **Curva e duração:** o progresso usa uma curva de desaceleração (easeOutQuint) e um vai-e-volta triangular. A duração padrão é 1 s e pode ser alterada com `data-duration`.
4. **Intensidade por distância:** caracteres mais distantes do cursor têm animação diferente, o que cria a sensação de ondulação localizada.
5. **Largura travada:** durante o efeito, a largura do botão é fixada em pixels para o layout não "pular" enquanto as letras trocam.
6. **Exclusões:** títulos grandes (`.big`, `.mega`) e parágrafos de texto corrido (`.text p`) não recebem o efeito.
7. **Loop:** um `setTimeout` recorrente (25 ms) atualiza todas as letras em animação até que terminem.

### 5.2 Reveal com "scramble" ao aparecer

Elementos com a classe `fadein` começam invisíveis. Quando entram na viewport (IntersectionObserver, `threshold: 0.2`, uma única vez), o texto é esvaziado e cada letra reaparece de forma escalonada, passando por caracteres aleatórios antes de assentar na letra correta. Existem variantes com velocidade e duração diferentes:

- Na home, os blocos `.html` (títulos dos projetos) usam uma variante rápida (`speed: 6`, `duration: 1200`).
- Elementos com `data-textreveal="scramble"` usam o mesmo motor, disparados por um observer próprio.
- Elementos com `data-reveal` usam apenas transições de CSS (`fade` e `slide-up`).

### 5.3 Cliques e navegação

- **Contato:** links para `/contact` não navegam. O clique é interceptado e abre um `<dialog>` lateral com e-mail, botões "Open Gmail" e "Copy Email" (o texto muda para "Email copied!") e um botão para agendar uma conversa.
- **Modal de pessoa:** links `mailto:` de e-mails conhecidos abrem um modal com foto, cargo e opções de copiar o endereço ou abrir o Gmail.
- **Navegação sem recarregar:** links internos têm o clique interceptado e usam `history.pushState`. Só o conteúdo de `#app` é trocado. O prefetch é disparado no `mouseover` (ou via `rel="prefetch"`).
- **Botões de configuração:** o menu Settings usa botões com o mesmo efeito de estática e permite alternar aparência (dark/light), modo de imagem (`image`, `text`, `pixel`) e tema de paleta.

### 5.4 Efeitos em CSS

- O item ativo do menu pisca rapidamente (animação `blinker`, 0,16 s).
- Nas listas da página de trabalhos, o hover inverte as cores (fundo escuro, texto claro).
- Nos cards da página `/work`, os itens ficam com 30% de opacidade e em escala de cinza, e ganham cor ao passar o mouse. Essa regra só vale em telas com mais de 768 px.
- Os botões usam um fundo translúcido (`rgba(var(--black-rgb), .1)`), cantos de 4 px e texto em maiúsculas com `letter-spacing` calculado a partir da grade.
- O cursor de texto em campos de formulário usa `caret-shape: block`, no estilo terminal.

### 5.5 Logo do rodapé

Em dispositivos com hover, ao passar o mouse sobre o rodapé, a logo é convertida em ASCII e recebe o efeito de estática do item 5.1, com raio maior (`data-dx = 2`, `data-dy = 1`) e duração de 2 s. Ao sair, a imagem original volta.

### 5.6 Modos de imagem

Nos modos `text` e `pixel` (menu Settings), todas as imagens e vídeos passam pelo mesmo motor de conversão, com atualização a cada frame de vídeo (`requestVideoFrameCallback`, com fallback para `requestAnimationFrame`). No modo `pixel`, as cores são reduzidas a uma paleta retrô (temas como `fantasy`, `c64`, `nes`, `db16`).

---

## 6. Outras técnicas notáveis encontradas

- **Scramble de texto**: uma função de "embaralhamento" de texto (`Se`) que troca caracteres aleatoriamente até convergir no texto final — usado em fade-ins de títulos e textos
- **Hover com distorção de caractere**: ao passar o mouse sobre links, os caracteres próximos ao cursor são temporariamente substituídos por outros da mesma "família" (maiúscula/minúscula), criando um efeito de "estática" localizado
- **Modo pixel/texto para mídia**: imagens e vídeos podem ser renderizados como pixelização (via canvas + paleta de cores tipo Game Boy/NES/C64) ou como ASCII, trocando em tempo real conforme o modo escolhido pelo usuário
- **Shader WebGL no elemento `.fractal`**: um efeito de "terreno" orgânico gerado por ruído/senoides em GLSL, usado em algumas seções (não relacionado ao efeito de grid principal)
- **Jogos em ASCII**: o site tem uma seção `/play` com Tetris, Snake e Pac-Man clones, todos renderizados usando o mesmo motor de partículas de texto

---

## 7. Conclusão / recomendação para replicação

Não existe animação de SVG a ser extraída. O efeito é 100% **JavaScript + Canvas 2D**, sem bibliotecas externas de animação. O `aino.svg` é apenas a fonte estática da logo que o motor converte em caracteres. Para replicar um conceito similar (mais simples) em um portfólio pessoal, os blocos essenciais seriam:

1. Um grid de caracteres monoespaçados posicionado via CSS custom properties responsivas
2. Uma função de conversão de imagem → ASCII via `canvas.getImageData()` + tabela de luminância → caractere
3. Uma simulação física simples de partículas (posição + velocidade + amortecimento) para permitir "morph" entre dois textos/formas
4. Uma função de onda (seno/cosseno) para a animação de entrada, com fase controlada pelo mouse
5. Uma sequência de clique: explodir → desenhar a logo em canvas oculto → morph → zoom com curva de aceleração forte
6. Um hover de "estática" em links e botões: trocar caracteres próximos ao cursor por caracteres de uma paleta ordenada e devolvê-los à letra original, travando a largura do botão durante o efeito
7. Um reveal com "scramble" ao entrar na viewport: apagar o texto e reconstruí-lo letra a letra, passando por caracteres aleatórios

Esse é um projeto de complexidade média-alta, mas perfeitamente viável de recriar de forma simplificada e original (sem copiar código) para fins de portfólio.

---

*Relatório gerado a partir de inspeção do HTML, CSS e JavaScript renderizados publicamente pelo próprio navegador (view-source / DevTools), sem acesso a nenhum sistema interno ou dado privado da agência.*
