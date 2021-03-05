export class Node {
    constructor(element) {
        this.element = element
        this.next = null
    }
}

export class DoubleNode extends Node {
    constructor(element) {
        super(element)
        this.prev = null
    }
}