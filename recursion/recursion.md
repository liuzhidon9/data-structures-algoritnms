## 递归 Recursion

> 递归函数就是自身能够调用自身的函数。

### 迭代版斐波那契函数

```js
function fibonacciInterative(n) {
  if (n < 1) return 0;
  if (n <= 2) return 1;
  let fibNum1 = 0;
  let fibNum2 = 1;
  let fibN = n;
  for (let i = 2; i <= n; i++) {
    fibN = fibNum1 + fibNum2;
    fibNum1 = fibNum2;
    fibNum2 = fibN;
  }
  return fibN;
}
console.time("fibonacciInterative");
console.log("fibonacciInterative: ", fibonacciInterative(41));
console.timeEnd("fibonacciInterative");
```

### 递归版斐波那契额函数

```js
function fibonacciRecursion(n) {
  if (n < 1) return 0;
  if (n <= 2) return 1;
  return fibonacciRecursion(n - 1) + fibonacciRecursion(n - 2);
}
console.time("fibonacciRecursion");
console.log("fibonacciRecursion: ", fibonacciRecursion(41));
console.timeEnd("fibonacciRecursion");
```

### 记忆化斐波那契

```js
function fibonacciMemoization(n) {
  let memo = [0, 1];
  const fibonacci = (n, memo) => {
    if (memo[n] != null) return memo[n];
    return (memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo));
  };
  return fibonacci(n, memo);
}
console.time("fibonacciMemoization");
console.log("fibonacciMemoization: ", fibonacciMemoization(41));
console.timeEnd("fibonacciMemoization");
```
