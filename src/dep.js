import { isRef } from './util'
let uid = 0
export default class Dep {
  constructor () {
    this.sub = []
    this.uid = ++uid
  }

  append (watcher) {
    this.sub.push(watcher)
    watcher.append(this)
  }

  depend (value) {
    for (let i = 0; i < this.sub.length; i++) {
      const watcher = this.sub[i]
      watcher.update(isRef(value) ? value.value : value)
    }
  }

  remove (watch) {
    const index = this.sub.findIndex(w => w === watch)
    if (~index) {
      this.sub.splice(index, 1)
    }
  }
}

Dep.target = null
