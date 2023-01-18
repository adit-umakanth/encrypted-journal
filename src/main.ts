import { createApp } from "vue";
import { createPinia } from "pinia";

import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase/conf";

import { Quasar } from "quasar";
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";
import "quasar/src/css/index.sass";

import App from "./App.vue";
import router from "./router";

console.log("test log");
console.log(import.meta.env.VITE_FB_AUTH_DOMAIN);

console.log(initializeApp(firebaseConfig));

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Quasar, {
  plugins: {},
});

app.mount("#app");
