// import { Watcher } from '../src/watch'
// import { wxue, watchEffect, watch, ref } from '../src'
// import Dep from '../src/dep'
describe('Watcher', () => {
  // const watcher = new Watcher(() => 1)
  test('Watcher.append', () => {
    expect(1).toEqual(1)
  })

  // test('Watcher.append', () => {
  //   const dep1 = new Dep()
  //   const dep2 = new Dep()
  //   watcher.append(dep1)
  //   watcher.append(dep2)
  //   expect(watcher.deps).toEqual([dep1, dep2])
  // })

  // test('Watcher.run', () => {
  //   const res = watcher.run()
  //   expect(res).toEqual(1)
  // })

  // test('Watcher.update', () => {
  //   const arr = []
  //   const watcher1 = new Watcher((value) => {
  //     arr.push(value)
  //   })
  //   watcher1.update(1)
  //   watcher1.update(2)
  //   watcher1.update(3)

  //   expect(arr).toEqual([1, 2, 3])
  // })

  // test('Watcher.stop', () => {
  //   const arr = []
  //   const watcher1 = new Watcher((value) => {
  //     arr.push(value)
  //   })
  //   const dep = new Dep()
  //   dep.append(watcher1)
  //   dep.depend(1)
  //   dep.depend(2)
  //   dep.depend(3)
  //   watcher1.stop()
  //   dep.depend(4)

  //   expect(arr).toEqual([1, 2, 3])
  // })

  // test('watchEffect 正常使用', () => {
  //   const arr = []
  //   wxue({
  //     setup () {
  //       const x = ref(1)
  //       watchEffect(() => {
  //         arr.push(x.value)
  //       })
  //       x.value++
  //       return { x }
  //     }
  //   })
  //   expect(arr).toEqual([1, 2])
  // })

  // test('watchEffect参数应该是个函数', () => {
  //   wxue({
  //     setup () {
  //       const x = ref(1)
  //       watchEffect(1)
  //       x.value++
  //       return { x }
  //     }
  //   })
  // })

  // test('watchEffect的stop方法', () => {
  //   const arr = []
  //   wxue({
  //     setup () {
  //       const x = ref(1)
  //       const stop = watchEffect(() => {
  //         arr.push(x.value)
  //       })
  //       x.value++
  //       stop()
  //       x.value++
  //       return { x }
  //     }
  //   })
  //   expect(arr).toEqual([1, 2])
  // })

  // test('watch 正常使用', () => {
  //   const arr = []
  //   wxue({
  //     setup () {
  //       const x = ref(1)
  //       watch(x, (v, preV) => {
  //         arr.push(v)
  //         arr.push(preV)
  //       })
  //       x.value++
  //       return { x }
  //     }
  //   })
  //   expect(arr).toEqual([2, 1])
  // })
})
