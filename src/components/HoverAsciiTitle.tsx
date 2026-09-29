import React, { useEffect, useRef, useState } from 'react';
import { registerAsciiSurface } from '../ascii/engine';
import { DENSITY_PALETTE, paletteIndexForDensity } from '../ascii/palette';

interface HoverAsciiTitleProps {
  text: string;
  className?: string;
  /** Vizinhos afetados pela estática (relatório: dx=2, dy=1) */
  radiusX?: number;
  radiusY?: number;
  /** Duração da estática em ms (relatório: 2000 no rodapé) */
  duration?: number;
}

/** Paleta da "estática" (seção 5.1 do relatório) */
const STATIC_PALETTE = '$MBNQØW@&R8GD6S9';
const SS = 3;
const ASC = 1.0; // ascendente coberto pela grade (em × fontSize)
const DESC = 0.25; // descendente

const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

interface Grid {
  cols: number;
  rows: number;
  cellW: number;
  cellH: number;
  /** topo da grade relativo ao topo do texto */
  topRel: number;
  cells: { x: number; y: number; idx: number }[];
  byKey: Map<number, number>;
}

/**
 * Efeito do rodapé do aino.agency (seção 5.5): título limpo por padrão; no hover
 * o nome inteiro vira ASCII (pela densidade) e os caracteres perto do cursor
 * recebem a "estática": percorrem a paleta até um extremo e voltam ao original
 * (easeOutQuint + vai-e-volta triangular), com atraso proporcional à distância.
 */
export const HoverAsciiTitle: React.FC<HoverAsciiTitleProps> = ({
  text,
  className,
  radiusX = 2,
  radiusY = 1,
  duration = 2000
}) => {
  const elRef = useRef<HTMLSpanElement | null>(null);
  const hoveredRef = useRef(false);
  const activeRef = useRef<Map<number, number>>(new Map());
  const buildRef = useRef<() => void>(() => undefined);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    let cancelled = false;
    let grid: Grid | null = null;
    const range = document.createRange();

    const textRect = () => {
      range.selectNodeContents(el);
      return range.getBoundingClientRect();
    };

    const build = () => {
      const tr = textRect();
      if (tr.width < 10) {
        grid = null;
        return;
      }
      const style = getComputedStyle(el);
      const fontSize = parseFloat(style.fontSize) || 40;
      const ls = style.letterSpacing === 'normal' ? 0 : parseFloat(style.letterSpacing) || 0;

      // baseline real do DOM: um inline-block de altura 0 assenta na baseline
      const probe = document.createElement('span');
      probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
      el.appendChild(probe);
      const baselineY = probe.getBoundingClientRect().bottom;
      el.removeChild(probe);

      const cellH = Math.max(8, fontSize / 7);
      const cellW = cellH * 0.6 * 1.35;
      const cols = Math.max(4, Math.ceil(tr.width / cellW));
      const rows = Math.max(3, Math.ceil((fontSize * (ASC + DESC)) / cellH));
      const topRel = baselineY - tr.top - fontSize * ASC;

      const off = document.createElement('canvas');
      off.width = cols * SS;
      off.height = rows * SS;
      const o = off.getContext('2d', { willReadFrequently: true });
      if (!o) return;
      o.fillStyle = '#000';
      o.fillRect(0, 0, off.width, off.height);
      // coordenadas físicas (px de tela) com escala não-uniforme para a grade
      o.setTransform(SS / cellW, 0, 0, SS / cellH, 0, 0);
      o.fillStyle = '#fff';
      o.font = `${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
      o.textBaseline = 'alphabetic';
      o.textAlign = 'left';
      (o as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = `${ls}px`;
      o.fillText(text, 0, fontSize * ASC);

      const data = o.getImageData(0, 0, off.width, off.height).data;
      const cells: Grid['cells'] = [];
      const byKey = new Map<number, number>();
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let sum = 0;
          for (let sy = 0; sy < SS; sy++) {
            for (let sx = 0; sx < SS; sx++) {
              sum += data[((y * SS + sy) * off.width + (x * SS + sx)) * 4];
            }
          }
          const d = sum / (SS * SS * 255);
          if (d < 0.35) continue;
          const idx = paletteIndexForDensity(d);
          cells.push({ x, y, idx });
          byKey.set(y * cols + x, idx);
        }
      }
      grid = { cols, rows, cellW, cellH, topRel, cells, byKey };
    };
    buildRef.current = build;

    const unregister = registerAsciiSurface({
      draw: (ctx, time, mouse) => {
        if (!grid || !hoveredRef.current || cancelled) return;
        const g = grid;
        const tr = textRect();
        const left = tr.left;
        const top = tr.top + g.topRel;

        // dispara a estática nas células ao redor do cursor
        const mcx = Math.floor((mouse.x - left) / g.cellW);
        const mcy = Math.floor((mouse.y - top) / g.cellH);
        const active = activeRef.current;
        for (let dy = -radiusY; dy <= radiusY; dy++) {
          for (let dx = -radiusX; dx <= radiusX; dx++) {
            const x = mcx + dx;
            const y = mcy + dy;
            if (x < 0 || y < 0 || x >= g.cols || y >= g.rows) continue;
            const key = y * g.cols + x;
            if (!g.byKey.has(key)) continue;
            const t0 = active.get(key);
            if (t0 !== undefined && (time - t0) / duration < 0.6) continue;
            active.set(key, time + Math.hypot(dx, dy) * 60);
          }
        }

        ctx.font = `${g.cellH}px "JetBrains Mono", "Courier New", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'rgba(226, 232, 240, 0.92)';

        for (const cell of g.cells) {
          const px = left + (cell.x + 0.5) * g.cellW;
          const py = top + (cell.y + 0.5) * g.cellH;
          let ch = DENSITY_PALETTE[cell.idx];
          const key = cell.y * g.cols + cell.x;
          const t0 = active.get(key);
          if (t0 !== undefined) {
            const p = (time - t0) / duration;
            if (p >= 1) active.delete(key);
            else if (p > 0) {
              const tri = p < 0.5 ? p * 2 : (1 - p) * 2;
              const k = Math.floor(easeOutQuint(tri) * (STATIC_PALETTE.length - 1));
              if (k > 0) ch = STATIC_PALETTE[k];
            }
          }
          ctx.fillText(ch, px, py);
        }
      }
    });

    const onResize = () => {
      if (!cancelled) build();
    };
    window.addEventListener('resize', onResize);
    // fonte web pode chegar depois do primeiro layout
    document.fonts?.ready.then(() => !cancelled && build()).catch(() => undefined);
    build();

    return () => {
      cancelled = true;
      window.removeEventListener('resize', onResize);
      unregister();
    };
  }, [text, radiusX, radiusY, duration]);

  return (
    <span
      ref={elRef}
      className={`hover-ascii-title ${hovered ? 'hover-ascii-title--hover' : ''} ${className || ''}`}
      onMouseEnter={() => {
        buildRef.current(); // relê o layout atual (scroll/resize/fonte)
        hoveredRef.current = true;
        setHovered(true);
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
        activeRef.current.clear();
        setHovered(false);
      }}
    >
      {text}
    </span>
  );
};
