var express = require('express');
var router = express.Router();
let IpfsApi = require("ipfs-api")
const fs = require('fs')
const _path = require('path')

/* GET users listing. */
router.get('/', async function (req, res, next) {
    const IPFS = require('ipfs-core')
    const ipfs = await IPFS.create()
    // const { cid } = await ipfs.add('Hello test')
    // console.info(cid)
    // let hash = 'QmNRCQWfgze6AbBCaT1rkrkV5tJ2aP4oTNPb5JZcXYywve'
    // let result = await ipfs.ls()
    // let car = await ipfs.cat('QmNRCQWfgze6AbBCaT1rkrkV5tJ2aP4oTNPb5JZcXYywve')
    // console.log(car);
    // console.log(result);
    let ipfsPath = 'QmNRCQWfgze6AbBCaT1rkrkV5tJ2aP4oTNPb5JZcXYywve'
    for await (const chunk of ipfs.cat(ipfsPath)) {
        console.info(chunk)
        console.log(chunk.toString());
      }
      const cid = 'QmQ2r6iMNpky5f1m4cnm3Yqw8VSvjuKpTcK1X7dBR1LkJF'

      for await (const file of ipfs.ls(ipfsPath)) {
        console.log(file.path)
      }
    // res.send(result)
});

module.exports = router;
