import {isRef} from './util'
import Queue from './queue'
export default class Dep{
  sub = []
  append(cb){
    this.sub.push(cb)
  }
  depend(value){
    for(let i = 0; i < this.sub.length; i++) {
      this.sub[i](isRef(value) ? value.value : value)
    }
  }
}

Dep.activeFun = false