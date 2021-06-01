var express = require('express');
var router = express.Router();
const formidable = require('formidable')
const path = require('path')
const {addfile} = require('../utils/ipfs/addFile')
/* GET home page. */
router.post('/', function(req, res, next) {
    const form = new formidable.IncomingForm()
    form.uploadDir = path.join(__dirname,'../','public','uploads')
    //保留后缀
    form.keepExtensions = true
    //设置参数的大小
    form.maxFileSize  = 2000 * 1024 * 1024;
    form.parse(req,async (err,fields,files)=>{
        if (err) {
            console.log(err)
        }
        // console.log(fields);
        // console.log(files);
        try{
            let resFile = await addfile(files.file,fields.smKey)
            res.json(200,{hash:resFile})
        }catch(err){
            console.error(err);
            res.send(err)
        }
    
    })
//    console.log(req.body);
//    res.send('ok')
});

module.exports = router;
