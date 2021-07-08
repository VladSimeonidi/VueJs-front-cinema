import { config } from "@/config/config";
import axios from "axios";
import querystring from "querystring";
import router from "../../router/index";

export const namespaced = true;

const getDefaultState = () => {
  return {
    currentItem: {},
    list: null,
    listTotal: null,
    OneFilmFile: null,
    OneFilmPosterImage: null,
    Loading: false,
    pageSet: {
      pageNumber: 1,
      pageSize: 9,
      range: [1950, 2021],
      search: "",
      director: [],
      genres: [],
    },
  };
};

export const state = () => getDefaultState();
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
  SET_CURRENT_SOCIAL_FACEBOOK(state, payload) {
    state.currentItem.social.facebook = payload;
  },
  SET_CURRENT_SOCIAL_TWITTER(state, payload) {
    state.currentItem.social.twitter = payload;
  },
  SET_CURRENT_SOCIAL_INSTAGRAM(state, payload) {
    state.currentItem.social.instagram = payload;
  },
  SET_CURRENT_LINK(state, payload) {
    state.currentItem.link = payload;
  },
  SET_CURRENT_POSTER(state, payload) {
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
      social: {
        facebook: "",
        twitter: "",
        instagram: "",
      },
    };
    state.currentItem = emptyForm;
  },
  SET_PAGESET_PAGE_NUMBER(state, payload) {
    state.pageSet.pageNumber = payload;
  },
  SET_PAGESET_YEAR_RANGE(state, payload) {
    state.pageSet.range = payload;
  },
  SET_PAGESET_GENRES(state, payload) {
    console.log(payload);
    state.pageSet.genres = payload;
  },
  SET_PAGESET_DIRECTORS(state, payload) {
    state.pageSet.director = payload;
  },
  SET_PAGESET_SEARCH(state, payload) {
    state.pageSet.search = payload;
  },
  RESET_STATE(state) {
    Object.assign(state, getDefaultState());
  },
};
export const actions = {
  async SET_LIST({ state, commit }) {
    const query = Object.assign({}, state.pageSet);
    if (query.director.length > 0) {
      query.director = query.director.map((el) => {
        return el._id;
      });
    }
    if (query.genres.length > 0) {
      query.genres = query.genres.map((el) => {
        return el._id;
      });
    }
    const qs = querystring.stringify(query);
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
    return await axios
      .get(config.API.BASE_URL + config.API.FILM.DETAILS + "/" + ID)
      .then((res) => {
        commit("SET_CURRENT_ITEM", res.data);
        return res.data;
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
        response = { data: res.data, status: res.status };
        router.push({ name: "filmditails", params: { id: res.data._id } });
      })
      .catch((error) => {
        commit("SET_LOADING", false);
        response = { data: error.response.data, status: error.response.status };
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
        response = response = { data: res.data, status: res.status };
        router.push({ name: "filmditails", params: { id: ID } });
      })
      .catch((error) => {
        commit("SET_LOADING", false);
        response = { data: error.response.data, status: error.response.status };
      });
    return response;
  },
  async DELETE_CURRENT_ITEM({ commit }, ID) {
    let response = null;
    await axios
      .delete(config.API.BASE_URL + config.API.FILM.LIST + "/" + ID)
      .then((res) => {
        commit("SET_CURRENT_ITEM", {});
        response = { data: res.data, status: res.status };
        router.push({ name: "films" });
      })
      .catch((error) => {
        response = { data: error.response.data, status: error.response.status };
      });
    return response;
  },
  RESET_STATE({ commit }) {
    commit("RESET_STATE");
  },
};
export const getters = {
  paginatonsCounter(state) {
    let total = state.listTotal;
    let pageSize = state.pageSet.pageSize;
    return Math.ceil(total / pageSize);
  },
};
