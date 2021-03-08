import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter, allAsyncRoutes, anyRoute, constantRoutes } from "@/router";
import router from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(), //用户登录成功的token
    name: "", //获取用户信息保存用户信息的名称
    avatar: "", //保存用户头像

    // 权限相关数据
    buttons: [], //按钮相关
    roles: [], //用户角色相关
    routes: [], //和用户相关的所有路由配置数组
    asyncRoutes: [] //和用户相关的所有异步路由
  };
};

// 定义一个函数,根据用户返回的routes路由字符串数组,过滤出用户真正的异步路由数组
function filterMyRoutes(allAsyncRoutes, routeNames) {
 const myAsyncRoutes =  allAsyncRoutes.filter(item => {
    // 判断一级路由
    if (routeNames.indexOf(item.name) !== -1) {
      // 判断二级路由,使用递归
      if (item.children && item.children.length > 0) {
        item.children = filterMyRoutes(item.children, routeNames)
      }
      return true;
    }
 })
  return myAsyncRoutes;
}

const state = getDefaultState();

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // },
  SET_USERINFO: (state, userInfo) => {
    (state.name = userInfo.name),
      (state.avatar = userInfo.avatar),
      (state.buttons = userInfo.buttons),
      (state.roles = userInfo.roles);
  },
  SET_ROUTES(state, myAsyncRoutes) {
    state.asyncRoutes = myAsyncRoutes
    state.routes = constantRoutes.concat(myAsyncRoutes, anyRoute)

    // 动态向路由器中添加新的路由 addRoutes方法接收的是一个数组
    router.addRoutes([...myAsyncRoutes, anyRoute])
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      // api里的login
      login({ username: username.trim(), password: password })
        .then(response => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          setToken(data.token); // 相当于localStorage.setItem,但这里使用的是保存在cookie中
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // async login({commit}, userInfo){
  //   const result = await login(userInfo);
  //   if(result.code === 20000){
  //     commit('SET_TOKEN', result.data);
  //     setToken(data.token);
  //     return 'ok'
  //   }else{
  //     return new Promise(result.data);
  //   }
  // }

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const { data } = response;

          if (!data) {
            return reject("Verification failed, please Login again.");
          }

          // const { name, avatar } = data

          // commit('SET_NAME', name)
          // commit('SET_AVATAR', avatar)
          commit("SET_USERINFO", data);
          // 还要根据用户信息返回来的routes,从所有的异步路由数组当中过滤出用户自己的异步路由
          commit('SET_ROUTES', filterMyRoutes(allAsyncRoutes, data.routes))
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit("RESET_STATE");
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
