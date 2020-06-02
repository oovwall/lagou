const { curry, compose } = require('folktale/core/lambda')
const { toUpper, first } = require('lodash/fp')

const f = curry(2, (a, b) => a + b)

console.log(f(1, 2)) // 3
console.log(f(1)(2)) // 3

const co = compose(toUpper, first)
console.log(co(['zhang', 'li'])) // ZHANG
