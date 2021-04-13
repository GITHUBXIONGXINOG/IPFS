let IpfsApi = require("ipfs-api")
const pathFn = require('path')
const fs = require('fs')
const { resolve } = require("path")
module.exports = {
    addfile: async (file) => {
        try {
            var ipfs = await IpfsApi('localhost', '5001', { protocol: 'http' })
            const { path ,type} = file.upload_file
            let encode = null
            if (type === 'text/plain') {
                encode = 'utf-8'
            }
            else if(type === 'image/png'){
                encode = 'base64'
            }
            // console.log(encode);
             await fs.readFile(path, encode, async (err, fd) => {
                if (err) {
                    console.error(err)
                }
                // 把数据转换成Buffer
                const content = Buffer.from(fd)
                // console.log(content);
                let resFile = await ipfs.add({
                    path :path,
                    content: content
                })
                // console.log(resFile);
                // let resFile = await ipfs.add(content)
                // console.log(resFile[0].hash);
                let hash = resFile[0].hash
                let getFile = await ipfs.cat(hash)
                // console.log(getFile.toString());
                // console.log(hash);
                let writeParh = pathFn.join(__dirname,'../','../','public','downloads',hash)
                fs.writeFile(writeParh,getFile,function (err) {
                    if(err) console.log(err)
                    // else console.log('写入成功')
                })
                // var ws = fs.createWriteStream(writeParh,{
                //     flags: 'w',         // 文件的操作, 'w'写入文件，不存在则创建
                // })
                // // base64Img = getFile.toString('base64')
                // // let dataBuffer = new Buffer(base64Img,'base64')
                // ws.write(getFile)
                // ws.close()
                // fs.open(writeParh,'a',function(err,fd) {
                //     console.log(fd);
                //     fs.write(fd,getFile,function (err) {
                //         if(err){
                //             console.error(err)
                //         }
                //     });
                // })
                // fs.write(writeParh,getFile)
                // var base64img = getFile.toString('base64')
                // // console.log(base64img);
                // // var deceodeImg = new Buffer(base64img,'base64')
                // fs.writeFile(writeParh,base64img,function (err) {
                //     if(err) console.log(err)
                // })
                // console.log(getFile);
                resolve(hash)
                // return getFile

            })
            // await ipfs.cat()
            // console.log(local);
            // console.log(resRead);
            // console.log(result);
            return file
        } catch (err) {
            console.error(err);
            return err
        }
    }
}