
# nextTick

## 回调函数

`setData`是异步的，可以调用`nextTick`确保在真正的`setData`完成之后执行一些函数。
```javascript
import { wxue, setData } from 'wxue'

wxue({
  onLoad(options) {
    setData(this, { a: 1 })
    console.log(this.data.a) // undefined
    nextTick(() => {
      console.log(this.data.a) // 1
    })
  },
})
```

## Promise和async/await
`nextTick`返回一个`Promise`，所以可以使用`async/await`。这样的写法看起来更符合逻辑。

```javascript
import { wxue, setData } from 'wxue'

wxue({
  async onLoad(options) {
    setData(this, { a: 1 })
    console.log(this.data.a) // undefined
    await nextTick()
    console.log(this.data.a) // 1
  },
})
```
