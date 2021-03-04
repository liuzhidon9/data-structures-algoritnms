// 使用双端队列实现一个回文检查器
//回文是正反都能读通的单词、词组、数或一系列字符的序列，例如madam
import Deque from "./double-ended-queue.js"

function palindromeChecker(str) {
    if (str === '' || str === undefined || str === null) return false
    const deque = new Deque()
    const lowerString = str.toLocaleLowerCase().split(' ').join('')
    let firstChar, lastChar
    let isEqual = true

    for (let i = 0; i < lowerString.length; i++) {
       deque.addBack(lowerString.charAt(i))
    }
   
    while (isEqual && deque.size() > 1) {
        firstChar = deque.removeFront()
        lastChar = deque.removeBack()
        if (firstChar !== lastChar) {
            isEqual = false
        }
    }
    return isEqual
}
console.log('madam ', palindromeChecker('madam'));
console.log('hello ', palindromeChecker('hello'));