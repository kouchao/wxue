import {
  wxue,
  ref,
  isRef,
  isProxy,
  reactive,
  readonly,
  shallowReactive,
  shallowReadonly,
  isReactive,
  isReadonly,
} from '../src'
describe('Watcher', () => {
  test('isRef', () => {
    wxue({
      setup() {
        const x = 1
        const y = ref(1)

        expect(isRef(x)).toEqual(false)
        expect(isRef(y)).toEqual(true)
        return { x, y }
      },
    })
  })

  test('isProxy', () => {
    wxue({
      setup() {
        const x = reactive({ y: 1 })
        const y = readonly(x)
        const z = shallowReactive({ y: 1 })
        const a = shallowReadonly(z)
        const b = 1
        const c = ref(1)

        expect(isProxy(x)).toEqual(true)
        expect(isProxy(y)).toEqual(true)
        expect(isProxy(z)).toEqual(true)
        expect(isProxy(a)).toEqual(true)
        expect(isProxy(b)).toEqual(false)
        expect(isProxy(c)).toEqual(false)
        return { x, y }
      },
    })
  })
  test('isReactive', () => {
    wxue({
      setup() {
        const x = reactive({ y: 1 })
        const y = readonly(x)
        const z = shallowReactive({ y: 1 })
        const a = shallowReadonly(z)
        const b = 1
        const c = ref(1)

        expect(isReactive(x)).toEqual(true)
        expect(isReactive(y)).toEqual(true)
        expect(isReactive(z)).toEqual(true)
        expect(isReactive(a)).toEqual(true)
        expect(isReactive(b)).toEqual(false)
        expect(isReactive(c)).toEqual(false)
        return { x, y }
      },
    })
  })

  test('isReadonly', () => {
    wxue({
      setup() {
        const x = reactive({ y: 1 })
        const y = readonly(x)
        const z = shallowReactive({ y: 1 })
        const a = shallowReadonly(z)
        const b = 1
        const c = ref(1)

        expect(isReadonly(x)).toEqual(false)
        expect(isReadonly(y)).toEqual(true)
        expect(isReadonly(z)).toEqual(false)
        expect(isReadonly(a)).toEqual(true)
        expect(isReadonly(b)).toEqual(false)
        expect(isReadonly(c)).toEqual(false)
        return { x, y }
      },
    })
  })
})
