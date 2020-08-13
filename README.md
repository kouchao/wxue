## 介绍
`wxue`是一个小程序的运行时的库，体积小到可以忽略。
它使得小程序可以使用`Vue`的语法，最大的亮点是支持了`composition-api`，其他的`Vue`语法正在完成。更好的开发体验，上手简单，如果你恰好是Vue技术栈，可能10分钟即可上手。
在使用`Vue`语法的同时，优化了小程序的常见性能问题，以及更好的逻辑复用方式。
## 安装
```
npm i wxue -S
```

## 文档
完整的文档请点击 [https://kouchao.github.io/wxue](https://kouchao.github.io/wxue)。

## composition-api示例
```javascript
import { wxue, ref, onShow } from 'wxue'
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
    this.data['a.b'] = 111
    this.data['a.c'] = 111
  },
})
```
