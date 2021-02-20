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
import { Button, MessageBox, Message } from 'element-ui';

// 注册element的两种方式  use + component
// element-ui中两种组件: 第一种和button一样,可以引入然后全局注册;
Vue.use(Button);
// Vue.component(Button.name, Button);

// 第二种组件和messageBox类似, 引入之后不能直接注册,而是挂在Vue的原型上使用
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;   //用来提示消息的
// Vue.prototype.$confirm = MessageBox.confirm;
// Vue.prototype.$prompt = MessageBox.prompt;
// Vue.prototype.$notify = Notification;



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