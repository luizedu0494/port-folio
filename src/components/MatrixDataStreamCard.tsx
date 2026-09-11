import React, { useEffect, useRef } from 'react';

export const MatrixDataStreamCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = 120);
    const height = (canvas.height = 70);

    const characters = '010101010101ABCDEFAGENTS_AI_LANGCHAIN_PYTHON_REACT';
    const fontSize = 9;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -10);
    }

    const render = () => {
      // Fundo semi-transparente para criar o rastro da chuva de dados Matrix
      ctx.fillStyle = 'rgba(21, 13, 40, 0.25)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(157, 78, 221, 0.75)'; // Electric Purple estilo Matrix futurista
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.96) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-card-stream"
      width={120}
      height={70}
    />
  );
};
