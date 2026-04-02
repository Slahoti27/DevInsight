import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Repos from "../views/Repos.vue";
import Contributors from "../views/Contributors.vue";
import Settings from "../views/Settings.vue";

const routes = [
  { path: "/", component: Dashboard },
  { path: "/repos", component: Repos },
  { path: "/contributors", component: Contributors },
  { path: "/settings", component: Settings },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;