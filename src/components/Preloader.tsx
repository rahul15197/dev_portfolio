import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const greetings = ['Hello', 'Bonjour', 'Hola', 'Ciao', 'नमस्ते', 'こんにちは', '안녕하세요', 'Привет'];

const Preloader: React.FC = () => {
  const location = useLocation();
  const [index, setIndex] = useState(0);

  if (location.pathname.startsWith('/project')) return null;
  const [isSlidingUp, setIsSlidingUp] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (index < greetings.length - 1) {
      // Start slow (~400ms) and speed up to a fast pulse (~60ms)
      const delay = Math.max(60, 400 - (index * 55));
      const timer = setTimeout(() => setIndex(index + 1), delay);
      return () => clearTimeout(timer);
    } else {
      const slideTimer = setTimeout(() => setIsSlidingUp(true), 500);
      const doneTimer = setTimeout(() => setIsDone(true), 1300);
      return () => { clearTimeout(slideTimer); clearTimeout(doneTimer); };
    }
  }, [index]);

  if (isDone) return null;

  return (
    <div 
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-background transition-transform ${isSlidingUp ? '-translate-y-full' : 'translate-y-0'}`}
      style={{ transitionDuration: '800ms', transitionTimingFunction: 'cubic-bezier(0.76,0,0.24,1)' }}
    >
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
        {greetings[index]}
      </h1>
    </div>
  );
};
export default Preloader;
