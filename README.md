# Portfólio Profissional — Luiz Eduardo (IA & Software)

> Portfólio web moderno, interativo e de alto desempenho desenvolvido com **Vite 8 + React 19 + TypeScript**, trazendo a identidade visual **Prata Perolizado & Ônix Dark (Pearl Platinum & Onyx)**, fundo dinâmico de rede neural em HTML5 Canvas, iluminação metálica acetinada e um ecossistema completo de música "Dev Focus & Study Vibe".

---

## 🛠️ Tecnologias & Arquitetura

- **Core Frontend:** React 19, TypeScript, Vite 8
- **Estilização & Design System:** Vanilla CSS com tokens de cor **Pearl Platinum & Onyx Dark** (`#070709`, `#0d0e12`, `#14151a`, `#f1f5f9`, `#cbd5e1`, `#94a3b8`) e botões acetinados com movimento contínuo (Continuous Fluid Glassmorphic).
- **Tipografia com Suporte 100% Nativo a Acentuação (Latin-Ext):**
  - **Display / Títulos Tech:** `Orbitron` (Futurista & Cibernética)
  - **Subtítulos & Seções:** `Space Grotesk` & `Outfit` (Suporte nativo completo a acentos do Português: `ã`, `ç`, `ê`, `é`, `á`, `1ª`)
  - **Corpo & Parágrafos:** `Plus Jakarta Sans` (Design UI moderno de altíssima legibilidade)
- **Background Interativo:** Animação de Canvas HTML5 2D simulando partículas de Rede Neural / Agentes de IA em tom prata perolizado
- **Gerenciamento de Estado de Áudio:** React `AudioContext` para sincronização global do player entre o menu e as seções
- **Ícones & Elementos Gráficos:** Lucide React, ícones customizados de Gmail, Outlook e WhatsApp com cores sincronizadas ao tema, e Favicon SVG de brilho perolizado

---

## ✨ Recursos & Funcionalidades Recentes

1. **🎵 Player de Áudio "Dev Focus & Study Vibe":**
   - **Motor de Áudio Global:** Sincronizado via `AudioContext` — ao mudar de faixa ou pausar no topo do menu, o player da página responde instantaneamente em tempo real.
   - **Mini-Pill no Navbar:** Botão Play/Pause compacto no menu superior com barrinhas de equalizador animadas em tom prata metalizado.
   - **Player Expandido na Seção Sobre Mim:** Painel completo com lista de reprodução (faixas MP3 selecionadas de Lofi/Ambient), controle de volume suave, barra de progresso (scrubber) e seleção de faixas.
   - **Banner Flutuante "Entrar com Som":** Notificação toast com 1 clique para autorização direta de áudio sem bloquear no Chrome/Edge/Mobile.

2. **🎨 Identidade Visual Pearl Platinum & Animações Contínuas (Neural Flow):**
   - **Animações Fluidas & Contínuas:** Os botões principais (`.btn-primary` e `.btn-secondary`) possuem um movimento de gradiente metálico contínuo (`btnGradientFlow`) e respiração de borda (`btnBorderPulse`), perfeitamente desacelerados e sincronizados com a vibração da rede neural de fundo.
   - **Conforto Visual & Sem Ofuscamento:** Estilo vidro acetinado metalizado (`rgba(241, 245, 249, 0.24)`), eliminando botões brancos sólidos que causavam cansaço visual.
   - **Mesclagem de Cenários (`mix-blend-mode`):** Remoção de caixas e fundos brancos em GIFs de cenário (`tech-fear.gif` e `earth-space.gif`), integrando as animações 100% sobre o fundo escuro da malha neural.

3. **📁 Estrutura de Seções Focada em Projetos, Lightbox Modal & Responsividade:**
   - **Posicionamento de Destaque para Projetos:** Seção de Projetos posicionada logo após o *Sobre Mim*, priorizando a demonstração de código e soluções de IA para recrutadores e gestores técnicos.
   - **CronoLab 2.0 & Grade Secundária:** Projeto Principal em Destaque no topo + miniaturas da grade padronizadas com altura uniforme de **200px** (`object-fit: cover`).
   - **Modal Lightbox de Expansão:** Ao clicar em qualquer prévia, o modal exibe a imagem inteira sem cortes (`object-fit: contain`) perfeitamente centralizada e ajustada à proporção natural.
   - **Responsividade Mobile:** Navbar adaptável para telas menores, badges inteligentes "Toque para Expandir" em dispositivos touch e posicionamento do banner de áudio fixado no rodapé.

---

## 🚀 Estrutura do Site

1. **Header / Navbar:** Marca, links de navegação suave (`#sobre`, `#projetos`, `#habilidades`, `#certificacoes`), Mini Audio Player e botão de contato.
2. **Início (Hero):** Apresentação profissional, headline animada (Typewriter), links diretos do GitHub/LinkedIn/WhatsApp/E-mails e cenário de IA.
3. **Sobre Mim:** Trajetória em transição para Engenharia de IA, pontos-chave da carreira, cenário do globo espacial e o Player Dev Focus expandido.
4. **Projetos:** Card do CronoLab 2.0 em Destaque e grade de soluções secundárias (Cortex, DecifrAI, InsureBot, Stech Chatbot Ana).
5. **Habilidades:** Competências separadas por Inteligência Artificial & Agentes, Frontend, Backend & Banco de Dados e Ferramentas.
6. **Cursos & Certificações:** Certificados I2A2 (InsurMinds & Agentes Inteligentes), Databricks (Generative AI Fundamentals), Cisco e Learn Prompting.
7. **Contato & Rodapé:** Formas de contato via LinkedIn, GitHub, WhatsApp, Gmail e Outlook.

---

## 📁 Estrutura de Pastas de Áudio & Assets

```text
public/
├── assets/
│   ├── audio/              # Faixas de música MP3 de foco/código
│   │   ├── daniel.mp3 - green to blue (432hz).mp3
│   │   ├── Decaying Duet - Dorian Concept.mp3
│   │   ├── Echo Sax End - by Caleb Arredondo.mp3
│   │   └── ...
│   ├── gifs/               # Elementos de cenário visual
│   │   ├── tech-fear.gif
│   │   ├── earth-space.gif
│   │   └── visitante.gif
│   └── og-preview.png      # Imagem Open Graph para compartilhamento em redes sociais
├── fonts/                  # Fontes personalizadas TTF
│   ├── nexa/               # Nexa-ExtraLight & Nexa-Heavy
│   ├── retroica/           # Retroica
│   └── panic/              # Panic
├── favicon.svg             # Ícone SVG personalizado em Prata Perolizado
```

---

## 💻 Como Rodar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/luizedu0494/portifolio.git
cd portifolio
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse no seu navegador em `http://localhost:3000`.

---

## 📦 Build para Produção (Vercel)

```bash
npm run build
```

---

Desenvolvido por **Luiz Eduardo Lopes** — Desenvolvedor de Software & Agentes de IA.
