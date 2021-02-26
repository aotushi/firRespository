## view-product-trademark



### api文件格式

```js
//将本来可以存在在index.js中的所有接口请求函数,按照页面归属拆分成相应的文件夹. 并将index.js改成引入并暴露的方式. 最终在main.js中可以导入使用.

api/product/trademark.js
api/product/attr.js
api/product/index.js

//index.js中引入并暴露的方式, default不能省略. 所有的暴露本质上都是一个对象
export {default as trademark} from './trademark';
export {default as attr} from './attr';

//main.js
import * as API from '@/api/product';
Vue.prototype.$API = API;

//页面中使用
this.$API.trademark.addOrUpdate();
```



### el-table中数据的展现

```js
//1.属性介绍
data="data" 这个属性是用来展示数据的，但是现在我们还没数据,data必须是一个数组
            表格展示数据的时候，数据的格式必须是数组，数组内部是对象
border 这个属性代表是否需要边框

//数据传递
table当中:data="trademarkList"，代表的是表格要展示的数组
当我们写上这个的时候，table会把这个数组给每个列传递一份
每个列内部都是在展示我们的这个数组数据 v-for.每个列在展示数据的时候，结构可自定义,也就是说table列内部是有作用域插槽的

table的列在展示数据的时候，如果我们的数据就是要展示的数据，那么直接写prop就行
如果我们的数据不是直接展示的数据，而是需要其它的结构，那么必须使用作用域插槽
<template slot-scope="{row, $index}"
row代表当前遍历的对象
$index代表当前遍历对象的下标
```



### el-table中的列column

```js
//属性展示
prop="prop" 需要展示数据当中的某个属性时使用,可直接使用数据中的属性
label="label" 代表这一列的名称
width="width" 代表这一列的宽度 直接写数字不需要px.不写则列平分
align="center" 可以让某个列中的数据居中显示
```



### 分页器

```js
//属性介绍
这次我们用的是element-ui给我们封装的分页器组件
    :current-page="pageNum"  传递的当前页码  
    :page-size="pageSize"    传递的每页数量
    :total="totalCount"      传递的总数
    :pager-count="5"         传递的连续页数，如果写的是5，连续数是3 5包含了首页和尾页
    @current-change="handleCurrentChange"  切换页面的事件

    以前没写过的
    :page-sizes="[10, 20, 50]" 在页面可以改变当前页的数量
    @size-change="handleSizeChange" 改变当前页数量的事件

    layout="total, sizes, prev, pager, next, jumper" //可以改变分页器前后顺序（布局顺序）

    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
//回调函数

//请求当前页面回调的2种写法
```



### 嵌套表格Dialog对话框

```js
//Dialog 对话框 <el-Dialog> 自定义内容-嵌套表单的dialog
el-form代表的是表单,表单里面是表单项,每个表单项都可以通过label-width设置表单项名称的宽度,每个表单项都可以通过label设置表单项名称
form当中都会写：model="对象" 
 作用：1、以后用来去对这个form表单验证 2、用来标识这个form收集的数据收集到哪


```



### upload

```js
在拷贝upload组件的时候，把html  css   js相关的东西全拷贝
action 控制的是上传的接口地址
上传图片分为两步：
我们在上传的时候需要调用接口，把本地的图片传到后端服务器.然后,后端服务器会给我们返回这个图片在后端服务器上的地址（线上路径). 我们要收集的东西就是返回来的这个路径
          

:show-file-list="false"代表显示的只有一张图片，不是多个（照片墙） 
:on-success="handleAvatarSuccess" 代表图片上传成功后的回调
:before-upload="beforeAvatarUpload" 代表图片上传前的回调

beforeAvatarUpload(file) {
    //file代表的是你上传的那个图片
    const isJPG = file.type === "image/jpeg"; //判断上传的图片是否是jpg格式
    const isLt2M = file.size / 1024 / 1024 < 2; //判断上传的图片大小是不是小于2M
}

handleAvatarSuccess(res, file) {
      //res代表上传成功后返回的响应数据
      //file代表上传成功后返回的图片文件本身
      // console.log(res,file)
}
```



### 图片上传取消按钮bug

```js
//在增加按钮点击的回调中,将tmForm对象数据清空  如果是弹出框的取消按钮也可以

```



### 修改按钮

```js
如果采用this.tmForm = 对象的形式,会出现数据修改同步的bug. 因为引用的是对象地址,在弹出框中修改,列表中的数据也会跟着发生变化.
使用数据拷贝解决,因为都是基本数据类型, 所以使用扩展运算符(...)实现浅拷贝. 扩展运算符是最简单的浅拷贝方式.

1.浅拷贝
 this.tmForm = {...row} //最简单的浅拷贝形式 扩展运算符
2.属性赋值
this.tmForm.tmName = row.tmName;
```



### 弹出框dialog回调

```js
//成功的流程
1.弹出提示信息
2.关闭弹出框
3.重新发请求获取列表页数据
 3.1 如果添加成功,重新请求的是第一页的数据,添加的新数据在最后一页(不存在id属性)
 3.2 如果修改成功,发请求获取当前页数据
this.$API.trademark.addOrUpdate(trademark.id?this.page:1)

//失败的流程 
弹出信息提示
```





### 删除按钮回调

```js
//使用MessageBox弹框中的'确认消息' $confirm

//删除成功
1.删除成功后的提示 await this.$API.trademark.delete(row.id)
2.重新发送请求获取列表数据 
 2.1 如果当前页只有一个数据,那么要请求前一页数据
 2.2 如果当前页大于1个数据,那么请求当前页数据
this.getTardemarkList(this.trademarkList.length>1?this.page:this.page-1)
```

















