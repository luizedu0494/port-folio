import React, { useEffect, useRef, useState } from 'react';

interface AsciiObjectProps {
  videoSrc: string;
  posterSrc?: string;
  className?: string;
  charset?: string;
  resolution?: number; // Número de colunas no grid ASCII (ex: 56)
  color?: string;
  accentColor?: string;
  glow?: boolean;
}

const DEFAULT_CHARSET = " .·:+=*#%@";
const CYBER_EDGE_CHARS: Record<string, string> = {
  h: '-',
  v: '|',
  d1: '/',
  d2: '\\',
  cross: '+'
};

export const AsciiObject: React.FC<AsciiObjectProps> = ({
  videoSrc,
  posterSrc,
  className = '',
  charset = DEFAULT_CHARSET,
  resolution = 60,
  color = 'rgba(215, 235, 255, 0.92)',
  accentColor = 'rgba(56, 239, 125, 0.95)',
  glow = true
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [mode, setMode] = useState<'ascii' | 'hybrid' | 'edges'>('ascii');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const mousePosRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let offscreen = offscreenCanvasRef.current;
    if (!offscreen) {
      offscreen = document.createElement('canvas');
      offscreenCanvasRef.current = offscreen;
    }
    const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
    if (!offCtx) return;

    let animId: number;
    let isMounted = true;

    // Inicia reprodução do vídeo silencioso em loop
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.play().catch(() => {
      // Autoplay fallback
    });

    const render = () => {
      if (!isMounted) return;
      animId = requestAnimationFrame(render);

      if (video.readyState < 2) return;

      const rect = canvas.getBoundingClientRect();
      const W = rect.width || 280;
      const H = rect.height || 280;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (canvas.width !== Math.floor(W * dpr) || canvas.height !== Math.floor(H * dpr)) {
        canvas.width = Math.floor(W * dpr);
        canvas.height = Math.floor(H * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      const cols = resolution;
      const rows = Math.floor(cols * (H / W));

      if (offscreen.width !== cols || offscreen.height !== rows) {
        offscreen.width = cols;
        offscreen.height = rows;
      }

      // Desenha o frame do vídeo na resolução reduzida do grid ASCII
      offCtx.drawImage(video, 0, 0, cols, rows);
      const imgData = offCtx.getImageData(0, 0, cols, rows);
      const data = imgData.data;

      // Limpa o canvas principal
      ctx.clearRect(0, 0, W, H);

      const cellW = W / cols;
      const cellH = H / rows;
      const fontSize = Math.max(7, Math.floor(cellH * 1.05));

      ctx.font = `700 ${fontSize}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const mouseX = mousePosRef.current.x;
      const mouseY = mousePosRef.current.y;
      const hasMouse = mouseX > 0 && mouseY > 0;
      const infl = 70;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const idx = (y * cols + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          if (a < 15) continue;

          // Cálculo de Luminância
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          if (lum < 18) continue; // Pula fundo preto

          // Detecção de Contorno / Bordas (Sobel Simplificado)
          let edgeChar = '';
          if (x > 0 && x < cols - 1 && y > 0 && y < rows - 1) {
            const leftIdx = (y * cols + (x - 1)) * 4;
            const rightIdx = (y * cols + (x + 1)) * 4;
            const upIdx = ((y - 1) * cols + x) * 4;
            const downIdx = ((y + 1) * cols + x) * 4;

            const lumL = 0.299 * data[leftIdx] + 0.587 * data[leftIdx + 1] + 0.114 * data[leftIdx + 2];
            const lumR = 0.299 * data[rightIdx] + 0.587 * data[rightIdx + 1] + 0.114 * data[rightIdx + 2];
            const lumU = 0.299 * data[upIdx] + 0.587 * data[upIdx + 1] + 0.114 * data[upIdx + 2];
            const lumD = 0.299 * data[downIdx] + 0.587 * data[downIdx + 1] + 0.114 * data[downIdx + 2];

            const gx = lumR - lumL;
            const gy = lumD - lumU;
            const edgeMag = Math.hypot(gx, gy);

            if (edgeMag > 55) {
              const angle = Math.atan2(gy, gx);
              if (Math.abs(angle) < Math.PI / 8 || Math.abs(angle) > (7 * Math.PI) / 8) {
                edgeChar = CYBER_EDGE_CHARS.v;
              } else if (Math.abs(angle - Math.PI / 2) < Math.PI / 8 || Math.abs(angle + Math.PI / 2) < Math.PI / 8) {
                edgeChar = CYBER_EDGE_CHARS.h;
              } else if (angle > 0) {
                edgeChar = CYBER_EDGE_CHARS.d1;
              } else {
                edgeChar = CYBER_EDGE_CHARS.d2;
              }
            }
          }

          // Escolha do Caractere ASCII
          let charToDraw: string;
          if (mode === 'edges' && edgeChar) {
            charToDraw = edgeChar;
          } else if (mode === 'hybrid' && edgeChar && lum > 110) {
            charToDraw = edgeChar;
          } else {
            const charIdx = Math.floor((lum / 255) * (charset.length - 1));
            charToDraw = charset[Math.min(charIdx, charset.length - 1)];
          }

          if (!charToDraw || charToDraw === ' ') continue;

          const px = x * cellW + cellW / 2;
          const py = y * cellH + cellH / 2;

          // Efeito de Interatividade com o Mouse/Toque
          let heat = 0;
          if (hasMouse) {
            const dist = Math.hypot(px - mouseX, py - mouseY);
            if (dist < infl) {
              heat = 1 - dist / infl;
              if (Math.random() < heat * 0.3) {
                charToDraw = charset[Math.floor(Math.random() * charset.length)];
              }
            }
          }

          // Cor e Alpha dinâmicos
          const baseAlpha = Math.min(1, (lum / 255) * 0.95 + 0.15);
          const finalAlpha = Math.min(1, baseAlpha + heat * 0.5);

          if (heat > 0.25 || (edgeChar && lum > 160)) {
            ctx.fillStyle = accentColor;
          } else if (lum > 200) {
            ctx.fillStyle = `rgba(255, 255, 255, ${finalAlpha.toFixed(2)})`;
          } else {
            ctx.fillStyle = color.replace(/[\d.]+\)$/g, `${finalAlpha.toFixed(2)})`);
          }

          ctx.fillText(charToDraw, px, py);
        }
      }

      // Adiciona linhas de scanline sutis
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      for (let y = 0; y < H; y += 4) {
        ctx.fillRect(0, y, W, 1);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
    };
  }, [charset, resolution, color, accentColor, mode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePosRef.current = { x, y };

    // Efeito de inclinação 3D sutil
    const tiltX = ((y / rect.height) - 0.5) * -14;
    const tiltY = ((x / rect.width) - 0.5) * 14;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    mousePosRef.current = { x: -999, y: -999 };
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    mousePosRef.current = { x, y };
  };

  const handleTouchEnd = () => {
    mousePosRef.current = { x: -999, y: -999 };
  };

  const toggleMode = () => {
    setMode((prev) => (prev === 'ascii' ? 'hybrid' : prev === 'hybrid' ? 'edges' : 'ascii'));
  };

  return (
    <div
      ref={containerRef}
      className={`ascii-object-container ${className} ${glow ? 'ascii-glow' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
        willChange: 'transform'
      }}
    >
      {/* Vídeo de origem oculto / frame source */}
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        style={{ display: 'none' }}
      />

      {/* Canvas com renderizador ASCII em tempo real */}
      <canvas
        ref={canvasRef}
        className="ascii-object-canvas"
        aria-label="Renderização em ASCII Art 3D interativa"
      />

      {/* Moldura Cyber HUD & Cantoneiras */}
      <div className="ascii-hud-frame" aria-hidden="true">
        <span className="hud-corner hud-corner--tl">┌</span>
        <span className="hud-corner hud-corner--tr">┐</span>
        <span className="hud-corner hud-corner--bl">└</span>
        <span className="hud-corner hud-corner--br">┘</span>

        {/* Header com indicador de status */}
        <div className="ascii-hud-header">
          <button
            type="button"
            onClick={toggleMode}
            className="ascii-hud-mode-btn"
            title="Clique para alternar o modo de renderização ASCII"
          >
            <span className="hud-live-dot" />
            <span className="hud-label">ASCII_OBJ //{mode.toUpperCase()}</span>
          </button>
          <span className="hud-fps-tag">60FPS · LIVE</span>
        </div>
      </div>
    </div>
  );
};
