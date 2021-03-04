class Stack {
    constructor() {
        this.count = 0
        this.items = {}
    }
    push(element) {
        this.items[this.count] = element
        this.count++
    }
    size() {
        return this.count
    }
    isEmpty() {
        return this.count === 0
    }
    pop() {
        if (this.isEmpty()) return undefined
        this.count--
        let result = this.items[this.count]
        delete this.items[this.count]
        return result
    }
    peek() {
        if (this.isEmpty()) return undefined
        return this.items[this.count - 1]
    }
    clear() {
        this.items = {}
        this.count = 0
    }
    toString(){
        if (this.isEmpty()) return ''
        let objString = this.items[0]
        for (let i = 1; i < this.count; i++){
            objString = `${objString},${this.items[i]}`
        }
        return objString
    }
}

export default Stack 

// let stack = new Stack()
// stack.push('a')
// stack.push('b')
// stack.push('c')
// console.log("must c: ", stack.peek());
// console.log(stack.pop());
// console.log("must b: ", stack.peek());
// console.log("isEmpty: ", stack.isEmpty())
// console.log("size: ", stack.size())
// console.log("toString: ",stack.toString());