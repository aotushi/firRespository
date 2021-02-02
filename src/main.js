import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import TypeNav from '@/components/TypeNav';
import '@/api';
import store from '@/store';
import '@/mock/mockServer';
import 'swiper/css/swiper.css';
import Pagination from '@/components/Pagination';

Vue.component('TypeNav', TypeNav);
Vue.component('Pagination', Pagination);
Vue.config.productionTip=false;

new Vue({
  beforeCreate(){
    Vue.prototype.$bus=this;
  },
  el:'#app',
  router,
  store,
  render:h=>h(App)
})