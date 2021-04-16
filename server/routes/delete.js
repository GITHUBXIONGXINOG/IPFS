var express = require('express');
var router = express.Router();
let IpfsApi = require("ipfs-api")
const fs = require('fs')
const _path = require('path')

/* GET users listing. */
router.get('/', async function (req, res, next) {
   var ipfs = await IpfsApi('localhost', '5001', { protocol: 'http' })
   // console.log(req.query.hash);
   let hash = req.query.hash
   let pathInfo =  await ipfs.pin.ls(hash)
   let path = pathInfo[0].type.split(' ')[2]
   // console.log(path);
   ipfs.pin.rm(path,(err)=>{
      if (err) {
         console.error(err)
        res.send({Error:'删除失败',Code: '401'})
      }
   })
   res.send('删除固定成功')
});

module.exports = router;
