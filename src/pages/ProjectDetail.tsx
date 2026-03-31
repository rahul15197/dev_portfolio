import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { Github, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectBackground from '@/components/ProjectBackground';

// Mapping project IDs to their raw GitHub README URLs and optional video backgrounds
const PROJECT_DETAILS = {
  '1': {
    title: 'Realtime Face Mask Detection',
    readmeUrl: 'https://raw.githubusercontent.com/rahul15197/Real-time-Face-Mask-Detection/main/README.md',
    githubUrl: 'https://github.com/rahul15197/Real-time-Face-Mask-Detection',
  },
  '2': {
    title: 'Disease Detection Based on Symptoms',
    readmeUrl: 'https://raw.githubusercontent.com/rahul15197/Disease-Detection-based-on-Symptoms/master/README.md',
    githubUrl: 'https://github.com/rahul15197/Disease-Detection-based-on-Symptoms',
  },
  '3': {
    title: 'Breast Cancer Detection',
    readmeUrl: 'https://raw.githubusercontent.com/rahul15197/Breast-Cancer-Detection-using-Machine-Learning-Techniques/master/README.md',
    githubUrl: 'https://github.com/rahul15197/Breast-Cancer-Detection-using-Machine-Learning-Techniques',
  }
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const project = id ? PROJECT_DETAILS[id as keyof typeof PROJECT_DETAILS] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) {
      setIsLoading(true);
      fetch(project.readmeUrl)
        .then(res => res.text())
        .then(text => setContent(text))
        .catch(err => setContent('# Error loading readme\n' + err.message))
        .finally(() => setIsLoading(false));
    }
  }, [project]);

  if (!project) return <div className="min-h-screen flex items-center justify-center text-white">Project not found</div>;

  return (
    <div className="min-h-screen relative bg-background overflow-x-hidden z-0">
      {/* Background Video */}
      <div className="fixed inset-0 z-[-2] w-full h-full overflow-hidden">
        <ProjectBackground projectId={id as string} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/60 to-background" />
      </div>

      <div className="container px-4 py-20 relative z-10 min-h-screen">
        <div className="max-w-[1600px] w-[96vw] mx-auto rounded-[2rem] overflow-hidden glass-card p-8 md:p-14 relative shadow-2xl border border-white/10 backdrop-blur-xl bg-black/40">
           {isLoading ? (
             <div className="flex justify-center items-center h-64">
                <span className="relative flex h-10 w-10">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/50 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-10 w-10 bg-primary/80"></span>
                </span>
             </div>
           ) : (
            <div className="prose prose-invert prose-lg max-w-none">
                <style dangerouslySetInnerHTML={{__html: `
                    .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 { color: white; margin-top: 1.5em; margin-bottom: 0.5em; }
                    .prose h1 { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5em; font-size: 2.25rem; font-weight: 800; }
                    .prose h2 { font-size: 1.8rem; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.3em; margin-top: 2em; }
                    .prose h3 { font-size: 1.4rem; font-weight: 600; }
                    .prose p { margin-bottom: 1.25em; line-height: 1.7; color: rgba(255,255,255,0.8); }
                    .prose a { color: hsl(var(--primary)); text-decoration: none; border-bottom: 1px solid transparent; transition: border-color 0.2s; }
                    .prose a:hover { border-bottom-color: hsl(var(--primary)); }
                    .prose img { max-width: 100%; border-radius: 0.5rem; margin: 2em auto; display: block; box-shadow: 0 4px 20px rgba(0,0,0,0.5); }
                    .prose ul, .prose ol { margin-left: 1.5em; margin-bottom: 1.5em; color: rgba(255,255,255,0.8); display: flex; flex-direction: column; gap: 0.5em; }
                    .prose ul { list-style-type: disc; }
                    .prose ol { list-style-type: decimal; }
                    .prose pre { background: rgba(0,0,0,0.5); padding: 1.25em; border-radius: 0.75rem; overflow-x: auto; margin-bottom: 1.5em; border: 1px solid rgba(255,255,255,0.1); box-shadow: inset 0 0 10px rgba(0,0,0,0.5); }
                    .prose code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; background: rgba(255,255,255,0.1); padding: 0.2em 0.4em; border-radius: 0.25rem; font-size: 0.85em; }
                    .prose pre code { background: none; padding: 0; font-size: 0.9em; }
                    .prose blockquote { border-left: 4px solid hsl(var(--primary)); padding-left: 1.25em; color: rgba(255,255,255,0.6); font-style: italic; background: linear-gradient(to right, rgba(255,255,255,0.05), transparent); padding-top: 0.5em; padding-bottom: 0.5em; border-radius: 0 0.5rem 0.5rem 0; margin-bottom: 1.5em; }
                    .prose table { width: 100%; border-collapse: collapse; margin-bottom: 1.5em; border-radius: 0.5rem; overflow: hidden; }
                    .prose th, .prose td { border: 1px solid rgba(255,255,255,0.1); padding: 0.75em; text-align: left; color: rgba(255,255,255,0.8); }
                    .prose th { background: rgba(255,255,255,0.05); font-weight: 600; }
                    .prose tr:nth-child(even) { background: rgba(255,255,255,0.02); }
                `}} />
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
                {content}
              </ReactMarkdown>
            </div>
           )}
        </div>

        {/* GitHub Button matching aesthetic specification */}
        <div className="fixed bottom-10 right-10 z-50">
          <style dangerouslySetInnerHTML={{__html: `
            .github-spin-bg { animation: spin 16s linear infinite; }
            .group:hover .github-spin-bg { animation: spin 4s linear infinite; }
          `}} />
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[2px] transition-all duration-500 hover:scale-110 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
            aria-label="View on GitHub"
            title="View Source on GitHub"
          >
            <span className="absolute inset-[-1000%] github-spin-bg bg-[conic-gradient(from_90deg_at_50%_50%,#181a1b_0%,#ffffff_33%,#9333ea_66%,#181a1b_100%)] opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative inline-flex h-[60px] w-[60px] items-center justify-center rounded-full bg-black/95 font-medium text-sm backdrop-blur-xl transition-all duration-500 text-white group-hover:bg-black/80">
              <Github className="h-7 w-7 text-white group-hover:text-purple-400 transition-colors duration-300" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
