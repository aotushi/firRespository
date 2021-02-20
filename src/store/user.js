//user模块的vuex模块

import { reqGetCode, reqGetUserInfo, reqLogin, reqUserAddressList, reqUserLogout, reqUserRegister } from "@/api";
import { getUserTempId } from "@/utils/userabout";

const state = {
    userTempId: getUserTempId(),
    code: '',
    // token:'',
    token: localStorage.getItem('TOKEN_KEY'),
    userInfo: {},
    userAddressList:[]

};

const actions = {
    // 用户注册
    async userRegister({ commit }, userInfo) {
        let result = await reqUserRegister(userInfo);
        if (result.code === 200) {
            return 'ok';
        } else {
            return Promise.reject(result);
        }
    },
    // 获取用户验证码
    async getUserCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        if (result.code === 200) {
            commit('RECEIVE_CODE', result.data);
        } else {
            return Promise.reject(result)
        }
    },
    // 用户登录
    async getUserLogin({ commit }, userInfo) {
        let result = await reqLogin(userInfo);
        if (result.code === 200) {
            commit('RECEIVE_LOGIN', result.data.token);
            localStorage.setItem('TOKEN_KEY', result.data.token);
        } else {
            return Promise.reject(result);
        }
    },
    // 根据token再请求用户信息
    async getUserInfo({ commit }) {
        let result = await reqGetUserInfo();
        if (result.code === 200) {
            commit('RECEIVE_USERINFO', result.data);
            return 'ok';
        } else {
            return Promise.reject(result);
        }
    },
    // 清除用户的token信息 搭配路由器操作
    async clearToken({ commit }) {
        commit('RESET_USER');
        localStorage.removeItem('TOKEN_KEY');
    },
    // 退出登录
    async getUserLogout({ commit }) {
        let result = await reqUserLogout();
        if (result.code === 200) {
            // 退出成功清空数据
            commit('RESET_USER')
            localStorage.removeItem('TOKEN_KEY');
            return 'ok'
        } else {
            return Promise.reject(result);
        }

    },
    // 请求用户收货地址
    async getUserAddressList({ commit }) {
        const result = await reqUserAddressList();
        if (result.code === 200) {
            commit('RECEIVE_USERADDRESSLIST', result.data);
        }
    }

};

const mutations = {
    RECEIVE_CODE(state, code) {
        state.code = code;
    },
    RECEIVE_LOGIN(state, token) {
        state.token = token;
    },
    RECEIVE_USERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    // RESET_TOKEN(state){
    //     // state.token = "";
    //     state.token.removeItem('TOKEN_KEY');
    // },
    RESET_USER(state) {
        state.token = '',
            state.userInfo = {};
    },

    RECEIVE_USERADDRESSLIST(state, userAddressList){
        state.userAddressList = userAddressList;
      }
};

const getters = {

};

export default {
    state,
    actions,
    mutations,
    getters
}