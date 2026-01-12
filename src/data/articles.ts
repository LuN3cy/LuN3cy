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
    id: 'a0',
    common: {
      category: ArticleCategory.DIT,
      link: 'https://mp.weixin.qq.com/s/ifDrWOJQ3Pqhf1_siCM9mg',
      coverImage: 'https://lun3cy.notion.site/image/attachment%3A9fbcf761-fe09-4bd6-b0f9-5acd3eb98e1e%3A%E5%B0%81%E9%9D%A2.png?table=block&id=2c1f4f61-90b0-802f-b73f-cce1357afe89&spaceId=bfa23b18-0167-4223-aea0-06f1efb0e882&width=1420&userId=&cache=v2', // No cover provided
      date: '2025-12-03'
    },
    zh: {
      title: '封 面 大 放 送',
    },
    en: {
      title: 'Cover Art Collection',
    }
  },
  {
    id: 'a1',
    common: {
      category: ArticleCategory.DIT,
      link: 'https://mp.weixin.qq.com/s/Xr0iwjJEL8PFTOMaNQrrcw',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSxia9WZLRmXzBEia5gTIGyGFL9PpU1MOwnTLHyHicpQttEOQKRDL4DqMsxMiaiaQbACYjy9nibAQqbnCYuA/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=0',
      date: '2025-12-02'
    },
    zh: {
      title: '个人周报 | 25/11/24~25/11/30',
    },
    en: {
      title: 'Weekly Report | 25/11/24~25/11/30',
    }
  },
  {
    id: 'a2',
    common: {
      category: ArticleCategory.DIT,
      link: 'https://mp.weixin.qq.com/s/HNqw1QRUbKH3JF5pzCJh1w',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSz5xQ3ibMkLvPlgXSVVxFowfMicPUWYcIObNRX6ia9khOFuErb9AqytTDI0rOQvNR2Zw9A6E4jeV46ZQ/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=1',
      date: '2025-11-28'
    },
    zh: {
      title: '探索 | Gemini3制作工牌生成器，前端品味这一块',
    },
    en: {
      title: 'Exploration | Badge Generator by Gemini 3',
    }
  },
  {
    id: 'a3',
    common: {
      category: ArticleCategory.DIT,
      link: 'https://mp.weixin.qq.com/s/qH8625_XRMskKZcZjzIhOw',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSxVKsYmCvve9QX3xH01xCd0595CLR6iaMn9hR4w9XON9DHztW9I2GbMjRvj6WyxzGnCorhLvciaNmXA/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=1',
      date: '2025-11-20'
    },
    zh: {
      title: '创作杂谈 | 冲击一舞（下）：风雨厦门Vlog，微信数据分析',
    },
    en: {
      title: 'Creation Talk | Impact Dance (Part 2): Xiamen Vlog & WeChat Data Analysis',
    }
  },
  {
    id: 'a4',
    common: {
      category: ArticleCategory.DIT,
      link: 'https://mp.weixin.qq.com/s/NnoBfuFx6qtPhpB3tlVQbQ',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_gif/MpZIibj0bjSxL76pgFq88AcIFE4ibaUMQAokeb9Bq5Kl9D2c1NN5rUf9QO4D3xtBpEjrDhibn9QiagC70kwQ58FzHg/640?wx_fmt=gif&from=appmsg',
      date: '2025-10-24'
    },
    zh: {
      title: '1024 for programmer',
    },
    en: {
      title: '1024 for programmer',
    }
  },
  {
    id: 'a5',
    common: {
      category: ArticleCategory.DIT,
      link: 'https://mp.weixin.qq.com/s/reb9nK4GiDr483HMX-N5pA',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSxia9WZLRmXzBEia5gTIGyGFLuIDlR2D3S9Oug9HXibO34Uh8kdkCegjYjiawvFUjBic3lrWvDMiaCj9U8w/640?wx_fmt=png&from=appmsg',
      date: '2025-10-10'
    },
    zh: {
      title: '分享会 | 基于事件相机的计算机视觉技术',
    },
    en: {
      title: 'Sharing | Event-based Computer Vision Technology',
    }
  },
  {
    id: 'a6',
    common: {
      category: ArticleCategory.DIT,
      link: 'https://mp.weixin.qq.com/s/WR3c6hOaD-f2iuf6KTo_XQ',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSxia9WZLRmXzBEia5gTIGyGFLvXZsGpXncGxuThYaL8EejvLsw2mF6kXdMjD7IlZnSEibzHibAq2DwGicw/640?wx_fmt=png&from=appmsg',
      date: '2025-10-09'
    },
    zh: {
      title: '课程分享 | 人机交互技术基础（大作业）',
    },
    en: {
      title: 'Course Sharing | Human-Computer Interaction Basics (Final Project)',
    }
  },
  {
    id: 'a7',
    common: {
      category: ArticleCategory.DIT,
      link: 'https://mp.weixin.qq.com/s/LsVn2PKv2Vzbbrp7A0fjOQ',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSzvLXPX03euo8DhGSictsug6LYMicGLIAtdcFdL7denHprOM72CicU9HRqwz6ELNQh8QiaxMR42omxZ6A/640?wx_fmt=png&from=appmsg',
      date: '2025-09-27'
    },
    zh: {
      title: '课程分享 | 2023瑶里实践报告',
    },
    en: {
      title: 'Course Sharing | 2023 Yaoli Practice Report',
    }
  },
  {
    id: 'a8',
    common: {
      category: ArticleCategory.DIT,
      link: 'https://mp.weixin.qq.com/s/xMFigrej5xRRQNo_wQZhiQ',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSx6hUCGhS5WH8mOepETuSc0RyKxZ9CPPfSyE6w4eo15Bp75hHE9d0lQTGolzoNXEWnGF78WYoYkEw/640?wx_fmt=png&from=appmsg',
      date: '2025-08-06'
    },
    zh: {
      title: '这是课吗 | 数媒竞赛工作坊2025（四）',
    },
    en: {
      title: 'Is this a course? | Digital Media Competition Workshop 2025 (Part 4)',
    }
  },
  {
    id: 'a9',
    common: {
      category: ArticleCategory.DIT,
      link: 'https://mp.weixin.qq.com/s/dk3GjYxGcbQC2oCnOqkd6w',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSxia9WZLRmXzBEia5gTIGyGFLL4blOZ1Ffia0l7IpDica05PpQkR6WMPiciaYkMURR9nlu4wVjibxHIuaZVA/640?wx_fmt=png&from=appmsg',
      date: '2025-08-06'
    },
    zh: {
      title: '这是课吗 | 数媒竞赛工作坊2025（二）',
    },
    en: {
      title: 'Is this a course? | Digital Media Competition Workshop 2025 (Part 2)',
    }
  },
  {
    id: 'a10',
    common: {
      category: ArticleCategory.DIT,
      link: 'https://mp.weixin.qq.com/s/0R4HV0ZTObw43d7Yrc8e4Q',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSxia9WZLRmXzBEia5gTIGyGFL5M09KLJmdpjVD3bYrmlJOfmLQr4TnZWfNibvgNJaXdTAHpicGvV4ibwUA/640?wx_fmt=png&from=appmsg',
      date: '2025-08-05'
    },
    zh: {
      title: '这是课吗 | 数媒竞赛工作坊2025（一）',
    },
    en: {
      title: 'Is this a course? | Digital Media Competition Workshop 2025 (Part 1)',
    }
  },
  {
    id: 'a11',
    common: {
      category: ArticleCategory.DIT,
      link: 'https://mp.weixin.qq.com/s/Lw398A_ydfWRP-usPFo91A',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSxia9WZLRmXzBEia5gTIGyGFLiaaic9AF2mF8OY0EqkncQ1SdmPXibCACspNN0okgr2DicW8RLYibj38RBxA/640?wx_fmt=png&from=appmsg',
      date: '2024-11-11'
    },
    zh: {
      title: '分享会 | 本科竞赛基础经验谈(下)',
    },
    en: {
      title: 'Sharing | Undergraduate Competition Basics (Part 2)',
    }
  },
  {
    id: 'a12',
    common: {
      category: ArticleCategory.DIT,
      link: 'https://mp.weixin.qq.com/s/5jyEsE_za55JfOg-M6-y1A',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSyRAg2JOoGEZ01eDXnnfOPUHN417hXiaRW1Coe2haP8mNANp5hGic0TC80XRxojJqBlyxUV93HcKG3A/640?wx_fmt=png&from=appmsg',
      date: '2024-11-10'
    },
    zh: {
      title: '分享会 | 本科竞赛基础经验谈(上)',
    },
    en: {
      title: 'Sharing | Undergraduate Competition Basics (Part 1)',
    }
  },
  {
    id: 'a13',
    common: {
      category: ArticleCategory.DIT,
      link: 'https://mp.weixin.qq.com/s/RvHcvaiG9SsdrRnlczhaYw',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSxia9WZLRmXzBEia5gTIGyGFLNIHqbcSj1cTRCDRicVooKn0Ff2A5JGAiaBVwtnsIN1vta2Tdibaur8MsA/640?wx_fmt=png&from=appmsg',
      date: '2024-10-29'
    },
    zh: {
      title: '课程分享 | 传播学',
    },
    en: {
      title: 'Course Sharing | Communication Studies',
    }
  },
  {
    id: 'a14',
    common: {
      category: ArticleCategory.DIT,
      link: 'https://mp.weixin.qq.com/s/HJf6imvOEv_OiNGbNCNJBg',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSxia9WZLRmXzBEia5gTIGyGFLrtnA86J4jdNVapNnZFMYR7RM9BujReZWhMduiaey1gm8Gsic10eeaCOA/640?wx_fmt=png&from=appmsg',
      date: '2024-10-26'
    },
    zh: {
      title: '课程分享 | 机器学习导论',
    },
    en: {
      title: 'Course Sharing | Introduction to Machine Learning',
    }
  },
  {
    id: 'a15',
    common: {
      category: ArticleCategory.DIT,
      link: 'https://mp.weixin.qq.com/s/MD5T-BsAgUi9yUo6ISY1CA',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSxia9WZLRmXzBEia5gTIGyGFLfSF77yb1mvcpqMF3TmOweR6vfHENcSLf5zJ9UljWSBdhyibE4TNFZzw/640?wx_fmt=png&from=appmsg',
      date: '2025-10-10'
    },
    zh: {
      title: '频道介绍 | DiT',
    },
    en: {
      title: 'Channel Intro | DiT',
    }
  },
  {
    id: 'a16',
    common: {
      category: ArticleCategory.DIT,
      link: 'https://mp.weixin.qq.com/s/eoP6GTzU2YRFyDhSO4xIeA',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSxzUaAR94G9zwsXeNgfxyYVCWUXibDRFcyKPibx88Iw1l2On1wpfoicicWIRPFm6Nibp6DJR7kq9WaGrzA/640?wx_fmt=png&from=appmsg',
      date: '2025-12-09'
    },
    zh: {
      title: '个人周报 | 25/12/01~25/12/07',
    },
    en: {
      title: 'Weekly Report | 25/12/01~25/12/07',
    }
  },
  {
    id: 'a17',
    common: {
      category: ArticleCategory.DIT,
      link: 'https://mp.weixin.qq.com/s/sAIYq8gaezAumyIbGHiJ_w',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSym38IftGicAWNwhwavzH9hRJCJlUmsduFfK5106ZH7iaX7E8bscy3BFp4tQiaZeSslObpcsIGXEaF1Q/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=1',
      date: '2025-12-11'
    },
    zh: {
      title: '感谢Gemini3，我的第一版个人网站上线了',
    },
    en: {
      title: 'Thanks to Gemini3, My First Version of Personal Website is Finally Online',
    }
  },
  {
    id: 'a18',
    common: {
      category: ArticleCategory.DIT,
      link: 'https://mp.weixin.qq.com/s/QvHvVmrtPJK7YSxb_lMqGQ',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSzpBHoh0Obpk1sInraKkCbLibgO9rSSdm0XibgdpfADcvvoeWhkSd5mfEOTW9hdk28kfkPEScCG8zAA/640?wx_fmt=png&from=appmsg',
      date: '2025-12-12'
    },
    zh: {
      title: 'Md2Design：更简单、更美观的图文卡片生成器',
    },
    en: {
      title: 'Md2Design: A Simple and Beautiful Markdown to Graphic Card Generator',
    }
  },
  {
    id: 'a19',
    common: {
      category: ArticleCategory.DIT,
      link: 'https://mp.weixin.qq.com/s/qRjivgmGlfHTd_8oPDC2uw',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSxnnQHXMNJtLGXcS9E1xYiaBOCicSr6UxQtfaTY3Dp9grqoXpmdibrK4bzh3bRo7dicB3J34ZhXZ0ZIlw/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=0',
      date: '2025-12-16'
    },
    zh: {
      title: '个人周报 | 25/12/08~25/12/14',
    },
    en: {
      title: 'Weekly Report | 25/12/08~25/12/14',
    }
  },
  {
    id: 'a20',
    common: {
      category: ArticleCategory.DIT,
      link: 'https://mp.weixin.qq.com/s/ARt6U27GO8xowhiGTxBPrQ',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSzib0iaKOoXAGBbvV24K0pBso56xyzSY0wDsNPrNazGld9945UvSKCTTrO5vxLVvEe9QaLO8oSBQ6jg/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=1',
      date: '2025-12-17'
    },
    zh: {
      title: '干飞我的毕设：「CineViz」，Gemini3计量电影小工具实战',
    },
    en: {
      title: 'Smash My Old Design: CineViz, A Movie Tool Utilizing Gemini3 for Data Analysis',
    }
  },
  {
    id: 'a21',
    common: {
      category: ArticleCategory.DIT,
      link: 'https://mp.weixin.qq.com/s/_1EbavTOnRPSmrWYTgVJ4w',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSxg6cGXy7Jp7f540iaUym4STFOic7HhGYicLogGg1aw2OVcpeFb0XDDmiaP63Jhre6HjVQFoMSiaaXWCaQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0',
      date: '2025-12-23'
    },
    zh: {
      title: '个人周报 | 25/12/15~25/12/21',
    },
    en: {
      title: 'Weekly Report | 25/12/15~25/12/21',
    }
  },
  {
    id: 'a22',
    common: {
      category: ArticleCategory.DIT,
      link: 'https://mp.weixin.qq.com/s/u5ZVbrlmR3cyEF1cGV5IWA',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSzsf9v7AVPnUSZY92Whkr3JN5gI4F8YWs4jComVNPsBPsHFuIvJ7sqlYCNsNeIRcRBIZL9lWsDQOA/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=0',
      date: '2025-12-29'
    },
    zh: {
      title: '个人周报 | 25/12/22~25/12/28',
    },
    en: {
      title: 'Weekly Report | 25/12/22~25/12/28',
    }
  },
  {
    id: 'a23',
    common: {
      category: ArticleCategory.DIT,
      link: 'https://mp.weixin.qq.com/s/C_42DOvA5E6St04MwBnwtQ',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSzDCHQticcFfXwyFQIOZZ43aAGNUpO1NGK0ah6IthRrqkIibancJYE7cSjxSSLJKcWp7oCHIkyV3d7w/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=0',
      date: '2026-01-05'
    },
    zh: {
      title: '个人周报 | 25/12/29~26/01/04',
    },
    en: {
      title: 'Weekly Report | 25/12/29~26/01/04',
    }
  },
  {
    id: 'a24',
    common: {
      category: ArticleCategory.DIT,
      link: 'https://mp.weixin.qq.com/s/OUoWiHoD24rIpkZlMdbyQg',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSxib9oDejqMrg14vuxmHg2srwdeMDkL6KbD9taQI2ibo5q9NssSFHRiaXLtuv2PexyFcLiapmpbHN27rg/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=0',
      date: '2026-01-12'
    },
    zh: {
      title: '个人周报 | 26/01/05~26/01/11',
    },
    en: {
      title: 'Weekly Report | 26/01/05~26/01/11',
    }
  },
  {
    id: 'l1',
    common: {
      category: ArticleCategory.LUNA,
      link: 'https://mp.weixin.qq.com/s/vJ0vYDC7o4IriMAnqUC__g',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSzEeGoKj9py128g6GwhFAibwxHR3TTV0ExpWYFFvg91Y4bAJyY5weRGNzWJSFtXiaLVNia6nxJxLzXmA/640?wx_fmt=png&from=appmsg',
      date: '2025-10-19'
    },
    zh: {
      title: '创作杂谈 | 冲击波的全力一舞，圆方之比诞生回忆录(中)：制作路漫漫',
    },
    en: {
      title: 'Creation Talk | Making of "Round & Square" (Part 2): Production Journey',
    }
  },
  {
    id: 'l2',
    common: {
      category: ArticleCategory.LUNA,
      link: 'https://mp.weixin.qq.com/s/Fkn53KTk_zVlv7uc-sJoiw',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSzEeGoKj9py128g6GwhFAibwMECIL4Ec28HprajQMqWOOcgv0WicJGPggRnEaJzWyEIspmia7r2RyEOQ/640?wx_fmt=png&from=appmsg',
      date: '2025-10-18'
    },
    zh: {
      title: '创作杂谈 | 冲击波的全力一舞，圆方之比诞生回忆录(上)：难产的策划',
    },
    en: {
      title: 'Creation Talk | Making of "Round & Square" (Part 1): Planning Difficulties',
    }
  },
  {
    id: 'l3',
    common: {
      category: ArticleCategory.LUNA,
      link: 'https://mp.weixin.qq.com/s/H4oZvhdxEWBC7Qle5yhR5g',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSxia9WZLRmXzBEia5gTIGyGFLufmWS360q09mXmGBP3d6Z6l07sF8OA3Q0VxibzPyKh66Lpn891tryLQ/640?wx_fmt=png&from=appmsg',
      date: '2024-05-18'
    },
    zh: {
      title: '索尼S709与其他常见还原LUT对比',
    },
    en: {
      title: 'Comparison: Sony S709 vs Other Common LUTs',
    }
  },
  {
    id: 'l4',
    common: {
      category: ArticleCategory.LUNA,
      link: 'https://mp.weixin.qq.com/s/DfmnO5ESepglhWDiF_tJcQ',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSym38IftGicAWNwhwavzH9hRlicib8Xr9aU3BEpRsstTsVeNlicMhbdeA2fB3mK9w9eeT2icWZDyYs0P2A/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=0',
      date: '2025-12-10'
    },
    zh: {
      title: '摄 影 作 品 大 放 送',
    },
    en: {
      title: 'Photography Portfolio',
    }
  },
  {
    id: 'af1',
    common: {
      category: ArticleCategory.AFTER8,
      link: 'https://mp.weixin.qq.com/s/ZTfsLCdwxtiEKw44gVkQRg',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSzHmzJfHVjbh7jaE4sTwG96tYC2mddm828ibQj37jjQDIibL60RDzibVzEDybXGP07LnqznbyFkm3ibNQ/640?wx_fmt=png&from=appmsg',
      date: '2025-08-15'
    },
    zh: {
      title: 'After8 | 0.栏目介绍',
    },
    en: {
      title: 'After8 | 0. Channel Introduction',
    }
  },
  {
    id: 'af2',
    common: {
      category: ArticleCategory.AFTER8,
      link: 'https://mp.weixin.qq.com/s/N_y4VLJHUGzhUDQmjgntKw',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSxTIcLAD2Ctryt7LkFnkct0nWZ4sRmLEzcuHxvcJo5n4kGVITaGqAhtl5yBkDBqiabm76rFgsr24OQ/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=1',
      date: '2025-12-08'
    },
    zh: {
      title: '山河应犹在，只是故人改。',
    },
    en: {
      title: 'Mountains May Depart.',
    }
  },
  {
    id: 's1',
    common: {
      category: ArticleCategory.SERENITY,
      link: 'https://mp.weixin.qq.com/s/QD34IsOupTR96occPweZeg',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSxia9WZLRmXzBEia5gTIGyGFLuKdk8qMh3lY9GhdDxdF4R6NceG3j41nQsy8nrAIvLMdg9H3LchLugQ/640?wx_fmt=png&from=appmsg',
      date: '2024-03-27'
    },
    zh: {
      title: '冻雨那天，我在三亚',
    },
    en: {
      title: 'Freezing Rain in Sanya',
    }
  },
  {
    id: 's2',
    common: {
      category: ArticleCategory.SERENITY,
      link: 'https://mp.weixin.qq.com/s/tghrfIhkPH7jmt8SrSdT9g',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSxia9WZLRmXzBEia5gTIGyGFLQuOXibeiaMuZBVT1J2o7eib8HUpTuGnjft6iccyNfJDsjVx3hpqJ7NnWZw/640?wx_fmt=png&from=appmsg',
      date: '2024-03-21'
    },
    zh: {
      title: '霞浦，下次一定',
    },
    en: {
      title: 'Xiapu, Next Time for Sure',
    }
  },
  {
    id: 's3',
    common: {
      category: ArticleCategory.SERENITY,
      link: 'https://mp.weixin.qq.com/s/ZwKDS393amNYUbhPn410Gg',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSxia9WZLRmXzBEia5gTIGyGFLRrm1GtsyLqE8xNsPKkuQUVxVRryCkib6WOYSlZqe7lYpb9sK71xatcw/640?wx_fmt=png&from=appmsg',
      date: '2024-03-20'
    },
    zh: {
      title: '下一次去平潭是什么时候呢？',
    },
    en: {
      title: 'When Will I Visit Pingtan Again?',
    }
  },
  {
    id: 't1',
    common: {
      category: ArticleCategory.TALK,
      link: 'https://mp.weixin.qq.com/s/x2QdGPw6DPwAQZJ7tK1wlg',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSzbicdESgIxHiblia9DVUCTHYxWjZf6XMCFKgnia6a6EGceJ0eslakia8HACD6DmnXHq4SSlXQniayMwfkQ/640?wx_fmt=png&from=appmsg',
      date: '2025-10-15'
    },
    zh: {
      title: '瞎叨be叨 | 5.自用华师美食菜单放送',
    },
    en: {
      title: 'Random Thoughts | 5. CCNU Food Guide',
    }
  },
  {
    id: 't2',
    common: {
      category: ArticleCategory.TALK,
      link: 'https://mp.weixin.qq.com/s/jkCo0948bFyx3ktFdBpYxA',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSwib6cuAAZy9ESADpKYibPkW5IKVVtq9SZUrwCYia0362NQEmPqKpndkL5gROwVVWmM13MKwiaRCmHSIw/640?wx_fmt=png&from=appmsg',
      date: '2025-10-11'
    },
    zh: {
      title: '瞎叨be叨 | 4.设计小观察：Figma潦草主页组件？取号大屏组件设计对比',
    },
    en: {
      title: 'Random Thoughts | 4. Design Observation: Figma Home Widget & Queue Screen',
    }
  },
  {
    id: 't3',
    common: {
      category: ArticleCategory.TALK,
      link: 'https://mp.weixin.qq.com/s/MwT5-P8i6wcDIjQ3KTN5ZQ',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSy3Mhax29o9g7AhHzCfFJnFYjmibHicnM82al7UgRto4PtZGIPJnAvOqZ6SZEwToJib6fnGk1USsO6ZQ/640?wx_fmt=png&from=appmsg',
      date: '2025-09-25'
    },
    zh: {
      title: '瞎叨be叨 | 3.或许我们低估了现代人的信息接受能力',
    },
    en: {
      title: 'Random Thoughts | 3. Underestimating Modern Info Processing?',
    }
  },
  {
    id: 't4',
    common: {
      category: ArticleCategory.TALK,
      link: 'https://mp.weixin.qq.com/s/MvwPq8wAO6HFb1X8u67w4Q',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSxia9WZLRmXzBEia5gTIGyGFLE4nkneHQ2d2E1kibaH84c8xj24DBH4719A1iaoeTP7hSAIj3ibbWViaI5w/640?wx_fmt=png&from=appmsg',
      date: '2025-07-10'
    },
    zh: {
      title: '这只猪已经飞到4万英尺高了',
    },
    en: {
      title: 'This Pig Has Flown to 40,000 Feet',
    }
  },
  {
    id: 't5',
    common: {
      category: ArticleCategory.TALK,
      link: 'https://mp.weixin.qq.com/s/hgQSCwcuxKxvoZ0NnSfF5g',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_jpg/MpZIibj0bjSyMxgNqibIQR18xN5kzibBPALD3sa9IhpS701VWgbBP1J47lPsJ2IQJtmuyGIjW0Xsjhj2DqDFCjTSA/640?wx_fmt=jpeg',
      date: '2024-12-19'
    },
    zh: {
      title: '主包已升级为数字生命',
    },
    en: {
      title: 'Host Upgraded to Digital Life',
    }
  },
  {
    id: 't6',
    common: {
      category: ArticleCategory.TALK,
      link: 'https://mp.weixin.qq.com/s/o3QCnqZu2Se5drsMYmenLw',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSzeIEds2Rf2ib5HVAia4K76sNnavEbFtosjJVT8x4QRUfCPEBtribfTnSLRsyETgTqnaVYJjnibt3tYUg/640?wx_fmt=png&from=appmsg',
      date: '2024-11-12'
    },
    zh: {
      title: '瞎叨be叨 | 2.入学分级考',
    },
    en: {
      title: 'Random Thoughts | 2. Entrance Placement Test',
    }
  },
  {
    id: 't7',
    common: {
      category: ArticleCategory.TALK,
      link: 'https://mp.weixin.qq.com/s/NNfjdLrJE1z2eBy0GaFZrg',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSxia9WZLRmXzBEia5gTIGyGFLuR8BBUqhTFibc8enMRl83wxfVqxOL1EYWNKIg3ws581TAOUjjmO8R4A/640?wx_fmt=png&from=appmsg',
      date: '2024-10-27'
    },
    zh: {
      title: '瞎叨be叨 | 1. 对于画面的思考',
    },
    en: {
      title: 'Random Thoughts | 1. Thoughts on Imagery',
    }
  },
  {
    id: 't8',
    common: {
      category: ArticleCategory.TALK,
      link: 'https://mp.weixin.qq.com/s/Dhvq4efyG05H1HW10vVewA',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSxia9WZLRmXzBEia5gTIGyGFLWVFuEkv7Bjq2aIZjYHMbiaeA7xTrX74rg5BsPyRdgXRn6UReqRJWp2w/640?wx_fmt=png&from=appmsg',
      date: '2025-10-12'
    },
    zh: {
      title: '频道介绍 | 瞎叨be叨',
    },
    en: {
      title: 'Channel Intro | Random Thoughts',
    }
  },
  {
    id: 't9',
    common: {
      category: ArticleCategory.TALK,
      link: 'https://mp.weixin.qq.com/s/w4zffCFyA_CTeK4Dw65WZA',
      coverImage: 'https://mmbiz.qpic.cn/mmbiz_png/MpZIibj0bjSzQdkyIrDDEBYTAyUn71qQJx1icSV5XibvKBnY78bPD4l947F8OWvwmYLW1Actc8mVMSCdaJsiczibUibg/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1#imgIndex=1',
      date: '2026-01-01'
    },
    zh: {
      title: 'why LuN3cy？我ID的由来',
    },
    en: {
      title: 'why LuN3cy？My ID History',
    }
  }
];
