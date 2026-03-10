import { ArticleCategory, Language } from '../../types';

export interface ArticlesPageContent {
  title: string;
  description: string;
}

export const ARTICLES_PAGE_DATA: Record<Language, ArticlesPageContent> = {
  zh: {
    title: '文章',
    description: '个人思考、学习分享与生活记录。'
  },
  en: {
    title: 'Articles',
    description: 'Thoughts, learning journey, and life records.'
  }
};

export const ARTICLE_DATA = [
  {
    id: 't1',
    common: {
      category: ArticleCategory.TALK,
      link: 'https://github.com/yourname',
      coverImage: 'https://via.placeholder.com/800x450?text=Article+Cover',
      date: '2024-01-01'
    },
    zh: {
      title: '示例文章标题',
    },
    en: {
      title: 'Example Article Title',
    }
  }
];
