import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  char: string;
  targetChar: string;
  charIndex: number;
  color: string;
}

const GLYPHS = ['·', ':', '+', '*', '%', '#', '@', '0', '1', 'X', 'A', 'I'];

export const DemoAsciiCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPhysicsActive, setIsPhysicsActive] = useState<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999, radius: 95 };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(rect.width, rect.height);
    };

    const initParticles = (w: number, h: number) => {
      particles = [];
      const cols = Math.min(Math.floor(w / 18), 48);
      const rows = Math.min(Math.floor(h / 20), 12);
      const startX = (w - cols * 18) / 2 + 9;
      const startY = (h - rows * 20) / 2 + 10;

      // Frase central em destaque na matriz
      const label = " NEXUS // AUTONOMOUS AI AGENTS // HIGH PERFORMANCE SYSTEMS ";
      let charCursor = 0;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = startX + c * 18;
          const y = startY + r * 20;

          let char = GLYPHS[(c + r) % GLYPHS.length];
          let color = 'rgba(148, 163, 184, 0.45)';

          // Linhas centrais formam o rótulo legível
          if (r === Math.floor(rows / 2) && c >= 4 && charCursor < label.length) {
            char = label[charCursor++];
            color = '#38bdf8';
          } else if (r === Math.floor(rows / 2) - 1 || r === Math.floor(rows / 2) + 1) {
            color = 'rgba(203, 213, 225, 0.6)';
          }

          particles.push({
            x,
            y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
            char,
            targetChar: char,
            charIndex: 0,
            color
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Dispara onda de choque elástica ao clicar
      particles.forEach((p) => {
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (180 - dist) / 180;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 18;
          p.vy += Math.sin(angle) * force * 18;
          p.char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };

    const handleTouchEnd = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('resize', resize, { passive: true });

    resize();

    // Loop de física e renderização a 60 FPS
    const tick = () => {
      animId = requestAnimationFrame(tick);
      if (document.hidden) return;

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion && isPhysicsActive) {
          // Interação do mouse (física elástica inspirada no motor aino)
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            p.vx -= Math.cos(angle) * force * 5;
            p.vy -= Math.sin(angle) * force * 5;
            // Scramble de caractere conforme deslocamento
            if (Math.random() < 0.2) {
              p.char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            }
          }

          // Força de retorno à mola (Hooke's law + damping)
          const k = 0.08;
          const damping = 0.86;
          const springX = (p.originX - p.x) * k;
          const springY = (p.originY - p.y) * k;

          p.vx = (p.vx + springX) * damping;
          p.vy = (p.vy + springY) * damping;

          p.x += p.vx;
          p.y += p.vy;

          // Retorna suavemente ao caractere original quando estabilizado
          if (Math.abs(p.vx) < 0.05 && Math.abs(p.vy) < 0.05 && p.char !== p.targetChar) {
            p.char = p.targetChar;
          }
        }

        // Desenha o caractere
        ctx.fillStyle = p.color;
        ctx.fillText(p.char, p.x, p.y);
      }
    };

    tick();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleCanvasClick);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', resize);
    };
  }, [isPhysicsActive]);

  return (
    <div className="demo-ascii-banner-wrap">
      <div className="demo-ascii-banner-header">
        <div className="demo-ascii-banner-title">
          <span className="demo-live-dot" />
          <span>MOTOR DE PARTÍCULAS EM ASCII CANVAS (FÍSICA 2D INTERATIVA)</span>
        </div>
        <div className="demo-ascii-banner-controls">
          <button
            type="button"
            className="demo-ascii-btn-toggle"
            onClick={() => setIsPhysicsActive(!isPhysicsActive)}
            title="Ativar/Desativar simulação de física de partículas"
          >
            Física: {isPhysicsActive ? 'Ligada' : 'Pausada'}
          </button>
          <span className="demo-ascii-hint">Passe o mouse ou clique para dispersar</span>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="demo-ascii-canvas-el"
        style={{ width: '100%', height: '220px', display: 'block', cursor: 'crosshair' }}
      />
    </div>
  );
};
