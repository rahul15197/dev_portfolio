import React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props { className?: string }

const ThemeToggleFloat: React.FC<Props> = ({ className = '' }) => {
  const { theme, setTheme, systemTheme } = useTheme();
  const isDark = (theme === 'system' ? systemTheme : theme) === 'dark';

  return (
    <motion.div 
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      className={`fixed bottom-28 right-4 md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:right-6 z-50 soft-panel glass-card p-1 rounded-full flex flex-col items-center gap-1 shadow-2xl ${className}`}
    >
      <button 
        onClick={() => setTheme('light')} 
        className={`relative p-2 rounded-full transition-colors duration-300 ${!isDark ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
        aria-label="Light theme"
      >
        {!isDark && (
          <motion.div layoutId="theme-active-indicator" className="absolute inset-0 bg-primary/15 rounded-full z-0" transition={{ type: 'spring', bounce: 0.2 }} />
        )}
        <Sun className="h-4 w-4 relative z-10" />
      </button>

      <div className="h-3 w-[1px] bg-border/50 rounded-full" aria-hidden />

      <button 
        onClick={() => setTheme('dark')} 
        className={`relative p-2 rounded-full transition-colors duration-300 ${isDark ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
        aria-label="Dark theme"
      >
        {isDark && (
          <motion.div layoutId="theme-active-indicator" className="absolute inset-0 bg-primary/15 rounded-full z-0" transition={{ type: 'spring', bounce: 0.2 }} />
        )}
        <Moon className="h-4 w-4 relative z-10" />
      </button>
    </motion.div>
  );
};

export default ThemeToggleFloat;
