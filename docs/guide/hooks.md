# 生命周期
支持小程序的所有生命周期
- `onLoad`
- `onReady`
- `onShow`
- `onHide`
- `onUnload`
- `onPullDownRefresh`
- `onReachBottom`
- `onShareAppMessage`

先执行`setup`中的钩子函数，然后再执行配置参数中的钩子函数。

```javascript
import { wxue, onShow } from 'wxue'

wxue({
  setup(options) {
    onShow(() => {
      console.log(1)
    })
  },
  onShow(){
    console.log(2)
  }
})
// 1 2
```