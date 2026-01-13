import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar.tsx';
import ProjectCard from './components/ProjectCard.tsx';
import AIChat from './components/AIChat.tsx';
import { PROJECTS, SKILLS, CERTIFICATIONS, EDUCATION } from './constants.tsx';

const EXPERIENCE = [
  {
    role: "Founder / Technical Director",
    company: "K11 Software Solutions",
    period: "Feb 2024 - Present",
    description: "Providing end-to-end consulting for AI/LLM integration and automated DevOps pipelines. Leading POCs for modern architectural recommendations and high-performance engineering workflows, specifically focusing on prompt evaluation and RAG optimization using tools like Promptfoo, DeepEval, and LangTest.",
    tech: ["AI Agents", "LLM Testing", "Python", "Promptfoo", "DeepEval", "LangTest"]
  },
  {
    role: "Senior Consultant",
    company: "Tata Consultancy Services (Verizon)",
    period: "Apr 2025 - Jan 2026",
    description: "Architecting Network Assurance Infrastructure for Verizon's iEN service. Performing lab-based simulations of complex network topologies and hardware faults to ensure 99.99% service reliability through advanced provisioning and surveillance systems.",
    tech: ["Java", "Serenity BDD", "Network Edge Devices", "Jenkins", "VRepair"]
  },
  {
    role: "Lead Software Engineer",
    company: "Broadcom (VMware)",
    period: "Oct 2021 - Jan 2024",
    description: "Led the engineering of SaaS Subscription Commerce platforms across Salesforce and SAP ecosystems. Refactored legacy architectures, reducing maintenance costs by 70% while scaling validation utilities for complex global scenarios.",
    tech: ["Salesforce CPQ", "SAP BRIM", "MongoDB", "Java", "REST"]
  },
  {
    role: "Lead Automation Developer",
    company: "Cognizant (ETRADE)",
    period: "Jun 2019 - Sep 2021",
    description: "Onsite lead for the digital transformation of ETRADE's stock plan and Equity Edge systems. Scaled BDD frameworks to automate over 2,000+ high-concurrency test cases, reducing regression time by 80%.",
    tech: ["Selenium", "Cucumber", "Oracle SQL", "Maven", "ControlM"]
  },
  {
    role: "Senior Test Automation Engineer",
    company: "Analyst International Corp (Delta Dental)",
    period: "Feb 2018 - Jun 2019",
    description: "Led automation for D2C applications with a focus on ORMB-based Enrollment and Billing. Designed and built a scalable Java Selenium framework that cut regression time by 80-90%.",
    tech: ["Java", "Selenium", "REST Assured", "Jenkins", "SauceLabs"]
  },
  {
    role: "Automation Engineer",
    company: "Signature Consultants (Wells Fargo)",
    period: "Aug 2016 - Oct 2017",
    description: "Supported web and mobile test automation using Selenium and Appium. Enhanced frameworks and authored high-fidelity test plans for mission-critical financial systems.",
    tech: ["Selenium WebDriver", "Appium", "TestNG", "Qmetry", "SQL"]
  }
];

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeProjectFilter, setActiveProjectFilter] = useState<string>('All');
  const [titleIndex, setTitleIndex] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
    }
    return 'dark';
  });

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const titles = [
    "Full Stack & AI Developer",
    "Architecting Intelligent Systems",
    "High-Performance Software Engineer",
    "Digital Product & AI Strategist"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          if (href === '#') return;
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', message: '' });
  };

  const skillCategories = ['All', 'Frontend', 'Backend', 'AI', 'Quality and AI Assurance Automation'];
  const projectFilters = ['All', 'AI', 'Full-Stack', 'Frontend', 'Backend', 'Quality and AI Assurance Automation'];

  const filteredSkills = activeCategory === 'All' ? SKILLS : SKILLS.filter(skill => skill.category === activeCategory);

  const filteredProjects = PROJECTS.filter(project => {
    if (activeProjectFilter === 'All') return true;
    const filterLower = activeProjectFilter.toLowerCase();
    const tags = project.tags.map(t => t.toLowerCase());
    
    // Logic for excluding multi-disciplinary apps from specialized tabs
    if (filterLower === 'frontend') {
      const isFullStack = tags.some(t => t.includes('full-stack') || t.includes('fullstack'));
      if (isFullStack) return false;
    }

    if (filterLower === 'ai') {
      const isSelenium = tags.some(t => t.includes('selenium'));
      if (isSelenium) return false;
    }

    if (filterLower === 'backend') {
      const isFullStack = tags.some(t => t.includes('full-stack') || t.includes('fullstack'));
      const isAI = tags.some(t => t === 'ai');
      const isQuality = tags.some(t => t.includes('quality') || t.includes('bdd') || t.includes('selenium') || t.includes('testing') || t.includes('assurance'));
      // Remove selenium and other non-DB/pure-backend projects
      if (isFullStack || isAI || isQuality) return false;
      
      // Specifically allow only Rumi Tracker and Greenspot DB for the Backend filter
      const isTargetBackend = project.id === 'rumi-press-tracker' || project.id === 'greenspot-db';
      if (!isTargetBackend) return false;
    }

    return project.tags.some(tag => {
      const tagLower = tag.toLowerCase();
      // Heuristic match for categories
      if (filterLower === 'frontend' && (tagLower.includes('react') || tagLower.includes('next.js') || tagLower.includes('frontend'))) return true;
      if (filterLower === 'backend' && (tagLower.includes('django') || tagLower.includes('python') || tagLower.includes('node.js') || tagLower.includes('sql') || tagLower.includes('database') || tagLower.includes('db design') || tagLower.includes('java') || tagLower.includes('backend'))) return true;
      
      // Logic for Quality and AI Assurance Automation
      if (filterLower === 'quality and ai assurance automation' && (
        tagLower.includes('quality') || 
        tagLower.includes('bdd') || 
        tagLower.includes('selenium') || 
        tagLower.includes('cucumber') || 
        tagLower.includes('assurance') || 
        tagLower.includes('promptfoo')
      )) return true;

      return tagLower.includes(filterLower);
    });
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-700 selection:bg-blue-500/30">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl pointer-events-none opacity-20 dark:opacity-40">
           <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-float"></div>
           <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-3s' }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-blue-500/10 text-blue-600 dark:text-blue-400 text-[9px] font-bold mb-10 tracking-[0.3em] uppercase opacity-80">
            Kavita Jadhav | Software Engineer 2026
          </div>
          
          <div className="min-h-[140px] md:min-h-[160px] flex items-center justify-center overflow-hidden">
            <h1 
              key={titleIndex}
              className="text-3xl md:text-6xl font-extrabold mb-8 leading-[1.1] tracking-tighter text-gray-900 dark:text-white animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out"
            >
              {titles[titleIndex].split(' ').map((word, i) => (
                <span key={`${titleIndex}-${i}`} className={i % 2 === 1 ? "gradient-text" : ""}>
                  {word}{' '}
                </span>
              ))}
            </h1>
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-lg max-w-2xl mx-auto mb-12 font-normal leading-relaxed opacity-90">
            Dedicated to engineering resilient digital products. 
            Blending high-performance Full Stack architecture with advanced Generative AI and a relentless focus on systemic quality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#projects" className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black text-[11px] font-bold uppercase tracking-widest rounded-xl hover:shadow-2xl hover:translate-y-[-2px] transition-all">
              Engineering Work
            </a>
            <a href="#experience" className="px-8 py-4 glass text-gray-900 dark:text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all">
              Professional Path
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-gray-50/30 dark:bg-gray-900/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white tracking-tight uppercase">Selected Works</h2>
              <div className="h-0.5 w-12 bg-blue-600 mb-4"></div>
              <p className="text-gray-500 dark:text-gray-400 text-xs max-w-xs">Building scalable platforms, intelligent agents, and high-quality infrastructures.</p>
            </div>
            <div className="text-gray-400 dark:text-gray-600 mono text-[10px] font-bold uppercase tracking-[0.2em]">01 / Cases</div>
          </div>

          {/* Project Filters */}
          <div className="flex flex-wrap gap-2 mb-12">
            {projectFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveProjectFilter(filter)}
                className={`px-5 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all border ${
                  activeProjectFilter === filter
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                    : 'glass border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          {filteredProjects.length === 0 && (
            <div className="py-20 text-center glass rounded-3xl">
              <p className="text-gray-400 text-sm font-medium">No projects found for the selected criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white tracking-tight uppercase">Experience Architecture</h2>
              <div className="h-0.5 w-12 bg-blue-600 mb-4"></div>
              <p className="text-gray-500 dark:text-gray-400 text-xs max-w-xs">A decade of delivering mission-critical solutions in complex domains.</p>
            </div>
            <div className="text-gray-400 dark:text-gray-600 mono text-[10px] font-bold uppercase tracking-[0.2em]">02 / Path</div>
          </div>

          <div className="space-y-6">
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="glass p-8 rounded-3xl group hover:border-blue-500/20 transition-all border-gray-100 dark:border-gray-800/50">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight mb-1">{exp.role}</h3>
                    <p className="text-blue-600 dark:text-blue-400 text-[11px] font-bold uppercase tracking-widest">{exp.company}</p>
                  </div>
                  <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-[10px] mono font-bold text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {exp.period}
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed max-w-3xl">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span key={t} className="px-3 py-1 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 rounded-full text-[9px] mono font-bold text-gray-600 dark:text-gray-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white tracking-tight uppercase">Technology Matrix</h2>
              <div className="h-0.5 w-12 bg-blue-600 mb-4"></div>
              <p className="text-gray-500 dark:text-gray-400 text-xs max-w-xs">Broad expertise across the stack, with a focus on AI and high-quality delivery.</p>
            </div>
            <div className="text-gray-400 dark:text-gray-600 mono text-[10px] font-bold uppercase tracking-[0.2em]">03 / Skills</div>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {skillCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`group flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${
                  activeCategory === cat
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
                    : 'glass border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {cat}
                <span className={`text-[8px] px-1.5 py-0.5 rounded-sm mono font-medium ${
                  activeCategory === cat ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                }`}>
                  {SKILLS.filter(s => cat === 'All' || s.category === cat).length}
                </span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSkills.map((skill, index) => (
              <div 
                key={skill.name} 
                className="glass p-5 rounded-2xl hover:border-blue-500/20 transition-all group animate-in fade-in zoom-in slide-in-from-bottom-1 duration-300 fill-mode-both"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[8px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-bold">{skill.category}</span>
                  <span className="mono text-[9px] text-blue-600 dark:text-blue-400 font-bold">{skill.level}%</span>
                </div>
                <h4 className="font-bold text-xs uppercase tracking-tight text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{skill.name}</h4>
                <div className="w-full bg-gray-100 dark:bg-gray-800 h-1 rounded-full mt-4 overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academics Section */}
      <section id="academics" className="py-24 px-6 bg-gray-50/30 dark:bg-gray-900/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white tracking-tight uppercase">Credentials & Knowledge</h2>
              <div className="h-0.5 w-12 bg-blue-600 mb-4"></div>
              <p className="text-gray-500 dark:text-gray-400 text-xs max-w-xs">Academic foundation and industry-standard certifications.</p>
            </div>
            <div className="text-gray-400 dark:text-gray-600 mono text-[10px] font-bold uppercase tracking-[0.2em]">04 / Validation</div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white tracking-tight uppercase">Academic Qualification</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-[10px] uppercase font-bold tracking-widest">Formal Education</p>
                </div>
              </div>
              <div className="space-y-4">
                {EDUCATION.map((edu) => (
                  <div key={edu.id} className="glass p-6 rounded-3xl border-gray-100 dark:border-gray-800/50">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{edu.degree}</h4>
                        <p className="text-blue-600 dark:text-blue-400 text-[11px] font-bold uppercase tracking-widest mt-1">{edu.institution}</p>
                      </div>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-[9px] mono font-bold text-gray-500 dark:text-gray-400">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                      {edu.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white tracking-tight uppercase">Professional Certifications</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-[10px] uppercase font-bold tracking-widest">Industry Expertise</p>
                </div>
              </div>
              <div className="space-y-4">
                {CERTIFICATIONS.map((cert) => (
                  <div key={cert.id} className="glass p-5 rounded-2xl flex items-center justify-between group hover:border-blue-500/20 transition-all">
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">{cert.name}</h4>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mt-1">{cert.issuer}</p>
                    </div>
                    <span className="mono text-[10px] font-bold text-blue-600 dark:text-blue-400">{cert.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Persona Section */}
      <section id="ai-clone" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/[0.01] dark:bg-blue-600/[0.02] -z-10 skew-y-1"></div>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white uppercase">Neural Representative</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 leading-relaxed max-w-sm">
              Interact with an AI twin built to simulate Kavita's multi-disciplinary engineering philosophy. 
              Explore her approach to Full Stack architecture, AI systems, and end-to-end quality.
            </p>
            <div className="space-y-4">
               {[
                 "Inquire about Full Stack architecture choices.",
                 "Explore AI integration and RAG strategies.",
                 "Discuss the intersection of engineering and quality."
               ].map((text, i) => (
                 <div key={i} className="flex items-center gap-4 text-gray-500 dark:text-gray-500 text-[11px] font-medium">
                    <span className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-blue-600 shrink-0">{i+1}</span>
                    <span>{text}</span>
                 </div>
               ))}
            </div>
          </div>
          <div className="flex-1 w-full">
            <AIChat />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 border-t border-gray-100 dark:border-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white uppercase">Let's Connect</h2>
            <p className="text-gray-500 dark:text-gray-400 text-xs font-medium max-w-sm mx-auto">Open to product-focused engineering leadership and strategic technical consulting.</p>
          </div>

          <div className="glass p-10 rounded-3xl max-w-xl mx-auto shadow-2xl border-blue-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -z-10"></div>
            {isSubmitted ? (
              <div className="py-12 text-center animate-in zoom-in-95 duration-500">
                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Transmission Successful</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Thank you for reaching out. I'll get back to you shortly.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-white dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700/50 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-white dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700/50 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Message Inquiry</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-white dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700/50 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Describe your goals or vision..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-4 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-600/10 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Transmitting...
                    </>
                  ) : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
             <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
               <a href="https://github.com/kavitaj11" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">GitHub</a>
               <a href="https://www.linkedin.com/in/kavita-jadhav-tech" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">LinkedIn</a>
             </div>
             <p className="text-[9px] mono tracking-widest font-bold uppercase">(c) 2026 | Kavita Jadhav | Product & AI Developer</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;