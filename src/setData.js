import Queue from './queue'
const setDataQueue = new Queue()
let nextTickResolve = null
let timer = null
// 用于异步处理data
export function setData (page, data) {
  setDataQueue.push(data)
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  timer = setTimeout(() => {
    if (setDataQueue.isNull()) {
      return
    }
    let d = {}
    setDataQueue.run((item) => {
      d = {
        ...d,
        ...item
      }
    })
    page.setData(d, () => {
      if (nextTickResolve) {
        nextTickResolve()
        nextTickResolve = null
      }
    })
  })
}

export const nextTick = (fn) => {
  return new Promise((resolve) => {
    nextTickResolve = () => {
      fn()
      resolve()
    }
  })
}
