import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules/modules";
import { createStore } from "vuex-extensions";
Vue.use(Vuex);

export default createStore(Vuex.Store, {
  strict: true,
  modules,
});
