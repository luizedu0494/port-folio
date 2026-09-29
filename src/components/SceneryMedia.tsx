import React from 'react';

interface SceneryMediaProps {
  videoSrc: string;
  posterSrc: string;
  wrapperClass: string;
  mediaClass: string;
}

/**
 * Mídia de cenário em vídeo com transparência cósmica (screen blend mode).
 * Permite que as partículas ASCII do fundo passem e sejam vistas através do GIF/vídeo.
 */
export const SceneryMedia: React.FC<SceneryMediaProps> = ({
  videoSrc,
  posterSrc,
  wrapperClass,
  mediaClass
}) => {
  return (
    <div
      className={wrapperClass}
      style={{
        background: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      <video
        src={videoSrc}
        poster={posterSrc}
        className={mediaClass}
        role="presentation"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        style={{
          mixBlendMode: 'screen',
          opacity: 0.75,
          background: 'transparent',
          display: 'block'
        }}
      />
    </div>
  );
};
