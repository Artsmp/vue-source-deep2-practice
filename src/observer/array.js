/* 
  我们为什么要重写数组上的某些方法？
    1. 因为这些方法会改变原数组
    2. 我们不直接监听数组的下标，因为没有必要且浪费性能，我们监听的是数组中的对象类型的值
*/

let oldArrayPrototype = Array.prototype
export let arrayMethods = Object.create(oldArrayPrototype)
let methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'reserve', 'sort']

methods.forEach((method) => {
  arrayMethods[method] = function (...args) {
    const result = oldArrayPrototype[method].apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
      default:
        break
    }
    if(inserted) ob.observeArray(inserted) // 对新增的每一项进行侦测
    return result
  }
})
