import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,   // ← fixes "category is not a registered scale"
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

import App from "./App.vue";
import router from "./router";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: localStorage.getItem("theme") ?? "dark",
    themes: {
      dark: {
        dark: true,
        colors: {
          background: "#0d0f14",
          surface: "#13161d",
          primary: "#f5a623",
          success: "#3ecf8e",
          info: "#4fa3e0",
          error: "#f87171",
        },
      },
      light: {
        dark: false,
        colors: {
          background: "#f4f5f7",
          surface: "#ffffff",
          primary: "#e8870d",
          success: "#16a34a",
          info: "#2563eb",
          error: "#dc2626",
        },
      },
    },
  },
});

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(vuetify);
app.mount("#app");