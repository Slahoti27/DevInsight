import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import "./style.css";

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);   // ✅ MUST come before using store
app.use(router);

app.mount("#app");