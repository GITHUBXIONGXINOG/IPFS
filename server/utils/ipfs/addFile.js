let IpfsApi = require("ipfs-api")
const pathFn = require('path')
const fs = require('fs')
const { SM4 } = require('gm-crypto')
const { progress } = require('./progress')
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


                fs.readFile(path, async (err, fd) => {
                    if (err) {
                        console.error(err)
                    }

                    //创建信息buffer保存文件信息,固定长度300
                    const fdInfoBuf = Buffer.alloc(300);
                    //将文件信息写入
                    fdInfoBuf.write(JSON.stringify(upload_file))

                    // 把数据转换成Buffer
                    // const fdBuffer = Buffer.from(fd)
                    // console.log(content);
                    //当输入密钥不足32位时进行填充

                    // console.log(key);
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

                    // var str = "pytdthrsw54w456565653541234567890qwertyuiopasdfghjk";
                    let hexKey = stringToHex(key);
                    // console.log(Hex);
                    // var val = "";
                    // // var arr = Hex.split(",");
                    // for (var i = 0; i < Hex.length; i=i+2) {
                    //     debugger
                    //     let p = Hex.slice(i,i+2)
                    //     val += String.fromCharCode(parseInt(p, 16));
                    // }
                    // // for (var i = 0; i < Hex.length; i++) {

                    // //     val += String.fromCharCode(parseInt(arr[i], 16));
                    // // }
                    // console.log(val);
                    // const key = '0123456789abcdeffedcba9876543210' // Any string of 32 hexadecimal digits
                    // const key = '11111111111111111111111111111111' // Any string of 32 hexadecimal digits
                    // const originalData = fd
                    let encryptedData, decryptedData
                    // console.log('1-fd:',fd);
                    let jsonFd = JSON.stringify(fd)
                    console.log(fd);
                    // console.log(fd.length);

                    // buf.slice([start[, end]])
                    let arrBuf = []
                    // let buf = Buffer.alloc(25)

                    for (let index = 0; index < fd.length; index += 25) {
                        //1.将文件读取的buffer数据以每25个为一组,转为JSON数据,进行加密
                        encryptedData = SM4.encrypt(JSON.stringify(fd.slice(index, index + 25)), hexKey, {
                            inputEncoding: 'utf8',
                            outputEncoding: 'base64'
                        })
                        //2.将解密后生成的密文(一串字符串)放入数组
                        arrBuf.push(encryptedData)

                    }
                    progress(100)
                    console.log(progress());
                    console.log(arrBuf);
                    let AllBuf = []
                    //3.将多个字符串数组拼接成一个字符串数组
                    for (var i = 0; i < arrBuf.length; i++) {
                        AllBuf = AllBuf.concat(arrBuf[i])
                    }
                    
                    let tempBuf = Buffer.from(AllBuf)
                    console.log(tempBuf);
                    let tempJso = tempBuf.toJSON()
                    console.log(tempJso);

                    // let AllBuf = Buffer.concat(arrBuf)
                    // console.log(AllBuf);
                    let resBuf = []
                    for (var index = 0; index < AllBuf.length; index++) {
                        //4.以每25为一组进行分组
                        let chunkBuf = AllBuf.slice(index, index + 25)
                        //5.转换为对应的json
                        let chunkJSON = chunkBuf.toString()
                        // 6.传入json进行解密,得到json字符串格式的数据
                        decryptedData = SM4.decrypt(chunkJSON, hexKey, {
                            inputEncoding: 'base64',
                            outputEncoding: 'utf8'
                        })
                        // debugger
                        // 7.将数据解析为json格式,并转为buffer,存入buffer数组
                        resBuf.push(Buffer.from(JSON.parse(decryptedData)))
                    }
                    console.log(resBuf);
                    //8.对buffer数组进行拼接
                     let resAllBuf = Buffer.concat(resBuf)
                     console.log(resAllBuf);
                     //9.对buffer数据进行解析
                     console.log(resAllBuf.toString());
                 




                    // console.log('-----------------------------------------------');
                    // console.log('2-jsonFd:',jsonFd);
                    // ECB
                    encryptedData = SM4.encrypt(jsonFd, hexKey, {
                        inputEncoding: 'utf8',
                        outputEncoding: 'base64'
                    })
                    // console.log('-----------------------------------------------');
                    // console.log('3-encryptedData:', encryptedData);

                    const tempBuffer = Buffer.from(encryptedData)
                    // console.log('-----------------------------------------------');
                    // console.log('3.1-tempBuffer:',tempBuffer);
                    // const tempJSON = tempBuffer.toString()
                    // console.log('-----------------------------------------------');
                    // console.log('3.2-tempJSON:',tempJSON);

                    // decryptedData = SM4.decrypt(tempJSON, key, {
                    //     inputEncoding: 'base64',
                    //     outputEncoding: 'utf8'
                    // })
                    // console.log('-----------------------------------------------');
                    // console.log('4-decryptedData:',decryptedData);
                    // const jsonData = JSON.parse(decryptedData)
                    // console.log('-----------------------------------------------');
                    // console.log('5-jsonData',jsonData);
                    // const decryptedDataBuffer = Buffer.from(jsonData)
                    // console.log('-----------------------------------------------');
                    // console.log("6-decryptedDataBuffer:",decryptedDataBuffer);

                    //拼接文件信息和文件内容
                    const content = Buffer.concat([fdInfoBuf, tempBuffer])

                    // 添加到ipfs
                    let resFile = await ipfs.add({
                        path: path,
                        content: content
                    })
                    hash = await resFile[0].hash
                    if (hash) {
                        fs.unlink(path, (err) => { if (err) console.error(err); })
                    }
                    resolve(hash)
                })
            } catch (err) {
                console.error(err);
                return err
            }
        })

    }
}