import { createApp } from "vue";
import { createPinia } from "pinia";

import { firebaseApp } from "@/firebase/fb-init";
import { VueFire, VueFireAuth } from "vuefire";

import { Quasar } from "quasar";
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";
import "quasar/src/css/index.sass";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});
app.use(router);
app.use(Quasar, {
  plugins: {},
});

app.mount("#app");
