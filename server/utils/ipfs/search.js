let IpfsApi = require("ipfs-api")
const fs = require('fs')
const _path = require('path')
const { SM4 } = require('gm-crypto')

module.exports = {
    search: async (hash) => {
        try {
            debugger
            var ipfs = await IpfsApi('localhost', '5001', { protocol: 'http' })
             await ipfs.pin.ls(hash)
            let result = await ipfs.cat(hash)
            // console.log(pathInfo);
            // console.log(result);
            let fileInfoString = result.toString('utf-8',0,300)
            let fileInfo = JSON.parse(fileInfoString.replace(/\u0000/g,''))

            // console.log(fileInfo);
            let path = _path.join(__dirname,'../','../','public','downloads',hash.slice(0,16))
            fileInfo.downloadUrl = `downloads/${hash.slice(0,16)}`
            // console.log(result.slice(300));
            // console.log(path);
            // const key = '0123456789abcdeffedcba9876543210' // Any string of 32 hexadecimal digits

            // const tempJSON = result.slice(300).toString()
            // // console.log('-----------------------------------------------');
            // // console.log('3.2-tempJSON:',tempJSON);

            // decryptedData = SM4.decrypt(tempJSON, key, {
            //     inputEncoding: 'base64',
            //     outputEncoding: 'utf8'
            // })
            // // console.log('-----------------------------------------------');
            // // console.log('4-decryptedData:',decryptedData);
            // const jsonData = JSON.parse(decryptedData)
            // // console.log('-----------------------------------------------');
            // // console.log('5-jsonData',jsonData);
            // const decryptedDataBuffer = Buffer.from(jsonData)
            // // console.log('-----------------------------------------------');
            // // console.log("6-decryptedDataBuffer:",decryptedDataBuffer);



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

 