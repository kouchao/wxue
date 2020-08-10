class WxPage {
// constructor (config) {}

  async render () {

  }

  setData (data, fn) {
    this.render().then(() => fn)
  }
}

export default function Page (config) {
  const page = new WxPage(config)
  page.onLoad()
  page.onReady()
  page.onShow()
}
