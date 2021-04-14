let IpfsApi = require("ipfs-api")
const fs = require('fs')
const _path = require('path')

module.exports = {
    search: async (hash) => {
        try {
            var ipfs = await IpfsApi('localhost', '5001', { protocol: 'http' })
            let result = await ipfs.cat(hash)
            console.log(result);
            let fileInfoString = result.toString('utf-8',0,300)
            // console.log(typeof fileInfo);
            // let reg = fileInfo.replace(/[ ]/g,'111')
            // let reg = fileInfo.toJSON()
            // let reg = '{\"path\":\"/mnt/c/Users/96212/Desktop/实验/code/IPFS/server/public/uploads/upload_a7f7a221411ef153e112e1debea39907.png\",\"type\":\"image/png\",\"name\":\"AliYun.png\",\"size\":22352,\"lastModifiedDate\":\"2021-04-14T05:16:29.803Z\"}\u0000\u0000\u0000'
            // console.log(reg.path);
            // console.log(reg.length);
            // console.log(fileInfo.trim().length);
            let fileInfo = JSON.parse(fileInfoString.replace(/\u0000/g,''))
            console.log(fileInfo);
            
            // console.log(JSON.parse(fileInfo));

            // console.log(JSON.stringify(fileInfo));
            // let formatInfo = JSON.stringify(fileInfo).replace('/}\o*/g','111')
            // console.log(JSON.stringify(fileInfo).match(/}/))
            // console.log(formatInfo);
            // console.log(JSON.stringify(fileInfo));

            let path = _path.join(__dirname,'../','../','public','downloads','1.png')
            console.log(path);
            fs.writeFile(path,result,(err)=>{
                if (err) {
                    console.log(err)
                }
            })
            return result
        } catch (err) {
            console.error(err);
            return err
        }

    }
}

 