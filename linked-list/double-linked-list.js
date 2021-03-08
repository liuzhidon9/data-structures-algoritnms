import LinkedList from './linked-list.js'
import { defaultEquals } from "./utils.js"
import { DoubleNode } from "./models/linked-list-models.js"

class DoubleLinkedList extends LinkedList {
    constructor(equlaFn = defaultEquals) {
        super(equlaFn)
        this.tail = null //保存链表最后一个元素的引用
    }
    //在链表的尾部添加一个元素
    push(element) {
        const node = new DoubleNode(element)

        if (this.head === null) {
            this.head = node
            this.tail = node
            this.count++
            return
        }
        let current = this.tail
        node.prev = current
        current.next = node
        this.tail = node
        this.count++
    }
    //向双向链表中插入一个元素
    insert(element, index) {
        if (index < 0 || index > this.count) return false
        const node = new DoubleNode(element)
        if (index === 0) {
            let current = this.head
            if (this.head === null) {
                this.head = node
                this.tail = node
            } else {
                node.next = current
                current.prev = node
                this.head = node
            }
        } else if (index === this.count) {
            this.push(element)
        } else {
            let previous = this.getElementAt(index - 1)
            let current = previous.next
            node.prev = previous
            node.next = current
            previous.next = node
            current.prev = node
        }
        this.count++
        return true
    }
    //从任意位置移除一个元素并返回被移除的元素。
    removeAt(index) {
        if (index < 0 || index > this.count) return undefined
        if (index === 0) {//从链表头部移除
            let current = this.head
            this.head = current.next
            if (this.count === 1) {
                this.tail = null
            } else {
                this.head.prev = null
            }
            this.count--
            return current.element
        }
        if (index === this.count - 1) {//从链表尾部移除
            let current = this.tail
            this.tail = current.prev
            this.tail.next = null
            this.count--
            return current.element
        }
        //从链表中间移除
        let previous = this.getElementAt(index - 1)
        let current = previous.next
        // 将previous与current的下一项连接起来，跳过current
        previous.next = current.next
        current.next.prev = previous
        this.count--
        return current.element
    }
}

// let doubleLinkedList = new DoubleLinkedList()

// doubleLinkedList.push('a')
// doubleLinkedList.push('b')
// doubleLinkedList.push('c')
// doubleLinkedList.insert('d', 0)
// doubleLinkedList.removeAt(0)
// doubleLinkedList.removeAt(1)
// console.log("head: ", doubleLinkedList.head);
// console.log("tail: ", doubleLinkedList.tail);