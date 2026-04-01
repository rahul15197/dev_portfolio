import { useRef } from 'react';
import { Github, Linkedin, Mail, Download, Code, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TypewriterText from './TypewriterText';
import heroImage from '@/assets/hero-bg.jpg';
import FloatingProfileCard from './FloatingProfileCard';
import Terminal3D from './Terminal3D';
import { motion, useScroll, useTransform } from 'framer-motion';
import profileImage from '@/assets/profile.png';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Name translations (split apart & subtle vertical parallax) — desktop only
  const leftNameX = useTransform(scrollYProgress, [0, 0.33], ["0vw", "-60vw"]);
  const rightNameX = useTransform(scrollYProgress, [0, 0.33], ["0vw", "60vw"]);
  const leftNameY = useTransform(scrollYProgress, [0, 0.33], ["0vh", "-15vh"]);
  const rightNameY = useTransform(scrollYProgress, [0, 0.33], ["0vh", "15vh"]);
  const namesOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // Card translation (center -> right) — desktop only
  const cardX = useTransform(scrollYProgress, [0, 0.35], ["0vw", "25vw"]);
  const cardScale = useTransform(scrollYProgress, [0, 0.35], [1.2, 1]);

  // Main text content fade-in — desktop only
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
    <div id="home">
      {/* =================== MOBILE HERO (static, fully visible) =================== */}
      <section
        className="md:hidden relative min-h-[100dvh] w-full bg-background flex flex-col overflow-x-hidden"
        style={{ zIndex: 10 }}
      >
        {/* Background */}
        <div className="hero-hex-bg" aria-hidden />
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${heroImage})`,
              filter: 'var(--hero-image-filter)',
              opacity: 'var(--hero-image-opacity)',
            }}
          />
        </div>
        <div className="absolute inset-0 pointer-events-none bg-background/50 backdrop-blur-[2px]" />

        {/* Mobile content — vertical stack, always visible */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-5 pt-20 pb-10 gap-5 min-h-[inherit]">

          {/* Profile Card — centered, prominent */}
          <div className="w-full max-w-[220px] mx-auto">
            <FloatingProfileCard scrollProgress={1} />
          </div>

          {/* Name + title */}
          <div className="text-center w-full overflow-hidden">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium block mb-1">
              Software Engineer
            </span>
            <h1 className="font-black leading-none tracking-tight text-foreground hero-gradient-text" style={{ fontSize: 'min(15vw, 58px)' }}>
              RAHUL
            </h1>
            <h2 className="font-black leading-none text-foreground" style={{ fontSize: 'min(7.5vw, 29px)', letterSpacing: '-0.02em' }}>
              MAHESHWARI
            </h2>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium block mt-1">
              Full Stack &amp; QA
            </span>
          </div>

          {/* Typewriter + description */}
          <div className="text-center w-full">
            <p className="section-kicker mb-2 justify-center">Capabilities</p>
            <div className="text-2xl font-bold mb-3">
              <TypewriterText words={['Developer', 'QA']} />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
              Building polished, performant products with modern technologies, thoughtful QA, and a bias toward clean execution.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
            <Button
              size="lg"
              className="btn-glow transition-spring text-base px-8 py-6 w-full rounded-full"
              onClick={() => scrollToSection('#projects')}
            >
              View My Work
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="resume-button btn-border-glow transition-smooth text-base px-8 py-6 w-full rounded-full soft-panel"
            >
              <a href="https://drive.google.com/file/d/1I-CFzLrIurHKbecMfexe3hevU08kQKVB/view" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-5 w-5" /> Resume/CV
              </a>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className="social-icon-btn h-12 w-12 rounded-full bg-card/40 hover:bg-card/80 backdrop-blur-md"
                aria-label={`Visit ${social.label}`}
                onClick={() => social.href.startsWith('#') ? scrollToSection(social.href) : window.open(social.href, '_blank', 'noopener,noreferrer')}
              >
                <social.icon className="h-5 w-5" />
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* =================== DESKTOP HERO (scroll-jacked parallax) =================== */}
      <section
        ref={containerRef}
        className="relative h-[300vh] w-full bg-background hidden md:block"
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
          <div className="absolute inset-0 pointer-events-none bg-background/50 backdrop-blur-[2px]" />

          {/* --- SCROLL-JACKED LAYER 1: Initial Massive Names --- */}
          <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
            {/* Top Text: Rahul */}
            <div className="absolute top-[20%] xl:top-[22%] w-full flex justify-center">
              <motion.div
                style={{ x: leftNameX, y: leftNameY, opacity: namesOpacity }}
                className="flex flex-col items-start whitespace-nowrap"
              >
                <span className="text-sm text-muted-foreground uppercase tracking-widest mb-2 font-medium">Software Engineer</span>
                <h1 className="text-[12vw] xl:text-[11vw] font-black leading-none tracking-tighter text-foreground hero-gradient-text pt-0">RAHUL</h1>
              </motion.div>
            </div>

            {/* Bottom Text: Maheshwari */}
            <div className="absolute top-[65%] xl:top-[68%] w-full flex justify-center">
              <motion.div
                style={{ x: rightNameX, y: rightNameY, opacity: namesOpacity }}
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
            style={{ x: cardX, scale: cardScale }}
          >
            <FloatingProfileCard scrollProgress={1} />
          </motion.div>

          {/* --- SCROLL-JACKED LAYER 3: Regular Content Fade In --- */}
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="container relative z-40 px-6 w-full flex items-center justify-center h-full pointer-events-none"
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
    </div>
  );
};

export default HeroSection;
