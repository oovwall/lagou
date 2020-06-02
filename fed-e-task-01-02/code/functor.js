// Functor 函子
// 面向对象写法
class Container {
  constructor (value) {
    this._value = value
  }
  map (fn) {
    return new Container(fn(this._value))
  }
}

let r = new Container(5)
  .map(x => x + 1)
  .map(x => x * x)

console.log(r) // Container { _value: 36 }
