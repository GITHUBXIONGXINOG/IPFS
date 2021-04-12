module.exports = {
    devServer: {
        open: false,
        hotOnly: true,
        proxy: {
            '/api':{
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite:{
                    '^/api': ''
                }
            }
        }
    }
}