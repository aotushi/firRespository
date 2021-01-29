// 请求接口函数

import request from './ajax';

//请求三级分类列表数据  api/product/getBaseCategoryList  GET 无参

export const reqCategoryList=()=>{
    return request({
        url:'/product/getBaseCategoryList',
        methods:"get"
    })
}

//验证请求是否成功的两种方式: 1.引入到main中,调用; 2.main中引入并调用
// reqCategoryList();