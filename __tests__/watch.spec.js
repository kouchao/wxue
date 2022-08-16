import { wxue, watchEffect, watch, ref, reactive } from '../src'
describe('Watcher', () => {
  test('watchEffect 正常使用', () => {
    const arr = []
    wxue({
      setup() {
        const x = ref(1)
        watchEffect(() => {
          arr.push(x.value)
        })
        x.value++
        return { x }
      },
    })
    expect(arr).toEqual([1, 2])
  })

  test('watchEffect参数应该是个函数', () => {
    wxue({
      setup() {
        const x = ref(1)
        watchEffect(1)
        x.value++
        return { x }
      },
    })
  })

  test('watchEffect的stop方法', () => {
    const arr = []
    wxue({
      setup() {
        const x = ref(1)
        const stop = watchEffect(() => {
          arr.push(x.value)
        })
        x.value++
        stop()
        x.value++
        return { x }
      },
    })
    expect(arr).toEqual([1, 2])
  })

  test('watch 侦听一个 getter 函数', () => {
    const arr = []
    wxue({
      setup() {
        const x = reactive({ y: 1 })
        watch(
          () => x.y,
          (y, prevY) => {
            arr.push(y)
            arr.push(prevY)
          }
        )
        x.y++
        return { x }
      },
    })
    expect(arr).toEqual([1, undefined, 2, 1])
  })

  test('watch 侦听一个 ref', () => {
    const arr = []
    wxue({
      setup() {
        const x = ref(1)
        watch(x, (y, prevY) => {
          arr.push(y)
          arr.push(prevY)
        })
        x.value++
        return { x }
      },
    })
    expect(arr).toEqual([1, undefined, 2, 1])
  })

  test('watch 侦听多个来源', () => {
    const arr = []
    wxue({
      setup() {
        const xR = ref(1)
        const yR = ref(1)

        watch([xR, yR], ([x, y], [prevX, prevY]) => {
          arr.push(x, y, prevX, prevY)
        })

        xR.value++
        yR.value++

        return { xR, yR }
      },
    })
    expect(arr).toEqual([1, 1, undefined, undefined, 2, 1, 1, 1, 2, 2, 2, 1])
  })

  test('watch 深层级监听', () => {
    const arr = []
    wxue({
      setup() {
        const xR = reactive({ y: 0 })
        watch(
          () => xR,
          (y, prevY) => {
            arr.push(y, prevY)
          },
          { deep: true }
        )
        xR.y++
        return { xR }
      },
    })
    expect(arr[2]).toEqual(arr[3])
  })

  test('watch 对象自动深层级监听', () => {
    const arr = []
    wxue({
      setup() {
        const xR = reactive({ y: 0 })
        watch(xR, (y, prevY) => {
          arr.push(y, prevY)
        })
        xR.y++
        return { xR }
      },
    })
    expect(arr[2]).toEqual(arr[3])
  })
})
