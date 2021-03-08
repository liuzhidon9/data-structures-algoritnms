## 集合 Set

`集合`是由一组`无序`且`唯一`的项组成的。

> 也可以把集合想象成一个既没有重复元素，也没有顺序概念的数组

**集合的一些方法**

1. add(element)：向集合添加一个新元素
2. delete(element)：从集合移除一个元素
3. has(element)：如果元素在集合中，返回 true，否则返回 false
4. clear()：移除集合的所有元素
5. size()：返回结合所有元素的数量
6. values()：返回一个包含集合中所有值的数组

### 实现一个 Set 类

```js
class Set {
  constructor() {
    this.items = {};
  }
  // 如果元素在集合中，返回true，否则返回false
  has(element) {
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }
  // 向集合添加一个新元素
  add(element) {
    if (this.has(element)) return false;
    this.items[element] = element;
    return true;
  }
  // 从集合移除一个元素
  delete(element) {
    if (!this.has(element)) return false;
    delete this.items[element];
    return true;
  }
  // 移除集合的所有元素
  clear() {
    this.items = {};
  }
  // 返回结合所有元素的数量
  size() {
    return Object.keys(this.items).length;
  }
  // 返回一个包含集合中所有值的数组
  values() {
    let values = [];
    for (const key in this.items) {
      values.push(this.items[key]);
    }
    return values;
    //or
    // return Object.values(this.items)
  }
}
```

### 集合运算

1. 并集：对于给定的两个集合，返回一个包含两个集合中所有元素的集合
2. 交集：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合
3. 差集：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合
4. 子集：验证一个给定集合是否是另一个集合的子集

```js
//并集
union(otherSet) {
    const unionSet = new Set()
    this.values().forEach((element) => { unionSet.add(element) })
    otherSet.values().forEach(element => { unionSet.add(element) })
    return unionSet
}
//交集
intersection(otherSet) {
    let intersectionSet = new Set()
    let values = this.values()
    let otherValues = otherSet.values()
    let biggerSet = values
    let smallerSet = otherValues
    if (values.length < otherValues.length) {
        biggerSet = otherValues
        smallerSet = values
    }
    smallerSet.forEach(element => {
        if (biggerSet.includes(element)) {
            intersectionSet.add(element)
        }
    })
    return intersectionSet
}
//差集
difference(otherSet) {
    let differenceSet = new Set()
    this.values().forEach(element => {
        if (!otherSet.has(element)) {
            differenceSet.add(element)
        }
    })
    return differenceSet
}
//验证一个给定集合是否是另一个集合的子集
isSubsetOf(otherSet) {
    if (this.values().length > otherSet.values().length) return false
    let isSubset = true
    this.values().every(element => {
        if (!otherSet.has(element)) {
            isSubset = false
            return false
        }
        return true
    })
    return isSubset
}

let setA = new Set()
setA.add(1)
setA.add(2)
setA.add(3)
setA.add(4)
let setB = new Set()
setB.add(1)
setB.add(3)
setB.add(5)
setB.add(7)
let unionAB = setA.union(setB)
let intersectionAB = setA.intersection(setB)
let differenceAB = setA.difference(setB)
let aIsSubsetOfB = setA.isSubsetOf(setB)
console.log("setA: ", setA.values());
console.log("setB: ", setB.values());
console.log("unionAB: ", unionAB.values());
console.log("intersectionAB: ", intersectionAB.values());
console.log("differenceAB: ", differenceAB.values());
console.log("aIsSubsetOfB: ", aIsSubsetOfB);

// setA:  [ 1, 2, 3, 4 ]
// setB:  [ 1, 3, 5, 7 ]
// unionAB:  [ 1, 2, 3, 4, 5, 7 ]
// intersectionAB:  [ 1, 3 ]
// differenceAB:  [ 2, 4 ]
// aIsSubsetOfB:  false
```

**使用 ES6 的 Set 类和拓展运算符实现集合运算**

```js
let setA = new Set([1,2,4,5])
let setB = new Set([1,3,5,7])
let unionAB = new Set([...setA, ...setB]);
let intersectionAB = new Set(
  setA.filter((element) => {
    return setB.has(element);
  })
);
let differenceAB = new Set(
  setA.filter((element) => {
    return !setB.has(element);
  })
);
```
