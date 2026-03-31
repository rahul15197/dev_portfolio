import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CursorSpotlight from '@/components/CursorSpotlight';
import TestimonialsSection from '@/components/TestimonialsSection';
import ThemeToggleFloat from '@/components/ThemeToggleFloat';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <Navigation />
      <CursorSpotlight />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <ThemeToggleFloat />
    </div>
  );
};

export default Index;
