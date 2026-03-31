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
      className="pointer-events-none fixed inset-0 z-40"
      style={{
        background:
          'radial-gradient(400px circle at var(--spot-x, 50%) var(--spot-y, 50%), hsl(var(--primary)/0.18), transparent 60%)',
        transition: 'background-position 120ms ease-out',
        mixBlendMode: 'screen',
      }}
    />
  );
};

export default CursorSpotlight;
