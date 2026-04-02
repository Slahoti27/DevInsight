import { createApp } from "vue";
import { createPinia } from "pinia";          // add this
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";;
import "@mdi/font/css/materialdesignicons.css";
import App from "./App.vue";
import router from "./router";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark",
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
    },
  },
});

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vuetify);
app.mount("#app");