---
home: true
heroImage: /logo.png
heroText: wxue
tagline: 一个小程序的运行时的库
actionText: 快速上手 →
actionLink: /guide/getting-started
features:
  - title: Vue语法
    details: 使得小程序可以使用Vue的语法，更好的开发体验，上手简单，如果你恰好是Vue技术栈，可能10分钟即可上手。
  - title: 体积小
    details: 作为一个运行时的库，体积小到可以忽略，借用小程序自带的能力，得很多方法可以直接使用，不需要重复造轮子。
  - title: 优化
    details: 在使用Vue语法的同时，优化了小程序的常见性能问题，以及更好的逻辑复用方式。
      
footer: MIT Licensed | Copyright © 2020 kouchao
---

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
