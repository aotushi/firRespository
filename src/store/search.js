// search组件对应的vuex模块
import {reqSearchInfo} from '@/api'



const state={
  // 存储数据
  searchInfo:{}
}

const actions={
  // 与组件中用户对接
  // 一般是异步发请求
  // 提交mutations
  async getSearchInfo({commit}, searchParams){
    const result = await reqSearchInfo(searchParams);
    if(result.code===200){
      commit('RECEIVE_SEARCHINFO', result.data);
    }
  }
}


const mutations={
  // 直接修改数据
  RECEIVE_SEARCHINFO(state, value){
    state.searchInfo=value;
  }
}


const getters={
  // 简化数据
  attrsList(state){
    return state.searchInfo.attrsList || [];
  },
  goodsList(state){
    return state.searchInfo.goodsList || [];
  },
  trademarkList(state){
    return state.searchInfo.trademarkList || [];
  }
}


export default{
    state,
    mutations,
    actions,
    getters,
}