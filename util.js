// 判断是否是ref对象
export function isRef(obj) {
  return typeof obj == 'object' && obj.__isRef__
}

// 判断是否是响应对象
export function isReactive(obj) {
  return typeof obj == 'object' && obj.__isReactive__
}


export function noop() {}

// 变为不可枚举
export function disableEnumerable(obj, keys){
  keys.forEach(key => {
    Object.defineProperty(obj, key, {
      enumerable: false
    })
  })
}