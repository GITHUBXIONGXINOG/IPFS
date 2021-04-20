importScripts('SM4Util.js')
onmessage = function (event) {
    // debugger
    console.log("worker1 onmessage");
    // let data = event.data
    // console.log(data);
    // var dataView = new DataView(data)
    // console.log(dataView.getUint8(0));
    // var aView = new Int8Array(data,0,1);
    // console.log(aView);
    // console.log(data/);
    // console.log(data.slice(0,20));
    // let chunkData = data.slice(0,20).toString()
    // var reader = new FileReader();
    // let rs = reader.readAsArrayBuffer(data)
    // console.log(rs);
    // debugger
    //flag 0 加密 1 解密
    const { file, key, flag } = event.data
    // let encryData = encryptData_ECB(file,key)
    const CHUNK_SIZE = 1024 //加密分片大小
    const ENCRY_SIZE = 1388 //解密分片大小
    let encryData = ''
    let chunkInfo = {
        completeChunkNum: 0, //完整的chunk数量,大小为1388
        uncompleteChunkLen: 0 //不完整的chunk长度,如果完整的chunk数量为0,就是开头,否则就是结尾
    }
    if (!flag) {
        for (var i = 0, len = file.length; i < len; i += CHUNK_SIZE) {
            // console.log(file.slice(i, i+CHUNK_SIZE));
            let chunkData = encryptData_ECB(file.slice(i, i + CHUNK_SIZE), key)
            // console.log(`加密数据片${i}:`, chunkData)
            postMessage({ progress: i / len })
            encryData = encryData.concat(chunkData)
            if (chunkData.length < 1388) {
                chunkInfo.uncompleteChunkLen = chunkData.length
            } else {
                chunkInfo.completeChunkNum++
            }
        }
        postMessage({ progress: 1 })

        postMessage({ encryData })

    } else {
        //循环解密
    let decryptData = ''
// debugger
        for (var i = 0, len = file.length; i < len; i += ENCRY_SIZE) {
            let chunkData
            //为一整个分片
            if (i + ENCRY_SIZE < len) {
                chunkData = decryptData_ECB(file.slice(i, i + ENCRY_SIZE), key)
            } else {//为开头或结尾处不是一整个的分片
                chunkData = decryptData_ECB(file.slice(i), key)
            }
            decryptData = decryptData.concat(chunkData)

            // console.log(`解密数据片:`, chunkData)


            postMessage({ progress: i / len })
            postMessage({ decryptData })

        }
    }


    // console.log(encryData);
    // encryData = encryData.concat('chunkInfo:',JSON.stringify(chunkInfo))

    // debugger
    // console.log(chunkInfo);
    // let index = 0
    // let comChNm= chunkInfo.completeChunkNum
    // let unChLen= chunkInfo.uncompleteChunkLen
    // if (comChNm) {
    //    for (var i = 0,end=comChNm*1388; i < end; i+=SIZE) {
    //     let chunkData = decryptData_ECB(encryData.slice(i, i+SIZE), key)
    //     console.log(`解密数据片${i}:`, chunkData)
    //     decryptData = decryptData.concat(chunkData)
    //    }
    // }

    //循环解密
    // for (var i = 0, len = encryData.length; i < len; i+=SIZE) {
    //     let chunkData
    //     //为一整个分片
    //     if (i+SIZE<encryData.length) {
    //        chunkData = decryptData_ECB(encryData.slice(i, i + SIZE), key)
    //     } else{//为开头或结尾处不是一整个的分片
    //         chunkData = decryptData_ECB(encryData.slice(i), key)
    //     }
    //     decryptData = decryptData.concat(chunkData)

    //     // console.log(`解密数据片:`, chunkData)


    //     postMessage({progress: i / len})
    // }


    // while(comTime<comChNm){
    //     let chunkData = decryptData_ECB(encryData.slice(comStart, comStart+SIZE), key)
    //     // console.log(`解密数据片${comTime}:`, chunkData)
    //     decryptData = decryptData.concat(chunkData)
    //     comStart+=SIZE
    //     comTime++
    //     postMessage(comTime/comChNm+1)

    // }

    // if (unChLen) {
    //     let chunkData = decryptData_ECB(encryData.slice(-unChLen), key)
    //     // console.log(`解密不完整数据片:`, chunkData)
    //     decryptData = decryptData.concat(chunkData)
    //     postMessage(100)

    // }

    // chunkInfo.forEach(size=>{
    //     console.log(size);
    //     debugger
    //     let chunkData = decryptData_ECB(encryData.slice(index, index+1388), key)
    //     console.log(`解密数据片${i}:`, chunkData)
    //     decryptData = decryptData.concat(chunkData)
    //     index += size
    // })
    // for (var i = 0, len = encryData.length; i < len; i += CHUNK_SIZE) {
    //     console.log(encryData.slice(i, i+CHUNK_SIZE));
    //     let chunkData = decryptData_ECB(encryData.slice(i, CHUNK_SIZE), key)
    //     console.log(`解密数据片${i}:`, chunkData)
    //     decryptData = decryptData.concat(chunkData)
    // }
    // let decryptData = decryptData_ECB(encryData, key)


    // console.log('解密数据:', decryptData);



    // console.log(decryptData_ECB('4ncw+RSEdPY/gnet0Usv0LEtCGYrxBzm6zSzXrLScUA='));
    // console.log();


    // var reader = new FileReader();
    // let rs = reader.readAsArrayBuffer(event)
    // debugger
    // console.log(rs);
    // console.log(SM4Util());
    // console.log(SM4Util.encryptData_ECB());

    // let res = tempScript(1)
    // console.log(res);
    // // console.log(tempScript());
    // encryData(event.data)
    // const { encryptData_ECB, decryptData_ECB } = 
    // let res =  decryptData_ECB('4ncw+RSEdPY/gnet0Usv0LEtCGYrxBzm6zSzXrLScUA=')
    // postMessage(res)
    // debugger

    // var reader = new FileReader();
    // reader.readAsArrayBuffer(event);
    // reader.onload = (e) => {
    //   const fileString = e.target.result;
    //   console.log(fileString);
    // };


    // let data = event
    // let encryData = encryptData_ECB(data)
    // console.log('加密数据:',encryData);
    // let decryptData = decryptData_ECB(encryData)
    // console.log('解密数据:',decryptData);
    // console.log(decryptData_ECB('4ncw+RSEdPY/gnet0Usv0LEtCGYrxBzm6zSzXrLScUA='));
    // console.log();
    //  postMessage(decryptData_ECB(event.data))
}