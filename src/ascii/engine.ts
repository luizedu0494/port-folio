/**
 * Motor ASCII — canvas global compartilhado por todas as superfícies ASCII do site.
 * Um único RAF loop (~30fps) desenha as superfícies registradas sobre o conteúdo
 * (pointer-events: none), rastreando o mouse globalmente.
 */

export interface AsciiSurface {
  draw: (ctx: CanvasRenderingContext2D, time: number, mouse: MouseState) => void;
}

export interface MouseState {
  x: number;
  y: number;
}

const surfaces = new Set<AsciiSurface>();
const mouse: MouseState = { x: -9999, y: -9999 };

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let animationFrameId = 0;
let lastTime = 0;
let width = 0;
let height = 0;

const handleMouseMove = (e: MouseEvent) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
};

const handleMouseOut = (e: MouseEvent) => {
  if (!e.relatedTarget) {
    mouse.x = -9999;
    mouse.y = -9999;
  }
};

const resize = () => {
  if (!canvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
};

const tick = (time: number) => {
  animationFrameId = requestAnimationFrame(tick);
  if (document.hidden || !ctx) return;
  if (time - lastTime < 33) return;
  // Com movimento reduzido, o tempo é congelado: frame estático, sem ondulação
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  lastTime = time;
  ctx.clearRect(0, 0, width, height);
  const drawTime = reduced ? 0 : time;
  surfaces.forEach((s) => s.draw(ctx!, drawTime, mouse));
};

export const registerAsciiSurface = (surface: AsciiSurface): (() => void) => {
  if (surfaces.size === 0) {
    canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText =
      'position:fixed;top:0;left:0;z-index:1;pointer-events:none;user-select:none;';
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    animationFrameId = requestAnimationFrame(tick);
  }
  surfaces.add(surface);
  return () => {
    surfaces.delete(surface);
    if (surfaces.size === 0 && canvas) {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      canvas.remove();
      canvas = null;
      ctx = null;
    }
  };
};
