import React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface Props { className?: string }

const ThemeToggleFloat: React.FC<Props> = ({ className = '' }) => {
  const { theme, setTheme, systemTheme } = useTheme();
  const isDark = (theme === 'system' ? systemTheme : theme) === 'dark';

  return (
    <div className={`fixed bottom-6 left-6 z-50 glass-card theme-shell hover:translate-y-0 px-3 py-2 rounded-full flex items-center gap-2 ${className}`}>
      <Sun className={`h-4 w-4 transition-colors duration-500 ${isDark ? 'opacity-50' : 'text-primary'}`} />
      <Switch
        checked={isDark}
        onCheckedChange={(v) => setTheme(v ? 'dark' : 'light')}
        aria-label="Toggle theme"
      />
      <Moon className={`h-4 w-4 transition-colors duration-500 ${isDark ? 'text-primary' : 'opacity-50'}`} />
    </div>
  );
};

export default ThemeToggleFloat;
