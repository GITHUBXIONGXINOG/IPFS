let IpfsApi = require("ipfs-api")
const pathFn = require('path')
const fs = require('fs')
const { SM4 } = require('gm-crypto')
const { progress } = require('./progress')
const CHUNK_SIZE = 1024
module.exports = {
    addfile: async (param, key) => {
        return new Promise(async (resolve) => {
            try {
                var ipfs = IpfsApi('localhost', '5001', { protocol: 'http' })
                //获取文件信息
                // console.log(param);
                // console.log(key);
                // console.log(key.smKey);
                // console.log(param,key);
                const { path, type, name, size, lastModifiedDate } = param
                const upload_file = { path, type, name, size, lastModifiedDate }
                // console.log(upload_file);
                //hash
                let hash = null
                // console.log(path, type, name, size, lastModifiedDate);
                //创建信息buffer保存文件信息,固定长度300
                // const fdInfoBuf = Buffer.alloc(300);
                //将文件信息写入
                // fdInfoBuf.write(JSON.stringify(upload_file))


                // 将字符串密钥转为16进制保存
                function stringToHex(str) {
                    var val = "";
                    for (var i = 0; i < str.length; i++) {
                        val += str.charCodeAt(i).toString(16);
                    }
                    while (val.length < 32) {
                        let len = 32 - val.length
                        let fill = len < val.length ? len : val.length
                        val += val.slice(0, fill)
                    }
                    return val;
                }

                let hexKey = stringToHex(key);

                let encryptedData, decryptedData
                //保存加密后的字符串数组
                let arrData = []
                //创建读入流
                let rs = fs.createReadStream(path, {
                    highWaterMark: CHUNK_SIZE,//一次读取1024个字节
                })

                rs.on("open", () => {
                    console.log("文件打开")
                });
                //疯狂触发data事件 直到读取完毕
                let i = 0
                rs.on('data', (data) => {
                    // console.log(data); //共读4个字节，但是highWaterMark为3，所以触发2次data事件，分别打印123  4
                    //1.将文件读取的buffer数据以每1024个为一组,转为JSON数据,进行加密
                    encryptedData = SM4.encrypt(JSON.stringify(data), hexKey, {
                        inputEncoding: 'utf8',
                        outputEncoding: 'base64'
                    })
                    //2.将加密后生成的密文(一串字符串)放入数组
                    arrData.push(encryptedData)
                    // debugger
                    progress((i++) * CHUNK_SIZE, size)
                });
                rs.on("err", () => {
                    console.log("发生错误")
                });
                rs.on('end', () => { //文件读取完毕后触发
                    console.log("读取完毕");
                    addipfs()
                    progress(0, 0, true)
                });
                rs.on("close", () => { //最后文件关闭触发
                    console.log("关闭")
                });




                // for (let i = 0,len=arrData.length; i < len; i++) {
                //     AllBuf.push(Buffer.from(arrData[i] + '==+=='))
                //     if (i===len-1) {
                //         debugger
                //         addipfs()
                //     }
                // }
                var addipfs = async function () {
                    let AllBuf = []

                    arrData.forEach((item) => {
                        AllBuf.push(Buffer.from(item + '==+=='))
                    })
                    debugger
                    // console.log(AllBuf);
                    //4.合并为一个buffer进行传输
                    let tempBuffer = Buffer.concat(AllBuf)
                    // console.log(tempBuffer);

                    //拼接文件信息和文件内容
                    // const content = Buffer.concat([fdInfoBuf, tempBuffer])
                    // console.log(content.slice(300));
                    // debugger
                    // 添加到ipfs
                    let resFile = await ipfs.add({
                        path: path,
                        content: tempBuffer
                    })
                    filehash = await resFile[0].hash

                    if (filehash) {
                        fs.unlink(path, (err) => { if (err) console.error(err); })
                    }

                    //把文件hash存入文件信息hash中,并反返回给前端
                    upload_file.filehash = filehash
                    // let infobuf = Buffer.alloc(400)
                    // infobuf.write(JSON.stringify(upload_file))
                    let infobuf = Buffer.from(JSON.stringify(upload_file))
                    // console.log(infobuf);
                    let resInfo = await ipfs.add(infobuf)
                    let hash = resInfo[0].hash
                    resolve(hash)
                }





            } catch (err) {
                console.error(err);
                return err
            }
        })

    }
}