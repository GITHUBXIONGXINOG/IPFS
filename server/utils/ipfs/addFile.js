let IpfsApi = require("ipfs-api")
const pathFn = require('path')
const fs = require('fs')
const { SM4 } = require('gm-crypto')
module.exports = {
    addfile: async (file) => {
        return new Promise(async (resolve) => {
            try {
                var ipfs = IpfsApi('localhost', '5001', { protocol: 'http' })
                //获取文件信息
                const { path, type, name, size, lastModifiedDate } = file.upload_file
                const upload_file = { path, type, name, size, lastModifiedDate }
                console.log(upload_file);
                //hash
                let hash = null
            
               

                fs.readFile(path, async (err, fd) => {
                    if (err) {
                        console.error(err)
                    }

                    //创建信息buffer保存文件信息,固定长度300
                    const fdInfoBuf = Buffer.alloc(300);
                    //将文件信息写入
                    fdInfoBuf.write(JSON.stringify(upload_file))

                    // 把数据转换成Buffer
                    const fdBuffer = Buffer.from(fd)
                    // console.log(content);
                    
                    const key = '0123456789abcdeffedcba9876543210' // Any string of 32 hexadecimal digits
                    // const originalData = fd
                    let encryptedData, decryptedData
                    // console.log('fd:',fd);
                    let jsonFd = JSON.stringify(fd)
                    // console.log('jsonFd:',jsonFd);
                    // ECB
                    encryptedData = SM4.encrypt(jsonFd, key, {
                        inputEncoding: 'utf8',
                        outputEncoding: 'base64'
                    })
                    // console.log('encryptedData:',encryptedData);
                    decryptedData = SM4.decrypt(encryptedData, key, {
                        inputEncoding: 'base64',
                        outputEncoding: 'utf8'
                    })
                    // console.log('decryptedData:',decryptedData);
                    const jsonData = JSON.parse(decryptedData)
                    // console.log(jsonData);
                    const decryptedDataBuffer = Buffer.from(jsonData)
                    // console.log("decryptedDataBuffer:",decryptedDataBuffer);
                    //拼接文件信息和文件内容
                    const content = Buffer.concat([fdInfoBuf, decryptedDataBuffer])

                    // 添加到ipfs
                    let resFile = await ipfs.add({
                        path: path,
                        content: content
                    })
                    hash = await resFile[0].hash
                    if (hash) {
                        fs.unlink(path, (err) => { if (err) console.error(err); })
                    }
                    resolve(hash)
                })
            } catch (err) {
                console.error(err);
                return err
            }
        })

    }
}