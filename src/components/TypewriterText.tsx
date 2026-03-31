
import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}

const TypewriterText = ({ 
  words, 
  typingSpeed = 100, 
  deletingSpeed = 50, 
  delayBetweenWords = 2000 
}: TypewriterTextProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setCurrentText(words[0] ?? '');
      return;
    }

    const currentWord = words[currentWordIndex];
    let pauseTimeout: ReturnType<typeof setTimeout> | null = null;

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        
        if (currentText === currentWord) {
          pauseTimeout = setTimeout(() => setIsDeleting(true), delayBetweenWords);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => {
      clearTimeout(timeout);
      if (pauseTimeout) clearTimeout(pauseTimeout);
    };
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords, reducedMotion]);

  return (
    <span className="text-foreground">
      {currentText}
      <span className={reducedMotion ? '' : 'animate-pulse'}>|</span>
    </span>
  );
};

export default TypewriterText;
