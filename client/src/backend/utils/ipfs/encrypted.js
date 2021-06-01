const { Worker, isMainThread, parentPort, workerData } = require('worker_threads')
const _path = require('path')
debugger
if (isMainThread) {
    console.log('主线程');
} else {
    debugger
    // const fib = n => {
    //     if (n === 0) {
    //         return 0
    //     }
    //     else if (n === 1) return 1
    //     else return fib(n - 1) + fib(n - 2)
    // }
    // const number = workerData
    // const result = fib(number)
    console.log('加密中..');
    const {data,key} = workerData
    console.log(data);
    console.log(key);
    parentPort.postMessage('加密')
}