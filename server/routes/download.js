var express = require('express');
var router = express.Router();
const _path = require('path')
const fs = require('fs')
const { download } = require('../utils/ipfs/download')
/* GET users listing. */
router.get('/', async function (req, res, next) {
    // debugger
    let file = await download(req.query.url)

    res.send(file)

});

module.exports = router;
