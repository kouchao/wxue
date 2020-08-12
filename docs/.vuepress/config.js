module.exports = {
  title: 'wxue',
  description: 'Just playing around',
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
      ]
    },
    nav: [
      { text: '指南', link: '/guide/introduction', target: '_self' },
      { text: 'API', link: '/api/', target: '_self' },
      { text: 'github', link: 'https://github.com/kouchao/wxue', target: '_blank' },
    ]
  }
}