// 向数组的末尾追加
function push(arr, value) {
    arr[arr.length] = value
}
let arr = [1, 2, 3]
push(arr, 4)
console.log(arr);