
import React, { useState } from 'react';
import { HOME_DATA } from '../src/data/home';
import { CONTACT_DATA } from '../src/data/contact';
import { Language, Category } from '../types';
import { createPortal } from 'react-dom';
import { MapPin } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
  onCategorySelect: (category: Category) => void;
  language: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onCategorySelect, language }) => {
  const content = HOME_DATA[language];
  const contactContent = CONTACT_DATA[language];
  const tooltipText = contactContent.tooltip || (language === 'zh' 
    ? '还是想念武汉，但感觉之后可能也留在广深' 
    : 'Still miss Wuhan, but likely to stay in Guangzhou-Shenzhen later.');
  const heroItems = content.heroItems || [];
  const [showToast, setShowToast] = useState(false);
  const [showLocationTooltip, setShowLocationTooltip] = useState(false);

  const handleHeadlineClick = (category: Category | null) => {
    if (category) {
      onCategorySelect(category);
    } else {
      // Show "Still Learning" Toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const renderHeadlineText = (item: any, index: number) => {
    const isPhotographyVideography = 
      item.text.includes('摄影摄像') || 
      item.text.includes('Photography & Videography');

    if (isPhotographyVideography) {
      const parts = language === 'zh' 
        ? [
            { text: '摄影', category: Category.PHOTO },
            { text: '摄像', category: Category.VIDEO }
          ]
        : [
            { text: 'Photography', category: Category.PHOTO },
            { text: '&', category: null },
            { text: 'Videography', category: Category.VIDEO }
          ];

      return (
        <h1 className={`
          ${language === 'en' ? 'text-[8vw] lg:text-[6vw]' : 'text-[14vw] lg:text-[8vw]'} 
          font-black tracking-tighter leading-tight text-black dark:text-white transition-all duration-300 whitespace-nowrap overflow-visible
        `}>
          {parts.map((part, pIndex) => (
            <span 
              key={pIndex}
              className={`${part.category ? 'hover:opacity-70 cursor-pointer transition-opacity' : 'cursor-default'}`}
              onClick={(e) => {
                if (part.category) {
                  e.stopPropagation();
                  handleHeadlineClick(part.category);
                }
              }}
            >
              {part.text}
            </span>
          ))}
          {/* Annotation */}
          <span className="text-[0.3em] align-middle ml-2 lg:ml-4 text-gray-400 font-bold tracking-normal inline-block transform translate-y-[-0.1em]">
            {item.annotation}
          </span>
        </h1>
      );
    }

    return (
      <h1 className={`
        ${language === 'en' ? 'text-[8vw] lg:text-[6vw]' : 'text-[14vw] lg:text-[8vw]'} 
        font-black tracking-tighter leading-tight text-black dark:text-white transition-all duration-300 whitespace-nowrap overflow-visible group-hover:opacity-70
      `}>
        {item.text}
        {/* Annotation */}
        <span className="text-[0.3em] align-middle ml-2 lg:ml-4 text-gray-400 font-bold tracking-normal inline-block transform translate-y-[-0.1em]">
          {item.annotation}
        </span>
      </h1>
    );
  };

  return (
    <div className="w-full max-w-[96vw] mx-auto animate-fade-in relative">
      
      {/* Intro Block - Mobile Stacked, Desktop Split */}
      <section className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16 mb-12 lg:mb-20 items-start">
        
        {/* LEFT: Massive Interactive Title */}
        <div className="lg:col-span-7 w-full">
            <div className="flex flex-col w-full mb-6 lg:mb-8">
              {heroItems.map((item, index) => (
                <div key={index} className="group cursor-pointer" onClick={() => !item.text.includes('摄影') && !item.text.includes('Photography') && handleHeadlineClick(item.category || null)}>
                  {renderHeadlineText(item, index)}
                  {index < heroItems.length - 1 && (
                    <div className="w-full h-[1px] bg-black/10 dark:bg-white/10 my-2 md:my-4 transition-colors duration-300"></div>
                  )}
                </div>
              ))}
            </div>
          
          {/* Increased max-width to 4xl to prevent unwanted wrapping */}
          <div className="text-xl md:text-3xl text-gray-600 dark:text-gray-300 font-medium leading-relaxed max-w-4xl transition-colors duration-300">
             {content.intro.split('|').map((line, i) => (
               <React.Fragment key={i}>
                 {line}
                 <br className="hidden md:block" />
                 {/* Mobile simple space */}
                 <span className="md:hidden"> </span> 
               </React.Fragment>
             ))}
          </div>
        </div>

        {/* RIGHT: Structured List (Cleaned Up) */}
        <div className="lg:col-span-5 pt-0 lg:pt-4 w-full flex flex-col justify-between h-full">
          <div>
            <div className="w-full h-[2px] bg-black dark:bg-white mb-6 lg:mb-8 transition-colors duration-300"></div>
            
            {/* Just Location and Contact now */}
            <div className="space-y-4 lg:space-y-6">
               {/* Base Location */}
               <div 
                  className="relative group cursor-pointer"
               >
                  <h3 className="text-2xl lg:text-3xl font-bold mb-2 text-black dark:text-white transition-colors duration-300">
                    {contactContent.baseLabel}
                  </h3>
                  <div className="text-xl lg:text-2xl font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
                      <MapPin size={24} className="inline-block" />
                      {contactContent.locationValue}
                  </div>

                  {/* Floating Tooltip - Fixed position above Location with fallback text */}
                  <div 
                      className="absolute -top-10 left-0 z-50 px-4 py-2 bg-cyan-500/80 backdrop-blur-md text-white text-sm font-bold rounded-xl shadow-lg pointer-events-none transition-all duration-300 opacity-0 transform scale-95 translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 whitespace-nowrap border border-white/20"
                   >
                      {tooltipText}
                   </div>
               </div>

               {/* Contact - Green Text */}
               <div onClick={() => onNavigate('contact')} className="cursor-pointer group flex items-center gap-3">
                 <span className="text-2xl lg:text-3xl text-[#00D26A] transition-transform duration-300 group-hover:translate-x-1">→</span>
                 <h3 className="text-2xl lg:text-3xl font-bold mb-0 text-[#00D26A] transition-colors duration-300 group-hover:opacity-80">
                    {contactContent.contactLabel}
                 </h3>
               </div>
            </div>
          </div>

        </div>
      </section>


      {/* Selected Works Preview */}
      <div className="w-full h-[2px] bg-gray-100 dark:bg-gray-800 mb-6 lg:mb-8 transition-colors duration-300"></div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 lg:mb-10 gap-4">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black dark:text-white transition-colors duration-300">{content.selectedWorks}</h2>
        <span className="text-base lg:text-lg font-mono text-gray-500 dark:text-gray-400 font-bold tracking-widest transition-colors duration-300">{content.years}</span>
      </div>

      {/* Floating Toast for Cooking */}
      {showToast && createPortal(
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full shadow-2xl z-[100] animate-fade-in font-bold text-xl">
           {language === 'zh' ? '还在学... 🍳' : 'Still Learning... 🍳'}
        </div>,
        document.body
      )}

    </div>
  );
};
