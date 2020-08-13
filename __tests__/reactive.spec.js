import { wxue, reactive } from '../src'
describe('reactive', () => {
  test('普通响应', () => {
    wxue({
      setup () {
        const obj = reactive({ a: 0, b: 0 })
        obj.a++
        return { obj }
      }
    })
  })
  // test('深度响应', () => {
  //   wxue({
  //     setup () {
  //       const deepObj = reactive({ a: { b: { c: 0 } }, b: 0 })
  //     }
  //   })
  // })
})
