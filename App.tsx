import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import AIChat from './components/AIChat';
import { PROJECTS, SKILLS, CERTIFICATIONS, EDUCATION } from './constants';

const EXPERIENCE = [
  {
    role: "Founder / Technical Director",
    company: "K11 Software Solutions",
    period: "Feb 2024 – Present",
    description: "Leading AI/LLM integration strategies and automated DevOps pipelines. Spearheading AI Assurance protocols using Promptfoo and DeepEval for Fortune 500 clients.",
    tech: ["AI Agents", "LLM Reliability", "Promptfoo", "Python", "RAG"]
  },
  {
    role: "Senior Consultant",
    company: "Tata Consultancy Services (Verizon)",
    period: "Apr 2025 – Jan 2026",
    description: "Architecting Network Assurance Infrastructure for iEN services. Implementing high-fidelity simulation environments for mission-critical network reliability.",
    tech: ["Java", "Serenity BDD", "Network Topology", "CI/CD"]
  },
  {
    role: "Lead Software Engineer",
    company: "Broadcom (VMware)",
    period: "Oct 2021 – Jan 2024",
    description: "Engineered high-scale SaaS Subscription Commerce platforms. Modernized legacy architectures resulting in significant performance gains and cost reduction.",
    tech: ["Node.js", "Salesforce CPQ", "SAP Integration", "Microservices"]
  },
  {
    role: "Lead Automation Developer",
    company: "Cognizant (ETRADE)",
    period: "Jun 2019 – Sep 2021",
    description: "Technical lead for Equity Edge digital transformation. Built massive scale BDD frameworks supporting 2000+ high-concurrency scenarios.",
    tech: ["Selenium", "Java", "SQL", "Equity Systems"]
  }
];

const App: React.FC = () => {
  const [activeProjectFilter, setActiveProjectFilter] = useState<string>('All');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
    }
    return 'dark';
  });

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', message: '' });
  };

  const projectFilters = ['All', 'AI', 'Full-Stack', 'Quality'];

  const filteredProjects = PROJECTS.filter(project => {
    if (activeProjectFilter === 'All') return true;
    const tags = project.tags.map(t => t.toLowerCase());
    if (activeProjectFilter === 'Quality') return tags.some(t => t.includes('quality') || t.includes('testing') || t.includes('assurance'));
    return tags.some(t => t.includes(activeProjectFilter.toLowerCase()));
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-700 selection:bg-blue-500/30">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl pointer-events-none">
           <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-float opacity-30"></div>
           <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] animate-float opacity-30" style={{ animationDelay: '-3s' }}></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black mb-12 tracking-[0.4em] uppercase">
            Architecting the AI Era
          </div>
          
          <h1 className="text-4xl md:text-7xl font-extrabold mb-10 tracking-tighter text-gray-900 dark:text-white leading-[1.05]">
            Engineering <span className="gradient-text">Reliability</span> <br /> 
            in an AI-Native World
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-xl max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
            I build sophisticated Full Stack architectures and AI Assurance systems. 
            Blending 12+ years of enterprise engineering with a deep obsession for LLM reliability.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a href="#projects" className="group px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-black text-[12px] font-black uppercase tracking-widest rounded-2xl hover:shadow-[0_20px_50px_rgba(59,130,246,0.2)] hover:scale-[1.02] transition-all">
              View Architecture
            </a>
            <a href="#ai-clone" className="px-10 py-5 glass text-gray-900 dark:text-white text-[12px] font-black uppercase tracking-widest rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-all">
              Talk to AI Twin
            </a>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 border-y border-gray-100 dark:border-gray-900/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
           <div className="space-y-4">
             <div className="w-10 h-1 bg-blue-600"></div>
             <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-tighter">Precision</h3>
             <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Every line of code is a structural commitment. I prioritize type safety, modular design, and predictable state.</p>
           </div>
           <div className="space-y-4">
             <div className="w-10 h-1 bg-purple-600"></div>
             <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-tighter">Intelligence</h3>
             <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">AI is not just a feature; it's a new layer of architecture. I build RAG systems that are as reliable as they are smart.</p>
           </div>
           <div className="space-y-4">
             <div className="w-10 h-1 bg-emerald-600"></div>
             <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-tighter">Assurance</h3>
             <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Quality is the bridge between a demo and a product. My background in enterprise testing ensures robust outcomes.</p>
           </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white tracking-tighter uppercase">Portfolio of Systems</h2>
              <div className="flex gap-2">
                {projectFilters.map(filter => (
                  <button 
                    key={filter} 
                    onClick={() => setActiveProjectFilter(filter)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeProjectFilter === filter ? 'bg-blue-600 text-white' : 'glass text-gray-500'}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-gray-400 text-[11px] mono font-bold uppercase tracking-[0.3em]">Code & Context</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-24 px-6 bg-gray-50/50 dark:bg-gray-900/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-16 text-gray-900 dark:text-white tracking-tight text-center uppercase">Professional Path</h2>
          <div className="space-y-10 relative before:absolute before:left-0 md:before:left-1/2 before:w-px before:h-full before:bg-gray-200 dark:before:bg-gray-800">
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="absolute left-[-5px] md:left-1/2 md:ml-[-5px] w-3 h-3 rounded-full bg-blue-600 z-10 ring-4 ring-white dark:ring-gray-950"></div>
                <div className="flex-1">
                  <div className="glass p-8 rounded-3xl hover:border-blue-500/20 transition-all">
                    <span className="text-[10px] mono font-bold text-blue-600 mb-2 block">{exp.period}</span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 tracking-tight">{exp.role}</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{exp.company}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map(t => <span key={t} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-[9px] font-bold text-gray-500">{t}</span>)}
                    </div>
                  </div>
                </div>
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section id="ai-clone" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-8 tracking-tighter text-gray-900 dark:text-white uppercase">The Digital Twin</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 leading-relaxed font-medium">
              I've trained an AI model on my engineering philosophy and experience. Ask it about architectural trade-offs, my work on AI Assurance, or how I approach system quality.
            </p>
            <div className="flex items-center gap-4 p-4 glass rounded-2xl border-blue-500/20 bg-blue-500/[0.02]">
               <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black">AI</div>
               <div className="text-sm font-bold text-blue-600">Model: Gemini 3 Flash (Latest)</div>
            </div>
          </div>
          <AIChat />
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24 px-6 border-t border-gray-100 dark:border-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-12 text-gray-900 dark:text-white uppercase tracking-widest text-center">Tech Stack Matrix</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {SKILLS.slice(0, 15).map(skill => (
              <div key={skill.name} className="glass p-5 rounded-2xl hover:bg-blue-600/[0.02] transition-colors group">
                <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-3">{skill.category}</div>
                <div className="text-xs font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 transition-colors">{skill.name}</div>
                <div className="mt-3 h-0.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: `${skill.level}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-3xl mx-auto glass p-12 rounded-[40px] text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
          <h2 className="text-3xl font-bold mb-6 tracking-tighter text-gray-900 dark:text-white uppercase">Initiate Collaboration</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-12 font-medium">Available for technical leadership roles and high-impact AI strategy consulting.</p>
          
          <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Name" 
                className="w-full glass bg-white/50 dark:bg-gray-800/30 px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 ring-blue-500/50 text-sm"
                required
                value={formState.name}
                onChange={e => setFormState({...formState, name: e.target.value})}
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full glass bg-white/50 dark:bg-gray-800/30 px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 ring-blue-500/50 text-sm"
                required
                value={formState.email}
                onChange={e => setFormState({...formState, email: e.target.value})}
              />
            </div>
            <textarea 
              placeholder="Your inquiry..." 
              rows={4} 
              className="w-full glass bg-white/50 dark:bg-gray-800/30 px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 ring-blue-500/50 text-sm resize-none"
              required
              value={formState.message}
              onChange={e => setFormState({...formState, message: e.target.value})}
            ></textarea>
            <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[12px] hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
              {isSubmitting ? 'Sending...' : isSubmitted ? 'Message Sent' : 'Send Message'}
            </button>
          </form>

          <div className="mt-16 flex justify-center gap-10 opacity-50 text-[10px] font-black uppercase tracking-widest">
            <a href="https://github.com/kavitaj11" target="_blank" className="hover:text-blue-600 transition-colors">Github</a>
            <a href="https://linkedin.com/in/kavita-jadhav-tech" target="_blank" className="hover:text-blue-600 transition-colors">Linkedin</a>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
        © 2026 Kavita Jadhav • Built with Gemini & React
      </footer>
    </div>
  );
};

export default App;
