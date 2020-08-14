import { effect, isRef } from './reactive'
import { isFun, noop, isArray } from './util'

export function stop (effect) {
  if (effect.active) {
    cleanup(effect)
    if (effect.options.onStop) {
      effect.options.onStop()
    }
    effect.active = false
  }
}

function cleanup (effect) {
  const { deps } = effect
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect)
    }
    deps.length = 0
  }
}

export function watchEffect (fn) {
  // 此处应该是个函数 如若不是应该提示
  if (!fn || !isFun(fn)) {
    console.warn('watchEffect fn 应该是个函数')
  }
  if (fn && !isFun(fn)) {
    fn = null
  }

  const runner = effect(fn)

  return () => {
    stop(runner)
  }
}

export function watch (source, cb) {
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
function resolveSourceFun (source) {
  let getter = noop
  if (isRef(source)) {
    getter = () => source.value
  } else if (isFun(source)) {
    getter = () => source()
  } else if (isArray(source)) {
    getter = () => source.map(s => {
      if (isRef(s)) {
        return s.value
      } else if (isFun(s)) {
        return s()
      }
    })
  }
  return getter()
}
