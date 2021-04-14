var express = require('express');
var router = express.Router();
const _path = require('path')
const fs = require('fs')
const { download } = require('../utils/ipfs/download')
/* GET users listing. */
router.get('/', async function (req, res, next) {
    let file = await download(req.query.url)
    // console.log(file);
    res.send(file)
    // debugger
    // let path = _path.join(__dirname, '../', 'public', req.query.url)
    // console.log(path);
    // // console.log(path.split('_'));
    // let size = fs.statSync(path).size
    // res.writeHead(200, {
    //     'Content-Type': 'application/force-download',
    //     'Content-Disposition': 'attachment; filename=' + path.split('_')[1],
    //     'Content-Length': size
    // })
    // fs.createReadStream(path).pipe(res)

    // fs.readFile(path,(err,data)=>{
    //     if (err) {
    //         res.send('下载失败')
    //     }else{
    //         console.log(data);
    //         res.send(`data:image/png;base64,${resultBuffer.toString('base64')}`)

    //     }
    // })
    // let info = await download()
    // console.log(req.query.url);
    // if (!info.errno) {
    //     res.send(info);
    // } 
    // let resultBuffer = await download(req.query.hash)
    // let resultBuffer = await download(req.query.)

    // console.log(result.tostring('base64'));
    // console.log(result.toString('base64'));
    // res.send(result)
    // let result = `data:image/png;base64,${resultBuffer.toString('base64')}`
    // res.send(result)
    // let path = _path.join(__dirname,'../','public',req.query.url)
    // console.log(path);
    // let rw = fs.createReadStream(path)
    // console.log(rw);
    // res.send(rw)
    // fs.readFile(path,'base64',(err,data)=>{
    //     if (err) {
    //         console.error(err)
    //     }else{
    //         console.log(data);
    //         res.send(`data:image/png;base64,${data}`)
    //     }
    // })
    // res.sendFile(path)
    // res.send('https://todo-1258496109.cos.ap-chengdu.myqcloud.com/uploads/upload_02ab40edf0d28434279e0adddafdf9f9.png')


});

module.exports = router;
