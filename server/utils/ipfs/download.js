let IpfsApi = require("ipfs-api")
const fs = require('fs')
const _path = require('path')
const { SM4 } = require('gm-crypto')

module.exports = {
    download: async (url) => {
        try {
            console.log(url);
            let path = _path.join(__dirname,'../','../','public',url)
            // console.log(path);
            // fs.unlink(path,(err)=>{if(err)console.error(err);})

            const key = '0123456789abcdeffedcba9876543210' // Any string of 32 hexadecimal digits
            fs.readFile(path, async (err, fd) => {
                if (err) {
                    console.error(err)
                }   
                // debugger
                // console.log(path);
                // console.log(fd);
                const tempJSON = fd.toString()
                // console.log('-----------------------------------------------');
                // console.log('3.2-tempJSON:',tempJSON);
    
                decryptedData = SM4.decrypt(tempJSON, key, {
                    inputEncoding: 'base64',
                    outputEncoding: 'utf8'
                })
                // console.log('-----------------------------------------------');
                // console.log('4-decryptedData:',decryptedData);
                const jsonData = JSON.parse(decryptedData)
                // console.log('-----------------------------------------------');
                // console.log('5-jsonData',jsonData);
                const decryptedDataBuffer = Buffer.from(jsonData)
                // console.log('-----------------------------------------------');
                // console.log("6-decryptedDataBuffer:",decryptedDataBuffer);
                fs.writeFile(path,decryptedDataBuffer,(err)=>{
                    if (err) {
                        console.log(err)
                    }  
                })
            })
           

            return `/api/${url}`
   
        } catch (err) {
            console.error(err);
            return err
        }

    }
}

