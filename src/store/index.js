import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules/modules";
Vue.use(Vuex);

console.log(modules);

export default new Vuex.Store({
  // strict: true,
  modules,
});
