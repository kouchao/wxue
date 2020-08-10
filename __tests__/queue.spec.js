import Queue from '../src/queue'
describe('queue', () => {
  const queue = new Queue()
  const expected = [1, 'a', 2, 'b']
  test('push', () => {
    queue.push(1)
    queue.push('a')
    queue.push(2)
    queue.push('b')
    expect(queue.queue).toEqual(expect.arrayContaining(expected))
  })

  test('run', () => {
    const arr = []
    queue.run(function (item) {
      arr.push(item)
    })
    expect(arr).toEqual(expect.arrayContaining(expected))
    expect(queue.queue).toEqual(expect.arrayContaining([]))
  })

  test('isNull', () => {
    expect(queue.isNull()).toEqual(true)
    queue.push(1)
    expect(queue.isNull()).toEqual(false)
  })
})
