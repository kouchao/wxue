> 跟 vue 的 composition-api 类似，小程序端的逻辑复用的解决方案。


## 安装
```
npm i wxue -S
```
## 文档
文档正在整理 [https://kouchao.github.io/wxue](https://kouchao.github.io/wxue)。

以下文档整理中。

## computed

计算属性 返回的值返回一个不变的反应性 ref 对象。

```javascript
const computedX = computed(() => x.value + 1)
return { computedX }
```

## watchEffect

它会在反应性地跟踪其依赖关系时立即运行一个函数，并在依赖关系发生更改时重新运行它。stop 停止监听

```javascript
const count = ref(0)
const stop = watchEffect(() => console.log(count.value))
setTimeout(() => {
  count.value++
  if (count.value === 100) {
    stop()
  }
}, 1000)
```

## watch

观察者数据源可以是返回值的 getter 函数，也可以直接是 ref, stop 停止监听

```javascript
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
```

## hooks

支持小程序的所有生命周期 `onLoad`,`onReady`,`onShow`,`onHide`,`onUnload`,`onPullDownRefresh`,`onReachBottom`,`onShareAppMessage`

```javascript
import { wxue, onShow } from 'wxue'

wxue({
  setup(options) {
    onShow(() => {
      console.log('onShow form hooks')
    })
  },
})
```

## setData(page, data)

优化的`setData`，多次调用将合并成一次执行

## nextTick()
`setData`是异步的，在`setData`执行后完成后执行的回调`nextTick`
```javascript
// 1 返回Promise
await nextTick()
// 2 执行回调
nextTick(() => {})
```

## 其他
对`this.data`的 set 进行了劫持，会调用`setData`
