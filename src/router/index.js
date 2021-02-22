import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '@/store';
Vue.use(VueRouter);


// 修改路由器的push和replace方法,是解决多次点击链接报错问题.因为router3.1引入了promise. 多次点击相同路由链接,参数也没变化. 抛出错误
const originPush=VueRouter.prototype.push;
const originReplace=VueRouter.prototype.replace;

VueRouter.prototype.push=function(location, onResolve, onRejected){
    if(onResolve===undefined && onRejected===undefined){
        return originPush.call(this, location).catch(()=>{});
    }else{
        return originPush.call(this, location, onResolve, onRejected);
    }
}
VueRouter.prototype.replace=function(location, onResolve, onRejected){
    if(onResolve===undefined && onRejected===undefined){
        return originReplace.call(this, location).catch(()=>{});
    }else{
        return originReplace.call(this, location, onResolve, onRejected);
    }
}

const router=new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
      }
        
    
})

router.beforeEach( async(to,from,next)=>{
    // 守卫拦截住,获取用户的token和用户信息
    let token = store.state.user.token;
    let userInfo = store.state.user.userInfo.name;

    if(token){
        // 代表用户登录过
        if(to.path==="/login"){
            next('/');
        }else{
            // 若已登录,但跳转不再是登录页,那么得看用户信息获取了没有
            if(userInfo){
                // 用户信息已经获取,无条件放行
                next();
            }else{
                // 用户已经登录,用户还没有获取用户信息,这里需要获取用户信息
               try {
                    await store.dispatch('getUserInfo');
                    next();
               } catch (error) {
                // 根据token获取用户信息失败, 代表token可能过期
                // 把用户token清理掉 重新跳转登录页
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

export default router;