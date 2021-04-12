var express = require('express');
var router = express.Router();
const { connect } = require('../utils/ipfs/connect')
/* GET users listing. */
router.get('/', async function (req, res, next) {
    let connect_status = await connect()
    if (!connect_status.errno) {
        res.send(connect_status);
    }else{//IPFS连接失败
        res.status(504).send(connect_status);
    }
});

module.exports = router;
