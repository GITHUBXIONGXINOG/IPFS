let IpfsApi = require("ipfs-api")
const fs = require('fs')
const _path = require('path')
const { SM4 } = require('gm-crypto')

module.exports = {
    search: async (hash) => {
        try {
            debugger
            var ipfs = await IpfsApi('localhost', '5001', { protocol: 'http' })
            //  await ipfs.pin.ls(hash)
            let result = await ipfs.cat(hash)
            debugger

            // console.log(pathInfo);
            console.log(result);
            let fileInfoString = result.toString('utf-8')
            let fileInfo = JSON.parse(fileInfoString.replace(/\u0000/g,''))
            // console.log(fileInfo);
            return fileInfo
 //---------------------------------------------------------------------------------------------           
/*             let fileInfoString = result.toString('utf-8',0,300)
            let fileInfo = JSON.parse(fileInfoString.replace(/\u0000/g,''))

            // console.log(fileInfo);
            let path = _path.join(__dirname,'../','../','public','downloads',hash.slice(0,16))
            fileInfo.downloadUrl = `downloads/${hash.slice(0,16)}`
         
            //写入文件到本地
            fs.writeFile(path,result.slice(300),(err)=>{
                if (err) {
                    console.log(err)
                }  
            }) 
            // return fileInfo
*/
//---------------------------------------------------------------------------------------------
        } catch (err) {
            console.error(err);
            return err
        }

    }
}

 