import { useRef, useEffect } from 'react';
import { Github, Linkedin, Mail, Download, Code, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TypewriterText from './TypewriterText';
import heroImage from '@/assets/hero-bg.jpg';
import FloatingProfileCard from './FloatingProfileCard';
import Terminal3D from './Terminal3D';
import { motion, useTransform, useMotionValue } from 'framer-motion';
import profileImage from '@/assets/profile.png';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const socialLinks = [
  { icon: Github, href: 'https://github.com/rahul15197', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/rm15197/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:rahul.maheshmaheshwari@gmail.com', label: 'Email' },
];

const scrollToSection = (href: string) => {
  if ((window as any).lenis) {
    (window as any).lenis.scrollTo(href, { offset: -80 });
  } else {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }
};

// =================== MOBILE HERO (Stitch Premium Static) ===================
const MobileHero = () => {
  return (
    <section
      className="relative min-h-[100dvh] w-full bg-background flex flex-col overflow-hidden px-6 pt-24 pb-16 justify-between gap-8"
      style={{ zIndex: 10 }}
    >
      {/* Premium Glass Effect Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/40 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/30 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none" />

      {/* Top Section: Profile Card */}
      <div className="relative z-10 flex flex-col items-center pt-4">
        <div className="w-[180px] sm:w-[200px] mb-6">
          <FloatingProfileCard />
        </div>
      </div>

      {/* Middle Section: Typography */}
      <div className="relative z-10 flex flex-col items-start w-full gap-2">
        <h1 className="font-black leading-none tracking-tight text-foreground">
          <span className="hero-gradient-text block mb-1" style={{ fontSize: 'clamp(2.5rem, 12vw, 4.5rem)' }}>Rahul</span>
          <span className="block" style={{ fontSize: 'clamp(1.6rem, 8.5vw, 3.2rem)' }}>Maheshwari</span>
        </h1>

        <div className="mt-4 flex items-center gap-2">
          <span className="w-8 h-[1px] bg-primary/50"></span>
          <p className="font-medium text-sm tracking-widest text-primary uppercase">
            <TypewriterText words={['Developer', 'QA']} />
          </p>
        </div>

        <div className="text-base text-muted-foreground leading-relaxed max-w-[90%] mt-2">
          Building polished, performant products with modern technologies, thoughtful QA, and a bias toward clean execution.
        </div>
      </div>

      {/* Bottom Section: CTAs & Socials */}
      <div className="relative z-10 flex flex-col w-full gap-4 mt-8">
        <Button
          size="lg"
          className="w-full rounded-2xl btn-glow transition-spring text-base px-8 py-6"
          onClick={() => scrollToSection('#projects')}
        >
          View My Work
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="w-full rounded-2xl btn-border-glow transition-smooth text-base px-8 py-6 soft-panel bg-card/40 backdrop-blur-md hover:bg-card/80"
        >
          <a href="https://drive.google.com/file/d/1I-CFzLrIurHKbecMfexe3hevU08kQKVB/view" target="_blank" rel="noopener noreferrer">
            <Download className="mr-2 h-5 w-5 opacity-70" /> Resume / CV
          </a>
        </Button>

        <div className="flex justify-start items-center w-full mt-4">
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-[14px] bg-card/50 border border-border/50 text-foreground hover:bg-card/80 transition-colors backdrop-blur-md"
                aria-label={`Visit ${social.label}`}
                onClick={(e) => {
                  if (social.href.startsWith('#')) {
                    e.preventDefault();
                    scrollToSection(social.href);
                  } else {
                    window.open(social.href, '_blank', 'noopener,noreferrer');
                  }
                }}
              >
                <social.icon className="h-5 w-5" />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


// =================== DESKTOP HERO (Scroll-Jacked Parallax) ===================
const DesktopHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Use a manual MotionValue driven by Lenis events.
  // Framer Motion's useScroll reads window.scrollY which Lenis does NOT update
  // synchronously — it smoothly interpolates via CSS transform. This means
  // useScroll stays at 0 in Chromium while Lenis is animating, so we must
  // subscribe directly to the Lenis scroll event for accurate progress.
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const lenis = (window as any).lenis;
      const section = containerRef.current;
      if (!lenis || !section) return;

      // Compute normalized scroll progress for this section (0 at top, 1 at bottom)
      const sectionTop = section.getBoundingClientRect().top + lenis.scroll;
      const sectionHeight = section.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, (lenis.scroll - sectionTop) / sectionHeight));
      scrollYProgress.set(progress);
    };

    // Poll via RAF until Lenis is ready, then subscribe
    let rafId: number;
    const waitForLenis = () => {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.on('scroll', update);
        update();
      } else {
        rafId = requestAnimationFrame(waitForLenis);
      }
    };
    waitForLenis();

    return () => {
      cancelAnimationFrame(rafId);
      const lenis = (window as any).lenis;
      if (lenis) lenis.off('scroll', update);
    };
  }, [scrollYProgress]);

  // Name translations (split apart & subtle vertical parallax)
  const leftNameX = useTransform(scrollYProgress, [0, 0.33], ["0vw", "-60vw"]);
  const rightNameX = useTransform(scrollYProgress, [0, 0.33], ["0vw", "60vw"]);
  const leftNameY = useTransform(scrollYProgress, [0, 0.33], ["0vh", "-15vh"]);
  const rightNameY = useTransform(scrollYProgress, [0, 0.33], ["0vh", "15vh"]);
  const namesOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // Card translation (center -> right)
  const cardX = useTransform(scrollYProgress, [0, 0.35], ["0vw", "25vw"]);
  const cardScale = useTransform(scrollYProgress, [0, 0.35], [1.2, 1]);

  // Main text content fade-in
  const contentOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.25, 0.45], [50, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] w-full bg-background"
      style={{ zIndex: 10 }}
    >
      {/* Sticky Frame */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center">

        {/* Background Layers */}
        <div className="hero-hex-bg" aria-hidden />
        <div className="absolute inset-0 pointer-events-none will-change-transform">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-subtle-pan"
            style={{
              backgroundImage: `url(${heroImage})`,
              filter: 'var(--hero-image-filter)',
              opacity: 'var(--hero-image-opacity)',
            }}
          />
        </div>
        <div className="absolute inset-0 pointer-events-none bg-background/80" />

        {/* --- SCROLL-JACKED LAYER 1: Initial Massive Names --- */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden" style={{ isolation: 'isolate' }}>
          {/* Top Text: Rahul */}
          <div className="absolute top-[20%] xl:top-[22%] w-full flex justify-center">
            <motion.div
              style={{ x: leftNameX, y: leftNameY, opacity: namesOpacity, z: 1 }}
              className="flex flex-col items-start whitespace-nowrap"
            >
              <span className="text-sm text-muted-foreground uppercase tracking-widest mb-2 font-medium">Software Engineer</span>
              <h1 className="text-[12vw] xl:text-[11vw] font-black leading-none tracking-tighter text-foreground hero-gradient-text pt-0">RAHUL</h1>
            </motion.div>
          </div>

          {/* Bottom Text: Maheshwari */}
          <div className="absolute top-[65%] xl:top-[68%] w-full flex justify-center">
            <motion.div
              style={{ x: rightNameX, y: rightNameY, opacity: namesOpacity, z: 1 }}
              className="flex flex-col items-end whitespace-nowrap"
            >
              <h1 className="text-[8vw] xl:text-[6.5vw] font-black leading-none tracking-tighter text-foreground">MAHESHWARI</h1>
              <span className="text-sm text-muted-foreground uppercase tracking-widest mt-2 font-medium">Full Stack &amp; QA</span>
            </motion.div>
          </div>
        </div>

        {/* --- SCROLL-JACKED LAYER 2: The Morphing Card --- */}
        <motion.div
          className="absolute z-30 pointer-events-auto"
          style={{ x: cardX, scale: cardScale, z: 1 }}
        >
          <FloatingProfileCard scrollProgress={scrollYProgress} />
        </motion.div>

        {/* --- SCROLL-JACKED LAYER 3: Regular Content Fade In --- */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY, z: 1 }}
          className="container relative z-40 px-6 w-full flex items-center justify-center h-full pointer-events-none will-change-transform will-change-opacity"
        >
          <div className="grid grid-cols-2 items-center gap-12 lg:gap-16 w-full h-full">
            {/* Left Content that fades in */}
            <div className="flex items-center justify-start w-full pointer-events-auto h-full pt-0 pb-0 z-[50]">
              <div className="text-left max-w-3xl w-full">
                <p className="section-kicker mb-5 justify-start">Capabilities</p>
                <h2 className="display-title text-5xl md:text-7xl mb-6 leading-[1.05] md:leading-[0.92]">
                  <span className="hero-gradient-text tracking-tight block">Software</span>
                  <span className="block mt-1">
                    <TypewriterText words={['Developer', 'QA']} />
                  </span>
                </h2>

                <p className="text-lg md:text-2xl text-muted-foreground mb-8 max-w-xl leading-relaxed text-balance-tight">
                  Building polished, performant products with modern technologies, thoughtful QA, and a bias toward clean execution.
                </p>

                <div className="flex flex-row gap-4 justify-start mb-10">
                  <Button size="lg" className="btn-glow transition-spring text-lg px-8 py-6 rounded-xl" onClick={() => scrollToSection('#projects')}>
                    View My Work
                  </Button>
                  <Button asChild variant="outline" size="lg" className="resume-button btn-border-glow transition-smooth text-lg px-8 py-6 rounded-xl soft-panel">
                    <a href="https://drive.google.com/file/d/1I-CFzLrIurHKbecMfexe3hevU08kQKVB/view" target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-5 w-5" /> Resume/CV
                    </a>
                  </Button>
                </div>

                {/* Social Links */}
                <div className="flex justify-start gap-4">
                  {socialLinks.map((social, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="icon"
                      className="social-icon-btn h-10 w-10 rounded-full bg-card/40 hover:bg-card/80 backdrop-blur-md"
                      aria-label={`Visit ${social.label}`}
                      onClick={() => social.href.startsWith('#') ? scrollToSection(social.href) : window.open(social.href, '_blank', 'noopener,noreferrer')}
                    >
                      <social.icon className="h-5 w-5" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            {/* Right side left empty in grid because card moved here absolutely */}
            <div className="w-full h-full pointer-events-none" />
          </div>
        </motion.div>

        {/* Floating Icons */}
        <motion.div style={{ opacity: namesOpacity }} className="absolute z-10 pointer-events-none inset-0">
          <div className="absolute top-28 right-1/4 opacity-60 [perspective:800px] animate-subtle-pan" aria-hidden>
            <div className="glass-card p-3 rounded-xl shadow animate-float [transform-style:preserve-3d] rotate-y-6 rotate-x-6">
              <Code className="h-5 w-5" />
            </div>
          </div>
          <div className="absolute bottom-32 left-1/4 opacity-60 [perspective:800px] animate-subtle-pan" style={{ animationDelay: '1s' }} aria-hidden>
            <div className="glass-card p-3 rounded-xl shadow animate-float [transform-style:preserve-3d] -rotate-y-6 rotate-x-6">
              <Cpu className="h-5 w-5" />
            </div>
          </div>
        </motion.div>

        {/* 3D Terminal at bottom center */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none"
        >
          <div className="scale-[0.85] opacity-90 origin-bottom">
            <Terminal3D className="" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

// =================== COMPONENT EXPORT ===================
const HeroSection = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  
  return (
    <div id="home">
      {isDesktop ? <DesktopHero /> : <MobileHero />}
    </div>
  );
};

export default HeroSection;
