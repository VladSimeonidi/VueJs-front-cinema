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
    const res = await axios
      .get(config.API.BASE_URL + config.API.GENRE.LIST)
      .then((res) => {
        commit("SET_LIST", res.data);
        return res.data;
      })
      .catch((e) => {
        console.log(e);
      });
    return res;
  },
  async SAVE_NEW_ITEM({ commit }, payload) {
    return axios
      .post(config.API.BASE_URL + config.API.GENRE.LIST, payload)
      .then((res) => {
        commit("SAVE_NEW_ITEM", payload);
        return res;
      })
      .catch((error) => {
        return { data: error.response.data, status: error.response.status };
      });
  },
};
export const getters = {};
