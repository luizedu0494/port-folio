# Baseline do Projeto — Portfólio Luiz Eduardo Lopes (M-2)

> Medição realizada em 2026-10-14 antes de qualquer alteração de código para a intervenção M10.  
> Ferramentas utilizadas: Vite 6.4.3 build pipeline, TypeScript 6.0.3, ESLint 10.11.0.

---

## 1. Métricas Técnicas de Compilação & Bundling

- **Tempo de Build de Produção:** `6.57s`
- **Módulos Transformados:** 2297 módulos
- **Erros de TypeScript (`tsc --noEmit`):** `0 erros` (100% aprovado)
- **Tamanhos dos Chunks Gerados:**
  - `dist/index.html`: `3.24 kB` (gzip: `1.26 kB`)
  - `dist/assets/index-C7OGTU-W.css`: `85.49 kB` (gzip: `15.51 kB`)
  - `dist/assets/index-CYTPbNQJ.js`: `479.76 kB` (gzip: `153.73 kB`)
- **Requisições de Mídia Estática:**
  - Áudio: 8 arquivos MP3 sob demanda (`public/assets/audio/`, ~12 MB total, sem download inicial)
  - Imagens de preview: WebP / PNG otimizados

---

## 2. Qualidade de Código & Linter (ESLint)

- **Total de Ocorrências:** 1 aviso (0 erros, 1 warning)
- **Warning observado:** `AudioContext.tsx:192`: fast-refresh warning (exportação conjunta de constantes e hooks)
- **Status:** 0 erros bloqueantes de compilação ou de regras de hooks do React 19.
- **Erros Críticos de Performance/Hooks:**
  - `src/components/AsciiTitle.tsx:86`: `setState` síncrono dentro do corpo de `useEffect` (risco de cascading renders)
  - `src/components/TypewriterText.tsx:34`: `setState` síncrono dentro de `useEffect`
  - `src/components/FlipCard.tsx:91`: Mutação direta de ref durante render (`shownRef.current = shown`)
  - `src/components/FlipCard.tsx:176, 231`: Blocos `catch/if` vazios
  - `src/components/AsciiObject.tsx:163`: Variável `charToDraw` sem uso posterior
- **Warnings:** Variáveis importadas sem uso (`lazy`, `Suspense`, `onPreview`).

---

## 3. SEO, Metadados & Semântica

- **Título da Página:** `Luiz Eduardo Lopes | Portfólio & Engenharia de IA` (presente e descritivo)
- **Meta Description:** Presente (`index.html:L18`, ~190 caracteres)
- **Open Graph / Twitter Card:** Presentes com tags completas e imagem canônica `og-preview.png`
- **Dados Estruturados (JSON-LD):** Presente com `@type: ProfilePage` e `@type: Person` (`schema.org`)
- **Robots & Sitemap:** `robots.txt` e `sitemap.xml` válidos e canônicos

---

## 4. Inspeção Visual & Screenshots

- **Status dos Screenshots Automatizados:** `[bloqueado por indisponibilidade do driver Playwright 1.57 no ambiente]`.
- **Aprovação do Usuário:** Registrada em 2026-10-03 (Opção A — prosseguir com baseline técnico e validação estática/inspeção de código).
