const { Worker, isMainThread, parentPort, workerData } = require('worker_threads')

debugger
if (isMainThread) {
    debugger
    // let path = _path.join(__dirname,'progress.js')
    //  `${__dirname}/progress.js`
    const now = Date.now()
    // 主线程
    const worker = new Worker(__filename, {
        workerData: 20
    });
    worker.on('message', () => {
        console.log(Date.now() - now);
    });
    const worker1 = new Worker(__filename, {
        workerData: 20
    })
    worker1.on('message', () => {
        console.log(Date.now() - now);
    });
    const worker2 = new Worker(__filename, {
        workerData: 20
    })
    worker2.on('message', () => {
        console.log(Date.now() - now);
    });
    // console.log(worker);
    // parentPort.postMessage('hello') // 向工作线程发送数据
} else {
    debugger
    const fib = n => {
        if (n === 0) {
            return 0
        }
        else if (n === 1) return 1
        else return fib(n - 1) + fib(n - 2)
    }
    const number = workerData
    const result = fib(number)
    parentPort.postMessage(result)
}


// var progress = 0
// module.exports.progress = (val) => {
//     debugger
//     // if (!isMainThread) {
//     //     parentPort.postMessage('hello')
//     //     parentPort.on('message',(data)=>{
//     //         console.log(data);
//     //     })
//     // }


//     // if (val) {
//     //     progress = val
//     // } else{
//     //     return progress
//     // }
  

// }