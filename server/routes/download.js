var express = require('express');
var router = express.Router();
const { download } = require('../utils/ipfs/download')
/* GET users listing. */
router.get('/', async function (req, res, next) {
    let info = await download()
    if (!info.errno) {
        res.send(info);
    } 
});

module.exports = router;
