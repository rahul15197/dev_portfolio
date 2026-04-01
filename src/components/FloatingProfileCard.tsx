import React from 'react';
import profileImage from '@/assets/profile.png';

interface FloatingProfileCardProps {
  scrollProgress?: number;
}

const FloatingProfileCard: React.FC<FloatingProfileCardProps> = ({ scrollProgress = 1 }) => {
  const cardRef = React.useRef<HTMLElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const rafRef = React.useRef<number | null>(null);
  const [interactive, setInteractive] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setInteractive(finePointer && !reducedMotion);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Read --sp from the ancestor sticky container to drive text reveal
  React.useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let prevShown = false;
    let frame: number | null = null;

    const update = () => {
      frame = null;
      // Walk up to the sticky parent that has --sp set
      const stickyParent = wrapper.closest('[style*="--sp"]') as HTMLElement | null;
      if (!stickyParent) return;
      const sp = parseFloat(stickyParent.style.getPropertyValue('--sp') || '0');
      const show = sp > 0.5;
      if (show === prevShown) return;
      prevShown = show;
      const textEl = wrapper.querySelector('[data-card-text]') as HTMLElement | null;
      if (textEl) {
        textEl.style.maxHeight = show ? '200px' : '0px';
        textEl.style.opacity = show ? '1' : '0';
        textEl.style.padding = show ? '1.25rem' : '0 1.25rem';
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial
    requestAnimationFrame(update);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
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

  return <div ref={wrapperRef} className="relative w-full sm:w-[280px] md:w-[320px] lg:w-[340px] max-w-[360px]" style={{
    perspective: '1200px'
  }} aria-label="3D profile card">
      <article ref={cardRef} className="rounded-2xl border border-border bg-card text-card-foreground shadow-xl overflow-hidden will-change-transform hover:shadow-2xl transition-transform duration-500 ease-out transform-gpu hover:scale-105" style={{
      transformStyle: 'preserve-3d'
    }} onMouseMove={handleMouseMove} onMouseLeave={resetTilt}>
        <figure className="relative">
          <img src={profileImage} alt="Profile portrait" loading="eager" fetchPriority="high" className="w-full aspect-[4/5] object-cover select-none" />
        </figure>
        <div 
           data-card-text
           className="bg-background text-center overflow-hidden transition-all duration-500 ease-out"
           style={{ 
             maxHeight: '0px',
             opacity: 0,
             padding: '0 1.25rem'
           }}
        >
          <h2 className="text-lg font-semibold whitespace-nowrap">Rahul Maheshwari</h2>
          <p className="text-sm text-muted-foreground whitespace-nowrap">Python • QA • Full Stack</p>
        </div>
      </article>
    </div>;
};
export default FloatingProfileCard;