import React, { useEffect, useRef } from 'react';
import { TextScramble } from '../ascii/TextScramble';

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** Re-scrambla ao passar o mouse */
  hover?: boolean;
  /** Delay do reveal inicial em ms */
  startDelay?: number;
  /** Só faz o reveal quando entra na viewport (efeito fadein) */
  onView?: boolean;
  /** Libera o reveal */
  enabled?: boolean;
  /** Variante rápida */
  fast?: boolean;
  /** ID para escutar disparo sincronizado de clique (ex: 'sobre', 'projetos') */
  triggerId?: string;
  onDone?: () => void;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className,
  hover = false,
  startDelay = 0,
  onView = false,
  enabled = true,
  fast = false,
  triggerId,
  onDone
}) => {
  const targetRef = useRef<HTMLSpanElement | null>(null);
  const fxRef = useRef<TextScramble | null>(null);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      el.style.visibility = '';
      el.textContent = text;
      onDoneRef.current?.();
      return;
    }

    const fx = new TextScramble(el);
    fxRef.current = fx;
    const opts = fast ? { spread: 18, length: 24 } : { spread: 26, length: 34 };
    let timer = 0;
    let io: IntersectionObserver | undefined;

    const run = () => {
      el.style.visibility = '';
      timer = window.setTimeout(() => {
        fx
          .setText(text, onView ? { ...opts, from: '' } : opts)
          .then(() => onDoneRef.current?.())
          .catch(() => undefined);
      }, startDelay);
    };

    if (onView) {
      el.style.visibility = 'hidden';
      if (enabled) {
        io = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              io?.disconnect();
              run();
            }
          },
          { threshold: 0.2 }
        );
        io.observe(el);
      }
    } else if (enabled) {
      run();
    }

    // Escuta evento de disparo sincronizado por clique no navbar
    const handleTrigger = (e: Event) => {
      const custom = e as CustomEvent<{ id: string }>;
      if (triggerId && custom.detail?.id === triggerId && fxRef.current) {
        fxRef.current.setText(text, { spread: 20, length: 28 }).catch(() => undefined);
      }
    };

    if (triggerId) {
      window.addEventListener('trigger-section-scramble', handleTrigger);
    }

    return () => {
      window.clearTimeout(timer);
      io?.disconnect();
      if (triggerId) {
        window.removeEventListener('trigger-section-scramble', handleTrigger);
      }
      fx.destroy();
      fxRef.current = null;
      el.style.visibility = '';
      el.textContent = text;
    };
  }, [text, startDelay, onView, enabled, fast, triggerId]);

  const handleMouseEnter = () => {
    if (!hover || !fxRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    fxRef.current.setText(text, { spread: 18, length: 26 }).catch(() => undefined);
  };

  return (
    <span
      ref={targetRef}
      className={`scramble-text ${className || ''}`}
      aria-label={text}
      style={onView ? { visibility: 'hidden' } : undefined}
      onMouseEnter={hover ? handleMouseEnter : undefined}
    >
      {text}
    </span>
  );
};
