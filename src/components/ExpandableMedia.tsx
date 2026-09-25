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

/** Placeholder transparente 1px — o src real entra via IntersectionObserver (lazy-gif). */
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
  >
    {videoSrc ? (
      <>
        <video
          src={videoSrc}
          poster={src}
          className={`autoplay-motion ${mediaClass}`}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        <img
          src={src}
          alt={alt}
          className={`reduced-motion-poster ${mediaClass}`}
          loading="lazy"
          decoding="async"
        />
      </>
    ) : (
      <img
        data-src={src}
        src={lazy ? PLACEHOLDER : src}
        alt={alt}
        className={`${mediaClass}${lazy ? ' lazy-gif' : ''}`}
        loading="lazy"
        decoding="async"
      />
    )}

    <div className="mobile-expand-hint">
      <ZoomIn size={12} />
      <span>Toque para Expandir</span>
    </div>

    <div className="expand-overlay-badge">
      <ZoomIn size={18} color="#fff" />
      <span>{hint === 'Expandir' ? 'Expandir' : 'Clique para Expandir'}</span>
    </div>
  </div>
);
