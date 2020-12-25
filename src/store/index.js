import Vue from "vue";
import Vuex from "vuex";
import * as films from "./modules/film";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    films,
  },
});
