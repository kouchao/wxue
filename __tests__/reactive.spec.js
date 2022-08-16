import { wxue, reactive, nextTick, readonly, ref } from '../src'
describe('reactive', () => {
  test('普通响应', (done) => {
    wxue({
      setup() {
        const y = reactive({ a: 0, b: 0 })
        function add() {
          y.a++
        }
        return { y, add }
      },
      async onLoad() {
        this.add()
        await nextTick()
        expect(this.data.y.a).toEqual(1)
        done()
      },
    })
  })
  test('深度响应', (done) => {
    wxue({
      setup() {
        const y = reactive({ a: { b: { c: { d: 0 } } }, b: 0 })
        function add() {
          y.a.b.c.d++
        }
        return { y, add }
      },
      async onLoad() {
        this.add()
        await nextTick()
        expect(this.data.y.a.b.c.d).toEqual(1)
        done()
      },
    })
  })
  test('readonly 普通响应对象', (done) => {
    wxue({
      setup() {
        const x = reactive({ x: 0 })
        const y = readonly(x)

        function xAdd() {
          x.x++
        }

        function yAdd() {
          y.x++
        }

        return {
          x,
          y,
          xAdd,
          yAdd,
        }
      },
      async onLoad() {
        this.xAdd()
        this.yAdd()
        await nextTick()
        expect(this.data.x.x).toEqual(1)
        expect(this.data.y.x).toEqual(1)
        done()
      },
    })
  })
  test('readonly 深度响应对象', (done) => {
    wxue({
      setup() {
        const x = reactive({ a: { b: { c: { d: 0 } } }, b: 0 })
        const y = readonly(x)

        function xAdd() {
          x.a.b.c.d++
        }

        function yAdd() {
          y.a.b.c.d++
        }

        return {
          x,
          y,
          xAdd,
          yAdd,
        }
      },
      async onLoad() {
        this.xAdd()
        this.yAdd()
        await nextTick()
        console.log(this.data.x.a.b)
        console.log(this.data.y.a.b)
        expect(this.data.x.a.b.c.d).toEqual(1)
        expect(this.data.y.a.b.c.d).toEqual(1)
        done()
      },
    })
  })
  test('ref 的解包', () => {
    wxue({
      setup() {
        const x = ref(1)
        const y = reactive({ x })

        // ref 会被解包
        expect(y.x).toEqual(x.value)

        // 会更新 `y.x`
        x.value++
        expect(x.value).toEqual(2)
        expect(y.x).toEqual(2)

        // 也会更新 `x` ref
        y.x++
        expect(x.value).toEqual(3)
        expect(y.x).toEqual(3)

        return {
          y,
          x,
        }
      },
    })
  })
  test('响应式数组不会执行 ref 的解包', () => {
    wxue({
      setup() {
        const x = reactive([ref(1)])

        expect(x[0].value).toEqual(1)

        return {
          x,
        }
      },
    })
  })
  test('Map 不会执行 ref 的解包', () => {
    wxue({
      setup() {
        const x = reactive(new Map([['y', ref(1)]]))

        expect(x.get('y').value).toEqual(1)

        return {
          x,
        }
      },
    })
  })
})
