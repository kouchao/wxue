import { isRef } from './util'
import { reactive } from './reactive'
import { Watcher } from './watch'
// ref
export function ref (v) {
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
export function unref (v) {
  if (isRef(v)) {
    return v.value
  }
  return v
}

// 可用于ref在源反应对象上为属性创建
export function toRef (obj, key) {
  const res = ref(obj[key])
  const watcher = new Watcher((v) => {
    res.value = v[key]
  })
  obj.__dep__.append(watcher)
  return res
}

// 将反应对象转换为普通对象，其中所得对象的每个属性都ref指向原始对象的相应属性
export function toRefs (obj, res = {}) {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      res[key] = toRefs(obj[key], res)
    } else {
      res[key] = toRef(obj, key)
    }
  })

  return res
}
