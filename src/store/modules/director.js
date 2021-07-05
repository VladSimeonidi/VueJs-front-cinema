import { config } from "@/config/config";
import axios from "axios";

export const namespaced = true;

export const state = () => ({
  list: [],
  currentItem: {
    name: "",
    image: [],
  },
  DirectorPosterImageFile: null,
  DirectorPosterImage_Id: null,
  currentItem_Id: null,
  status: "",
  error: null,
});
export const mutations = {
  SET_LIST(state, payload) {
    state.list = payload;
  },
  SET_CURRENT_ITEM(state, payload) {
    state.currentItem.name = payload.name;
    state.currentItem.image = payload.image.file_name;
    state.DirectorPosterImage_Id = payload.image._id;
    state.currentItem_Id = payload._id;
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
    state.currentItem.image = payload;
  },
  SET_CURRENT_IMAGE_DATA(state, payload) {
    state.DirectorPosterImageFile = payload;
  },
  SAVE_NEW_DIRECTOR(state, payload) {
    state.list.push(payload);
  },
  RESET_DIRECTOR(state) {
    state.currentItem = {
      name: "",
      image: [],
    };
  },
  RESET_DIRECTOR_IMAGEDATA(state) {
    state.DirectorPosterImageFile = null;
  },
  SET_STATUS(state, payload) {
    state.status = payload;
  },
};
export const actions = {
  async SET_LIST({ commit }) {
    console.log("!!!!");
    console.log(config.API.BASE_URL + config.API.DIRECTOR.LIST);
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
  async SAVE_NEW_DIRECTOR({ state, commit }) {
    let formData = new FormData();
    let imgData = state.DirectorPosterImageFile;
    formData.append("file", imgData);
    formData.append("director", JSON.stringify(state.currentItem));
    let response = null;
    await axios
      .post(config.API.BASE_URL + config.API.DIRECTOR.LIST, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        response = { data: res.data, status: res.status };
        commit("RESET_DIRECTOR_IMAGEDATA");
      })
      .catch((error) => {
        response = { data: error.response.data, status: error.response.status };
      });
    return response;
  },
  async EDIT_NEW_DIRECTOR({ state }) {
    let formData = new FormData();
    let imgData = state.DirectorPosterImageFile;
    let ID = state.currentItem_Id;
    if (imgData) {
      state.currentItem.prevImg_Id = state.DirectorPosterImage_Id;
      formData.append("file", imgData);
    }
    formData.append("director", JSON.stringify(state.currentItem));
    let response = null;
    await axios
      .put(
        config.API.BASE_URL + config.API.DIRECTOR.LIST + "/" + ID,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        response = { data: res.data, status: res.status };
      })
      .catch((error) => {
        response = { data: error.response.data, status: error.response.status };
      });
    return response;
  },
  async UPLOAD_CURRENT_ITEM({ commit }, ID) {
    let res = await axios
      .get(config.API.BASE_URL + config.API.DIRECTOR.LIST + "/" + ID)
      .then((res) => {
        commit("SET_CURRENT_ITEM", res.data);
        return res.data;
      })
      .catch((e) => {
        console.log(e);
      });
    return res;
  },
  async DELETE_ITEM({ commit }, ID) {
    console.log("from store");
    console.log(ID);
    let response = await axios
      .delete(config.API.BASE_URL + config.API.DIRECTOR.LIST + "/" + ID)
      .then((res) => {
        commit("SET_STATUS", "OK");
        return { data: res.data, status: res.status };
      })
      .catch((error) => {
        return { data: error.response.data, status: error.response.status };
      });
    return response;
  },
};
export const getters = {};
