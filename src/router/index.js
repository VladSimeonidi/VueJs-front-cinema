import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import film from "../views/film.vue";
import Notfound from "../views/Notfound.vue";
import films from "../views/films.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/films",
    name: "films",
    component: films,
  },
  {
    path: "*",
    name: "notfound",
    component: Notfound,
  },
  {
    path: "/editfilm/:id",
    name: "editfilm",
    component: film,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      layout: "empty",
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      layout: "empty",
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      layout: "empty",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
