
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../src/data/navigation';
import { Language } from '../types';
import { Moon, Sun, Globe, Bomb } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  toggleLanguage: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onTriggerGravity: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab,
  language,
  toggleLanguage,
  theme,
  toggleTheme,
  onTriggerGravity
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const items = NAV_ITEMS[language];

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${isScrolled ? 'pt-4 md:pt-6' : 'pt-4 md:pt-6'}`}>
      <nav 
        className={`
          flex items-center justify-between 
          transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]
          ${isScrolled 
            ? 'w-[92vw] md:w-auto gap-2 md:gap-12 bg-white/90 dark:bg-black/90 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-2xl md:rounded-full px-4 md:px-10 py-3 md:py-4 shadow-pill dark:shadow-pill-dark' 
            : 'w-[96vw] bg-transparent border-transparent shadow-none px-0 py-2 backdrop-blur-none'}
        `}
      >
        
        {/* Logo Left - Text Based */}
        <div 
          className="cursor-pointer flex items-center gap-2 group shrink-0"
          onClick={() => setActiveTab('dashboard')}
        >
          <h1 className={`font-black tracking-tighter uppercase transition-all duration-500 ease-in-out text-black dark:text-white leading-none
            ${isScrolled ? 'text-xl md:text-3xl' : 'text-[clamp(1.25rem,3vw,3rem)]'}
          `}>
            LUN3CY <span className="hidden sm:inline">FAN</span>
          </h1>
        </div>

        {/* Links Right */}
        <div className={`flex items-center transition-all duration-700 overflow-x-auto no-scrollbar mask-gradient ${isScrolled ? 'gap-2 md:gap-8' : 'gap-3 md:gap-12'}`}>
          {items.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  text-base md:text-xl font-bold uppercase tracking-wide transition-colors duration-200 relative group whitespace-nowrap px-1
                  ${isActive ? 'text-black dark:text-white' : 'text-gray-400 hover:text-black dark:hover:text-white'}
                `}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {item.label}
                {/* Underline for hover/active */}
                <span className={`absolute -bottom-1 left-0 w-full h-[2px] md:h-[3px] bg-black dark:bg-white transform transition-transform duration-200 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
            )
          })}

          {/* Divider */}
          <div className="w-[1px] h-6 md:h-8 bg-gray-200 dark:bg-gray-700 shrink-0 mx-2"></div>

          {/* Controls: Language & Theme & Gravity */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
             {/* Language Toggle */}
             <button
               onClick={toggleLanguage}
               className="p-1 md:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-black dark:text-white flex items-center gap-1"
               title="Switch Language"
             >
               <Globe size={20} className="md:w-6 md:h-6" />
               <span className="text-base md:text-lg font-bold">{language === 'zh' ? 'EN' : '中'}</span>
             </button>

             {/* Theme Toggle */}
             <button 
               onClick={toggleTheme}
               className="p-1 md:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-black dark:text-white"
               title="Toggle Theme"
             >
               {theme === 'light' ? <Moon size={20} className="md:w-6 md:h-6" /> : <Sun size={20} className="md:w-6 md:h-6" />}
             </button>
             
             {/* Gravity Bonus Toggle */}
             <button 
               onClick={onTriggerGravity}
               className="p-1 md:p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition-colors text-black dark:text-white"
               title="Boom!"
             >
               <Bomb size={20} className="md:w-6 md:h-6 hover:text-red-500 transition-colors" />
             </button>
          </div>

        </div>
      </nav>
    </div>
  );
};
