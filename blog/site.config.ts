import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  url: 'https://flynncaoblog.vercel.app/',
  lang: 'zh-CN',
  title: '彼方（Maji-May)',
  subtitle: 'Web Developer | he/him | lang=cn/en/ja',
  author: {
    name: 'SAKURAMAJI-MAY',
    avatar: 'https://s.gravatar.com/avatar/064ae09a1f5d9cff51069ed1a71d2bd410540d5bd136334161a43e37f27e4795?s=80',
  },
  description: 'Logic will get you from A to Z; imagination will get you everywhere.',
  social: [
    {
      name: 'RSS',
      link: '/atom.xml',
      icon: 'i-ri-rss-line',
      color: 'orange',
    },
    // {
    //   name: 'QQ 群 1050458482',
    //   link: 'https://qm.qq.com/cgi-bin/qm/qr?k=kZJzggTTCf4SpvEQ8lXWoi5ZjhAx0ILZ&jump_from=webapi',
    //   icon: 'i-ri-qq-line',
    //   color: '#12B7F5',
    // },
    {
      name: 'GitHub',
      link: 'https://github.com/FlynnCao',
      icon: 'i-ri-github-line',
      color: '#6e5494',
    },
    // {
    //   name: '微博',
    //   link: 'https://weibo.com/jizhideyunyoujun',
    //   icon: 'i-ri-weibo-line',
    //   color: '#E6162D',
    // },
    // {
    //   name: '豆瓣',
    //   link: 'https://www.douban.com/people/yunyoujun/',
    //   icon: 'i-ri-douban-line',
    //   color: '#007722',
    // },
    // {
    //   name: '网易云音乐',
    //   link: 'https://music.163.com/#/user/home?id=247102977',
    //   icon: 'i-ri-netease-cloud-music-line',
    //   color: '#C20C0C',
    // },
    // {
    //   name: '知乎',
    //   link: 'https://www.zhihu.com/people/yunyoujun/',
    //   icon: 'i-ri-zhihu-line',
    //   color: '#0084FF',
    // },
    // {
    //   name: '哔哩哔哩',
    //   link: 'https://space.bilibili.com/608240868',
    //   icon: 'i-ri-bilibili-line',
    //   color: '#FF8EB3',
    // },
    // {
    //   name: '微信公众号',
    //   link: 'https://cdn.yunyoujun.cn/img/about/white-qrcode-and-search.jpg',
    //   icon: 'i-ri-wechat-2-line',
    //   color: '#1AAD19',
    // },
    {
      name: 'Twitter',
      link: 'https://twitter.com/real_flynncao',
      icon: 'i-ri-twitter-line',
      color: '#1da1f2',
    },
    {
      name: 'Telegram',
      link: 'https://t.me/flynncao',
      icon: 'i-ri-telegram-line',
      color: '#0088CC',
    },
    {
      name: 'E-Mail',
      link: 'mailto:flynncao@yahoo.com',
      icon: 'i-ri-mail-line',
      color: '#8E71C1',
    },
    // {
    //   name: 'AniList',
    //   link: 'https://google.com/',
    //   icon: 'i-arcticons-anime-slayer',
    //   color: '#FF00FF',
    // },
    // {
    //   name: 'Goodreads',
    //   link: 'https://google.com/',
    //   icon: 'i-fa6-brands-goodreads',
    //   color: '#FF00FF',
    // },
    // {
    //   name: 'Travelling',
    //   link: 'https://www.travellings.cn/go.html',
    //   icon: 'i-ri-train-line',
    //   color: 'var(--va-c-text)',
    // },
  ],

  search: {
    enable: true,
    type: 'algolia',
    // type: 'fuse',
  },

  comment: {
    enable: true,
  },

  mediumZoom: { enable: true },

  statistics: {
    enable: true,
  },

  sponsor: {
    enable: true,
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
