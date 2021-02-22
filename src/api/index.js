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

// 获取商品详情detail页面
// api/item/{ skuId } get
export const reqDetailInfo=(skuId)=>{
    return request({
        url:`/item/${skuId}`,
        method:'get'
    })
};

// 加入购物车列表 更改数量
// /api/cart/addToCart/{ skuId }/{ skuNum } post
export const reqShopCart=(skuId, skuNum)=>{
    return request({
        url:`/cart/addToCart/${ skuId }/${ skuNum }`,
        method:'post'
    })
}

// 请求购物车列表信息
// /api/cart/cartList get
export const reqShopCartInfo=()=>{
    return request({
        url:'/cart/cartList',
        method:'get'
    })
}

// 切换商品选中状态
// /api/cart/checkCart/{skuID}/{isChecked} get
export const reqCartIsCheck=(skuId, isChecked)=>{
    return request({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method:'get'
    })
}

// 删除单个商品
// /api/cart/deleteCart/{skuId} delete
export const reqDeleteCart=(skuId)=>{
    return request({
        url:`/cart/deleteCart/${skuId}`,
        method:'delete'
    })
}

// 注册请求
// /api/user/passport/register post
export const reqUserRegister=(userInfo)=>{
    return request({
        url:`/user/passport/register`,
        method:'post',
        data:userInfo
    })
}

// 请求获取用户注册验证码
// /api/user/passport/sendCode/{phone}  get
export const reqGetCode=(phone)=>{
    return request({
        url:`/user/passport/sendCode/${phone}`,
        method:'get'
    })
}

// 用户登录的请求
// /api/user/passport/login post
export const reqLogin=(userInfo)=>{
    return request({
        url:'/user/passport/login',
        method:'post',
        data:userInfo
    })
}

// 根据token请求用户信息
// api/user/passport/auth/getUserInfo get
export const reqGetUserInfo=()=>{
    return request({
        url:'user/passport/auth/getUserInfo',
        method:'get'
    })
}



// 请求退出登录
// /api/user/passport/logout get
export const reqUserLogout=()=>{
    return request({
        url:'/user/passport/logout',
        method:'get'
    })
}

// 获取用户收获地址信息
// /userAdddress/auth/findUserAddressList
export const reqUserAddressList=()=>{
    return request({
        url:'/user/userAddress/auth/findUserAddressList',
        method:'get'
    })
}


// 10.1 订单交易信息
export const reqTradeInfo=()=>{
    return request({
        url:'/order/auth/trade',
        method:'get'
    })
}

// 请求提交订单创建订单 12
// api/order/auth/submitOrder?tradeNo={tardeNO}
export const reqSubmitOrder=(tradeNo, tradeInfo)=>{
    return request({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'post',
        data:tradeInfo
    })
}

// 获取支付信息
// /api/payment/weixin/createNative/{orderId} get
export const reqPayInfo = (orderId)=>{
    return request({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get'
    })
}
// 14 查询支付的订单状态 /api/payment/weixin/queryPayStatus/{orderId} get
export const reqPayStatus=(orderId)=>{
    return request({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get'
    })
}

// 11 获取订单列表 /api/order/auth/{page}/{limit}  get
export const reqMyOrderInfo=(page, limit)=>{
    return request({
        url:`/order/auth/${page}/${limit}`,
        method:'get'
    })
}