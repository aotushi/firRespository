import { reqCartIsCheck, reqShopCart, reqShopCartInfo, reqDeleteCart } from '@/api'



const state = {
    // 存储数据
    // 文档显示返回的data为null,所以state中不用初始化数据
    shopcartInfo: []
};


const actions = {
    // 与组件中用户对接
    // 一般是异步发请求
    // 提交mutations

    //   添加到购物车的请求
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        const result = await reqShopCart(skuId, skuNum);
        if (result.code === 200) {
            return 'ok';
        } else {
            return Promise.reject(result);
        }
    },

    // 请求购物车列表信息
    async getshopCartInfo({ commit }) {
        const result = await reqShopCartInfo();
        if (result.code === 200) {
            commit('RECEIVE_SHOPCARTINFO', result.data);
        } else {
            alert(result)
        }
    },

    // 切换单个的商品选中状态
    async getCartIsChecked({commit}, {skuId, isChecked}){
        const result = await reqCartIsCheck(skuId, isChecked);
        if(result.code === 200){
            console.log(result)
            return 'ok';
        }else{
            return Promise.reject(result)
        }
    },

    // 切换总的商品的选中状态. 两种解决方法:1.一次性修改多个接口; 2.多次使用单词修改的接口
    getCartIsAllChecked({commit, getters, dispatch}, isChecked){
        let promises=[];
        getters.cartInfo.cartInfoList.forEach((item)=>{
            if(item.isChecked === isChecked) return ;
            let promise = dispatch('getCartIsChecked', {skuId:item.skuId, isChecked});
            promises.push(promise);
        });
        return Promise.all(promises);
    },

    // 删除单个商品
    async getDeleteCart({commit}, skuId){
        let result = await reqDeleteCart(skuId);
        if(result.code === 200){
            return 'ok';
        }else{
            return Promise.reject(result)
        }
    },

    // 删除多个商品
    getDeleteSome({commit, getters, dispatch}){
        let promises=[];
        getters.cartInfo.cartInfoList.forEach((item)=>{
            if(item.isChecked){
                let promise = dispatch('getDeleteCart', item.skuId);
                promises.push(promise);
            }
        });
        return Promise.all(promises);
    }
};


const mutations = {
    // 直接修改数据
    RECEIVE_SHOPCARTINFO(state, shopcartInfo) {
        state.shopcartInfo = shopcartInfo;
    }
};


const getters = {
    // 简化数据
    cartInfo(state) {
        return state.shopcartInfo[0] || {};
    }
};


export default {
    state,
    mutations,
    actions,
    getters,
}