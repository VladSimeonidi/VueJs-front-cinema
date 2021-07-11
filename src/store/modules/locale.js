const localStorageLocale = localStorage.getItem("locale");
if (!localStorageLocale) localStorage.setItem("locale", "ru");

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
});
export const mutations = {
  SET_CURRENT_LOCALE(state, payload) {
    state;
    localStorage.setItem("locale", payload.flag);
  },
};
export const getters = {
  GET_CURRENT_LOCALE(state) {
    return state.locales.find((el) => {
      return el.flag == localStorage.getItem("locale");
    });
  },
};
