import Queue from './queue'
const setDataQueue = new Queue()
const nextTickQueue = new Queue()

// 用于异步处理data
export function setData(page, data) {
  setDataQueue.push(data)
  Promise.resolve().then(() => {
    let d = {}
    setDataQueue.run((item) => {
      d = {
        ...d,
        ...item,
      }
    })

    page.setData(d, () => {
      nextTickQueue.run((item) => {
        const cb = item.bind(page)
        cb()
      })
    })
  })
}

export const nextTick = (cb) => {
  nextTickQueue.push(cb)
}
