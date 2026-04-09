import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronDown, ChevronUp, ListFilter, Star } from 'lucide-react';
import { myProjects } from '../data/projects';
import type { Project } from '../data/projects';

function ProjectTile({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      to={project.url} 
      className="bg-[#1a1a1f] border border-white/5 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:-translate-y-1.5 hover:shadow-[0_8px_15px_rgba(0,0,0,0.2)] transition-all duration-300 flex flex-col no-underline text-inherit group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-video bg-black overflow-hidden">
        {project.videoPath && (
          <video 
            src={project.videoPath} 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover"
            ref={(el) => {
              if (el) {
                if (isHovered) el.play().catch(() => {});
                else { el.pause(); el.currentTime = 0; }
              }
            }}
          />
        )}
        <img 
          src={project.imagePath} 
          alt={project.title} 
          className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-300 ${isHovered && project.videoPath ? 'opacity-0' : 'opacity-100'}`} 
        />
      </div>
      <div className="p-4 flex flex-col grow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-medium text-gray-100 m-0">{project.title}</h3>
          {project.isFavorite && <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-[0_0_5px_rgba(255,215,0,0.5)]" />}
        </div>
        <p className="text-gray-400 m-0 leading-relaxed text-[0.95rem]">{project.description}</p>
        <div className="mt-auto flex gap-2 flex-wrap pt-4">
          {project.filters.map((tag) => (
            <span key={tag} className="bg-white/10 border border-white/5 px-2.5 py-1 rounded-md text-xs text-gray-400">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function Projects() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isDateDescending, setIsDateDescending] = useState(true);

  // Generate unique tags
  const allTags = useMemo(() => {
    const tags = myProjects.flatMap(p => p.filters).filter(t => t.trim() !== '');
    return Array.from(new Set(tags)).sort();
  }, []);

  // Filter and sort projects
  const displayProjects = useMemo(() => {
    let filtered = myProjects;
    if (activeFilters.length > 0) {
      filtered = myProjects.filter(project => 
        project.filters.some(f => activeFilters.includes(f))
      );
    }
    return [...filtered].sort((a, b) => {
      const timeA = a.datePosted.getTime();
      const timeB = b.datePosted.getTime();
      return isDateDescending ? timeB - timeA : timeA - timeB;
    });
  }, [activeFilters, isDateDescending]);

  const toggleFilter = (tag: string) => {
    setActiveFilters(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="flex min-h-screen bg-[#0f0f13] text-[#e0e0e0] relative overflow-hidden">
      
      {/* Sidebar */}
      <aside className={`fixed top-0 right-0 w-[300px] h-screen bg-[#1e1e1e] p-6 shadow-[-4px_0_15px_rgba(0,0,0,0.5)] transition-transform duration-300 z-50 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-[320px]'}`}>
        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
          <h3 className="text-lg font-medium m-0">Filters</h3>
          <div className="flex items-center gap-2">
            <button onClick={() => setActiveFilters([])} className="bg-none border-none text-[#a0a0a0] px-3 py-1.5 pt-2 rounded-md font-medium text-sm hover:text-white hover:bg-white/10 cursor-pointer transition-colors">Clear All</button>
            <button onClick={() => setIsSidebarOpen(false)} className="bg-none border-none text-[#a0a0a0] p-2 rounded-full flex items-center justify-center hover:bg-white/10 hover:text-white cursor-pointer transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="mb-6">
          <h4 className="text-[#a0a0a0] mb-3 text-xs uppercase tracking-wider font-semibold m-0">All Tags</h4>
          <div className="flex flex-wrap gap-2.5">
            {allTags.map(tag => (
              <label key={tag} className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-200 text-sm text-gray-300 hover:bg-white/10 hover:border-white/15 select-none">
                <input 
                  type="checkbox" 
                  value={tag} 
                  checked={activeFilters.includes(tag)}
                  onChange={() => toggleFilter(tag)}
                  className="accent-purple-500 w-3.5 h-3.5 cursor-pointer m-0" 
                />
                <span className={activeFilters.includes(tag) ? 'text-white font-semibold' : ''}>{tag}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 w-full max-w-7xl mx-auto">
        <header className="flex flex-wrap gap-4 justify-between items-center bg-[#16161a] p-4 sm:px-6 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/5">
          <div className="flex items-center">
            <button onClick={() => setIsDateDescending(!isDateDescending)} className="bg-white/5 text-[#e0e0e0] border border-white/10 px-4 py-2 rounded-lg font-medium text-[0.95rem] flex items-center gap-2 backdrop-blur-md hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)] active:translate-y-0 cursor-pointer transition-all">
              Date {isDateDescending ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            </button>
          </div>

          <Link to="/" className="bg-white/5 text-[#e0e0e0] border border-white/10 px-4 py-2 rounded-lg font-medium text-[0.95rem] flex items-center gap-2 backdrop-blur-md hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)] active:translate-y-0 cursor-pointer transition-all no-underline text-center">
            Mitchell Graham Portfolio
          </Link>

          <button onClick={() => setIsSidebarOpen(true)} className="bg-white/5 text-[#e0e0e0] border border-white/10 px-4 py-2 rounded-lg font-medium text-[0.95rem] flex items-center gap-2 backdrop-blur-md hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)] active:translate-y-0 cursor-pointer transition-all">
            <ListFilter size={18} /> Filter
          </button>
        </header>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 mt-8">
          {displayProjects.map(project => (
            <ProjectTile key={project.id} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
}
