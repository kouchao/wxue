# 响应对象
## reactive
返回对象的响应对象。响应对象改变的时候界面会相应的进行变化。
```javascript
import { wxue, reactive } from 'wxue'

wxue({
  setup(options) {
    const test = reactive({ count: 1 })

    setInterval(() => {
      test.count++
    }, 1000)

    return {
      test,
    }
  },
})
```
::: warning 警告
目前还不支持深度响应，将在后续版本支持。
:::