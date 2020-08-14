module.exports = {
  title: 'wxue',
  base: '/wxue/',
  description: 'wxue',
  themeConfig: {
    logo: '/logo.png',
    sidebarDepth: 2,
    sidebar: {
      collapsable: false,
      '/guide/': [
        {
          title: '指南',
          collapsable: false,
          children: [
            '/guide/installation',
            '/guide/introduction',
            '/guide/getting-started',
            
          ]
        },
        {
          title: 'composition-api',
          collapsable: false,
          children: [
            '/guide/reactive',
            '/guide/ref',
            '/guide/watch-and-computed',
            '/guide/hooks',
          ]
        },
        {
          title: '其他',
          collapsable: false,
          children: [
            '/guide/setData',
            '/guide/nextTick'
          ]
        },
      ]
    },
    nav: [
      { text: '指南', link: '/guide/introduction', target: '_self' },
      { text: 'API', link: '/api/', target: '_self' },
      { text: 'github', link: 'https://github.com/kouchao/wxue', target: '_blank' },
    ]
  }
}