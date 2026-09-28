/**
 * Gera o wordmark "LUIZ EDUARDO" em SVG (paths vetoriais) a partir da Orbitron 900.
 * Uso: node scripts/generate-wordmark.cjs
 * Saída: public/assets/wordmark.svg (single path, sem fill — estilizado via CSS)
 */

const opentype = require('opentype.js');
const { writeFileSync, mkdirSync } = require('fs');
const { dirname } = require('path');

const TEXT = 'LUIZ EDUARDO';
const SIZE = 200; // coordenadas do viewBox (escala depois via CSS/SVG)
const LETTER_SPACING = 0.06; // proporção do tamanho — respiro para o modo ASCII
const WORD_SPACING = 0.3;

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
  const descender = font.descender * scale;
  const pad = SIZE * 0.08;

  let x = pad;
  let d = '';
  for (const ch of TEXT) {
    if (ch !== ' ') {
      const glyph = font.charToGlyph(ch);
      // Baseline arredondada: evita bug do opentype.js com ruído de ponto flutuante
      const p = glyph.getPath(Math.round(x), Math.round(ascender + pad), SIZE);
      d += p.toPathData(2) + ' ';
    }
    const glyphAdvance = font
      .charToGlyph(ch)
      .advanceWidth * scale;
    x +=
      ch === ' '
        ? glyphAdvance + SIZE * WORD_SPACING
        : glyphAdvance + SIZE * LETTER_SPACING;
  }
  // remove o espaçamento extra do último caractere
  const width = x - SIZE * LETTER_SPACING + pad;
  const height = ascender - descender + pad * 2;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width.toFixed(2)} ${height.toFixed(2)}">
  <path d="${d.trim()}"/>
</svg>
`;

  const out = 'public/assets/wordmark.svg';
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, svg);
  console.log(`Wordmark gerado: ${out} (viewBox ${width.toFixed(0)}x${height.toFixed(0)})`);
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
