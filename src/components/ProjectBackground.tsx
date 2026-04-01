import React from 'react';

interface ProjectBackgroundProps {
  projectId: string;
}

const ProjectBackground: React.FC<ProjectBackgroundProps> = ({ projectId }) => {
  // Motion Graphic for Realtime Face Mask Detection (Scanning Grid / Facial Recognition Theme)
  if (projectId === '1') {
    return (
      <div className="absolute inset-0 overflow-hidden bg-[#050510]">
        {/* Abstract Grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(100, 150, 255, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 150, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transform: 'perspective(500px) rotateX(60deg) scale(2) translateY(-100px)',
            willChange: 'transform'
          }}
        />
        {/* Scanning Line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500 shadow-[0_0_20px_5px_rgba(59,130,246,0.6)] animate-[scan_4s_ease-in-out_infinite] will-change-[top]" />
        
        {/* Facial/Focus Brackets */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[500px] h-[60vw] max-h-[500px] opacity-10 border-[2px] border-blue-400 [mask-image:linear-gradient(to_bottom,black_20%,transparent_20%,transparent_80%,black_80%),linear-gradient(to_right,black_20%,transparent_20%,transparent_80%,black_80%)] animate-pulse will-change-[opacity]" />
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scan {
            0% { top: -10%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 110%; opacity: 0; }
          }
        `}} />
      </div>
    );
  }

  // Motion Graphic for Disease Detection (Neural Network / Information Flow Theme)
  if (projectId === '2') {
    return (
      <div className="absolute inset-0 overflow-hidden bg-[#031d16]">
        {/* Flowing Data Lines */}
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${(Math.random() * -100)}%`,
              animation: `flow ${10 + Math.random() * 15}s linear infinite`,
              animationDelay: `-${Math.random() * 20}s`,
              willChange: 'transform'
            }}
          />
        ))}
        {/* Pulsing Nodes */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={`node-${i}`}
            className="absolute w-2 h-2 rounded-full bg-teal-400/20 shadow-[0_0_15px_3px_rgba(45,212,191,0.4)]"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animation: `pulseNode ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `-${Math.random() * 5}s`,
              willChange: 'transform'
            }}
          />
        ))}

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes flow {
            0% { transform: translateY(-100%) scaleY(1); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(200%) scaleY(2); opacity: 0; }
          }
          @keyframes pulseNode {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(2.5); opacity: 1; }
          }
        `}} />
      </div>
    );
  }

  // Motion Graphic for Breast Cancer Detection (Cellular / Biological / Soft Particles Theme)
  if (projectId === '3') {
    return (
      <div className="absolute inset-0 overflow-hidden bg-[#1a0510]">
        {/* Soft floating glowing orbs representing cells */}
        {[...Array(12)].map((_, i) => {
          const size = 50 + Math.random() * 150;
          return (
            <div 
              key={i}
              className="absolute rounded-full mix-blend-screen blur-[20px]"
              style={{
                width: size,
                height: size,
                background: `radial-gradient(circle at center, rgba(236, 72, 153, 0.4) 0%, transparent 70%)`,
                left: `${-10 + Math.random() * 120}%`,
                top: `${-10 + Math.random() * 120}%`,
                animation: `floatCell ${15 + Math.random() * 20}s ease-in-out infinite alternate`,
                animationDelay: `-${Math.random() * 30}s`,
                willChange: 'transform'
              }}
            />
          );
        })}

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes floatCell {
            0% { transform: translate(0, 0) scale(1); opacity: 0.3; }
            50% { transform: translate(${-30 + Math.random() * 60}px, ${-30 + Math.random() * 60}px) scale(1.2); opacity: 0.6; }
            100% { transform: translate(${-40 + Math.random() * 80}px, ${-40 + Math.random() * 80}px) scale(0.9); opacity: 0.2; }
          }
        `}} />
      </div>
    );
  }

  // Fallback
  return <div className="absolute inset-0 bg-background" />;
};

export default ProjectBackground;
