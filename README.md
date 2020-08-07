跟vue的composition-api类似，小程序端的逻辑复用的解决方案。
```javascript
// pages/test/index.js
import { wue, nextTick, ref, onShow } from '../../wue/index'

function useAutoAdd(x) {
  const b = ref(x)
  setInterval(() => {
    b.value++
    console.log(b.value)
  }, 1000)
  return b
}

wue({
  data: {},
  setup(options) {
    // console.log(ctx)
    const b = useAutoAdd(2)

    onShow(() => {
      console.log('onShow for hooks', this)
    })

    function getXx() {
      console.log(this, 'getXx')
    }

    return {
      c: b,
      getXx,
      test
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