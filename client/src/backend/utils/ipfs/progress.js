var progress = 0
/**
 * 
 * @param {Number} chunk 分片       
 * @param {Number} size 总大小
 * @param {Boolean} endFlag 结束标记
 * @returns 
 */
module.exports.progress = (chunk, size, endFlag) => {
    if (size) {
        progress = Math.floor((chunk / size) * 100)
    } else if (endFlag) {
        progress = 100
    } else {
        return progress
    }


}