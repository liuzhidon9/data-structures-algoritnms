## 树 Tree

一个树结构包含一系列存在父子关系的节点，每个节点都有一个父节点（除了顶部第一个节点没有父节点）以及零个或多个子节点。

**术语：**

1. `根节点`：位于树顶部的节点，它没有父节点。
2. `内部节点`：只有一个子节点的节点。
3. `外部节点`：没有子节点的节点。
4. `子树`：子树有节点和它的后代构成。

### 二叉树和二叉搜索树

`二叉树中的节点最多只能有两个子节点：一个是左侧节点，另一个是右侧节点。`

**二叉搜索树（BST）** `是二叉树的一种,但是只允许你在左侧节点存储比父节点小的值，右侧节点存储比父节点大的值。`

**二叉树需要实现的方法：**

1. insert(key)：向树中插入一个新的键。
2. search(key)：在树中查找一个键，如果节点存在则返回 true，否则返回 false。
3. inOrderTraverse()：通过中序遍历方式遍历所有节点。
4. preOrderTraverse()：通过先序遍历方式遍历所有节点。
5. postOrderTraverse()：通过后序遍历方式遍历所有节点。
6. min()：返回树中最小的值/键。
7. max()：返回树中最大的值/键。
8. search(key)：在树中搜索特定值，有则返回 true，否则返回 false。
9. remove(key)：从树中移除某个键。

**BST 遍历：**

- `中序遍历`：以一种上行顺序访问 BST 的所有节点，也就是从最小到最大的顺序访问所有节点(排序操作)。
- `先序遍历`：以优先于后代节点的顺序访问每个节点，先序遍历的一种应用是打印一个结构化的文档。
- `后序遍历`：先访问节点的后代节点，再访问节点本身。后序遍历的一种应用是计算一个目录及其子目录中所有文件占空间的大小。

**搜索树中的值：**

- 搜索最小值
- 搜索最大值
- 搜索特定值

### 二叉搜索树 BST 代码实现

```js
import { Compare, defaultCompare } from "./utils.js";
class Node {
  constructor(key) {
    this.key = key; //节点值
    this.left = null; //左侧子节点引用
    this.right = null; //右侧子节点引用
  }
}

class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.root = null; //Node类型的根节点
  }
  // 向树中插入一个新的键
  insert(key) {
    if (this.root === null) {
      this.root = new Node(key);
      return;
    }
    this.insertNode(this.root, key);
  }
  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      //左侧插入
      if (node.left === null) {
        node.left = new Node(key);
        return;
      }
      this.insertNode(node.left, key);
    } else {
      //右侧插入
      if (node.right === null) {
        node.right = new Node(key);
        return;
      }
      this.insertNode(node.right, key);
    }
  }
  //通过中序遍历访问所有节点
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }
  inOrderTraverseNode(node, callback) {
    if (node === null) return;
    this.inOrderTraverseNode(node.left, callback);
    callback(node.key);
    this.inOrderTraverseNode(node.right, callback);
  }
  //先序遍历
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }
  preOrderTraverseNode(node, callback) {
    if (node === null) return;
    callback(node.key);
    this.preOrderTraverseNode(node.left, callback);
    this.preOrderTraverseNode(node.right, callback);
  }

  //后序遍历
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }
  postOrderTraverseNode(node, callback) {
    if (node === null) return;
    this.postOrderTraverseNode(node.left, callback);
    this.postOrderTraverseNode(node.right, callback);
    callback(node.key);
  }

  //返回树中最小的值/键
  min() {
    return this.minNode(this.root);
  }
  minNode(node) {
    if (node != null && node.left == null) return node.key;
    return this.minNode(node.left);
  }
  // 返回树中最大的值/键
  max() {
    return this.maxNode(this.root);
  }
  maxNode(node) {
    if (node != null && node.right == null) return node.key;
    return this.maxNode(node.right);
  }

  //在树中搜索特定值，有则返回true，否则返回false。
  search(key) {
    return this.searchNode(this.root, key);
  }
  searchNode(node, key) {
    if (node === null) return false;
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key);
    }
    if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key);
    }
    return true;
  }

  //从树中移除某个键
  remove(key) {
    this.root = this.removeNode(this.root, key);
  }
  removeNode(node, key) {
    if (node === null) return null;
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key);
      return node;
    }
    if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key);
      return node;
    }
    //第一种情况，移除没有子节点的叶节点
    if (node.left === null && node.right === null) {
      node = null;
      return node;
    }
    //第二种情况，移除只有左节点或只有右节点的节点
    if (node.left === null) {
      node = node.right;
      return node;
    }
    if (node.right === null) {
      node = node.left;
      return node;
    }

    //第三种情况，移除拥有左节点和右节点两个节点的节点
    let min = this.minNode(node.right); //找到右侧最小的节点值
    node.key = min; //将右侧最新值更新为当前节点值，相当于移除了当前节点。
    node.right = this.removeNode(node.right, min); //再移除min
    return node;
  }
}

let tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.remove(7);
console.log(tree.root);
console.log("=====中序遍历=======");
tree.inOrderTraverse((key) => {
  console.log(key);
});
console.log("=====先序遍历=======");
tree.preOrderTraverse((key) => {
  console.log(key);
});
console.log("=====后序遍历=======");
tree.postOrderTraverse((key) => {
  console.log(key);
});
console.log("最小值：", tree.min());
console.log("最大值：", tree.max());
console.log("search: 3", tree.search(3));
```
