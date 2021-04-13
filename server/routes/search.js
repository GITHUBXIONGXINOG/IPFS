var express = require('express')
var router = express.Router()
const {search} = require('../utils/ipfs/search')
router.get('/',async (req,res,next)=>{
    let {hash} = req.query
    let resSearch =  await search(hash)
    // console.log(resSearch);
    res.send(resSearch)
})

module.exports = router