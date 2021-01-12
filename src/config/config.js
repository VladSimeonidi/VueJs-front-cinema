export const config = {
  API: {
    BASE_URL: "http://localhost:5500/api",
    FILM: {
      LIST: "/films",
      PAGINATION: "/films/page",
      DETAILS: "/films/details",
    },
    USER: {
      LOGIN: "/user/login",
      LOGIN_ADMIN: "/user/adminlogin",
      REGISTER: "/user/register",
      PROFILE: "/user/profile",
    },
    DIRECTOR: {
      LIST: "/director",
    },
    GENRE: {
      LIST: "/genre",
    },
  },
};
