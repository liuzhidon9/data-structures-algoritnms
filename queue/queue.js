class Queue {
    constructor() {
        this.count = 0 //控制队列的大小
        this.lowestCount = 0 //用来追踪第一个元素
        this.items = {}
    }
    //enqueue向队列末尾添加一个元素
    enqueue(element) {
        this.items[this.count] = element
        this.count++
    }
    //isEmpty查看队列是否为空
    isEmpty() {
        return (this.count - this.lowestCount) === 0
    }
    //dequeue移除队列的第一个元素并返回被移除的元素
    dequeue() {
        if (this.isEmpty()) return ''
        let reuslt = this.items[this.lowestCount]
        delete this.items[this.lowestCount]
        this.lowestCount++
        return reuslt
    }
    //peek查看队列头元素
    peek() {
        if (this.isEmpty()) return ''
        return this.items[this.lowestCount]
    }
    //size查看队列的元素个数
    size() {
        return this.count - this.lowestCount
    }
    //clear清空队列
    clear() {
        this.count = 0
        this.lowestCount = 0
        this.items = {}
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
export default Queue
// let queue = new Queue()
// queue.enqueue('a')
// queue.enqueue('b')
// queue.enqueue('c')
// console.log("must be a",queue.peek());
// queue.dequeue()
// console.log("must be b",queue.peek());
// console.log("toString",queue.toString());