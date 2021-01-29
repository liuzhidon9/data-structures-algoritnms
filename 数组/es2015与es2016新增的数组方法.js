let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]


// for (const n of arr) {
//     console.log(n);
// }
//迭代器
// let iterator = arr[Symbol.iterator]()
// let iterator = arr.entries()
// let iterator = arr.keys()
let iterator = arr.values()
console.log('next', iterator.next());
for (const n of iterator) {
    console.log(n);
}


// Array.from 根据已有的数组创建一个新数组
// let newArr = Array.from(arr)
let newArr = Array.from(arr, n => n % 2 === 0)
console.log('newArr', newArr);

// Array.of 根据传入的参数创建一个新数组
let ofArr = Array.of(1, 2, 3, 4, 5, 6)
console.log('ofArr', ofArr);

// fill 方法用静态值填充数组
let fillArr = arr.fill(0)
console.log('fillArr', fillArr);

// 创建并初始化数组
// 创建一个长度为6并且所有值都填充为1的数组
let initArr = new Array(6).fill(1)
console.log('initArr',initArr);

// copyWithin 方法复制数组中的一系列元素到同一数组的指定位置
let copyArr = [1,2,3,4,5,6]
copyArr.copyWithin(1,3,5)
console.log('copyArr',copyArr);

