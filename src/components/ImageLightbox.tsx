import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export interface LightboxMedia {
  src: string;
  alt: string;
  isVideo?: boolean;
}

interface ImageLightboxProps {
  media: LightboxMedia;
  onClose: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({ media, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      // Focus trap simples: mantém o foco dentro do modal
      if (e.key === 'Tab') {
        const card = closeButtonRef.current?.closest('.image-lightbox-card');
        if (!card) return;
        const focusables = Array.from(card.querySelectorAll<HTMLElement>('button, video, a[href]')).filter(
          (el) => !el.hasAttribute('disabled')
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="image-lightbox-overlay" onClick={onClose}>
      <div
        className="image-lightbox-card"
        role="dialog"
        aria-modal="true"
        aria-label={media.alt}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="image-lightbox-header">
          <span className="image-lightbox-title font-subtitle">{media.alt}</span>
          <button
            ref={closeButtonRef}
            className="image-lightbox-close"
            onClick={onClose}
            title="Fechar"
            aria-label="Fechar visualização ampliada"
          >
            <X size={20} />
          </button>
        </div>
        <div className="image-lightbox-body">
          {media.isVideo ? (
            <video
              src={media.src}
              className="image-lightbox-video"
              controls
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img src={media.src} alt={media.alt} className="image-lightbox-img" />
          )}
        </div>
      </div>
    </div>
  );
};
