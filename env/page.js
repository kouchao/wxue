class WxPage {
  constructor (config = {}) {
    Object.keys(config).forEach((key) => {
      this[key] = config[key]
    })
    this.data = config.data || {}
    this.html = ''
    this.render()
  }

  async render () {
    return 1
  }

  setData (data, fn) {
    this.render().then(() => {
      fn && fn()
    })
  }
}

function Page (config) {
  const page = new WxPage(config)
  page.onLoad()
  page.onShow()
  return page
}

window.Page = Page
