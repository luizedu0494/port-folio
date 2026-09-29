# Efeito "imagem normal → ASCII no hover"

Guia do `scripts/ascii_reveal.py`: gera **uma página HTML** em que uma imagem (PNG/SVG/JPG) aparece normal e, quando o cursor passa por cima, vira ASCII com o efeito de letras/números/acentos embaralhando.

> Quer ver tudo funcionando? `python scripts/ascii_reveal.py logo.png --demo -o demo.html` gera uma página com **todos os efeitos lado a lado**, cada um com o comando que o produz.

## Em 30 segundos

```bash
pip install pillow numpy cairosvg --break-system-packages   # cairosvg só para SVG
python scripts/ascii_reveal.py logo.png -w 160 --theme light -o pagina.html
```

Resultado padrão: a imagem fica normal → o cursor entra → **a imagem inteira vira ASCII** → por onde o cursor passa nesse modo surge um **rastro vermelho** de caracteres embaralhados → o cursor sai → o efeito é **removido na hora**.

## Mapa dos efeitos

Um efeito é a combinação de **como entra** (`--enter`), **como sai** (`--exit`) e dois extras (rastro e piscar).

### Entrada

| `--enter` | O que acontece | Use quando |
|---|---|---|
| `swap` (padrão) | A imagem inteira faz fade para ASCII assim que o cursor entra. Rastro vermelho segue o cursor. | Você quer o "modo ASCII" completo, como o do site de referência. |
| `spot` | A imagem continua visível; o ASCII surge só num raio em volta do cursor, embaralha, assenta e some (`--hold` ms depois). | Você quer uma "lente" ou lanterna que revela o ASCII por onde passa. |

### Saída (só vale para `swap`)

| `--exit` | O que acontece | Custo | Use quando |
|---|---|---|---|
| `instant` (padrão) | O efeito é cortado na hora. | Nenhum | Interfaces dinâmicas, que não devem "arrastar". |
| `fade` | Crossfade ASCII → imagem em `--exit-ms` (600 por padrão). | Baixo | Quer suavidade sem complicação. |
| `dissolve` | Cada caractere sumindo num momento aleatório (~0,65 s), embaralhando em vermelho até sumir; a imagem volta por baixo. | Alto (um fade por caractere) | Efeito de "desintegrar", em peças de destaque. |
| `wave` | O ASCII fica ~0,5 s e some por caractere: longe do ponto de saída primeiro, perto por último. | Alto | Efeito de "rastro que se apaga". |

No modo `spot` não existe saída em massa: as células terminam sozinhas (`--hold` + fade de 0,35 s). `--exit instant` no `spot` apaga tudo na hora.

### Extras

| Flag | Efeito |
|---|---|
| `--no-trail` | Sem embaralhar: no `swap` vira troca pura imagem ↔ ASCII; no `spot` mostra o ASCII já assentado. |
| `--no-ambient` | Desliga o piscar aleatório de 2 caracteres a cada 160 ms enquanto o cursor está sobre a imagem. |

## Todas as opções

| Flag | Padrão | Descrição |
|---|---|---|
| `-w, --width` | 160 | Colunas de ASCII. 120–200 é a faixa boa; mais colunas = mais detalhe e mais elementos no DOM. |
| `--cell-aspect` | 0.6 | Largura/altura do caractere. Não mude a menos que troque a fonte. |
| `--chars` | `" ·-+=:!/<>?I123546980OAN"` | Rampa do vazio ao denso. |
| `--light-art` | desligado | Arte clara sobre fundo **opaco** (sem transparência). |
| `--enter` | `swap` | `swap` ou `spot`. |
| `--exit` | `instant` | `instant`, `fade`, `dissolve` ou `wave`. |
| `--exit-ms` | 600 | Duração do `fade` de saída. |
| `--enter-ms` | 250 | Duração do fade de entrada (`swap`). |
| `--hold` | 650 | Quanto o ASCII permanece antes de sumir (`spot`), em ms. |
| `--radius` | 7 | Raio do rastro, em caracteres. |
| `--hot` | `#e5484d` | Cor do rastro. |
| `--pool` | letras, dígitos, acentos e símbolos | Caracteres usados no embaralhado. Ex.: `--pool "01"` para binário. |
| `--theme` | `auto` | `auto`, `light` ou `dark`. |
| `--max-width` | 1100 | Largura máxima da imagem em px. |
| `--title`, `--caption` | – | Texto alternativo da imagem e legenda abaixo dela. |
| `--demo` | – | Página com todos os efeitos lado a lado. |

## Receitas

| Quero… | Comando |
|---|---|
| O padrão: trocar tudo e rastro vermelho, saída seca | `ascii_reveal.py logo.png -o p.html` |
| Saída suave e rápida | `… --exit fade --exit-ms 350` |
| ASCII só ao redor do cursor (lente) | `… --enter spot` |
| Lente com rastro que demora a sumir | `… --enter spot --hold 1200 --radius 9` |
| Rastro maior | `… --radius 11` |
| Só binário no embaralhado | `… --pool "01"` |
| Rastro azul | `… --hot "#3b82f6"` |
| Sem nenhum embaralhado, só trocar | `… --no-trail` |
| Mais calmo (sem piscar sozinho) | `… --no-ambient` |
| Mais detalhe | `… -w 200` |
| Logo branco/claro sobre fundo escuro, arquivo sem transparência | `… --light-art --theme dark` |

## Como funciona

```
imagem ──► rasteriza ──► média por célula ──► rampa de caracteres ──► linhas de texto
                                                                          │
   <img> (original) + <pre> com um <span> por caractere, sobrepostos ◄────┘
                              │
     cursor entra → swap: <img> some, <pre> aparece │ spot: só as células perto do cursor aparecem
     cursor se move → células no raio embaralham (vermelho) e assentam no caractere real
     cursor sai → o efeito termina conforme --exit
```

- A grade ASCII tem a mesma proporção da imagem (`--cell-aspect` 0.6 nos dois lados), então os dois se sobrepõem exatamente.
- A fonte é ajustada para a grade ocupar exatamente a largura da imagem, em qualquer tela.
- Cada `<span>` tem `width: 1ch`, então caracteres acentuados nunca deslocam a coluna.
- Transparência (PNG/SVG): a **forma** (canal alpha) define o ASCII. Fundo opaco: usa a luminância.

## O que fazer (e o que evitar)

**Faça**
- Recorte a imagem **rente ao conteúdo**. O script não corta linhas vazias para manter o alinhamento 1:1.
- Prefira PNG/SVG com **fundo transparente**.
- Use `--theme` fixo se o fundo do seu site for sempre claro ou sempre escuro; `auto` segue `prefers-color-scheme`.
- Use `instant` ou `fade` quando o elemento for grande ou houver várias instâncias na página.
- Teste no celular: toque e arraste disparam o efeito; arrasto vertical continua rolando a página.

**Evite**
- `dissolve`/`wave` em grades muito grandes (mais de ~2500 caracteres ativos) ou muitas instâncias: fazem um fade por caractere e podem pesar em aparelhos fracos.
- Imagens com muitos tons de cor esperando fidelidade: o ASCII é monocromático (a forma é o que importa).
- Texto pequeno demais: com poucas colunas as letras viram borrões. Aumente `-w`.
- Usar isso como única forma de mostrar informação: o ASCII é decorativo, o `<img>` leva o `alt`.

## Limites

- Gera **uma imagem por chamada**; para várias, rode o script para cada uma e combine as páginas (ou use o bloco `<script>` gerado, que aceita várias instâncias com `data-i`).
- O HTML embute a imagem em base64: imagens grandes deixam a página pesada. Otimize antes (PNG ≤ 200 KB ideal).
- Sem JavaScript, o site mostra apenas a imagem normal (degrada bem).
- Não anima o SVG em si; é uma troca imagem ↔ ASCII.

## Acessibilidade e movimento reduzido

- O `<img>` recebe o `alt` (`--title`); o `<pre>` de ASCII é `aria-hidden`.
- Com `prefers-reduced-motion: reduce` o embaralhado e o piscar são desligados: no `swap` a imagem só troca para o ASCII estático; no `spot` o ASCII estático aparece perto do cursor.

## Integração em React / Next.js / Vue

O script é independente de framework. Gere a página, copie o `<script>` e o CSS para o seu componente:

- Rode só no navegador (`"use client"` + `useEffect`), com `ref` para o `.wrap`.
- Guarde o estado das células **fora** do React (array simples) e atualize o DOM direto.
- No desmonte, remova os listeners (`pointerenter/leave/move/down/cancel`, `resize`), limpe o `setInterval` e o `setTimeout` de saída e cancele o `requestAnimationFrame`.
- Gere `lines` no build e importe o JSON, em vez de rodar Python no cliente.

## Problemas comuns

| Sintoma | Causa provável | Solução |
|---|---|---|
| ASCII desalinhado com a imagem | Imagem com margem vazia ou `--cell-aspect` alterado | Recorte a imagem; mantenha 0.6 |
| `[erro] ASCII vazio` | Arte clara sobre fundo opaco | `--light-art` |
| Frase some no tema escuro | Logo escuro sobre fundo escuro | Fixe `--theme light` ou use uma versão clara do logo |
| Lento em `dissolve`/`wave` | Muitos caracteres com transição | Use `fade`/`instant` ou reduza `-w` |
| Nada acontece no celular | Efeito depende de ponteiro | Toque na imagem; confira se não há overlay por cima |
| Rastro cortando letras | Raio grande demais | Reduza `--radius` |
