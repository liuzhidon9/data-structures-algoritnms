import { Compare, defaultCompare } from './utils.js'
import { Node } from './model.js'
import BinarySearchTree from './binary-search-tree.js'


const BalanceFactor = {
    UNBALANCE_RIGHT: 1,
    SLIGHTLY_UNBALANCE_RIGHT: 2,
    BALANCE: 3,
    UNBALANCE_LEFT: 4,
    SLIGHTLY_UNBALANCE_LEFT: 5
}

class AVLTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn)
        this.compareFn = compareFn
        this.root = null
    }
    //获取节点的高度
    getNodeHeight(node) {
        if (node === null) return -1
        return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1
    }

    // 获取节点平衡因子
    getBalanceFactor(node) {
        let heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right)
        switch (heightDifference) {
            case -2:
                return BalanceFactor.UNBALANCE_RIGHT
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCE_RIGHT
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCE_LEFT
            case 2:
                return BalanceFactor.UNBALANCE_LEFT
            default:
                return BalanceFactor.BALANCE
        }
    }

    //左侧比较重，向右的单旋转
    rotationLL(node) {
        let tmp = node.left
        node.left = tmp.right
        tmp.right = node
        return tmp
    }

    //右侧比较重，向左的单旋转
    rotationRR(node) {
        let tmp = node.right
        node.right = tmp.left
        tmp.left = node
        return tmp
    }

    //向右的双旋转,节点的左侧子节点高度大于右侧子节点高度，且左侧子节点的右侧较重。
    rotationLR(node) {
        node.left = this.rotationRR(node.left)
        return this.rotationLL(node)
    }

    // 向左的双旋转,节点的右侧子节点高度大于左侧子节点高度，且右侧子节点的左侧较重。
    rotationRL(node) {
        node.right = this.rotationLL(node.right)
        return this.rotationRR(node)
    }

    //插入节点
    insert(key) {
        this.root = this.insertNode(this.root, key)
    }
    insertNode(node, key) {
        if (node === null) {
            return new Node(key)
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.insertNode(node.left, key)
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.insertNode(node.right, key)
        } else {//重复的键
            return node
        }

        // 检查节点是否需要进行平衡操作
        let balanceFactor = this.getBalanceFactor(node) //获取节点平衡因子
        if (balanceFactor === BalanceFactor.UNBALANCE_LEFT) {
            if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
                node = this.rotationLL(node)
            } else {
                node = this.rotationLR(node)
            }
        }
        if (balanceFactor === BalanceFactor.UNBALANCE_RIGHT) {
            if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
                node = this.rotationRR(node)
            } else {
                node = this.rotationRL(node)
            }
        }
        return node
    }

    //移除一个节点
    remove(key) {
        this.root = this.removeNode(this.root, key)
    }
    removeNode(node, key) {
        node = super.removeNode(node, key)
        if (node === null) return null

        //    移除某个键后检查是否需要平衡操作
        let balanceFactor = this.getBalanceFactor(node)
        console.log(balanceFactor,node);
        if (balanceFactor === BalanceFactor.UNBALANCE_LEFT) {
            let factorLeft = this.getBalanceFactor(node.left)
            if (factorLeft === BalanceFactor.BALANCE || BalanceFactor.SLIGHTLY_UNBALANCE_LEFT) {
                return this.rotationLL(node)
            }
            if (factorLeft === BalanceFactor.SLIGHTLY_UNBALANCE_RIGHT) {
                return this.rotationLR(node)
            }

        }
        if (balanceFactor === BalanceFactor.UNBALANCE_RIGHT) {
            let factorRight = this.getBalanceFactor(node.right)
            if (factorRight === BalanceFactor.BALANCE ||factorRight=== BalanceFactor.SLIGHTLY_UNBALANCE_RIGHT) {
                return this.rotationRR(node)
            }
            if (factorRight === BalanceFactor.SLIGHTLY_UNBALANCE_LEFT) {
                return this.rotationRL(node)
            }

        }
        return node
    }

}

let avlTree = new AVLTree()
avlTree.insert(50)
avlTree.insert(70)
avlTree.insert(80)
avlTree.insert(90)
avlTree.insert(72)
avlTree.insert(75)
avlTree.insert(73)
avlTree.insert(74)
console.log(avlTree.root);
avlTree.remove(50)
console.log(avlTree.root);