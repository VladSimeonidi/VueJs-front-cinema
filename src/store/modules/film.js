import {
  GET_LIST,
  SET_LIST,
  GET_CURRENT_ITEM,
  SET_CURRENT_ITEM,
  SAVE_CURRENT_ITEM,
  EDIT_CURRENT_ITEM,
  DELETE_CURRENT_ITEM,
} from "@/store/mutations-types";
import { config } from "@/config/config";
import axios from "axios";
export const state = () => ({
  currentItem: {},
  list: [],
});
export const mutations = {
  [SET_LIST]: (state, payload) => (state.list = payload),
  [SET_CURRENT_ITEM]: (state, payload) => (state.currentItem = payload),
};
export const actions = {
  [SET_LIST]: async ({ commit }) => {
    await axios
      .get(config.API.BASE_URL + config.API.FILM)
      .then((res) => {
        commit(SET_LIST, res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  [SET_CURRENT_ITEM]: async ({ commit }, ID) => {
    await axios
      .get(config.API.BASE_URL + config.API.FILM + "/" + ID)
      .then((res) => {
        commit(SET_CURRENT_ITEM, res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  [SAVE_CURRENT_ITEM]: async ({ commit }, payload) => {
    await axios
      .post(config.API.BASE_URL + config.API.FILM, payload)
      .then(() => {
        commit(SET_CURRENT_ITEM, payload);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  [EDIT_CURRENT_ITEM]: async ({ commit }, payload) => {
    const ID = payload._id;
    const editData = Object.assign({}, payload);
    delete editData._id;
    delete editData.__v;
    await axios
      .put(config.API.BASE_URL + config.API.FILM + "/" + ID, editData)
      .then(() => {
        commit(SET_CURRENT_ITEM, editData);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  [DELETE_CURRENT_ITEM]: async ({ commit }, ID) => {
    console.log("ID");
    console.log(ID);
    await axios
      .delete(config.API.BASE_URL + config.API.FILM + "/" + ID)
      .then(() => {
        commit(SET_CURRENT_ITEM, {});
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
export const getters = {
  [GET_LIST]: (state) => state.list,
  [GET_CURRENT_ITEM]: (state) => state.currentItem,
};
