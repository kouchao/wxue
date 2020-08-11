import Queue from '../src/queue'
describe('queue', () => {
  const queue = new Queue()
  const expected = [1, 'a', 2, 'b']
  test('Queue.push', () => {
    queue.push(1)
    queue.push('a')
    queue.push(2)
    queue.push('b')
    expect(queue.queue).toEqual(expected)
  })

  test('Queue.run', () => {
    const arr = []
    queue.run(function (item) {
      arr.push(item)
    })
    expect(arr).toEqual(expected)
    expect(queue.queue).toEqual([])
  })

  test('Queue.isNull', () => {
    expect(queue.isNull()).toEqual(true)
    queue.push(1)
    expect(queue.isNull()).toEqual(false)
  })
})
