let IpfsApi = require("ipfs-api")
const pathFn = require('path')
const fs = require('fs')
const { SM4 } = require('gm-crypto')
const { progress } = require('./progress')
const CHUNK_SIZE = 1024
module.exports = {
    addfile: async (fileInfo) => {
        return new Promise(async (resolve) => {
            try {
                var ipfs = IpfsApi('localhost', '5001', { protocol: 'http' })
                debugger
                debugger
                const { path } = fileInfo
                fs.readFile(path, 'utf8', async function (err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        debugger
                        console.log(data);
                        try {
                            // 添加到ipfs
                            let resFile = await ipfs.add({
                                path: path,
                                content: Buffer.from(data)
                            })
                            // console.log(resFile);
                            filehash = await resFile[0].hash
                            // let file = await ipfs.cat(filehash)
                            // console.log(file);
                            if (filehash) {
                                fs.unlink(path, (err) => { if (err) console.error(err); })
                            }

                            //把文件hash存入文件信息hash中,并反返回给前端
                            fileInfo.filehash = filehash
                            // let infobuf = Buffer.alloc(400)
                            // infobuf.write(JSON.stringify(upload_file))
                            let infobuf = Buffer.from(JSON.stringify(fileInfo))
                            // console.log(infobuf);
                            let resInfo = await ipfs.add(infobuf)
                            let hash = resInfo[0].hash
                            resolve(hash)
                        } catch(err) {
                            console.log(error);
                        }



                    }
                })





            } catch (err) {
                console.error(err);
                return err
            }
        })

    }
}