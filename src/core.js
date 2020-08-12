import { noop, disableEnumerable, isReactive, isFun } from './util'
import { setData } from './setData'
import { resolveHooks, initHooks, callHooks } from './hooks'
import { Watcher } from './watch'
import { unref } from './ref'

export default (config) => {
  if (isFun(config.setup)) {
    let onLoad = config.onLoad || noop
    resolveHooks(config)
    config.onLoad = function (options) {
      const page = this
      // TODO: 未支持原始数据的getter setter
      const configProxy = new Proxy(page.data, {
        get (target, key) {
          return target[key]
        },
        set (target, key, value) {
          if (isReactive(value)) {
            const watcher = new Watcher((v) => {
              setData(page, { [key]: v })
            })
            value.__dep__.append(watcher)
          }

          setData(page, { [key]: unref(value) })
          return true
        }
      })
      page.data = configProxy
      initHooks(page)
      page.__res__ = page.setup(options) || {}
      for (const key in page.__res__) {
        const item = page.__res__[key]
        if (typeof item === 'function') {
          page[key] = item
        } else {
          page.data[key] = item
        }
      }

      // 禁止枚举
      disableEnumerable(page, ['__res__', '__hooks__'])

      callHooks('onLoad', options, page)
      onLoad = onLoad.bind(page)
      onLoad(options)
    }
  }

  return Page(config)
}
