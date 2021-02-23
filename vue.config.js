module.exports = {
    lintOnSave: false, //禁用eslint
    assetsPublicPath:'./',
    publicPath: process.env.NODE_ENV === 'production'
    ? '/firRespository/'
    : '/',
    devServer:{
        proxy: {
            "/api": {
                target: "http://182.92.128.115",
                // pathRewrite: { "^/api": "" }
            }
        }
    }
}