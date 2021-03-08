import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import {
  allAsyncRoutes,
  anyRoute,
  constantRoutes,
  resetRouter
} from "@/router";
import router from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(), //用户登录成功的token
    name: "", //获取用户信息保存用户信息的名称
    avatar: "", //保存用户头像

    buttons: [],
    roles: [],
    routes: [],
    asyncRoutes: []
  };
};

// 定义函数,过滤异步数组
// function filterMyRoutes(allAsyncRoutes, routeNames) {
//   const myAsyncRoutes = allAsyncRoutes.filter(item => {
//     if (routeNames.indexOf(item.name) !== -1) {
//       if (item.children && item.children.length) {
//         item.children = filterMyRoutes(item.children, routeNames)
//       }
//       return true;
//     }
//   })
//   return myAsyncRoutes;
// }
function filterMyRoutes(allAsyncRoutes, routeNames) {
  const myAsyncRoutes = allAsyncRoutes.filter(item => {
    // 判断一级路由
    if (routeNames.indexOf(item.name) !== -1) {
      // 判断二级路由,使用递归
      if (item.children && item.children.length > 0) {
        item.children = filterMyRoutes(item.children, routeNames);
      }
      return true;
    }
  });
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

  SET_USERINFO: (state, userInfo) => {
    (state.name = userInfo.name),
      (state.avatar = userInfo.avatar),
      (state.roles = userInfo.roles),
      (state.buttons = userInfo.buttons);
  },

  SET_ROUTES(state, myAsyncRoutes) {
    state.asyncRoutes = myAsyncRoutes;
    state.routes = constantRoutes.concat(myAsyncRoutes, anyRoute);

    router.addRoutes([...myAsyncRoutes, anyRoute]);
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
          commit("SET_ROUTES", filterMyRoutes(allAsyncRoutes, data.routes));
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
