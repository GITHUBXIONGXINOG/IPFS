var express = require('express');
var router = express.Router();
// const { statusInfo } = require('../utils/ipfs/statusInfo')
/* GET users listing. */
const {progress} = require('../utils/ipfs/progress')
router.get('/', async (req, res, next) =>{
    // let connect_status = await statusInfo()
    // if (!connect_status.errno) {
    //     res.send(connect_status);
    // }else{//IPFS连接失败
    //     res.status(504).send(connect_status);
    // }
    // debugger
    // console.log(progress())
    
    // console.log(progress)
    res.send({progress:progress()})
    // res.send('ok')
});

module.exports = router;
