import { useScrollReveal, staggerDelay } from '@/hooks/useScrollReveal';

const SkillsSection = () => {
  const headerReveal = useScrollReveal();
  const techReveal = useScrollReveal();
  const expertiseReveal = useScrollReveal();

  const skills = [
    { name: 'Python', level: 'Expert', percent: 96, summary: 'Automation, backend logic, ML workflows' },
    { name: 'C++', level: 'Proficient', percent: 82, summary: 'Systems thinking, performance, problem solving' },
    { name: 'Data Structures & Algorithms', level: 'Proficient', percent: 84, summary: 'Core interview and production-grade fundamentals' },
    { name: 'Database', level: 'Proficient', percent: 81, summary: 'Schema design, queries, data reasoning' },
    { name: 'Operating Systems', level: 'Intermediate', percent: 68, summary: 'Processes, memory, synchronization concepts' },
    { name: 'Computer Networks', level: 'Proficient', percent: 78, summary: 'Protocols, transport layers, distributed basics' },
  ];

  const expertise = [
    { name: 'Cloud Systems', level: 'Intermediate', percent: 70, summary: 'Deployments, environments, infra-aware delivery' },
    { name: 'Storage', level: 'Advanced', percent: 88, summary: 'Reliability, performance, data-heavy systems' },
    { name: 'API Design', level: 'Advanced', percent: 86, summary: 'Readable contracts and maintainable integrations' },
    { name: 'Automation', level: 'Advanced', percent: 90, summary: 'Testing, tooling, and repetitive work elimination' },
  ];

  return (
    <section id="skills" className="py-16 relative">
      <div className="container mx-auto px-6">
        <header
          ref={headerReveal.ref}
          className={`text-center mb-12 reveal ${headerReveal.isVisible ? 'visible' : ''}`}
        >
          <p className="section-kicker mb-4">Capabilities</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills &amp; <span className="hero-gradient-text">Expertise</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Core technologies and domains I work with, along with my proficiency.</p>
        </header>

        <div className="grid xl:grid-cols-[1.25fr_0.95fr] gap-8">
          <article
            ref={techReveal.ref}
            className={`glass-card soft-panel p-6 md:p-7 reveal ${techReveal.isVisible ? 'visible' : ''}`}
          >
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="section-kicker mb-3">Technical Skills</p>
                <h3 className="text-2xl font-semibold hero-gradient-text">Core strengths with visible proficiency</h3>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm">A compact snapshot of the tools I lean on most when shipping, debugging, and optimizing.</p>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {skills.map((skill, i) => (
                <article key={skill.name} style={staggerDelay(i, 70)} className="rounded-[1.4rem] border border-border/65 bg-card/45 p-5 hover:translate-y-[-2px] transition-all duration-500 ease-out">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">{skill.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{skill.summary}</p>
                    </div>
                  </div>
                  <div className="skill-meter-track mb-3" style={{ ['--fill' as string]: `${skill.percent}%` }}>
                    <div className="skill-meter-fill" />
                  </div>
                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-1 xl:gap-0 text-xs uppercase tracking-[0.12em] xl:tracking-[0.18em] text-muted-foreground">
                    <span>{skill.level}</span>
                    <span className="opacity-75">{skill.percent >= 85 ? 'Strong' : skill.percent >= 75 ? 'Solid' : 'Growing'}</span>
                  </div>
                </article>
              ))}
            </div>
          </article>

          <article
            ref={expertiseReveal.ref}
            className={`glass-card soft-panel p-6 md:p-7 reveal ${expertiseReveal.isVisible ? 'visible' : ''}`}
          >
            <div className="mb-6">
              <p className="section-kicker mb-3">Expertise Areas</p>
              <h3 className="text-2xl font-semibold hero-gradient-text">Domains I work comfortably across</h3>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-1 gap-4">
              {expertise.map((item, i) => (
                <article key={item.name} style={staggerDelay(i, 80)} className="rounded-[1.35rem] border border-border/65 bg-card/44 p-5 transition-all duration-500 ease-out hover:translate-y-[-2px]">
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <h4 className="text-lg font-semibold text-foreground">{item.name}</h4>
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{item.level}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{item.summary}</p>
                  <div className="skill-meter-track" style={{ ['--fill' as string]: `${item.percent}%` }}>
                    <div className="skill-meter-fill" />
                  </div>
                </article>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
