import React from 'react';
import { ZoomIn } from 'lucide-react';
import type { LightboxMedia } from './ImageLightbox';

interface ExpandableMediaProps {
  src: string;
  alt: string;
  containerClass: string;
  mediaClass: string;
  videoSrc?: string;
  lazy?: boolean;
  hint?: string;
  onExpand: (media: LightboxMedia) => void;
}

/** Placeholder transparente 1px */
const PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export const ExpandableMedia: React.FC<ExpandableMediaProps> = ({
  src,
  alt,
  containerClass,
  mediaClass,
  videoSrc,
  lazy = false,
  hint = 'Expandir',
  onExpand
}) => (
  <div
    className={`${containerClass} expandable-preview-container`}
    onClick={() => onExpand({ src: videoSrc || src, alt, isVideo: Boolean(videoSrc) })}
    title="Clique para expandir em tela cheia"
    style={{
      background: 'transparent'
    }}
  >
    {videoSrc ? (
      <video
        src={videoSrc}
        poster={src}
        className={mediaClass}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        style={{
          mixBlendMode: 'screen',
          opacity: 0.78,
          background: 'transparent'
        }}
      />
    ) : (
      <img
        data-src={src}
        src={lazy ? PLACEHOLDER : src}
        alt={alt}
        className={`${mediaClass}${lazy ? ' lazy-gif' : ''}`}
        loading="lazy"
        decoding="async"
        style={{
          opacity: 0.85,
          background: 'transparent'
        }}
      />
    )}

    <div className="mobile-expand-hint">
      <ZoomIn size={14} /> {hint}
    </div>
  </div>
);
