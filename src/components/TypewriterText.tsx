import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  words,
  typingSpeed = 90,
  deletingSpeed = 50,
  pauseDuration = 2200,
  className = ''
}) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetWord = words[wordIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Digitando
        setCurrentText(targetWord.substring(0, currentText.length + 1));

        if (currentText === targetWord) {
          // Pausa antes de apagar
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Apagando
        setCurrentText(targetWord.substring(0, currentText.length - 1));

        if (currentText === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={`typewriter-wrapper ${className}`}>
      <span>{currentText}</span>
      <span className="typewriter-cursor">|</span>
    </span>
  );
};
