function noop () {}

// 判断是否是ref对象
function isRef (obj) {
  return typeof obj === 'object' && obj.__isRef__
}

// 判断是否是响应对象
function isReactive (obj) {
  return typeof obj === 'object' && obj.__isReactive__
}

// 变为不可枚举
function disableEnumerable (obj, keys) {
  keys.forEach(key => {
    Object.defineProperty(obj, key, {
      enumerable: false
    })
  })
}

// 判断函数
function isFun (fn) {
  return fn && typeof fn === 'function'
}

class Queue {
  constructor () {
    this.queue = []
  }

  push (item) {
    this.queue.push(item)
  }

  run (cb) {
    while (this.queue.length) {
      cb(this.queue.shift())
    }
  }

  isNull () {
    return this.queue.length === 0
  }
}

const setDataQueue = new Queue()
let nextTickResolve = null
let timer = null
// 用于异步处理data
function setData (page, data) {
  setDataQueue.push(data)
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  timer = setTimeout(() => {
    if (setDataQueue.isNull()) {
      return
    }
    let d = {}
    setDataQueue.run((item) => {
      d = {
        ...d,
        ...item
      }
    })
    page.setData(d, () => {
      if (nextTickResolve) {
        nextTickResolve()
        nextTickResolve = null
      }
    })
  })
}

const nextTick = (fn) => {
  return new Promise((resolve) => {
    nextTickResolve = () => {
      fn()
      resolve()
    }
  })
}

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
function resolveHooks (config) {
  hooks.forEach((name) => {
    const hook = config[name]
    config[name] = function (options) {
      callHooks(name, options, this)
      hook(options)
    }
  })
}

function callHooks (name, options, page) {
  const callbacks = page.__hooks__[name]
  if (callbacks && callbacks.length) {
    for (let i = 0; i < callbacks.length; i++) {
      callbacks[i](options)
    }
  }
}

// 设置page
function initHooks (ctx) {
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

const onLoad = genHooks('onLoad')
const onReady = genHooks('onReady')
const onShow = genHooks('onShow')
const onHide = genHooks('onHide')
const onUnload = genHooks('onUnload')
const onPullDownRefresh = genHooks('onPullDownRefresh')
const onReachBottom = genHooks('onReachBottom')
const onShareAppMessage = genHooks('onShareAppMessage')

let uid = 0
class Dep {
  constructor () {
    this.sub = []
    this.uid = ++uid
  }

  append (watcher) {
    this.sub.push(watcher)
    watcher.append(this)
  }

  depend (value) {
    for (let i = 0; i < this.sub.length; i++) {
      const watcher = this.sub[i]
      watcher.update(isRef(value) ? value.value : value)
    }
  }

  remove (watch) {
    const index = this.sub.findIndex(w => w === watch)
    if (~index) {
      this.sub.splice(index, 1)
    }
  }
}

Dep.target = null

// ref
function reactive (refData) {
  if (isReactive(refData)) {
    return refData
  }

  const dep = new Dep()

  refData.__dep__ = dep
  refData.__isReactive__ = true
  disableEnumerable(refData, ['__dep__', '__isReactive__'])
  const observed = new Proxy(refData, {
    get (target, key) {
      if (Dep.target) {
        const watcher = Dep.target
        dep.append(watcher)
      }
      return target[key]
    },
    set (target, key, value) {
      target[key] = value
      dep.depend(target)
      return true
    }
  })
  return observed
}

// ref
function ref (v) {
  if (isRef(v)) {
    return v
  }

  const refData = {
    value: v,
    __isRef__: true
  }

  const observed = reactive(refData)
  return observed
}

// 如果参数是ref，则返回内部值，否则返回参数本身。
function unref (v) {
  if (isRef(v)) {
    return v.value
  }
  return v
}

// 可用于ref在源反应对象上为属性创建
function toRef (obj, key) {
  const res = ref(obj[key])
  const watcher = new Watcher((v) => {
    res.value = v[key]
  })
  obj.__dep__.append(watcher)
  return res
}

// 将反应对象转换为普通对象，其中所得对象的每个属性都ref指向原始对象的相应属性
function toRefs (obj, res = {}) {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      res[key] = toRefs(obj[key], res)
    } else {
      res[key] = toRef(obj, key)
    }
  })

  return res
}

let uid$1 = 0
class Watcher {
  constructor (fn) {
    this.deps = []
    this.uid = ++uid$1
    this.fn = fn || noop
  }

  run () {
    Dep.target = this
    const res = this.fn()
    Dep.target = null
    return res
  }

  stop () {
    for (let i = 0; i < this.deps.length; i++) {
      this.deps[i].remove(this)
    }
  }

  update (value) {
    this.fn(value)
  }

  append (dep) {
    this.deps.push(dep)
  }
}

function watchEffect (fn) {
  const watcher = new Watcher(fn)
  watcher.run()
  return watcher.stop.bind(watcher)
}

// TODO: 未支持多个来源
function watch (source, fn) {
  let preSource
  const stop = watchEffect((v) => {
    const res = resolveSourceFun(source)
    if (v) {
      fn(v, preSource)
    }
    preSource = res
  })
  return stop
}

// TODO: 未支持get和set
function computed (fn) {
  const res = ref()

  const watcher = new Watcher(function () {
    res.value = fn()
  })
  watcher.run()
  return res
}

// 转换为函数形式
function resolveSourceFun (source) {
  if (isFun(source)) {
    return source()
  }
  return source.value
}

var core = (config) => {
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

          setData(page, { [key]: isRef(value) ? value.value : value })
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

      onLoad = onLoad.bind(page)
      onLoad(options)
    }
  }

  Page(config)
}

const wxue = core

export { Watcher, callHooks, computed, initHooks, nextTick, onHide, onLoad, onPullDownRefresh, onReachBottom, onReady, onShareAppMessage, onShow, onUnload, reactive, ref, resolveHooks, setData, toRef, toRefs, unref, watch, watchEffect, wxue }
