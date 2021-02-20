//home模块的vuex模块
import {reqCategoryList, reqBannerList, reqFloorList} from '@/api';

const state={
    categoryList:[],
    bannerList:[],
    floorList:[]
};

const actions={
    async getCategoryList({commit}){
        const result = await reqCategoryList();
        if(result.code === 200){
            commit('RECEIVE_CATEGORYLIST', result.data);
        }
    },
    async getBannerList({commit}){
        let result = await reqBannerList();
        if(result.code===200){
            commit('RECEIVE_BANNERLIST', result.data);
            // console.log(result.data)
        }
    },
    async getFloorList({commit}){
        let result=await reqFloorList();
        if(result.code===200){
            commit('RECEIVE_FLOORLIST', result.data);77
        }
    }
};

const mutations={
    RECEIVE_CATEGORYLIST(state, categoryList){
        state.categoryList=categoryList;
    },
    RECEIVE_BANNERLIST(state, bannerList){
        state.bannerList=bannerList;
    },
    RECEIVE_FLOORLIST(state, value){
        state.floorList=value;
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