export interface SiteConfig {
  url: string;
  lang: string;
  title: string;
  subtitle: string;
  description: string;
  author: {
    name: string;
    avatar: string;
    intro: string;
  };
  social: {
    name: string;
    mdi: string;
    link: string;
  }[];
  since: number;
}

export const site: SiteConfig = {
  url: 'https://shenyuanol.github.io/',
  lang: 'zh-CN',
  title: 'ShenYuan|深远',
  subtitle: '没人爱的技术男罢了......希望在这你能找到想要的帮助【找不到就算了，我会继续努力的QWQ】',
  description: '基于「晓」框架的深远个人博客与开发文档，记录技术、生活与思考。',
  author: {
    name: 'Shen Yuan',
    avatar: 'https://avatars.githubusercontent.com/u/149544542?v=4',
    intro: '渴望遇见可以厮守一生的她',
  },
  social: [
    {
      name: 'GitHub',
      mdi: 'mdi:github',
      link: 'https://github.com/ShenYuanOL',
    },
    {
      name: 'qq',
      mdi: 'mdi:qqchat',
      link: 'https://qm.qq.com/q/5FK72EUYZq',
    },
  ],
  since: 2023 - 2026,
};
