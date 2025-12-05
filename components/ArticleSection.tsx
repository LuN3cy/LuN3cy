
import React, { useState, useEffect } from 'react';
import { ARTICLES, ARTICLE_LABELS } from '../constants';
import { ArticleCategory, Language, Article } from '../types';
import { ArrowUpRight, ArrowDown, ArrowUp, BookOpen, Calendar, Filter } from 'lucide-react';

interface ArticleSectionProps {
  language: Language;
}

export const ArticleSection: React.FC<ArticleSectionProps> = ({ language }) => {
  const [filter, setFilter] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const categories = ['All', ...Object.values(ArticleCategory)];
  const currentArticles = ARTICLES[language];

  const filteredAndSortedArticles = currentArticles
    .filter(a => filter === 'All' || a.category === filter)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="w-full max-w-[96vw] mx-auto pb-20">
      
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-center">
        
        {/* Left Sidebar - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-32">
            <h3 className="text-xl font-black mb-8 px-4 flex items-center gap-2">
              <Filter size={20} />
              {language === 'zh' ? '分类' : 'Categories'}
            </h3>
            <div className="flex flex-col space-y-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`
                    text-left px-4 py-3 rounded-xl transition-all duration-300 text-lg font-bold
                    ${filter === cat 
                      ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg transform scale-105' 
                      : 'text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'}
                  `}
                >
                  {ARTICLE_LABELS[language][cat] || cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Filter Bar (Horizontal) */}
        <div className="lg:hidden flex overflow-x-auto pb-4 gap-4 no-scrollbar mb-8 sticky top-20 bg-white/95 dark:bg-black/95 backdrop-blur-sm z-30 pt-4">
           {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`
                whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold border-2 transition-all duration-300
                ${filter === cat 
                  ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black' 
                  : 'border-gray-200 text-gray-400 dark:border-gray-800 dark:text-gray-500'}
              `}
            >
              {ARTICLE_LABELS[language][cat] || cat}
            </button>
          ))}
        </div>

        {/* Right Content Area */}
        <div className="flex-grow max-w-4xl">
          
          {/* Sort Controls Panel */}
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
             <div className="text-sm font-mono text-gray-400">
                {filteredAndSortedArticles.length} {language === 'zh' ? '篇文章' : 'Articles'}
             </div>
             
             <button 
               onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
               className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-bold text-gray-600 dark:text-gray-300"
             >
                <Calendar size={16} />
                <span>{language === 'zh' ? '时间排序' : 'Date'}</span>
                {sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
             </button>
          </div>

          {/* Article List - One per line */}
          <div className="flex flex-col gap-6">
            {filteredAndSortedArticles.map((article) => (
              <div 
                key={article.id} 
                className="group cursor-pointer"
                onClick={() => window.open(article.link, '_blank')}
              >
                <div className="flex flex-col md:flex-row bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden p-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 items-stretch h-auto">
                    
                    {/* Cover Image Container - Responsive aspect ratio 900:383 */}
                    <div className="w-full md:w-[45%] aspect-[900/383] shrink-0 rounded-xl overflow-hidden relative bg-gray-100 dark:bg-gray-900 transform-gpu">
                        {article.coverImage ? (
                             <img 
                             src={article.coverImage} 
                             alt={article.title} 
                             loading="lazy"
                             decoding="async"
                             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                             referrerPolicy="no-referrer"
                           />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800/50">
                                 <BookOpen size={32} className="text-gray-300 dark:text-gray-600" />
                            </div>
                        )}
                       
                        <div className="absolute top-2 left-2 bg-white/90 dark:bg-black/90 text-black dark:text-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm">
                          {ARTICLE_LABELS[language][article.category].split('|')[0].trim()}
                        </div>
                    </div>

                    {/* Content - Right Side */}
                    <div className="flex-grow flex flex-col p-4 md:p-6 justify-between min-w-0">
                        <div>
                            <div className="flex justify-between items-start gap-3 mb-2">
                                <h3 className="text-lg md:text-2xl font-black text-black dark:text-white leading-snug group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300 line-clamp-3">
                                    {article.title}
                                </h3>
                                <div className="bg-black dark:bg-white text-white dark:text-black p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0">
                                    <ArrowUpRight size={16} />
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3 text-xs md:text-sm font-mono text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-800 pt-3 mt-2">
                             <span>{article.date || 'No Date'}</span>
                             <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                             <span className="truncate hidden md:inline">Read on WeChat</span>
                        </div>
                    </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredAndSortedArticles.length === 0 && (
             <div className="w-full h-64 flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl mt-8">
                <p className="text-xl font-medium">{language === 'zh' ? '暂无文章' : 'No articles found'}</p>
             </div>
          )}
        </div>

      </div>
    </div>
  );
};
