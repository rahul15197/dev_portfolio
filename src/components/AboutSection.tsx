import { Code, Database, Globe, Bot } from 'lucide-react';
import { useScrollReveal, staggerDelay } from '@/hooks/useScrollReveal';
import ScrollRevealText from './ScrollRevealText';
import dxcLogo from "@/assets/logos/dxc-new.png";
import oracleLogo from "@/assets/logos/oracle-new.png";
import sandiskLogo from "@/assets/logos/sandisk-new.png";

const AboutSection = () => {
  const headerReveal = useScrollReveal();
  const leftReveal = useScrollReveal({ rootMargin: '0px 0px -40px 0px' });
  const rightReveal = useScrollReveal({ rootMargin: '0px 0px -40px 0px' });
  const statsReveal = useScrollReveal();

  const interests = ['Fitness', 'Travel', 'Gaming', 'Anime'];

  const skills = [
    { icon: Code, title: 'Frontend Development', description: 'Flask, Django, Electron', color: 'text-primary' },
    { icon: Database, title: 'Backend Development', description: 'Python, C++, SQL, MongoDB', color: 'text-accent' },
    { icon: Globe, title: 'Web Technologies', description: 'REST APIs, Docker, AWS, Cloud', color: 'text-primary-glow' },
    { icon: Bot, title: 'AI & ML', description: 'GenAI, AI Agents, NLP', color: 'text-accent-glow' },
  ];

  const stats = [
    { number: '20+', label: 'Projects Completed' },
    { number: '5+', label: 'Years Experience' },
    { number: '10+', label: 'Technologies' },
    { number: '100%', label: 'Client Satisfaction' },
  ];

  const experiences = [
    { company: 'Sandisk', role: 'Senior Software Engineer', period: 'Nov 2024 – Present', logo: sandiskLogo },
    { company: 'Oracle', role: 'Member Technical Staff SDE2', period: 'Jun 2021 – Apr 2024', logo: oracleLogo },
    { company: 'DXC Technology', role: 'Associate Developer', period: 'Sep 2018 – May 2019', logo: dxcLogo },
  ];

  return (
    <section id="about" className="py-16 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div
          ref={headerReveal.ref}
          className={`text-center mb-16 reveal ${headerReveal.isVisible ? 'visible' : ''}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="hero-gradient-text">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I have been building with technology for 14+ years and working professionally for 5+ years,
            with a focus on thoughtful engineering, reliable systems, and products that feel polished in use.
          </p>
        </div>

        {/* Two-column layout with stretch alignment */}
        <div className="grid lg:grid-cols-[0.96fr_1.04fr] gap-8 items-stretch mb-8">
          {/* Left: Story + Education */}
          <div
            ref={leftReveal.ref}
            className={`flex h-full flex-col gap-4 reveal-left ${leftReveal.isVisible ? 'visible' : ''}`}
          >
            <div className="glass-card soft-panel p-7 md:p-8">
              <h3 className="text-2xl font-semibold mb-5 hero-gradient-text">What I Build and What Fuels Me</h3>
              <div className="space-y-6 text-muted-foreground leading-relaxed mt-2">
                <ScrollRevealText text="Started my journey as a self-taught developer, driven by curiosity and passion for technology. I believe in writing clean, maintainable code and creating user experiences that make a difference." />
                <ScrollRevealText text="When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community." />
                <ScrollRevealText text="Outside work, I recharge through movement, new places, immersive games, and the kind of storytelling that makes anime memorable." />
              </div>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {interests.map((interest) => (
                  <span key={interest} className="rounded-full border border-border/70 bg-card/45 px-3 py-1.5 text-sm text-foreground/90">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            <div className="glass-card soft-panel p-6 md:p-7">
              <h3 className="text-2xl font-semibold mb-4 hero-gradient-text">Education</h3>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  <strong>Bachelor of Technology (CSE)</strong>, Medicaps Indore — 2018
                </p>
                <p>
                  <strong>Master of Technology (CSE)</strong>, IIIT Delhi — 2021
                </p>
              </div>
            </div>
          </div>

          {/* Right: Experience + Skills */}
          <div
            ref={rightReveal.ref}
            className={`flex h-full flex-col gap-4 reveal-right ${rightReveal.isVisible ? 'visible' : ''}`}
          >
            {/* Experience card stretches to fill */}
            <div className="glass-card soft-panel p-6 md:p-7 bg-card/80 backdrop-blur-sm border-border/50 flex h-full flex-col justify-between">
              <h3 className="text-2xl font-semibold mb-5 hero-gradient-text">Experience</h3>
              <div className="space-y-4 flex-1 flex flex-col justify-center">
                {experiences.map((exp, idx) => (
                  <article
                    key={idx}
                    className="rounded-[1.6rem] border border-border/60 bg-card/58 backdrop-blur-sm text-card-foreground shadow-sm p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between hover:shadow-lg transition-all duration-500 ease-out"
                    style={staggerDelay(idx, 100)}
                  >
                    <div className="flex items-center gap-4 md:gap-6">
                      <img src={exp.logo} alt={`${exp.company} logo`} className="h-12 w-12 md:h-14 md:w-14 object-contain" loading="lazy" />
                      <div>
                        <div className="text-sm text-muted-foreground">{exp.company}</div>
                        <h4 className="text-lg md:text-[1.75rem] font-semibold leading-tight">{exp.role}</h4>
                        <div className="text-sm text-muted-foreground mt-1">{exp.period}</div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="glass-card soft-panel p-5 hover:translate-y-[-2px] hover:shadow-lg transition-all duration-500 ease-out min-h-[132px]"
              style={staggerDelay(index, 100)}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2.5 rounded-xl ${skill.color} bg-current/10`}>
                  <skill.icon className={`h-5 w-5 ${skill.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="text-base md:text-lg font-semibold mb-1.5 leading-tight">{skill.title}</h4>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{skill.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          ref={statsReveal.ref}
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 reveal ${statsReveal.isVisible ? 'visible' : ''}`}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-card soft-panel p-5 text-center hover:translate-y-[-2px] hover:shadow-lg transition-all duration-500 ease-out"
              style={staggerDelay(index, 100)}
            >
              <div className="text-3xl md:text-4xl font-bold hero-gradient-text mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
