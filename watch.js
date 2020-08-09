import { ref } from './ref'
import Dep from './dep'


// TODO: 未支持get和set
export function computed(fn) {
  let res
  Dep.activeFun = function (){
    res.value = fn()
  }
  res = ref(fn())
  Dep.activeFun = false
  return res
}
