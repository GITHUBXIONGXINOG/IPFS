let IpfsApi = require("ipfs-api")
const pathFn = require('path')
const fs = require('fs')

module.exports = {
    addfile: async (file) => {
        return new Promise(resolve => {
            try {
                var ipfs = IpfsApi('localhost', '5001', { protocol: 'http' })
                const { path, type } = file.upload_file
                console.log(type);
                let hash = null
                let encode = null
                if (type === 'text/plain') {
                    encode = 'utf-8'
                }
                else if (type === 'image/png' || type === 'image/jpeg' || type === 'image/bmp' || type === 'image/gif' || type === 'image/x-icon') {
                    encode = 'base64'
                }
                // console.log(encode);
                fs.readFile(path, encode, async (err, fd) => {
                    if (err) {
                        console.error(err)
                    }
                    // 把数据转换成Buffer
                    const content = Buffer.from(fd)
                    // console.log(content);
                    let resFile = await ipfs.add({
                        path: path,
                        content: content
                    })
                    hash = await resFile[0].hash
                    resolve(hash)
                })
            } catch (err) {
                console.error(err);
                return err
            }
        })

    }
}