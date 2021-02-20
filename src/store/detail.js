import { reqDetailInfo } from '@/api'



const state={
  // 存储数据
  goodsInfo:{}
};


const actions={
  // 与组件中用户对接
  // 一般是异步发请求
  // 提交mutations
    async getDetailInfo({commit}, goodsId){
        let result = await reqDetailInfo(goodsId);
        if(result.code === 200){
            commit('RECEIVE_GOODSINFO', result.data) 
        }
    }
};


const mutations={
  // 直接修改数据
  RECEIVE_GOODSINFO(state, goodsInfo){
      state.goodsInfo = goodsInfo;
  }
};


const getters={
  // 简化数据
  categoryView(state){
      return state.goodsInfo.categoryView || {};
  },
  skuInfo(state){
      return state.goodsInfo.skuInfo || {};
  },
  spuSaleAttrList(state){
      return state.goodsInfo.spuSaleAttrList || [];
  }
};


export default {
    state,
    mutations,
    actions,
    getters,
}