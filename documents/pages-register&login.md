### token校验

```js
//router/index.js

router.beforeEach(async(to,from.next)=>{
    let token = store.state.user.token;
    let userInfo = store.state.userInfo.name;
    if(token){
        //代表用户登录过
        if(to.path==='/login'){
            next('/');
        }else{
            //若已登录,但跳转的不是登录页,要看用户信息获取了没有
            if(userInfo){
                //用户信息已经获取,无条件放行
                next();
            }else{
                //用户已经登录,但还没有获取用户信息.这里需要获取用户信息
                try{
                    await store.dispatch('getUserInfo');
                    next();
                }catch(error){
                    //根据token获取用户信息失败,代表token可能过期
                    //把用户token清理掉,重新跳转登录页
                    store.dispatch('clearToken');
                    next('/login');
                }
            }
        }
    }else{
        // 用户没有登录,却访问交易,支付等相关页面,需要跳转到登录页面
        let targetPath = to.path;
        if(targetPath.indexOf('/trade')!==-1 || targetPath.indexOf('/pay')!==-1 || targetPath.startsWith('/center')){
            // next('/login')
            next('/login?redirect='+targetPath);
        }else{
            next();
        }
    }
})
```





















