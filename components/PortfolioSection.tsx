
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PROJECTS, CATEGORY_LABELS } from '../constants';
import { Category, Language, Project } from '../types';
import { PHOTOGRAPHY_GALLERY } from '../src/data/photography';
import { ArrowUpRight, X, Terminal, MessageCircle, IdCard, Github, ExternalLink } from 'lucide-react';

interface PortfolioSectionProps {
  language: Language;
  externalFilter?: string; // Controlled by parent if needed
}


export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ language, externalFilter }) => {
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalRendered, setIsModalRendered] = useState(false);
  
  // Sync with external filter if provided
  useEffect(() => {
    if (externalFilter) {
      setFilter(externalFilter);
    }
  }, [externalFilter]);

  // Get Categories from current language projects
  const currentProjects = PROJECTS[language];
  // Extract unique categories and add Development manually if not present (since it has no projects yet)
  const availableCategories = Array.from(new Set(currentProjects.map(p => p.category)));
  if (!availableCategories.includes(Category.DEV)) availableCategories.push(Category.DEV);
  
  const categories = ['All', ...availableCategories];

  const filteredProjects = filter === 'All' 
    ? currentProjects 
    : currentProjects.filter(p => p.category === filter);

  // Handle Modal Render State for Animation
  useEffect(() => {
    if (selectedProject) {
      setIsModalRendered(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      const timer = setTimeout(() => setIsModalRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [selectedProject]);

  return (
    <div className="w-full max-w-[96vw] mx-auto pb-20">
      
      {/* Brutalist Filter Bar - Sticky */}
      <div className="flex flex-wrap gap-4 md:gap-8 mb-12 md:mb-16 border-b-2 border-black dark:border-white pb-4 md:pb-8 sticky top-20 md:top-24 bg-white/95 dark:bg-black/95 backdrop-blur-sm z-30 pt-4 transition-colors duration-300 overflow-x-auto no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`
              text-lg md:text-2xl font-bold transition-colors duration-200 whitespace-nowrap
              ${filter === cat 
                ? 'text-black dark:text-white underline decoration-4 underline-offset-8 decoration-black dark:decoration-white' 
                : 'text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white'}
            `}
          >
            {CATEGORY_LABELS[language][cat] || cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className={`grid grid-cols-1 ${
        filter === 'All'
          ? 'md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12'
          : 'md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16'
      }`}>
        {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            className={`group cursor-pointer flex flex-col h-full transform-gpu ${project.category === Category.DEV ? 'bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300' : ''}`}
            onClick={() => setSelectedProject(project)}
          >
            
            {project.category === Category.DEV ? (
               // DEV CARD LAYOUT
               <div className="flex flex-col h-full">
                  <div className="mb-6 w-16 h-16 bg-white dark:bg-black rounded-2xl shadow-sm flex items-center justify-center text-black dark:text-white">
                    {project.icon === 'message-circle' && <MessageCircle size={32} />}
                    {project.icon === 'id-card' && <IdCard size={32} />}
                    {!project.icon && <Terminal size={32} />}
                  </div>
                  <h3 className="text-2xl font-black text-black dark:text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed line-clamp-3 mb-6">
                    {project.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800 w-full flex justify-between items-center">
                     <span className="text-xs font-bold font-mono text-gray-400 uppercase tracking-wider">
                        {project.subtitle}
                     </span>
                     <div className="bg-black dark:bg-white text-white dark:text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <ArrowUpRight size={18} />
                     </div>
                  </div>
               </div>
            ) : (
               // STANDARD CARD LAYOUT
               <>
                  {/* Image container */}
                  <div className="w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800 mb-6 overflow-hidden rounded-[2rem] relative shadow-none border border-transparent transition-all duration-500 group-hover:shadow-2xl dark:group-hover:shadow-none dark:group-hover:border-white/20 transform-gpu">
                    {project.image && !project.image.includes('picsum') ? (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 p-8 text-center">
                            <div>
                                <h4 className={`${filter === 'All' ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'} font-black text-gray-400 dark:text-gray-600 mb-2 leading-tight`}>
                                    {project.title}<br/>
                                    <span className="text-lg md:text-xl font-normal opacity-70">{project.subtitle}</span>
                                </h4>
                                <p className="text-xs font-mono text-gray-400 mt-4 uppercase tracking-widest border border-gray-300 dark:border-gray-700 rounded-full px-3 py-1 inline-block">
                                    {language === 'zh' ? '预览部署中...' : 'Preview Deploying...'}
                                </p>
                            </div>
                        </div>
                    )}
                    
                    <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-white dark:bg-black dark:text-white px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm font-bold uppercase tracking-wider rounded-lg shadow-sm border border-transparent dark:border-white/10">
                      {CATEGORY_LABELS[language][project.category] || project.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex justify-between items-start border-b-2 border-gray-100 dark:border-gray-800 pb-6 group-hover:border-black dark:group-hover:border-white transition-colors duration-300 mt-auto">
                    <div className="pr-4 md:pr-8">
                        <h3 className={`${filter === 'All' ? 'text-xl md:text-2xl' : 'text-2xl md:text-4xl'} font-black text-black dark:text-white mb-2 md:mb-3 group-hover:text-gray-800 dark:group-hover:text-gray-200 leading-tight transition-colors`}>
                          {project.title}
                        </h3>
                      <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed font-medium transition-colors">
                        {project.description}
                      </p>
                    </div>
                    <div className="bg-black dark:bg-white text-white dark:text-black p-2 md:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shrink-0">
                       <ArrowUpRight size={24} className="md:w-7 md:h-7" />
                    </div>
                  </div>

                  {/* Tags */}
                  {project.category !== Category.PHOTO && (
                    <div className="mt-4 flex flex-wrap gap-2 md:gap-3">
                       {project.tags.map(tag => (
                         <span key={tag} className="text-[10px] md:text-xs font-bold font-mono text-gray-400 dark:text-gray-500 uppercase tracking-wider border border-gray-200 dark:border-gray-800 px-2 py-1 rounded-md">#{tag}</span>
                       ))}
                    </div>
                  )}
               </>
            )}

          </div>
        ))}
      </div>

      {/* PROJECT DETAIL MODAL */}
      {isModalRendered && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
           {/* Lightbox Overlay (Hidden by default) */}
           <div 
             id="lightbox-overlay"
             className="fixed inset-0 z-[200] bg-black/90 hidden items-center justify-center p-4 cursor-zoom-out"
             onClick={(e) => {
               e.stopPropagation();
               const lightbox = document.getElementById('lightbox-overlay');
               if (lightbox) {
                 lightbox.classList.add('hidden');
                 lightbox.classList.remove('flex');
               }
             }}
           >
              <img id="lightbox-img" src="" alt="Full View" className="max-w-full max-h-full object-contain shadow-2xl" />
              <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
                <X size={32} />
              </button>
           </div>

           {/* Backdrop - Use solid color opacity instead of blur for performance */}
           <div 
             className={`absolute inset-0 bg-black/80 ${selectedProject ? 'backdrop-enter-active' : 'backdrop-exit-active'}`}
             onClick={() => setSelectedProject(null)}
           ></div>

           {/* Modal Content - Removed backdrop-blur-2xl to fix lag */}
           <div className={`
             relative w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar
             bg-white dark:bg-gray-900 
             rounded-[2rem] shadow-2xl border border-white/20 dark:border-white/10
             flex flex-col
             ${selectedProject ? 'modal-enter-active' : 'modal-exit-active'}
           `}>
             
             {selectedProject && (
               <>
                 {/* Close Button */}
                 <button 
                   onClick={() => setSelectedProject(null)}
                   className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-2 rounded-full bg-white/50 dark:bg-black/50 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                 >
                   <X size={24} className="text-black dark:text-white" />
                 </button>

                 {selectedProject.category === Category.PHOTO ? (
                    // SPECIAL PHOTO LAYOUT
                    <div className="p-6 md:p-12 flex flex-col items-center min-h-full">
                        <h2 className="text-3xl md:text-5xl font-black text-black dark:text-white mb-4 text-center">
                            {selectedProject.title}
                        </h2>
                        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl text-center mb-12 font-medium">
                            {selectedProject.description}
                        </p>
                        
                        {(() => {
                            const gallery = selectedProject.gallery || PHOTOGRAPHY_GALLERY[selectedProject.id];
                            return gallery && gallery.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full">
                                    {gallery.map((item, idx) => (
                                        <div 
                                            key={idx} 
                                            className="aspect-square overflow-hidden cursor-zoom-in relative group rounded-lg shadow-sm hover:shadow-md will-change-transform transform-gpu"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const lightbox = document.getElementById('lightbox-overlay');
                                                const lightboxImg = document.getElementById('lightbox-img') as HTMLImageElement;
                                                if (lightbox && lightboxImg) {
                                                    lightboxImg.src = item;
                                                    lightbox.classList.remove('hidden');
                                                    lightbox.classList.add('flex');
                                                }
                                            }}
                                        >
                                            <img 
                                                src={item} 
                                                alt={`${selectedProject.title} ${idx + 1}`} 
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 will-change-transform transform-gpu backface-hidden opacity-0" 
                                                onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-64 w-full border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[2rem]">
                                    <p className="text-gray-400 font-mono">No images found in local folder.</p>
                                </div>
                            );
                        })()}
                    </div>
                 ) : (
                    // DEFAULT LAYOUT FOR OTHER CATEGORIES
                    <>
                     {/* Hero Media (Video, Bilibili, Figma or Image) */}
                     <div className={`
                        w-full bg-gray-200 dark:bg-gray-800 relative group-modal-media shrink-0
                        ${(selectedProject.figmaUrl || selectedProject.websiteUrl) ? 'h-[60vh] md:h-[80vh]' : 
                          (selectedProject.videoUrl || selectedProject.bilibiliId) ? 'aspect-video' : 
                          'h-[30vh] md:h-[50vh]'}
                     `}>
                        {selectedProject.videoUrl ? (
                           <video 
                              src={selectedProject.videoUrl} 
                              controls 
                              className="w-full h-full object-contain bg-black"
                              poster={selectedProject.image}
                           />
                        ) : selectedProject.bilibiliId ? (
                           // Bilibili Player with Click-to-Load Optimization
                           <div className="w-full h-full bg-black relative group">
                                <iframe
                                    src={`//player.bilibili.com/player.html?bvid=${selectedProject.bilibiliId}&page=1&high_quality=1&danmaku=0&autoplay=0`}
                                    className="w-full h-full relative z-10"
                                    scrolling="no"
                                    frameBorder="0"
                                    allowFullScreen
                                    sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts allow-presentation"
                                ></iframe>
                           </div>
                        ) : selectedProject.figmaUrl ? (
                           <iframe
                             src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(selectedProject.figmaUrl)}`}
                             className="w-full h-full border-none"
                             allowFullScreen
                           ></iframe>
                        ) : selectedProject.websiteUrl ? (
                           <iframe
                             src={selectedProject.websiteUrl}
                             className="w-full h-full border-none bg-white"
                             title={selectedProject.title}
                             allowFullScreen
                           ></iframe>
                        ) : (
                           <>
                              {selectedProject.image && !selectedProject.image.includes('picsum') ? (
                                  <img 
                                    src={selectedProject.image} 
                                    alt={selectedProject.title} 
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover" 
                                  />
                              ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-800">
                                      <div className="text-center">
                                          <h2 className="text-4xl font-black text-black/20 dark:text-white/20 mb-2">{selectedProject.title}</h2>
                                          <p className="text-xl font-bold text-black/20 dark:text-white/20 uppercase tracking-widest">
                                              {language === 'zh' ? '预览部署中...' : 'Preview Deploying...'}
                                          </p>
                                      </div>
                                  </div>
                              )}
                              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                           </>
                        )}
                     </div>

                     <div className="p-6 md:p-12">
                       {/* Header */}
                       <div className="mb-8 md:mb-12">
                         <div className="flex items-center gap-3 mb-4">
                           <span className="px-4 py-1.5 bg-black dark:bg-white text-white dark:text-black text-sm font-bold uppercase rounded-md">
                             {CATEGORY_LABELS[language][selectedProject.category] || selectedProject.category}
                           </span>
                           <span className="text-gray-500 font-mono text-sm uppercase font-bold tracking-widest">{selectedProject.subtitle}</span>
                         </div>
                         <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white mb-6 leading-tight">
                           {selectedProject.title}
                         </h2>
                         <p className="text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
                           {selectedProject.description}
                         </p>
                       </div>

                       <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-700 mb-8 md:mb-12"></div>

                       {/* Grid Info */}
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
                         
                         {/* Left Col: Concept - Thinner Line */}
                         {selectedProject.concept && (
                             <div className="space-y-8">
                                <h3 className="text-2xl font-black uppercase tracking-wide text-black dark:text-white border-l-4 border-black dark:border-white pl-6">
                                  {language === 'zh' ? '设计意图 / 创意陈述' : 'Concept / Statement'}
                                </h3>
                                <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                                   {selectedProject.concept}
                                </p>
                             </div>
                         )}

                         {/* Right Col: Details */}
                         <div className="space-y-10">
                            {/* Awards - Aligned Star */}
                            {selectedProject.awards && selectedProject.awards.length > 0 && (
                                <div className="space-y-4">
                                  <h4 className="text-base font-bold uppercase text-gray-400 dark:text-gray-500 tracking-wider">
                                    {language === 'zh' ? '获奖情况' : 'Awards & Recognition'}
                                  </h4>
                                  <ul className="space-y-3">
                                        {selectedProject.awards.map((award, i) => {
                                          const isNone = award === "暂无获奖" || award === "无" || award === "None";
                                          return (
                                            <li key={i} className={`flex items-baseline font-bold text-xl ${isNone ? 'text-gray-400 dark:text-gray-500' : 'text-black dark:text-white'}`}>
                                              <span className={`mr-3 text-lg flex-shrink-0 ${isNone ? 'text-gray-300 dark:text-gray-600' : 'text-yellow-500'}`}>★</span> 
                                              <span>{award}</span>
                                            </li>
                                          );
                                        })}
                                  </ul>
                                </div>
                            )}

                            {/* Role, Tags, Links - Flex Row */}
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                {/* Role */}
                                <div className="space-y-4 flex-1 min-w-[200px]">
                                    <h4 className="text-base font-bold uppercase text-gray-400 dark:text-gray-500 tracking-wider">
                                        {language === 'zh' ? '分工与职责' : 'Role & Responsibility'}
                                    </h4>
                                    <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                                        <span className="font-bold text-black dark:text-white block mb-1 text-lg">{selectedProject.role}</span>
                                        {selectedProject.roleDetail}
                                    </p>
                                </div>

                                {/* Tags */}
                                <div className="space-y-4 flex-1 min-w-[200px]">
                                    <h4 className="text-base font-bold uppercase text-gray-400 dark:text-gray-500 tracking-wider">Tags</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.tags.map(tag => (
                                            <span key={tag} className="text-xs font-bold font-mono text-gray-500 border border-gray-300 dark:border-gray-700 px-3 py-1.5 rounded-lg">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Links */}
                                {(selectedProject.githubUrl || selectedProject.websiteUrl) && (
                                    <div className="space-y-4 flex-1 min-w-[200px]">
                                        <h4 className="text-base font-bold uppercase text-gray-400 dark:text-gray-500 tracking-wider">
                                            {language === 'zh' ? '相关链接' : 'Links'}
                                        </h4>
                                        <div className="flex flex-wrap gap-4">
                                            {selectedProject.githubUrl && (
                                                <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                                    <Github size={18} />
                                                    <span className="font-bold underline decoration-2 underline-offset-4 text-sm">GitHub</span>
                                                </a>
                                            )}
                                            {selectedProject.websiteUrl && (
                                                <a href={selectedProject.websiteUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                                    <ExternalLink size={18} />
                                                    <span className="font-bold underline decoration-2 underline-offset-4 text-sm">Demo</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                         </div>

                       </div>

                       {/* Gallery */}
                       {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                          <div className="mt-16 md:mt-24 border-t border-gray-200 dark:border-gray-800 pt-16">
                             <h3 className="text-2xl font-black uppercase tracking-widest text-black dark:text-white mb-8">
                               {language === 'zh' ? '项目展示' : 'Project Gallery'}
                             </h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               {selectedProject.gallery.map((img, idx) => (
                                 <div key={idx} className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                                    <img src={img} alt={`${selectedProject.title} gallery ${idx + 1}`} className="w-full h-auto object-cover" />
                                 </div>
                               ))}
                             </div>
                          </div>
                       )}

                     </div>
                   </>
                 )}
               </>
             )}
           </div>
        </div>,
        document.body
      )}

    </div>
  );
};
