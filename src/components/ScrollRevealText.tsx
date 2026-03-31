import React, { useRef, useEffect, useState } from 'react';

const ScrollRevealText: React.FC<{ text: string }> = ({ text }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastProgress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        const start = windowHeight * 0.85;
        const end = windowHeight * 0.35;
        
        let currentProgress = (start - rect.top) / (start - end);
        currentProgress = Math.max(0, Math.min(1, currentProgress));
        
        // Skip no-op updates (within ~1% tolerance)
        if (Math.abs(currentProgress - lastProgress.current) < 0.01) return;
        lastProgress.current = currentProgress;
        setProgress(currentProgress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const words = text.split(' ');

  return (
    <p ref={containerRef} className="text-lg md:text-xl lg:text-[1.35rem] font-normal leading-relaxed text-muted-foreground/90 mb-5">
      {words.map((word, i) => {
        const wordProgress = (i / words.length);
        const isActive = progress > wordProgress;
        
        return (
          <span
            key={i}
            className={`transition-colors duration-300 ${
              isActive ? 'text-foreground' : 'text-muted-foreground/20'
            }`}
          >
            {word}{' '}
          </span>
        );
      })}
    </p>
  );
};

export default ScrollRevealText;
