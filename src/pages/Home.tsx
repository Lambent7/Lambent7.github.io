import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-black text-white overflow-y-auto relative min-h-screen">
      <header className="sticky top-0 w-full h-[60vh] overflow-hidden z-10 before:content-[''] before:absolute before:inset-0 before:bg-black/40 before:z-20">
        <div className="w-full h-full relative">
          <div className="absolute inset-0 bg-cover bg-center opacity-0 animate-[slideFade_15s_infinite]" style={{ backgroundImage: "url('/assets/emotion_game.avif')", animationDelay: "0s" }}></div>
          <div className="absolute inset-0 bg-cover bg-center opacity-0 animate-[slideFade_15s_infinite]" style={{ backgroundImage: "url('/assets/steam_review_classifier.avif')", animationDelay: "5s" }}></div>
          <div className="absolute inset-0 bg-cover bg-center opacity-0 animate-[slideFade_15s_infinite]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920')", animationDelay: "10s" }}></div>
        </div>
      </header>

      <main className="relative z-30 bg-black pt-20 px-5 pb-35 flex justify-center before:content-[''] before:absolute before:-top-[25vh] before:left-0 before:w-full before:h-[25vh] before:bg-gradient-to-b before:from-transparent before:to-black before:pointer-events-none sm:before:-top-[15vh] sm:before:h-[15vh]">
        <div className="max-w-[850px] text-center">
          <h1 className="text-4xl sm:text-[4rem] mb-2 font-medium" style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.1)' }}>
            Hi, my name is Mitchell!
          </h1>
          <h2 className="text-xl sm:text-[1.6rem] text-[#888] font-light mb-[15vh] tracking-wide">
            (EXAMPLE) Full-Stack Developer | Hardware Enthusiast | Problem Solver
          </h2>
          
          <p className="text-lg sm:text-[1.15rem] text-[#aaa] leading-[1.8] max-w-[700px] mx-auto mb-20">
            (EXAMPLE) I specialize in building robust TypeScript applications and custom hardware solutions. 
            I bridge the gap between physical components and digital interfaces, delivering 
            high-performance tools that solve real-world problems. You should hire me because 
            I don't just write code—I build systems that last.
          </p>

          <div className="flex flex-wrap gap-4 sm:gap-16 justify-center items-start">
            <Link to="/projects" className="group flex flex-col items-center text-white w-[100px] sm:w-[140px] p-4 rounded-xl border border-transparent hover:bg-white/10 hover:border-white/15 hover:-translate-y-1 active:bg-white/20 active:scale-95 transition-all duration-200">
              <img src="/assets/projects.svg" alt="Projects Icon" className="w-12 h-12 sm:w-[80px] sm:h-[80px] mb-4" />
              <span className="text-base sm:text-lg drop-shadow-md font-light">Projects</span>
            </Link>
            <a href="/assets/Mitchell%20Resume.pdf" download className="group flex flex-col items-center text-white w-[100px] sm:w-[140px] p-4 rounded-xl border border-transparent hover:bg-white/10 hover:border-white/15 hover:-translate-y-1 active:bg-white/20 active:scale-95 transition-all duration-200">
              <img src="/assets/resume.svg" alt="Resume Icon" className="w-12 h-12 sm:w-[80px] sm:h-[80px] mb-4" />
              <span className="text-base sm:text-lg drop-shadow-md font-light">Resume</span>
            </a>
            <a href="https://linkedin.com/in/graham2md" target="_blank" rel="noreferrer" className="group flex flex-col items-center text-white w-[100px] sm:w-[140px] p-4 rounded-xl border border-transparent hover:bg-white/10 hover:border-white/15 hover:-translate-y-1 active:bg-white/20 active:scale-95 transition-all duration-200">
              <img src="/assets/briefcase.svg" alt="LinkedIn Icon" className="w-12 h-12 sm:w-[80px] sm:h-[80px] mb-4" />
              <span className="text-base sm:text-lg drop-shadow-md font-light">LinkedIn</span>
            </a>
            <a href="https://github.com/Lambent7" target="_blank" rel="noreferrer" className="group flex flex-col items-center text-white w-[100px] sm:w-[140px] p-4 rounded-xl border border-transparent hover:bg-white/10 hover:border-white/15 hover:-translate-y-1 active:bg-white/20 active:scale-95 transition-all duration-200">
              <img src="/assets/computer.svg" alt="GitHub Icon" className="w-12 h-12 sm:w-[80px] sm:h-[80px] mb-4" />
              <span className="text-base sm:text-lg drop-shadow-md font-light">GitHub</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
