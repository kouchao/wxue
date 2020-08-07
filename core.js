import { isRef, noop, disableEnumerable, isReactive } from './util'
import { setData } from './setData'
import { resolveHooks, initHooks } from './hooks'

export default (config) => {
  let onLoad = config.onLoad || noop
  resolveHooks(config)
  config.onLoad = function (options) {
    const page = this
    // TODO: 未支持原始数据的getter setter
    const configProxy = new Proxy(page.data, {
      get(target, key) {
        console.log('get', target, key)
        return target[key]
      },
      set(target, key, value) {
        if (isRef(value)) {
          value.__dep__.append((v) => {
            setData(page, { [key]: v })
          })
          setData(page, { [key]: value.value })
        } if (isReactive(value)) {
          console.error(target, key, Object.keys(value))
          value.__dep__.append((v) => {
            console.log('v', key, v)
            setData(page, { [key]: v })
          })
          setData(page, { [key]: value})
        } else {
          setData(page, { [key]: value })
        }
        return true
      },
    })
    page.data = configProxy
    initHooks(page)
    page.__res__ = (page.setup && page.setup(options)) || {}
    for (let key in page.__res__) {
      const item = page.__res__[key]
      if(typeof item === 'function'){
        page[key] = item
      } else {
        page.data[key] = item
      }
    }
    
    // 禁止枚举
    disableEnumerable(page, ['__res__', '__hooks__'])

    onLoad = onLoad.bind(page)
    onLoad(options)
  }
  Page(config)
}
