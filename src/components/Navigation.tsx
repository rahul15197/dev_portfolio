import { useEffect, useMemo, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [active, setActive] = useState<string>('#home');
  const navItems = useMemo(() => [{
    href: '#home',
    label: 'Home'
  }, {
    href: '#about',
    label: 'About'
  }, {
    href: '#projects',
    label: 'Projects'
  }, {
    href: '#contact',
    label: 'Contact'
  }], []);
  const barRef = useRef<HTMLDivElement | null>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [highlight, setHighlight] = useState<{
    left: number;
    top: number;
    width: number;
  } | null>(null);
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
    setHighlight({
      left,
      top,
      width
    });
  }, [active]);
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({
      behavior: 'smooth'
    });
    setIsMobileMenuOpen(false);
    setActive(href);
  };
  return <nav className={`fixed top-0 left-0 right-0 z-[100] transition-smooth ${isScrolled ? 'nav-glass shadow-[0_12px_40px_hsl(215_24%_18%_/_0.06)]' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <button className="flex items-center gap-3 text-left" onClick={() => scrollToSection('#home')}>
            <div className="text-2xl font-bold hero-gradient-text"><span aria-label="Rahul logo">{'<rahul>'}</span></div>
            <div className="hidden lg:block">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">Engineering</p>
              <p className="text-sm text-foreground/80">Building Solutions and Experiences</p>
            </div>
          </button>

          {/* Centered nav */}
          <div ref={barRef} className="hidden md:flex relative items-center justify-center mx-auto">
            {highlight && <div className="absolute h-10 rounded-full border border-primary/20 bg-primary/10 transition-all duration-500 ease-out" style={{
            left: highlight.left,
            top: highlight.top,
            width: highlight.width
          }} aria-hidden />}
            <div className="soft-panel flex items-center gap-2 px-3 py-2 rounded-full border border-border/70 bg-card/60 backdrop-blur-xl shadow-[0_10px_30px_hsl(215_24%_18%_/_0.08)]">
              {navItems.map(item => <button key={item.href} ref={el => btnRefs.current[item.href] = el} onClick={() => scrollToSection(item.href)} className={`relative text-sm px-2 py-1 transition-smooth ${active === item.href ? 'text-primary' : 'text-foreground'}`}>
                  <span className="relative z-10 px-2">{item.label}</span>
                </button>)}
            </div>
          </div>

          {/* Right CTA */}
          <div className="hidden md:block">
            <Button variant="outline" className="rounded-full px-5 soft-panel btn-border-glow" onClick={() => scrollToSection('#contact')}>
              Get in Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden glass-card soft-panel" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && <div className="md:hidden mt-4 glass-card soft-panel p-5">
            <div className="mb-4">
              <p className="section-kicker">Navigate</p>
            </div>
            <div className="flex flex-col space-y-2">
              {navItems.map(item => <button key={item.href} onClick={() => scrollToSection(item.href)} className="text-left text-foreground hover:text-primary transition-smooth py-2">
                  <span className="inline-flex min-w-full items-center justify-between rounded-2xl border border-transparent px-3 py-3 hover:border-border/70 hover:bg-card/50">
                    {item.label}
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">0{navItems.findIndex(navItem => navItem.href === item.href) + 1}</span>
                  </span>
                </button>)}
              <Button variant="outline" className="mt-3 soft-panel" onClick={() => scrollToSection('#contact')}>
                Get in Touch
              </Button>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navigation;