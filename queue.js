export default class Queue {
  queue = [];
  push (item) {
    this.queue.push(item)
  }
  run(cb){
    while(this.queue.length) {
      cb(this.queue.shift())
    }
  }
}