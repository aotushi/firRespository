import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '@/pages/Login';
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Registry from '@/pages/Registry';

Vue.use(VueRouter);

const originPush=VueRouter.prototype.push;
const originReplace=VueRouter.prototype.replace;

VueRouter.prototype.push=function(location, onResolve, onRejected){
    if(onResolve===undefined && onRejected===undefined){
        return originPush.call(this, location).catch(()=>{});
    }else{
        // return originPush.call(this, location, onResolve, onRejected);
        return VueRouter.prototype.push(location, onResolve, onRejected);
    }
}

VueRouter.prototype.replace=function(location, onResolve, onRejected){
    if(onResolve===undefined && onRejected===undefined){
        return originReplace.call(this, location).catch(()=>{});
    }else{
        // return originReplace.call(this, location, onResolve, onRejected);
        return VueRouter.prototype.replace(location, onResolve, onRejected);
    }
}

const router=new VueRouter({
    routes:[
        {   
            path:'/login',
            component:Login,
            meta:{
                isHidden:false
            }
        },
        {
            path:'/search/:keyword?',
            name:'search',
            component:Search,
            meta:{
                isHidden:false
            }
        },
        {
            path:'/home',
            component:Home
        },
        {
            path:'/registry',
            component:Registry
        },
        {
            path:'/',
            redirect:'/home'
        }
    ]
})

export default router;