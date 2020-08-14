# 参考
## ref
接受一个值并返回一个响应对象。这个响应对象具有`.value`指向接受的值，形如这样我们成为ref对象。
```javascript
import { wxue, ref } from 'wxue'

wxue({
  setup(options) {
    const count = ref(1)

    setInterval(() => {
      count.value++
    }, 1000)

    return {
      count,
    }
  },
})
```

## unref
如果参数是ref对象，则返回.value，否则返回参数本身。
```javascript
import { wxue, ref, unref } from 'wxue'

wxue({
  setup(options) {
    const count = ref(1)

    console.lolg(unref(count)) // 1

    return {
      count,
    }
  },
})
```
## toRef
把响应对象的属性变成ref对象。
```javascript
const test = reactive({ count: 1 })
const count = toRef(test, 'count')
return { count }
```

## toRefs
将响应对象转换为普通对象，其中所得对象的每个属性变成ref对象，可用于解构
```javascript
const test = reactive({
  x: 1,
  y: 2,
})
const { count } = toRefs(test)
return { count }
```