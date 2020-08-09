import Dep from './dep'
import { isReactive, disableEnumerable, isFun } from './util'
import Queue from './queue'
// ref
export default (refData) => {
  if (isReactive(refData)) {
    return refData
  }

  const dep = new Dep()

  refData.__dep__ = dep
  refData.__isReactive__ = true
  disableEnumerable(refData, ['__dep__', '__isReactive__'])
  const observed = new Proxy(refData, {
    get(target, key) {
      if(isFun(Dep.activeFun)){
        const activeFun = Dep.activeFun
        dep.append(activeFun)
      }
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      dep.depend(target)
      return true
    },
  })
  return observed
}
