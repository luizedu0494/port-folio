# Portfólio Profissional — Luiz Eduardo (IA & Software)

> Portfólio web moderno, interativo e de alto desempenho desenvolvido com **Vite 8 + React 19 + TypeScript**, trazendo a identidade visual **Crimson Night**, fundo dinâmico de rede neural em HTML5 Canvas, iluminação neon e um ecossistema completo de música "Dev Focus & Study Vibe".

---

## 🛠️ Tecnologias & Arquitetura

- **Core Frontend:** React 19, TypeScript, Vite 8
- **Estilização & Design System:** Vanilla CSS com tokens de cor **Crimson Night** (`#050510`, `#0c0c1d`, `#161628`, `#dc143c`, `#ff4d6d`)
- **Tipografia:** Google Fonts (`Orbitron` para Display/Títulos Cyber, `Space Grotesk` para Subtítulos, `Outfit`, `Plus Jakarta Sans` para Corpo)
- **Background Interativo:** Animação de Canvas HTML5 2D simulando partículas de Rede Neural / Agentes de IA em constante conexão
- **Gerenciamento de Estado de Áudio:** React `AudioContext` para sincronização global do player entre o menu e as seções
- **Ícones & Elementos Gráficos:** Lucide React & Ícone Crimson Favicon SVG customizado com cache-busting

---

## ✨ Recursos & Funcionalidades Recentes

1. **🎵 Player de Áudio "Dev Focus & Study Vibe":**
   - **Motor de Áudio Global:** Sincronizado via `AudioContext` — ao mudar de faixa ou pausar no topo do menu, o player da página responde instantaneamente em tempo real.
   - **Mini-Pill no Navbar:** Botão Play/Pause compacto no menu superior com barrinhas de equalizador animadas em frequência carmesim.
   - **Player Expandido na Seção Sobre Mim:** Painel completo com lista de reprodução (8 faixas MP3 selecionadas de Lofi/Ambient), controle de volume suave (15% padrão), barra de progresso (scrubber) e seleção de faixas.
   - **Banner Flutuante "Entrar com Som":** Notificação toast com 1 clique para autorização direta de áudio sem bloquear no Chrome/Edge/Mobile.

2. **🎨 Identidade Visual Crimson Night & Cenários:**
   - **Hero Section:** Gradiente de título com destaque limpo em branco predominantemente neon, efeito Typewriter sem deslocamento de texto (`min-height` fixado) e elemento visual do cenário de alta tecnologia (`tech-fear.gif`).
   - **Seção Sobre Mim com Layout Zig-Zag:** Inclusão do GIF de globo/rede espacial (`earth-space.gif`) posicionado à esquerda para alternância visual dinâmica com a seção Hero.
   - **Gradientes & Glows:** Remoção de bordas estáticas em GIFs de cenário para integração 100% transparente sobre a malha cibernética.

3. **📁 Projetos em Destaque & Responsividade:**
   - **CronoLab 2.0:** Projeto Principal em Destaque no topo com demonstração em GIF do Modo Visitante, lista de destaques técnicos e links diretos para a aplicação web e repositório.
   - **Grade Secundária Limpa:** Cards de projetos adicionais (*DecifrAI*, *InsureBot*, *Stech Chatbot Ana*) com alturas alinhadas e animação de varredura laser (`cardScanLine`) que desacelera e pausa suavemente quando o usuário passa o mouse (*hover pause*).
   - **Responsividade Mobile:** Navbar adaptável para telas menores e posicionamento do banner de áudio fixado no rodapé (`z-index: 9999`) no celular para garantir total acessibilidade de toque.

---

## 🚀 Estrutura do Site

1. **Header / Navbar:** Marca, links de navegação suave (`#sobre`, `#habilidades`, `#certificacoes`, `#projetos`), Mini Audio Player e botão de contato.
2. **Início (Hero):** Apresentação profissional, headline animada (Typewriter), links diretos do GitHub/LinkedIn e cenário de IA.
3. **Sobre Mim:** Trajetória em transição de Auxiliar Técnico para Engenharia de IA, pontos chave da carreira, cenário do globo espacial e o Player Dev Focus expandido.
4. **Habilidades:** Competências separadas por Inteligência Artificial & Agentes, Frontend, Backend & Banco de Dados e Ferramentas.
5. **Cursos & Certificações:** Certificados I2A2 (InsurMinds & Agentes Inteligentes), Databricks (Generative AI Fundamentals), Cisco e Learn Prompting.
6. **Projetos:** Card do CronoLab 2.0 em Destaque e grade de soluções secundárias.
7. **Contato & Rodapé:** Formas de contato via LinkedIn, GitHub, WhatsApp e e-mail.

---

## 📁 Estrutura de Pastas de Áudio & Assets

```text
public/
├── assets/
│   ├── audio/              # Faixas de música MP3 de foco/código
│   │   ├── daniel.mp3 - green to blue (432hz).mp3
│   │   ├── Decaying Duet - Dorian Concept.mp3
│   │   ├── Echo Sax End - by Caleb Arredondo.mp3
│   │   ├── Dorian Concept - Space II.mp3
│   │   └── ...
│   └── gifs/               # Elementos de cenário visual
│       ├── tech-fear.gif
│       ├── earth-space.gif
│       └── visitante.gif
├── favicon.svg             # Ícone SVG personalizado em vermelho Crimson
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
