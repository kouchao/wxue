import { noop, disableEnumerable, isFun, forEach, isObject, isRef } from './util'
import { setData } from './setData'
import { resolveHooks, initHooks, callHooks } from './hooks'
import { Watcher } from './watch'
import { unref } from './ref'
import { unReactive, isReactive } from './reactive'

export default (config) => {
  if (isFun(config.setup)) {
    let onLoad = config.onLoad || noop

    resolveHooks(config)
    config.onLoad = function (options) {
      initHooks(this)
      handleSetup(this, options)

      // 禁止枚举
      disableEnumerable(this, ['__res__', '__hooks__'])

      callHooks('onLoad', options, this)

      // 调用原始的onLoad
      onLoad = onLoad.bind(this)
      onLoad(options)
    }
  }

  return Page(config)
}

function handleSetup (page, options) {
  const setupRes = page.setup(options) || {}

  const keys = Object.keys(setupRes)

  page.__res__ = {}
  keys.forEach(key => {
    const item = setupRes[key]
    if (isFun(item)) {
      page[key] = item
    } else {
      setData(page, { [key]: isRef(item) ? unref(item) : unReactive(item) })
      page.__res__[key] = item
    }
  })
  appendWatcher(page, page.__res__)
}

// isRef(value) ? unref(value) : unReactive(value)
function appendWatcher (page, data, key) {
  forEach(data, (item, k) => {
    const resKey = key ? key + '.' + k : k
    if (isObject(item) && !isRef(data)) {
      appendWatcher(page, item, resKey)
    }

    if (isReactive(data[k])) {
      const watcher = new Watcher((obj) => {
        setData(page, { [isRef(data[k]) ? resKey : resKey + '.' + obj.key]: obj.value })
      })
      data[k].__dep__.append(watcher)
    }
  })
}
