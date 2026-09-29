# Abertura "cometa no universo ASCII" (`scripts/ascii_comet.py`)

Tela de entrada de site, em `<canvas>`, feita só de caracteres. É a evolução do `vortex-intro.md`: o cenário fica parado e o cursor vira um cometa.

1. **Universo.** Milhares de letras giram numa espiral de 3 braços ao redor do centro da tela, que **não se move** com o cursor. Cerca de 18% das letras ficam soltas e distantes (poeira) e cerca de 4% são "rochas" grandes.
2. **Nome escondido.** O texto `BG` (padrão `luiz.edu`) existe no meio da tela, mas quase invisível e **fixo**: o cursor nunca o empurra. Ele fica coberto pelas letras do redemoinho, e a pessoa precisa descobrir que há uma palavra ali.
3. **Cometa.** O cursor é a cabeça de um cometa (ponto branco com brilho) com cauda afilada e faíscas de letras. Ele **empurra as letras do redemoinho** (raio `infl`, 130 px), abrindo um espaço. Onde ele passa, as letras do nome **esquentam**: ficam brancas e brilhantes, vibram, vibram e trocam de glifo (raio `HEAT_R`, 100 px) e depois esfriam devagar (`p.h *= .99`). Assim a palavra aparece por partes, como um rastro, até dar para ler.
4. **Rótulo.** A palavra inteira (`CUE`, padrão "clique") corre atrás do cometa, num rótulo com borda vermelha. Durante a frase vira `CUE2` ("continuar").
5. **Clique.** As letras do redemoinho estouram e se apagam ao fundo, e a frase (`PHRASES[i]`) aparece como uma **grade de caracteres monoespaçados** (estilo texto ASCII): o miolo das letras é preenchido por um caractere só (`"`, `!` ou `*`) e as bordas usam `. , ' ` - _ : ;` conforme o contorno. Os caracteres surgem em ordem aleatória e a frase nasce pequena e distante, crescendo com um leve estouro até o tamanho final, onde para.
6. **Zoom = ASCII mudando.** Enquanto a frase está em zoom (chegada, ~2 s, e a saída por cima de quem olha), a sequência de caracteres é **refeita a cada quadro**: o caractere de preenchimento muda, as bordas sorteiam outros símbolos e aparecem manchas retangulares de símbolos (`< > { } ( ) [ ] ? / \\ | ^ + =`). Quando a frase chega ao tamanho final e para, o ASCII **congela** (parado, sem animação) até o próximo clique.
7. **Saída.** Novo clique, Enter, Espaço ou `HOLD` ms fazem a frase passar por cima do observador. Depois da última frase aparece a **parte principal** (`<section id="main">`), com o botão "recomeçar".

## Configuração (topo do `<script>`)

| Constante | Padrão | O que faz |
|---|---|---|
| `PHRASES` | `["seja bem-vindo","luiz.edu"]` | Frases; cada clique usa a próxima. |
| `BG` | `luiz.edu` | Nome que fica ao fundo. Nomes curtos leem melhor. |
| `CUE` / `CUE2` | `clique` / `continuar` | Rótulo que segue o cometa (antes / durante a frase). |
| `HOLD` | 6500 | Tempo até a frase passar sozinha (ms). |
| `TAKE` | 0 | Intervalo entre trocas de glifos durante o zoom (ms); 0 = a cada quadro. |
| `HOT` | `#ffffff` | Cor do destaque (botão da parte principal). |

Ajustes finos, dentro do código:

| Onde | O que muda |
|---|---|
| `infl = 130` | Raio em que o cometa empurra as letras do redemoinho. |
| `push = 1 + f*f*2.6` | Força do empurrão. |
| `HEAT_R = 100` | Raio em que o nome escondido acende. |
| `p.h *= .99` | Quão devagar o brilho do nome apaga (mais perto de 1 = dura mais). |
| `.18` (`far`) | Fração de letras distantes (poeira). |
| `.04` (`rock`) | Fração de rochas grandes. |
| `.8` em `(p.bx - W/2) * .8` | Tamanho aparente do nome ao fundo (menor = mais distante). |
| `a = .08 + p.h*.92` | Brilho do nome sem o cometa (.08) e no auge do aquecimento. |
| `bx += (mx-bx)*.18` | Quão colada ao cursor fica a cabeça do cometa. |
| `N` (`1800 : 3400`) | Quantidade de caracteres. Reduza em aparelhos fracos. |

## Como funciona

```
texto (BG ou frase) ─► rasteriza num canvas fora da tela ─► amostra pixels ─► pontos-alvo
   frase ─► grade de células (cobertura → caractere) desenhada com escala k crescente
   partículas: alvo = espiral | nome ao fundo (+ empurrão local do cometa)
   posição = mola até o alvo + velocidade (explosão do clique)
```

- O nome ao fundo usa até 30% das partículas. A frase é desenhada por células (até ~7500), não por partículas; durante a frase o redemoinho fica apagado atrás dela.
- A frase é rasterizada em fonte monoespaçada em negrito e convertida em células (cobertura por célula → caractere). Frases com espaço e mais de 8 letras quebram em duas linhas para as letras ficarem grandes. Não depende de imagem.
- O tamanho do passo da amostragem aumenta até o número de pontos caber nas partículas disponíveis.

## Boas práticas

- Frases curtas (até ~3 palavras). Frases longas quebram em duas linhas.
- A grade muda a cada quadro durante o zoom e congela quando a frase para; ela é lida pela **forma**. O texto real vai para um `aria-live` invisível.
- Teclado: **Enter** ou **Espaço** disparam o clique. Toque: um toque dispara e o cometa segue o dedo.
- `prefers-reduced-motion`: sem explosão, sem aproximação e sem troca de glifos; a frase só aparece.

## Problemas comuns

| Sintoma | Causa provável | Solução |
|---|---|---|
| Tela toda preta | A janela/iframe tinha tamanho 0 ao carregar (a amostragem do nome falhava) | Corrigido: o script espera ter tamanho e tenta de novo a cada quadro. Se voltar, abra o console e procure o erro. |
| Nome ao fundo ilegível | Muitas partículas por cima ou nome longo | Use um nome mais curto, aumente `N` ou diminua a fração de poeira. |
| Frase grossa demais / fina demais | Tamanho da célula da grade | Em `buildPhrase`, ajuste `Math.max(4.5, Math.min(7, W / 200))` (menor = mais detalhe) e o limite de 7500 células. |
| Pesado em celular fraco | ~3400 `fillText` por quadro | `N` = 1800 ou menos. |

## Limites

- É tela cheia (`position: fixed`); para usar como seção, ajuste o CSS do `#c` e a função `size()`.
- Página única, sem CLI: para trocar frases e nome, edite as constantes do topo.
- Depois da última frase o efeito só volta pelo botão "recomeçar".

## Uso (gerador)

```bash
python scripts/ascii_comet.py -p "seja bem-vindo" -p "luiz.edu" --bg luiz.edu -o intro.html
```

| Opção | Padrão | O que faz |
|---|---|---|
| `-p, --phrase` | `seja bem-vindo`, `luiz.edu` | Frase. Repita para várias; cada clique usa a próxima. |
| `--style` | `comet` | `comet`: cometa branco no lugar do cursor (cursor do sistema escondido). `cursor`: cursor normal e a palavra "clique" solta (sem borda, com contorno escuro fino) seguindo com atraso; o efeito acontece exatamente sob o cursor. |
| `--bg` | `luiz.edu` | Nome escondido ao fundo. |
| `--cue` / `--cue-back` | `clique` / `continuar` | Rótulo que segue o cometa (antes / durante a frase). |
| `--particles` | 3400 | Caracteres em cena (metade em telas < 600 px). |
| `--hold` | 6500 | ms até a frase passar sozinha. |
| `--take` | 0 | ms entre trocas de glifos durante o zoom (0 = a cada quadro). Parada, a frase não anima. |
| `--hot` | `#ffffff` | Cor do botão da parte principal. |
| `--main-title`, `--main-text`, `--again` | `--bg`, texto genérico, `recomeçar` | Conteúdo da parte principal. |
| `--title` | `abertura ASCII` | `<title>` da página. |

Modelo em `assets/ascii-comet.html` (a configuração vem de `/*CFG*/null`, e a página também funciona aberta direto, com os valores padrão).

## Estilos

- **`comet`** (padrão): cabeça branca com brilho, cauda afilada, faíscas de letras e rótulo "clique" com borda branca.
- **`cursor`**: sem cometa nem borda; o cursor normal fica visível e o efeito (empurrar letras, acender o nome) acompanha o ponteiro sem atraso.
