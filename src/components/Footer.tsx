import { Github, Linkedin, Instagram, Heart, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import antigravityLogo from '@/assets/antigravity_logo.png';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const Footer = () => {
  const footerReveal = useScrollReveal();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/rahul15197', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/rm15197/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/rahul.zeroone/', label: 'Instagram' },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      ref={footerReveal.ref}
      className={`py-6 relative border-t border-border/10 reveal ${footerReveal.isVisible ? 'visible' : ''}`}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold hero-gradient-text mb-1 cursor-pointer" onClick={scrollToTop}>
              <span aria-label="Rahul logo">{'<rahul/>'}</span>
            </div>
            <p className="text-muted-foreground text-sm flex items-center justify-center gap-1 mb-2">
              © 2026 Made with <Heart className="h-3.5 w-3.5 text-red-500" fill="currentColor" /> by Rahul
            </p>
          </div>

          <div className="flex items-center justify-center space-x-4">
            {socialLinks.map((social, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className="social-icon-btn"
                onClick={() => window.open(social.href, '_blank', 'noopener,noreferrer')}
                aria-label={social.label}
                title={social.label}
              >
                <social.icon className="h-5 w-5" />
              </Button>
            ))}
          </div>

          <div className="flex justify-center mt-1">
            <button
              onClick={scrollToTop}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1.5px] transition-all duration-500 w-[140px] h-[40px] hover:w-[44px] hover:h-[44px]"
              aria-label="Back to Top"
            >
              <span className="absolute inset-[-1000%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,hsl(var(--primary))_50%,transparent_100%)] opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative inline-flex h-full w-full items-center justify-center rounded-full bg-card/90 font-medium text-sm backdrop-blur-xl transition-all duration-500 text-foreground group-hover:bg-card/60">
                <span className="absolute whitespace-nowrap transition-all duration-500 group-hover:opacity-0 group-hover:scale-50">Back to Top</span>
                <ArrowUp className="absolute h-5 w-5 opacity-0 scale-50 transition-all duration-500 text-primary group-hover:opacity-100 group-hover:scale-100" />
              </div>
            </button>
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-border/10 text-center">
          <div className="text-muted-foreground text-xs flex items-center justify-center gap-1.5 align-middle">
            Designed and built with modern web technologies using<img src={antigravityLogo} alt="Antigravity Logo" className="h-[18px] object-contain inline-block align-middle ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
