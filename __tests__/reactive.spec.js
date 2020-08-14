import { wxue, reactive, nextTick, readonly } from '../src'
describe('reactive', () => {
  test('普通响应', done => {
    wxue({
      setup () {
        const obj = reactive({ a: 0, b: 0 })
        function add () {
          obj.a++
        }
        return { obj, add }
      },
      async onLoad () {
        this.add()
        await nextTick()
        expect(this.data.obj.a).toEqual(1)
        done()
      }
    })
  })
  test('深度响应', done => {
    wxue({
      setup () {
        const obj = reactive({ a: { b: { c: { d: 0 } } }, b: 0 })
        function add () {
          obj.a.b.c.d++
        }
        return { obj, add }
      },
      async onLoad () {
        this.add()
        await nextTick()
        expect(this.data.obj.a.b.c.d).toEqual(1)
        done()
      }
    })
  })
  test('readonly 普通响应对象', done => {
    wxue({
      setup () {
        const original = reactive({ count: 0 })
        const copy = readonly(original)

        function originalAdd () {
          original.count++
        }

        function copyAdd () {
          copy.count++
        }

        return {
          original,
          copy,
          originalAdd,
          copyAdd
        }
      },
      async onLoad () {
        this.originalAdd()
        this.copyAdd()
        await nextTick()
        expect(this.data.original.count).toEqual(1)
        expect(this.data.copy.count).toEqual(1)
        done()
      }
    })
  })
  test('readonly 深度响应对象', done => {
    wxue({
      setup () {
        const original = reactive({ a: { b: { c: { d: 0 } } }, b: 0 })
        const copy = readonly(original)

        function originalAdd () {
          original.a.b.c.d++
        }

        function copyAdd () {
          copy.a.b.c.d++
        }

        return {
          original,
          copy,
          originalAdd,
          copyAdd
        }
      },
      async onLoad () {
        this.originalAdd()
        this.copyAdd()
        await nextTick()
        console.log(this.data.original.a.b)
        console.log(this.data.copy.a.b)
        expect(this.data.original.a.b.c.d).toEqual(1)
        expect(this.data.copy.a.b.c.d).toEqual(1)
        done()
      }
    })
  })
})
