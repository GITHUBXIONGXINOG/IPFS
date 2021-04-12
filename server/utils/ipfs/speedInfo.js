let IpfsApi = require("ipfs-api")

module.exports = {
    speedInfo: async ()=>{
        try{
            var ipfs = await IpfsApi('localhost', '5001', {protocol : 'http'})
            // console.log(ipfs);
           let result =  await ipfs.stats.bw()
       
            // console.log(result);
            return result
        }catch(err){
            console.error(err);
            return err
        }
   
      
        // let ipfsTest = () => {
        //     return new Promise(async () => {
        //         // 把数据转换成Buffer
        //         const content = ipfs.types.Buffer.from('ABC')
        //         // 往ipfs中添加数据，添加成功后ipfs会返回一个hash
        //         const results = await ipfs.add(content)
        //         // 得到生成的hash
        //         const hash = results[0].hash
        //         console.log("往ipfs中添加内容成功，生成的hash为 : ", hash)
        //     })
        // }
        
        // ipfsTest()
        
    }
}