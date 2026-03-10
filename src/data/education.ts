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
    about: "A brief introduction about your educational background and passions.",
    openToWork: "边学边做+等待实习",
    viewHonorsLabel: "查看在校荣誉",
    honorsTitle: "在校荣誉",
    competitionsTitle: "竞赛奖项",
    scholarshipsLabel: "奖学金",
    titlesLabel: "荣誉称号",
    experiences: [
      {
        id: '1',
        year: '20XX - Present',
        title: 'Degree / Major',
        institution: 'Your University',
        description: 'Brief description of your studies.',
        type: 'education'
      }
    ],
    honors: {
      scholarships: ["Example Scholarship"],
      titles: ["Example Title"],
      competitions: [
        {
          level: "National",
          awards: ["1st Prize | Example Competition"]
        }
      ]
    }
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
    about: "A brief introduction about your educational background and passions.",
    openToWork: "Learning by Doing + Seeking Internship",
    viewHonorsLabel: "View Honors & Awards",
    honorsTitle: "Honors & Awards",
    competitionsTitle: "Competition Awards",
    scholarshipsLabel: "Scholarships",
    titlesLabel: "Honorary Titles",
    experiences: [
      {
        id: '1',
        year: '20XX - Present',
        title: 'Degree / Major',
        institution: 'Your University',
        description: 'Brief description of your studies.',
        type: 'education'
      }
    ],
    honors: {
      scholarships: ["Example Scholarship"],
      titles: ["Example Title"],
      competitions: [
        {
          level: "National",
          awards: ["1st Prize | Example Competition"]
        }
      ]
    }
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
