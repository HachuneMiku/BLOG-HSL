import Vue from "vue";
import App from "./App.vue";
import router from './router/index'
import store from './store/index'

import './assets/css/main.css'
import './assets/font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false;

import hslApi from './http'

Vue.prototype.$hslApi = hslApi;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
