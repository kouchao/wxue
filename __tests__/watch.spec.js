import { wxue, watchEffect, watch, ref } from '../src'
describe('Watcher', () => {
  test('watchEffect 正常使用', () => {
    const arr = []
    wxue({
      setup () {
        const x = ref(1)
        watchEffect(() => {
          arr.push(x.value)
        })
        x.value++
        return { x }
      }
    })
    expect(arr).toEqual([1, 2])
  })

  test('watchEffect参数应该是个函数', () => {
    wxue({
      setup () {
        const x = ref(1)
        watchEffect(1)
        x.value++
        return { x }
      }
    })
  })

  test('watchEffect的stop方法', () => {
    const arr = []
    wxue({
      setup () {
        const x = ref(1)
        const stop = watchEffect(() => {
          arr.push(x.value)
        })
        x.value++
        stop()
        x.value++
        return { x }
      }
    })
    expect(arr).toEqual([1, 2])
  })

  test('watch 正常使用', () => {
    const arr = []
    wxue({
      setup () {
        const x = ref(1)
        watch(x, (v, preV) => {
          arr.push(v)
          arr.push(preV)
        })
        x.value++
        return { x }
      }
    })
    expect(arr).toEqual([1, undefined, 2, 1])
  })
})
