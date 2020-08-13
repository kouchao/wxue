export function noop () {}

// 判断是否是ref对象
export function isRef (obj) {
  return typeof obj === 'object' && obj.__isRef__
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

// 判断是数组
export function isArray (arr) {
  return Array.isArray(arr)
}

// 仅限数组和对象
export function forEach (obj, fn) {
  if (isArray(obj)) {
    obj.forEach(fn)
  } else if (isObject(obj)) {
    Object.keys(obj).forEach(key => {
      fn(obj[key], key)
    })
  }
}

// 克隆对象
let max = 100
export function clone (obj) {
  if (max-- === 0) {
    return
  }
  let res
  if (isArray(obj)) {
    res = []
    forEach(obj, (item, key) => {
      res[key] = clone(item)
    })
  } else if (isObject(obj)) {
    res = {}
    forEach(obj, (item, key) => {
      res[key] = clone(item)
    })
  } else {
    res = obj
  }
  return res
}
