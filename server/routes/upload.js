var express = require('express');
var router = express.Router();
const formidable = require('formidable')
const path = require('path')
const {addfile} = require('../utils/ipfs/addFile')
/* GET home page. */
router.post('/', function(req, res, next) {
    const form = new formidable.IncomingForm()
    form.uploadDir = path.join(__dirname,'../','public','uploads')
    form.keepExtensions = true
    //设置参数的大小
    form.maxFileSize  = 2000 * 1024 * 1024;
    form.parse(req,async (err,fields,files)=>{
        if (err) {
            console.log(err)
        }
        // console.log(fields);
        // console.log(files);
        let resFile = await addfile(files)
        // console.log(resFile);
    })
//    console.log(req.body);
//    res.send('ok')
});

module.exports = router;
