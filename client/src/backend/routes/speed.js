var express = require('express');
var router = express.Router();
const { speedInfo } = require('../utils/ipfs/speedInfo')
/* GET users listing. */
router.get('/', async function (req, res, next) {
    let info = await speedInfo()
    if (!info.errno) {
        res.send(info);
    }else{//IPFS连接失败
        res.status(504).send(info);
    }
});

module.exports = router;
