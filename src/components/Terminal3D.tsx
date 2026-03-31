import React from 'react';

interface Props { className?: string }

const Terminal3D: React.FC<Props> = ({ className = '' }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const raf = React.useRef<number | null>(null);
  const mouseX = React.useRef<number>(0);
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(finePointer && !reducedMotion);
  }, []);

  React.useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      mouseX.current = e.clientX / window.innerWidth - 0.5; // -0.5..0.5
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        if (!ref.current) return;
        const tiltY = mouseX.current * 12; // degrees
        ref.current.style.setProperty('--rotY', `${tiltY}deg`);
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  return (
    <div
      className={`pointer-events-none select-none [perspective:1200px] ${className}`}
      aria-hidden
    >
      <div
        ref={ref}
        className="rounded-xl border border-border bg-card/80 backdrop-blur-xl shadow-xl w-[280px] md:w-[360px]"
        style={{
          transform: 'rotateY(var(--rotY, 0deg))',
          transformStyle: 'preserve-3d',
          transition: enabled ? 'transform 120ms ease-out' : 'none',
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-background/60">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="ml-auto text-xs text-muted-foreground">terminal — bash</span>
        </div>
        {/* Body */}
        <div className="px-4 py-3 text-xs font-mono leading-6">
          <div className="text-accent">$ npm run build</div>
          <div className="text-muted-foreground">vite v5.0 building for production...</div>
          <div className="text-primary">✓ optimized assets, compiled successfully.</div>
          <div className="opacity-70">$ git commit -m "feat: add 3D terminal"</div>
          <div className="opacity-70">[main abc123] 1 file changed</div>
        </div>
      </div>
    </div>
  );
};

export default Terminal3D;
