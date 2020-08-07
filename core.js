import { isRef, noop, disableEnumerable, isReactive, isFun } from './util'
import { setData } from './setData'
import { resolveHooks, initHooks } from './hooks'

export default (config) => {
  if (isFun(config.setup)) {
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
          if (isReactive(value)) {
            value.__dep__.append((v) => {
              setData(page, { [key]: v })
            })
            setData(page, { [key]: isRef(value) ? value.value : value })
          } else {
            setData(page, { [key]: value })
          }
          return true
        },
      })
      page.data = configProxy
      initHooks(page)
      page.__res__ = page.setup(options) || {}
      for (let key in page.__res__) {
        const item = page.__res__[key]
        if (typeof item === 'function') {
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
  }

  Page(config)
}
