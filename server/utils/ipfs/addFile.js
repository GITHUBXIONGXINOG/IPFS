let IpfsApi = require("ipfs-api")
const pathFn = require('path')
const fs = require('fs')

module.exports = {
    addfile: async (file) => {
        return new Promise(async(resolve) => {
            try {
                var ipfs = IpfsApi('localhost', '5001', { protocol: 'http' })
                //获取文件信息
                const { path, type,name,size,lastModifiedDate} = file.upload_file
                const upload_file={ path, type, name,size,lastModifiedDate } 
                console.log(upload_file);
                //hash
                let hash = null
                //编码方式
                // let encode = null
                // let readerStream = fs.createReadStream(path)
                // // console.log(readerStream);
                //  // 把数据转换成Buffer
                //  const content =  Buffer.from(readerStream)
                //  console.log('content:',content);
                //  // 添加到ipfs
                //  let resFile = await ipfs.add({
                //      path: path,
                //      content: content
                //  })
                //  hash = await resFile[0].hash
                //  if(hash){
                //     //  fs.unlink(path,(err)=>{if(err)console.error(err);})
                //  }
                //  resolve(hash)
                // if (type === 'text/plain') {
                //     encode = 'utf-8'
                // }
                // else if (type === 'image/png' || type === 'image/jpeg' || type === 'image/bmp' || type === 'image/gif' || type === 'image/x-icon') {
                //     encode = 'base64'
                // }
                // // console.log(encode);
                fs.readFile(path, async (err, fd) => {
                    if (err) {
                        console.error(err)
                    }
                    // console.log(fd);
                    // const fdInfo = Buffer.from(JSON.stringify(upload_file))
                    //创建信息buffer保存文件信息,固定长度300
                    const fdInfoBuf = Buffer.alloc(300);
                    //将文件信息写入
                    fdInfoBuf.write(JSON.stringify(upload_file))
                    // console.log(fdInfoBuf.toString());
                    // console.log(fdInfoBuf.length);
                    // console.log(fdInfoBuf);
                    // console.log(JSON.parse(fdInfo.toString()));
                    // 把数据转换成Buffer
                    const fdBuffer = Buffer.from(fd)
                    // console.log(content);
                    //拼接文件信息和文件内容
                    const content = Buffer.concat([fdInfoBuf,fdBuffer])
                    // const fdInfoBuffer = Buffer.from(fdInfo.toString())
                    // console.log('size:',fdInfoBuffer.length);
                    // console.log(len);
                    // console.log(len.toString('utf-8',0,10));
                    // console.log(len.length);
                    // console.log(content);
                    // console.log(content.length);
                    // console.log(fdInfoBuf.length);
                    // console.log(fdBuffer.length);
                    // 添加到ipfs
                    let resFile = await ipfs.add({
                        path: path,
                        content: content
                    })
                    hash = await resFile[0].hash
                    if(hash){
                        fs.unlink(path,(err)=>{if(err)console.error(err);})
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