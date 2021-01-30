import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import TypeNav from '@/components/TypeNav';
import '@/api';
import store from '@/store';
import '@/mock/mockServer';
import 'swiper/css/swiper.css';

Vue.component('TypeNav', TypeNav);
Vue.config.productionTip=false;

new Vue({
  el:'#app',
  router,
  store,
  render:h=>h(App)
})