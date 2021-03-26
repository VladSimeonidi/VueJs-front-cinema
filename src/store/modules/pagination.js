export const namespaced = true;

export const state = () => ({
  films: { pageNumber: 1, pageSize: 9 },
});
export const mutations = {
  SET_CURRENT_FILMS_PAGINATION(state, payload) {
    console.log("HELLO FROM MUTATION PAGIN");
    console.log(payload);
    state.films = payload;
  },
};
export const getters = {
  GET_FILMS_PAGINATION(state) {
    return state.films;
  },
};
