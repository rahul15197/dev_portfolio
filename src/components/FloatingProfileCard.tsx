import React from 'react';
import profileImage from '@/assets/profile.png';
import { motion, useScroll, useTransform } from 'framer-motion';

interface FloatingProfileCardProps {
  scrollProgress?: number;
}

const FloatingProfileCard: React.FC<FloatingProfileCardProps> = ({ scrollProgress = 1 }) => {
  const cardRef = React.useRef<HTMLElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const rafRef = React.useRef<number | null>(null);
  const [interactive, setInteractive] = React.useState(false);
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"]
  });

  // Use the scroll progress to drive the text reveal opacity and size
  // This stays outside of React's render loop and is highly optimized.
  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 0, 1, 1]);
  const textHeight = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 0, 80, 80]);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setInteractive(finePointer && !reducedMotion);
    setIsTouchDevice(!finePointer);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width - 0.5; // -0.5 to 0.5
    const py = y / rect.height - 0.5;
    const maxTilt = 22; // degrees

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.transform = `rotateX(${-(py * maxTilt)}deg) rotateY(${px * maxTilt}deg)`;
      }
    });
  };

  const resetTilt = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
      }
    });
  };

  return (
    <div 
      ref={wrapperRef} 
      className="relative w-full sm:w-[280px] md:w-[320px] lg:w-[340px] max-w-[360px]" 
      style={{ perspective: '1200px' }} 
      aria-label="3D profile card"
    >
      <article 
        ref={cardRef} 
        className="rounded-2xl border border-border bg-card text-card-foreground shadow-xl overflow-hidden will-change-transform hover:shadow-2xl transition-transform duration-500 ease-out transform-gpu hover:scale-105" 
        style={{ transformStyle: 'preserve-3d' }} 
        onMouseMove={handleMouseMove} 
        onMouseLeave={resetTilt}
      >
        <figure className="relative">
          <img 
            src={profileImage} 
            alt="Profile portrait" 
            loading="eager" 
            fetchPriority="high" 
            className="w-full aspect-[4/5] object-cover select-none" 
          />
        </figure>
        <motion.div 
           className="bg-background text-center overflow-hidden"
           style={{ 
             height: textHeight,
             opacity: textOpacity,
           }}
        >
          <div className="py-4 px-5">
            <h2 className="text-lg font-semibold whitespace-nowrap">Rahul Maheshwari</h2>
            <p className="text-sm text-muted-foreground whitespace-nowrap">Python • QA • Full Stack</p>
          </div>
        </motion.div>
      </article>
    </div>
  );
};

export default FloatingProfileCard;