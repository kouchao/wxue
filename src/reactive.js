import Dep from './dep'
import { disableEnumerable, clone, forEach, isObject } from './util'

// 停止reactive的get和set
let stopReactive = false

// reactive
export function reactive (row, option = { isReadonly: false, shallow: false }) {
  if (isProxy(row)) {
    return row
  }

  const data = clone(row)
  const dep = new Dep()

  data.__row__ = row
  data.__dep__ = dep
  data.__isProxy__ = true
  data.__isReactive__ = !option.isReadonly
  data.__isReadonly__ = option.isReadonly
  disableEnumerable(data, ['__dep__', '__isReactive__', '__isProxy__', '__isReadonly__', '__row__'])

  forEach(data, (item, key) => {
    if (isObject(item) && key !== '__row__') {
      data[key] = reactive(item, option)
    }
  })

  const observed = new Proxy(data, {
    get (target, key) {
      if (Dep.target && !stopReactive) {
        const watcher = Dep.target
        dep.append(watcher)
      }
      return target[key]
    },
    set (target, key, value) {
      target[key] = value
      if (!stopReactive) {
        dep.depend({ value, key })
      }
      return true
    }
  })
  return observed
}

// 只读数据
export function readonly (reactiveData, shallow = false) {
  if (isReactive(reactiveData)) {
    return new Proxy(reactiveData, {
      get (target, key) {
        if (key === '__isReadonly__') {
          return true
        } else {
          return target[key]
        }
      },
      set (target, key) {
        console.warn(`属性${key}是只读的，不允许修改`)
        return true
      }
    })
  } else {
    return reactive(reactiveData, { isReadonly: true, shallow })
  }
}

export function shallowReactive (row) {
  return reactive(row, { isReadonly: false, shallow: true })
}

// 获取原始数据
export function toRaw (reactiveData) {
  return reactiveData.__row__
}

// 获取原始数据的副本，停止响应
export function unReactive (reactiveData) {
  if (isProxy(reactiveData)) {
    stopReactive = true
    const row = clone(reactiveData)
    stopReactive = false
    return row
  } else {
    return clone(reactiveData)
  }
}

// 判断是否是响应对象
export function isReactive (obj) {
  return !!(isObject(obj) && obj.__isReactive__)
}

// 判断是否是代理对象
export function isProxy (obj) {
  return !!(isObject(obj) && obj.__isProxy__)
}

// 判断是否是只读对象
export function isReadonly (obj) {
  return !!(isObject(obj) && obj.__isReadonly__)
}
