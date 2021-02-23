module.exports = {
    lintOnSave: false, //禁用eslint
    publicPath: './',
    // publicPath: process.env.NODE_ENV === 'production'
    // ? '/firRespository/'
    // : '/',
    devServer:{
        proxy: {
            "/api": {
                target: "http://182.92.128.115",
                // pathRewrite: { "^/api": "" }
            }
        }
    }
}