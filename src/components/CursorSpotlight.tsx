import React from 'react';

const CursorSpotlight: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const raf = React.useRef<number | null>(null);
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setEnabled(finePointer.matches && !reducedMotion.matches);
  }, []);

  React.useEffect(() => {
    if (!enabled) return;

    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const x = e.clientX;
        const y = e.clientY;
        el.style.setProperty('--spot-x', `${x}px`);
        el.style.setProperty('--spot-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-40 h-[800px] w-[800px] rounded-full opacity-60 will-change-transform"
      style={{
        background: 'radial-gradient(circle, hsl(var(--primary)/0.15) 0%, transparent 70%)',
        transform: `translate(var(--spot-x, -1000px), var(--spot-y, -1000px)) translate(-50%, -50%)`,
      }}
    />
  );
};

export default CursorSpotlight;
