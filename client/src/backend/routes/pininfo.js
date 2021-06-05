var express = require('express');
var router = express.Router();
let IpfsApi = require("ipfs-api")
const fs = require('fs')
const _path = require('path')

/* GET users listing. */
router.get('/', async function (req, res, next) {
   var ipfs = await IpfsApi('localhost', '5001', { protocol: 'http' })
   // console.log(req.query.hash);
    let pinList = await ipfs.pin.ls({type:'recursive' })
    let stats = await ipfs.stats.repo()
    let RepoSize = stats.repoSize
    let NumObjects = stats.numObjects
    let pinInfo = {pinList,RepoSize,NumObjects}
    // console.log(pinInfo);
   res.send(pinInfo)
});

module.exports = router;
