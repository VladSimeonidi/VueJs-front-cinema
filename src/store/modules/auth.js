import { config } from "@/config/config";
import router from "../../router/index";
import axios from "axios";

export const namespaced = true;

export const state = () => ({
  token: localStorage.getItem("token") || "",
  user: {},
  status: "",
  error: null,
  admin: false,
});
export const mutations = {
  CLEAR_ERROR(state) {
    state.error = null;
  },
  AUTH_REQUEST(state) {
    state.error = null;
    state.status = "loading";
  },
  AUTH_SUCCESS(state, payload) {
    state.error = null;
    state.token = payload.token;
    state.user = payload.user;
    state.admin = payload.admin;
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
  // USER_PROFILE(state, user) {
  //   state.user = user;
  // },
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

    return await axios
      .post(config.API.BASE_URL + config.API.USER.LOGIN, user)
      .then((res) => {
        if (res.data.success) {
          const token = res.data.token;
          const user = res.data.user;
          const admin = res.data.admin;
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = token;
          commit("AUTH_SUCCESS", { token, user, admin });
          return res;
        }
      })
      .catch((error) => {
        commit("AUTH_ERROR", error);
      });
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
        const admin = res.data.admin;
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = token;
        commit("AUTH_SUCCESS", { token, user, admin });
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
    return await axios
      .get(config.API.BASE_URL + config.API.USER.PROFILE)
      .then((res) => {
        // commit("USER_PROFILE", res.data.user);
        return res.data.user;
      })
      .catch((error) => {
        if (
          error.response.data === "Unauthorized" &&
          error.response.status === 401
        ) {
          localStorage.removeItem("token");
          this.reset();
          router.push("/login");
        }
      });
  },
  async LOGOUT({ commit }) {
    await localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    await axios.delete(config.API.BASE_URL + config.API.USER.LOGOUT);
    this.reset();
    commit("LOGOUT");
    router.push("/login");
    return;
  },
  async FORGOT_PASSWORD({ commit }, email) {
    commit; // чтоб не ругался eslint
    return axios
      .post(config.API.BASE_URL + config.API.USER.FORGOT_PASSWORD, email)
      .then((res) => {
        console.log("res form horgot store");
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  async RESET_PASSWORD({ commit }, payload) {
    commit; // чтоб не ругался eslint
    return await axios
      .post(config.API.BASE_URL + config.API.USER.RESET_PASSWORD, payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
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
