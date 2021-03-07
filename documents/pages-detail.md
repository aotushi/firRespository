### 页面静态组件

```js
//页面跳转后,滚动条位置不对.给路由器配置scrollBehavior

const router = new Router({
    routes,
    scrollBehavior(to,from,savePosition){
        return {x:0, y:0}
    }
})
```



### beforeMount

```js
一般在beforeMount函数中获取页面发请求所需要的参数
```



### 获取商品购买数量

```js

<input v-model="skuNum" @change="$event.target.value>1?(skuNum=$event.target.value):skuNum=1">
    <a class="plus" @click="skuNum++">+</a>
	<a class="mins" @click="skuNum>0?skuNum--:1">
```



### 排它实现点击按钮切换颜色

```js
//1.数组中各项的isChecked都为'0'
//2.点击的项 isChecked为'1'
```











































































































