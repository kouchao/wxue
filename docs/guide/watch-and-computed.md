# 监听和属性计算

## watchEffect

它会在立即运行传入的函数，并在所依赖的响应对象发生改变的时候重新运行它。
返回`stop`函数，调用后停止监听。

```javascript
import { wxue, watchEffect } from 'wxue'

wxue({
  setup(options) {
    const count = ref(0)
    const stop = watchEffect(() => console.log(count.value))
    setTimeout(() => {
      count.value++
      if (count.value === 3) {
        stop()
      }
    }, 1000)
  },
})
```

## watch

观察者数据源可以是返回值响应对象属性的函数，也可以直接是`ref`对象,
立即运行传入的函数，并在所依赖的响应对象发生改变的时候重新运行它。
这个函数有两个参数，当前数据源的值和改变之前的值。
返回`stop`函数，调用后停止监听。

```javascript
import { wxue, watchEffect } from 'wxue'

wxue({
  setup(options) {
    const count = ref(0)
    const state = reactive({ count: 0 })
    const stop = watch(ref, (count, prevCount) => {
      /* ... */
    })
    const stop2 = watch(
      () => state.count,
      (count, prevCount) => {
        /* ... */
      }
    )
    stop()
    stop2()
  },
})
```

## computed
计算属性返回一个`ref`对象，当所依赖的值发生变化时，返回的值也会相应的进行变化。
```javascript
import { wxue, watchEffect } from 'wxue'

wxue({
  setup(options) {
    const computedX = computed(() => x.value + 1)
    return { computedX }
  },
})
```
::: warning 警告
不要修改`computed`后的值。
:::
