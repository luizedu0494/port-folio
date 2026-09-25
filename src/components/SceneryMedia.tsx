import React from 'react';

interface SceneryMediaProps {
  videoSrc: string;
  posterSrc: string;
  wrapperClass: string;
  mediaClass: string;
}

/**
 * Mídia de cenário em vídeo (substitui GIFs pesados).
 * Com prefers-reduced-motion, o vídeo é ocultado via CSS e o poster estático é exibido.
 */
export const SceneryMedia: React.FC<SceneryMediaProps> = ({
  videoSrc,
  posterSrc,
  wrapperClass,
  mediaClass
}) => (
  <div className={wrapperClass}>
    <video
      src={videoSrc}
      poster={posterSrc}
      className={`autoplay-motion ${mediaClass}`}
      role="presentation"
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
    />
    <img
      src={posterSrc}
      alt=""
      role="presentation"
      className={`reduced-motion-poster ${mediaClass}`}
      loading="lazy"
      decoding="async"
    />
  </div>
);
