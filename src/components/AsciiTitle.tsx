import React, { useEffect, useRef, useState, useCallback } from 'react';

interface AsciiTitleProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
  className?: string;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

const ASCII_SPARKS = ['·', '+', '*', 'x', '1', '0', '~', ':', '¬', '°', '·'];
const rnd = (a: string[]) => a[Math.floor(Math.random() * a.length)];

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  life: number;
  maxLife: number;
  size: number;
}

interface TrailPoint {
  x: number;
  y: number;
}

export const AsciiTitle: React.FC<AsciiTitleProps> = ({
  text,
  as: Component = 'h2',
  className = '',
  icon,
  style
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeCharIndex, setActiveCharIndex] = useState<number | null>(null);

  const mousePosRef = useRef({ x: -9999, y: -9999 });
  const cometPosRef = useRef({ x: -9999, y: -9999 });
  const trailRef = useRef<TrailPoint[]>([]);
  const sparksRef = useRef<Spark[]>([]);
  const animFrameRef = useRef<number>(0);
  const charElementsRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Split text into characters while preserving whitespace and word formatting
  const chars = Array.from(text);

  const resizeCanvas = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const rect = container.getBoundingClientRect();
    const width = Math.ceil(rect.width);
    const height = Math.ceil(rect.height);
    if (width <= 0 || height <= 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  useEffect(() => {
    if (!isHovered) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      trailRef.current = [];
      sparksRef.current = [];
      cometPosRef.current = { x: -9999, y: -9999 };
      setActiveCharIndex(null);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastDraw = 0;

    const render = (now: number) => {
      animFrameRef.current = requestAnimationFrame(render);
      if (now - lastDraw < 18) return;
      lastDraw = now;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      ctx.clearRect(0, 0, width, height);

      const targetX = mousePosRef.current.x;
      const targetY = mousePosRef.current.y;
      const comet = cometPosRef.current;

      if (comet.x < -1000) {
        comet.x = targetX;
        comet.y = targetY;
      } else {
        comet.x += (targetX - comet.x) * 0.28;
        comet.y += (targetY - comet.y) * 0.28;
      }

      // Trail
      const trail = trailRef.current;
      trail.push({ x: comet.x, y: comet.y });
      if (trail.length > 16) trail.shift();

      // Emit new ASCII sparks
      if (Math.random() < 0.6) {
        sparksRef.current.push({
          x: comet.x + (Math.random() - 0.5) * 14,
          y: comet.y + (Math.random() - 0.5) * 14,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          char: rnd(ASCII_SPARKS),
          life: 0,
          maxLife: 20 + Math.random() * 25,
          size: 8 + Math.random() * 4
        });
      }

      // Update & render sparks
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const sparks = sparksRef.current;
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        const progress = s.life / s.maxLife;

        if (progress >= 1) {
          sparks.splice(i, 1);
          continue;
        }

        const alpha = (1 - progress) * 0.75;
        ctx.font = `600 ${s.size}px "JetBrains Mono", monospace`;
        ctx.fillStyle = `rgba(226, 232, 240, ${alpha.toFixed(2)})`;
        ctx.fillText(s.char, s.x, s.y);
      }

      // Render comet trail line
      if (trail.length > 2) {
        ctx.lineCap = 'round';
        for (let i = 1; i < trail.length; i++) {
          const p0 = trail[i - 1];
          const p1 = trail[i];
          const f = i / trail.length;
          ctx.strokeStyle = `rgba(240, 248, 255, ${(f * f * 0.45).toFixed(2)})`;
          ctx.lineWidth = 1 + f * 2.5;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
        }

        // Comet Head Glow (Hero Style)
        const hg = ctx.createRadialGradient(comet.x, comet.y, 0, comet.x, comet.y, 28);
        hg.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
        hg.addColorStop(0.3, 'rgba(226, 232, 240, 0.4)');
        hg.addColorStop(0.8, 'rgba(148, 163, 184, 0.08)');
        hg.addColorStop(1, 'rgba(148, 163, 184, 0)');
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.arc(comet.x, comet.y, 28, 0, Math.PI * 2);
        ctx.fill();

        // White core dot
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(comet.x, comet.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePosRef.current = { x, y };

    // Find which letter is closest to the cursor to apply subtle local luminescence
    let closestIdx: number | null = null;
    let minDist = 32;

    for (let i = 0; i < charElementsRef.current.length; i++) {
      const el = charElementsRef.current[i];
      if (!el) continue;
      const cRect = el.getBoundingClientRect();
      const cx = cRect.left + cRect.width / 2 - rect.left;
      const cy = cRect.top + cRect.height / 2 - rect.top;
      const dist = Math.hypot(x - cx, y - cy);
      if (dist < minDist) {
        minDist = dist;
        closestIdx = i;
      }
    }
    setActiveCharIndex(closestIdx);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    resizeCanvas();
    handleMouseMove(e);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setActiveCharIndex(null);
    mousePosRef.current = { x: -9999, y: -9999 };
    cometPosRef.current = { x: -9999, y: -9999 };
    trailRef.current = [];
    sparksRef.current = [];
  };

  return (
    <Component
      className={`ascii-title-heading ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: icon ? '12px' : '0',
        margin: 0,
        ...style
      }}
    >
      {icon && (
        <span
          className="ascii-title-icon"
          style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}
        >
          {icon}
        </span>
      )}
      <span
        ref={containerRef}
        className="ascii-title-wrapper"
        style={{
          position: 'relative',
          display: 'inline-block',
          cursor: 'default',
          verticalAlign: 'middle'
        }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Full readable word in its exact typography */}
        <span
          className="ascii-title-text"
          style={{
            display: 'inline-block',
            position: 'relative',
            zIndex: 1,
            transition: 'color 0.2s ease, text-shadow 0.2s ease'
          }}
        >
          {chars.map((char, idx) => {
            const isNearCursor = activeCharIndex !== null && Math.abs(activeCharIndex - idx) <= 1;
            return (
              <span
                key={idx}
                ref={(el) => {
                  charElementsRef.current[idx] = el;
                }}
                className={`ascii-title-char ${isNearCursor ? 'ascii-title-char--active' : ''}`}
                style={{
                  display: 'inline-block',
                  color: isNearCursor ? '#ffffff' : 'inherit',
                  textShadow: isNearCursor
                    ? '0 0 10px rgba(255, 255, 255, 0.85), 0 0 20px rgba(226, 232, 240, 0.45)'
                    : 'none',
                  transition: 'color 0.15s ease, text-shadow 0.15s ease, transform 0.15s ease',
                  transform: isNearCursor ? 'translateY(-1px)' : 'none'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </span>

        {/* Hero-like comet wake & floating ASCII particle sparks */}
        <canvas
          ref={canvasRef}
          className="ascii-title-canvas"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 2,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.2s ease'
          }}
          aria-hidden="true"
        />
      </span>
    </Component>
  );
};
