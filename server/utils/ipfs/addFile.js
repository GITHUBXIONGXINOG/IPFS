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
                const fdInfoBuf = Buffer.alloc(300);
                //将文件信息写入
                fdInfoBuf.write(JSON.stringify(upload_file))


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
                    progress((i++)*CHUNK_SIZE,size)
                });
                rs.on("err", () => {
                    console.log("发生错误")
                });
                rs.on('end', () => { //文件读取完毕后触发
                    console.log("读取完毕");
                    addipfs()
                    progress(0,0,true)
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
                    // console.log(AllBuf);
                    //4.合并为一个buffer进行传输
                    let tempBuffer = Buffer.concat(AllBuf)
                    // console.log(tempBuffer);

                    //拼接文件信息和文件内容
                    const content = Buffer.concat([fdInfoBuf, tempBuffer])
                    // console.log(content.slice(300));
                    // debugger
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
                }







                //------------------------------------------------------------------------------------------------
                /*   fs.readFile(path, async (err, fd) => {
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
                      // let jsonFd = JSON.stringify(fd)
                      // console.log(fd);
                      // console.log(fd.length);
         
                      // buf.slice([start[, end]])
                      let arrData = []
                      // let buf = Buffer.alloc(25)
         
                      for (let index = 0, len = fd.length; index < len; index += 1024) {
                          // progress(Math.floor((index/len)*100))
                          // progress(index)
         
                          // console.log(index);
                          // console.log(progress());
         
                          //1.将文件读取的buffer数据以每1024个为一组,转为JSON数据,进行加密
                          encryptedData = SM4.encrypt(JSON.stringify(fd.slice(index, index + 1024)), hexKey, {
                              inputEncoding: 'utf8',
                              outputEncoding: 'base64'
                          })
                          //2.将解密后生成的密文(一串字符串)放入数组
                          arrData.push(encryptedData)
                      }
         
                      // progress(100)
                      // console.log(progress());
                      // console.log(arrData);
                      let AllBuf = []
                      //3.将多个字符串数组转换为buffer数组
                      for (var i = 0; i < arrData.length; i++) {
                          AllBuf.push(Buffer.from(arrData[i] + '==+=='))
                      }
                      // debugger
                      // arrData.forEach(item=>{
                      //     debugger
                      //     console.log(item);
                      //     AllBuf.push(item+'==+==')
                      // })
                      //4.合并为一个buffer进行传输
                      let tempBuffer = Buffer.concat(AllBuf)
                      // console.log(tempBuffer);
                      // debugger
         
                      //........................中间以buffer传输
         
                      // //5.接收到buffer数据,转为字符串
                      // let tempString = tempBuffer.toString()
                      // console.log(tempString);
         
                      // // let AllBuf = Buffer.concat(arrData)
                      // // console.log(AllBuf);
                      // let resBuf = []
                      // debugger
                      // //6.根据预定义的特征字符串进行切割
                      // let arrString = tempString.split('==+==')
                      // console.log(arrString);
                      // //循环,由于切割后最后一个是空,所以循环次数减一
                      // for (var index = 0; index < arrString.length-1; index++) {
                      //     //6.以每25为一组进行分组
                      //     let chunkBuf =  arrString[index]
                      //     //7.转换为对应的json
                      //     let chunkJSON = chunkBuf.toString()
                      //     // 8.传入json进行解密,得到json字符串格式的数据
                      //     decryptedData = SM4.decrypt(chunkJSON, hexKey, {
                      //         inputEncoding: 'base64',
                      //         outputEncoding: 'utf8'
                      //     })
                      //     // debugger
                      //     // 9.将数据解析为json格式,并转为buffer,存入buffer数组
                      //     resBuf.push(Buffer.from(JSON.parse(decryptedData)))
                      // }
                      // console.log(resBuf);
                      // //10.对buffer数组进行拼接
                      // let resAllBuf = Buffer.concat(resBuf)
                      // console.log(resAllBuf);
                      // //11.对buffer数据进行解析
                      // console.log(resAllBuf.toString());
         
         
         
         
         
                      // console.log('-----------------------------------------------');
                      // console.log('2-jsonFd:',jsonFd);
                      // ECB
                      // encryptedData = SM4.encrypt(jsonFd, hexKey, {
                      //     inputEncoding: 'utf8',
                      //     outputEncoding: 'base64'
                      // })
                      // console.log('-----------------------------------------------');
                      // console.log('3-encryptedData:', encryptedData);
         
                      // const tempBuffer = Buffer.from(encryptedData)
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
                      // console.log(content.slice(300));
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
                  }) */

                //------------------------------------------------------------------------------------------------



            } catch (err) {
                console.error(err);
                return err
            }
        })

    }
}