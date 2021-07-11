export const config = {
  API: {
    // BASE_URL: "https://cinema-vl.herokuapp.com/api",
    BASE_URL: "http://localhost:5500/api",
    FILM: {
      LIST: "/films",
      PAGINATION: "/films/page",
      DETAILS: "/films/details",
      AUTOCOMPLETE: "/films/filmsautocomplete",
    },
    USER: {
      LOGIN: "/user/login",
      LOGIN_ADMIN: "/user/adminlogin",
      REGISTER: "/user/register",
      PROFILE: "/user/profile",
      PROFILE_AUTOCOMPLETE_LIST: "/user/autocompleteprofile",
      PROFILE_AUTOCOMPLETE_LIST_DIRECTORS: "/director/directorsautocomplete",
      USERPROFILE: "/user/userprofile",
      EDITPROFILE: "/user/editprofile",
      LOGOUT: "/user/logout",
    },
    DIRECTOR: {
      LIST: "/director",
    },
    GENRE: {
      LIST: "/genre",
    },
  },
};
