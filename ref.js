import Dep from './dep'
import { isRef } from './util'
import reactive from './reactive'
// ref
export default (v) => {
  if (isRef(v)) {
    return v
  }

  let refData = {
    value: v,
    __isRef__: true,
  }
  
  const observed = reactive(refData)
  return observed
}
