import Vue from "vue";
import "./plugins/axios";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "bootstrap";
import request from "./plugins/request";
import userLevel from "./plugins/userLevel";
import { VueMaskDirective } from "v-mask";
//import BootstrapVue from "bootstrap-vue";

//Vue.use(BootstrapVue);

import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(request);
Vue.use(userLevel);
Vue.directive("mask", VueMaskDirective);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
