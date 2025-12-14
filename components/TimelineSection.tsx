
import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { EDUCATION_DATA } from '../src/data/education';
import { Language } from '../types';
import { ArrowUpRight, X, Hourglass } from 'lucide-react';

interface TimelineSectionProps {
  language: Language;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ language }) => {
  const content = EDUCATION_DATA[language];
  const experiences = content.experiences;
  const honors = content.honors;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  
  // Lock State
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inputAnswer, setInputAnswer] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [explosionTrigger, setExplosionTrigger] = useState(false);

  // Particles Data
  const particles = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 200 + Math.random() * 300; // Spread distance
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      const size = 8 + Math.random() * 12;
      // Randomize particle types: 0=Green, 1=Contrast (Black/White), 2=Gray
      const type = Math.random() > 0.6 ? 0 : (Math.random() > 0.3 ? 1 : 2);
      return { id: i, tx, ty, size, type };
    });
  }, []);

  // Handle modal animation mounting/unmounting
  useEffect(() => {
    if (isModalOpen) {
      setIsRendered(true);
      document.body.style.overflow = 'hidden'; // Lock scroll
    } else {
      document.body.style.overflow = '';
      const timer = setTimeout(() => setIsRendered(false), 300); // Wait for exit animation
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  const decryptPayload = () => {};

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputAnswer.trim() === '康') {
      setIsSuccess(true);
      decryptPayload(inputAnswer.trim());
      // 1. Show Green Success State
      setTimeout(() => {
        setIsExploding(true);
        // 2. Trigger Explosion Animation (Next Frame)
        requestAnimationFrame(() => {
          setExplosionTrigger(true);
        });
      }, 600);
      
      // 3. Unlock after explosion finishes (overlap last 0.3s)
      setTimeout(() => {
        setIsUnlocked(true);
      }, 600 + 700);
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 800);
    }
  };

  if (!isUnlocked) {
    if (isExploding) {
       return (
         <div className="w-full min-h-[60vh] flex items-center justify-center px-4 relative overflow-hidden">
            {particles.map(p => (
               <div 
                  key={p.id}
                  className={`absolute rounded-full ${
                    p.type === 0 ? 'bg-green-500' : 
                    p.type === 1 ? 'bg-black dark:bg-white' : 
                    'bg-gray-300 dark:bg-gray-600'
                  }`}
                  style={{
                     width: p.size,
                     height: p.size,
                     transform: explosionTrigger 
                        ? `translate(${p.tx}px, ${p.ty}px) scale(0)` 
                        : 'translate(0, 0) scale(1)',
                     opacity: explosionTrigger ? 0 : 1,
                     transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease-out'
                  }}
               />
            ))}
         </div>
       );
    }

    return (
      <div className={`w-full min-h-[60vh] flex items-center justify-center px-4 animate-fade-in transition-all duration-300 ${isSuccess ? 'scale-105' : 'scale-100'}`}>
        <div className={`
           w-full max-w-md bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl p-10 md:p-14 text-center border border-gray-100 dark:border-gray-800 relative overflow-hidden group transition-all duration-500
           ${isSuccess ? 'shadow-green-500/20 border-green-500/50' : 'animate-message-pop'}
        `}>
           
           {/* Background Decor */}
           <div className={`absolute top-0 left-0 w-full h-2 transition-colors duration-500 ${isSuccess ? 'bg-green-500' : 'bg-black dark:bg-white'}`}></div>
           
           <div className="mb-10">
             <div className={`
                w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center transition-all duration-500
                ${isSuccess ? 'bg-green-500 rotate-180 scale-110' : 'bg-black dark:bg-white'}
             `}>
                <span className="text-3xl text-white dark:text-black font-bold">
                  {isSuccess ? '!' : '?'}
                </span>
             </div>
             <h2 className="text-2xl md:text-3xl font-black text-black dark:text-white mb-4">
               {language === 'zh' ? '一个小问题' : 'Just a Question'}
             </h2>
             <p className="text-xl font-medium text-gray-500 dark:text-gray-400">
               {isSuccess 
                  ? (language === 'zh' ? '回答正确，欢迎！' : 'Access Granted!') 
                  : (language === 'zh' ? '名字最后一个字是？' : 'Last character of name?')
               }
             </p>
           </div>

           <form onSubmit={handleUnlockSubmit} className="relative w-full">
             <input 
               type="text" 
               value={inputAnswer}
               onChange={(e) => {
                 setInputAnswer(e.target.value);
                 setIsError(false);
               }}
               disabled={isSuccess}
               className={`
                 w-full bg-gray-50 dark:bg-black/50 border-2 
                 ${isError ? 'border-red-500 animate-[pulse_0.5s_ease-in-out]' : ''} 
                 ${isSuccess ? 'border-green-500 text-green-500' : 'border-transparent focus:border-black dark:focus:border-white'}
                 rounded-2xl px-6 py-4 text-center text-2xl font-black outline-none transition-all
                 placeholder-gray-300 dark:placeholder-gray-700
               `}
               placeholder={language === 'zh' ? '请输入答案' : 'Answer...'}
               autoFocus
             />
             <button 
               type="submit"
               disabled={isSuccess}
               className={`
                 mt-6 w-full font-bold py-4 rounded-xl transition-all duration-300
                 ${isSuccess 
                    ? 'bg-green-500 text-white scale-105 cursor-default' 
                    : 'bg-black dark:bg-white text-white dark:text-black hover:scale-[1.02] active:scale-[0.98]'}
               `}
             >
               {isSuccess 
                  ? (language === 'zh' ? '验证通过' : 'SUCCESS') 
                  : (language === 'zh' ? '解锁' : 'UNLOCK')
               }
             </button>
           </form>
           
           {isError && (
             <p className="absolute bottom-4 left-0 w-full text-red-500 text-sm font-bold animate-bounce">
               {language === 'zh' ? '答案错误' : 'Incorrect Answer'}
             </p>
           )}
           <p className="mt-6 text-sm font-bold text-gray-400 animate-pulse">可以在联系页面点击公众号联系我 ;-)</p>
        </div>
      </div>
    );
  }

  // Helper to parse award string "Rank | Contest"
  const parseAward = (awardString: string) => {
    const parts = awardString.split('|');
    if (parts.length > 1) {
      return { rank: parts[0].trim(), contest: parts[1].trim() };
    }
    return { rank: '', contest: awardString };
  };

  return (
    <div className={`w-full max-w-[96vw] mx-auto pb-32 relative ${isUnlocked ? 'animate-[fadeIn_0.6s_ease-out_forwards]' : ''}`}>
      
      {/* Education & Experience Section */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-24 mb-24 lg:mb-32">
        {/* Left Title Area */}
        <div className="lg:col-span-4">
          <div className="static lg:sticky lg:top-40 flex flex-col h-auto justify-start">
            <div>
              <h2 className="text-5xl md:text-6xl lg:text-8xl font-black mb-6 md:mb-8 leading-none text-black dark:text-white transition-colors duration-300">
                {content.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl lg:text-2xl leading-relaxed mb-8 md:mb-12 font-medium transition-colors duration-300 max-w-xl">
                {content.about}
              </p>
              
              {/* STATUS: Hourglass */}
              <div className="flex items-center gap-4 md:gap-6 mt-4 md:mt-8 bg-gray-50 dark:bg-gray-900 lg:bg-transparent lg:dark:bg-transparent p-4 lg:p-0 rounded-2xl lg:rounded-none">
                 <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shrink-0">
                    <Hourglass className="w-6 h-6 md:w-8 md:h-8 text-black dark:text-white animate-[spin_3s_linear_infinite]" />
                 </div>
                 <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white transition-colors leading-tight">
                   {content.openToWork}
                 </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Right List: Experiences */}
        <div className="lg:col-span-8 pt-0 lg:pt-8 flex flex-col w-full">
          <div className="w-full h-[2px] bg-black dark:bg-white mb-8 lg:mb-12 transition-colors duration-300"></div>
          
          <div className="space-y-12 lg:space-y-16">
            {experiences.map((exp) => (
              <div key={exp.id} className="group">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2 md:mb-4">
                   <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black dark:text-white transition-colors">
                     {exp.institution}
                   </h3>
                   <span className="font-mono text-gray-400 dark:text-gray-500 font-bold text-base md:text-lg mt-1 md:mt-0 transition-colors">
                     {exp.year}
                   </span>
                </div>
                
                <div className="text-xl md:text-2xl font-bold text-black dark:text-gray-200 mb-3 md:mb-4 transition-colors">
                  {exp.title}
                </div>
                
                <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl font-medium transition-colors">
                  {exp.description}
                </p>

                <div className="w-full h-[2px] bg-gray-100 dark:bg-gray-800 mt-8 md:mt-12 transition-colors duration-500"></div>
              </div>
            ))}
          </div>

          {/* BUTTON: View Honors & Awards */}
          <div className="flex justify-end mt-8">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group flex items-center gap-2 md:gap-4 text-lg md:text-2xl font-bold text-black dark:text-white hover:opacity-70 transition-opacity border-b-2 border-black dark:border-white pb-1"
            >
              <span>{content.viewHonorsLabel}</span>
              <div className="transform transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2">
                 <ArrowUpRight size={20} className="md:w-7 md:h-7" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* HONORS MODAL */}
      {isRendered && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
           {/* Backdrop */}
           <div 
             className={`absolute inset-0 bg-black/60 dark:bg-black/80 ${isModalOpen ? 'animate-[fadeIn_0.3s_ease-out_forwards]' : 'animate-fade-out'}`}
             onClick={() => setIsModalOpen(false)}
           ></div>

           {/* Modal Content */}
           <div className={`
             relative w-full max-w-6xl max-h-[90vh] overflow-y-auto no-scrollbar
             bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl 
             rounded-[2rem] shadow-2xl border border-white/20 dark:border-white/10
             p-6 md:p-16 flex flex-col
             ${isModalOpen ? 'animate-message-pop' : 'animate-message-pop-out'}
           `}>
             
             {/* Close Button */}
             <button 
               onClick={() => setIsModalOpen(false)}
               className="absolute top-4 right-4 md:top-8 md:right-8 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors z-10"
             >
               <X size={24} className="md:w-8 md:h-8 text-black dark:text-white" />
             </button>

             {/* Modal Header */}
             <h2 className="text-3xl md:text-6xl font-black mb-8 md:mb-12 text-black dark:text-white">
               {content.honorsTitle}
             </h2>

             <div className="overflow-y-auto pr-2 flex-1 no-scrollbar">
               <div className="space-y-12 md:space-y-16">
                 
                 {/* Top Row: Scholarships & Titles */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                   {/* Scholarships */}
                   <div className="space-y-6 md:space-y-8">
                      <h3 className="text-xl md:text-3xl font-bold text-black dark:text-white border-b-2 border-gray-200 dark:border-gray-700 pb-4 inline-block pr-12">
                        {content.scholarshipsLabel}
                      </h3>
                      <ul className="space-y-3 md:space-y-4">
                        {(honors?.scholarships || []).map((item, idx) => (
                          <li key={idx} className="text-base md:text-xl font-medium text-gray-600 dark:text-gray-300 leading-normal">
                            <span className="inline-block w-2 h-2 rounded-full bg-black dark:bg-white mr-3 align-middle"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                   </div>

                   {/* Titles */}
                   <div className="space-y-6 md:space-y-8">
                      <h3 className="text-xl md:text-3xl font-bold text-black dark:text-white border-b-2 border-gray-200 dark:border-gray-700 pb-4 inline-block pr-12">
                        {content.titlesLabel}
                      </h3>
                      <ul className="space-y-3 md:space-y-4">
                        {(honors?.titles || []).map((item, idx) => (
                          <li key={idx} className="text-base md:text-xl font-medium text-gray-600 dark:text-gray-300 leading-normal">
                             <span className="inline-block w-2 h-2 rounded-full bg-black dark:bg-white mr-3 align-middle"></span>
                             {item}
                          </li>
                        ))}
                      </ul>
                   </div>
                 </div>

                 {/* Bottom Section: Competition Awards (Visual Badges) */}
                 <div className="space-y-8">
                    <h3 className="text-2xl md:text-4xl font-black text-black dark:text-white mb-4 md:mb-8">
                      {content.competitionsTitle}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t-2 border-gray-200 dark:border-gray-700 pt-8 md:pt-12">
                      {(honors?.competitions || []).map((group, idx) => (
                        <div key={idx} className="space-y-6">
                           <h4 className="text-lg md:text-2xl font-bold text-black dark:text-white opacity-90 mb-4">
                             {group.level}
                           </h4>
                           <div className="flex flex-col gap-3">
                             {group.awards.map((award, aIdx) => {
                               const { rank, contest } = parseAward(award);
                               return (
                                 <div key={aIdx} className="flex flex-col items-start gap-1 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                    {rank && (
                                      <span className="bg-black dark:bg-white text-white dark:text-black text-xs md:text-sm font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                                        {rank}
                                      </span>
                                    )}
                                    <span className="text-base md:text-lg font-bold text-gray-700 dark:text-gray-200 leading-tight">
                                       {contest}
                                    </span>
                                  </div>
                               );
                             })}
                           </div>
                        </div>
                      ))}
                    </div>
                 </div>
               </div>
             </div>
           </div>
         </div>,
         document.body
       )}

    </div>
  );
};
