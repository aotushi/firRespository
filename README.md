## demo
> 将Vue项目demo同步到github仓库中,同时将打包后的dist文件内容提交到gh-pages分支,实现Github Pages静态页面预览.

### 大体步骤:
#### 0.项目推送至仓库master分支下
> 此步骤可有可无,不影响后面向gh-pages分支推送.

#### 1.本地打包
* 打包前设置
  > 需要在vue.config.js文件中做出如下设置,添加assetsPublicPath与publicPath属性,解决dist文件中index.html加载因路径问题导致的页面没有内容,和推送时的设置(Vue-cli文档)
    ```js
    module.exports = {
    lintOnSave: false, //禁用eslint
    publicPath:'./',
    // publicPath: process.env.NODE_ENV === 'production'? '/你的仓库名称/': '/', -->
     devServer:{
        proxy: {
            "/api": {
                target: "http://xxx.xxx.xx.xxx",
                // pathRewrite: { "^/api": "" }
            }
        }
     }
    }
* 更新.gitignore
> 若有/dist, 删除

#### 2.推送
> 使用`git subtree push --prefix dist origin gh-pages`将dist目录推送到远程的gh-pages分支，若远程没有gh-pagse分支则会新建gh-pagse分支然后再推送。
> 有的教程上说还要设置下仓库setting中的GitHubPages设置.可能是时效原因, 此项目提交后可预览页面.


#### 3.仍存在的问题:

* mock数据失效
> 打包后的项目时属于静态资源的，点击index.html查看项目，是无法加载mock的数据的，浏览器也会报跨域的错误。若想正常的加载mock数据，最好的方式是讲打包后的资源丢到服务器中，或者使用jsonp请求线上真实数据

* 首页请求有404(0)




#### 参考链接:
0.[vue-cli文档-publicPath](https://cli.vuejs.org/zh/config/#publicpath)

1.[vue-cli官方文档](https://cli.vuejs.org/zh/guide/deployment.html#github-pages)

2.[msdn 关于vue-cli项目build后本地和github pages预览问题](https://blog.csdn.net/x550392236/article/details/80416909)

3.[msdn Vue项目打包部署到GitHub Pages](https://blog.csdn.net/weixin_44670973/article/details/107130231)

4.[jb51 vue项目打包后上传至GitHub并实现github-pages的预览](https://www.jb51.net/article/160778.htm)