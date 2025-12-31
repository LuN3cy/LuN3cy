import { Language, Category } from '../../types';

export interface HeroItem {
  text: string;
  annotation: string;
  category: Category | null;
}

export interface HomeContent {
  heroItems: HeroItem[];
  intro: string;
  selectedWorks: string;
  years: string;
}

export const HOME_DATA: Record<Language, HomeContent> = {
  zh: {
    heroItems: [
      { text: "摄影摄像", annotation: "（作品积累较多）", category: Category.VIDEO },
      { text: "平面交互", annotation: "（当前主攻，兴趣所在）", category: Category.DESIGN },
      { text: "应用开发", annotation: "（vibe builder）", category: Category.DEV },
      { text: "炒粉炒饭", annotation: "（还在学）", category: null }
    ],
    intro: "不懂设计的摄影师不是一个好的产品经理。|边学边做，MVP生活，迈向全栈，但更看重实际价值。",
    selectedWorks: "精选作品",
    years: "[ 2021 — 2026 ]"
  },
  en: {
    heroItems: [
      { text: "Videography", annotation: "(Extensive Portfolio)", category: Category.VIDEO },
      { text: "Graphic & UI", annotation: "(Main Focus & Passion)", category: Category.DESIGN },
      { text: "Development", annotation: "(Vibe Coder)", category: Category.DEV },
      { text: "Cooking", annotation: "(Still Learning)", category: null }
    ],
    intro: "A photographer who doesn't understand design is not a good product manager. | Learning by doing, living the MVP life, aiming for full-stack, but valuing actual impact above all.",
    selectedWorks: "Selected Works",
    years: "[ 2021 — 2026 ]"
  }
};
