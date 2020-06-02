// Either函子
class Left {
  static of (value) {
    return new Left(value)
  }
  constructor (value) {
    this._value = value
  }
  map (fn) {
    return this
  }
}

class Right {
  static of (value) {
    return new Right(value)
  }
  constructor (value) {
    this._value = value
  }
  map (fn) {
    return Right.of(fn(this._value))
  }
}

let r1 = Left.of(12).map(x => x + 2)
let r2 = Right.of(12).map(x => x + 2)
console.log(r1) // Left { _value: 12 }
console.log(r2) // Right { _value: 14 }
