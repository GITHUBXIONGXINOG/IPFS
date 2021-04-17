const ipfs_core = require('ipfs-core')
const ipfs = async function(){
    return new Promise(async(resolve,reject)=>{
        const ipfs = await ipfs_core.create()
        resolve(ipfs)
    }) 
}
module.exports =  ipfs




