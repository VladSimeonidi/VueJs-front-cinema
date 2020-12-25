import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import film from "../views/film.vue";
import Notfound from "../views/Notfound.vue";
import films from "../views/films.vue";

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
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
