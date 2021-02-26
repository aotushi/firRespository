# vue-admin-template

### 0.文件功能一览

```
//模板

//模板调用命令
yarn dev
npm run dev

//文件夹一览
public  项目根目录,
src
tests 测试单元

.env.devlopment 开发环境配置的变量
.env.production 生产环境配置的变量
.env.staging 
.estlintignore eslint检查规范要忽略的内容
.eslintrc.js eslint配置文件
.gitignore  git相关忽略文件
.travis.yml 测试相关
babel.config.js
debug.log 调试日志,可写可不写
jest.config.js webpack中配置的
jsconfig.json 可写@符联想
LICENSE 证书
package-lock.json
package.json
postcss.config.js 自动给css添加前缀 例如使用css2还是css3
vue.config.js


//src文件夹一览
api 接口请求函数 
assets      图片
components  共用非路由组件
icons       svg图片 矢量图方法不失真
layout      一级路由组件: 对应后台首页整体框架 //应用中只有2个一级路由组件:登录页+layout
router
store
styles      项目共用的css文件,使用scss格式, 
    index.scss引入到main.js中
utils
utils/requests  axios的二次封装文件
	baseURL:process.env.VUE_APP_API
	process.env根据现在所处的环境,自动选择VUE_APP_API的值

views
App.vue
main.js
permission.js
setting.js

```



### 1. [product/trademark/List.vue](./documents/view-product-trademark.md)

#### 1.1 the doc format of api

#### 1.2 data transfer of el-table

#### 1.3 el-table>el-table-column

#### 1.4 pagination

#### 1.5 Dialog对话框

#### 1.6 Upload上传

#### 1.7 修改和删除回调

















