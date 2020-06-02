// Either函子应用
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

function parseJSON (str) {
  try {
    return Right.of(JSON.parse(str))
  } catch (e) {
    return Left.of({ error: e.message })
  }
}

console.log(parseJSON('{ name: "ws" }'))
// Left { _value: { error: 'Unexpected token n in JSON at position 2' } }

console.log(parseJSON('{ "name": "ws" }'))
// Right { _value: { name: 'ws' } }

console.log(parseJSON('{ "name": "ws" }').map(x => x.name.toUpperCase()))
// Right { _value: 'WS' }

