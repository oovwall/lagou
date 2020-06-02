// Functor 函子
// 面向函数编程写法
class Container {
  // 静态方法通过类名调用
  static of (value) {
    return new Container(value)
  }
  constructor (value) {
    this._value = value
  }
  map (fn) {
    return Container.of(fn(this._value))
  }
}

let r = Container.of(5)
  .map(x => x + 1)
  .map(x => x * x)

console.log(r) // Container { _value: 36 }
