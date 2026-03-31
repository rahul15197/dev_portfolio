import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useNavigate } from 'react-router-dom';

const projectMetrics = ['95% accuracy', '91.2% accuracy', '98.6% accuracy'];

const ProjectsSection = () => {
  const headerReveal = useScrollReveal();
  const navigate = useNavigate();

  const projects = [
    { id: 1, title: 'Realtime Face Mask Detection', description: 'Implements transfer learning to detect masks on multiple faces with 95% accuracy; awarded best ML project in classwork.', image: '/assets/project_1.png', technologies: ['Python', 'ML', 'CNN', 'Transfer Learning'], liveUrl: '#', githubUrl: 'https://github.com/rahul15197/Real-time-Face-Mask-Detection', featured: true, category: 'Computer Vision' },
    { id: 2, title: 'Disease Detection Based on Symptoms', description: 'ML and IR to detect diseases based on symptoms and provide details including treatment recommendations; 91.2% accuracy; novel dataset created via web scraping.', image: '/assets/project_2.png', technologies: ['Python', 'ML', 'NN', 'Information Retrieval'], liveUrl: '#', githubUrl: 'https://github.com/rahul15197/Disease-Detection-based-on-Symptoms', featured: true, category: 'Prediction Systems' },
    { id: 3, title: 'Breast Cancer Detection', description: 'Novel ML methods with FastAI neural networks to detect breast cancer with 98.6% accuracy; innovative approach using FastAI NN.', image: '/assets/project_3.png', technologies: ['Python', 'ML', 'FastAI'], liveUrl: '#', githubUrl: 'https://github.com/rahul15197/Breast-Cancer-Detection-using-Machine-Learning-Techniques', featured: true, category: 'Healthcare AI' },
  ];

  const featuredProjects = projects.filter(p => p.featured);

  return (
    <section id="projects" className="py-18 relative">
      <div className="container mx-auto px-6">
        <div
          ref={headerReveal.ref}
          className={`text-center mb-16 reveal ${headerReveal.isVisible ? 'visible' : ''}`}
        >
          <p className="section-kicker mb-4">Key Projects</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="hero-gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">A few technical builds that show how I approach research-heavy problems, implementation detail, and product clarity.</p>
        </div>

        <div className="relative space-y-5 mb-10 pb-6">
          {featuredProjects.map((project, index) => (
            <article
              key={project.id}
              className="group glass-card soft-panel overflow-hidden text-card-foreground will-change-transform min-h-[22rem] md:min-h-[24rem]"
              style={{
                position: 'sticky',
                top: `calc(9rem + ${index * 2.5}rem)`,
                marginTop: index === 0 ? 0 : 14,
                zIndex: 50 + index,
                transform: `scale(${1 - (featuredProjects.length - 1 - index) * 0.012})`,
              }}
            >
              <div className="grid md:grid-cols-[1.05fr_0.95fr] md:min-h-[24rem]">
                <div className="relative overflow-hidden">
                  <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" className="w-full h-72 md:h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent" />
                  <div className="absolute left-5 top-5 flex items-center gap-2">
                    <span className="rounded-full border border-white/40 bg-black/25 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white backdrop-blur-md">0{project.id}</span>
                    <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white backdrop-blur-md">{project.category}</span>
                  </div>
                </div>
                <div className="p-6 md:p-8 lg:p-9 flex h-full flex-col">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <span className="section-kicker">Case Study</span>
                    <span className="text-sm font-semibold text-foreground">{projectMetrics[index]}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-4 hero-gradient-text">{project.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed text-base md:text-lg text-balance-tight">{project.description}</p>
                  <div className="grid sm:grid-cols-[auto,1fr] gap-4 items-start mb-6">
                    <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Stack</span>
                    <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{tech}</span>
                    ))}
                    </div>
                  </div>
                  <div className="mt-auto flex flex-wrap justify-center md:justify-start gap-3">
                    <Button variant="outline" size="lg" className="btn-border-glow transition-all duration-500 ease-out text-base px-6 py-2 rounded-xl hover:bg-background/80 soft-panel hover:-translate-y-1 active:scale-95 shadow-sm hover:shadow-[0_0_20px_rgba(var(--primary),0.2)]" onClick={() => window.open(`/project/${project.id}`, '_blank')}>
                      Read More
                    </Button>
                    <Button variant="outline" size="lg" className="btn-border-glow transition-all duration-500 ease-out text-base px-6 py-2 rounded-xl hover:bg-background/80 soft-panel hover:-translate-y-1 active:scale-95 shadow-sm hover:shadow-[0_0_20px_rgba(var(--primary),0.2)]" onClick={() => window.open(project.githubUrl)}>
                      <Github className="mr-2 h-5 w-5" />
                      Code
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {projects.filter(p => !p.featured).length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter(p => !p.featured).map((project) => (
              <div key={project.id} className="glass-card overflow-hidden group hover:translate-y-[-2px] hover:shadow-lg transition-all duration-500 ease-out">
                <div className="relative overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 hero-gradient-text">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">{tech}</span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="btn-accent-glow flex-1 text-xs" onClick={() => window.open(project.liveUrl)}>
                      <ExternalLink className="mr-1 h-3 w-3" /> Demo
                    </Button>
                    <Button variant="outline" size="sm" className="glass-card border-primary/30 text-xs" onClick={() => window.open(project.githubUrl)}>
                      <Github className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="btn-border-glow transition-all duration-500 ease-out text-lg px-8 py-3 rounded-xl hover:bg-background soft-panel" onClick={() => window.open('https://github.com/rahul15197?tab=repositories', '_blank')}>
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
