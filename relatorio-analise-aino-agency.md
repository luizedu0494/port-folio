# Relatório de Análise Técnica — aino.agency

**Site analisado:** https://aino.agency/
**Foco da análise:** identificar e documentar a técnica por trás do efeito visual de "grid"/animação de texto usado no site, para fins de estudo e replicação de conceito em portfólio pessoal.

---

## 1. Visão geral do site

O aino.agency é o site institucional de uma agência de design e tecnologia escandinava (Gotemburgo/Oslo), especializada em e-commerce de moda. O front-end é construído com:

- **Vite** como bundler (arquivos JS com hash tipo `wvFVdJ3W.js`, `Do-0cfow.js`)
- **CSS custom properties (variáveis)** para um sistema de grid tipográfico responsivo
- Um **motor próprio de renderização em ASCII/canvas**, sem dependências externas de animação (nada de GSAP, Framer Motion, Three.js etc.)

Não há SVG animado envolvido no efeito principal da home — a suspeita inicial (replicar um SVG) foi descartada após inspeção do código-fonte real.

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

## 4. Outras técnicas notáveis encontradas

- **Scramble de texto**: uma função de "embaralhamento" de texto (`Se`) que troca caracteres aleatoriamente até convergir no texto final — usado em fade-ins de títulos e textos
- **Hover com distorção de caractere**: ao passar o mouse sobre links, os caracteres próximos ao cursor são temporariamente substituídos por outros da mesma "família" (maiúscula/minúscula), criando um efeito de "estática" localizado
- **Modo pixel/texto para mídia**: imagens e vídeos podem ser renderizados como pixelização (via canvas + paleta de cores tipo Game Boy/NES/C64) ou como ASCII, trocando em tempo real conforme o modo escolhido pelo usuário
- **Shader WebGL no elemento `.fractal`**: um efeito de "terreno" orgânico gerado por ruído/senoides em GLSL, usado em algumas seções (não relacionado ao efeito de grid principal)
- **Jogos em ASCII**: o site tem uma seção `/play` com Tetris, Snake e Pac-Man clones, todos renderizados usando o mesmo motor de partículas de texto

---

## 5. Conclusão / recomendação para replicação

Não existe SVG a ser extraído — o efeito é 100% **JavaScript + Canvas 2D**, sem bibliotecas externas. Para replicar um conceito similar (mais simples) em um portfólio pessoal, os blocos essenciais seriam:

1. Um grid de caracteres monoespaçados posicionado via CSS custom properties responsivas
2. Uma função de conversão de imagem → ASCII via `canvas.getImageData()` + tabela de luminância → caractere
3. Uma simulação física simples de partículas (posição + velocidade + amortecimento) para permitir "morph" entre dois textos/formas
4. Uma função de onda (seno/cosseno) para o efeito de fundo animado

Esse é um projeto de complexidade média-alta, mas perfeitamente viável de recriar de forma simplificada e original (sem copiar código) para fins de portfólio.

---

*Relatório gerado a partir de inspeção do HTML, CSS e JavaScript renderizados publicamente pelo próprio navegador (view-source / DevTools), sem acesso a nenhum sistema interno ou dado privado da agência.*
