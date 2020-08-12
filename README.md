> 跟 vue 的 composition-api 类似，小程序端的逻辑复用的解决方案。

## 介绍
<img src="https://github.com/kouchao/wxue/blob/dev/docs/.vuepress/public/logo.png"/>

由于参照`vue`，暂且叫他`wxue`吧，目前的方向还没有定。提供了`vue`的`composition-api`类似的用法。

## 文档
查看文档 [https://kouchao.github.io/wxue](https://kouchao.github.io/wxue)
### 安装
```
npm i wxue -S
```

### wxue

```javascript
wxue(options)
```

`options`中需要配置`setup`，并且`setup`是一个函数

### setup

返回一个对象，可包含对象或者是函数，函数将会挂载到`this`中，对象将挂载到`data`中

### reactive

返回对象的响应数据。

```javascript
import { wxue, reactive } from 'wxue'

wxue({
  setup(options) {
    const test = reactive({
      x: 1,
      y: 2,
    })

    setInterval(() => {
      test.x++
    }, 1000)

    return {
      test,
    }
  },
})
```

### ref

接受一个内部值并返回一个反应性且可变的`ref`对象。`ref`对象具有`.value`指向内部值的单个属性。

```javascript
import { wxue, ref } from 'wxue'

wxue({
  setup(options) {
    const x = ref(1)

    setInterval(() => {
      x.value++
    }, 1000)

    return {
      x,
    }
  },
})
```

#### unref

如果参数是 ref，则返回内部值，否则返回参数本身。

#### toRef

可用于 ref 在源反应对象上为属性创建

```javascript
const test = reactive({
  x: 1,
  y: 2,
})
const x = toRef(test, 'x')
return { x }
```

#### toRefs

将反应对象转换为普通对象，其中所得对象的每个属性都 ref 指向原始对象的相应属性,可用于解构

```javascript
const test = reactive({
  x: 1,
  y: 2,
})
const { x } = toRefs(test)
return { x }
```

### computed

计算属性 返回的值返回一个不变的反应性 ref 对象。

```javascript
const computedX = computed(() => x.value + 1)
return { computedX }
```

### watchEffect

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

### watch

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

### hooks

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

### setData(page, data)

优化的`setData`，多次调用将合并成一次执行

### nextTick()
`setData`是异步的，在`setData`执行后完成后执行的回调`nextTick`
```javascript
// 1 返回Promise
await nextTick()
// 2 执行回调
nextTick(() => {})
```

### 其他

对`this.data`的 set 进行了劫持，会调用`setData`

## 示例

```javascript
// pages/test/index.js
import { wxue, nextTick, ref, onShow } from 'wxue'

function useAutoAdd(x) {
  const b = ref(x)
  setInterval(() => {
    b.value++
  }, 1000)
  return b
}

wxue({
  data: {},
  setup(options) {
    const b = useAutoAdd(2)

    onShow(() => {
      console.log('onShow form hooks', this)
    })

    function getXx() {
      console.log(this, 'getXx')
    }

    return {
      c: b,
      getXx,
      test,
    }
  },
  onLoad: function (options) {
    setTimeout(() => {
      this.test()
      console.log(this.data.b)
    }, 5000)
    this.getXx()
  },
  test: function () {
    nextTick(() => {
      console.log(this.data.a.b)
    })
    this.data['a.b'] = 111
    this.data['a.c'] = 111
  },
})
```
