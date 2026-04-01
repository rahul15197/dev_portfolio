import { useEffect, useMemo, useRef, useState } from 'react';
import { Home, User, Briefcase, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(false);
  const [active, setActive] = useState<string>('#home');
  
  const navItems = useMemo(() => [
    { href: '#home', label: 'Home', icon: Home },
    { href: '#about', label: 'About', icon: User },
    { href: '#projects', label: 'Projects', icon: Briefcase },
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
    }, {
      threshold: [0.55]
    });
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
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setActive(href);
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-smooth ${isScrolled ? 'nav-glass shadow-[0_12px_40px_hsl(215_24%_18%_/_0.06)]' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4">
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
                  style={{
                    left: highlight.left,
                    top: highlight.top,
                    width: highlight.width
                  }} 
                  aria-hidden 
                />
              )}
              <div className="soft-panel flex items-center gap-2 px-3 py-2 rounded-full border border-border/70 bg-card/60 backdrop-blur-xl shadow-[0_10px_30px_hsl(215_24%_18%_/_0.08)]">
                {navItems.map(item => (
                  <button 
                    key={item.href} 
                    ref={el => btnRefs.current[item.href] = el} 
                    onClick={() => scrollToSection(item.href)} 
                    className={`relative text-sm px-2 py-1 transition-smooth ${active === item.href ? 'text-primary' : 'text-foreground'}`}
                  >
                    <span className="relative z-10 px-2">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right CTA */}
            <div>
              <Button variant="outline" className="rounded-full px-5 soft-panel btn-border-glow text-xs md:text-sm" onClick={() => scrollToSection('#contact')}>
                Get in Touch
              </Button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Bottom Dock Navbar (Nikola Radeski style) */}
      <AnimatePresence>
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="md:hidden fixed bottom-4 sm:bottom-6 left-0 right-0 z-[100] w-full flex justify-center px-4 pointer-events-none"
        >
          <div className="rounded-full p-1 sm:p-1.5 border border-border/20 shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex items-center gap-0.5 sm:gap-1 bg-zinc-900 dark:bg-black/90 backdrop-blur-3xl text-zinc-300 pointer-events-auto w-max max-w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {navItems.filter(item => item.href !== '#contact').map((item) => {
              const Icon = item.icon;
              const isActive = active === item.href;
              return (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-3.5 py-2.5 rounded-full flex items-center gap-1.5 transition-colors text-[11px] font-medium tracking-wide ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="mobile-active-pill"
                      className="absolute inset-0 bg-white/10 rounded-full z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                  {item.href === '#home' ? (
                    <Icon className="w-4 h-4 relative z-10" />
                  ) : (
                    <span className="relative z-10">{item.label}</span>
                  )}
                </button>
              );
            })}
             <button
                onClick={() => scrollToSection('#contact')}
                className="relative px-4 py-2 ml-1 rounded-full text-[11px] font-bold tracking-wide bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg"
              >
                Contact
             </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Navigation;