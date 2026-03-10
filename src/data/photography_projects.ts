import { Project } from '../../types';

export const PHOTOGRAPHY_PROJECTS: Project[] = [
  {
    id: 'sample-1',
    common: {
      category: 'Category Name',
      image: 'https://via.placeholder.com/1920x1080?text=Project+Cover',
      // bilibiliId: 'BVxxxxxxx' // For video
    },
    zh: {
      title: '示例项目标题',
      subtitle: '示例副标题',
      description: '项目描述占位符。',
      role: '角色',
      tags: ['标签1', '标签2'],
      awards: [],
      concept: "",
      roleDetail: ""
    },
    en: {
      title: 'Example Project Title',
      subtitle: 'Example Subtitle',
      description: 'Project description placeholder.',
      role: 'Role',
      tags: ['Tag 1', 'Tag 2'],
      awards: [],
      concept: "",
      roleDetail: ""
    }
  }
];
