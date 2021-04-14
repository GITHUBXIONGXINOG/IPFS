let IpfsApi = require("ipfs-api")
module.exports = {
    // statusInfo: async ()=>{
    //     let id = await IpfsApi.id()
    //     console.log(id);
    // }
    statusInfo: async ()=>{
        try{
            var ipfs = await IpfsApi('localhost', '5001', {protocol : 'http'})
            let id = await ipfs.id()
            // console.log(id);
       
            // console.log(result);
            return id
        }catch(err){
            console.error(err);
            return err
        }
    }
    
}