import { config } from "@/config/config";
import router from "../../router/index";
import axios from "axios";

export const namespaced = true;

export const state = () => ({
  token: localStorage.getItem("token") || "",
  user: {},
  status: "",
  error: null,
});
export const mutations = {
  CLEAR_ERROR(state) {
    state.error = null;
  },
  AUTH_REQUEST(state) {
    state.error = null;
    state.status = "loading";
  },
  AUTH_SUCCESS(state, token, user) {
    state.error = null;
    state.token = token;
    state.user = user;
  },
  REGISTER_REQUEST(state) {
    state.error = null;
    state.status = "loading";
  },
  REGISTER_SUCCESS(state) {
    state.error = null;
    state.status = "success";
  },
  PROFILE_REQUEST(state) {
    state.error = null;
    state.status = "loading";
  },
  USER_PROFILE(state, user) {
    state.user = user;
  },
  LOGOUT(state) {
    state.error = null;
    state.status = "";
    state.token = "";
    state.user = "";
  },
  AUTH_ERROR(state, error) {
    state.error = error.response.data.msg;
  },
  AUTH_ADMIN_ERROR(state, error) {
    state.error = error.response.data.msg;
  },
  REGISTER_ERROR(state, error) {
    state.error = error.response.data.msg;
  },
};
export const actions = {
  async LOGIN({ commit }, user) {
    commit("AUTH_REQUEST");
    try {
      let res = await axios.post(
        config.API.BASE_URL + config.API.USER.LOGIN,
        user
      );
      if (res.data.success) {
        const token = res.data.token;
        const user = res.data.user;
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = token;
        commit("AUTH_SUCCESS", token, user);
      }
      return res;
    } catch (error) {
      commit("AUTH_ERROR", error);
    }
  },
  async LOGIN_ADMIN({ commit }, user) {
    commit("AUTH_REQUEST");
    try {
      let res = await axios.post(
        config.API.BASE_URL + config.API.USER.LOGIN_ADMIN,
        user
      );
      if (res.data.success) {
        const token = res.data.token;
        const user = res.data.user;
        localStorage.setItem("token", token);
        // Set the axios defaults
        axios.defaults.headers.common["Authorization"] = token;
        commit("AUTH_SUCCESS", token, user);
      }
      return res;
    } catch (error) {
      commit("AUTH_ADMIN_ERROR", error);
    }
  },
  async REGISTER({ commit }, userData) {
    commit("REGISTER_REQUEST");
    try {
      let res = await axios.post(
        config.API.BASE_URL + config.API.USER.REGISTER,
        userData
      );
      if (res.data.success !== undefined) {
        commit("REGISTER_SUCCESS");
      }
      return res;
    } catch (error) {
      commit("REGISTER_ERROR", error);
    }
  },
  async GET_PROFILE({ commit }) {
    commit("PROFILE_REQUEST");
    let res = await axios.get(config.API.BASE_URL + config.API.USER.PROFILE);
    commit("USER_PROFILE", res.data.user);
    return res.data.user;
  },
  async LOGOUT({ commit }) {
    await localStorage.removeItem("token");
    commit("LOGOUT");
    delete axios.defaults.headers.common["Authorization"];
    this.reset();
    router.push("/login");
    return;
  },
};
export const getters = {
  LOGGED(state) {
    if (state.token != "") {
      return true;
    } else {
      return false;
    }
  },
  GETUSER(state) {
    return state.user;
  },
  STATUS(state) {
    return state.status;
  },
  ERROR(state) {
    return state.error;
  },
};
