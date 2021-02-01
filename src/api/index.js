// 请求接口函数

import request from './ajax';
import mockAjax from './mockAjax';

//请求三级分类列表数据  api/product/getBaseCategoryList  GET 无参

export const reqCategoryList=()=>{
    return request({
        url:'/product/getBaseCategoryList',
        method:"get"
    })
}

// 请求mock模拟数据

export const reqBannerList=()=>{
    return mockAjax({
        url:'/banner',
        method:'get'
    })
};

export const reqFloorList=()=>{
    return mockAjax({
        url:'/floor',
        method:'get'
    })
};

//验证请求是否成功的两种方式: 1.引入到main中,在这里直接调用; 2.main中引入并调用
// reqCategoryList();

// reqBannerList();
// reqFloorList();

export const reqSearchInfo=(searchParams)=>{
    return request({
        url:'/list',
        method:'post',
        data:searchParams
    })
};