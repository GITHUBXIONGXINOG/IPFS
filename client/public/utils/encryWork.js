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
    debugger
    const {file,key} = event.data
    let encryData = encryptData_ECB(file,key)
    console.log('加密数据:', encryData);
    debugger
    let decryptData = decryptData_ECB(encryData,key)
    console.log('解密数据:', decryptData);
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
    postMessage(encryData)
    //  postMessage(decryptData_ECB(event.data))
}