var express = require('express');
var router = express.Router();
const _path = require('path')
const fs = require('fs')
const { download } = require('../utils/ipfs/download')
/* GET users listing. */
router.post('/', async function (req, res, next) {
    const {url, key} = req.body
    try{
        let fileUrl = await download(url,key)
        // console.log('file',fileUrl);
        res.send(fileUrl)
    }catch(err){
        // console.log('密码错误');
        // console.error(err);
        res.send({Error:'密钥错误',Code: '401'})
    }

});

module.exports = router;
