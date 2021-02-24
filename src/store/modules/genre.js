import { config } from "@/config/config";
import axios from "axios";
export const namespaced = true;

export const state = () => ({
  list: [],
});
export const mutations = {
  SET_LIST(state, payload) {
    state.list = payload;
  },
  SAVE_NEW_ITEM(state, payload) {
    state.list.push(payload);
  },
};
export const actions = {
  async SET_LIST({ commit }) {
    await axios
      .get(config.API.BASE_URL + config.API.GENRE.LIST)
      .then((res) => {
        commit("SET_LIST", res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  async SAVE_NEW_ITEM({ commit }, payload) {
    await axios
      .post(config.API.BASE_URL + config.API.GENRE.LIST, payload)
      .then((res) => {
        commit("SAVE_NEW_ITEM", payload);
        return res;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
export const getters = {
  GET_LIST(state) {
    return state.list;
  },
};
