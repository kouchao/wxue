import Dep from './dep'
import { isReactive, disableEnumerable } from './util'
// ref
export default (refData) => {
  if (isReactive(refData)) {
    return refData
  }

  const dep = new Dep()

  refData.__dep__ = dep
  refData.__isReactive__ = true
  disableEnumerable(refData, ['__dep__', '__isReactive__'])
  const configProxy = new Proxy(refData, {
    get(target, key) {
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      console.log('Reactive set', target, key, value)
      dep.depend(value)
      return true
    },
  })
  return configProxy
}
