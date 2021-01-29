import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '@/pages/Login';
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Registry from '@/pages/Registry';

Vue.use(VueRouter);

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