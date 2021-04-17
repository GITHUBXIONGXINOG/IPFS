let IpfsApi = require("ipfs-api")
const fs = require('fs')
const _path = require('path')
const { SM4 } = require('gm-crypto')

module.exports = {
    download: (url, key) => {
        return new Promise(async (resolve, reject) => {
            try {
                let path = _path.join(__dirname, '../', '../', 'public', url)
                // console.log(path);
                // fs.unlink(path,(err)=>{if(err)console.error(err);})

                // console.log(_key);
                // const key = '0123456789abcdeffedcba9876543210' // Any string of 32 hexadecimal digits
                fs.readFile(path, (err, fd) => {
                    if (err) {
                        console.error(err)
                    }
                    debugger
                    // console.log(path);
                    // console.log(fd);

                    //5.接收到buffer数据,转为json
                    // let tempJSON = fd.toJSON()
                    // console.log('-----------------------------------------------');
                    // console.log('3.2-tempJSON:',tempJSON);
                    //当输入密钥不足32位时进行填充
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


                    //5.接收到buffer数据,转为字符串
                    let tempString = fd.toString()
                    // console.log(tempString);

                    // let AllBuf = Buffer.concat(arrData)
                    // console.log(AllBuf);
                  

                    try {
                        let resBuf = []
                        debugger
                        //6.根据预定义的特征字符串进行切割
                        let arrString = tempString.split('==+==')
                        // console.log(arrString);
                        //循环,由于切割后最后一个是空,所以循环次数减一
                        for (var index = 0; index < arrString.length - 1; index++) {
                            //6.以每25为一组进行分组
                            let chunkBuf = arrString[index]
                            //7.转换为对应的json
                            let chunkJSON = chunkBuf.toString()
                            // 8.传入json进行解密,得到json字符串格式的数据
                            decryptedData = SM4.decrypt(chunkJSON, hexKey, {
                                inputEncoding: 'base64',
                                outputEncoding: 'utf8'
                            })
                            // debugger
                            // 9.将数据解析为json格式,并转为buffer,存入buffer数组
                            resBuf.push(Buffer.from(JSON.parse(decryptedData)))
                        }
                        // console.log(resBuf);
                        //10.对buffer数组进行拼接
                        let resAllBuf = Buffer.concat(resBuf)
                        // console.log(resAllBuf);
                        //11.对buffer数据进行解析
                        // console.log(resAllBuf.toString());
                        // decryptedData = SM4.decrypt(tempJSON, hexKey, {
                        //     inputEncoding: 'base64',
                        //     outputEncoding: 'utf8'
                        // })
                        // console.log('-----------------------------------------------');
                        // console.log('4-decryptedData:', decryptedData);
                        // const jsonData = JSON.parse(decryptedData)
                        // console.log('-----------------------------------------------');
                        // console.log('5-jsonData',jsonData);
                        // const decryptedDataBuffer = Buffer.from(jsonData)
                        // console.log('-----------------------------------------------');
                        // console.log("6-decryptedDataBuffer:",decryptedDataBuffer);
                        // console.log(path);
                        let decryptedParh = path + '_decrypted'
                        fs.writeFile(decryptedParh, resAllBuf, (err) => {
                            if (err) {
                                // console.log(err)
                                reject(err)
                            } else {
                                resolve(`/api/${url}_decrypted`)
                            }
                        })
                        tempString = ''
                        resBuf = []
                    } catch (err) {
                        // console.error(err);
                        reject(err)
                    }

                })
                // console.log(fss);
                // return `/api/${url}_decrypted`

            } catch (err) {
                debugger
                console.error(err);
                return err
            }
        })


    }
}

