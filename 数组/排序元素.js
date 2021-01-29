//reverse 方法可以反转元素
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
numbers.reverse()
console.log('reverse', numbers);

//sort 方法对元素进行排序
numbers.sort((a, b) => a - b)//升序
console.log('sort (a, b) => a - b', numbers);
numbers.sort((a, b) => b - a)//降序
console.log('sort (a, b) => b - a', numbers);

//字符串数组排序
let names = ['Ana', 'nick', 'mark', 'ana', 'john', 'John']
names.sort()
console.log('sort names', names);

// 忽略大小写的排序方法
names.sort((a, b) => {
    if (a.toLocaleLowerCase() > b.toLocaleLowerCase()) {
        return 1
    }
    if (a.toLocaleLowerCase() < b.toLocaleLowerCase()) {
        return -1
    }
    return 0
})
console.log('忽略大小写', names);
// [ 'Ana', 'ana', 'John', 'john', 'mark', 'nick' ]

//小写字母排在前面
names.sort((a,b)=>a.localeCompare(b))
console.log('忽略大小写 小写字母排在前面', names);

