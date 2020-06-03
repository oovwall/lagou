const fs = require('fs')
const fp = require('lodash/fp')

class IO {
  static of (value) {
    return new IO(function () {
      return value
    })
  }
  constructor (fn) {
    this._value = fn
  }
  map (fn) {
    return new IO(fp.flowRight(fn, this._value))
  }
  join () {
    return this._value()
  }
  flatMap (fn) {
    return this.map(fn).join()
  }
}

const readFile = function (filename) {
  return new IO(function () {
    return fs.readFileSync(filename, 'utf-8')
  })
}

const print = function (x) {
  return new IO(function () {
    return x
  })
}

const r = readFile('../../package.json') // 返回新函子对象
  /**
   * IO { _value: function () {
   *   return 读取的文件结果
   * }}
   */
  .flatMap(print)
  /**
   * 接收上次包含读取文件结果的函子进行链式调用
   * new IO(fp.flowRight(, 上次返回的文件结果))
   */
  .join()

console.log(r)
