import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollRevealText: React.FC<{ text: string }> = ({ text }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.35"]
  });

  const words = text.split(' ');

  return (
    <p ref={containerRef} className="text-lg md:text-xl lg:text-[1.35rem] font-normal leading-relaxed text-muted-foreground/90 mb-5">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        
        // This transform will change the opacity/color of words as the user scrolls
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        const color = useTransform(
          scrollYProgress,
          [start, end],
          ["rgb(113 113 122 / 0.2)", "rgb(255 255 255 / 1)"]
        );

        return (
          <motion.span
            key={i}
            style={{ opacity, color }}
            className="transition-none"
          >
            {word}{' '}
          </motion.span>
        );
      })}
    </p>
  );
};

export default ScrollRevealText;
