import React, { useState } from 'react';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Academics', href: '#academics' },
    { name: 'AI Clone', href: '#ai-clone' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-4 md:p-6 pointer-events-none">
      <div className="glass w-full max-w-7xl px-5 md:px-8 py-4 rounded-3xl flex items-center justify-between shadow-2xl relative pointer-events-auto border-white/30 bg-slate-900/90">
        {/* Logo - Positioned firmly to the left */}
        <a href="#" className="flex-shrink-0 font-black text-2xl md:text-3xl lg:text-4xl tracking-tighter text-white flex items-center gap-1 group mr-4">
          K<span className="text-cobalt font-serif italic group-hover:rotate-12 transition-transform">J</span>
        </a>
        
        {/* Full Desktop Menu - Visible on XL screens for maximum comfort */}
        <div className="hidden xl:flex gap-8 items-center">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm uppercase tracking-[0.2em] font-black text-white hover:text-cobalt transition-all duration-300 drop-shadow-md whitespace-nowrap"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Scaled Desktop Menu - Visible on Large screens */}
        <div className="hidden lg:flex xl:hidden gap-5 items-center">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-[11px] uppercase tracking-widest font-black text-white hover:text-cobalt transition-all duration-300 whitespace-nowrap"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Compact Desktop Menu - Visible on Medium screens (first 4 items only) */}
        <div className="hidden md:flex lg:hidden gap-4 items-center">
          {navItems.slice(0, 4).map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-[10px] uppercase tracking-widest font-black text-white hover:text-cobalt transition-all duration-300 whitespace-nowrap"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0 ml-4">
          <button
            onClick={onToggleTheme}
            className="p-2 md:p-3 rounded-2xl hover:bg-white/10 transition-all text-white"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m8.966-8.966h-2.25M5.284 12h-2.25m15.156-7.156l-1.591 1.591M6.719 17.281l-1.591 1.591m12.728 0l-1.591-1.591M6.719 6.719L5.128 5.128M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            )}
          </button>

          <a
            href="https://www.linkedin.com/in/kavita-jadhav-tech"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex bg-cobalt text-white px-5 md:px-8 py-2.5 md:py-3 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all shadow-2xl shadow-cobalt/50 active:scale-95 hover:bg-blue-500 whitespace-nowrap"
          >
            Connect
          </a>

          {/* Mobile Menu Toggle - Visible on lg and smaller to provide access to all items */}
          <button 
            className="xl:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-7 h-7 md:w-8 md:h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
            </svg>
          </button>
        </div>

        {/* Mobile/Tablet Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-6 glass rounded-[2rem] p-8 md:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.8)] animate-in slide-in-from-top-4 duration-300 xl:hidden border-white/20 bg-slate-900/95">
            <div className="flex flex-col gap-6 md:gap-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg md:text-xl uppercase tracking-[0.3em] font-black text-white hover:text-cobalt transition-colors border-b border-white/5 pb-3"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="https://www.linkedin.com/in/kavita-jadhav-tech"
                target="_blank"
                className="bg-cobalt text-white px-8 py-5 rounded-2xl text-center text-sm font-black uppercase tracking-widest shadow-2xl shadow-cobalt/40"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;