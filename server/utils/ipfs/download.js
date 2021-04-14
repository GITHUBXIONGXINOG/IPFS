let IpfsApi = require("ipfs-api")
const fs = require('fs')
const _path = require('path')

module.exports = {
    download: async (url) => {
        try {
            // var ipfs = await IpfsApi('localhost', '5001', { protocol: 'http' })
            // let result = await ipfs.cat(hash)
            // console.log(result);
            // console.log(fileInfo);
            // let path = _path.join(__dirname,'../','../','public','downloads',`${hash.slice(0,5)}_${fileInfo.name}`)
            // return result.slice(300)
            // return result
            // return file
            let path = _path.join(__dirname,'../','../','public',url)
            console.log(path);
            var ws = fs.createReadStream(path)
            let resData = []
            if (ws) {
                ws.on('data',function (chunk) {
                    resData.push(chunk)
                })
                ws.on('end',function () {
                    let finalData = Buffer.concat(resData)
                    
                })
            }
            // console.log(ws);
        } catch (err) {
            console.error(err);
            return err
        }

    }
}

 