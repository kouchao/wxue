# 快速上手

## wxue
```javascript
import { wxue } from 'wxue'
// import { wxue } from 'path/wxue.min.js' 下载文件的路径

wxue({
  setup(options) {
    // ...
    return {
      xxx,
      getXxx
    }
  },
})
```

## setup
`setup`必须是一个函数，并且一定要配置，不然的话不会`wxue`将不工作。

### options
微信小程序[onLoad](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onLoad-Object-query)的参数（打开当前页面路径中的参数）

### 返回结果
返回一个对象，可包含对象或者是函数，函数将会挂载到`this`中，对象或值将挂载到`this.data`中。
