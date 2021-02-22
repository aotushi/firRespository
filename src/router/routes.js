// 简化路由组件,将routes变成一个模块

// import Login from '@/pages/Login';
// import Home from '@/pages/Home';
import Search from '@/pages/Search';
// import Register from '@/pages/Register';
// import Detail from '@/pages/Detail';
// import AddCartSuccess from '@/pages/AddCartSuccess';
// import ShopCart from '@/pages/ShopCart';
// import Trade from '@/pages/Trade';
// import Pay from '@/pages/Pay';
// import PaySuccess from '@/pages/PaySuccess';
// import Center from '@/pages/Center';
// import MyOrder from '@/pages/Center/MyOrder'
// import GroupOrder from '@/pages/Center/GroupOrder';
import store from '@/store';

// 路由懒加载
const Login = ()=>import('@/pages/Login');
const Home = ()=>import('@/pages/Home');
// const Search = ()=>import('@/pages/Search') ;
const Register = ()=>import('@/pages/Register');
const Detail= ()=>import('@/pages/Detail');
const AddCartSuccess= ()=>import('@/pages/AddCartSuccess');
const ShopCart= ()=>import('@/pages/ShopCart');
const Trade= ()=>import('@/pages/Trade');
const Pay= ()=>import('@/pages/Pay');
const PaySuccess= ()=>import('@/pages/PaySuccess');
const Center= ()=>import('@/pages/Center');
const MyOrder= ()=>import('@/pages/Center/MyOrder');
const GroupOrder= ()=>import('@/pages/Center/GroupOrder');

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
        component:Trade,
        beforeEnter: (to, from, next) => {
            // 只有从购物车界面才能跳转到交易页面（创建订单）
            if(from.path==='/shopcart'){
                next();
            }else{
                alert('只有从购物车界面才能跳转到交易页面（创建订单）');
                next(false);
            }
          }
    },
    {
        path:'/pay',
        component:Pay,
        beforeEnter: (to, from, next) => {
            // 只有从交易页面（创建订单）页面才能跳转到支付页面
            if(from.path === '/trade'){
                next();
            }else{
                alert('只有从交易页面（创建订单）页面才能跳转到支付页面');
                next(false);
            }
          }
    },
    {
        path:'/paysuccess',
        component:PaySuccess,
        beforeEnter: (to, from, next) => {
            // 只有从支付页面才能跳转到支付成功页面
            if(from.path === '/pay'){
                next();
            }else{
                alert('只有从支付页面才能跳转到支付成功页面');
                next(false);
            }
          }
    },
    {
        path:'/shopcart',
        component:ShopCart
    },
    {
        path:'/addcartsuccess',
        component:AddCartSuccess,
        beforeEnter: (to, from, next) => {
            // 只有携带了skuNum和sessionStorage内部有skuInfo数据  才能看到添加购物车成功的界面
            let skuNum = to.query.skuNum;
            // let skuInfo = store.state.user.token;
            let skuInfo = sessionStorage.getItem('TOKEN_KEY');
            if(skuNum && skuInfo){
                next();
            }else{
                alert('必须要携带skuNum参数, 存储skuInfo信息');
                next(false);
            }
           
          }
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