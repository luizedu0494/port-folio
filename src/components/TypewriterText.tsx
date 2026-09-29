import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  glitchDuration?: number;
  className?: string;
}

const ASCII_GLITCH_POOL = ['#', 'Ø', '1', '0', '_', '/', '[', ']', '$', '*', '!', '&', '<', '>', '~', '+', ':'];

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  words,
  typingSpeed = 65,
  deletingSpeed = 35,
  pauseDuration = 2400,
  glitchDuration = 480,
  className = ''
}) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'glitch' | 'paused' | 'deleting'>('typing');
  const [displayText, setDisplayText] = useState('');
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchOutput, setGlitchOutput] = useState<Array<{ char: string; isAscii: boolean }>>([]);

  const targetWord = words[wordIndex] || '';

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      setIsGlitching(false);
      if (displayText.length < targetWord.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(targetWord.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        setPhase('glitch');
      }
    } else if (phase === 'glitch') {
      setIsGlitching(true);
      const startTime = Date.now();

      const glitchInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        if (elapsed >= glitchDuration) {
          clearInterval(glitchInterval);
          setIsGlitching(false);
          setPhase('paused');
        } else {
          const glitched = targetWord.split('').map((c) => {
            if (c === ' ' || c === '/' || c === '&') return { char: c, isAscii: false };
            if (Math.random() < 0.28) {
              const asciiChar = ASCII_GLITCH_POOL[Math.floor(Math.random() * ASCII_GLITCH_POOL.length)];
              return { char: asciiChar, isAscii: true };
            }
            return { char: c, isAscii: false };
          });
          setGlitchOutput(glitched);
        }
      }, 70);

      return () => clearInterval(glitchInterval);
    } else if (phase === 'paused') {
      setIsGlitching(false);
      timeoutId = setTimeout(() => {
        setPhase('deleting');
      }, pauseDuration);
    } else if (phase === 'deleting') {
      setIsGlitching(false);
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deletingSpeed);
      } else {
        setPhase('typing');
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, phase, wordIndex, targetWord, words.length, typingSpeed, deletingSpeed, pauseDuration, glitchDuration]);

  return (
    <span className={`typewriter-wrapper ${isGlitching ? 'typewriter-glitching' : ''} ${className}`}>
      <span className="typewriter-content" aria-label={targetWord}>
        {isGlitching ? (
          glitchOutput.map((item, idx) =>
            item.isAscii ? (
              <span key={idx} className="typewriter-ascii-char">
                {item.char}
              </span>
            ) : (
              <span key={idx} className="typewriter-char">
                {item.char}
              </span>
            )
          )
        ) : (
          <span>{displayText}</span>
        )}
      </span>
      <span className={`typewriter-cursor ${isGlitching ? 'typewriter-cursor--glitch' : ''}`}>|</span>
    </span>
  );
};
