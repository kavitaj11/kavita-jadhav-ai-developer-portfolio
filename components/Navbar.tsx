import React from 'react';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme }) => {
  const navItems = [
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Academics', href: '#academics' },
    { name: 'AI Clone', href: '#ai-clone' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-5">
      <div className="glass px-5 py-2 rounded-2xl flex items-center gap-4 md:gap-8 border-gray-200/50 dark:border-gray-800/50">
        <a href="#" className="font-bold text-lg tracking-tighter text-gray-900 dark:text-white">KJ<span className="text-blue-600">.</span></a>
        
        <div className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-800 hidden md:block"></div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
            aria-label="Toggle Theme"
          >
            <div className="relative w-4 h-4 transition-all duration-500" style={{ transform: theme === 'dark' ? 'rotate(0deg)' : 'rotate(180deg)' }}>
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 text-blue-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 text-gray-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m8.966-8.966h-2.25M5.284 12h-2.25m15.156-7.156l-1.591 1.591M6.719 17.281l-1.591 1.591m12.728 0l-1.591-1.591M6.719 6.719L5.128 5.128M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              )}
            </div>
          </button>

          <a
            href="https://www.linkedin.com/in/kavita-jadhav-tech"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all"
          >
            Connect
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;