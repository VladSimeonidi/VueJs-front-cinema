import { config } from "@/config/config";
import axios from "axios";

export const namespaced = true;

export const state = () => ({
  currentItem: {},
  list: [],
  listTotal: null,
});
export const mutations = {
  SET_LIST(state, payload) {
    state.list = payload;
  },
  SET_LIST_TOTAL(state, payload) {
    state.listTotal = payload;
  },
  SET_CURRENT_ITEM(state, payload) {
    state.currentItem = payload;
  },
  SET_CURRENT_ITEM_AS_DETAILS(state, payload) {
    state.currentItem = payload;
  },
  SET_CURRENT_NAME(state, payload) {
    state.currentItem.name = payload;
  },
  SET_CURRENT_GENRE(state, payload) {
    state.currentItem.genre = payload;
  },
  ADD_NEW_ITEM(state) {
    const emptyForm = {
      description: "",
      genre: "",
      link: "",
      name: "",
      teaser: "",
      year: "",
    };
    state.currentItem = emptyForm;
  },
};
export const actions = {
  async SET_LIST({ commit }, pageSet) {
    const pageNumber = pageSet.pageNumber;
    const pageSize = pageSet.pageSize;
    await axios
      .get(
        config.API.BASE_URL +
          config.API.FILM_PAGINATION +
          "?pageNumber=" +
          pageNumber +
          "&pageSize=" +
          pageSize
      )
      .then((res) => {
        console.log(res.data);
        commit("SET_LIST", res.data.filmList);
        commit("SET_LIST_TOTAL", res.data.filmListCount);
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
  async SET_CURRENT_ITEM_AS_DETAILS({ commit }, ID) {
    await axios
      .get(config.API.BASE_URL + config.API.FILM_DETAILS + "/" + ID)
      .then((res) => {
        commit("SET_CURRENT_ITEM", res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  async ADD_NEW_ITEM({ commit }) {
    commit("ADD_NEW_ITEM");
  },
  async SAVE_CURRENT_ITEM({ commit }, payload) {
    const res = await axios
      .post(config.API.BASE_URL + config.API.FILM, payload)
      .then((res) => {
        commit("SET_CURRENT_ITEM", payload);
        return res;
      })
      .catch((e) => {
        console.log(e);
      });
    return res.data._id;
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
  GET_LIST_TOTAL(state) {
    return state.listTotal;
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
