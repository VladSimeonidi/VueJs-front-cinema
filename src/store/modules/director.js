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
    console.log("state", state);
    console.log(payload);
    state.currentItem.name = payload.name;
    state.currentItem.image = payload.image.file_name;
    state.DirectorPosterImage_Id = payload.image._id;
    state.currentItem_Id = payload._id;
    console.log(state.DirectorPosterImage_Id);
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
  async SAVE_NEW_DIRECTOR({ state, commit }) {
    let formData = new FormData();
    let imgData = state.DirectorPosterImageFile;
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
        commit("RESET_DIRECTOR_IMAGEDATA");
        return res;
      })
      .catch((e) => {
        console.log(e);
      });
    return res.data._id;
  },
  async EDIT_NEW_DIRECTOR({ state }) {
    let formData = new FormData();
    let imgData = state.DirectorPosterImageFile;
    let ID = state.currentItem_Id;
    console.log("ID", ID);
    if (imgData) {
      state.currentItem.prevImg_Id = state.DirectorPosterImage_Id;
      formData.append("file", imgData);
    }
    formData.append("director", JSON.stringify(state.currentItem));
    const res = await axios
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
};
export const getters = {};
