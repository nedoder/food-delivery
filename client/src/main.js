import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/base.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});
const app = createApp(App);
app.config.globalProperties.$imagePath = "http://localhost:3000/";
app.use(pinia);
app.use(router);
app.use(vuetify);

app.mount("#app");
