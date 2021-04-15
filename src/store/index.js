import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules/modules";
import { createStore } from "vuex-extensions";
import createPersistedState from "vuex-persistedstate";
const dataState = createPersistedState({
  paths: [],
});
Vue.use(Vuex);

export default createStore(Vuex.Store, {
  strict: true,
  modules,
  plugins: [dataState],
});
