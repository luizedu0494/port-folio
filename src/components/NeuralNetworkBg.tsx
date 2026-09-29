import React, { useEffect, useRef } from 'react';

const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÁÉÍÓÚÃÕÇâêôàü#@$%&*+=<>?/!·-:";
const DENSE = "NAOI1234568908";
const SPARSE = "·-+:.";

const KEYWORDS = [
  'python',
  'react',
  'ts',
  'llm',
  'api',
  'ai',
  'agent',
  'rag',
  'groq',
  'node',
  'vite',
  'sql',
  'git',
  'langchain',
  'prompt',
  'supabase',
  'next',
  'docker',
  'openai',
  'fastapi',
  'vector',
  'linux',
  'css',
  'html',
  'json',
  'jwt',
  'rest',
  'postgres',
  'tailwind',
  'graphql',
  'auth',
  'ml',
  'embedding',
  'redux',
  'native',
  'dev',
  'cloud',
  'bot',
  'vibe',
  'model',
  'code',
  'deploy'
];

const rnd = (a: string | string[]) => a[Math.floor(Math.random() * a.length)];

interface CosmicParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  size: number;
  baseAlpha: number;
  heat: number;
  nextSwap: number;
  driftAngle: number;
  driftSpeed: number;
  isDense: boolean;
}

interface FloatingKeyword {
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
  displayChars: string[];
  baseAlpha: number;
  heat: number;
  driftAngle: number;
  driftSpeed: number;
  nextJitter: number;
}

interface TrailPoint {
  x: number;
  y: number;
}

export const NeuralNetworkBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 130 : 260;
    const keywordCount = isMobile ? 14 : 26;
    const maxLinkDist = isMobile ? 95 : 125;

    const particles: CosmicParticle[] = [];
    const keywords: FloatingKeyword[] = [];
    const stars: { x: number; y: number; s: number; a: number; speed: number }[] = [];

    // 1. Estrelas de fundo distantes
    for (let i = 0; i < 90; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        s: Math.random() * 1.3 + 0.6,
        a: Math.random() * 0.35 + 0.15,
        speed: 0.04 + Math.random() * 0.08
      });
    }

    const now0 = performance.now();

    // 2. Partículas Cósmicas em ASCII (alta densidade)
    for (let i = 0; i < particleCount; i++) {
      const isDense = Math.random() < 0.28;
      const initialChar = isDense
        ? rnd(DENSE)
        : Math.random() < 0.68
          ? rnd(POOL)
          : rnd(SPARSE);

      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * (isMobile ? 0.22 : 0.35),
        vy: (Math.random() - 0.5) * (isMobile ? 0.22 : 0.35),
        char: initialChar,
        size: isDense ? Math.random() * 4 + 10 : Math.random() * 5 + 7,
        baseAlpha: Math.random() * 0.32 + 0.18,
        heat: 0,
        nextSwap: now0 + 1000 + Math.random() * 4500,
        driftAngle: Math.random() * Math.PI * 2,
        driftSpeed: 0.15 + Math.random() * 0.3,
        isDense
      });
    }

    // 3. Palavras-Chave de Skills Flutuantes
    const shuffledKeywords = [...KEYWORDS].sort(() => Math.random() - 0.5);
    for (let i = 0; i < keywordCount; i++) {
      const kw = shuffledKeywords[i % shuffledKeywords.length];
      keywords.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.28),
        vy: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.28),
        text: kw,
        displayChars: kw.split(''),
        baseAlpha: Math.random() * 0.25 + 0.28,
        heat: 0,
        driftAngle: Math.random() * Math.PI * 2,
        driftSpeed: 0.12 + Math.random() * 0.22,
        nextJitter: 0
      });
    }

    let mx = -9999;
    let my = -9999;
    let bx = -9999;
    let by = -9999;
    let active = false;
    const trail: TrailPoint[] = [];

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!active) {
        bx = mx;
        by = my;
      }
      active = true;
    };

    const onMouseLeave = () => {
      active = false;
      mx = -9999;
      my = -9999;
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) {
        mx = t.clientX;
        my = t.clientY;
        if (!active) {
          bx = mx;
          by = my;
        }
        active = true;
      }
    };

    const onTouchEnd = () => {
      active = false;
      mx = -9999;
      my = -9999;
    };

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    let lastTime = performance.now();

    const draw = (now: number) => {
      animId = requestAnimationFrame(draw);
      const dt = Math.min(0.08, (now - lastTime) / 1000);
      lastTime = now;

      // Fundo espacial
      ctx.fillStyle = '#05060c';
      ctx.fillRect(0, 0, W, H);

      // Cometa lerp
      if (active) {
        bx += (mx - bx) * 0.18;
        by += (my - by) * 0.18;
        trail.push({ x: bx, y: by });
        if (trail.length > 40) trail.shift();
      } else if (trail.length > 0) {
        trail.shift();
      }

      // 1. Estrelas distantes
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.y -= s.speed * dt * 30;
        if (s.y < 0) {
          s.y = H;
          s.x = Math.random() * W;
        }
        const pulse = s.a + Math.sin(now * 0.0018 + i) * 0.08;
        ctx.fillStyle = `rgba(215, 228, 255, ${Math.max(0.06, pulse).toFixed(2)})`;
        ctx.fillRect(s.x, s.y, s.s, s.s);
      }

      // 2. Filamentos cósmicos sutis
      for (let i = 0; i < particles.length; i += 3) {
        for (let j = i + 1; j < Math.min(particles.length, i + 5); j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.hypot(dx, dy);

          if (d < maxLinkDist) {
            const linkAlpha = (1 - d / maxLinkDist) * 0.1 + Math.max(particles[i].heat, particles[j].heat) * 0.22;
            ctx.strokeStyle = `rgba(195, 215, 255, ${linkAlpha.toFixed(2)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // 3. Render das Palavras-Chave de Skills Flutuantes
      const infl = 140;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';

      for (let i = 0; i < keywords.length; i++) {
        const kw = keywords[i];

        // Deriva orbital
        kw.driftAngle += 0.006;
        kw.x += Math.cos(kw.driftAngle) * kw.driftSpeed * dt * 35 + kw.vx * dt * 50;
        kw.y += Math.sin(kw.driftAngle) * kw.driftSpeed * dt * 35 + kw.vy * dt * 50;

        // Wrap nas bordas
        if (kw.x < -80) kw.x = W + 40;
        else if (kw.x > W + 80) kw.x = -40;
        if (kw.y < -30) kw.y = H + 20;
        else if (kw.y > H + 30) kw.y = -20;

        // Interação com o cometa
        if (active && bx > 0) {
          const ox = kw.x - bx;
          const oy = kw.y - by;
          const d = Math.hypot(ox, oy);

          if (d < infl) {
            const f = 1 - d / infl;
            const push = f * f * 2.8;
            kw.x += (ox / (d || 1)) * push * 5;
            kw.y += (oy / (d || 1)) * push * 5;
            kw.heat = Math.max(kw.heat, f);

            // Jitter de caracteres na palavra quando aquecida pelo cometa
            if (now > kw.nextJitter) {
              kw.displayChars = kw.text.split('').map((ch) =>
                Math.random() < 0.45 * f ? rnd(POOL) : ch
              );
              kw.nextJitter = now + 45;
            }
          }
        }

        kw.heat *= 0.965; // Esfria gradualmente

        if (kw.heat < 0.08) {
          kw.displayChars = kw.text.split('');
        }

        const alpha = Math.min(1, kw.baseAlpha + kw.heat * 0.75);
        const fontSize = Math.floor(10 + kw.heat * 3);
        ctx.font = `600 ${fontSize}px "JetBrains Mono", ui-monospace, monospace`;

        if (kw.heat > 0.2) {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
        } else {
          ctx.fillStyle = `rgba(180, 205, 245, ${alpha.toFixed(2)})`;
        }

        ctx.fillText(`[${kw.displayChars.join('')}]`, kw.x, kw.y);
      }

      // 4. Render das Partículas de Caracteres Cósmicos
      ctx.textAlign = 'center';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.driftAngle += 0.007;
        p.x += Math.cos(p.driftAngle) * p.driftSpeed * dt * 38 + p.vx * dt * 55;
        p.y += Math.sin(p.driftAngle) * p.driftSpeed * dt * 38 + p.vy * dt * 55;

        if (p.x < -20) p.x = W + 20;
        else if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        else if (p.y > H + 20) p.y = -20;

        if (active && bx > 0) {
          const ox = p.x - bx;
          const oy = p.y - by;
          const d = Math.hypot(ox, oy);

          if (d < infl) {
            const f = 1 - d / infl;
            const push = f * f * 3.4;
            p.x += (ox / (d || 1)) * push * 6;
            p.y += (oy / (d || 1)) * push * 6;
            p.heat = Math.max(p.heat, f);

            if (Math.random() < 0.2 + f * 0.35) {
              p.char = rnd(POOL);
            }
          }
        }

        if (now > p.nextSwap) {
          if (p.isDense) {
            p.char = rnd(DENSE);
          } else {
            p.char = Math.random() < 0.7 ? rnd(POOL) : rnd(SPARSE);
          }
          p.nextSwap = now + 1500 + Math.random() * 4500;
        }

        p.heat *= 0.965;

        const currentAlpha = Math.min(0.95, p.baseAlpha + p.heat * 0.65);
        const glowColor = p.heat > 0.18
          ? `rgba(255, 255, 255, ${currentAlpha.toFixed(2)})`
          : `rgba(195, 215, 250, ${currentAlpha.toFixed(2)})`;

        ctx.font = `${p.isDense ? '700' : '500'} ${Math.floor(p.size + p.heat * 3)}px "JetBrains Mono", ui-monospace, monospace`;
        ctx.fillStyle = glowColor;
        ctx.fillText(p.char, p.x, p.y);
      }
    };

    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="neural-network-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block'
      }}
    />
  );
};
