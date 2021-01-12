import { config } from "@/config/config";
import router from "../../router/index";
import axios from "axios";

export const namespaced = true;

export const state = () => ({
  token: localStorage.getItem("token") || "",
  user: {},
  status: "",
});
export const mutations = {
  AUTH_REQUEST(state) {
    state.status = "loading";
  },
  AUTH_SUCCESS(state, token, user) {
    state.token = token;
    state.user = user;
  },
  REGISTER_REQUEST(state) {
    state.status = "loading";
  },
  REGISTER_SUCCESS(state) {
    state.status = "success";
  },
  PROFILE_REQUEST(state) {
    state.status = "loading";
  },
  USER_PROFILE(state, user) {
    state.user = user;
  },
  LOGOUT(state) {
    state.status = "";
    state.token = "";
    state.user = "";
  },
};
export const actions = {
  async LOGIN({ commit }, user) {
    commit("AUTH_REQUEST");
    let res = await axios.post(
      config.API.BASE_URL + config.API.USER.LOGIN,
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
  },
  async LOGIN_ADMIN({ commit }, user) {
    commit("AUTH_REQUEST");
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
  },
  async REGISTER({ commit }, userData) {
    commit("REGISTER_REQUEST");
    let res = await axios.post(
      config.API.BASE_URL + config.API.USER.REGISTER,
      userData
    );
    if (res.data.success !== undefined) {
      commit("REGISTER_SUCCESS");
    }
    return res;
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
    await router.go();
    // router.push("/login");
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
    // console.log("FROM GETTER USER");
    // console.log(state.user);
    // console.log("FROM GETTER USER");
    return state.user;
  },
  STATUS(state) {
    return state.status;
  },
};
