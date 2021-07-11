import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import VueRouter from "vue-router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import "normalize.css";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import Vuelidate from "vuelidate";
import VuePageTransition from "vue-page-transition";
import Notifications from "vue-notification";
import VueTyperPlugin from "vue-typer";
import { i18n } from "./plugins/i18n";
import FlagIcon from "vue-flag-icon";
import VueMeta from "vue-meta";
import MyAlert from "./mixins/MyAlert";
import VuetifyConfirm from "vuetify-confirm";

// import "@/assets/css/main.css";

axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;
const token = localStorage.getItem("token");

if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(Vuelidate);
Vue.use(Notifications);
Vue.use(VuePageTransition);
Vue.use(VueTyperPlugin);
Vue.use(FlagIcon);
Vue.use(VueMeta);
Vue.use(VuetifyConfirm);
Vue.mixin(MyAlert);

new Vue({
  router,
  store,
  axios,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
