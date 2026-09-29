import React, { useEffect, useRef } from 'react';

const SPARKS_POOL = ['·', '+', '*', '1', '0', '#', ':', '¬', '°', 'x'];

interface TrailPoint {
  x: number;
  y: number;
  time: number;
}

export const CosmicCometCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Apenas em desktops com mouse/ponteiro fino
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    let mx = -9999;
    let my = -9999;
    let bx = -9999;
    let by = -9999;
    let isHoveringInteractive = false;
    let isClicking = false;
    let isVisible = false;
    let haloScale = 1;

    const trail: TrailPoint[] = [];

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!isVisible) {
        bx = mx;
        by = my;
        isVisible = true;
      }

      // Detecta se o elemento sob o cursor é interativo
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, input, textarea, select, [role="button"], .btn-primary, .btn-secondary, .contact-pill, .project-card, .clickable');
        isHoveringInteractive = !!interactive;
      }
    };

    const onMouseDown = () => {
      isClicking = true;
    };

    const onMouseUp = () => {
      isClicking = false;
    };

    const onMouseLeave = () => {
      isVisible = false;
      mx = -9999;
      my = -9999;
    };

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    const draw = () => {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);

      if (!isVisible || mx < -100) return;

      // Suavização do cometa (lerp)
      bx += (mx - bx) * 0.32;
      by += (my - by) * 0.32;

      trail.push({ x: bx, y: by, time: performance.now() });
      if (trail.length > 20) trail.shift();

      // Transição suave de escala no hover
      const targetScale = isClicking ? 0.7 : isHoveringInteractive ? 1.65 : 1;
      haloScale += (targetScale - haloScale) * 0.2;

      // 1. Cauda afilada do cometa
      if (trail.length > 2) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = 1; i < trail.length; i++) {
          const p0 = trail[i - 1];
          const p1 = trail[i];
          const f = i / trail.length;

          ctx.strokeStyle = isHoveringInteractive
            ? `rgba(255, 255, 255, ${(f * f * 0.55).toFixed(2)})`
            : `rgba(215, 230, 255, ${(f * f * 0.45).toFixed(2)})`;
          ctx.lineWidth = 1 + f * 3.5;

          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
        }

        // Faíscas sutis de caracteres ASCII na cauda
        for (let i = 2; i < trail.length; i += 3) {
          const q = trail[trail.length - 1 - i];
          const f = 1 - i / trail.length;
          const char = SPARKS_POOL[(i * 3) % SPARKS_POOL.length];

          ctx.font = `500 ${Math.floor(7 + f * 4)}px "JetBrains Mono", monospace`;
          ctx.fillStyle = `rgba(240, 246, 255, ${(f * 0.42).toFixed(2)})`;
          ctx.fillText(
            char,
            q.x + (Math.sin(q.time * 0.01 + i) * 6 * (1 - f)),
            q.y + (Math.cos(q.time * 0.01 + i) * 6 * (1 - f))
          );
        }
      }

      // 2. Halo Cósmico / Brilho Radial da Cabeça
      const baseRadius = 24 * haloScale;
      const hg = ctx.createRadialGradient(bx, by, 0, bx, by, baseRadius);
      hg.addColorStop(0, isHoveringInteractive ? 'rgba(255, 255, 255, 0.95)' : 'rgba(245, 250, 255, 0.9)');
      hg.addColorStop(0.2, isHoveringInteractive ? 'rgba(230, 240, 255, 0.6)' : 'rgba(220, 235, 255, 0.45)');
      hg.addColorStop(0.65, 'rgba(180, 210, 255, 0.1)');
      hg.addColorStop(1, 'rgba(180, 210, 255, 0)');

      ctx.fillStyle = hg;
      ctx.beginPath();
      ctx.arc(bx, by, baseRadius, 0, Math.PI * 2);
      ctx.fill();

      // 3. Anel sutil de mira quando hover em link/botão
      if (isHoveringInteractive) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(bx, by, 16 * haloScale, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 4. Ponto Núcleo Branco Sólido
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(bx, by, isHoveringInteractive ? 2.5 : 3.5, 0, Math.PI * 2);
      ctx.fill();
    };

    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="cosmic-comet-cursor-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        pointerEvents: 'none',
        display: 'block'
      }}
    />
  );
};
