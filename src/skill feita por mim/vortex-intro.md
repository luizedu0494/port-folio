# Abertura "redemoinho ASCII" (`scripts/ascii_vortex.py`)

Tela de entrada de site, em `<canvas>`, feita só de caracteres:

1. **Redemoinho.** Milhares de letras/dígitos giram numa espiral de 3 braços. Perto do centro os caracteres são densos (`N`, `A`, `O`), na borda são esparsos (`·`, `-`, `+`).
2. **Cursor.** O centro do redemoinho é puxado na direção do cursor, e os caracteres perto do ponteiro são empurrados e ficam vermelhos. A palavra **"clique"** persegue o cursor com atraso (como se corresse atrás dele).
3. **Clique.** Os caracteres estouram para fora e depois voltam formando a **frase**. Ela nasce pequena e distante e cresce com um leve estouro até o tamanho final: parece vir em direção a quem olha.
4. **Cada take muda.** Enquanto a frase está na tela, todos os caracteres que a formam trocam a cada ~85 ms (metade das vezes usa letras da própria frase, o resto, letras/números/acentos/símbolos).
5. **Saída.** Novo clique (ou `--hold` ms sem mexer) desfaz a frase: ela passa "por cima" do observador e os caracteres voltam ao redemoinho. O próximo clique usa a **próxima frase** da lista.

## Uso

```bash
python scripts/ascii_vortex.py -p "seja bem-vindo" -p "luiz.edu" --cue clique -o intro.html
```

| Opção | Padrão | O que faz |
|---|---|---|
| `-p, --phrase` | `seja bem-vindo`, `luiz.edu` | Frase. Repita para várias; cada clique usa a próxima. Frases longas quebram em duas linhas. |
| `--cue` | `clique` | Palavra que persegue o cursor. |
| `--cue-back` | `voltar` | Palavra enquanto a frase está na tela. |
| `--particles` | 3600 | Caracteres em cena (1800 em telas < 600 px). Mais = frase mais legível, mas mais pesado. |
| `--hold` | 6500 | Tempo até a frase se desfazer sozinha (ms). |
| `--hot` | `#e5484d` | Cor do destaque (cursor, rastro, palavra). |
| `--theme` | `auto` | `auto`, `light` ou `dark`. |

Ajustes finos ficam no `assets/ascii-vortex.html` (constantes no topo do script): `ARMS`, `TURNS` (braços e enrolamento), raio de influência do cursor (110 px), fração do centro que segue o cursor (0,3), duração da chegada da frase (1,5 s), intervalo dos takes (85 ms).

## Boas práticas

- **Frases curtas** (até ~3 palavras) leem melhor. A legibilidade vem da densidade: sem caracteres suficientes as letras viram manchas.
- Cada glifo da frase é escolhido aleatoriamente a cada take, então a frase é lida pela **forma**, não pelo texto. Por isso o texto real também vai para um `aria-live` invisível: leitores de tela recebem a frase.
- Teclado: **Enter** ou **Espaço** disparam o clique.
- `prefers-reduced-motion`: sem estouro, sem chegada em perspectiva, sem troca de glifos e sem rastro; a frase só aparece.
- Toque: um toque dispara o clique; o "clique" segue o dedo.

## Limites

- É uma tela cheia (`position: fixed`). Para usar como seção, ajuste o CSS do `#c` e `size()`.
- Cerca de 3600 `fillText` por quadro: bom em desktop e celulares recentes; em aparelhos fracos, use `--particles 2000`.
- A frase é rasterizada no navegador com fonte monoespaçada em negrito; não depende de arquivo de imagem.
