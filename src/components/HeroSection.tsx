import { useRef } from 'react';
import { Github, Linkedin, Mail, Download, Code, Cpu, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TypewriterText from './TypewriterText';
import heroImage from '@/assets/hero-bg.jpg';
import FloatingProfileCard from './FloatingProfileCard';
import Terminal3D from './Terminal3D';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Name translations (split apart & subtle vertical parallax)
  const leftNameX = useTransform(scrollYProgress, [0, 0.33], ["0vw", "-60vw"]);
  const rightNameX = useTransform(scrollYProgress, [0, 0.33], ["0vw", "60vw"]);
  const leftNameY = useTransform(scrollYProgress, [0, 0.33], ["0vh", "-15vh"]);
  const rightNameY = useTransform(scrollYProgress, [0, 0.33], ["0vh", "15vh"]);
  const namesOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // Card translation (center -> right)
  const cardX = useTransform(scrollYProgress, [0, 0.35], ["0vw", "25vw"]);
  const cardScale = useTransform(scrollYProgress, [0, 0.35], [1.2, 1]);
  // Mobile adjustments
  const mobileCardY = useTransform(scrollYProgress, [0, 0.35], ["0vh", "-15vh"]);

  // Main text content fade-in
  const contentOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.25, 0.45], [50, 0]);

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
    <section ref={containerRef} id="home" className="relative h-[300vh] w-full bg-background" style={{ zIndex: 10 }}>
      {/* Sticky Frame */}
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden flex items-center justify-center">
        
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
        <div className="absolute inset-0 pointer-events-none bg-background/50 backdrop-blur-[2px]" />

        {/* --- SCROLL-JACKED LAYER 1: Initial Massive Names --- */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          {/* Top Text: Rahul (Shifted Up, Larger) */}
          <div className="absolute top-[18%] md:top-[20%] xl:top-[22%] w-full flex justify-center">
            <motion.div 
              style={{ x: leftNameX, y: leftNameY, opacity: namesOpacity }}
              className="flex flex-col items-start whitespace-nowrap"
            >
              <span className="text-[10px] md:text-sm text-muted-foreground uppercase tracking-widest mb-1 md:mb-2 font-medium">Software Engineer</span>
              <h1 className="text-[16vw] md:text-[12vw] xl:text-[11vw] font-black leading-none tracking-tighter text-foreground hero-gradient-text">RAHUL</h1>
            </motion.div>
          </div>

          {/* Bottom Text: Maheshwari (Shifted Down, Smaller) */}
          <div className="absolute top-[62%] md:top-[65%] xl:top-[68%] w-full flex justify-center">
            <motion.div 
              style={{ x: rightNameX, y: rightNameY, opacity: namesOpacity }}
              className="flex flex-col items-end whitespace-nowrap"
            >
              <h1 className="text-[10vw] md:text-[8vw] xl:text-[6.5vw] font-black leading-none tracking-tighter text-foreground">MAHESHWARI</h1>
              <span className="text-[10px] md:text-sm text-muted-foreground uppercase tracking-widest mt-1 md:mt-2 font-medium">Full Stack & QA</span>
            </motion.div>
          </div>
        </div>

        {/* --- SCROLL-JACKED LAYER 2: The Morphing Card --- */}
        {/* Card starts at absolute center, then moves to normal grid position */}
        <motion.div 
          className="absolute z-30 pointer-events-auto hidden md:block"
          style={{ x: cardX, scale: cardScale }}
        >
          <FloatingProfileCard scrollProgress={1} />
        </motion.div>

        {/* Mobile card morphing */}
        <motion.div 
          className="absolute z-30 pointer-events-auto md:hidden"
          style={{ y: mobileCardY, scale: cardScale }}
        >
          <div className="transform scale-[0.85]">
            <FloatingProfileCard scrollProgress={1} />
          </div>
        </motion.div>

        {/* --- SCROLL-JACKED LAYER 3: Regular Content Fade In --- */}
        <motion.div 
          style={{ opacity: contentOpacity, y: contentY }}
          className="container relative z-40 px-6 w-full flex items-center justify-center h-full pointer-events-none"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-16 w-full h-full">
            {/* Left Content that fades in */}
            <div className="flex items-center justify-center md:justify-start w-full pointer-events-auto h-full sm:pt-[50vh] md:pt-0">
              <div className="text-center md:text-left max-w-3xl w-full">
                <p className="section-kicker mb-3 md:mb-5 justify-center md:justify-start">Capabilities</p>
                <h2 className="display-title text-5xl sm:text-6xl md:text-7xl mb-4 md:mb-6 leading-[1.05] md:leading-[0.92]">
                  <span className="hero-gradient-text tracking-tight block">Software</span>
                  <span className="block mt-1">
                    <TypewriterText words={['Developer', 'QA']} />
                  </span>
                </h2>
                
                <p className="text-base sm:text-lg md:text-2xl text-muted-foreground mb-6 md:mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed text-balance-tight">
                  Building polished, performant products with modern technologies, thoughtful QA, and a bias toward clean execution.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8 md:mb-10 px-6 md:px-0">
                  <Button size="lg" className="btn-glow transition-spring text-base md:text-lg px-8 py-6 sm:py-3 w-full sm:w-auto rounded-full sm:rounded-xl" onClick={() => scrollToSection('#projects')}>
                    View My Work
                  </Button>
                  <Button asChild variant="outline" size="lg" className="resume-button btn-border-glow transition-smooth text-base md:text-lg px-8 py-6 sm:py-3 w-full sm:w-auto rounded-full sm:rounded-xl soft-panel">
                    <a href="https://drive.google.com/file/d/1I-CFzLrIurHKbecMfexe3hevU08kQKVB/view" target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-5 w-5" /> Resume/CV
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
                       className="social-icon-btn h-12 w-12 sm:h-10 sm:w-10 rounded-full bg-card/40 hover:bg-card/80 backdrop-blur-md" 
                       aria-label={`Visit ${social.href}`} 
                       onClick={() => social.href.startsWith('#') ? scrollToSection(social.href) : window.open(social.href, '_blank', 'noopener,noreferrer')}
                    >
                      <social.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            {/* Right side left empty in grid because card moved here absolutely */}
            <div className="hidden md:block w-full h-full pointer-events-none" />
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
          className="absolute bottom-8 left-0 right-0 hidden lg:flex justify-center pointer-events-none"
        >
          <div className="scale-[0.85] opacity-90 origin-bottom">
            <Terminal3D className="" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
