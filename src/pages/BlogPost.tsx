import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import { ChevronLeft, Share2 } from 'lucide-react';
import { myProjects } from '../data/projects';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState('');
  const [copied, setCopied] = useState(false);

  // Match the project metadata
  const project = myProjects.find(p => p.id === id) || 
                  myProjects.find(p => p.url.includes(id || ''));

  useEffect(() => {
    if (id) {
      // Assuming posts are named identical to the project id
      fetch(`/posts/${id}.md`)
        .then(res => res.text())
        .then(text => {
          // Fallback if not found
          if (text.startsWith('<!DOCTYPE html>')) {
             setContent('**Post not found or still being written.**');
          } else {
             setContent(text);
          }
        })
        .catch(() => setContent('Failed to load markdown details.'));
    }
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedDate = project ? new Date(project.datePosted).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC'
  }) : 'Unknown Date';

  const tags = project ? project.filters.join(', ') : 'Uncategorized';
  const title = project ? project.title.replace('(EXAMPLE) ', '') : 'Blog Post';

  return (
    <div className="bg-black text-white min-h-screen relative overflow-y-auto">
      {/* Blog header / hero */}
      <header className="relative w-full h-[45vh] overflow-hidden bg-black z-10 before:content-[''] before:absolute before:inset-0 before:bg-black/40 before:z-20">
         <div className="absolute inset-0 bg-cover bg-center opacity-70 animate-[slideFade_15s_infinite]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1920')" }}></div>
         
         <Link to="/projects" className="absolute top-8 left-8 z-30 bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:-translate-y-1 hover:bg-white/10 transition-all duration-300 no-underline shadow-lg backdrop-blur-md">
            <ChevronLeft size={20} /> Back to Projects
         </Link>
      </header>

      {/* Main Blog Content Container */}
      <main className="relative z-30 bg-black -mt-16 px-4 pb-24 border-t border-white/5">
        <div className="max-w-[800px] mx-auto text-left pt-20">
          <h1 className="text-4xl sm:text-[3.5rem] font-medium text-center mb-4 text-[#f3f4f6]" style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.1)' }}>
            {title}
          </h1>
          <h2 className="text-[#888] text-center text-lg uppercase tracking-[2px] mb-12">
            {formattedDate} • 5 Min Read • {tags}
          </h2>

          <div className="text-[#ccc] text-lg leading-[1.8] Markdown-Container">
            <Markdown
              components={{
                h2: ({node, ...props}) => <h2 className="text-white text-2xl mt-10 mb-4 font-semibold" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-white text-xl mt-8 mb-3 font-semibold" {...props} />,
                p: ({node, ...props}) => <p className="mb-6 font-light" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-8 mb-6 text-gray-300" {...props} />,
                li: ({node, ...props}) => <li className="mb-2" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-purple-500 pl-4 py-1 my-6 italic text-gray-400 bg-white/5 rounded-r-lg" {...props} />
              }}
            >
              {content}
            </Markdown>
          </div>

          <div className="mt-16 flex justify-center">
            <button onClick={handleShare} className="bg-transparent border-none outline-none flex flex-col items-center text-white cursor-pointer group hover:-translate-y-1 transition-all duration-200">
              <span className="bg-white/5 border border-white/10 p-4 rounded-full group-hover:bg-white/10 transition-colors mb-3">
                <Share2 size={24} />
              </span>
              <span className="font-light tracking-wide">{copied ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
