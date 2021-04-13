let IpfsApi = require("ipfs-api")

module.exports = {
    search: async (hash) => {
        try {
            var ipfs = await IpfsApi('localhost', '5001', { protocol: 'http' })
            let result = await ipfs.cat(hash)
            return result
        } catch (err) {
            console.error(err);
            return err
        }

    }
}

 