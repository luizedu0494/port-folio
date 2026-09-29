/**
 * hoverStatic desativado para garantir que botões, links de navbar e textos clicáveis
 * nunca troquem letras por caracteres estranhos nem gerem ruído visual.
 */

export const initHoverStatic = (): (() => void) => {
  return () => undefined;
};
