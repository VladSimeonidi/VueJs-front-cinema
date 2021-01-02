import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import film from "../views/film.vue";
import Notfound from "../views/Notfound.vue";
import films from "../views/films.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import FilmDitails from "../views/FilmDetails.vue";
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
    },
  },
  {
    path: "/films",
    name: "films",
    component: films,
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
    component: film,
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
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      layout: "empty",
      requiresGuest: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      layout: "empty",
      requiresGuest: true,
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
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters["auth/LOGGED"]) {
      // Redirect to the Login Page
      next("/login");
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (store.getters["auth/LOGGED"]) {
      // Redirect to the Login Page
      next("/profile");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
