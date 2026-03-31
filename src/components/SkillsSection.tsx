import { motion } from 'framer-motion';

const SkillsSection = () => {

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (percent: number) => ({
      width: `${percent}%`,
      transition: { duration: 1.5, ease: "easeOut" as const, delay: 0.3 }
    })
  };

  return (
    <section id="skills" className="py-16 relative">
      <div className="container mx-auto px-6">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <p className="section-kicker mb-4">Capabilities</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills &amp; <span className="hero-gradient-text">Expertise</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Core technologies and domains I work with, along with my proficiency.</p>
        </motion.header>

        <div className="grid xl:grid-cols-[1.25fr_0.95fr] gap-8">
          <motion.article
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="glass-card soft-panel p-6 md:p-7"
          >
            <motion.div variants={itemVariants} className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="section-kicker mb-3">Technical Skills</p>
                <h3 className="text-2xl font-semibold hero-gradient-text">Core strengths</h3>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm">A compact snapshot of the tools I lean on most when shipping, debugging, and optimizing.</p>
            </motion.div>
            
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <motion.article 
                  key={skill.name} 
                  variants={itemVariants} 
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="rounded-[1.4rem] border border-border/65 bg-card/45 p-5 transition-colors hover:bg-card/70"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">{skill.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{skill.summary}</p>
                    </div>
                  </div>
                  <div className="skill-meter-track mb-3 bg-secondary/30 rounded-full h-1.5 overflow-hidden">
                    <motion.div 
                      custom={skill.percent}
                      variants={progressVariants}
                      className="skill-meter-fill h-full bg-primary rounded-full"
                    />
                  </div>
                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-1 xl:gap-0 text-xs uppercase tracking-[0.12em] xl:tracking-[0.18em] text-muted-foreground">
                    <span>{skill.level}</span>
                    <span className="opacity-75">{skill.percent >= 85 ? 'Strong' : skill.percent >= 75 ? 'Solid' : 'Growing'}</span>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.article>

          <motion.article
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="glass-card soft-panel p-6 md:p-7"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <p className="section-kicker mb-3">Expertise Areas</p>
              <h3 className="text-2xl font-semibold hero-gradient-text">Domains I work comfortably across</h3>
            </motion.div>
            
            <div className="grid sm:grid-cols-2 xl:grid-cols-1 gap-4">
              {expertise.map((item) => (
                <motion.article 
                  key={item.name} 
                  variants={itemVariants} 
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="rounded-[1.35rem] border border-border/65 bg-card/44 p-5 transition-colors hover:bg-card/70"
                >
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <h4 className="text-lg font-semibold text-foreground">{item.name}</h4>
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{item.level}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{item.summary}</p>
                  <div className="skill-meter-track bg-secondary/30 rounded-full h-1.5 overflow-hidden">
                    <motion.div 
                      custom={item.percent}
                      variants={progressVariants}
                      className="skill-meter-fill h-full bg-primary rounded-full" 
                    />
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
