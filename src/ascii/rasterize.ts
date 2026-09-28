/**
 * Rasterização do wordmark SVG → grade de caracteres (luminância → paleta).
 * Usado pelo motor de partículas da intro (formação + zoom por frame).
 */

import { paletteIndexForDensity } from './palette';

export interface GridCell {
  x: number; // coluna
  y: number; // linha
  idx: number; // índice na paleta de densidade
}

export interface GridChars {
  cols: number;
  rows: number;
  cellW: number;
  cellH: number;
  cells: GridCell[];
}

const WORDMARK_URL = '/assets/wordmark.svg';

let wordmarkImg: HTMLImageElement | null = null;
let wordmarkPromise: Promise<HTMLImageElement> | null = null;

/** Carrega (uma vez) o wordmark com fill branco para rasterização */
export const ensureWordmarkImage = (): Promise<HTMLImageElement> => {
  if (wordmarkImg) return Promise.resolve(wordmarkImg);
  if (!wordmarkPromise) {
    wordmarkPromise = fetch(WORDMARK_URL)
      .then((r) => r.text())
      .then(
        (svg) =>
          new Promise<HTMLImageElement>((resolve, reject) => {
            const rasterSvg = svg.replace('<path', '<path fill="#ffffff"');
            const blob = new Blob([rasterSvg], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const img = new Image();
            img.onload = () => {
              wordmarkImg = img;
              URL.revokeObjectURL(url);
              resolve(img);
            };
            img.onerror = (e) => {
              URL.revokeObjectURL(url);
              reject(e);
            };
            img.src = url;
          })
      );
  }
  return wordmarkPromise;
};

// Canvas offscreen reaproveitado (o zoom re-rasteriza a cada frame)
const off = document.createElement('canvas');
const offCtx = off.getContext('2d');

/**
 * Rasteriza o wordmark numa grade de chars. cellH fixa; largura define cols.
 * SS = supersampling do max-pooling (2 basta durante animação).
 */
export const rasterChars = (
  img: HTMLImageElement,
  cellH: number,
  widthPx: number,
  SS = 2
): GridChars => {
  const cellW = cellH * 0.6 * 1.35;
  const cols = Math.max(4, Math.floor(widthPx / cellW));
  const aspect = img.naturalHeight / img.naturalWidth;
  const rows = Math.max(2, Math.round((cols * cellW * aspect) / cellH));

  if (!offCtx) return { cols, rows, cellW, cellH, cells: [] };

  off.width = cols * SS;
  off.height = rows * SS;
  offCtx.fillStyle = '#000';
  offCtx.fillRect(0, 0, off.width, off.height);
  offCtx.drawImage(img, 0, 0, off.width, off.height);

  const pixels = offCtx.getImageData(0, 0, off.width, off.height).data;
  const cells: GridCell[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let max = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const a = pixels[((y * SS + sy) * off.width + (x * SS + sx)) * 4];
          if (a > max) max = a;
        }
      }
      const d = max / 255;
      if (d < 0.5) continue;
      cells.push({ x, y, idx: paletteIndexForDensity(d) });
    }
  }
  return { cols, rows, cellW, cellH, cells };
};

/**
 * Rasteriza TEXTO (mesma fonte/letter-spacing do DOM) numa grade de chars.
 * O texto é desenhado a partir do canto superior esquerdo — as células
 * mapeiam 1:1 a partir de rect.left/rect.top do elemento.
 */
export const rasterText = (
  text: string,
  fontSpec: string,
  letterSpacingPx: number,
  cellH: number,
  SS = 4
): (GridChars & { widthPx: number }) | null => {
  const cellW = cellH * 0.6 * 1.35;
  const measure = document.createElement('canvas').getContext('2d');
  if (!measure) return null;
  measure.font = fontSpec;
  // largura do texto em px de tela (+ letter-spacing por caractere)
  let textW = 0;
  for (const ch of text) textW += measure.measureText(ch).width + letterSpacingPx;
  textW -= letterSpacingPx;

  const fontSize = parseFloat(fontSpec.match(/(\d+(\.\d+)?)px/)?.[1] || '40');
  const cols = Math.max(4, Math.floor(textW / cellW));
  const rows = Math.max(3, Math.ceil((fontSize * 1.35) / cellH));

  off.width = cols * SS;
  off.height = rows * SS;
  if (!offCtx) return null;
  offCtx.fillStyle = '#000';
  offCtx.fillRect(0, 0, off.width, off.height);
  offCtx.fillStyle = '#fff';
  offCtx.strokeStyle = '#fff';

  // Coordenadas do offscreen: 1 célula = SS px. A fonte é convertida
  // de px de tela para px de célula (fontSize/cellH) antes do SS.
  const fontCells = (fontSize / cellH) * SS;
  const family = fontSpec.replace(/^[^ ]+ [^ ]+ /, '');
  offCtx.font = `700 ${fontCells}px ${family}`;
  try {
    offCtx.letterSpacing = `${(letterSpacingPx / cellH) * SS}px`;
  } catch {
    /* navegadores sem ctx.letterSpacing */
  }
  offCtx.textAlign = 'left';
  offCtx.textBaseline = 'alphabetic';
  const baseline = rows * SS * 0.78; // ~ascend da fonte dentro da caixa
  const scale = SS / cellH; // px de tela → px de célula
  let x = 0;
  for (const ch of text) {
    const w = (measure.measureText(ch).width + letterSpacingPx) * scale;
    if (ch !== ' ') {
      offCtx.fillText(ch, x, baseline);
      offCtx.lineWidth = Math.max(1, fontCells / 14);
      offCtx.strokeText(ch, x, baseline);
    }
    x += w;
  }

  const pixels = offCtx.getImageData(0, 0, off.width, off.height).data;
  const cells: GridCell[] = [];
  for (let y = 0; y < rows; y++) {
    for (let cx2 = 0; cx2 < cols; cx2++) {
      let max = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const a = pixels[((y * SS + sy) * off.width + (cx2 * SS + sx)) * 4];
          if (a > max) max = a;
        }
      }
      const d = max / 255;
      if (d < 0.5) continue;
      cells.push({ x: cx2, y, idx: paletteIndexForDensity(d) });
    }
  }
  return { cols, rows, cellW, cellH, cells, widthPx: textW };
};
