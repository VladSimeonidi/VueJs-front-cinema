import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/dist/vuetify.min.css";
import VuetifyConfirm from "vuetify-confirm";
Vue.use(Vuetify);

const opts = {};
const vuetify = new Vuetify(opts);
Vue.use(VuetifyConfirm, { vuetify });

export default vuetify;
