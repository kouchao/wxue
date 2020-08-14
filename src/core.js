import { noop, isFun, forEach, isObject } from './util'
import { setData } from './setData'
import { resolveHooks, initHooks, callHooks } from './hooks'
import { isRef, toRaw, effect, unref } from './reactive'

export default (config) => {
  if (isFun(config.setup)) {
    let onLoad = config.onLoad || noop

    resolveHooks(config)

    config.onLoad = function (options) {
      initHooks(this)
      handleSetup(this, options)

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
  const data = {}
  forEach(setupRes, (item, key) => {
    if (isFun(item)) {
      page[key] = item
    } else {
      data[key] = item
    }
  })
  runEffect(page, data)
}

function runEffect (page, data, key) {
  forEach(data, (item, k) => {
    const resKey = key ? key + '.' + k : k
    if (isObject(item) && !isRef(item)) {
      runEffect(page, item, resKey)
    }
    effect(() => {
      const item = data[k]
      const key = isRef(item) ? resKey : resKey
      const value = isRef(item) ? unref(item) : toRaw(item)
      setData(page, { [key]: value })
    })
  })
}
