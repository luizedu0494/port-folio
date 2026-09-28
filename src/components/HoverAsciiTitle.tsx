import React, { useEffect, useRef, useState } from 'react';
import { registerAsciiSurface } from '../ascii/engine';
import { rasterText } from '../ascii/rasterize';
import { DENSITY_PALETTE } from '../ascii/palette';

interface HoverAsciiTitleProps {
  text: string;
  className?: string;
  /** Raio de scramble ao redor do cursor (px) */
  scrambleRadius?: number;
}

const SCRAMBLE = '!<>-_\\/[]{}—=+*^?#@$%&';

/**
 * Efeito "rodapé do aino.agency": título limpo por padrão; no hover o
 * nome INTEIRO vira ASCII (chars estruturados pela densidade) e apenas a
 * região do cursor embaralha (com aberração cromática vermelho/ciano).
 */
export const HoverAsciiTitle: React.FC<HoverAsciiTitleProps> = ({
  text,
  className,
  scrambleRadius = 110
}) => {
  const elRef = useRef<HTMLSpanElement | null>(null);
  const hoveredRef = useRef(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    let cancelled = false;
    let unregister: (() => void) | undefined;

    const build = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width < 10) return null;
      const style = getComputedStyle(el);
      const fontSpec = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const lsRaw = style.letterSpacing;
      const ls = lsRaw === 'normal' ? 0 : parseFloat(lsRaw) || 0;
      const cellH = Math.max(9, rect.height / 9); // ~9 linhas de grade
      return rasterText(text, fontSpec, ls, cellH, 4);
    };

    let grid: ReturnType<typeof rasterText> = null;

    const init = () => {
      if (cancelled) return;
      grid = build();

      unregister = registerAsciiSurface({
        draw: (ctx, time, mouse) => {
          if (!grid || !hoveredRef.current) return;
          const r = el.getBoundingClientRect();

          const { cols, rows, cellW, cellH, cells } = grid;
          ctx.font = `${cellH}px "Courier New", monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          for (const cell of cells) {
            const px = r.left + cell.x * cellW + cellW / 2;
            const py = r.top + cell.y * cellH + cellH / 2;
            const dist = Math.hypot(px - mouse.x, py - mouse.y);

            if (dist < scrambleRadius) {
              // Região do cursor: chars aleatórios + aberração cromática
              const phase = Math.floor(time / 70) + cell.x * 3 + cell.y * 7;
              const char = SCRAMBLE[(phase * 31 + cell.x * 17 + cell.y * 13) % SCRAMBLE.length];
              const jx = (Math.random() * 2 - 1) * 1.5;
              ctx.fillStyle = 'rgba(255, 59, 111, 0.5)';
              ctx.fillText(char, px + 1 + jx, py);
              ctx.fillStyle = 'rgba(49, 224, 224, 0.5)';
              ctx.fillText(char, px - 1 + jx, py);
              ctx.fillStyle = 'rgba(200, 200, 196, 0.95)';
              ctx.fillText(char, px + jx, py);
            } else {
              // Resto do nome: ASCII estático estruturado pela densidade
              ctx.fillStyle = 'rgba(226, 232, 240, 0.92)';
              ctx.fillText(DENSITY_PALETTE[cell.idx], px, py);
            }
          }
          void cols;
          void rows;
        }
      });
    };
    init();

    const onResize = () => {
      if (!cancelled) grid = build();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelled = true;
      window.removeEventListener('resize', onResize);
      unregister?.();
    };
  }, [text, scrambleRadius]);

  return (
    <span
      ref={elRef}
      className={`hover-ascii-title ${hovered ? 'hover-ascii-title--hover' : ''} ${className || ''}`}
      onMouseEnter={() => {
        hoveredRef.current = true;
        setHovered(true);
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
        setHovered(false);
      }}
    >
      {text}
    </span>
  );
};
