//home模块的vuex模块
import {reqCategoryList} from '@/api';

const state={
    categoryList:[]
};

const actions={
    async getCategoryList({commit}){
        const result = await reqCategoryList();
        if(result.code === 200){
            commit('RECEIVE_CATEGORYLIST', result.data);
        }
    }
};

const mutations={
    RECEIVE_CATEGORYLIST(state, categoryList){
        state.categoryList=categoryList;
    }
};

const getters={

};

export default{
    state,
    actions,
    mutations,
    getters
}