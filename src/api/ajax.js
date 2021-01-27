import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';


const service = axios.create({
    baseURL:"/api",
    timeOUT:20000
});

service.interceptors.request.use(
    (config)=>{
    NProgress.start();
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