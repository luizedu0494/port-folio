/**
 * Paleta de densidade — ordenada do caractere mais "cheio" ao mais leve
 * (observada no motor do aino.agency). Serve como régua de interpolação:
 * o morph percorre os índices da paleta em ordem, nunca aleatório.
 */

export const DENSITY_PALETTE = 'NO0A869452I3?!<>=+/:-· ';

/** Densidade (0..1, 1 = tinta sólida) → índice na paleta */
export const paletteIndexForDensity = (d: number): number => {
  const idx = Math.floor((1 - Math.min(1, Math.max(0, d))) * DENSITY_PALETTE.length);
  return Math.min(DENSITY_PALETTE.length - 1, idx);
};

/** Interpolação ordenada entre dois caracteres da paleta conforme o progresso */
export const interpolateChar = (fromIdx: number, toIdx: number, progress: number): string => {
  const eased = progress * progress * (3 - 2 * progress); // smoothstep
  const idx = Math.round(fromIdx + (toIdx - fromIdx) * eased);
  return DENSITY_PALETTE[Math.max(0, Math.min(DENSITY_PALETTE.length - 1, idx))];
};
