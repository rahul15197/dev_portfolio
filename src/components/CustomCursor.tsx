import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth out the movement mathematically
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if it's a touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const mouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const mouseLeave = () => setIsVisible(false);
    const mouseEnter = () => setIsVisible(true);
    const mouseDown = () => setIsClicking(true);
    const mouseUp = () => setIsClicking(false);

    // Track hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = !!target.closest('a, button, input, select, textarea, [data-hover="true"], [role="button"]');
      setIsHovering(isHoverable);
    };

    window.addEventListener('mousemove', mouseMove, { passive: true });
    window.addEventListener('mouseleave', mouseLeave);
    window.addEventListener('mouseenter', mouseEnter);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // Inject CSS to hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseleave', mouseLeave);
      window.removeEventListener('mouseenter', mouseEnter);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto'; // Cleanup
    };
  }, [mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-primary/30 bg-primary/5 shadow-[0_0_15px_hsla(var(--primary)/0.1)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
        variants={{
          default: { width: 44, height: 44, opacity: isVisible ? 1 : 0 },
          hover: { width: 64, height: 64, backgroundColor: 'hsl(var(--primary) / 0.15)', borderColor: 'hsl(var(--primary) / 0.6)' },
          click: { width: 32, height: 32 }
        }}
        animate={isClicking ? "click" : isHovering ? "hover" : "default"}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-primary"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
        variants={{
          default: { width: 6, height: 6, opacity: isVisible ? 1 : 0 },
          hover: { width: 0, height: 0, opacity: 0 },
          click: { width: 10, height: 10 }
        }}
        animate={isClicking ? "click" : isHovering ? "hover" : "default"}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    </>
  );
};

export default CustomCursor;
