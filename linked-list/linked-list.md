## 链表 LinkedLIst

**链表的主要方法**

1. push(element)：向链表尾部添加一个新元素
2. insert(element,position)：向链表的特定位置插入一个新元素
3. getElementAt(index)：返回链表中特定位置的元素，如果不存在则返回 undefined
4. remove(element)：从链表中移除一个元素
5. indexOF(element)：返回元素在链表中的索引，如果不存在则返回-1
6. removeAt(position)：从链表特定位置移除一个元素
7. isEmpty()：查看链表中是否存在元素
8. size()：返回链表中的元素个数
9. toString()：返回表示整个链表的字符串

### 单向链表

```js
import { defaultEquals } from "./utils.js";
import { Node } from "./models/linked-list-models.js";

class LinkedList {
  constructor(equalFn = defaultEquals) {
    this.count = 0; //存储链表中的元素数量
    this.head = null; //保存第一个元素
    this.equalFn = equalFn; //比较相等性
  }
  //向链表尾部添加一个新元素
  push(element) {
    const node = new Node(element);
    let current;
    if (this.head === null) {
      this.head = node;
      this.count++;
      return;
    }
    current = this.head;
    while (current.next !== null) {
      //获取最后一项
      current = current.next;
    }
    current.next = node;
    this.count++;
  }
  //从链表指定位置移除一个元素
  removeAt(index) {
    if (index < 0 || index > this.count) return undefined;
    let current = this.head;
    if (index === 0) {
      this.head = current.next;
      this.count--;
      return current.element;
    }
    let previous = this.getElementAt(index - 1);
    current = previous.next;
    //将previo的下一项和current的下一项连接起来，跳过current
    previous.next = current.next;
    this.count--;
    return current.element;
  }
  //返回链表中指定位置的元素
  getElementAt(index) {
    if (index < 0 || index > this.count) return undefined;
    let node = this.head;
    for (let i = 0; i < index; i++) {
      node = node.next;
    }
    return node;
  }
  //在链表中的任意位置插入元素
  insert(element, index) {
    if (index < 0 || index > this.count) return false;
    let node = new Node(element);
    if (index === 0) {
      let current = this.head;
      node.next = current;
      this.head = node;
      this.count++;
      return true;
    }
    let previous = this.getElementAt(index - 1);
    let current = previous.next;
    node.next = current;
    previous.next = node;
    this.count++;
    return true;
  }
  //返回元素在链表中的索引位置
  indexOf(element) {
    if (this.count === 0) return -1;
    let current = this.head;
    for (let i = 0; i < this.count; i++) {
      if (this.equalFn(element, current.element)) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }
  //在链表中移除该元素
  remove(element) {
    let index = this.indexOf(element);
    let result = this.removeAt(index);
    return result;
  }
  size() {
    return this.count;
  }
  isEmpty() {
    return this.size() === 0;
  }
  getHead() {
    return this.head;
  }
  toString() {
    if (this.isEmpty()) return "";
    let current = this.head;
    let objString = current.element;
    current = current.next;
    for (let i = 0; i < this.count && current !== null; i++) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString;
  }
}
```
