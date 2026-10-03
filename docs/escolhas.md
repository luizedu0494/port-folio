# Ficha de Escolhas Exatas — Portfólio Luiz Eduardo Lopes (P-16 Modo Edição)

> Atualizado em 2026-10-03 no Diagnóstico (M-3).  
> Status propostos pelo agente com base no objetivo e preferências confirmadas. **Aguardando sua validação final**.

---

## 1. Tipografia

| Item | Valor Observado | Proposta do Agente | Status Proposto |
|---|---|---|---|
| **Família Display / Títulos Tech** | `'Orbitron', sans-serif` | Manter para headlines principais e numeração | **mantido** |
| **Família Subtítulos & Seções** | `'Space Grotesk', 'Outfit', sans-serif` | Manter `Space Grotesk` para subtítulos | **mantido** |
| **Família Corpo & Parágrafos** | `'Plus Jakarta Sans', system-ui, sans-serif` | Manter (excelente legibilidade e suporte a acentos) | **mantido** |
| **Família Código / Terminal** | `'JetBrains Mono', monospace` | Manter para trechos técnicos e badges | **mantido** |
| **Família Editorial Intro** | `'Anton', sans-serif` | Manter na intro artística de entrada | **mantido** |
| **Pesos Carregados** | 300, 400, 500, 600, 700, 800, 900 | Podar pesos sem uso real (otimizar download de fontes) | **ajustar** |
| **Escala Tipográfica** | Múltiplos tamanhos avulsos | Padronizar rampa de títulos com tokens CSS | **ajustar** |
| **Comprimento de Linha** | 65 a 80 caracteres | Manter medida confortável | **mantido** |

---

## 2. Disposição & Layout

| Item | Valor Observado | Proposta do Agente | Status Proposto |
|---|---|---|---|
| **Largura Máxima do Container** | `1200px` a `1280px` | Manter para consistência de leitura | **mantido** |
| **Grid de Projetos** | Destaque isolado + grade secundária | Unificar a seção dando destaque máximo ao CronoLab 2.0 com métricas e demo | **ajustar** |
| **Grid de Habilidades** | Flip Card 3D rotativo | Substituir por **Matriz Técnica de Especialidades** (mais editorial, direta e sem fadiga de flip) | **trocar** |
| **Nova Seção: Processo de Trabalho** | Inexistente atualmente | Inserir `#processo` entre Sobre e Projetos com 4 etapas da engenharia | **ajustar** (nova seção) |
| **Alinhamento & Ritmo Vertical** | `100px` padding entre seções | Manter espaçamento amplo editorial | **mantido** |
| **Comportamento Mobile** | Gaveta fullscreen e cards empilhados | Otimizar toques e evitar cortes em telas < 400px | **ajustar** |

---

## 3. Tipos de Itens & Componentes de Interface

| Item | Valor Observado | Proposta do Agente | Status Proposto |
|---|---|---|---|
| **Cards de Projeto** | Flip Card 3D com bloqueio de link | Manter flip nos projetos (interativo e envolvente) | **mantido** |
| **Cards de Habilidade** | Flip Card 3D com rotação | Trocar por Card de Matriz Técnica com chips e níveis visuais | **trocar** |
| **Botões de Ação** | Gradiente fluido em movimento contínuo | Manter e refinar transição de foco | **mantido** |
| **Player de Áudio** | Mini-pill + player expandido no About | Manter (recurso único de identidade dev focus) | **mantido** |
| **Background Neural & Intro** | Canvas 2D + intro ASCII | Manter conceito, corrigindo hooks de re-render e otimizando FPS | **mantido** |
| **Controle de Acessibilidade** | Apenas `prefers-reduced-motion` | Adicionar toggle discreto no navbar para pausar efeitos/canvas | **ajustar** |

---

## 4. Referências de Bibliotecas

| Biblioteca | Versão | Proposta | Status Proposto |
|---|---|---|---|
| **Motion** | `13.4.6` | Manter como motor único de animação UI | **mantido** |
| **Lucide React** | `1.44.0` | Manter para ícones de interface | **mantido** |
| **Vanilla CSS** | Tokens próprios em `:root` | Manter sem adicionar Tailwind ou frameworks estranhos | **mantido** |
