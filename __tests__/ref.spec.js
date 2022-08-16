import {
  wxue,
  ref,
  unref,
  toRef,
  toRefs,
  reactive,
  isRef,
  shallowRef,
  watchEffect,
} from '../src'
describe('ref', () => {
  test('ref', () => {
    wxue({
      setup() {
        const x = ref(1)
        const y = ref(x)
        x.value++
        expect(isRef(x)).toEqual(true)
        expect(x.value).toEqual(2)
        expect(y).toEqual(x)
        return { x }
      },
    })
  })

  test('unref', () => {
    wxue({
      setup() {
        const x = ref(1)
        const y = 1
        expect(unref(x)).toEqual(1)
        expect(unref(y)).toEqual(1)
        return { x }
      },
    })
  })

  test('toRef', () => {
    wxue({
      setup() {
        const x = reactive({ y: 1 })
        const y = toRef(x, 'y')
        expect(isRef(y)).toEqual(true)
        expect(y.value).toEqual(x.y)
        return { x, y }
      },
    })
  })

  test('toRef', () => {
    wxue({
      setup() {
        const x = reactive({
          y: 1,
        })

        const yRef = toRef(x, 'y')

        // 更改该 ref 会更新源属性
        yRef.value++
        expect(x.y).toEqual(2)

        // 更改源属性也会更新该 ref
        x.y++
        expect(yRef.value).toEqual(3)
        return { x, yRef }
      },
    })
  })

  test('toRefs', () => {
    wxue({
      setup() {
        const x = reactive({ y: 1 })
        const { y } = toRefs(x)
        expect(isRef(y)).toEqual(true)
        expect(y.value).toEqual(x.y)
        return { y }
      },
    })
  })

  test('shallowRef', () => {
    const arr = []
    wxue({
      setup() {
        const x = shallowRef({ y: 1 })

        watchEffect(() => {
          arr.push(x.value.y)
        })
        // 不会触发更改
        x.value.y = 2
        // 会触发更改
        x.value = { y: 2 }
        return { x }
      },
    })
    expect(arr).toEqual([1, 2])
  })
})
