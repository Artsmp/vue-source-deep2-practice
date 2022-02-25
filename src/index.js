import { initMixin } from './init'

function Vue(options) {
  this._init(options)
}

initMixin(Vue) // 给原型上增加了 _init 方法

export default Vue
