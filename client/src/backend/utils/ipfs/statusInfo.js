const IPFS = require("ipfs-core")
module.exports = {
    // statusInfo: async ()=>{
    //     let id = await IpfsApi.id()
    //     console.log(id);
    // }
    statusInfo: async ()=>{
        try{
            // var ipfs = await IpfsApi('localhost', '5001', {protocol : 'http'})
            // let id = await ipfs.id()
            // console.log(id);
       
            // console.log(result);
            const ipfs = await IPFS.create()
            const identity = await ipfs.id()
            return identity
        }catch(err){
            console.error(err);
            return err
        }
    }
    
}