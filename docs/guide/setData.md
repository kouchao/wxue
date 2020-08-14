# setData

## 优化
优化的`setData`，多次调用将合并成一次执行
```javascript
import { wxue, setData } from 'wxue'

wxue({
  onLoad(options) {
    setData(this, {a: 1})
    setData(this, {a: 2})
    setData(this, {b: 2})
    setData(this, {'c.d': 2})
    setData(this, {'c.e': 2})
    /**
     * 只调用一次，相当于
     * this.setData({
     *  a: 2,
     *  b: 2,
     *  c: {
     *    d: 2,
     *    e: 2
     *  }
     * })
     * 
     */
  },
})
```

## 劫持
对`this.data`进行劫持，当设置`data`的属性时，会调用`setData`而不是直接设置进行赋值。
```javascript
import { wxue, setData } from 'wxue'

wxue({
  onLoad(options) {
    this.data.a = 1
    this.data.a = 2
    this.data['c.d'] = 2
    this.data['c.e'] = 2
    /**
     * 只调用一次，相当于
     * this.setData({
     *  a: 2,
     *  b: 2,
     *  c: {
     *    d: 2,
     *    e: 2
     *  }
     * })
     * 
     */
  },
})
```

::: warning 警告
目前还不支持深度劫持，将在后续版本支持。
:::
