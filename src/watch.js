import { ReactiveEffect, isRef } from './reactive'
import { isFun, noop, isArray } from './util'

export function watchEffect(fn) {
  // 此处应该是个函数 如若不是应该提示
  if (!isFun(fn)) {
    console.warn('watchEffect fn 应该是个函数')
    return
  }

  const effect = new ReactiveEffect(fn)
  effect.run()
  return () => {
    effect.stop()
  }
}

export function watch(source, cb) {
  let preSource = isArray(source) ? source.map(() => undefined) : undefined
  const stop = watchEffect(() => {
    const res = resolveSourceFun(source)
    if (res) {
      cb(res, preSource)
    }
    preSource = res
  })
  return stop
}

// 转换为函数形式
function resolveSourceFun(source) {
  let getter = noop
  if (isRef(source)) {
    getter = () => source.value
  } else if (isFun(source)) {
    getter = () => source()
  } else if (isArray(source)) {
    getter = () =>
      source.map((s) => {
        if (isRef(s)) {
          return s.value
        } else if (isFun(s)) {
          return s()
        }
      })
  }
  return getter()
}
