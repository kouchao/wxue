import { ref, unref } from './ref'
import Dep from './dep'
import { noop, isFun } from './util'
let uid = 0
export class Watcher{
  fn = noop
  deps = []
  uid = ++uid
  constructor(fn){
    this.fn = fn
  }
  run(){
    Dep.target = this
    let res = this.fn()
    Dep.target = null
    return res
  }
  stop(){
    for(let i = 0; i < this.deps.length; i++){
      this.deps[i].remove(this)
    }
  }
  update(value){
    this.fn(value)
  }
  append(dep){
    this.deps.push(dep)
  }
}

export function watchEffect(fn) {
  const watcher = new Watcher(fn)
  watcher.run()
  return watcher.stop.bind(watcher)
}


// TODO: 未支持多个来源
export function watch(source, fn){
  let preSource
  const stop = watchEffect((v) => {
    let res = resolveSourceFun(source)
    if(v){
      fn(v, preSource)
    }
    preSource = res
  })
  return stop
}

// TODO: 未支持get和set
export function computed(fn) {
  let res = ref()

  const watcher = new Watcher(function (){
    res.value = fn()
  })
  watcher.run()
  return res
}



// 转换为函数形式
function resolveSourceFun(source) {
  if(isFun(source)){
    return source()
  }
  return source.value
}
