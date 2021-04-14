let IpfsApi = require("ipfs-api")
const fs = require('fs')
const _path = require('path')

module.exports = {
    download: async (hash) => {
        try {
            var ipfs = await IpfsApi('localhost', '5001', { protocol: 'http' })
            let result = await ipfs.cat(hash)
            console.log(result);
            // console.log(fileInfo);
            // let path = _path.join(__dirname,'../','../','public','downloads',`${hash.slice(0,5)}_${fileInfo.name}`)
            return result.slice(300)
            // return result
            // return file
        } catch (err) {
            console.error(err);
            return err
        }

    }
}

 