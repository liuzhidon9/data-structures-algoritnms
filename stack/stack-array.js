class Stack {
    constructor() {
        this.items = []
    }
    //添加一个或几个元素到栈顶
    push(element) {
        this.items.push(element)
    }
    //移除栈顶的元素，同时返回被移除的元素。
    pop() {
        return this.items.pop()
    }
    //查看栈顶的元素
    peek() {
        return this.items[this.items.length - 1]
    }
    //如果栈里没有元素就返回true，否则返回false。
    isEmpty() {
        return !Boolean(this.items.length)
    }
    //移除栈里的所有元素。
    clear() {
        this.items = []
    }
    //返回栈里的元素个数
    size() {
        return this.items.length
    }
    toString(){
        return this.items.toString()
    }

}

let stack = new Stack()
stack.push('a')
stack.push('b')
stack.push('c')
console.log("must c: ", stack.peek());
console.log(stack.pop());
console.log("must b: ", stack.peek());
console.log("isEmpty: ", stack.isEmpty())
console.log("size: ", stack.size())
console.log("toString: ",stack.toString());