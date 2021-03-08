import { config } from "@/config/config";
// import router from "../../router/index";
import axios from "axios";

export const namespaced = true;

export const state = () => ({
  status: "",
  profiles: [],
  currentUser: {},
});
export const mutations = {
  PROFILE_REQUEST(state) {
    state.status = "loading";
  },
  SET_LIST(state, payload) {
    state.profiles = payload;
  },
  SET_CURRENT_USER(state, payload) {
    state.currentUser = payload;
  },
  SET_USER_NAME(state, payload) {
    state.currentUser.name = payload;
  },
  SET_USER_USERNAME(state, payload) {
    state.currentUser.username = payload;
  },
  SET_USER_EMAIL(state, payload) {
    state.currentUser.email = payload;
  },
  SET_USER_PASSWORD(state, payload) {
    state.currentUser.password = payload;
  },
  SET_USER_ADMIN(state, payload) {
    state.currentUser.isAdmin = payload;
  },
};
export const actions = {
  async SET_AUTOCOMPLETE_LIST({ commit }, query) {
    commit("PROFILE_REQUEST");
    let res = await axios
      .get(
        config.API.BASE_URL +
          config.API.USER.PROFILE_AUTOCOMPLETE_LIST +
          "?" +
          "search=" +
          query
      )
      .then((res) => {
        commit("SET_LIST", res.data);
        return res.data;
      })
      .catch((e) => {
        console.log(e);
      });
    return res;
  },
  async SET_CURRENT_USER({ commit }, ID) {
    await axios
      .get(config.API.BASE_URL + config.API.USER.USERPROFILE + "/" + ID)
      .then((res) => {
        commit("SET_CURRENT_USER", res.data);
        return res.data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  async EDIT_CURRENT_USER({ commit, state }) {
    let ID = state.currentUser._id;
    let user = state.currentUser;
    const response = await axios
      .put(config.API.BASE_URL + config.API.USER.EDITPROFILE + "/" + ID, user)
      .then((res) => {
        commit("SET_CURRENT_USER", res.data.editedUser);
        return res.data;
      })
      .catch((error) => {
        return error.response.data;
      });
    return response;
  },
};

export const getters = {
  GET_NAME(state) {
    return state.currentUser.name;
  },
  GET_USERNAME(state) {
    return state.currentUser.username;
  },
  GET_EMAIL(state) {
    return state.currentUser.email;
  },
  GET_PASSWORD(state) {
    return state.currentUser.password;
  },
  GET_ADMIN(state) {
    return state.currentUser.isAdmin;
  },
};
