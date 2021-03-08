import { defaultToString } from './utils.js'

class ValuePair {
    constructor(key, value) {
        this.key = key
        this.value = value
    }
    toString() {
        return `[#${this.key}:${this.value}]`
    }
}

class Dictionary {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn
        this.table = {}
    }
    //如果某个键值存在于字典中则返回true，否则返回false
    hasKey(key) {
        return this.table[key] != null
    }
    //向字典添加新元素，如果key已经存在，那么已存在的value会被新的值覆盖
    set(key, value) {
        if (key == null || value == null) return false
        const tableKey = this.toStrFn(key)
        this.table[tableKey] = new ValuePair(key, value)
        return true
    }
    // 通过键值从字典中移除键值对应的数据值。
    remove(key) {
        if (!this.hasKey(key)) return false
        delete this.table[key]
        return true
    }
    // 通过键值从字典查找特定的数值并返回。
    get(key) {
        if (!this.hasKey(key)) return undefined
        const valuePair = this.table[key]
        return valuePair.value
    }
    // 将字典所有[ 键，值 ]对返回。
    keyValues() {
        return Object.values(this.table)
    }
    keys() {
        return this.keyValues().map(valuePair => valuePair.key)
    }
    // 将字典所包含的所有数值以数组的形式返回。
    values() {
        return this.keyValues().map(valuePair => valuePair.value)
    }
    forEach(callback) {
        const valuePair = this.keyValues()
        for (let i = 0; i < valuePair.length; i++) {
            let result = callback(valuePair[i].key, valuePair[i].value)
            if (result === false) break
        }
    }
    size() {
        return this.keyValues().length
    }
    clear() {
        this.table = {}
    }
    isEmpty() {
        return this.size() === 0
    }
    toString() {
        if (this.isEmpty()) return ''
        let valuePair = this.keyValues()
        let objString = `${valuePair[0].toString()}`
        for (let i = 1; i < valuePair.length; i++) {
            objString = `${objString},${valuePair[i].toString()}`
        }
        return objString
    }
}


//散列表
class HashTable {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn
        this.table = {}
    }
    loseloseHashCode(key) {
        if (typeof key === 'number') return key
        const tableKey = this.toStrFn(key)
        let hash = 0
        for (let i = 0; i < tableKey.length; i++) {
            hash += tableKey.charCodeAt(i)
        }
        return hash % 37
    }
    hashCode(key) {
        return this.loseloseHashCode(key)
    }
    put(key, value) {
        if (key == null || value == null) return false
        let position = this.hashCode(key)
        this.table[position] = new ValuePair(key, value)
        return true
    }
    get(key) {
        let position = this.hashCode(key)
        let valuePair = this.table[position]
        return valuePair == null ? undefined : valuePair.value
    }
    remove(key) {
        let position = this.hashCode(key)
        if (this.table[position] != null) {
            delete this.table[position]
            return true
        }
        return false
    }
}

const hash = new HashTable(); 
hash.put('Gandalf', 'gandalf@email.com'); 
hash.put('John', 'johnsnow@email.com'); 
hash.put('Tyrion', 'tyrion@email.com');

console.log(hash.table);
console.log(hash.get('John'));

// let dictionary = new Dictionary()
// dictionary.set('Gandalf', 'gandalf@email.com'); 
// dictionary.set('John', 'johnsnow@email.com'); 
// dictionary.set('Tyrion', 'tyrion@email.com');
// console.log('size: ',dictionary.size());
// console.log('keyValues: ',dictionary.keyValues());
// console.log('toString: ',dictionary.toString());
// console.log('keys: ',dictionary.keys());
// console.log('values: ',dictionary.values());