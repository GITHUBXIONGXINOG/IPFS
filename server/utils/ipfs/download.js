let IpfsApi = require("ipfs-api")
const fs = require('fs')
const _path = require('path')

module.exports = {
    download: async (url) => {
        try {
            console.log(url);
            let path = _path.join(__dirname,'../','public',url)
            console.log(path);
            // fs.unlink(path,(err)=>{if(err)console.error(err);})
            return `/api/${url}`
            // return 'http://localhost:3000/downloads/QmY6L_test.zip'
            // var ipfs = await IpfsApi('localhost', '5001', { protocol: 'http' })
            // let resultBuffer = await ipfs.cat(hash)
            // console.log(resultBuffer);
            // let fileInfoString = resultBuffer.toString('utf-8', 0, 300)
            // let fileInfo = JSON.parse(fileInfoString.replace(/\u0000/g, ''))
            // // console.log(fileInfo);
            // let type = 'utf8'
            // let head = ''
            // console.log(fileInfo.type);
            // switch (fileInfo.type) {
            //     case 'image/png':
            //     case 'image/jpeg':
            //     case 'image/gif':
            //     case 'image/bmp':
            //         type = 'base64'
            //         head = `data:${fileInfo.type};base64,`
            //         break;

            //     default:
            //         type = 'utf8'
            //         break;
            // }
            // console.log(type);
            // // console.log(resultBuffer.toString('base64'));
            // return head+resultBuffer.slice(300).toString(type)




            // var ipfs = await IpfsApi('localhost', '5001', { protocol: 'http' })
            // let resultBuffer = await ipfs.cat(hash)
            // console.log(resultBuffer);
            // console.log(fileInfo);
            // let path = _path.join(__dirname,'../','../','public','downloads',`${hash.slice(0,5)}_${fileInfo.name}`)
            // return resultBuffer.slice(300)
            // return resultBuffer
            // return file
            // let path = _path.join(__dirname,'../','../','public',hash)
            // console.log(path);
            // var ws = fs.createReadStream(path)
            // let resData = []
            // if (ws) {
            //     ws.on('data',function (chunk) {
            //         resData.push(chunk)
            //     })
            //     ws.on('end',function () {
            //         let finalData = Buffer.concat(resData)

            //     })
            // }
            // console.log(ws);
        } catch (err) {
            console.error(err);
            return err
        }

    }
}

