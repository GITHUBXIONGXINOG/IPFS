var express = require('express')
var router = express.Router()
const {search} = require('../utils/ipfs/search')
router.get('/',async (req,res,next)=>{
    let {hash} = req.query
    let resSearch =  await search(hash)
    // console.log(resSearch);
    
    // let timestamp = new Date().getTime();
    // let name = resSearch.substring(22, 30) + timestamp + ".png";
    // this.downloadUrl = imgUrl;
    // console.log(this.downloadUrl);
    // this.downloadfilename = name;
    // console.log(`data:image/png;base64,${resSearch}`);
    res.send(`data:image/png;base64,${resSearch}`)
})

module.exports = router