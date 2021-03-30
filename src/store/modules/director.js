import { config } from "@/config/config";
import axios from "axios";

export const namespaced = true;

export const state = () => ({
  list: [],
  currentItem: {
    name: "",
    image: [],
  },
  DirectorPosterImage: null,
  error: null,
});
export const mutations = {
  SET_LIST(state, payload) {
    state.list = payload;
  },
  ADD_NEW_DIRECTOR(state) {
    const newDirector = {
      name: "",
      image: "",
    };
    state.currentItem = newDirector;
  },
  SET_CURRENT_NAME(state, payload) {
    state.currentItem.name = payload;
  },
  SET_CURRENT_IMAGE(state, payload) {
    console.log("imNAME");
    console.log(payload);
    state.currentItem.image = payload;
  },
  SET_CURRENT_IMAGE_DATA(state, payload) {
    console.log("IMDATA");
    console.log(payload);
    state.DirectorPosterImage = payload;
  },
  SAVE_NEW_DIRECTOR(state, payload) {
    state.list.push(payload);
  },
};
export const actions = {
  async SET_LIST({ commit }) {
    let res = await axios
      .get(config.API.BASE_URL + config.API.DIRECTOR.LIST)
      .then((res) => {
        commit("SET_LIST", res.data);
        return res.data;
      })
      .catch((e) => {
        console.log(e);
      });
    return res;
  },
  SET_DIRECTOR_IMAGE({ commit }, payload) {
    commit("SET_CURRENT_IMAGE", payload.name);
    commit("SET_CURRENT_IMAGE_DATA", payload);
  },
  async SAVE_NEW_DIRECTOR({ state }) {
    let formData = new FormData();
    let imgData = state.DirectorPosterImage;
    formData.append("file", imgData);
    formData.append("director", JSON.stringify(state.currentItem));
    const res = await axios
      .post(config.API.BASE_URL + config.API.DIRECTOR.LIST, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("director");
        console.log(res.data);
        // commit("SAVE_NEW_DIRECTOR", payload[1]);
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
  GET_CURRENT_ITEM(state) {
    return state.currentItem;
  },
  GET_CURRENT_ITEM_NAME(state) {
    // console.log("get");
    // console.log(state.currentItem.name);
    return state.currentItem.name;
  },
  GET_CURRENT_ITEM_IMAGE_NAME(state) {
    // console.log("get");
    // console.log(state.currentItem.name);
    console.log(state.currentItem.image);
    return state.currentItem.image;
  },
};
