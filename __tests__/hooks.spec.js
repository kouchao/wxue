import { wxue, onShow, onLoad } from '../src'
describe('hooks', () => {
  test('onShow', () => {
    const arr = []
    wxue({
      setup () {
        onShow(() => {
          arr.push(1)
        })
        onShow(() => {
          arr.push(2)
        })
        return {}
      },
      onShow () {
        arr.push(3)
      }
    })
    expect(arr).toEqual([1, 2, 3])
  })

  test('onLoad', () => {
    const arr = []
    wxue({
      setup () {
        onLoad(() => {
          arr.push(1)
        })
        onLoad(() => {
          arr.push(2)
        })
        return {}
      },
      onLoad () {
        arr.push(3)
      }
    })
    expect(arr).toEqual([1, 2, 3])
  })
})
