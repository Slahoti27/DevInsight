import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Repos from "../views/Repos.vue";
import Contributors from "../views/Contributors.vue";

const routes = [
  { path: "/", component: Dashboard },
  { path: "/repos", component: Repos },
  { path: "/contributors", component: Contributors },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;