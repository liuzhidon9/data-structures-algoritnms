//在数组的开头插入元素
function unshift(arr, value) {
    for (let index = arr.length; index >= 0; index--) {
        arr[index] = arr[index - 1]
    }
    arr[0] = value
}
let arr = [1, 2, 3]
unshift(arr, 4)
console.log(arr);