class Deque {
    constructor() {
        this.count = 0
        this.lowestCount = 0
        this.items = {}
    }
    //向前端添加新的元素
    addFront(element) {
        if (this.isEmpty()) {
            this.addBack(element)
            return
        }
        if (this.lowestCount > 0) {
            this.lowestCount--
            this.items[this.lowestCount] = element
            return
        }

        for (let i = 1; i <= this.count; i++) {
            this.items[i] = this.items[i - 1]
        }
        this.count++
        this.items[0] = element
    }
    //向后端添加新的元素
    addBack(element) {
        this.items[this.count] = element
        this.count++
    }
    // 从前端移除第一个元素
    removeFront() {
        if (this.isEmpty()) return ''
        let result = this.items[this.lowestCount]
        delete this.items[this.lowestCount]
        this.lowestCount++
        return result
    }
    // 从后端移除第一个元素
    removeBack() {
        if (this.isEmpty()) return ''
        let result = this.items[this.count - 1]
        delete this.items[this.count - 1]
        this.count--
        return result
    }
    //查看前端第一个元素
    peekFront() {
        return this.items[this.lowestCount]
    }
    //查看后端第一个元素
    peekBack() {
        return this.items[this.count - 1]
    }
    //检查队列是否为空
    isEmpty() {
        return this.count - this.lowestCount === 0
    }
    //查看队列内的元素个数
    size() {
        return this.count -this.lowestCount
    }
    toString() {
        if (this.isEmpty()) return ''
        let objString = this.items[this.lowestCount]
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`
        }
        return objString
    }
}

export default Deque
// let deque = new Deque()

// deque.addBack('a')
// deque.addBack('b')
// deque.addBack('c')
// deque.removeFront()
// console.log("must be b,c: ", deque.toString());
// deque.addFront('d')
// console.log("must be d,b,c: ", deque.toString());
// console.log("size must be 3: ", deque.size());