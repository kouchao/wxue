import Queue from './queue'
const setDataQueue = new Queue()
const nextTickQueue = new Queue()

// 用于异步处理data
export function setData(page, data) {
  setDataQueue.push(data)
  //TODO: 此处需要判断d 若d不存在则不要进行setData
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
