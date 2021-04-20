var express = require('express');
var router = express.Router();
const _path = require('path')
const fs = require('fs')
const { download } = require('../utils/ipfs/download')
/* GET users listing. */
router.post('/', async function (req, res, next) {
    const {hash} = req.body
    try{
        debugger
        let fileBuffer = await download(hash)
        // console.log('file',fileUrl);
        // debugger
        res.send(fileBuffer)
    }catch(err){
        // console.log('密码错误');
        // console.error(err);
        // debugger
        res.send({Error:'密钥错误',Code: '401'})
    }

});

module.exports = router;
