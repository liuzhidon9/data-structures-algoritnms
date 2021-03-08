## 字典 Dictionary

字典以`[ 键，值 ]`的形式存储元素，字典也称作映射、符号表或[关联数组](https://zh.wikipedia.org/wiki/%E5%85%B3%E8%81%94%E6%95%B0%E7%BB%84)

**映射/字典常用的方法**

1. set(key,value)：向字典添加新元素，如果 key 已经存在，那么已存在的 value 会被新的值覆盖。
2. remove(key)：通过键值从字典中移除键值对应的数据值。
3. hasKey(key)：如果某个键值存在于字典中则返回 true，否则返回 false。
4. get(key)：通过键值从字典查找特定的数值并返回。
5. clear()：删除该字典中的所有值。
6. size()：返回字典所包含值的数量。
7. isEmpty()：查看字典是否为空，当 size 的值为零时返回 true，否则返回 false。
8. keys()：将字典所包含的所有键名以数组的形式返回。
9. values()：将字典所包含的所有数值以数组的形式返回。
10. keyValues()：将字典所有[ 键，值 ]对返回。
11. forEach(callback)：迭代字典中的所有键值对，callback 有两个参数：key 和 value，该方法可以在 callback 返回 false 时被终止。

### 字典类

```js
import { defaultToString } from "./utils.js";

class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  toString() {
    return `[#${this.key}:${this.value}]`;
  }
}

class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }
  //如果某个键值存在于字典中则返回true，否则返回false
  hasKey(key) {
    return this.table[key] != null;
  }
  //向字典添加新元素，如果key已经存在，那么已存在的value会被新的值覆盖
  set(key, value) {
    if (key == null || value == null) return false;
    const tableKey = this.toStrFn(key);
    this.table[tableKey] = new ValuePair(key, value);
    return true;
  }
  // 通过键值从字典中移除键值对应的数据值。
  remove(key) {
    if (!this.hasKey(key)) return false;
    delete this.table[key];
    return true;
  }
  // 通过键值从字典查找特定的数值并返回。
  get(key) {
    if (!this.hasKey(key)) return undefined;
    const valuePair = this.table[key];
    return valuePair.value;
  }
  // 将字典所有[ 键，值 ]对返回。
  keyValues() {
    return Object.values(this.table);
  }
  keys() {
    return this.keyValues().map((valuePair) => valuePair.key);
  }
  // 将字典所包含的所有数值以数组的形式返回。
  values() {
    return this.keyValues().map((valuePair) => valuePair.value);
  }
  forEach(callback) {
    const valuePair = this.keyValues();
    for (let i = 0; i < valuePair.length; i++) {
      let result = callback(valuePair[i].key, valuePair[i].value);
      if (result === false) break;
    }
  }
  size() {
    return this.keyValues().length;
  }
  clear() {
    this.table = {};
  }
  isEmpty() {
    return this.size() === 0;
  }
  toString() {
    if (this.isEmpty()) return "";
    let valuePair = this.keyValues();
    let objString = `${valuePair[0].toString()}`;
    for (let i = 1; i < valuePair.length; i++) {
      objString = `${objString},${valuePair[i].toString()}`;
    }
    return objString;
  }
}
```

### 散列表

```js
//散列表
class HashTable {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }
  loseloseHashCode(key) {
    if (typeof key === "number") return key;
    const tableKey = this.toStrFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
    return hash % 37;
  }
  hashCode(key) {
    return this.loseloseHashCode(key);
  }
  put(key, value) {
    if (key == null || value == null) return false;
    let position = this.hashCode(key);
    this.table[position] = new ValuePair(key, value);
    return true;
  }
  get(key) {
    let position = this.hashCode(key);
    let valuePair = this.table[position];
    return valuePair == null ? undefined : valuePair.value;
  }
  remove(key) {
    let position = this.hashCode(key);
    if (this.table[position] != null) {
      delete this.table[position];
      return true;
    }
    return false;
  }
}
```

### ES6 的 Map

```js
const map = new Map();
map.set('Gandalf', 'gandalf@email.com');
map.set('John', 'johnsnow@email.com');
map.set('Tyrion', 'tyrion@email.com');
console.log(map.has('Gandalf')); // true
console.log(map.size); // 3
console.log(map.keys()); // 输出{"Gandalf", "John", "Tyrion"}
console.log(map.values()); // 输出{"gandalf@email.com", "johnsnow@email.com",
"tyrion@email.com"}
console.log(map.get('Tyrion')); // tyrion@email.com
```
