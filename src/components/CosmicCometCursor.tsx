import React, { useEffect, useRef } from 'react';

const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@$%&*+=<>?/!·-:";

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

    // Rastro calibrado no meio-termo padrão para ambas as partes
    const MAX_TRAIL = 30;
    const trail: TrailPoint[] = [];

    let lastTargetCheck = 0;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!isVisible) {
        bx = mx;
        by = my;
        isVisible = true;
      }

      // Throttle de verificação de elemento interativo sob o cursor
      const now = performance.now();
      if (now - lastTargetCheck > 60) {
        lastTargetCheck = now;
        const target = e.target as HTMLElement | null;
        if (target) {
          isHoveringInteractive = !!target.closest(
            'a, button, input, textarea, select, [role="button"], .btn-primary, .btn-secondary, .contact-pill, .project-card, .featured-card, .cert-card, .flip-card-wrapper, .clickable, .process-card, .skill-matrix-card, .skill-pill-item'
          );
        }
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

      // Suavização do cometa idêntica em ambas as partes (interpolação 0.25)
      bx += (mx - bx) * 0.25;
      by += (my - by) * 0.25;

      const now = performance.now();
      trail.push({ x: bx, y: by, time: now });
      while (trail.length > MAX_TRAIL) {
        trail.shift();
      }

      // Transição suave de escala no hover
      const targetScale = isClicking ? 0.75 : isHoveringInteractive ? 1.45 : 1;
      haloScale += (targetScale - haloScale) * 0.2;

      // ── 1. Rastro Fluido do Cometa (Igual à Primeira Parte) ──
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let i = 1; i < trail.length; i++) {
        const a0 = trail[i - 1];
        const a1 = trail[i];
        const f = i / trail.length;

        ctx.strokeStyle = isHoveringInteractive
          ? `rgba(255, 255, 255, ${(f * f * 0.7).toFixed(2)})`
          : `rgba(220, 235, 255, ${(f * f * 0.6).toFixed(2)})`;
        ctx.lineWidth = 1 + f * 4.5 * (isHoveringInteractive ? 1.2 : 1);

        ctx.beginPath();
        ctx.moveTo(a0.x, a0.y);
        ctx.lineTo(a1.x, a1.y);
        ctx.stroke();
      }

      // ── 2. Halo Cósmico / Brilho Radial da Cabeça ──
      const baseRadius = 26 * haloScale;
      const hg = ctx.createRadialGradient(bx, by, 0, bx, by, baseRadius);
      hg.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      hg.addColorStop(0.25, isHoveringInteractive ? 'rgba(240, 248, 255, 0.7)' : 'rgba(235, 245, 255, 0.6)');
      hg.addColorStop(0.6, 'rgba(190, 215, 255, 0.15)');
      hg.addColorStop(1, 'rgba(190, 215, 255, 0)');

      ctx.fillStyle = hg;
      ctx.beginPath();
      ctx.arc(bx, by, baseRadius, 0, Math.PI * 2);
      ctx.fill();

      // ── 3. Ponto Núcleo Branco Sólido ──
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(bx, by, isHoveringInteractive ? 2.5 : 3.5, 0, Math.PI * 2);
      ctx.fill();

      // ── 4. Faíscas ASCII na Cauda (Idênticas à Primeira Parte) ──
      for (let i = 2; i < trail.length; i += 2) {
        const q = trail[trail.length - 1 - i];
        const f = 1 - i / trail.length;
        ctx.font = `${Math.floor(7 + f * 6)}px "JetBrains Mono", monospace`;
        ctx.fillStyle = `rgba(240, 245, 255, ${(f * 0.65).toFixed(2)})`;
        const char = POOL[Math.floor(Math.random() * POOL.length)];
        ctx.fillText(
          char,
          q.x + (Math.random() - 0.5) * 10 * (1 - f) * 2,
          q.y + (Math.random() - 0.5) * 10 * (1 - f) * 2
        );
      }

      // ── 5. Anel Sutil de Mira em Elementos Interativos ──
      if (isHoveringInteractive) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(bx, by, 16 * haloScale, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    animId = requestAnimationFrame(draw);

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        animId = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
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
