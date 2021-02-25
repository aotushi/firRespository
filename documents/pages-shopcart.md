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

