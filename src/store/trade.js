import {reqTradeInfo} from '@/api'



const state={
  // 存储数据
  tradeInfo:{}
};


const actions={
  // 与组件中用户对接
  // 一般是异步发请求
  // 提交mutations
  async getTradeInfo({commit}){
      const result= await reqTradeInfo();
      if(result.code === 200){
          commit('RECEIVE_TRADEINFO', result.data);
      }
  }
     
};


const mutations={
  // 直接修改数据
  RECEIVE_TRADEINFO(state, tradeInfo){
      state.tradeInfo = tradeInfo;
  }
};


const getters={
  // 简化数据
  detailArrayList(state){
    return state.tradeInfo.detailArrayList || [];
  }
};


export default {
    state,
    mutations,
    actions,
    getters,
}