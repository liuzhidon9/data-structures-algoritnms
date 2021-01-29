// indexOf 方法返回与参数匹配的第一个元素的索引，如果找不到则返回-1
let numbers = [1, 2, 3, 10, 5, 10, 7, 8, 9, 10]
console.log('indexOf', numbers.indexOf(10));

// lastIndexOf 方法返回与参数匹配的最后一个元素的索引, 如果找不到则返回-1
console.log('lastIndexOf', numbers.lastIndexOf(10));

// find 方法返回第一个满足条件的值
let findN = numbers.find((value, index, arr) => {
    return value % 2 === 0
})
console.log('find', findN);

//findIndex 方法返回第一个满足条件的值的索引
let findIndexN = numbers.findIndex((value, index, arr) => {
    return value % 2 === 0
})
console.log('findIndex',findIndexN);


// includes 如果数组里存在某个元素，includes方法会返回true，否则返回false
// includes(searchElement: number, fromIndex?: number): boolean
console.log('includes',numbers.includes(3));

// 输出数组为字符串 join 、toString
console.log('toString',numbers.toString());
console.log('join',numbers.join('-'));
