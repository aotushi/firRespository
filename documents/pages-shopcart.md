### shopcart

### userTempId

```js
//userTempId 用户临时标识
1.介绍
用户如果没有登录,并需要查询购物车数据,需要带上这个临时标识. 随机的唯一字符串,使用uuid创建

2.使用
2.1 创建保存
 - 浏览器端创建,每次请求都携带,尽量不修改
 - 应用一打开就创建保存在localStorage中
 - 在state中保存,可以更快的读取
2.2 使用,在每个请求拦截器中添加到请求头中

3.实施
3.1 在utils/userabout.js中 创建用户临时标识函数
 import{v4 as uuidv4} from 'uuid';
 export function getUserTempId() {
     let userTempId = localStorage.getItem('USERTEMPID');
     if(!userTempId){
         userTempId = uuidv4();
         localStorage.setItem('USERTEMPID', userTempId);
     }
     return userTempId;
 }

3.2 store/user.js  调用用户临时标识函数
import {getUserTempId} from '@/utils/userabout';

const state={
    userTempId:getUserTempId();
}

3.3 api/ajax.js  请求头中添加用户临时标识
import store from '@/store';

service.interceptor.request.use(
	(config)=>{
        NProgress.start();
        let userTempId = store.state.user.userTempId;
        if(userTempId){
            config.headers.userTempId = userTempId;
        };
        
        return config;
    },
    //()=>{} 请求失败回调一般不适用
)
```



### data show

```js
//1.总复选框的选中与否,使用计算属性来展示
//2.v-model获取input输入的值类型

<input class="chooseAll" type="checkbox" v-model="isCheckAll"/>

isCheckAll(){
    get(){
        return this.cartInfoList.every((item)=> item.isChecked)
    },
    set(value){
        //value是通过v-model获取的布尔值
        try{
            await this.$store.dispatch('getCartIsAllChecked',value?1:0);
            alert('更新成功');
            this.getshopCartInfo();
        }catch(error){
            alert(error.message);
        }
    }
}
```









### modify shopcart's Number

```js
//流程:
1.手动修改商品数量按钮(加减按钮+输入框), 
2.提交后台更新数据(后台需要的是数值更改变化的值)
3.请求更改后商品数量的数据

//解决方案:统一使用回调函数+flag参数
@click="changeCartNum(cart, 1, true)"
@click="changeCartNum(cart, -1, true)"
@change="changeCartNum(cart, $event.target.value, false)"

//获取数值变化的值
changeCartNum(cart,disNum, flag){
    let originNum = cart.skuNum;
    if(flag){
        //点击的是加减按钮
        if(disNum + originNum < 1){
            disNum = 1 -originNum;
        }
    }else{
        //输入的值
        if(disNum < 1){
            disNum = 1 - originNum;
        }else{
            disNum = disNum - originNum;
        }
        
    }
}
```





### Promise.all() 

```js
//切换总的商品选中状态,或删除多个商品.有2种解决方法:1.一次性修改多个接口;2.多次调用单次修改的接口

//案例:
1.切换单个商品的选中状态的请求
async getCartIsCheck
```



























