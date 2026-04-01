import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const projectMetrics = ['95% accuracy', '91.2% accuracy', '98.6% accuracy'];

const projects = [
  {
    id: 1,
    title: 'Realtime Face Mask Detection',
    description: 'Implements transfer learning to detect masks on multiple faces with 95% accuracy; awarded best ML project in classwork.',
    image: '/assets/project_1.png',
    technologies: ['Python', 'ML', 'CNN'],
    liveUrl: '#',
    githubUrl: 'https://github.com/rahul15197/Real-time-Face-Mask-Detection',
    featured: true,
    category: 'Computer Vision',
  },
  {
    id: 2,
    title: 'Disease Detection System',
    description: 'ML and IR to detect diseases based on symptoms and provide details including treatment recommendations; 91.2% accuracy.',
    image: '/assets/project_2.png',
    technologies: ['Python', 'ML', 'NN'],
    liveUrl: '#',
    githubUrl: 'https://github.com/rahul15197/Disease-Detection-based-on-Symptoms',
    featured: true,
    category: 'Prediction',
  },
  {
    id: 3,
    title: 'Breast Cancer Detection',
    description: 'Novel ML methods with FastAI neural networks to detect breast cancer with 98.6% accuracy; innovative approach.',
    image: '/assets/project_3.png',
    technologies: ['Python', 'ML', 'FastAI'],
    liveUrl: '#',
    githubUrl: 'https://github.com/rahul15197/Breast-Cancer-Detection-using-Machine-Learning-Techniques',
    featured: true,
    category: 'Healthcare AI',
  },
];

// ──────────────────────────────────────────────
// Mobile: Vertical scrolling card layout
// ──────────────────────────────────────────────
const MobileProjectsSection = () => (
  <section className="md:hidden py-16 px-4">
    {/* Header */}
    <div className="mb-10 text-center">
      <p className="section-kicker mb-3 justify-center">Key Projects</p>
      <h2 className="text-4xl font-bold tracking-tight leading-tight text-foreground mb-3">
        Featured <span className="hero-gradient-text">Projects</span>
      </h2>
      <p className="text-base text-muted-foreground leading-relaxed max-w-xs mx-auto">
        A few technical builds that show how I approach research-heavy problems, implementation detail, and product clarity.
      </p>
    </div>

    {/* Project Cards */}
    <div className="flex flex-col gap-6">
      {projects.filter(p => p.featured).map((project, index) => (
        <article
          key={project.id}
          className="glass-card soft-panel overflow-hidden flex flex-col w-full rounded-2xl"
        >
          {/* Image */}
          <div className="relative w-full h-44 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            <div className="absolute left-3 top-3 flex items-center gap-2 z-10">
              <span className="rounded-full border border-white/40 bg-black/25 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-white backdrop-blur-md">
                0{project.id}
              </span>
              <span className="rounded-full border border-white/20 bg-white/15 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-white backdrop-blur-md">
                {project.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="section-kicker text-[10px]">Case Study</span>
              <span className="text-xs font-semibold text-foreground/80">{projectMetrics[index]}</span>
            </div>

            <h3 className="text-lg font-semibold mb-2 hero-gradient-text leading-tight">{project.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-3">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  {tech}
                </span>
              ))}
            </div>

            {/* Action buttons — always visible, full width */}
            <div className="flex gap-3 mt-auto">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 btn-border-glow text-sm py-5 soft-panel rounded-xl"
                onClick={() => window.open(`/project/${project.id}`, '_blank')}
              >
                Read More <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 btn-border-glow text-sm py-5 soft-panel rounded-xl"
                onClick={() => window.open(project.githubUrl, '_blank')}
              >
                <Github className="mr-2 h-4 w-4" /> Code
              </Button>
            </div>
          </div>
        </article>
      ))}
    </div>

    {/* View All */}
    <div
      className="mt-10 text-center"
    >
      <h3 className="text-xl font-bold mb-4 text-foreground/80">More builds?</h3>
      <Button
        size="lg"
        className="btn-glow transition-spring text-base px-8 py-5 rounded-2xl shadow-xl w-full max-w-xs"
        onClick={() => window.open('https://github.com/rahul15197?tab=repositories', '_blank')}
      >
        View GitHub
      </Button>
    </div>
  </section>
);

// ──────────────────────────────────────────────
// Desktop: Original horizontal scroll layout
// ──────────────────────────────────────────────
const DesktopProjectsSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  return (
    <section ref={targetRef} className="relative h-[400vh] hidden md:block">
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-16 items-center px-24 h-full w-[250vw]">

          {/* 1. Introduction Slide */}
          <div className="flex-shrink-0 w-[40vw] flex flex-col justify-center">
            <p className="section-kicker mb-4">Key Projects</p>
            <h2 className="text-7xl font-bold mb-6 tracking-tight leading-[1] text-foreground">
              Featured <br /><span className="hero-gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-sm text-balance-tight">
              A few technical builds that show how I approach research-heavy problems, implementation detail, and product clarity.
            </p>
            <div className="w-16 h-1 bg-primary/30 rounded-full mt-10" />
          </div>

          {/* 2. Project Slides */}
          {projects.filter(p => p.featured).map((project, index) => (
            <div key={project.id} className="flex-shrink-0 w-[40vw] lg:w-[35vw] h-[75vh]">
              <article className="group h-full w-full glass-card soft-panel overflow-hidden text-card-foreground flex flex-col relative transform transition-transform duration-700 hover:scale-[1.01]">

                {/* Image Section */}
                <div className="relative overflow-hidden w-full h-[50%] shrink-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute left-4 top-4 flex items-center gap-2 pointer-events-none z-10">
                    <span className="rounded-full border border-white/40 bg-black/25 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white backdrop-blur-md">0{project.id}</span>
                    <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white backdrop-blur-md">{project.category}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 pb-8 flex h-full flex-col bg-background/5 backdrop-blur-sm grow">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <span className="section-kicker text-xs">Case Study</span>
                    <span className="text-xs font-semibold text-foreground/80">{projectMetrics[index]}</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-semibold mb-3 hero-gradient-text leading-tight">{project.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed text-sm md:text-base line-clamp-3">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">{tech}</span>
                    ))}
                  </div>

                  <div className="mt-auto flex gap-3 w-full">
                    <Button variant="outline" size="sm" className="flex-1 btn-border-glow text-sm py-5 soft-panel rounded-xl" onClick={() => window.open(`/project/${project.id}`, '_blank')}>
                      Read More <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 btn-border-glow text-sm py-5 soft-panel rounded-xl" onClick={() => window.open(project.githubUrl, '_blank')}>
                      <Github className="mr-2 h-4 w-4" /> Code
                    </Button>
                  </div>
                </div>

              </article>
            </div>
          ))}

          {/* 3. Outro Slide */}
          <div className="flex-shrink-0 w-[30vw] flex items-center justify-center h-full pr-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-6 text-foreground/80">More builds?</h3>
              <Button size="lg" className="btn-glow transition-spring text-lg px-8 py-6 rounded-2xl shadow-xl" onClick={() => window.open('https://github.com/rahul15197?tab=repositories', '_blank')}>
                View GitHub
              </Button>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────
// Combined export
// ──────────────────────────────────────────────
const ProjectsSection = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return (
    <div id="projects">
      {isDesktop ? <DesktopProjectsSection /> : <MobileProjectsSection />}
    </div>
  );
};

export default ProjectsSection;
