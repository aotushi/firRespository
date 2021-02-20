import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import store from '@/store';


const service = axios.create({
    baseURL:"/api",
    timeOUT:20000
});

service.interceptors.request.use(
    (config)=>{
    NProgress.start();
    // 请求头内部添加临时标识,后期每个请求都会带上这个临时标识
    let userTempId = store.state.user.userTempId;
    if(userTempId){
        config.headers.userTempId = userTempId;
    };

    // 登录成功之后, 需要把token添加到请求头中
    let token = store.state.user.token;
    if(token){
        config.headers.token = token;
    }
    return config;
});


service.interceptors.response.use(
    (response)=>{
        NProgress.done();
        return response.data;
    },
    (error)=>{
        NProgress.done();
        return new Promise(()=>{});
        // return Promise.reject(new Error('发送请求失败'))
    }
);

export default service;