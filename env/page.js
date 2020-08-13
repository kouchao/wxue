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
    Object.keys(data).forEach(key => {
      const keys = key.split('.')
      if(keys.length === 1){
        this.data[key] = data[key]
      } else {
        let end = this.data
        keys.forEach((k, index) => {
          if(!end[k]) {
            end[k] = {}
          }
          if(index === keys.length - 1){
            end[k] = data[key]
          } else {
            end = end[k]
          }
        }) 
      }
    })
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
