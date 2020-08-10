const hooks = [
  'onLoad',
  'onReady',
  'onShow',
  'onHide',
  'onUnload',
  'onPullDownRefresh',
  'onReachBottom',
  'onShareAppMessage'
]
let page = null
// 初始化hooks
export function resolveHooks (config) {
  hooks.forEach((name) => {
    const hook = config[name]
    config[name] = function (options) {
      callHooks(name, options, this)
      hook(options)
    }
  })
}

export function callHooks (name, options, page) {
  const callbacks = page.__hooks__[name]
  if (callbacks && callbacks.length) {
    for (let i = 0; i < callbacks.length; i++) {
      callbacks[i](options)
    }
  }
}

// 设置page
export function initHooks (ctx) {
  page = ctx
  page.__hooks__ = {} // 用于存放hooks

  hooks.forEach((name) => {
    page.__hooks__[name] = []
  })
}

function genHooks (name) {
  return function (cb) {
    page.__hooks__[name].push(cb)
  }
}

export const onLoad = genHooks('onLoad')
export const onReady = genHooks('onReady')
export const onShow = genHooks('onShow')
export const onHide = genHooks('onHide')
export const onUnload = genHooks('onUnload')
export const onPullDownRefresh = genHooks('onPullDownRefresh')
export const onReachBottom = genHooks('onReachBottom')
export const onShareAppMessage = genHooks('onShareAppMessage')
