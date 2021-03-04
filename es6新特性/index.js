let obj = {}
let a = Symbol('a')
let b = Symbol('b')

obj[a] = 'this is symbol a'
obj[b] = 'this is symbol b'

console.log(a);

let constants = {
    book: Symbol.for('book'),
    pen: Symbol()
}
let type = Symbol.for('book')
switch (type) {
    case constants.book:
        console.log('book');
        break
    case constants.pen:
        console.log('pen');
        break
    default:
        break
}

let arr = [11, 22, 33, 44, 11, 22, 44, 55, 66, 77, 44]
let setArr = new Set(arr)
setArr.add(11)
setArr.add(88)
setArr.add(66)
setArr.add(99)
console.log(setArr.has(11));
console.log(setArr.size);
for (const n of setArr) {
    console.log(n);
}

function* foo() {
    let a = 'hello world';
    yield a
    let b = 'hhhhhhhhh'
    yield b
    return
}
let f = foo()
console.log(f.next());
console.log(f.next());
console.log(f.next());
