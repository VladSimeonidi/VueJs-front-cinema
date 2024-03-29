import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Film from "../views/Film.vue";
import Notfound from "../views/Notfound.vue";
import Films from "../views/Films.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import FilmDitails from "../views/FilmDetails.vue";
import UserProfile from "../views/User";
import About from "../views/About.vue";
import Director from "../views/Director.vue";
import forgotPassword from "../views/ForgotPassword.vue";
import resetPassword from "../views/ResetPassword.vue";
import genres from "../views/Genres.vue";

import store from "../store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      layout: "empty",
      requiresAuth: true,
      transition: "fade",
    },
  },
  {
    path: "/films",
    name: "films",
    component: Films,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "*",
    name: "notfound",
    component: Notfound,
    meta: {
      layout: "empty",
      requiresAuth: true,
    },
  },
  {
    path: "/editfilm/:id",
    name: "editfilm",
    component: Film,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/filmdetails/:id",
    name: "filmditails",
    component: FilmDitails,
    meta: {
      requiresAuth: true,
      transition: "zoom",
    },
  },
  {
    path: "/director/:id",
    name: "director",
    component: Director,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      layout: "authlayout",
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      layout: "authlayout",
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/userprofile/:id",
    name: "userprofile",
    component: UserProfile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/about",
    name: "about",
    component: About,
    meta: {
      layout: "empty",
      requiresAuth: false,
    },
  },
  {
    path: "/forgotpassword",
    name: "forgotpassword",
    component: forgotPassword,
    meta: {
      layout: "empty",
      requiresAuth: false,
    },
  },
  {
    path: "/resetpassword",
    name: "resetpassword",
    component: resetPassword,
    meta: {
      layout: "empty",
      requiresAuth: false,
    },
  },
  {
    path: "/genres",
    name: "genres",
    component: genres,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters["auth/LOGGED"]) {
      // Перенаправление на Login Page
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
