export function noop () {}

// 判断是否是ref对象
export function isRef (obj) {
  return typeof obj === 'object' && obj.__isRef__
}

// 判断是否是响应对象
export function isReactive (obj) {
  return typeof obj === 'object' && obj.__isReactive__
}

// 变为不可枚举
export function disableEnumerable (obj, keys) {
  keys.forEach(key => {
    Object.defineProperty(obj, key, {
      enumerable: false
    })
  })
}

// 判断函数
export function isFun (fn) {
  return fn && typeof fn === 'function'
}

// 判断是对象
export function isObject (obj) {
  return obj && typeof obj === 'object'
}
