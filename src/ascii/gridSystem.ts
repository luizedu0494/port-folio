/**
 * Sistema de Grid Tipográfico Responsivo (Aino Agency / Terminal Metrics)
 * Injeta variáveis no elemento <html> com base nas dimensões da janela.
 */

export const initGridSystem = (): (() => void) => {
  if (typeof window === 'undefined') return () => undefined;

  const updateGridMetrics = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width <= 768;
    
    // Altura da célula de referência e proporção 0.6:1
    const cellH = isMobile ? 14 : 18;
    const cellW = cellH * 0.6;
    
    const cols = Math.ceil(width / cellW);
    const rows = Math.ceil(height / cellH);

    const root = document.documentElement;
    root.style.setProperty('--ch', `${cellW.toFixed(2)}px`);
    root.style.setProperty('--line', `${cellH}px`);
    root.style.setProperty('--cols', `${cols}`);
    root.style.setProperty('--rows', `${rows}`);
    
    // Spacing units derivados de --ch
    root.style.setProperty('--s1', `${(cellW * 1).toFixed(2)}px`);
    root.style.setProperty('--s2', `${(cellW * 2).toFixed(2)}px`);
    root.style.setProperty('--s4', `${(cellW * 4).toFixed(2)}px`);
    root.style.setProperty('--s8', `${(cellW * 8).toFixed(2)}px`);
  };

  updateGridMetrics();
  window.addEventListener('resize', updateGridMetrics, { passive: true });
  window.addEventListener('orientationchange', updateGridMetrics, { passive: true });

  return () => {
    window.removeEventListener('resize', updateGridMetrics);
    window.removeEventListener('orientationchange', updateGridMetrics);
  };
};
