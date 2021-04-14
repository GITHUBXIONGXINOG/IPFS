let IpfsApi = require("ipfs-api")
const fs = require('fs')
const _path = require('path')

module.exports = {
    search: async (hash) => {
        try {
            var ipfs = await IpfsApi('localhost', '5001', { protocol: 'http' })
            let result = await ipfs.cat(hash)
            // console.log(result);
            let fileInfoString = result.toString('utf-8',0,300)
            let fileInfo = JSON.parse(fileInfoString.replace(/\u0000/g,''))

            // console.log(fileInfo);
            let path = _path.join(__dirname,'../','../','public','downloads',`${hash.slice(0,5)}_${fileInfo.name}`)
            fileInfo.downloadUrl = `downloads/${hash.slice(0,5)}_${fileInfo.name}`

            // console.log(path);
            //写入文件到本地
            fs.writeFile(path,result.slice(300),(err)=>{
                if (err) {
                    console.log(err)
                }  
            })
            // return result

            return fileInfo
        } catch (err) {
            console.error(err);
            return err
        }

    }
}

 