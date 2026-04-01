import React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props { className?: string }

const ThemeToggleFloat: React.FC<Props> = ({ className = '' }) => {
  const { theme, setTheme, systemTheme } = useTheme();
  // Ensure default is dark if unmounted/hydrating
  const isDark = (theme === 'system' ? systemTheme : theme) !== 'light';

  const toggleTheme = (e: React.MouseEvent) => {
    const isDarkNext = !isDark;
    const themeNext = isDarkNext ? 'dark' : 'light';
    
    // Fallback for browsers that don't support View Transitions
    if (!document.startViewTransition) {
      setTheme(themeNext);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setTheme(themeNext);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 900,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  return (
    <motion.div 
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      className={`hidden md:flex fixed md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:right-6 z-50 shadow-2xl ${className}`}
    >
      <button
        onClick={toggleTheme}
        className="relative w-10 h-20 rounded-full soft-panel glass-card p-1 flex flex-col items-center outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={`Toggle theme (current: ${isDark ? 'dark' : 'light'})`}
      >
        <span className="sr-only">Toggle theme</span>
        <div className="absolute top-[10px] w-full flex justify-center z-10 pointer-events-none">
          <Sun className={`w-4 h-4 transition-colors ${!isDark ? 'text-primary opacity-0' : 'text-muted-foreground'}`} />
        </div>
        <div className="absolute bottom-[10px] w-full flex justify-center z-10 pointer-events-none">
          <Moon className={`w-4 h-4 transition-colors ${isDark ? 'text-primary opacity-0' : 'text-muted-foreground'}`} />
        </div>
        
        {/* The sliding physical thumb */}
        <motion.div 
          layout
          initial={false}
          animate={{
            y: isDark ? 40 : 0
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25
          }}
          className="absolute left-1 top-1 w-8 h-8 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 z-20 flex items-center justify-center shadow-lg"
        >
          {isDark ? (
            <Moon className="w-4 h-4 text-primary drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
          ) : (
            <Sun className="w-4 h-4 text-primary drop-shadow-[0_0_8px_rgba(255,165,0,0.5)]" />
          )}
        </motion.div>
      </button>
    </motion.div>
  );
};

export default ThemeToggleFloat;
