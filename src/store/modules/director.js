import { config } from "@/config/config";
import axios from "axios";

export const namespaced = true;

export const state = () => ({
  list: [],
  currentItem: {},
});
export const mutations = {
  SET_LIST(state, payload) {
    state.list = payload;
  },
  SAVE_NEW_DIRECTOR(state, payload) {
    state.list.push(payload);
  },
};
export const actions = {
  async SET_LIST({ commit }) {
    await axios
      .get(config.API.BASE_URL + config.API.DIRECTOR.LIST)
      .then((res) => {
        commit("SET_LIST", res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  async SAVE_NEW_DIRECTOR({ commit }, payload) {
    let formData = new FormData();

    formData.append("file", payload[0]);
    formData.append("director", JSON.stringify(payload[1]));
    const res = await axios
      .post(config.API.BASE_URL + config.API.DIRECTOR.LIST, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        commit("SAVE_NEW_DIRECTOR", payload[1]);
        return res;
      })
      .catch((e) => {
        console.log(e);
      });
    return res.data._id;
  },
};
export const getters = {
  GET_LIST(state) {
    return state.list;
  },
};
