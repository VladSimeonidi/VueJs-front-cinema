import { config } from "@/config/config";
import axios from "axios";

export const namespaced = true;

export const state = () => ({
  currentItem: {},
  list: [],
});
export const mutations = {
  SET_LIST(state, payload) {
    state.list = payload;
  },
  SET_CURRENT_ITEM(state, payload) {
    state.currentItem = payload;
  },
  SET_CURRENT_NAME(state, payload) {
    state.currentItem.name = payload;
  },
  SET_CURRENT_GENRE(state, payload) {
    state.currentItem.genre = payload;
  },
};
export const actions = {
  async SET_LIST({ commit }) {
    await axios
      .get(config.API.BASE_URL + config.API.FILM)
      .then((res) => {
        commit("SET_LIST", res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  async SET_CURRENT_ITEM({ commit }, ID) {
    await axios
      .get(config.API.BASE_URL + config.API.FILM + "/" + ID)
      .then((res) => {
        commit("SET_CURRENT_ITEM", res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  async SAVE_CURRENT_ITEM({ commit }, payload) {
    await axios
      .post(config.API.BASE_URL + config.API.FILM, payload)
      .then(() => {
        commit("SET_CURRENT_ITEM", payload);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  async EDIT_CURRENT_ITEM({ commit }, payload) {
    const ID = payload._id;
    const editData = Object.assign({}, payload);
    delete editData._id;
    delete editData.__v;
    await axios
      .put(config.API.BASE_URL + config.API.FILM + "/" + ID, editData)
      .then(() => {
        commit("SET_CURRENT_ITEM", editData);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  async DELETE_CURRENT_ITEM({ commit }, ID) {
    console.log("ID");
    console.log(ID);
    await axios
      .delete(config.API.BASE_URL + config.API.FILM + "/" + ID)
      .then(() => {
        commit("SET_CURRENT_ITEM", {});
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
  GET_CURRENT_ITEM(state) {
    return state.currentItem;
  },
  GET_CURRENT_NAME(state) {
    return state.currentItem.name;
  },
  GET_CURRENT_GENRE(state) {
    return state.currentItem.genre;
  },
};
