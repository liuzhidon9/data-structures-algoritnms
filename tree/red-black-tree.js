import { Compare, defaultCompare } from './utils.js'
import { RedBlackNode, Colors } from './model.js'
import BinarySearchTree from './binary-search-tree.js'

class RedBlackTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn)
        this.compareFn = compareFn
        this.root = null
    }
    insert(key) {
        if (this.root === null) {
            this.root = new RedBlackNode(key)
            this.root.color = Colors.BLACK
            return
        }
        let newNode = this.insertNode(this.root, key)
        this.fixTreeProperties(newNode)
    }
    insertNode(node, key) {
        //第一种情况，左侧插入
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left === null) {
                node.left = new RedBlackNode(key)
                node.left.parent = node
                return node.left
            }
            return this.insertNode(node.left, key)
        }
        //第二种情况，右侧插入
        if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            if (node.right === null) {
                node.right = new RedBlackNode(key)
                node.right.parent = node
                return node.right
            }
            return this.insertNode(node.right, key)
        }
        //第三种情况，相同的键，不用操作
        return null
    }

    rotationRR(node) {
        if (node === null) return
        let tmp = node.right
        node.right = tmp.left
        tmp.parent = node.parent
        if (tmp.left && tmp.left.key) {
            tmp.left.parent = node
        }
        if (!node.parent) {
            this.root = tmp
        } else {
            if (node === node.parent.left) {
                node.parent.left = tmp
            } else {
                node.parent.right = tmp
            }
        }

        tmp.left = node
        node.parent = tmp
    }
    rotationLL(node) {
        let tmp = node.left
        node.left = tmp.right
        if (tmp.right && tmp.right.key) {
            tmp.right.parent = node
        }
        tmp.parent = node.parent
        if (!node.parent) {
            this.root = tmp
        } else {
            if (node === node.parent.right) {
                node.parent.right = tmp
            } else {
                node.parent.left = tmp
            }
        }
        tmp.right = node
        node.parent = tmp
    }

    fixTreeProperties(node) {
        while (node && node.parent && node.isRed() && node.parent.isRed()) {
            let parent = node.parent
            let grandParent = parent.parent

            //第一种情况：父节点是左侧子节点
            if (grandParent && grandParent.left === parent) {
                let uncle = grandParent.right
                //情况A:叔节点存在并且颜色是红色的。
                if (uncle && uncle.isRed()) {
                    grandParent.color = Colors.RED
                    parent.color = Colors.BLACK
                    uncle.color = Colors.BLACK
                    node = grandParent
                    continue
                }
                //父节点的右侧节点较重
                if (node === parent.right) {
                    this.rotationRR(parent) //向左的单旋转
                    node = parent
                    parent = node.parent
                }
                this.rotationLL(grandParent)
                parent.color = Colors.BLACK
                grandParent.color = Colors.RED
                node = parent
                continue
            }

            //第二种情况：父节点是右子节点
            if (grandParent && grandParent.right === parent) {
                let uncle = grandParent.left
                if (uncle && uncle.isRed()) {
                    grandParent.color = Colors.RED
                    parent.color = Colors.BLACK
                    uncle.color = Colors.BLACK
                    node = grandParent
                    continue
                }
                //父节点左侧较重
                if (parent.left === node) {
                    this.rotationLL(parent)
                    node = parent
                    parent = node.parent
                }
                this.rotationRR(grandParent)
                parent.color = Colors.BLACK
                grandParent.color = Colors.RED
                node = parent
            }
        }
        this.root.color = Colors.BLACK
    }

    // remove(key) {
    //     this.root = this.removeNode(this.root, key)
    // }
    // removeNode(node, key) {
    //     if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
    //         node.left = this.removeNode(node.left, key)
    //         return node
    //     }
    //     if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
    //         node.right = this.removeNode(node.right, key)
    //         return node
    //     }

    //     if (node.left === null && node.right === null) {
    //         return null
    //     }

    //     if (node.left && node.right === null) {
    //         let tmp = node.left
    //         tmp.parent = node
    //         return tmp
    //     }
    //     if (node.right && node.left === null) {
    //         let tmp = node.right
    //         tmp.parent = node
    //         return tmp
    //     }

    //     let min = super.minNode(node.right)
    //     node.key = min
    //     node.right = this.removeNode(node.right, min)
    //     return node
    // }
}

let redBlackTree = new RedBlackTree()
redBlackTree.insert(1)
redBlackTree.insert(2)
redBlackTree.insert(3)
redBlackTree.insert(4)
redBlackTree.insert(5)
redBlackTree.insert(6)
redBlackTree.insert(7)
redBlackTree.insert(8)
console.log(redBlackTree.root);