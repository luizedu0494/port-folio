import React, { useEffect, useRef } from 'react';
import { TextScramble } from '../ascii/TextScramble';

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** Re-scrambla ao passar o mouse (comportamento hoverchar do site de referência) */
  hover?: boolean;
  /** Delay do reveal inicial em ms */
  startDelay?: number;
  /** Callback ao concluir o reveal inicial */
  onDone?: () => void;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className,
  hover = false,
  startDelay = 0,
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
      el.textContent = text;
      onDoneRef.current?.();
      return;
    }

    const fx = new TextScramble(el);
    fxRef.current = fx;
    const timer = window.setTimeout(() => {
      fx
        .setText(text)
        .then(() => onDoneRef.current?.())
        .catch(() => undefined);
    }, startDelay);

    return () => {
      window.clearTimeout(timer);
      fx.destroy();
      fxRef.current = null;
    };
  }, [text, startDelay]);

  const handleMouseEnter = () => {
    if (!hover || !fxRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    fxRef.current.setText(text).catch(() => undefined);
  };

  return (
    <span
      ref={targetRef}
      className={`scramble-text ${className || ''}`}
      onMouseEnter={hover ? handleMouseEnter : undefined}
    >
      {text}
    </span>
  );
};
