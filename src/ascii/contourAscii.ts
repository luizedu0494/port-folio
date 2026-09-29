/**
 * Gerador de Arte ASCII com Contorno Direcional e Preenchimento em Hachura (Aino Agency style)
 * 
 * Baseado na análise de pixel e topologia dos glifos do aino.agency:
 * - Interior dos traços: Hachura diagonal uniforme ('/')
 * - Borda superior: Ponto, traço e aspas ('.', '_', '\'', '"', '^')
 * - Borda inferior: Sublinhado, vírgula e hífen ('_', ',', '-', '~')
 * - Borda lateral esquerda: Vírgula, ponto-e-vírgula e exclamação (',', ';', '!', '/')
 * - Borda lateral direita: Ponto, aspas e barra invertida ('.', '"', '\'', '\\', ';')
 * - Vértices e curvas: Caracteres direcionais de transição ('^', '*', ':', ';', '!', '-')
 */

export interface ContourAsciiCell {
  x: number;
  y: number;
  gridX: number;
  gridY: number;
  baseChar: string;
  char: string;
  isEdge: boolean;
  density: number;
}

export interface ContourGridResult {
  cells: ContourAsciiCell[];
  cols: number;
  rows: number;
  cellW: number;
  cellH: number;
  renderW: number;
  renderH: number;
  offsetX: number;
  offsetY: number;
  scale: number;
}

/**
 * Mapeia a vizinhança 3x3 de densidade e coordenadas para o glifo exato do Aino Agency:
 * - Interior sólido: Predominantemente 'N' (com âncoras densas 'O', '0', '8', '9', 'A')
 * - Extremidades planas de hastes (topo/base): Séries numéricas '3', '-', '0', '9' (ex: -333333-)
 * - Bordas laterais e curvas: Acentos e símbolos direcionais ('<', '>', '!', '?', '+', '/', '\\', ':', ';', '_', '\'', '"', '.')
 */
export function getAinoGlyph(
  density: number,
  top: number,
  bottom: number,
  left: number,
  right: number,
  topLeft: number,
  topRight: number,
  bottomLeft: number,
  bottomRight: number,
  gridX: number = 0,
  gridY: number = 0
): { char: string; isEdge: boolean } {
  // 1. Fora do formato
  if (density < 0.28) {
    return { char: '', isEdge: false };
  }

  // 2. Interior sólido dos traços (todos os vizinhos preenchidos)
  const isFullInterior =
    top >= 0.42 &&
    bottom >= 0.42 &&
    left >= 0.42 &&
    right >= 0.42 &&
    topLeft >= 0.35 &&
    topRight >= 0.35 &&
    bottomLeft >= 0.35 &&
    bottomRight >= 0.35;

  if (isFullInterior && density >= 0.65) {
    // Padrão Aino: o 'N' é a espinha dorsal de preenchimento pesado
    const hash = (gridX * 13 + gridY * 37) % 100;
    if (hash < 72) {
      return { char: 'N', isEdge: false };
    } else if (hash < 82) {
      return { char: 'O', isEdge: false };
    } else if (hash < 90) {
      return { char: '0', isEdge: false };
    } else if (hash < 95) {
      return { char: '8', isEdge: false };
    } else {
      return { char: '9', isEdge: false };
    }
  }

  // 3. Detecção de contornos e extremidades
  const hasTop = top >= 0.35;
  const hasBottom = bottom >= 0.35;
  const hasLeft = left >= 0.35;
  const hasRight = right >= 0.35;

  // Topo plano de haste (ex: topo reto de 'l', 'i', 'u', 'n' -> padrão :333333- ou -333333)
  if (!hasTop && hasBottom && hasLeft && hasRight) {
    if (!topLeft) return { char: ':', isEdge: true };
    if (!topRight) return { char: '-', isEdge: true };
    return { char: '3', isEdge: true };
  }

  // Base plana de haste (ex: base reta de 'l', 'i', 'n' -> padrão -333333+ ou !33333/)
  if (hasTop && !hasBottom && hasLeft && hasRight) {
    if (!bottomLeft) return { char: '-', isEdge: true };
    if (!bottomRight) return { char: '+', isEdge: true };
    return { char: '3', isEdge: true };
  }

  // Borda lateral esquerda vertical
  if (hasTop && hasBottom && !hasLeft && hasRight) {
    const hash = (gridY * 17) % 10;
    if (hash === 0) return { char: '<', isEdge: true };
    if (hash === 1) return { char: '!', isEdge: true };
    if (hash === 2) return { char: '?', isEdge: true };
    if (hash === 3) return { char: '+', isEdge: true };
    if (hash === 4) return { char: '/', isEdge: true };
    if (hash === 5) return { char: '-', isEdge: true };
    return { char: 'N', isEdge: true };
  }

  // Borda lateral direita vertical
  if (hasTop && hasBottom && hasLeft && !hasRight) {
    const hash = (gridY * 19) % 10;
    if (hash === 0) return { char: '>', isEdge: true };
    if (hash === 1) return { char: '!', isEdge: true };
    if (hash === 2) return { char: '?', isEdge: true };
    if (hash === 3) return { char: '+', isEdge: true };
    if (hash === 4) return { char: '\\', isEdge: true };
    if (hash === 5) return { char: '-', isEdge: true };
    return { char: 'N', isEdge: true };
  }

  // Curva superior-esquerda (arco do 'a', 'n', 'o', 'd')
  if (!hasTop && !hasLeft) {
    if (density < 0.42) return { char: '-', isEdge: true };
    if (topRight > 0.4) return { char: '<', isEdge: true };
    return { char: '!', isEdge: true };
  }

  // Curva superior-direita (arco do 'a', 'o', 'd')
  if (!hasTop && !hasRight) {
    if (density < 0.42) return { char: '-', isEdge: true };
    if (topLeft > 0.4) return { char: '>', isEdge: true };
    return { char: '?', isEdge: true };
  }

  // Curva inferior-esquerda (fundo do 'u', 'd', 'o')
  if (!hasBottom && !hasLeft) {
    if (density < 0.42) return { char: '_', isEdge: true };
    return { char: '<', isEdge: true };
  }

  // Curva inferior-direita (fundo do 'u', 'o', 'e')
  if (!hasBottom && !hasRight) {
    if (density < 0.42) return { char: '_', isEdge: true };
    return { char: '>', isEdge: true };
  }

  // Borda superior geral
  if (!hasTop) {
    return { char: density > 0.5 ? '-' : '^', isEdge: true };
  }

  // Borda inferior geral
  if (!hasBottom) {
    return { char: density > 0.5 ? '_' : '-', isEdge: true };
  }

  // Borda esquerda geral
  if (!hasLeft) {
    return { char: density > 0.5 ? '/' : '<', isEdge: true };
  }

  // Borda direita geral
  if (!hasRight) {
    return { char: density > 0.5 ? '\\' : '>', isEdge: true };
  }

  // Transição intermediária interna
  if (density < 0.5) {
    return { char: ':', isEdge: true };
  }

  // Preenchimento denso padrão
  return { char: 'N', isEdge: false };
}

/**
 * Gera a grade completa de contorno + hachura a partir de um Path2D
 */
export function buildContourGrid(
  path2D: Path2D,
  containerW: number,
  containerH: number,
  vbW: number,
  vbH: number
): ContourGridResult {
  const scale = Math.min(containerW / vbW, containerH / vbH);
  const renderW = vbW * scale;
  const renderH = vbH * scale;
  const offsetX = (containerW - renderW) / 2;
  const offsetY = (containerH - renderH) / 2;

  // Densidade ideal proporcional de células
  const desiredCellW = Math.max(3.2, Math.min(5.8, renderW / 140));
  const cols = Math.max(24, Math.round(renderW / desiredCellW));
  const cellW = renderW / cols;

  const desiredCellH = cellW * 1.82;
  const rows = Math.max(10, Math.round(renderH / desiredCellH));
  const cellH = renderH / rows;

  const SS = 2;
  const off = document.createElement('canvas');
  off.width = cols * SS;
  off.height = rows * SS;
  const offCtx = off.getContext('2d', { willReadFrequently: true });
  if (!offCtx) {
    return {
      cells: [],
      cols,
      rows,
      cellW,
      cellH,
      renderW,
      renderH,
      offsetX,
      offsetY,
      scale
    };
  }

  offCtx.fillStyle = '#000000';
  offCtx.fillRect(0, 0, off.width, off.height);

  offCtx.save();
  offCtx.scale((cols * SS) / vbW, (rows * SS) / vbH);
  offCtx.fillStyle = '#ffffff';
  offCtx.fill(path2D);
  offCtx.restore();

  const imgData = offCtx.getImageData(0, 0, off.width, off.height).data;
  const densityMatrix: number[][] = Array.from({ length: rows }, () => new Array(cols).fill(0));

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let sum = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          sum += imgData[((y * SS + sy) * off.width + (x * SS + sx)) * 4];
        }
      }
      densityMatrix[y][x] = sum / (SS * SS * 255);
    }
  }

  const getD = (gx: number, gy: number): number => {
    if (gx < 0 || gx >= cols || gy < 0 || gy >= rows) return 0;
    return densityMatrix[gy][gx];
  };

  const cells: ContourAsciiCell[] = [];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const d = densityMatrix[y][x];
      if (d < 0.28) continue;

      const top = getD(x, y - 1);
      const bottom = getD(x, y + 1);
      const left = getD(x - 1, y);
      const right = getD(x + 1, y);
      const topLeft = getD(x - 1, y - 1);
      const topRight = getD(x + 1, y - 1);
      const bottomLeft = getD(x - 1, y + 1);
      const bottomRight = getD(x + 1, y + 1);

      const { char, isEdge } = getAinoGlyph(
        d,
        top,
        bottom,
        left,
        right,
        topLeft,
        topRight,
        bottomLeft,
        bottomRight,
        x,
        y
      );

      if (!char) continue;

      cells.push({
        x: offsetX + (x + 0.5) * cellW,
        y: offsetY + (y + 0.5) * cellH,
        gridX: x,
        gridY: y,
        baseChar: char,
        char,
        isEdge,
        density: d
      });
    }
  }

  return {
    cells,
    cols,
    rows,
    cellW,
    cellH,
    renderW,
    renderH,
    offsetX,
    offsetY,
    scale
  };
}
