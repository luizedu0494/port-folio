# Histórico de Melhorias Aplicadas — Portfólio Luiz Eduardo Lopes

| Data | Camada / Tipo | O que mudou | Motivo / Justificativa | Impacto Medido | Aprovado Por |
|---|---|---|---|---|---|
| 2026-10-03 | Passo 4 / M-0 & M-A | Criação de governança, snapshot e adoção do playbook | Preparação segura para redesign por camadas (v2) | Nenhum código alterado | Luiz Eduardo |
| 2026-10-03 | Camada 1 (Qualidade & Hooks) | Correção de cascading renders em `TypewriterText` e `AsciiTitle`, mutação de ref em `FlipCard`, limpeza de variáveis e listener de visibilidade em `NeuralNetworkBg` | Eliminar jank de digitação, cumprir regras de concorrência do React 19 e economizar CPU/GPU em aba inativa | ESLint de 6 erros para 0 erros; build em 5.19s | Luiz Eduardo |
