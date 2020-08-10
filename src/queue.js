export default class Queue {
  constructor () {
    this.queue = []
  }

  push (item) {
    this.queue.push(item)
  }

  run (cb) {
    while (this.queue.length) {
      cb(this.queue.shift())
    }
  }

  isNull () {
    return this.queue.length === 0
  }
}
