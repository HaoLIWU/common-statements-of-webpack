console.log('Hello webpack')

var str = require('./a')

console.log(str)

require('./index.css')
require('./b.less')


let fn = () => {
    console.log('es6')
}
fn()

@log
class A {
    a = 1;
}
let a = new A()
console.log(a.a)

function log(target) {
    console.log(target + '21')
}