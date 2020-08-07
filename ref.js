import Dep from './dep'
import { isRef } from './util'
// ref
export default (v) => {
  if (isRef(v)) {
    return v
  }

  const dep = new Dep()

  let refData = {
    value: v,
    __dep__: dep,
    __isRef__: true,
  }
  const configProxy = new Proxy(refData, {
    get(target, key) {
      return target[key]
    },
    set(target, key, value) {
      target.value = value
      dep.depend(value)
      return true
    },
  })
  return configProxy
}
