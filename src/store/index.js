import Vue from 'vue';
import Vuex from 'vuex';
import home from './home';
import user from './user';
import search from './search';
import detail from './detail';
import shopcart from './shopcart';
import trade from './trade';

Vue.use(Vuex);

const state={

};

const actions={

};

const mutations={

};

const getters={

};



const store=new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    modules:{
        home,
        user,
        search,
        detail,
        shopcart,
        trade
    }
});

export default store;