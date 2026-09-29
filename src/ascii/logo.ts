/**
 * Fonte do logo para a intro. Tenta o wordmark SVG; se ele não existir
 * (public/assets/wordmark.svg) ou falhar, desenha o texto "LUIZ EDUARDO"
 * direto no canvas. Assim a intro nunca fica sem logo.
 *
 * O desenho é feito em coordenadas físicas (px de tela); o chamador aplica
 * a transformação não-uniforme da grade de caracteres.
 */

export interface LogoSource {
  /** altura / largura */
  aspect: number;
  draw: (ctx: CanvasRenderingContext2D, cx: number, cy: number, widthPx: number) => void;
}

const WORDMARK_URL = '/assets/wordmark.svg';
const TEXT = 'LUIZ EDUARDO';
const FAMILY = '"Archivo Black", Anton, Orbitron, Impact, sans-serif';

const loadSvg = async (): Promise<LogoSource> => {
  const res = await fetch(WORDMARK_URL);
  if (!res.ok) throw new Error(`wordmark ${res.status}`);
  const svg = await res.text();
  const vb = svg.match(/viewBox="([\d.\-\s]+)"/);
  if (!vb) throw new Error('wordmark sem viewBox');
  const [, , w, h] = vb[1].trim().split(/\s+/).map(Number);
  if (!w || !h) throw new Error('viewBox inválido');
  // O SVG só tem viewBox: sem width/height o naturalWidth não é confiável.
  const sized = svg
    .replace('<svg', `<svg width="${w}" height="${h}"`)
    .replace('<path', '<path fill="#ffffff"');
  const url = URL.createObjectURL(new Blob([sized], { type: 'image/svg+xml' }));
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = url;
  });
  URL.revokeObjectURL(url);
  const aspect = h / w;
  return {
    aspect,
    draw: (ctx, cx, cy, widthPx) => {
      const hp = widthPx * aspect;
      ctx.drawImage(img, cx - widthPx / 2, cy - hp / 2, widthPx, hp);
    }
  };
};

const loadText = async (): Promise<LogoSource> => {
  try {
    await Promise.all([document.fonts.load('100px Anton'), document.fonts.load('100px "Archivo Black"')]);
  } catch {
    /* segue com a fonte de fallback */
  }
  const probe = document.createElement('canvas').getContext('2d');
  let w100 = 700;
  if (probe) {
    probe.font = `100px ${FAMILY}`;
    w100 = probe.measureText(TEXT).width || w100;
  }
  return {
    aspect: 75 / w100, // altura de caixa-alta ≈ 0.75 em
    draw: (ctx, cx, cy, widthPx) => {
      ctx.font = `${(widthPx / w100) * 100}px ${FAMILY}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(TEXT, cx, cy);
    }
  };
};

let cached: Promise<LogoSource> | null = null;
export const loadLogo = (): Promise<LogoSource> => {
  if (!cached) cached = loadSvg().catch(() => loadText());
  return cached;
};
