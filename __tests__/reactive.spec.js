import { wxue, reactive, nextTick } from '../src'
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
})
