
var progress = 0
module.exports.progress = (val)=>{
    if (val) {
        progress = val
    } else{
        return progress
    }
}