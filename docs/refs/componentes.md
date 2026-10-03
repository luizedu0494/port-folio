# Componentes e Dependências de Terceiros — Portfólio

> Mapeamento de bibliotecas externas utilizadas no código do projeto [M-A].

---

| Pacote | Versão | Onde aparece | Finalidade | Licença |
|---|---|---|---|---|
| **react** | `^19.3.0` | Todo o projeto (`src/`) | Biblioteca base de interface UI | MIT |
| **react-dom** | `^19.3.0` | `src/main.tsx` | Renderização do DOM do React | MIT |
| **motion** | `^13.4.6` | `src/sections/`, `src/components/` | Animações declarativas e transições fluidas | MIT |
| **lucide-react** | `^1.44.0` | Navbar, Contact, Projects, Skills | Biblioteca moderna de ícones SVG | ISC |
| **opentype.js** | `^2.0.0` | `src/ascii/`, canvas vetorial | Manipulação de curvas e glifos tipográficos | MIT |
| **@vercel/analytics** | `^2.0.1` | `src/main.tsx` | Coleta de telemetria de tráfego e visualizações | Apache-2.0 |
| **vite** | `^6.2.0` | `package.json`, `vite.config.ts` | Ferramenta de build e servidor de desenvolvimento | MIT |
| **typescript** | `^6.0.3` | Todo o projeto | Tipagem estática de código | Apache-2.0 |

---

### Observações sobre Componentes de UI:
- O projeto **não utiliza** bibliotecas de componentes pré-fabricados (como shadcn/ui, MUI, Chakra ou Tailwind). Todos os componentes visuais (Navbar, Cards, Modais, Lightbox, Carrosséis e Botões) são desenvolvidos de forma **autoral em Vanilla CSS e TypeScript**.
