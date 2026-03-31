import { useEffect, useRef, useCallback } from 'react';
import { Github, Linkedin, Mail, Download, Code, Cpu, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TypewriterText from './TypewriterText';
import heroImage from '@/assets/hero-bg.jpg';
import FloatingProfileCard from './FloatingProfileCard';
import Terminal3D from './Terminal3D';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

const HeroSection = () => {
  const leftReveal = useScrollReveal({ threshold: 0.1 });
  const rightReveal = useScrollReveal({ threshold: 0.1 });

  // Refs for direct DOM mutation (no React re-renders on scroll)
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const centerOffsetRef = useRef(0);
  const viewportHeightRef = useRef(800);
  const frameId = useRef<number | null>(null);

  // Measure center offset for card morph
  const measureCenter = useCallback(() => {
    if (!cardWrapperRef.current) return;
    // Temporarily reset transform for measurement
    const el = cardWrapperRef.current;
    const savedTransform = el.style.transform;
    el.style.transform = 'none';
    const rect = el.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    centerOffsetRef.current = window.innerWidth / 2 - cardCenter;
    el.style.transform = savedTransform;
  }, []);

  useEffect(() => {
    viewportHeightRef.current = window.innerHeight;

    const updateScroll = () => {
      const container = stickyRef.current;
      if (!container) return;

      const scrollY = window.scrollY;
      const vh = viewportHeightRef.current;
      const rawProgress = vh > 0 ? scrollY / vh : 0;
      const scrollProgress = Math.max(0, Math.min(rawProgress, 1));
      const p = easeOutQuart(scrollProgress);
      const invP = 1 - p;

      // Set CSS custom properties on the sticky container — no React re-render
      const s = container.style;
      s.setProperty('--sp', `${scrollProgress}`);
      s.setProperty('--p', `${p}`);
      s.setProperty('--invP', `${invP}`);
      s.setProperty('--p-neg', `${p * -100}%`);
      s.setProperty('--p-pos', `${p * 100}%`);
      s.setProperty('--fade', `${1 - scrollProgress * 1.5}`);
      s.setProperty('--content-y', `${invP * 40}px`);
      s.setProperty('--pointer', p < 0.5 ? 'none' : 'auto');
      s.setProperty('--orb-show', `${scrollProgress > 0 ? scrollProgress : 0}`);
      s.setProperty('--icon-show', `${scrollProgress > 0.5 ? 0.6 : 0}`);

      // Card wrapper transform (center offset needs JS)
      if (cardWrapperRef.current) {
        cardWrapperRef.current.style.transform = `translateX(${invP * centerOffsetRef.current}px) scale(${1 + invP * 0.15})`;
      }
    };

    const handleScroll = () => {
      if (frameId.current !== null) return;
      frameId.current = requestAnimationFrame(() => {
        updateScroll();
        frameId.current = null;
      });
    };

    const handleResize = () => {
      viewportHeightRef.current = window.innerHeight;
      measureCenter();
      updateScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Initial measure
    setTimeout(() => {
      handleResize();
      updateScroll();
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (frameId.current !== null) cancelAnimationFrame(frameId.current);
    };
  }, [measureCenter]);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/rahul15197', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/rm15197/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:rahul.maheshmaheshwari@gmail.com', label: 'Email' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-[200vh]">
      {/* Sticky Scroll Container — all scroll-driven values via CSS custom properties */}
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center" style={{
        '--sp': '0', '--p': '0', '--invP': '1',
        '--p-neg': '0%', '--p-pos': '0%', '--fade': '1',
        '--content-y': '40px', '--pointer': 'none',
        '--orb-show': '0', '--icon-show': '0',
      } as React.CSSProperties}>
        {/* Hexagonal animated background - hero only */}
        <div className="hero-hex-bg" aria-hidden />
        {/* Background Image */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            opacity: 'var(--hero-image-opacity)',
            transform: `scale(1.1)`,
            transition: 'transform 0.1s linear',
          }}
        >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-subtle-pan"
          style={{
            backgroundImage: `url(${heroImage})`,
            filter: 'var(--hero-image-filter)',
          }}
        />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--hero-overlay)' }}
      />

      {/* Centered Massive Text Initial State */}
      <div className="absolute inset-x-0 w-full top-1/2 -translate-y-[55%] flex items-center justify-center gap-6 md:gap-14 lg:gap-18 px-[4vw] pointer-events-none z-0">
         <div className="flex-1 min-w-0 flex justify-end" style={{ transform: 'translateX(var(--p-neg))', opacity: 'var(--fade)' }}>
           <div className="flex flex-col items-start relative">
             <div className="absolute bottom-full left-0 text-[10px] sm:text-[11px] md:text-[13px] text-muted-foreground/80 mb-1 sm:mb-2 ml-1 whitespace-nowrap">Software Engineer</div>
             <h1 className="text-[18vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] xl:text-[5vw] 2xl:text-[4.4vw] font-black tracking-tighter text-foreground whitespace-nowrap leading-none m-0 p-0">RAHUL</h1>
           </div>
         </div>
         
         <div className="w-[50vw] sm:w-[280px] md:w-[320px] lg:w-[340px] max-w-[360px] opacity-0 shrink-0" />
         
         <div className="flex-1 min-w-0 flex flex-col justify-start items-start" style={{ transform: 'translateX(var(--p-pos))', opacity: 'var(--fade)' }}>
           <div className="flex flex-col items-end relative">
             <h1 className="text-[9vw] sm:text-[5vw] md:text-[4vw] lg:text-[3vw] xl:text-[2.5vw] 2xl:text-[2.2vw] font-black tracking-tighter text-foreground whitespace-nowrap leading-none m-0 p-0">MAHESHWARI</h1>
             <div className="absolute top-full right-0 text-[10px] sm:text-[11px] md:text-[13px] text-muted-foreground/80 mt-1 sm:mt-2 mr-1 whitespace-nowrap">Full Stack & QA</div>
           </div>
         </div>
      </div>

      {/* Content */}
      <div 
        className="container relative z-10 px-6 w-full h-full flex items-center"
      >
        <div 
          className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-16 w-full portrait-hero-grid"
        >
          {/* Left: Text Content */}
          <div className="h-full flex items-center">
            <div style={{
                opacity: 'var(--sp)',
                transform: 'translateY(var(--content-y))',
                pointerEvents: 'var(--pointer)' as React.CSSProperties['pointerEvents'],
                minWidth: '300px'
            }}>
              <div className="text-center md:text-left max-w-3xl mx-auto md:mx-0">
                <p className="section-kicker mb-5 justify-center md:justify-start">Software Engineer · Full Stack · QA</p>
                <h1 className="display-title text-6xl md:text-7xl lg:text-8xl mb-6 leading-[0.92]">
                  <span className="hero-gradient-text">Software</span>
                  <br />
                  <TypewriterText words={['Developer', 'QA']} />
                </h1>
                <p className="text-lg md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                  Building polished, performant products with modern technologies,
                  thoughtful QA, and a bias toward clean execution.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-10">
                  <Button size="lg" className="btn-glow transition-spring text-lg px-8 py-3" onClick={() => scrollToSection('#projects')}>
                    View My Work
                  </Button>
                  <Button asChild variant="outline" size="lg" className="resume-button btn-border-glow transition-smooth text-lg px-8 py-3 rounded-xl soft-panel">
                    <a href="https://drive.google.com/file/d/1I-CFzLrIurHKbecMfexe3hevU08kQKVB/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-5 w-5" />
                      Resume/CV
                    </a>
                  </Button>
                </div>
                {/* Social Links */}
                <div className="flex justify-center md:justify-start gap-4">
                  {socialLinks.map((social, index) => (
                    <Button 
                       key={index} 
                       variant="ghost" 
                       size="icon" 
                       className="social-icon-btn" 
                       aria-label={`Visit ${social.href}`} 
                       onClick={() => social.href.startsWith('#') ? scrollToSection(social.href) : window.open(social.href, '_blank', 'noopener,noreferrer')}
                    >
                      <social.icon className="h-6 w-6" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Right: Floating Profile Card */}
          <div className="flex justify-center md:justify-end w-full">
            <div ref={cardWrapperRef}>
              <FloatingProfileCard scrollProgress={1} />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full blur-[2px] animate-float transition-opacity" style={{ background: 'var(--hero-orb-primary)', opacity: 'var(--orb-show)' }} />
      <div className="absolute bottom-20 right-10 w-16 h-16 rounded-full blur-[2px] animate-float transition-opacity" style={{ background: 'var(--hero-orb-accent)', animationDelay: '1s', opacity: 'var(--orb-show)' }} />
      <div className="absolute top-1/2 left-20 w-12 h-12 rounded-full blur-[1px] animate-float transition-opacity" style={{ background: 'var(--hero-orb-soft)', animationDelay: '2s', opacity: 'var(--orb-show)' }} />

      {/* Fun 3D-ish moving icons */}
      <div className="absolute top-28 right-1/3 opacity-60 [perspective:800px] transition-opacity" style={{ opacity: 'var(--icon-show)' }} aria-hidden>
        <div className="glass-card p-3 rounded-xl shadow hover:shadow-lg animate-float [transform-style:preserve-3d] rotate-y-6 rotate-x-6">
          <Code className="h-5 w-5" />
        </div>
      </div>
      <div className="absolute bottom-28 left-1/3 opacity-60 [perspective:800px] transition-opacity" style={{ opacity: 'var(--icon-show)', animationDelay: '0.8s' }} aria-hidden>
        <div className="glass-card p-3 rounded-xl shadow hover:shadow-lg animate-float [transform-style:preserve-3d] -rotate-y-6 rotate-x-6">
          <Cpu className="h-5 w-5" />
        </div>
      </div>
      <div className="absolute top-1/3 right-6 opacity-60 [perspective:800px] transition-opacity" style={{ opacity: 'var(--icon-show)', animationDelay: '1.6s' }} aria-hidden>
        <div className="glass-card p-3 rounded-xl shadow hover:shadow-lg animate-float [transform-style:preserve-3d] rotate-y-6 -rotate-x-6">
          <Database className="h-5 w-5" />
        </div>
      </div>

      {/* 3D Terminal at bottom center */}
      <div style={{ opacity: 'var(--sp)' }}>
        <Terminal3D className="absolute bottom-6 left-1/2 -translate-x-1/2" />
      </div>
     </div>
    </section>
  );
};

export default HeroSection;
