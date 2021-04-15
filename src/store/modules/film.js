import { config } from "@/config/config";
import axios from "axios";
import querystring from "querystring";
import router from "../../router/index";

export const namespaced = true;

export const state = () => ({
  currentItem: {},
  list: [],
  listTotal: null,
  OneFilmFile: null,
  OneFilmPosterImage: null,
  Loading: false,
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
  SET_CURRENT_TEASER(state, payload) {
    state.currentItem.teaser = payload;
  },
  SET_CURRENT_GENRE(state, payload) {
    state.currentItem.genre = payload;
  },
  SET_CURRENT_DIRECTOR(state, payload) {
    state.currentItem.director = payload;
  },
  SET_CURRENT_YEAR(state, payload) {
    state.currentItem.year = payload;
  },
  SET_CURRENT_DESCRIPTION(state, payload) {
    state.currentItem.description = payload;
  },
  SET_CURRENT_LINK(state, payload) {
    state.currentItem.link = payload;
  },
  SET_CURRENT_POSTER(state, payload) {
    console.log("eedddd");
    console.log(payload);
    state.currentItem.poster.file_name = payload;
  },
  SET_FILM_FILE(state, payload) {
    state.OneFilmFile = payload;
  },
  SET_POSTER_FILE(state, payload) {
    state.OneFilmPosterImage = payload;
  },
  SET_LOADING(state, payload) {
    state.Loading = payload;
  },
  ADD_NEW_ITEM(state) {
    state.OneFilmFile = null;
    state.OneFilmPosterImage = null;
    const emptyForm = {
      description: "",
      genre: [],
      link: "",
      name: "",
      teaser: "",
      year: "",
      poster: {
        file_name: "",
      },
      director: [],
    };
    state.currentItem = emptyForm;
  },
};
export const actions = {
  async SET_LIST({ commit }, pageSet) {
    const qs = querystring.stringify(pageSet);
    const res = await axios
      .get(config.API.BASE_URL + config.API.FILM.PAGINATION + "?" + qs)
      .then((res) => {
        commit("SET_LIST", res.data.filmList);
        commit("SET_LIST_TOTAL", res.data.filmListCount);
        return res.data.filmList;
      })
      .catch((e) => {
        console.log(e);
      });

    return res;
  },
  async SET_AUTOCOMPLETE_LIST({ commit }, query) {
    let res = await axios
      .get(
        config.API.BASE_URL +
          config.API.FILM.AUTOCOMPLETE +
          "?" +
          "search=" +
          query
      )
      .then((res) => {
        console.log(res.data);
        commit("SET_LIST", res.data);
        return res.data;
      })
      .catch((e) => {
        console.log(e);
      });
    return res;
  },
  async SET_CURRENT_ITEM({ commit }, ID) {
    await axios
      .get(config.API.BASE_URL + config.API.FILM.LIST + "/" + ID)
      .then((res) => {
        commit("SET_CURRENT_ITEM", res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  async SET_CURRENT_ITEM_AS_DETAILS({ commit }, ID) {
    await axios
      .get(config.API.BASE_URL + config.API.FILM.DETAILS + "/" + ID)
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
  async SAVE_CURRENT_ITEM({ state, commit }) {
    commit("SET_LOADING", true);
    let formData = new FormData();
    if (state.OneFilmPosterImage) {
      formData.append("file", state.OneFilmPosterImage, "image");
      formData.append("imageMetaData", state.OneFilmPosterImage.name);
    }
    if (state.OneFilmFile) {
      formData.append("file", state.OneFilmFile, "movie");
      formData.append("movieMetaData", state.OneFilmFile.name);
    }
    let dataToSave = state.currentItem;
    formData.append("film", JSON.stringify(dataToSave));

    let response = null;

    await axios
      .post(config.API.BASE_URL + config.API.FILM.LIST, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        commit("SET_CURRENT_ITEM", res.data);
        commit("SET_LOADING", false);
        response = res.status;
        router.push({ name: "filmditails", params: { id: res.data._id } });
      })
      .catch((error) => {
        commit("SET_LOADING", false);
        console.log(error);
      });
    return response;
  },
  async EDIT_CURRENT_ITEM({ state, commit }) {
    commit("SET_LOADING", true);
    const ID = state.currentItem._id;
    const editData = Object.assign({}, state.currentItem);
    delete editData._id;
    let formData = new FormData();
    if (state.OneFilmPosterImage) {
      formData.append("file", state.OneFilmPosterImage, "image");
      formData.append("imageMetaData", state.OneFilmPosterImage.name);
    }
    if (state.OneFilmFile) {
      formData.append("file", state.OneFilmFile, "movie");
      formData.append("movieMetaData", state.OneFilmFile.name);
    }
    formData.append("film", JSON.stringify(editData));
    let response = null;
    await axios
      .put(config.API.BASE_URL + config.API.FILM.LIST + "/" + ID, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        commit("SET_CURRENT_ITEM", res.data);
        commit("SET_LOADING", false);
        response = res.status;
        router.push({ name: "filmditails", params: { id: ID } });
        return res;
      })
      .catch((error) => {
        commit("SET_LOADING", false);
        console.log(error);
        return error;
      });
    return response;
  },
  async DELETE_CURRENT_ITEM({ commit }, ID) {
    console.log("ID");
    console.log(ID);
    try {
      await axios
        .delete(config.API.BASE_URL + config.API.FILM.LIST + "/" + ID)
        .then(() => {
          commit("SET_CURRENT_ITEM", {});
          router.push({ name: "films" });
        });
    } catch (error) {
      return error;
    }
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
  GET_CURRENT_TEASER(state) {
    return state.currentItem.teaser;
  },
  GET_CURRENT_GENRE(state) {
    return state.currentItem.genre;
  },
  GET_CURRENT_DIRECTOR(state) {
    return state.currentItem.director;
  },
  GET_CURRENT_YEAR(state) {
    return state.currentItem.year;
  },
  GET_CURRENT_DESCRIPTION(state) {
    return state.currentItem.description;
  },
  GET_CURRENT_LINK(state) {
    return state.currentItem.link;
  },
  GET_CURRENT_POSTER(state) {
    return state.currentItem.poster.file_name;
  },
  GET_LOADING(state) {
    return state.Loading;
  },
};
