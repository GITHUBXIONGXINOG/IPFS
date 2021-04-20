let IpfsApi = require("ipfs-api")
const fs = require('fs')
const _path = require('path')
const { SM4 } = require('gm-crypto')
// var http = require('http')
// var WebSocketServer = require('websocket').server
// const {initWebSocket,setProgress} = require('./webSocket')
const {progress} = require('./progress')
module.exports = {
    download: (hash, key) => {
        return new Promise(async (resolve, reject) => {
            try {
                // let path = _path.join(__dirname, '../', '../', 'public', url)
                // console.log(path);
                // fs.unlink(path,(err)=>{if(err)console.error(err);})

                // console.log(_key);
                // const key = '0123456789abcdeffedcba9876543210' // Any string of 32 hexadecimal digits
                // debugger
                // console.log(hash, key);
                var ipfs = IpfsApi('localhost', '5001', { protocol: 'http' })
                // initWebSocket()
                // debugger
                await ipfs.ls(hash)
                let file = await ipfs.cat(hash)

                // //5.接收到buffer数据,转为字符串
                // // let tempString = file.toString()
                // let time = new Date().getTime()
                // let fileName = hash + time
                // let filePath = _path.join(__dirname, '../', '../', 'public/', 'downloads', fileName)
                // // console.log(filePath);
                // debugger
                // console.log(createWebSocket);
                // createWebSocket()
                // fs.writeFile(filePath, file, (err) => {
                //     if (err) {
                //         // console.log(err)
                //         reject(err)
                //     } else {
                //         resolve(`/api/downloads/${fileName}`)
                //     }
                // })
                resolve(file)
                tempString = ''
                resBuf = []

            } catch (err) {
                debugger
                console.error(err);
                return err
            }
        })


    }
}

