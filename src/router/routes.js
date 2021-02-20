// 简化路由组件,将routes变成一个模块

import Login from '@/pages/Login';
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder';


export default [
    {
        path:'/center',
        component:Center,
        children:[
            {
                path:'myorder',
                component:MyOrder
            },
            {
                path:'grouporder',
                component:GroupOrder
            },
            {
                path:'',
                redirect:'myorder'
            }
        ]
    },
    {
        path:'/trade',
        component:Trade
    },
    {
        path:'/pay',
        component:Pay
    },
    {
        path:'/paysuccess',
        component:PaySuccess
    },
    {
        path:'/shopcart',
        component:ShopCart
    },
    {
        path:'/addcartsuccess',
        component:AddCartSuccess
    },
    {
        path:'/detail/:goodsId',
        component:Detail
    },
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
        path:'/register',
        component:Register
    },
    {
        path:'/',
        redirect:'/home'
    }
]