import { Language, Experience, HonorsData } from '../../types';

export interface EducationPageContent {
  title: string;
  about: string;
  openToWork: string;
  viewHonorsLabel: string;
  honorsTitle: string;
  competitionsTitle: string;
  scholarshipsLabel: string;
  titlesLabel: string;
  experiences: Experience[];
  honors: HonorsData;
}

export const EDUCATION_DATA: Record<Language, EducationPageContent> = {
  zh: {
    title: "教育经历",
    about: "理科生受家庭影响考入新闻学院，后面出于从小对技术实操的偏好转战的数媒技，由于推免时仅影视作品积累较多所以进入广电系，但本人还是喜欢做点设计和开发实战。",
    openToWork: "边学边做+等待实习",
    viewHonorsLabel: "查看在校荣誉",
    honorsTitle: "在校荣誉",
    competitionsTitle: "竞赛奖项",
    scholarshipsLabel: "奖学金",
    titlesLabel: "荣誉称号",
    experiences: [
      {
        id: '1',
        year: '2025 - 至今',
        title: '艺术与传媒学院 戏剧与影视 专业硕士',
        institution: '北京师范大学',
        description: '观望...',
        type: 'education'
      },
      {
        id: '2',
        year: '2022 - 2025',
        title: '人工智能教育学部 数字媒体技术',
        institution: '华中师范大学',
        description: '计算机技术+艺术结合的专业，各种类型的课都接触过。',
        type: 'education'
      },
      {
        id: '3',
        year: '2021 - 2022',
        title: '新闻传播学院  新闻传播学类',
        institution: '华中师范大学',
        description: '受家里的影响坚定选择，但专业教育与想象有些出入。',
        type: 'education'
      }
    ],
    honors: {
      scholarships: [
        "本专科生国家奖学金",
        "周洪宇华大卓越人才奖（本科仅一位）",
        "校级二等奖学金（博雅银桂）",
        "校级三等奖学金（博雅丹桂）"
      ],
      titles: [
        "华中师范大学优秀本科毕业生",
        "华中师范大学校三好学生",
        "华中师范大学科创活动积极分子",
        "华中师范大学暑期社会实践活动优秀学生"
      ],
      competitions: [
        {
          level: "国家级",
          awards: [
            "全国一等奖 | 计算机设计大赛",
            "全国三等奖 | 计算机设计大赛",
            "全国二等奖 | 大学生英语竞赛",
            "全国三等奖 | 新媒体课程创新大赛",
            "企业特别奖 | 大学生广告艺术大赛",
            "全国优秀奖 | 大学生广告艺术大赛",
            "最佳作品 | 马栏山青年视频文创节微电影单元",
            "全国优胜奖 | 教育部教师风采短视频征集活动"
          ]
        },
        {
          level: "省级",
          awards: [
            "中南赛区一、二、三等奖 | 计算机设计大赛",
            "湖北赛区一等奖 | 大学生广告艺术大赛",
            "湖北赛区二、三等奖 | 高校数字艺术设计大赛"
          ]
        },
        {
          level: "其他",
          awards: [
            "市级优秀奖 | 武汉市融媒体大赛",
            "校级一等奖 | 华中师范大学科普短视频大赛",
            "校级一等奖 | 华中师范大学“一幕光影”大赛"
          ]
        }
      ]
    }
  },
  en: {
    title: "Education",
    about: "Started in Science, pivoted to Journalism, graduated in Digital Media Technology (Engineering), and now pursuing a Master's in Broadcasting & New Media (Art). I combine technical logic with aesthetic sensibility to build meaningful digital products.",
    openToWork: "Learning by Doing + Seeking Internship",
    viewHonorsLabel: "View Honors & Awards",
    honorsTitle: "Honors & Awards",
    competitionsTitle: "Competition Awards",
    scholarshipsLabel: "Scholarships",
    titlesLabel: "Honorary Titles",
    experiences: [
      {
        id: '1',
        year: '2025 - Present',
        title: 'M.A. Broadcasting & New Media',
        institution: 'Beijing Normal University',
        description: 'Focusing on the intersection of media arts and future technology. Exploring AI applications in media production.',
        type: 'education'
      },
      {
        id: '2',
        year: '2022 - 2025',
        title: 'B.E. Digital Media Technology',
        institution: 'Central China Normal University',
        description: 'Switched from Journalism. Learned C++, Machine Learning, Game Dev, while honing skills in Videography and Design.',
        type: 'education'
      },
      {
        id: '3',
        year: '2021 - 2022',
        title: 'Journalism & Communication',
        institution: 'Central China Normal University',
        description: 'Foundation in storytelling and media theory before transitioning to the technical track.',
        type: 'education'
      }
    ],
    honors: {
      scholarships: [
        "National Scholarship",
        "Zhou Hongyu Huada Excellence Award (Only one in undergrad)",
        "University Second Class Scholarship",
        "University Third Class Scholarship"
      ],
      titles: [
        "Outstanding Graduate of CCNU",
        "Merit Student of CCNU",
        "Active Individual in Sci-Tech Innovation",
        "Outstanding Student in Summer Social Practice"
      ],
      competitions: [
        {
          level: "National Level",
          awards: [
            "1st Prize | Chinese Collegiate Computing Competition",
            "3rd Prize | Chinese Collegiate Computing Competition",
            "2nd Prize | National English Competition for College Students",
            "3rd Prize | New Media Course Innovation Competition",
            "Corporate Special Award | National Advertising Art Design Competition",
            "Excellence Award | National Advertising Art Design Competition",
            "Best Work | Malanshan Youth Video Creative Festival",
            "Winning Award | MOE Teacher Style Short Video Collection"
          ]
        },
        {
          level: "Provincial Level",
          awards: [
            "1st/2nd/3rd Prizes (Central South Region) | Computing Competition",
            "1st Prize (Hubei) | Advertising Art Design Competition",
            "2nd/3rd Prizes (Hubei) | Digital Art Design Competition"
          ]
        },
        {
          level: "Others",
          awards: [
            "City Excellence Award | Wuhan Convergence Media Competition",
            "1st Prize | CCNU Popular Science Short Video Competition",
            "1st Prize | CCNU 'One Scene Light & Shadow' Competition"
          ]
        }
      ]
    }
  }
};
