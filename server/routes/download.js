var express = require('express');
var router = express.Router();
const _path = require('path')
const fs = require('fs')
const { download } = require('../utils/ipfs/download')
/* GET users listing. */
router.post('/', async function (req, res, next) {
    const {url, key} = req.body
    let file = await download(url,key)
    res.send(file)

});

module.exports = router;
