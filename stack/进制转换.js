import Stack from './stack-object.js'

function baseConverter(decNumber, base) {
    let stack = new Stack()
    let rem = 0
    let number = decNumber
    let digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let baseString = ''

    if (!(base >= 2 && base <= 36)) return ''

    while (number > 0) {
        rem = Math.floor(number % base)
        stack.push(rem)
        number = Math.floor(number / base)
    }

    while (!stack.isEmpty()) {
        baseString += digits[stack.pop()]
    }

    return baseString

}

console.log(baseConverter(5, 2));