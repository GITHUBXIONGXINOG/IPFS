import { encryptData_ECB, decryptData_ECB } from "./SM4Util";

export default function worker() {
    return new Promise((req,res)=>{
        console.log(req);
        console.log(res);
    })
}