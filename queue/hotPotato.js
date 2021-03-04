//使用循环队列实现击鼓传花游戏
import Queue from "./queue.js"
function hotpotato(elementList, num) {
    let queue = new Queue()
    let eliminateList = []

    for (const element of elementList) {
        queue.enqueue(element)
    }

    while (queue.size() > 1) {
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue())
        }
        eliminateList.push(queue.dequeue())
    }

    return {
        num: num,
        eliminateList: eliminateList,
        winner: queue.dequeue()
    }
}
function randomNum() {
    return Math.floor(Math.random() * 100 + 1)
}
let elementList = ["jack", "nick", "mark", "bob", "mary", "sam", "jecik"]
console.log(hotpotato(elementList, randomNum()));
console.log(hotpotato(elementList, randomNum()));
console.log(hotpotato(elementList, randomNum()));
