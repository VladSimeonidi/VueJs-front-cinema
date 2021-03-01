// import { config } from "@/config/config";
// import axios from "axios";
export const namespaced = true;

export const state = () => ({
  locales: [
    {
      name: "Россия",
      flag: "ru",
    },
    {
      name: "Україна",
      flag: "ua",
    },
    {
      name: "USA",
      flag: "us",
    },
  ],
  currentLocale: localStorage.getItem("locale"),
});
export const mutations = {
  SET_CURRENT_LOCALE(state, payload) {
    // console.log("MUTATION PAYLOAD AND CURRENTLOCALE");
    // console.log(payload);
    // console.log(state.currentLocale);
    localStorage.setItem("locale", payload.flag);
    state.currentLocale = payload.flag;
  },
};
export const getters = {
  GET_CURRENT_LOCALE(state) {
    let locale = state.locales.find((el) => {
      return el.flag == localStorage.getItem("locale");
    });
    // console.log(state.locales[2]);
    // console.log("GETTER ONE LOCALE");
    // console.log(locale);
    return locale;
  },
  GET_LOCALES(state) {
    // console.log("GETTER ALL");
    // console.log(state.locales);
    return state.locales;
  },
};
