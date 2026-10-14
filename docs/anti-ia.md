# Registro do Gate Anti-"Cara de IA" (P-13)

> Monitoramento contínuo de sinais visuais, estruturais e textuais que geram sensação de template ou IA genérica.

---

## 1. Momento: Diagnóstico (2026-10-03)

| Sinal | Camada | Onde | Evidência | Severidade | Correção Proposta | Status |
|---|---|---|---|---|---|---|
| Repetição de Flip Card 3D idêntico em Projetos e Habilidades | Estrutura / Disposição | `Projects.tsx` & `Skills.tsx` | Ambos usavam a mesma mecânica rotativa | Alta | Habilidades migradas para Matriz Técnica de Especialidades com badges e chips | **Resolvido (Camada 3)** |
| Sequência clássica de seções sem processo autoral | Estrutura | Estrutura global da página | Ausência de seção de metodologia de trabalho | Média | Seção `#processo` criada em 4 etapas detalhadas de Engenharia & IA | **Resolvido (Camada 3)** |
| Microcopy de rodapé desconectada da autoridade em IA | Texto | `Contact.tsx:19` | Frase genérica sobre "landing pages" abria o contato | Média | Ajustado para destacar software escalável, agentes autônomos e IA | **Resolvido (Camada 2)** |
| Uso uniforme de glassmorphism em todos os containers | Visual | `index.css:8` | `--bg-card` idêntico em todas as seções | Baixa | Variação de densidade, sub-blocos escuros de entregas e wrappers com borda platina | **Resolvido (Camada 3)** |

**Veredito Pós-Camada 3:** **PASSA**  
*Justificativa:* Todos os sinais de severidade Alta e Média levantados no diagnóstico foram corrigidos. O portfólio agora possui ritmo estrutural variado, seção autoral de metodologia de engenharia e distinção clara entre os cards de projetos e a matriz de competências.

---

## 2. Momento: Diagnóstico da Intervenção M10 — Showcase para Clientes (2026-10-14)

| Sinal Analisado | Camada | Onde | Evidência | Severidade | Prevenção / Diretriz Obrigatória | Status |
|---|---|---|---|---|---|---|
| Risco de títulos e slogans clichês de IA | Texto | Nova Landing Page | Textos genéricos tipo "transforme seu negócio", "soluções inovadoras" | Alta | Copy autoral focada em casos reais de agentes de IA, automações operacionais e integrações corporativas | **Protegido por Diretriz** |
| Risco de layout pré-moldado de template | Estrutura | Nova Landing Page | Grade clássica de 3 cards centralizados idênticos com orbes roxos | Alta | Grid assimétrico inspirado em estúdio de design sueco (*aino.agency*), alinhamento editorial e seções densas | **Protegido por Diretriz** |
| Efeitos decorativos sem funcionalidade | Visual / Efeito | Componentes Interativos | Shaders ou loops pesados sem justificativa técnica | Média | Usar física de caracteres e ASCII canvas com pausa em aba inativa e respeito a `prefers-reduced-motion` | **Protegido por Diretriz** |
| Falta de especificidade e dados inventados | Conteúdo | Números e Provas | "10k+ clientes", avaliações fake | Alta | Apresentar demonstrativos tangíveis (arquitetura de agentes, tempo de resposta, ganhos operacionais reais) | **Protegido por Diretriz** |

**Veredito Diagnóstico M10:** **PASSA COM DIRETRIZES PREVENTIVAS**  
*Justificativa:* As diretrizes do P-13 foram estabelecidas para a construção da nova landing page de demonstração, garantindo originalidade, código limpo, microinterações intencionais e ausência de vícios visuais de IA.

---

## 3. Momento: Pós-Camada 1 — Arquitetura & Roteamento da Demo (2026-10-14)

| Elemento Avaliado | Camada | Onde | Verificação | Severidade | Veredito |
|---|---|---|---|---|---|
| Botões e Badges de Entrada | Visual | Navbar & About.tsx | Micro-badge com indicador pulsante sutil; sem orbes artificiais | Nenhuma | Aprovado |
| Copy de Chamada para Demo | Texto | `About.tsx` | Pergunta contextual limpa sobre demonstração de landing page para estúdios de IA | Nenhuma | Aprovado |
| Roteamento e Isolamento SPA | Código | `App.tsx` | Transição instantânea sem reload, mantendo a home intacta por padrão | Nenhuma | Aprovado |

**Veredito Pós-Camada 1:** **PASSA**  
*Justificativa:* A Camada 1 introduziu o isolamento arquitetural e pontos de entrada elegantes sem nenhum sinal de template genérico ou vício de IA.

---

## 4. Momento: Pós-Camada 2 — Estrutura & Conteúdo Comercial da Demo (2026-10-14)

| Elemento Avaliado | Camada | Onde | Verificação | Severidade | Veredito |
|---|---|---|---|---|---|
| Copy Comercial & Headlines | Texto | `DemoStudioLanding.tsx` | Termos técnicos reais (LangChain, FastAPI, pgvector, RAG, RBAC); zero slogans clichês | Nenhuma | Aprovado |
| Ritmo Estrutural & Grids | Estrutura | `DemoStudioLanding.tsx` | Faixa de métricas operacionais + 3 pilares com chips + timeline de 4 semanas | Nenhuma | Aprovado |
| Estética & Cores | Visual | `DemoStudioLanding.css` | Onyx profundo com acentos ciano e platina; ausência de roxo genérico/aurora | Nenhuma | Aprovado |
| Isolamento de Escopo | Código | `DemoStudioLanding.css` | 100% dos seletores sob `.demo-landing-root`; zero vazamento na Home | Nenhuma | Aprovado |

**Veredito Pós-Camada 2:** **PASSA**  
*Justificativa:* A landing page de demonstração entrega uma proposta de valor autoral de alta precisão técnica e comercial, sem vícios de template genérico ou copy clichê de IA.

---

## 5. Momento: Pós-Camada 3 — Efeitos Visuais de Referência (ASCII Canvas & Scramble) (2026-10-14)

| Elemento Avaliado | Camada | Onde | Verificação | Severidade | Veredito |
|---|---|---|---|---|---|
| Efeito ASCII Canvas com Física | Visual / Efeito | `DemoAsciiCanvas.tsx` | Simulação elástica inspirada em *aino.agency*; pausa em aba inativa | Nenhuma | Aprovado |
| Decodificação Cibernética (Scramble) | Efeito / Texto | Títulos da Demo | Reveal pontual e sutil via IntersectionObserver sem re-renders em cadeia | Nenhuma | Aprovado |
| Alternador de Modo Matrix | Visual | Top Bar da Demo | Demonstração de versatilidade estética (Studio Dark vs. Matrix CRT) | Nenhuma | Aprovado |
| Acessibilidade & Reduced Motion | Qualidade | Canvas & Scramble | Suporte automático a `prefers-reduced-motion` com fallback estático | Nenhuma | Aprovado |

**Veredito Pós-Camada 3:** **PASSA**  
*Justificativa:* Os efeitos de referência trazem alto impacto visual e dinamismo, respeitando rigorosamente a taxa de quadros (60 FPS), acessibilidade e economia de bateria/CPU.

---

## 6. Momento: Final da Intervenção M10 — Showcase Completo (2026-10-14)

| Sinal Anti-IA | Status | Verificação e Evidência |
|---|---|---|
| Efeitos decorativos desnecessários | **PASSA** | O ASCII Canvas possui física controlada, modo de pausa e desativação manual; nada de shaders pesados. |
| Textos e slogans clichês de IA | **PASSA** | Conteúdo específico de engenharia de software, automações corporativas e agentes autônomos. |
| Layout de template repetitivo | **PASSA** | Diagramação editorial assimétrica, métricas operacionais densas e opções de tema (Studio vs. Matrix). |
| Responsividade e toque móvel | **PASSA** | Áreas de clique confortáveis (>44px), `touch-action: pan-y` sem travamento de rolagem no celular. |
| Preservação do projeto nuclear | **PASSA** | A Home principal e o código original permaneceram 100% íntegros e funcionais. |

**Veredito Final da Intervenção M10:** **APROVADO (PASSA)**  
*Conclusão:* A entrega cumpre todos os requisitos de qualidade técnica, estética premium e ausência de sinais de IA genérica.
