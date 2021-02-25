### paysuccess component points



### default data setting

```js
//首次访问页面时,需要有默认数据才能请求成功

data(){
    return {
        page:1,
        limit:3
    }
}
```





### 分页器回调两种写法:

```js
//分页器组件 第一种写法:配合回调函数
<Pagination
	:currentPageNo = 'page'
	:total = "myOrderInfo.total"
	:pageSize = 'limit'
	:continueNo = '5'
	@changePageNo = 'changePageNo'
/>
        
methods:{
    changePageNo(){
        this.page = page;
        this.getMyOrderInfo();
    }
}

//分页器组件的第二种写法: 使用请求函数代替回调
<Pagination
	:currentPageNo = 'page'
	:total = "myOrderInfo.total"
	:pageSize = 'limit'
	:continueNo = '5'
	@changePageNo = 'getMyOrderInfo'
/>
```





### td标签合并多余单元格

```js
//rowspan是跨行合并
<td v-if="index===0" :rowspan="order.orderDetailList.length">
    //v-if只显示第一行的当前列(搭配代码中tr,td结构). rowspan跨行合并
</td>
```





### 路由功能完善

```js
//全局守卫

let targetPath = to.path;
if(targetPath!==indexOf('/trade') || tragetPath!==indexOf('/pay')||targetPath.startsWith('/center')){
    next('/login?redirect='+targetPath);
}else{
    next();
}
```



### 路由页面跳转前的限制

```js
全局守卫: 如果是跳转多个页面都要进行同一个检测，那么必然使用的是全局守卫（前置）
路由独享守卫/组件内守卫: 从一个页面跳转到另一个页面
路由独享守卫: beforeEnter:(to,from,next)=>{}
组件内守卫: 在页面还未created之前执行,组件还未创建.不能直接使用this,需要传入回调函数代替实例对象this

beforeRouteEnter(to,from,next){
    next((vm)=>{
        //vm就是实例对象
    })
}
```



### img lazyLoad

```js
//在还没有加载得到目标图片时,先显示loading图片. 在img进入可视范围才加载请求目标图片

//使用
1.下载依赖
yarn vue-lazyload
2.main.js中引入并配置loading图片
import VueLazyLoading from 'vue-lazyload';
import loading from '@/assets/images/loading.gif';
Vue.use(VueLazyLoad, { //内部自定义了一个指令lazy
    loading            //指定未加载得到图片之前的loading图片
})

3.对异步获取图片实现懒加载
<img v-lazy="goods.defualtImg" />
```





### router lazyload

```js
//https://router.vuejs.org/zh/guide/advanced/lazy-loading.html
1.介绍
把不同路由对应的组件分割成不同的代码块,然后当路由被访问时才加载对应组件.
实质上是Vue异步组件在路由组件上的应用
需要使用动态import语法,也就是import()函数

2.和import..from方式比较
import ..from是不同执行,将所有的路由组件一次性打包在一个大文件中,这样打包的文件提交大,浏览器访问效率不高;
将所有路由组件分别打包为一个小文件,浏览器访问哪个组件就加载哪个文件,效率会提升.

2.
//之前
import Home from '@/pages/Home';
//之后
const Home = ()=>import('@/pages/Home'); //import函数可以让文件单独打包并且动态加载
or 在路由中直接写入import函数
{
    path:'/home',
    component:import('@/pages/Home')
    //component后可以跟组件也可以跟函数. 这个函数是用户第一次访问Home组件时,就会执行的Home函数
}
```





### 前台校验表单vee-validate

```js
(1)	项目中有一些如注册/登陆表单, 在提交请求前是需要进行表单输入数据校验的
(2)	只有前台表单验证成功才会发请求
(3)	如果校验失败, 以界面红色文本的形式提示, 而不是用alert的形式
(4)	校验的时机, 除了点击提交时, 还有输入过程中实时进行校验

//1.下载依赖,安装的2版本 安装前确保版本与vue版相互配合
yarn add vee-validate@2
//2.main.js中引入或utils/validate.js+main.js中导入
 //main.js
import '@/pages/validate';
 //utils/validate
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
Vue.use(VeeValidate);
 //错误提示信息本地化
VeeValidate.Validator.localize('zh_CN', {
    message: {
        ...zh_CN.message,
        is: (filed)=>`${field}必须与密码相同`    //修改内置message,让确认密码和密码相同
    },
    attributes: { //校验的属性名添加中文名称
        phone: '手机号',
        code: '验证码',
        password:'密码',
        password2:'确认密码',
        isCheck:'协议'
    }
})
  //自定义校验规则,定义协议必须打钩同意
VeeValidate.Validator.extend('agree', {
    validate: value=>{
        return value
    },
    getMessage: field=>field+'必须同意'
})


//基本使用
<input
    placeholder="请输入确认密码"
    v-model="password2"
    name="password2"
    v-validate="{ required: true, is: password }"
    :class="{ invalid: errors.has('password2') }"
/>
<span class="error-msg">{{ errors.first("password2") }}</span>
```

