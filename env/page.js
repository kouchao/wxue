class WxPage {
  constructor (config = {}) {
    Object.keys(config).forEach((key) => {
      this[key] = config[key]
    })
    this.data = config.data || {}
    this.html = ''
    this.onRender = config.onRender || (() => {})
  }

  setData (data, fn) {
    console.log('setData')
    this.onRender()
    fn && fn()
  }
}

function Page (config) {
  return new Promise((resolve) => {
    const page = new WxPage(config)
    page.onLoad()
    page.onShow()

    resolve(page)
  })
}

window.Page = Page
