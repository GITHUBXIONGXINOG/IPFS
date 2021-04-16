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
                    // debugger
                    // console.log(path);
                    // console.log(fd);
                    const tempJSON = fd.toString()
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



                    try {
                        decryptedData = SM4.decrypt(tempJSON, hexKey, {
                            inputEncoding: 'base64',
                            outputEncoding: 'utf8'
                        })
                        // console.log('-----------------------------------------------');
                        // console.log('4-decryptedData:', decryptedData);
                        const jsonData = JSON.parse(decryptedData)
                        // console.log('-----------------------------------------------');
                        // console.log('5-jsonData',jsonData);
                        const decryptedDataBuffer = Buffer.from(jsonData)
                        // console.log('-----------------------------------------------');
                        // console.log("6-decryptedDataBuffer:",decryptedDataBuffer);
                        // console.log(path);
                        let decryptedParh = path + '_decrypted'
                        fs.writeFile(decryptedParh, decryptedDataBuffer, (err) => {
                            if (err) {
                                // console.log(err)
                                reject(err)
                            } else {
                                resolve(`/api/${url}_decrypted`)
                            }
                        })
                    } catch (err) {
                        // console.error(err);
                        reject(err)
                    }

                })
                // console.log(fss);
                // return `/api/${url}_decrypted`

            } catch (err) {
                console.error(err);
                return err
            }
        })


    }
}

