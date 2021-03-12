export class Node {
    constructor(key) {
        this.key = key //节点值
        this.left = null //左侧子节点引用
        this.right = null //右侧子节点引用
    }
}

export const Colors = {
    RED:'red',
    BLACK:'black'
}
export class RedBlackNode extends Node{
    constructor(key){
        super(key)
        this.key = key
        this.color = Colors.RED //默认情况下创建的节点是红色的。
        this.parent = null
    }
    isRed(){
        return this.color === Colors.RED
    }
}