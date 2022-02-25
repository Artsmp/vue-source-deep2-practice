import { def, isObj } from "../util/index"
import { arrayMethods } from "./array"

class Observer {
  constructor(data) {
    def(data, '__ob__', this) // 标识当前数据已经被侦测过，并且就是重写数组方法的时候可以调用到当前实例上的方法
    if(Array.isArray(data)) {
      data.__proto__ = arrayMethods
      this.observeArray(data)
    } else {
      this.walk(data)
    }
  } 
  // 遍历数组并侦测每一项（如果数组中存放的值是对象才会侦测）
  observeArray(arr) {
    for(let i = 0; i < arr.length; i++) {
      observe(arr[i])
    }
  }
  walk(data) {
    Object.keys(data).forEach(key => {
      const value = data[key]
      defineReactive(data, key, value)
    })
  }
}

function defineReactive(data, key, value) {
  observe(value) // 深度侦测变化
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get() {
      return value
    },
    set(newVal) {
      if(value === newVal) return
      observe(newVal) // 设置值得时候也来一次深度侦测
      value = newVal
    }
  })
}

export function observe(data) {
  if (!isObj(data)) {
    // 如果不是对象则直接返回不进行侦测
    return
  }
  return new Observer(data)
}