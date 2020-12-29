import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store";
import VuePlyr from "vue-plyr";
import "vue-plyr/dist/vue-plyr.css";
import VueRouter from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";
import "normalize.css";
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VuePlyr);
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  axios,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
