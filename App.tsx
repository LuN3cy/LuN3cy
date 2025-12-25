
import React, { useState, useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { Sidebar } from './components/Sidebar';
import { HeroSection } from './components/HeroSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ArticleSection } from './components/ArticleSection';
import { TimelineSection } from './components/TimelineSection';
import { MusicPlayer } from './components/MusicPlayer';
import { Mail, MapPin, RotateCcw, MessageSquare, Instagram, Youtube, FileText, Aperture, Github } from 'lucide-react';
import { NAV_ITEMS } from './src/data/navigation';
import { CONTACT_DATA } from './src/data/contact';
import { ARTICLES_PAGE_DATA } from './src/data/articles';
import { PORTFOLIO_PAGE_DATA } from './src/data/portfolioPage';
import { Language, Category } from './types';

interface ExplodedElementData {
  element: HTMLElement;
  originalStyle: string;
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState<Language>('zh');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const [portfolioCategory, setPortfolioCategory] = useState<string>('All');
  
  const [gravityActive, setGravityActive] = useState(false);

  const startViewTransition = (update: () => void) => {
    // Disable view transitions on mobile to prevent flickering and performance issues
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      update();
      return;
    }

    const anyDoc = document as any;
    if (anyDoc && typeof anyDoc.startViewTransition === 'function') {
      anyDoc.startViewTransition(update);
    } else {
      update();
    }
  };
  const engineRef = useRef<any>(null);
  const runnerRef = useRef<any>(null);
  const requestRef = useRef<number | null>(null);
  const explodedElementsRef = useRef<ExplodedElementData[]>([]);
  const dissipatedElementsRef = useRef<ExplodedElementData[]>([]);
  const scrollPositionRef = useRef<number>(0);

  useEffect(() => {
    // Automatic theme based on time: 19:00 - 06:00 is dark mode
    const hour = new Date().getHours();
    const isDarkTime = hour >= 19 || hour < 6;
    setTheme(isDarkTime ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Scroll to top when activeTab changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };

  const handleHeroNavigation = (category: Category) => {
    startViewTransition(() => {
      setPortfolioCategory(category);
      setActiveTab('portfolio');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };
  
  // -------------------------
  // GRAVITY EXPLOSION LOGIC
  // -------------------------
  
  const handleInteraction = (event: MouseEvent) => {
    if (!engineRef.current) return;
    const engine = engineRef.current;
    
    const mouseX = event.clientX + window.scrollX;
    const mouseY = event.clientY + window.scrollY;
    
    const bodies = Matter.Composite.allBodies(engine.world);
    
    bodies.forEach((body: any) => {
      if (body.isStatic) return;

      // Add force on click
      if (event.type === 'mousedown') {
          const bodyX = body.position.x;
          const bodyY = body.position.y;
          const distance = Math.sqrt(Math.pow(mouseX - bodyX, 2) + Math.pow(mouseY - bodyY, 2));
          
          if (distance < 500) {
            const forceMagnitude = 0.8 * (1 - distance / 500); 
            const angle = Math.atan2(bodyY - mouseY, bodyX - mouseX);
            
            Matter.Body.applyForce(body, body.position, {
              x: Math.cos(angle) * forceMagnitude,
              y: Math.sin(angle) * forceMagnitude
            });
          }
      }
    });
  };

  const triggerGravity = () => {
    if (gravityActive) return;
    
    if (!Matter) return;

    scrollPositionRef.current = window.scrollY;
    // Lock body height to current scroll height to prevent layout jump
    document.body.style.height = `${document.documentElement.scrollHeight}px`; 
    document.body.style.overflow = 'hidden'; 
    
    setGravityActive(true);

    const Engine = Matter.Engine,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite;

    const engine = Engine.create({
      positionIterations: 12,
      velocityIterations: 8,
      constraintIterations: 4
    });
    const world = engine.world;
    engineRef.current = engine;

    // Dissipate large images
    const largeComponents = Array.from(document.querySelectorAll('main img, .aspect-\\[4\\/3\\]')) as HTMLElement[];
    const dissipatedData: ExplodedElementData[] = [];
    
    largeComponents.forEach(el => {
      dissipatedData.push({
        element: el,
        originalStyle: el.getAttribute('style') || ''
      });
      el.style.transition = 'all 0.5s ease-out';
      el.style.transform = 'scale(0.8)';
      el.style.opacity = '0';
      el.style.pointerEvents = 'none';
    });
    dissipatedElementsRef.current = dissipatedData;

    // Selector: Target individual visible elements, avoid layout wrappers
    const selector = `
      nav h1, nav button, nav span,
      footer p,
      .rounded-\\[2rem\\]:not(.aspect-\\[4\\/3\\]),
      main h1, main h2, main h3, main h4, main p, main span, 
      main svg, main button, main a, 
      main li,
      div[class*="border-b-2"], 
      div[class*="h-[1px]"],
      div[class*="h-[2px]"]
    `;
    
    const candidates = Array.from(document.querySelectorAll(selector)) as HTMLElement[];
    
    const visibleCandidates = candidates.filter(el => {
       const rect = el.getBoundingClientRect();
       if (rect.width < 5 || rect.height < 5) return false;
       if (window.getComputedStyle(el).display === 'none') return false;
       if (window.getComputedStyle(el).opacity === '0') return false;
       if (largeComponents.includes(el)) return false;
       return true;
    });

    // Containment check to prevent overlapping physics bodies
    const validElements = visibleCandidates.filter(el => {
      return !visibleCandidates.some(parent => parent !== el && parent.contains(el));
    });

    const bodies: any[] = [];
    const explodedData: ExplodedElementData[] = [];

    validElements.forEach(el => {
      explodedData.push({
        element: el,
        originalStyle: el.getAttribute('style') || ''
      });

      const rect = el.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      const centerX = rect.left + rect.width / 2 + scrollX;
      const centerY = rect.top + rect.height / 2 + scrollY;

      const body = Bodies.rectangle(centerX, centerY, rect.width, rect.height, {
        restitution: 0.2, 
        friction: 0.5,    
        frictionAir: 0.05, 
        density: 0.002,
        chamfer: { radius: Math.min(rect.width, rect.height) * 0.1 }, 
        angle: (Math.random() - 0.5) * 0.05
      });
      (body as any).domElement = el;
      bodies.push(body);

      // Lock Visuals
      el.style.boxSizing = 'border-box';
      el.style.position = 'absolute';
      el.style.left = `${rect.left + scrollX}px`;
      el.style.top = `${rect.top + scrollY}px`;
      el.style.width = `${rect.width}px`;
      el.style.height = `${rect.height}px`;
      el.style.margin = '0'; 
      el.style.transform = 'translate(0, 0) rotate(0deg)';
      el.style.zIndex = '1000';
      el.style.pointerEvents = 'none'; 
      el.style.transition = 'none';
    });

    explodedElementsRef.current = explodedData;

    const totalHeight = document.documentElement.scrollHeight;

    // Add floor
    const floor = Bodies.rectangle(
        window.innerWidth / 2, 
        totalHeight + 500, // Place floor well below content
        window.innerWidth, 
        1000, 
        { isStatic: true, render: { visible: false } }
    );

    // Add walls
    const wallLeft = Bodies.rectangle(
        -500, 
        totalHeight / 2, 
        1000, 
        totalHeight * 2, 
        { isStatic: true, render: { visible: false } }
    );
    const wallRight = Bodies.rectangle(
        window.innerWidth + 500, 
        totalHeight / 2, 
        1000, 
        totalHeight * 2, 
        { isStatic: true, render: { visible: false } }
    );

    Composite.add(world, [floor, wallLeft, wallRight, ...bodies]);

    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    const update = () => {
      if (!engineRef.current) return;

      bodies.forEach(body => {
        const el = (body as any).domElement;
        if (el) {
          const { x, y } = body.position;
          const angle = body.angle;
          
          const initialLeft = parseFloat(el.style.left);
          const initialTop = parseFloat(el.style.top);
          const w = parseFloat(el.style.width);
          const h = parseFloat(el.style.height);

          const initialCenterX = initialLeft + w / 2;
          const initialCenterY = initialTop + h / 2;

          const dx = x - initialCenterX;
          const dy = y - initialCenterY;

          el.style.transform = `translate(${dx}px, ${dy}px) rotate(${angle}rad)`;
        }
      });

      requestRef.current = requestAnimationFrame(update);
    };
    
    update();

    setTimeout(() => {
        window.addEventListener('mousedown', handleInteraction);
    }, 50);
  };

  const resetGravity = () => {
    window.removeEventListener('mousedown', handleInteraction);

    if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
    if (engineRef.current) {
      Matter.World.clear(engineRef.current.world, false);
      Matter.Engine.clear(engineRef.current);
    }
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    
    engineRef.current = null;
    runnerRef.current = null;

    const explodedData = explodedElementsRef.current;
    
    explodedData.forEach(({ element }) => {
      // FORCE REFLOW: Critical for smooth transition from chaos to order
      void element.offsetWidth; 
      
      // Use specific transition property to avoid conflicts
      element.style.transition = 'transform 1s cubic-bezier(0.19, 1, 0.22, 1)';
      // Reset transform to identity (relative to fixed start position)
      element.style.transform = 'translate(0, 0) rotate(0deg)';
    });

    const dissipatedData = dissipatedElementsRef.current;
    dissipatedData.forEach(({ element }) => {
      element.style.transition = 'all 1s ease';
      element.style.transform = 'scale(1)';
      element.style.opacity = '1';
    });

    setTimeout(() => {
      explodedData.forEach(({ element, originalStyle }) => {
        element.setAttribute('style', originalStyle);
      });
      dissipatedData.forEach(({ element, originalStyle }) => {
         element.setAttribute('style', originalStyle);
      });

      explodedElementsRef.current = [];
      dissipatedElementsRef.current = [];
      
      document.body.style.height = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollPositionRef.current);
      
      setGravityActive(false);
    }, 1000); // Matches transition duration
  };


  const content = CONTACT_DATA[language];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <HeroSection 
              onNavigate={(tab) => startViewTransition(() => setActiveTab(tab))} 
              onCategorySelect={handleHeroNavigation}
              language={language} 
            />
            <PortfolioSection language={language} externalFilter={portfolioCategory} />
          </>
        );
      case 'portfolio':
        return (
          <div className="pt-20 w-full max-w-[96vw] mx-auto">
             <div className="mb-24">
               <h1 className="text-[8vw] leading-none font-black mb-8 text-black dark:text-white transition-colors duration-300">
                 {PORTFOLIO_PAGE_DATA[language].title}
               </h1>
               <p className="text-2xl text-gray-500 dark:text-gray-400 max-w-2xl font-medium transition-colors duration-300">
                 {PORTFOLIO_PAGE_DATA[language].description}
               </p>
             </div>
             <PortfolioSection language={language} externalFilter={portfolioCategory} />
          </div>
        );
      case 'articles':
        return (
          <div className="pt-20 w-full max-w-[96vw] mx-auto">
             <div className="mb-24 flex flex-col items-center text-center">
               <h1 className="text-[8vw] leading-none font-black mb-8 text-black dark:text-white transition-colors duration-300">
                 {ARTICLES_PAGE_DATA[language].title}
               </h1>
               <p className="text-2xl text-gray-500 dark:text-gray-400 max-w-2xl font-medium transition-colors duration-300">
                 {ARTICLES_PAGE_DATA[language].description}
               </p>
             </div>
             <ArticleSection language={language} />
          </div>
        );
      case 'about':
        return (
          <div className="pt-20 w-full max-w-[96vw] mx-auto">
            <TimelineSection language={language} />
          </div>
        );
      case 'contact':
        return (
           <div className="pt-32 w-full max-w-5xl mx-auto text-center animate-fade-in px-4">
              <h1 className="text-[12vw] font-black mb-12 leading-none text-black dark:text-white transition-colors duration-300">
                {content.hello}
              </h1>
              <p className="text-3xl text-gray-500 dark:text-gray-400 mb-20 max-w-3xl mx-auto leading-relaxed font-medium transition-colors duration-300">
                {content.intro}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {/* Email */}
                  <div className="block p-12 border-2 border-gray-100 dark:border-gray-800 rounded-[2rem] group cursor-default hover:border-orange-500 transition-colors duration-300">
                     <Mail size={48} className="mx-auto mb-6 text-gray-400 group-hover:text-orange-500 transition-colors duration-300" />
                     <h3 className="text-2xl font-bold mb-2 text-black dark:text-white transition-colors duration-300">
                       {content.emailMeLabel}
                     </h3>
                     <p className="text-lg opacity-70 text-gray-500 dark:text-gray-400 transition-colors duration-300 select-text">
                       {content.email}
                     </p>
                  </div>

                 {/* Socials - WeChat */}
                 <div 
                    className="block p-12 border-2 border-gray-100 dark:border-gray-800 rounded-[2rem] hover:border-[#07C160] transition-colors duration-300 group cursor-pointer relative"
                    onClick={() => window.open('https://mp.weixin.qq.com/s/MD5T-BsAgUi9yUo6ISY1CA', '_blank')}
                    onMouseEnter={(e) => {
                       const tooltip = document.getElementById('wechat-tooltip');
                       if (tooltip) {
                          tooltip.style.opacity = '1';
                          tooltip.style.transform = 'scale(1) translateY(0)';
                       }
                    }}
                    onMouseMove={(e) => {
                       const tooltip = document.getElementById('wechat-tooltip');
                       if (tooltip) {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          tooltip.style.left = `${x + 20}px`;
                          tooltip.style.top = `${y + 20}px`;
                       }
                    }}
                    onMouseLeave={() => {
                       const tooltip = document.getElementById('wechat-tooltip');
                       if (tooltip) {
                          tooltip.style.opacity = '0';
                          tooltip.style.transform = 'scale(0.95) translateY(10px)';
                       }
                    }}
                 >
                    <MessageSquare size={48} className="mx-auto mb-6 text-gray-400 group-hover:text-[#07C160] transition-colors duration-300" />
                    <h3 className="text-2xl font-bold mb-2 text-black dark:text-white transition-colors duration-300">
                      {language === 'zh' ? '公众号' : 'WeChat'}
                    </h3>
                    <p className="text-lg opacity-70 text-gray-500 dark:text-gray-400 transition-colors duration-300">
                      {content.socials?.wechat || 'Lun3cy'}
                    </p>
                    
                    {/* Glassmorphism Tooltip */}
                    <div 
                       id="wechat-tooltip"
                       className="absolute z-50 w-64 h-32 bg-white/60 dark:bg-black/60 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl shadow-2xl pointer-events-none transition-all duration-200 opacity-0 transform scale-95 translate-y-2 overflow-hidden flex items-center justify-center"
                       style={{ top: 0, left: 0 }}
                    >
                       <p className="text-sm font-bold text-black dark:text-white opacity-80 px-4 text-center">
                          Click to view profile<br/>
                          <span className="text-xs opacity-50 font-mono">mp.weixin.qq.com</span>
                       </p>
                    </div>
                 </div>

                 {/* Socials - Xiaohongshu */}
                 <div 
                    className="block p-12 border-2 border-gray-100 dark:border-gray-800 rounded-[2rem] hover:border-[#EC4048] transition-colors duration-300 group cursor-pointer relative"
                    onClick={() => window.open('https://www.xiaohongshu.com/user/profile/61bbb882000000001000e80d', '_blank')}
                    onMouseEnter={(e) => {
                       const tooltip = document.getElementById('red-tooltip');
                       if (tooltip) {
                          tooltip.style.opacity = '1';
                          tooltip.style.transform = 'scale(1) translateY(0)';
                       }
                    }}
                    onMouseMove={(e) => {
                       const tooltip = document.getElementById('red-tooltip');
                       if (tooltip) {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          tooltip.style.left = `${x + 20}px`;
                          tooltip.style.top = `${y + 20}px`;
                       }
                    }}
                    onMouseLeave={() => {
                       const tooltip = document.getElementById('red-tooltip');
                       if (tooltip) {
                          tooltip.style.opacity = '0';
                          tooltip.style.transform = 'scale(0.95) translateY(10px)';
                       }
                    }}
                 >
                    <Instagram size={48} className="mx-auto mb-6 text-gray-400 group-hover:text-[#EC4048] transition-colors duration-300" />
                    <h3 className="text-2xl font-bold mb-2 text-black dark:text-white transition-colors duration-300">
                      {language === 'zh' ? '小红书' : 'RED'}
                    </h3>
                    <p className="text-lg opacity-70 text-gray-500 dark:text-gray-400 transition-colors duration-300">
                      {content.socials?.xiaohongshu || 'Lun3cy'}
                    </p>

                    {/* Glassmorphism Tooltip */}
                    <div 
                       id="red-tooltip"
                       className="absolute z-50 w-64 h-32 bg-white/60 dark:bg-black/60 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl shadow-2xl pointer-events-none transition-all duration-200 opacity-0 transform scale-95 translate-y-2 overflow-hidden flex items-center justify-center"
                       style={{ top: 0, left: 0 }}
                    >
                       <p className="text-sm font-bold text-black dark:text-white opacity-80 px-4 text-center">
                          Click to view profile<br/>
                          <span className="text-xs opacity-50 font-mono">xiaohongshu.com</span>
                       </p>
                    </div>
                 </div>

                 {/* Socials - Bilibili */}
                 <div 
                    className="block p-12 border-2 border-gray-100 dark:border-gray-800 rounded-[2rem] hover:border-[#00AEEC] transition-colors duration-300 group cursor-pointer relative"
                    onClick={() => window.open('https://b23.tv/XNNX02Q', '_blank')}
                    onMouseEnter={(e) => {
                       const tooltip = document.getElementById('bili-tooltip');
                       if (tooltip) {
                          tooltip.style.opacity = '1';
                          tooltip.style.transform = 'scale(1) translateY(0)';
                       }
                    }}
                    onMouseMove={(e) => {
                       const tooltip = document.getElementById('bili-tooltip');
                       if (tooltip) {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          tooltip.style.left = `${x + 20}px`;
                          tooltip.style.top = `${y + 20}px`;
                       }
                    }}
                    onMouseLeave={() => {
                       const tooltip = document.getElementById('bili-tooltip');
                       if (tooltip) {
                          tooltip.style.opacity = '0';
                          tooltip.style.transform = 'scale(0.95) translateY(10px)';
                       }
                    }}
                 >
                    <Youtube size={48} className="mx-auto mb-6 text-gray-400 group-hover:text-[#00AEEC] transition-colors duration-300" />
                    <h3 className="text-2xl font-bold mb-2 text-black dark:text-white transition-colors duration-300">
                      Bilibili
                    </h3>
                    <p className="text-lg opacity-70 text-gray-500 dark:text-gray-400 transition-colors duration-300">
                      {content.socials?.bilibili || 'Lun3cy'}
                    </p>

                    {/* Glassmorphism Tooltip */}
                    <div 
                       id="bili-tooltip"
                       className="absolute z-50 w-64 h-32 bg-white/60 dark:bg-black/60 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl shadow-2xl pointer-events-none transition-all duration-200 opacity-0 transform scale-95 translate-y-2 overflow-hidden flex items-center justify-center"
                       style={{ top: 0, left: 0 }}
                    >
                       <p className="text-sm font-bold text-black dark:text-white opacity-80 px-4 text-center">
                          Click to view profile<br/>
                          <span className="text-xs opacity-50 font-mono">b23.tv/XNNX02Q</span>
                       </p>
                    </div>
                 </div>

                 {/* Socials - 500px */}
                 <div 
                    className="block p-12 border-2 border-gray-100 dark:border-gray-800 rounded-[2rem] hover:border-black dark:hover:border-white transition-colors duration-300 group cursor-pointer relative"
                    onClick={() => window.open('https://500px.com.cn/LuN3cy', '_blank')}
                    onMouseEnter={(e) => {
                       const tooltip = document.getElementById('px-tooltip');
                       if (tooltip) {
                          tooltip.style.opacity = '1';
                          tooltip.style.transform = 'scale(1) translateY(0)';
                       }
                    }}
                    onMouseMove={(e) => {
                       const tooltip = document.getElementById('px-tooltip');
                       if (tooltip) {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          tooltip.style.left = `${x + 20}px`;
                          tooltip.style.top = `${y + 20}px`;
                       }
                    }}
                    onMouseLeave={() => {
                       const tooltip = document.getElementById('px-tooltip');
                       if (tooltip) {
                          tooltip.style.opacity = '0';
                          tooltip.style.transform = 'scale(0.95) translateY(10px)';
                       }
                    }}
                 >
                    <Aperture size={48} className="mx-auto mb-6 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300" />
                    <h3 className="text-2xl font-bold mb-2 text-black dark:text-white transition-colors duration-300">
                      500px
                    </h3>
                    <p className="text-lg opacity-70 text-gray-500 dark:text-gray-400 transition-colors duration-300">
                      {content.socials?.px500 || 'LuN3cy'}
                    </p>

                    {/* Glassmorphism Tooltip */}
                    <div 
                       id="px-tooltip"
                       className="absolute z-50 w-64 h-32 bg-white/60 dark:bg-black/60 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl shadow-2xl pointer-events-none transition-all duration-200 opacity-0 transform scale-95 translate-y-2 overflow-hidden flex items-center justify-center"
                       style={{ top: 0, left: 0 }}
                    >
                       <p className="text-sm font-bold text-black dark:text-white opacity-80 px-4 text-center">
                          Click to view profile<br/>
                          <span className="text-xs opacity-50 font-mono">500px.com.cn</span>
                       </p>
                    </div>
                 </div>

                 {/* GitHub */}
                 <div 
                    className="block p-12 border-2 border-gray-100 dark:border-gray-800 rounded-[2rem] relative group cursor-pointer hover:border-black dark:hover:border-white transition-colors duration-300"
                    onClick={() => window.open('https://github.com/LuN3cy', '_blank')}
                 >
                    <Github size={48} className="mx-auto mb-6 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300" />
                    {/* Custom Floating Color for Github Icon on Hover */}
                    <style>{`
                      .group:hover .text-gray-400.group-hover\\:text-black { color: #0D1932 !important; }
                      .dark .group:hover .text-gray-400.dark\\:group-hover\\:text-white { color: #0D1932 !important; }
                      .group:hover.hover\\:border-black { border-color: #0D1932 !important; }
                      .dark .group:hover.dark\\:hover\\:border-white { border-color: #0D1932 !important; }
                    `}</style>
                    <h3 className="text-2xl font-bold mb-2 text-black dark:text-white transition-colors duration-300">
                      {content.githubLabel}
                    </h3>
                    <p className="text-lg opacity-70 text-gray-500 dark:text-gray-400 transition-colors duration-300">
                      @LuN3cy
                    </p>
                 </div>
              </div>
           </div>
        )
      default:
        return (
          <>
            <HeroSection 
              onNavigate={(tab) => startViewTransition(() => setActiveTab(tab))} 
              onCategorySelect={handleHeroNavigation}
              language={language} 
            />
            <PortfolioSection language={language} externalFilter={portfolioCategory} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black overflow-x-hidden transition-colors duration-300">
      
      <MusicPlayer language={language} />
      {/* Dynamic Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => startViewTransition(() => setActiveTab(tab))} 
        language={language}
        toggleLanguage={toggleLanguage}
        theme={theme}
        toggleTheme={toggleTheme}
        onTriggerGravity={triggerGravity}
      />

      {/* Main Content Area */}
      <main className="w-full pt-40 pb-32 vt-page">
         <div key={activeTab} className="animate-fade-in">
           {renderContent()}
         </div>

         {/* Footer */}
         <footer className="w-full max-w-[96vw] mx-auto mt-32 border-t-2 border-black dark:border-white pt-12 flex flex-col md:flex-row justify-between items-center text-sm font-light text-gray-400 dark:text-gray-500 uppercase tracking-wide gap-4 transition-colors duration-300">
            <p>© 2025 LUN3CY FAN</p>
            <p>{content.footerDesign}</p>
         </footer>
      </main>
      
      {/* Floating Reset Button for Gravity - Fixed Centering Wrapper */}
      {gravityActive && (
        <div className="fixed bottom-8 left-0 w-full flex justify-center z-[1001] pointer-events-none">
          <button 
            onClick={resetGravity}
            className="pointer-events-auto bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold text-xl shadow-2xl animate-fade-in hover:scale-110 transition-transform flex items-center gap-3 cursor-pointer"
          >
            <RotateCcw size={24} />
            {language === 'zh' ? '变回去' : 'Go Back'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
