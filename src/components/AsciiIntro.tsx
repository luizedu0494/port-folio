import React, { useEffect, useRef, useState } from 'react';
import { ensureWordmarkImage, rasterChars, GridChars } from '../ascii/rasterize';
import { DENSITY_PALETTE, interpolateChar } from '../ascii/palette';

interface AsciiIntroProps {
  onEnter: (withAudio: boolean) => void;
}

const FIELD_CHARS = '!<>-_\\/[]{}—=+*^?#@$%&';

interface Particle {
  // redemoinho: rotação + fluxo pra fora
  angle: number;
  radius: number;
  omega: number;
  rSpeed: number;
  char: string;
  nextSwap: number;
  // física
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  // morph
  tx: number;
  ty: number;
  toIdx: number;
  delay: number;
  arrived: boolean;
  hasTarget: boolean;
}

type Phase = 'whirl' | 'collapse' | 'forming' | 'zoom' | 'done';

export const AsciiIntro: React.FC<AsciiIntroProps> = ({ onEnter }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0
  });
  const cursorPosRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0
  });
  const phaseRef = useRef<Phase>('whirl');
  const clickTimeRef = useRef(0);
  const phaseStartRef = useRef(0);
  const cursorPhaseRef = useRef(0);
  const gridRef = useRef<GridChars | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const audioRef = useRef(true);
  const finishedRef = useRef(false);
  const onEnterRef = useRef(onEnter);

  useEffect(() => {
    onEnterRef.current = onEnter;
  }, [onEnter]);

  const [reduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const isMobile = width <= 768;
    const cellH = isMobile ? 18 : 22;
    const cx = width / 2;
    const cy = height / 2;
    const maxR = Math.hypot(width, height) / 2;
    const dt = 1 / 30;

    // Wordmark pré-carregado — instantâneo no clique
    ensureWordmarkImage()
      .then((img) => {
        imgRef.current = img;
      })
      .catch((e) => console.error('wordmark falhou ao carregar', e));

    // Redemoinho: rotação + fluxo pra fora (nasce no centro, espirala até a borda, renasce)
    const N = reduced ? 0 : isMobile ? 560 : 1200;
    const particles: Particle[] = [];
    const respawn = (p: Particle, now: number, center = false) => {
      p.angle = Math.random() * Math.PI * 2;
      p.radius = center ? Math.random() * 30 : 10 + Math.random() * maxR * 0.9;
      // Rio calmo: rotação e deriva bem lentas
      p.omega = 0.05 + Math.random() * 0.1;
      p.rSpeed = 0.12 + Math.random() * 0.35;
      p.char = FIELD_CHARS[Math.floor(Math.random() * FIELD_CHARS.length)];
      p.nextSwap = now + 1500 + Math.random() * 4500;
      p.alpha = 0;
      p.hasTarget = false;
      p.arrived = false;
      p.vx = 0;
      p.vy = 0;
    };
    const now0 = performance.now();
    for (let i = 0; i < N; i++) {
      particles.push({
        angle: 0,
        radius: 0,
        omega: 0,
        rSpeed: 0,
        char: '',
        nextSwap: 0,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        alpha: 0,
        tx: 0,
        ty: 0,
        toIdx: 0,
        delay: 0,
        arrived: false,
        hasTarget: false
      });
      respawn(particles[i], now0);
      // alpha inicial conforme a distância (campo já estabelecido no load)
      particles[i].alpha = Math.min(0.6, particles[i].radius / (maxR * 0.5)) * 0.9;
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    let animationFrameId = 0;

    // FASE 1 — redemoinho: letras giram e fluem pra fora; cursor torce,
    // empurra e randomiza a região próxima (com aberração cromática)
    const drawWhirl = (now: number) => {
      ctx.font = `${cellH}px "Courier New", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // fase ancorada no cursor: o redemoinho torce suavemente pro mouse
      const targetPhase = ((mouseRef.current.x - cx) / width) * Math.PI * 1.2;
      cursorPhaseRef.current += (targetPhase - cursorPhaseRef.current) * 0.03;
      const phase = cursorPhaseRef.current;

      for (const p of particles) {
        p.angle += p.omega * dt * 0.9; // giro lento de rio
        p.radius += p.rSpeed * dt * 60 * 0.3; // deriva suave pra fora

        if (p.radius > maxR) {
          respawn(p, now, true); // renasce no centro — fluxo contínuo
        }

        const r = p.radius;
        p.x = cx + Math.cos(p.angle + phase) * r;
        p.y = cy + Math.sin(p.angle + phase) * r;

        // alpha: entra suave no nascimento, firma no meio, esvai na borda
        if (p.alpha < 0.5) p.alpha += 0.02;
        const edgeFade = Math.max(0.15, 1 - Math.max(0, (r - maxR * 0.75) / (maxR * 0.25)));

        if (now > p.nextSwap) {
          p.char = FIELD_CHARS[Math.floor(Math.random() * FIELD_CHARS.length)];
          p.nextSwap = now + 1500 + Math.random() * 4500;
        }

        // Cursor: repulsão ampla e forte — o rastro abre espaço pro CLIQUE
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.hypot(dx, dy);
        let drawX = p.x;
        let drawY = p.y;
        let boost = 0;
        if (dist < 200) {
          const falloff = 1 - dist / 200;
          if (Math.random() < 0.25 + falloff * 0.4) {
            p.char = FIELD_CHARS[Math.floor(Math.random() * FIELD_CHARS.length)];
          }
          const push = falloff * 16;
          drawX = p.x + (dx / (dist || 1)) * push;
          drawY = p.y + (dy / (dist || 1)) * push;
          boost = falloff;
        }

        const alpha = Math.min(1, p.alpha * edgeFade + boost * 0.5);
        if (boost > 0.25) {
          ctx.fillStyle = `rgba(255, 59, 111, ${alpha * 0.45})`;
          ctx.fillText(p.char, drawX + 1, drawY);
          ctx.fillStyle = `rgba(49, 224, 224, ${alpha * 0.45})`;
          ctx.fillText(p.char, drawX - 1, drawY);
          ctx.fillStyle = `rgba(235, 240, 248, ${alpha})`;
          ctx.fillText(p.char, drawX, drawY);
        } else {
          ctx.fillStyle = `rgba(203, 213, 225, ${alpha})`;
          ctx.fillText(p.char, drawX, drawY);
        }
      }
    };

    // FASE 2a — colapso: gravidade + explosão
    const drawCollapse = () => {
      ctx.font = `${cellH}px "Courier New", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (const p of particles) {
        if (p.vx === 0 && p.vy === 0) {
          const dx = p.x - cx;
          const dy = p.y - cy;
          const dist = Math.max(1, Math.hypot(dx, dy));
          const v = 2 + Math.random() * 6;
          p.vx = (dx / dist) * v;
          p.vy = (dy / dist) * v - 2;
        }
        p.x += p.vx * dt * 60;
        p.y += p.vy * dt * 60;
        p.vy += 0.16;
        p.alpha *= 0.99;
        if (p.alpha > 0.02) {
          ctx.fillStyle = `rgba(203, 213, 225, ${p.alpha})`;
          ctx.fillText(p.char, p.x, p.y);
        }
      }
    };

    // FASE 2b — formação: letras voam (spring) pras posições do nome
    // enquanto ele nasce pequeno e cresce; char percorre a paleta ordenada
    const drawForming = (now: number) => {
      const grid = gridRef.current;
      if (!grid) return;
      const elapsed = now - phaseStartRef.current;
      const u = Math.min(1, elapsed / 1700);
      const growEase = 1 - Math.pow(1 - u, 3);
      const scale = 0.15 + 0.85 * growEase;

      ctx.font = `${grid.cellH}px "Courier New", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const scalePos = (px: number, py: number) => ({
        sx: cx + (px - cx) * scale,
        sy: cy + (py - cy) * scale
      });

      for (const p of particles) {
        if (p.hasTarget) {
          const ax = (p.tx - p.x) * 0.012;
          const ay = (p.ty - p.y) * 0.012;
          p.vx = (p.vx + ax) * 0.82;
          p.vy = (p.vy + ay) * 0.82;
          p.x += p.vx * dt * 60;
          p.y += p.vy * dt * 60;

          const local = Math.max(0, elapsed - p.delay);
          const progress = Math.min(1, local / 700);
          p.char = interpolateChar(0, p.toIdx, progress);
          const dist = Math.hypot(p.tx - p.x, p.ty - p.y);
          if (!p.arrived && progress >= 1 && dist < grid.cellW) {
            p.arrived = true;
            p.alpha = 0.85;
          }
          const { sx, sy } = scalePos(p.x, p.y);
          ctx.fillStyle = `rgba(226, 232, 240, ${Math.max(p.alpha, 0.5)})`;
          ctx.fillText(p.char, sx, sy);
        } else {
          p.x += p.vx * dt * 60;
          p.y += p.vy * dt * 60;
          p.vy += 0.16;
          p.alpha *= 0.96;
          if (p.alpha > 0.02) {
            ctx.fillStyle = `rgba(203, 213, 225, ${p.alpha})`;
            ctx.fillText(p.char, p.x, p.y);
          }
        }
      }

      // Células sem partícula: fade-in escalado completando o nome
      const fadeIn = Math.min(1, Math.max(0, (elapsed - 800) / 500));
      if (fadeIn > 0) {
        for (const cell of grid.cells) {
          const px = cx - (grid.cols * grid.cellW) / 2 + cell.x * grid.cellW + grid.cellW / 2;
          const py = cy - (grid.rows * grid.cellH) / 2 + cell.y * grid.cellH + grid.cellH / 2;
          const { sx, sy } = scalePos(px, py);
          ctx.fillStyle = `rgba(226, 232, 240, ${0.85 * fadeIn})`;
          ctx.fillText(DENSITY_PALETTE[cell.idx], sx, sy);
        }
      }
    };

    // FASE 3 — zoom em direção ao usuário (t⁵): o nome cresce até as letras
    // passarem pela "câmera" e sumirem
    let fadeStarted = false;
    const drawZoom = (now: number) => {
      const grid = gridRef.current;
      if (!grid) {
        // Grade nunca montou (imagem falhou): sai direto
        if (!finishedRef.current) {
          finishedRef.current = true;
          setFading(true);
          onEnterRef.current(audioRef.current);
        }
        return;
      }
      const u = Math.min(1, (now - phaseStartRef.current) / 2000);
      const accel = u * u * u * u * u; // parado → dispara
      const scale = 1 + 2.4 * accel;
      const alpha = u < 0.6 ? 0.95 : Math.max(0, 0.95 * (1 - (u - 0.6) / 0.35));

      const drawCellW = grid.cellW * scale;
      const drawCellH = grid.cellH * scale;
      const startX = cx - (grid.cols * drawCellW) / 2;
      const startY = cy - (grid.rows * drawCellH) / 2;

      ctx.font = `${drawCellH}px "Courier New", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (const cell of grid.cells) {
        const px = startX + cell.x * drawCellW + drawCellW / 2;
        const py = startY + cell.y * drawCellH + drawCellH / 2;
        ctx.fillStyle = `rgba(235, 240, 248, ${alpha})`;
        ctx.fillText(DENSITY_PALETTE[cell.idx], px, py);
      }

      if (u > 0.75 && !fadeStarted) {
        fadeStarted = true;
        setFading(true);
      }
      if (u >= 1 && !finishedRef.current) {
        finishedRef.current = true;
        onEnterRef.current(audioRef.current);
      }
    };

    const drawCursorWord = () => {
      const target = mouseRef.current;
      const cur = cursorPosRef.current;
      const lerp = 0.14;
      cur.x += (target.x - cur.x) * lerp;
      cur.y += (target.y - cur.y) * lerp;
      ctx.font = `500 15px "JetBrains Mono", monospace`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      // Fundo escuro atrás da palavra — legível no espaço aberto pela repulsão
      const label = 'C L I Q U E';
      const w = ctx.measureText(label).width;
      ctx.fillStyle = 'rgba(7, 7, 9, 0.75)';
      ctx.beginPath();
      ctx.roundRect(cur.x + 10, cur.y - 8, w + 16, 24, 8);
      ctx.fill();
      ctx.fillStyle = 'rgba(241, 245, 249, 0.95)';
      ctx.fillText(label, cur.x + 18, cur.y + 4);
    };

    // Monta a grade do nome — SÓ muda de fase quando a grade está pronta
    // (se a imagem ainda não carregou, continua tentando a cada frame)
    const tryStartForming = (now: number): boolean => {
      const img = imgRef.current;
      if (!img) return false;
      try {
        // Grade legível: células menores (mais linhas) e nome largo
        const gridCellH = isMobile ? 12 : 16;
        const finalW = width * 0.85;
        const grid = rasterChars(img, gridCellH, finalW, 3);
        if (!grid.cells.length) return false;
        gridRef.current = grid;
        phaseRef.current = 'forming';
        phaseStartRef.current = now;

        const startX = cx - (grid.cols * grid.cellW) / 2;
        const startY = cy - (grid.rows * grid.cellH) / 2;
        const shuffled = [...grid.cells].sort(() => Math.random() - 0.5);
        let ci = 0;
        for (const p of particles) {
          if (p.alpha < 0.05) continue;
          if (ci < shuffled.length) {
            const cell = shuffled[ci++];
            p.hasTarget = true;
            p.tx = startX + cell.x * grid.cellW + grid.cellW / 2;
            p.ty = startY + cell.y * grid.cellH + grid.cellH / 2;
            p.toIdx = cell.idx;
            p.delay = Math.random() * 250;
            p.arrived = false;
          }
        }
        return true;
      } catch (e) {
        console.error('falha ao montar grade do nome', e);
        return false;
      }
    };

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (document.hidden) return;
      ctx.clearRect(0, 0, width, height);

      const phase = phaseRef.current;
      const elapsedClick = now - clickTimeRef.current;

      if (phase === 'whirl') {
        drawWhirl(now);
        drawCursorWord();
      } else if (phase === 'collapse') {
        drawCollapse();
        if (elapsedClick > 250) tryStartForming(now);
        // timeout de segurança: se a grade não montar em 2s, vai pro zoom (que sai com fallback)
        if (elapsedClick > 2000) {
          phaseRef.current = 'zoom';
          phaseStartRef.current = now;
        }
      } else if (phase === 'forming') {
        drawForming(now);
        if (elapsedClick > 2000) {
          phaseRef.current = 'zoom';
          phaseStartRef.current = now;
        }
      } else if (phase === 'zoom') {
        drawZoom(now);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [reduced]);

  const enter = (withAudio: boolean) => {
    audioRef.current = withAudio;
    if (finishedRef.current) return;
    if (reduced || phaseRef.current !== 'whirl') {
      finishedRef.current = true;
      onEnter(withAudio);
      return;
    }
    clickTimeRef.current = performance.now();
    phaseRef.current = 'collapse';
    phaseStartRef.current = clickTimeRef.current;
  };

  return (
    <div
      className={`ascii-intro-overlay ${fading ? 'ascii-intro-overlay--out' : ''}`}
      onClick={() => enter(true)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === 'Escape') enter(e.key === 'Escape' ? false : true);
      }}
      aria-label="Entrar no portfólio"
    >
      <canvas ref={canvasRef} className="ascii-intro-canvas" aria-hidden="true" />
      <span className="visually-hidden">LUIZ EDUARDO — clique para entrar</span>
      <button
        className="ascii-intro-silent"
        onClick={(e) => {
          e.stopPropagation();
          enter(false);
        }}
      >
        entrar em silêncio
      </button>
    </div>
  );
};
