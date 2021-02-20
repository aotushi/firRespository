import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import TypeNav from '@/components/TypeNav';
import '@/api';
import store from '@/store';
import '@/mock/mockServer';
import 'swiper/css/swiper.css';
import Pagination from '@/components/Pagination';
import * as API from '@/api';

Vue.component('TypeNav', TypeNav);
Vue.component('Pagination', Pagination);
Vue.config.productionTip=false;

new Vue({
  beforeCreate(){
    Vue.prototype.$bus=this;
    Vue.prototype.$API = API;
  },
  el:'#app',
  router,
  store,
  render:h=>h(App)
})