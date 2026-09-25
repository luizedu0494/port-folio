import React from 'react';
import ReactDOM from 'react-dom/client';
import { inject } from '@vercel/analytics';
import { App } from './App';
import './index.css';

inject();

// Trata erros de carregamento de assets/chunks após novos deploys
window.addEventListener('vite:preloadError', () => {
  const reloaded = sessionStorage.getItem('vite_preload_reloaded');
  if (!reloaded) {
    sessionStorage.setItem('vite_preload_reloaded', 'true');
    window.location.reload();
  }
});

window.addEventListener(
  'error',
  (event) => {
    const target = event.target as HTMLElement | null;
    if (target && (target.tagName === 'SCRIPT' || target.tagName === 'LINK')) {
      const reloaded = sessionStorage.getItem('asset_error_reloaded');
      if (!reloaded) {
        sessionStorage.setItem('asset_error_reloaded', 'true');
        window.location.reload();
      }
    }
  },
  true
);

// Limpa os flags de reload após carregamento bem-sucedido
window.addEventListener('load', () => {
  sessionStorage.removeItem('vite_preload_reloaded');
  sessionStorage.removeItem('asset_error_reloaded');
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
