import { observe } from "./observer/index";

export function initState(vm) {
  // 根据不同属性进行不同操作
  const options = vm.$options
  if (options.props) {
    initProps(vm)
  }
  if (options.methods) {
    initMethod(vm)
  }
  if (options.data) {
    initData(vm)
  }
  if (options.computed) {
    initComputed(vm)
  }
  if (options.watch) {
    initWatch(vm)
  }
}
function initProps(vm) {}
function initMethod(vm) {}
function initData(vm) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data
  observe(data)
}
function initComputed(vm) {}
function initWatch(vm) {}
