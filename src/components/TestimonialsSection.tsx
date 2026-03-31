import React from 'react';
import { Star } from 'lucide-react';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const testimonials = [
  { 
    quote: "I rarely come across real talents who stand out like Rahul. Rahul is a gifted Programmer with a combination of knowledge and problem solving skills, His ability to juggle multiple projects was unlike any I've ever seen before.", 
    name: 'Divyansh Shrivastava', 
    title: 'Senior Software Engineer | Ex- IBMer', 
    avatar: '/testimonials/divyansh-shrivastava.jpg' 
  },
  { 
    quote: "'Ridiculously efficient' is the phrase that comes to mind when I think about Rahul. I've had the pleasure of knowing Rahul for four years... I was impressed with Rahul's ability of planning the task and get that complete in time. He doesn't need any kind of motivation. He is enthusiastic, hardworking and quick learner. Rahul would be an asset to any team.", 
    name: 'Ram Bhajan Mishra', 
    title: 'Senior DevOps @ Commonwealth Bank', 
    avatar: '/testimonials/ram-bhajan-mishra.jpg' 
  },
  { 
    quote: "Rahul has always been outstanding in whatever he put his feets in. Been together as classmates and now as workmates I have perceived Rahul more as a smart and intellectual thinker... He is great at both technical and soft skills. He does possess a great attitude towards the work.", 
    name: 'Vaibhav Jain', 
    title: 'Technical Associate at Wunderman Thompson', 
    avatar: '/testimonials/vaibhav-jain.jpg' 
  },
  { 
    quote: "It was fantastic to work with rahul, His hands on approach to programming skills is awesome. dedicated, loyal, hardworking and always very positive towards work.", 
    name: 'Gagan Garg', 
    title: 'Senior Software Engineer', 
    avatar: '/testimonials/gagan-garg.jpg' 
  },
  { 
    quote: "Committed for his work. He is a Quick learner, focused and confident guy. Knows a lot of things and always in search of something great. He'll surely be a valuable asset for the company.", 
    name: 'Rishabh Panwar', 
    title: 'Application Architect at Salesforce', 
    avatar: '/testimonials/rishabh-panwar.jpg' 
  },
  { 
    quote: "Rahul is a quick learner with good writing, listening and speaking skills. He has keen interest in technology and takes any assignment seriously. I wish him great success in the near future.", 
    name: 'Puneet Verma', 
    title: 'Salesforce Solution Consulting', 
    avatar: '/testimonials/puneet-verma.jpg' 
  },
  { 
    quote: "Tech enthusiast, Team player, and the best programmer I have come across. It's a plus if he is on your team.", 
    name: 'Rishabh Patel', 
    title: '3D Modeling | Generalist', 
    avatar: '/testimonials/rishabh-patel.jpg' 
  },
  { 
    quote: "I have worked with Rahul on my minor project,he is a hard working guy who is always updated with the latest technology happenings around the world. He can also work across multiple platforms.", 
    name: 'Shreyas Sane', 
    title: 'Senior Software Engineer', 
    avatar: '/testimonials/shreyas-sane.jpg' 
  },
  { 
    quote: "Hard working with out of the box thinking.", 
    name: 'Kalpaj Pathak', 
    title: 'Senior Software Engineer & Cloud Architect', 
    avatar: '/testimonials/kalpaj-pathak.jpg' 
  }
];

const TestimonialsSection: React.FC = () => {
  const headerReveal = useScrollReveal();
  const carouselReveal = useScrollReveal({ rootMargin: '0px 0px -40px 0px' });
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

  React.useEffect(() => {
    if (!api || isPaused) return;

    const interval = window.setInterval(() => {
      api.scrollNext();
    }, 4200);

    return () => window.clearInterval(interval);
  }, [api, isPaused]);

  return (
    <section id="testimonials" className="py-16 overflow-hidden">
      <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 px-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1680px] relative">
          <header
            ref={headerReveal.ref}
            className={`text-center mb-12 reveal ${headerReveal.isVisible ? 'visible' : ''}`}
          >
            <p className="section-kicker mb-4">What Clients say</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-5">Testimonials</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">What collaborators and clients tend to notice most: ownership, speed, and clean execution.</p>
          </header>

          <div
            ref={carouselReveal.ref}
            className={`reveal relative ${carouselReveal.isVisible ? 'visible' : ''}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 md:w-16 bg-gradient-to-r from-background via-background/88 to-transparent blur-lg" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 md:w-16 bg-gradient-to-l from-background via-background/88 to-transparent blur-lg" />
            <Carousel setApi={setApi} opts={{ align: 'center', loop: true }} className="w-full">
              <CarouselContent className="-ml-6 py-4">
                {testimonials.map((t, i) => (
                  <CarouselItem key={i} className="basis-[94%] sm:basis-[78%] lg:basis-[52%] xl:basis-[44%] pl-6">
                    <article className={`glass-card soft-panel surface-subtle p-7 md:p-8 text-left h-full transition-[transform,opacity,filter,box-shadow] duration-500 ease-out will-change-transform ${selectedIndex === i ? 'opacity-100 scale-100 blur-0 shadow-[0_24px_70px_hsl(215_24%_18%_/_0.16)]' : 'opacity-60 scale-[0.975] blur-[1px] translate-y-2'}`}>
                      <div className="mb-5 flex items-center gap-1 text-primary">
                        {[0, 1, 2, 3, 4].map(star => <Star key={star} className="h-4 w-4" fill="currentColor" />)}
                      </div>
                      <p className="text-lg md:text-[1.38rem] leading-relaxed mb-8">“{t.quote}”</p>
                      <div className="flex items-center gap-3 border-t border-border/50 pt-6">
                        <img src={t.avatar} alt={`${t.name} avatar`} className="h-12 w-12 rounded-full object-cover" loading="lazy" />
                        <div className="min-w-0">
                          <div className="font-semibold text-foreground">{t.name}</div>
                          <div className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">{t.title}</div>
                        </div>
                      </div>
                    </article>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-3 md:left-5 glass-card soft-panel border-white/10 bg-black/55 text-white hover:bg-black/75 hover:text-white shadow-[0_14px_34px_hsl(220_30%_3%_/_0.28)]" />
              <CarouselNext className="right-3 md:right-5 glass-card soft-panel border-white/10 bg-black/55 text-white hover:bg-black/75 hover:text-white shadow-[0_14px_34px_hsl(220_30%_3%_/_0.28)]" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
