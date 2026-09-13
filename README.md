# Portfólio Profissional — Luiz Eduardo (IA & Software)

> Portfólio web moderno, interativo e de alto desempenho desenvolvido com **Vite 8 + React 19 + TypeScript**, trazendo a identidade visual **Prata Perolizado & Ônix Dark (Pearl Platinum & Onyx)**, fundo dinâmico de rede neural em HTML5 Canvas, iluminação metálica acetinada e um ecossistema completo de música "Dev Focus & Study Vibe".

---

## 🛠️ Tecnologias & Arquitetura

- **Core Frontend:** React 19, TypeScript, Vite 8
- **Estilização & Design System:** Vanilla CSS com tokens de cor **Pearl Platinum & Onyx Dark** (`#070709`, `#0d0e12`, `#14151a`, `#f1f5f9`, `#cbd5e1`, `#94a3b8`) e botões acetinados anti-ofuscamento (Anti-Glare Glassmorphic).
- **Tipografia Personalizada:**
  - **Display / Títulos Tech:** `Orbitron` & `Retroica`
  - **Subtítulos & Seções:** `Retroica` & `Space Grotesk`
  - **Corpo & Parágrafos:** `Nexa` (ExtraLight / Heavy) & `Plus Jakarta Sans`
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

2. **🎨 Identidade Visual Pearl Platinum & Ônix Dark (Anti-Glare Design):**
   - **Conforto Visual & Sem Ofuscamento:** Botões de ação principal (`.btn-primary`) remodelados para vidro acetinado metalizado (`rgba(241, 245, 249, 0.22)`), eliminando botões brancos sólidos que causavam cansaço visual.
   - **Mesclagem de Cenários (`mix-blend-mode`):** Remoção de caixas e fundos brancos em GIFs de cenário (`tech-fear.gif` e `earth-space.gif`), integrando as animações 100% sobre o fundo escuro da malha neural.
   - **Hero Section:** Gradiente de título com destaque em prata perolizado (`linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)`), efeito Typewriter sem deslocamento de texto (`min-height` fixado).

3. **📁 Projetos em Destaque, Lightbox Modal & Responsividade:**
   - **CronoLab 2.0:** Projeto Principal em Destaque no topo com demonstração em GIF do Modo Visitante, lista de destaques técnicos e links diretos para a aplicação web e repositório.
   - **Grade Secundária Padronizada:** Miniaturas de projetos com altura uniforme de **200px** (`object-fit: cover`), alinhando perfeitamente capturas verticais (mobile) e horizontais (web).
   - **Modal Lightbox de Expansão:** Ao clicar em qualquer prévia, o modal exibe a imagem inteira sem cortes (`object-fit: contain`) perfeitamente centralizada e ajustada à proporção natural.
   - **Responsividade Mobile:** Navbar adaptável para telas menores, badges inteligentes "Toque para Expandir" em dispositivos touch e posicionamento do banner de áudio fixado no rodapé.

---

## 🚀 Estrutura do Site

1. **Header / Navbar:** Marca, links de navegação suave (`#sobre`, `#habilidades`, `#certificacoes`, `#projetos`), Mini Audio Player e botão de contato.
2. **Início (Hero):** Apresentação profissional, headline animada (Typewriter), links diretos do GitHub/LinkedIn/WhatsApp/E-mails e cenário de IA.
3. **Sobre Mim:** Trajetória em transição para Engenharia de IA, pontos chave da carreira, cenário do globo espacial e o Player Dev Focus expandido.
4. **Habilidades:** Competências separadas por Inteligência Artificial & Agentes, Frontend, Backend & Banco de Dados e Ferramentas.
5. **Cursos & Certificações:** Certificados I2A2 (InsurMinds & Agentes Inteligentes), Databricks (Generative AI Fundamentals), Cisco e Learn Prompting.
6. **Projetos:** Card do CronoLab 2.0 em Destaque e grade de soluções secundárias.
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
│   └── gifs/               # Elementos de cenário visual
│       ├── tech-fear.gif
│       ├── earth-space.gif
│       └── visitante.gif
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

Desenvolvido por **Luiz Eduardo** — Auxiliar Técnico em transição para Engenharia de IA & Desenvolvimento de Software.
