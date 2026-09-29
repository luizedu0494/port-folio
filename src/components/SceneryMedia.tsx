import React, { useEffect, useRef } from 'react';

interface SceneryMediaProps {
  videoSrc: string;
  posterSrc: string;
  wrapperClass: string;
  mediaClass: string;
}

/**
 * Mídia em Canvas com Chroma/Luminance Keying em tempo real.
 * Converte todos os traços do rosto e partículas para BRANCO PURO
 * e torna o fundo claro do vídeo 100% TOTALMENTE TRANSPARENTE (Alpha = 0).
 */
export const SceneryMedia: React.FC<SceneryMediaProps> = ({
  videoSrc,
  posterSrc,
  wrapperClass,
  mediaClass
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let offscreen = offscreenRef.current;
    if (!offscreen) {
      offscreen = document.createElement('canvas');
      offscreenRef.current = offscreen;
    }
    const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
    if (!offCtx) return;

    let animId: number;
    let isMounted = true;
    let isVisible = true;

    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.play().catch(() => {});

    // IntersectionObserver: pausa o processamento quando fora da tela (garante 60 FPS nas demais seções)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const processFrame = () => {
      if (!isMounted) return;
      animId = requestAnimationFrame(processFrame);

      if (!isVisible || video.readyState < 2 || video.paused) return;

      const vw = video.videoWidth || 360;
      const vh = video.videoHeight || 360;

      // Resolução de renderização nítida
      const renderW = Math.min(vw, 360);
      const renderH = Math.min(vh, 360);

      if (offscreen.width !== renderW || offscreen.height !== renderH) {
        offscreen.width = renderW;
        offscreen.height = renderH;
      }

      if (canvas.width !== renderW || canvas.height !== renderH) {
        canvas.width = renderW;
        canvas.height = renderH;
      }

      // Desenha o vídeo no offscreen para extração de pixels
      offCtx.drawImage(video, 0, 0, renderW, renderH);
      const imgData = offCtx.getImageData(0, 0, renderW, renderH);
      const data = imgData.data;

      // Processamento de Luminância: Transforma o rosto em branco e o fundo em transparente total
      const threshold = 218; // Limiar do fundo claro do vídeo

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;

        if (lum >= threshold) {
          // Fundo do vídeo: 100% transparente (Alpha 0)
          data[i + 3] = 0;
        } else {
          // Rosto e partículas: BRANCO PURO com intensidade proporcional à opacidade
          const intensity = Math.pow((threshold - lum) / threshold, 0.72);
          data[i] = 255;     // R Branco
          data[i + 1] = 255; // G Branco
          data[i + 2] = 255; // B Branco
          data[i + 3] = Math.min(255, Math.floor(intensity * 255 * 0.95)); // Alpha suave
        }
      }

      // Aplica a imagem com transparência alfa pura no canvas visível
      ctx.putImageData(imgData, 0, 0);
    };

    animId = requestAnimationFrame(processFrame);

    return () => {
      isMounted = false;
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      className={wrapperClass}
      style={{
        background: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      {/* Vídeo fonte oculto */}
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

      {/* Canvas com transparência alfa pura e traços brancos */}
      <canvas
        ref={canvasRef}
        className={mediaClass}
        role="presentation"
        aria-label="Escultura 3D flutuante transparente com traços brancos"
        style={{
          display: 'block',
          background: 'transparent',
          width: '100%',
          maxWidth: '320px',
          height: 'auto',
          filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.18))'
        }}
      />
    </div>
  );
};
