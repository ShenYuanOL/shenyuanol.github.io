import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  url: 'https://shenyuanol.github.io/',
  lang: 'zh-CN',
  title: '深远',
  subtitle: '希望在这你能找到想要的帮助【找不到就算了，我会继续努力的QWQ】',
  author: {
    name: 'Shen Yuan',
    avatar: '/shenyuan.png',
    status:{
      emoji: '❤️',
    },
    intro: '没人爱的技术男罢了......',
  },
  description: '有亿点恋爱脑的理工男......',
  frontmatter:{

  },
  social: [
    {
      name: 'GitHub',
      link: 'https://github.com/ShenYuanOL',
      icon: 'i-ri-github-line',
      color: '#6e5494',
    }
  ],


  search: {
    enable: false,
    type: 'engine',
  },

  
  mediumZoom: {
    enable: true,
  },


  sponsor: {
    enable: false,
    title: '我很可爱，请给我钱！',
    description: '希望文章对你有帮助~~~~§(*￣▽￣*)§',
    methods: [
      {
        name: '支付宝',
        url: 'https://cdn.yunyoujun.cn/img/donate/alipay-qrcode.jpg',
        color: '#00A3EE',
        icon: 'i-ri-alipay-line',
      },
      {
        name: 'QQ 支付',
        url: 'https://cdn.yunyoujun.cn/img/donate/qqpay-qrcode.png',
        color: '#12B7F5',
        icon: 'i-ri-qq-line',
      },
      {
        name: '微信支付',
        url: 'https://cdn.yunyoujun.cn/img/donate/wechatpay-qrcode.jpg',
        color: '#2DC100',
        icon: 'i-ri-wechat-pay-line',
      },
    ],
  },
})
