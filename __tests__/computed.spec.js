import { wxue, ref, computed } from '../src'
describe('computed', () => {
  test('计算属性', () => {
    wxue({
      setup() {
        const x = ref(1)
        const y = computed(() => x.value + 1)
        y.value++ // 错误

        expect(x.value).toEqual(1)
        expect(y.value).toEqual(2)
        return { x, y }
      },
    })
  })

  test('可写的计算属性', () => {
    wxue({
      setup() {
        const x = ref(1)
        const y = computed({
          get: () => x.value + 1,
          set: (val) => {
            x.value = val - 1
          },
        })

        y.value = 1

        expect(x.value).toEqual(0)
        expect(y.value).toEqual(1)
        return { x }
      },
    })
  })
})
