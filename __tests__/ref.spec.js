import { wxue, ref, unref, toRef, toRefs, reactive, isRef } from '../src'
describe('ref', () => {
  test('ref', () => {
    wxue({
      setup () {
        const x = ref(1)
        const y = ref(x)
        x.value++
        expect(isRef(x)).toEqual(true)
        expect(x.value).toEqual(2)
        expect(y).toEqual(x)
        return { x }
      }
    })
  })

  test('unref', () => {
    wxue({
      setup () {
        const x = ref(1)
        const y = 1
        expect(unref(x)).toEqual(1)
        expect(unref(y)).toEqual(1)
        return { x }
      }
    })
  })

  test('toRef', () => {
    wxue({
      setup () {
        const test = reactive({ x: 1 })
        const x = toRef(test, 'x')
        expect(isRef(x)).toEqual(true)
        expect(x.value).toEqual(test.x)
        return { x }
      }
    })
  })

  test('toRefs', () => {
    wxue({
      setup () {
        const test = reactive({ x: 1 })
        const { x } = toRefs(test)
        expect(isRef(x)).toEqual(true)
        expect(x.value).toEqual(test.x)
        return { x }
      }
    })
  })
})
