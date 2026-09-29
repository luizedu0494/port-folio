/**
 * Gera o wordmark "luiz.edu" em SVG (paths vetoriais) a partir da Archivo Black.
 * Uso: node scripts/generate-wordmark.cjs
 * Saída: public/assets/wordmark.svg (single path, tightly cropped, flush left)
 */

const opentype = require('opentype.js');
const { writeFileSync, mkdirSync } = require('fs');
const { dirname } = require('path');

const TEXT = 'luiz.edu';
const SIZE = 240; // coordenadas do viewBox
const LETTER_SPACING = -0.02; // kerning ultra-bold compacto estilo Aino Agency
const WORD_SPACING = 0.2;

// Archivo Black — grotesk bold chunky estilo poster (WOFF estático do fontsource)
const FONT_URL =
  'https://cdn.jsdelivr.net/npm/@fontsource/archivo-black@5.3.0/files/archivo-black-latin-400-normal.woff';

async function main() {
  const res = await fetch(FONT_URL);
  if (!res.ok) throw new Error(`Falha ao baixar a fonte: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const font = opentype.parse(bufToArrayBuffer(buf));

  const scale = SIZE / font.unitsPerEm;
  const ascender = font.ascender * scale;

  let rawX = 0;
  const combinedPath = new opentype.Path();

  for (const ch of TEXT) {
    if (ch !== ' ') {
      const glyph = font.charToGlyph(ch);
      const glyphPath = glyph.getPath(rawX, ascender, SIZE);
      combinedPath.commands.push(...glyphPath.commands);
    }
    const glyphAdvance = font.charToGlyph(ch).advanceWidth * scale;
    rawX +=
      ch === ' '
        ? glyphAdvance + SIZE * WORD_SPACING
        : glyphAdvance + SIZE * LETTER_SPACING;
  }

  const bbox = combinedPath.getBoundingBox();
  const minX = bbox.x1;
  const minY = bbox.y1;
  const width = bbox.x2 - bbox.x1;
  const height = bbox.y2 - bbox.y1;

  // Normaliza o path para que comece exatamente em x=0, y=0 (flush no canto superior-esquerdo)
  const normalizedPath = new opentype.Path();
  for (const cmd of combinedPath.commands) {
    const newCmd = { ...cmd };
    if ('x' in newCmd) newCmd.x = Number((newCmd.x - minX).toFixed(2));
    if ('y' in newCmd) newCmd.y = Number((newCmd.y - minY).toFixed(2));
    if ('x1' in newCmd) newCmd.x1 = Number((newCmd.x1 - minX).toFixed(2));
    if ('y1' in newCmd) newCmd.y1 = Number((newCmd.y1 - minY).toFixed(2));
    if ('x2' in newCmd) newCmd.x2 = Number((newCmd.x2 - minX).toFixed(2));
    if ('y2' in newCmd) newCmd.y2 = Number((newCmd.y2 - minY).toFixed(2));
    normalizedPath.commands.push(newCmd);
  }

  const pathData = normalizedPath.toPathData(2);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width.toFixed(2)} ${height.toFixed(2)}">
  <path d="${pathData}"/>
</svg>
`;

  const out = 'public/assets/wordmark.svg';
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, svg);
  console.log(`Wordmark gerado: ${out} (viewBox 0 0 ${width.toFixed(2)} ${height.toFixed(2)})`);
  console.log(`PATH_DATA: ${pathData}`);
}

function bufToArrayBuffer(buf) {
  const ab = new ArrayBuffer(buf.length);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; i++) view[i] = buf[i];
  return ab;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

