//求斐波那契数列的前20个数
let fibonacci = []

for (let index = 0; index <= 20; index++) {
    if (index === 0) {
        fibonacci[index] = 0
    }
    if (index <= 2) {
        fibonacci[index] = 1
        continue
    }
    fibonacci[index] = fibonacci[index - 1] + fibonacci[index - 2]

}

console.log(fibonacci);