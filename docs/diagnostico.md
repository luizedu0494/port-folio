# Diagnóstico Geral — Portfólio Luiz Eduardo Lopes (M-3)

> Realizado em 2026-10-03 sem alteração de código.  
> Duas fontes de auditoria: Inspeção Técnica & Hooks + Princípios Editoriais de Interface (Jakub/Impeccable) + Gate Anti-Cara-de-IA (P-13).

---

## 1. Resumo Executivo dos Achados

| Categoria | Total de Achados | Crítico | Alto | Médio | Baixo |
|---|---|---|---|---|---|
| **ACABAMENTO** | 3 | 0 | 0 | 2 | 1 |
| **ESTRUTURA / DISPOSIÇÃO** | 3 | 0 | 1 | 2 | 0 |
| **MARCA & CONTEÚDO** | 2 | 0 | 0 | 1 | 1 |
| **TÉCNICO** | 4 | 0 | 2 | 2 | 0 |
| **QUALIDADE (a11y/perf)** | 2 | 0 | 1 | 1 | 0 |
| **CARA DE IA (P-13)** | 3 | 0 | 1 | 2 | 0 |
| **SEGURANÇA / PRIVACIDADE**| 0 | 0 | 0 | 0 | 0 |

---

## 2. Detalhamento dos Achados por Categoria

### [TÉCNICO]
1. **[Alto] Efeitos colaterais síncronos em Hooks do React (`react-hooks/set-state-in-effect`)**
   - *Evidência:* `src/components/AsciiTitle.tsx:86` e `src/components/TypewriterText.tsx:34`.
   - *Impacto:* Disparo de cascading re-renders em cadeia, gerando travamentos sutis de taxa de quadros (jank) durante a digitação e entrada da intro.
   - *Correção:* Mover sincronização de estado para event handlers ou agendamento assíncrono controlado.
2. **[Alto] Mutação indevida de ref durante render (`react-hooks/refs`)**
   - *Evidência:* `src/components/FlipCard.tsx:91` (`shownRef.current = shown`).
   - *Impacto:* Violação estrita das regras de concorrência do React 19; o componente pode renderizar estados desincronizados.
   - *Correção:* Atualizar a ref em `useEffect` ou passar por props controladas.
3. **[Médio] Arquivo CSS monolítico com 4589 linhas**
   - *Evidência:* `src/index.css`.
   - *Impacto:* Dificuldade de manutenção de escopo e risco de especificidade cruzada em alterações pontuais.
4. **[Médio] Dependências e variáveis declaradas sem uso**
   - *Evidência:* `src/App.tsx:1` (`lazy`, `Suspense`), `src/components/AsciiObject.tsx:163` (`charToDraw`), `src/sections/Projects.tsx:28` (`onPreview`).

### [ESTRUTURA / DISPOSIÇÃO]
5. **[Alto] Repetição idêntica de interação 3D (Flip Cards) em duas seções consecutivas**
   - *Evidência:* `src/sections/Projects.tsx` (cards de projetos) e `src/sections/Skills.tsx` (cards de habilidades) usam o mesmo comportamento e visual de flip card 3D.
   - *Impacto:* Fadiga interativa. Virar 4 cards de skills e virar cards de projetos gera monotonia e sensação de template.
   - *Correção:* Manter o flip 3D onde é mais rico (projetos) e desenhar para as **Habilidades** uma disposição visual mais técnica, editorial e direta (ex.: matriz interativa por competências com badges de proficiência e casos de uso).
6. **[Médio] Ausência da Seção de Processo de Trabalho (Metodologia)**
   - *Evidência:* Solicitação explícita do cliente na pergunta 3 do briefing.
   - *Impacto:* O visitante vê o que foi feito, mas não entende *como* Luiz Eduardo pensa, arquitetura e entrega soluções com IA.
   - *Correção:* Criar seção `#processo` com 4 etapas claras (Diagnóstico & Arquitetura → Engenharia de Prompts & Agentes → Desenvolvimento Fullstack → Observabilidade & Deploy).
7. **[Médio] Fragmentação da Seção de Projetos**
   - *Evidência:* `src/sections/Projects.tsx:85` (featured em section isolada) e linha 103 (grid secundária em outra section).
   - *Correção:* Unificar o ritmo visual da seção sob um cabeçalho coeso que valorize o CronoLab 2.0 como caso principal e dê clareza à grade secundária.

### [ACABAMENTO]
8. **[Médio] Nomenclaturas desatualizadas de tokens no CSS**
   - *Evidência:* `src/index.css:12` (`--accent-crimson: #f1f5f9`).
   - *Impacto:* Gera confusão semântica na manutenção.
9. **[Médio] Carga simultânea de 6 famílias de fontes externas**
   - *Evidência:* `index.html:14` (Anton, Orbitron, Outfit, Plus Jakarta Sans, Space Grotesk, JetBrains Mono).
   - *Impacto:* Custo de requisições de fontes; pode haver layout shift sutil.
10. **[Baixo] Estilos inline de tipografia espalhados**
    - *Evidência:* `src/sections/Contact.tsx:14` (`style={{ fontSize: '2.2rem' }}`).

### [QUALIDADE]
11. **[Alto] Falta de pausa explícita para animações de fundo/canvas**
    - *Evidência:* `src/components/NeuralNetworkBg.tsx` e `CosmicCometCursor.tsx`.
    - *Impacto:* Embora haja suporte ao `prefers-reduced-motion` no sistema operacional, não há um controle visual direto na UI para o visitante pausar os efeitos se estiver com bateria fraca ou em máquina modesta.
12. **[Médio] Contraste de subtítulos e chips de metadados**
    - *Evidência:* Textos com cor `--text-muted` (`#94a3b8`) sobre fundos translúcidos de cards podem atingir limite de contraste WCAG AA sob certas densidades de partículas.

### [CARA DE IA (P-13: Momento Diagnóstico)]
13. **[Alto] Sensação de template pela sequência Hero > Bio > Flip Cards > Flip Cards > Certificados > Contato**
    - *Evidência:* Estrutura linear com duas grades sucessivas de cartões espelhados.
    - *Correção:* Diferenciar o design da seção de Habilidades e intercalar a nova seção de Processo de Trabalho.
14. **[Médio] Uso generalizado de Glassmorphism uniforme**
    - *Evidência:* Praticamente todos os containers compartilham a mesma opacidade e borda vítrea sem variação de peso visual ou hierarquia de relevância.
15. **[Médio] Microcopy de rodapé pouco autoral**
    - *Evidência:* `src/sections/Contact.tsx:19` ("Aberto a projetos de landing pages de alta conversão..."). Luiz é especialista em Agentes de IA e Engenharia de Software; abrir o rodapé focando em landing pages dilui a percepção de autoridade técnica sênior.

---

## 3. Veredito do Gate Anti-Cara-de-IA (P-13)
- **Veredito Atual:** **NÃO PASSA** (3 sinais médios/altos pendentes na estrutura e disposição dos cards).
- **Ação:** As correções serão estruturadas em camadas no plano M-4 para aprovação.
