import { useEffect, useMemo, useRef, useState } from 'react';
import { Home, User, Briefcase, Mail, Menu, X, Sun, Moon, LayoutGrid, ChevronDown, ExternalLink } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(false);
  const [active, setActive] = useState<string>('#home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { theme, setTheme, systemTheme } = useTheme();
  const isDark = (theme === 'system' ? systemTheme : theme) !== 'light';

  const toggleTheme = (e: React.MouseEvent) => {
    const isDarkNext = !isDark;
    const themeNext = isDarkNext ? 'dark' : 'light';
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
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
        { duration: 900, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    });
  };

  const apps = [
    { 
      title: 'PaperPilot', 
      description: 'AI-powered document analysis', 
      href: 'https://paper-pilot-1043313298073.us-central1.run.app/',
      icon: ExternalLink
    }
  ];

  const navItems = useMemo(() => [
    { href: '#home', label: 'Home', icon: Home },
    { href: '#about', label: 'About', icon: User },
    { href: '#projects', label: 'Projects', icon: Briefcase },
    { href: '#apps', label: 'Apps', icon: LayoutGrid, isDropdown: true },
    { href: '#contact', label: 'Contact', icon: Mail }
  ], []);

  const barRef = useRef<HTMLDivElement | null>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [highlight, setHighlight] = useState<{ left: number; top: number; width: number; } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      if (scrolled !== isScrolledRef.current) {
        isScrolledRef.current = scrolled;
        setIsScrolled(scrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navItems.map(n => document.querySelector(n.href)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) {
        const id = `#${visible.target.id}`;
        setActive(id);
      }
    }, { threshold: [0.3] });
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, [navItems]);

  useEffect(() => {
    const bar = barRef.current;
    const btn = btnRefs.current[active];
    if (!bar || !btn) return;
    const barRect = bar.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const width = btnRect.width + 12;
    const left = btnRect.left - barRect.left - 6;
    const top = barRect.height / 2 - 20;
    setHighlight({ left, top, width });
  }, [active]);

  const scrollToSection = (href: string) => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(href, { offset: -80 });
    } else {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setActive(href);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-smooth ${isScrolled ? 'nav-glass shadow-[0_12px_40px_hsl(215_24%_18%_/_0.06)]' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between gap-4">

            {/* Logo */}
            <button className="flex items-center gap-3 text-left" onClick={() => scrollToSection('#home')}>
              <div className="text-2xl font-bold hero-gradient-text"><span aria-label="Rahul logo">{'<rahul>'}</span></div>
              <div className="hidden lg:block">
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">Engineering</p>
                <p className="text-sm text-foreground/80">Building Solutions and Experiences</p>
              </div>
            </button>

            {/* Desktop Centered nav */}
            <div ref={barRef} className="hidden md:flex relative items-center justify-center mx-auto transition-transform will-change-transform">
              {highlight && (
                <div
                  className="absolute h-10 rounded-full border border-primary/20 bg-primary/10 transition-all duration-500 ease-out"
                  style={{ left: highlight.left, top: highlight.top, width: highlight.width }}
                  aria-hidden
                />
              )}
              <div className="soft-panel flex items-center gap-2 px-3 py-2 rounded-full border border-border/70 bg-card/60 backdrop-blur-xl shadow-[0_10px_30px_hsl(215_24%_18%_/_0.08)]">
                {navItems.map(item => {
                  if (item.isDropdown) {
                    const isActive = active === item.href;
                    return (
                      <DropdownMenu key={item.label} modal={false}>
                        <DropdownMenuTrigger asChild>
                          <button
                            ref={el => btnRefs.current[item.href!] = el}
                            className={`relative text-sm px-2 py-1 transition-smooth ${isActive ? 'text-primary' : 'text-foreground hover:text-primary/70'}`}
                          >
                            <span className="relative z-10 px-2 flex items-center gap-1.5 font-medium">
                              {item.label}
                              <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                            </span>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center" sideOffset={15} className="w-64 p-2 rounded-2xl bg-card/90 backdrop-blur-xl border-border/40 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
                          <div className="px-2 py-1.5 mb-1.5">
                            <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground font-bold">Featured Apps</p>
                          </div>
                          {apps.map(app => (
                            <DropdownMenuItem key={app.title} asChild className="cursor-pointer rounded-xl p-3 focus:bg-primary/10 transition-all group">
                              <a href={app.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full">
                                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors text-primary shadow-sm">
                                  <app.icon className="w-4 h-4" />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold">{app.title}</p>
                                  <p className="text-[0.7rem] text-muted-foreground/80 leading-tight mt-0.5">{app.description}</p>
                                </div>
                              </a>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    );
                  }
                  return (
                    <button
                      key={item.href}
                      ref={el => btnRefs.current[item.href!] = el}
                      onClick={() => scrollToSection(item.href!)}
                      className={`relative text-sm px-2 py-1 transition-smooth ${active === item.href ? 'text-primary' : 'text-foreground'}`}
                    >
                      <span className="relative z-10 px-2">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right CTA + Mobile Hamburger */}
            <div className="flex items-center gap-2">
              {/* Desktop CTA */}
              <Button variant="outline" className="hidden md:flex rounded-full px-5 soft-panel btn-border-glow text-sm" onClick={() => scrollToSection('#contact')}>
                Get in Touch
              </Button>

              {/* Mobile: Hamburger */}
              <button
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-card/60 backdrop-blur-md border border-border/50 text-foreground"
                onClick={() => setMobileMenuOpen(prev => !prev)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileMenuOpen ? (
                    <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X className="w-5 h-5" />
                    </motion.span>
                  ) : (
                    <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu className="w-5 h-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="md:hidden fixed top-[60px] left-4 right-4 z-[99] rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.href;
                
                if (item.isDropdown) {
                  return (
                    <div key={item.label} className="mt-2">
                      <p className="px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground font-bold font-mono border-t border-border/30 pt-4">Featured Apps</p>
                      <div className="grid gap-1 mt-1">
                        {apps.map(app => (
                          <a 
                            key={app.title} 
                            href={app.href} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 px-4 py-4 rounded-xl text-base font-medium text-foreground/80 hover:bg-primary/10 hover:text-primary transition-all active:scale-[0.98]"
                          >
                            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-card border border-border/50 shadow-sm text-primary">
                              <app.icon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold">{app.title}</span>
                              <span className="text-[0.75rem] text-muted-foreground font-normal">{app.description}</span>
                            </div>
                            <ChevronDown className="w-4 h-4 ml-auto -rotate-90 opacity-30" />
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href!)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive
                        ? 'bg-primary/15 text-primary'
                        : 'text-foreground/80 hover:bg-muted/50 hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                    {isActive && (
                      <motion.div layoutId="mobile-menu-active-dot" className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </button>
                );
              })}

              {/* Divider */}
              <div className="my-2 h-px bg-border/50" />

              {/* Theme Toggle in Menu */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-foreground/80 hover:bg-muted/50 hover:text-foreground transition-all"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </button>

              {/* Contact CTA */}
              <Button
                className="mt-2 w-full btn-glow rounded-xl py-5"
                onClick={() => scrollToSection('#contact')}
              >
                Get in Touch
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop-only theme toggle float — hidden on mobile */}
    </>
  );
};

export default Navigation;