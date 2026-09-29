import React, { useEffect, useRef, useState } from 'react';
import { buildContourGrid, ContourAsciiCell } from '../ascii/contourAscii';

interface SvgAsciiWordmarkProps {
  className?: string;
  variant?: 'hero' | 'footer';
}

const SVG_PATH =
  'M47.76 174L0 174L0 0L47.76 0L47.76 174M204.48 174L165.36 174L162.24 154.80Q154.80 165.12 142.68 171Q130.56 176.88 117.12 176.88Q95.04 176.88 84 164.64Q72.96 152.40 72.96 129.36L72.96 47.28L120.72 47.28L120.72 123.60Q120.72 131.76 124.92 136.68Q129.12 141.60 136.80 141.60Q145.68 141.60 151.20 135.84Q156.72 130.08 156.72 121.68L156.72 47.28L204.48 47.28L204.48 174M278.16 32.40L230.40 32.40L230.40 0L278.16 0L278.16 32.40M278.16 174L230.40 174L230.40 47.28L278.16 47.28L278.16 174M415.68 62.16L361.92 141.60L417.84 141.60L417.84 174L294.24 174L294.24 158.40L347.52 79.68L297.12 79.68L297.12 47.28L415.68 47.28L415.68 62.16M483.60 174L432.72 174L432.72 126.24L483.60 126.24L483.60 174M573.12 44.40Q607.92 44.40 626.28 60.72Q644.64 77.04 644.64 110.64L644.64 118.80L549.60 118.80Q549.60 132.48 555.72 139.44Q561.84 146.40 575.04 146.40Q587.04 146.40 592.68 141.36Q598.32 136.32 598.32 127.92L644.64 127.92Q644.64 150.96 627.12 163.92Q609.60 176.88 576 176.88Q540.72 176.88 521.28 160.44Q501.84 144 501.84 110.64Q501.84 78 520.80 61.20Q539.76 44.40 573.12 44.40M575.04 74.88Q552.48 74.88 549.84 96.24L596.40 96.24Q596.40 86.40 590.76 80.64Q585.12 74.88 575.04 74.88M793.92 174L755.04 174L750.96 156Q737.04 176.88 710.64 176.88Q684.96 176.88 671.04 160.08Q657.12 143.28 657.12 110.40Q657.12 77.76 671.04 61.08Q684.96 44.40 710.64 44.40Q732.48 44.40 746.16 59.04L746.16 0L793.92 0L793.92 174M725.52 79.68Q704.88 79.68 704.88 104.40L704.88 117.12Q704.88 141.60 725.52 141.60Q736.08 141.60 741.36 134.16Q746.64 126.72 746.64 114.72L746.64 106.80Q746.64 94.80 741.36 87.24Q736.08 79.68 725.52 79.68M949.20 174L910.08 174L906.96 154.80Q899.52 165.12 887.40 171Q875.28 176.88 861.84 176.88Q839.76 176.88 828.72 164.64Q817.68 152.40 817.68 129.36L817.68 47.28L865.44 47.28L865.44 123.60Q865.44 131.76 869.64 136.68Q873.84 141.60 881.52 141.60Q890.40 141.60 895.92 135.84Q901.44 130.08 901.44 121.68L901.44 47.28L949.20 47.28';

const ORIGINAL_VB_W = 949.2;
const ORIGINAL_VB_H = 176.88;

const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÁÉÍÓÚÃÕÇâêôàü#@$%&*+=<>?/!·-:";

const rnd = (a: string | string[]) => a[Math.floor(Math.random() * a.length)];

interface ActiveCell extends ContourAsciiCell {
  nextSwap: number;
  heat: number;
}

interface TrailPoint {
  x: number;
  y: number;
}

export const SvgAsciiWordmark: React.FC<SvgAsciiWordmarkProps> = ({ className = '', variant = 'hero' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mousePosRef = useRef({ x: -9999, y: -9999 });
  const cometPosRef = useRef({ x: -9999, y: -9999 });
  const trailRef = useRef<TrailPoint[]>([]);
  const cellsRef = useRef<ActiveCell[]>([]);
  const animationFrameRef = useRef<number>(0);
  const path2DRef = useRef<Path2D | null>(null);
  const transformRef = useRef({ scale: 1, offsetX: 0, offsetY: 0, cellH: 8, cellW: 4.5 });

  useEffect(() => {
    try {
      path2DRef.current = new Path2D(SVG_PATH);
    } catch {
      path2DRef.current = null;
    }
  }, []);

  const buildAsciiGrid = () => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || !path2DRef.current) return;

    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    if (width <= 0 || height <= 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const result = buildContourGrid(
      path2DRef.current,
      width,
      height,
      ORIGINAL_VB_W,
      ORIGINAL_VB_H
    );

    transformRef.current = {
      scale: result.scale,
      offsetX: result.offsetX,
      offsetY: result.offsetY,
      cellH: result.cellH,
      cellW: result.cellW
    };

    cellsRef.current = result.cells.map((c) => ({
      ...c,
      nextSwap: 0,
      heat: 0
    }));
  };

  useEffect(() => {
    buildAsciiGrid();
    window.addEventListener('resize', buildAsciiGrid);
    return () => window.removeEventListener('resize', buildAsciiGrid);
  }, []);

  useEffect(() => {
    if (!isHovered) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      trailRef.current = [];
      cometPosRef.current = { x: -9999, y: -9999 };
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { cellH, offsetX, offsetY, scale } = transformRef.current;
    let lastDraw = 0;

    const render = (now: number) => {
      animationFrameRef.current = requestAnimationFrame(render);
      if (now - lastDraw < 22) return;
      lastDraw = now;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const targetX = mousePosRef.current.x;
      const targetY = mousePosRef.current.y;
      const comet = cometPosRef.current;

      if (comet.x < -1000) {
        comet.x = targetX;
        comet.y = targetY;
      } else {
        comet.x += (targetX - comet.x) * 0.22;
        comet.y += (targetY - comet.y) * 0.22;
      }

      const trail = trailRef.current;
      trail.push({ x: comet.x, y: comet.y });
      if (trail.length > 25) trail.shift();

      ctx.save();
      // Recorte ao vetor para que nenhum caractere transborde a borda externa
      if (path2DRef.current) {
        ctx.translate(offsetX, offsetY);
        ctx.scale(scale, scale);
        ctx.clip(path2DRef.current);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      ctx.font = `700 ${Math.max(6, cellH * 0.96)}px "JetBrains Mono", "Courier New", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const cells = cellsRef.current;
      const radius = Math.max(38, Math.min(85, cellH * 4.2));

      // 1. Atualizar e desenhar células ASCII
      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];
        const dist = Math.hypot(c.x - comet.x, c.y - comet.y);

        if (dist < radius) {
          const falloff = 1 - dist / radius;
          c.heat = Math.max(c.heat, falloff);

          if (Math.random() < 0.35 + falloff * 0.45) {
            c.char = rnd(POOL);
            c.nextSwap = now + 40 + Math.random() * 80;
          }
        }

        c.heat *= 0.95; // Resfriamento suave da esteira do cometa

        if (c.heat < 0.05 && now > c.nextSwap) {
          c.char = c.baseChar;
        }

        if (c.heat > 0.45) {
          ctx.fillStyle = '#ffffff'; // Brilho intenso no rastro do cometa
        } else if (c.heat > 0.1) {
          ctx.fillStyle = `rgba(235, 245, 255, ${(0.8 + c.heat * 0.2).toFixed(2)})`;
        } else {
          ctx.fillStyle = 'rgba(205, 218, 245, 0.72)';
        }

        ctx.fillText(c.char, c.x, c.y);
      }

      // 2. Cauda afilada do cometa sobre o wordmark
      if (trail.length > 2) {
        ctx.lineCap = 'round';
        for (let i = 1; i < trail.length; i++) {
          const a0 = trail[i - 1];
          const a1 = trail[i];
          const f = i / trail.length;
          ctx.strokeStyle = `rgba(225, 240, 255, ${(f * f * 0.55).toFixed(2)})`;
          ctx.lineWidth = 1 + f * (cellH * 0.45);
          ctx.beginPath();
          ctx.moveTo(a0.x, a0.y);
          ctx.lineTo(a1.x, a1.y);
          ctx.stroke();
        }

        // Cabeça brilhante do cometa
        const hg = ctx.createRadialGradient(comet.x, comet.y, 0, comet.x, comet.y, radius * 0.7);
        hg.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        hg.addColorStop(0.25, 'rgba(235, 245, 255, 0.6)');
        hg.addColorStop(0.7, 'rgba(195, 220, 255, 0.12)');
        hg.addColorStop(1, 'rgba(195, 220, 255, 0)');
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.arc(comet.x, comet.y, radius * 0.7, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(comet.x, comet.y, Math.max(2.5, cellH * 0.25), 0, Math.PI * 2);
        ctx.fill();

        // Faíscas de glifos ASCII na cauda do cometa
        for (let i = 2; i < trail.length; i += 2) {
          const q = trail[trail.length - 1 - i];
          const f = 1 - i / trail.length;
          ctx.font = `${Math.floor(Math.max(6, cellH * 0.75 * f))}px "JetBrains Mono", monospace`;
          ctx.fillStyle = `rgba(240, 248, 255, ${(f * 0.65).toFixed(2)})`;
          ctx.fillText(
            rnd(POOL),
            q.x + (Math.random() - 0.5) * 6 * (1 - f) * 2,
            q.y + (Math.random() - 0.5) * 6 * (1 - f) * 2
          );
        }
      }

      ctx.restore();
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    buildAsciiGrid();
    handleMouseMove(e);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mousePosRef.current = { x: -9999, y: -9999 };
    cometPosRef.current = { x: -9999, y: -9999 };
    trailRef.current = [];
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    if (!t) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    buildAsciiGrid();
    mousePosRef.current = {
      x: t.clientX - rect.left,
      y: t.clientY - rect.top
    };
    setIsHovered(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    if (!t) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mousePosRef.current = {
      x: t.clientX - rect.left,
      y: t.clientY - rect.top
    };
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsHovered(false);
      mousePosRef.current = { x: -9999, y: -9999 };
      cometPosRef.current = { x: -9999, y: -9999 };
      trailRef.current = [];
    }, 1200);
  };

  return (
    <div
      ref={containerRef}
      className={`svg-ascii-wordmark svg-ascii-wordmark--${variant} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      role="banner"
      aria-label="luiz.edu"
    >
      {/* 1. SVG Vetorial Sólido */}
      <svg
        viewBox={`0 0 ${ORIGINAL_VB_W} ${ORIGINAL_VB_H}`}
        className={`svg-wordmark-solid ${isHovered ? 'svg-wordmark-solid--hidden' : ''}`}
        aria-hidden="true"
      >
        <path d={SVG_PATH} fill="currentColor" />
      </svg>

      {/* 2. Canvas ASCII com Rastro de Cometa e Hachura Diagonal Aino Agency */}
      <canvas
        ref={canvasRef}
        className={`svg-wordmark-canvas ${isHovered ? 'svg-wordmark-canvas--visible' : ''}`}
        aria-hidden="true"
      />
    </div>
  );
};
